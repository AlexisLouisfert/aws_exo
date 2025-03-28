import AWS from '../../aws-config';

const dynamoDB = new AWS.DynamoDB.DocumentClient();

export function listAnnonce() {
    const params = {
        TableName: 'Annonces'
    };
    return dynamoDB.scan(params).promise();
}