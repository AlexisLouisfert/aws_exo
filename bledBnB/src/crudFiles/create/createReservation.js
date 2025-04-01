const AWS = require('aws-sdk');
const moment = require('moment');
const { v4: uuidv4 } = require('uuid');

AWS.config.update({ region: 'eu-west-3' });

const dynamoDB = new AWS.DynamoDB.DocumentClient();

async function createReservation(reservation) {
    const params = {
        TableName: 'Reservations',
        Item: reservation
    };
    await dynamoDB.put(params).promise();
    return reservation;
}

async function updateAnnonceDisponibilites(annonceId, datesReserved) {
    const annonceParams = {
        TableName: 'Annonces',
        Key: { id: annonceId }
    };
    const annonceResult = await dynamoDB.get(annonceParams).promise();

    if (!annonceResult.Item) {
        throw new Error('Annonce non trouvée');
    }

    const updatedDisponibilites = annonceResult.Item.disponibilites.filter(date => !datesReserved.includes(date));

    const updateParams = {
        TableName: 'Annonces',
        Key: { id: annonceId },
        UpdateExpression: 'SET disponibilites = :disponibilites',
        ExpressionAttributeValues: {
            ':disponibilites': updatedDisponibilites
        }
    };
    await dynamoDB.update(updateParams).promise();
}

exports.handler = async (event) => {
    try {
        const { annonceId, utilisateur, startDate, endDate } = JSON.parse(event.body);

        if (!annonceId || !utilisateur || !startDate || !endDate) {
            return {
                statusCode: 400,
                body: JSON.stringify({ error: 'Tous les champs sont obligatoires' })
            };
        }

        const start = moment(startDate, 'YYYY-MM-DD');
        const end = moment(endDate, 'YYYY-MM-DD');

        const datesReserved = [];
        for (let m = start; m.isBefore(end) || m.isSame(end); m.add(1, 'days')) {
            datesReserved.push(m.format('YYYY-MM-DD'));
        }

        const annonceParams = {
            TableName: 'Annonces',
            Key: { id: annonceId }
        };
        const annonceResult = await dynamoDB.get(annonceParams).promise();

        if (!annonceResult.Item) {
            return {
                statusCode: 404,
                body: JSON.stringify({ error: 'Annonce non trouvée' })
            };
        }

        const disponibilites = annonceResult.Item.disponibilites;
        const unavailableDates = datesReserved.filter(date => !disponibilites.includes(date));

        if (unavailableDates.length > 0) {
            return {
                statusCode: 400,
                body: JSON.stringify({
                    error: 'Certaines dates sont déjà réservées',
                    unavailableDates
                })
            };
        }

        const reservation = {
            id: uuidv4(),
            annonceId,
            utilisateur,
            dates: datesReserved
        };

        await createReservation(reservation);
        await updateAnnonceDisponibilites(annonceId, datesReserved);

        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'Réservation effectuée avec succès', reservation })
        };
    } catch (error) {
        console.error("Erreur :", error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: error.message })
        };
    }
};

module.exports = { createReservation };