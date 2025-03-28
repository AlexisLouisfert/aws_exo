import AWS from '../../aws-config';

const dynamoDB = new AWS.DynamoDB.DocumentClient();

export async function createReservation(reservation) {
    const params = {
        TableName: 'Reservations',
        Item: reservation
    };
    try {
        await dynamoDB.put(params).promise();
        return reservation;
    } catch (error) {
        console.error("Erreur lors de l'insertion :", error);
        throw error;
    }    
}