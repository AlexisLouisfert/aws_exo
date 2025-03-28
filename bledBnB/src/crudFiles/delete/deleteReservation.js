import AWS from '../../aws-config';

const dynamoDB = new AWS.DynamoDB.DocumentClient();

export function deleteReservation(id) {
    const params = {
        TableName: 'Reservations',
        Key: { id }
    };
    return dynamoDB.delete(params).promise();
}