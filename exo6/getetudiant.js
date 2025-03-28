const AWS = require('aws-sdk');

AWS.config.update({
    region: 'eu-west-3'
});
const dynamoDB = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {
    try {
        var params;

        if (event.queryStringParameters?.id) {
            params = { 
                TableName: 'Etudiants', 
                Key: { id: event.queryStringParameters.id } 
            };
            const data = await dynamoDB.get(params).promise();
            return {
                statusCode: 200,
                body: JSON.stringify(data),
            };
        }

        params = { TableName: 'Etudiants' };
        const data = await dynamoDB.scan(params).promise();
        return {
            statusCode: 200,
            body: JSON.stringify(data.Items),
        };
    } catch (error) {
        return {
            statusCode: 404,
            body: JSON.stringify({ error: error.message }),
        };
    }
};
