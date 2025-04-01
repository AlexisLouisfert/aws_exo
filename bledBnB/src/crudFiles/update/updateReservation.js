const AWS = require('aws-sdk');
const moment = require('moment');

AWS.config.update({ region: 'eu-west-3' });

const dynamoDB = new AWS.DynamoDB.DocumentClient();

async function getReservation(id) {
    const params = { TableName: 'Reservations', Key: { id } };
    const result = await dynamoDB.get(params).promise();
    return result.Item;
}

async function getAnnonce(annonceId) {
    const params = { TableName: 'Annonces', Key: { id: annonceId } };
    const result = await dynamoDB.get(params).promise();
    return result.Item;
}

async function updateAnnonceDisponibilites(annonceId, oldDates, newDates) {
    const annonce = await getAnnonce(annonceId);
    if (!annonce) throw new Error('Annonce non trouvée');

    // Rétablir les anciennes dates et enlever les nouvelles
    const updatedDisponibilites = [...new Set([...annonce.disponibilites, ...oldDates])]
        .filter(date => !newDates.includes(date))
        .sort();

    const params = {
        TableName: 'Annonces',
        Key: { id: annonceId },
        UpdateExpression: 'SET disponibilites = :disponibilites',
        ExpressionAttributeValues: { ':disponibilites': updatedDisponibilites }
    };

    await dynamoDB.update(params).promise();
}

exports.handler = async (event) => {
    try {
        const { id, startDate, endDate } = JSON.parse(event.body);

        const reservation = await getReservation(id);
        if (!reservation) {
            return { statusCode: 404, body: JSON.stringify({ error: 'Réservation non trouvée' }) };
        }

        // Générer la nouvelle plage de dates
        const start = moment(startDate, 'YYYY-MM-DD');
        const end = moment(endDate, 'YYYY-MM-DD');
        const newDates = [];
        for (let m = start; m.isBefore(end) || m.isSame(end); m.add(1, 'days')) {
            newDates.push(m.format('YYYY-MM-DD'));
        }

        const annonce = await getAnnonce(reservation.annonceId);
        if (!annonce) {
            return { statusCode: 404, body: JSON.stringify({ error: 'Annonce non trouvée' }) };
        }

        const unavailableDates = newDates.filter(date => !annonce.disponibilites.includes(date));
        if (unavailableDates.length > 0) {
            return {
                statusCode: 400,
                body: JSON.stringify({ error: 'Certaines dates sont déjà réservées', unavailableDates })
            };
        }
        
        await updateAnnonceDisponibilites(reservation.annonceId, reservation.dates, newDates);

        const updateParams = {
            TableName: 'Reservations',
            Key: { id },
            UpdateExpression: 'SET dates = :dates',
            ExpressionAttributeValues: { ':dates': newDates }
        };

        await dynamoDB.update(updateParams).promise();

        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'Réservation mise à jour avec succès', newDates })
        };
    } catch (error) {
        console.error("Erreur :", error);
        return { statusCode: 500, body: JSON.stringify({ error: error.message }) };
    }
};
