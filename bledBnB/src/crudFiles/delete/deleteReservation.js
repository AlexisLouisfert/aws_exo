const AWS = require('aws-sdk');
AWS.config.update({ region: 'eu-west-3' });
const dynamoDB = new AWS.DynamoDB.DocumentClient();

async function getReservation(id) {
    const params = { TableName: 'Reservations', Key: { id } };
    const result = await dynamoDB.get(params).promise();
    return result.Item;
}

async function updateAnnonceDisponibilites(annonceId, datesToRestore) {
    const annonceParams = { TableName: 'Annonces', Key: { id: annonceId } };
    const annonceResult = await dynamoDB.get(annonceParams).promise();

    if (!annonceResult.Item) {
        throw new Error('Annonce non trouvée');
    }

    const updatedDisponibilites = [...annonceResult.Item.disponibilites, ...datesToRestore].sort();

    const updateParams = {
        TableName: 'Annonces',
        Key: { id: annonceId },
        UpdateExpression: 'SET disponibilites = :disponibilites',
        ExpressionAttributeValues: { ':disponibilites': updatedDisponibilites }
    };

    await dynamoDB.update(updateParams).promise();
}

exports.handler = async (event) => {
    try {
        const { id } = JSON.parse(event.body);
        const reservation = await getReservation(id);

        if (!reservation) {
            return { statusCode: 404, body: JSON.stringify({ error: 'Réservation non trouvée' }) };
        }

        await updateAnnonceDisponibilites(reservation.annonceId, reservation.dates);

        await dynamoDB.delete({ TableName: 'Reservations', Key: { id } }).promise();

        return { statusCode: 200, body: JSON.stringify({ message: 'Réservation annulée et dates rétablies' }) };
    } catch (error) {
        return { statusCode: 500, body: JSON.stringify({ error: error.message }) };
    }
};
