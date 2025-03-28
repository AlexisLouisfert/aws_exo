import AWS from '../../aws-config';

const dynamoDB = new AWS.DynamoDB.DocumentClient();

export async function updateReservation(id, reservation) {
    const params = {
        TableName: 'Reservations',
        Key: { id },
        UpdateExpression: 'SET #reservation = :reservation',
        ExpressionAttributeNames: {
            '#reservation': 'reservation'
        },
        ExpressionAttributeValues: {
            ':reservation': reservation
        },
        ReturnValues: 'UPDATED_NEW'
    };
    try {
        const result = await dynamoDB.update(params).promise();
        return result.Attributes;
    } catch (error) {
        console.error("Erreur lors de la mise à jour :", error);
        throw error;
    }
}