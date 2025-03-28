import AWS from '../../aws-config';

const dynamoDB = new AWS.DynamoDB.DocumentClient(); 

export function listReservation() {
    const params = {
        TableName: 'Reservations'
    };
    return dynamoDB.scan(params).promise();
}