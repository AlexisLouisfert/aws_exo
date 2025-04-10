const AWS = require('./aws-config');
const dynamoDB = new AWS.DynamoDB.DocumentClient();

function updateTable(id, updateExpression, expressionValues) {
    const params = {
        TableName: 'Eleves',
        Key: { id: id.toString() },
        UpdateExpression: updateExpression,
        ExpressionAttributeValues: expressionValues,
        ReturnValues: "UPDATED_NEW"
    };

    dynamoDB.update(params, (err, data) => {
        if (err) console.error(`Erreur lors de la mise à jour de l'élève avec id ${id}:`, err);
        else console.log(`Mise à jour réussie pour l'élève avec id ${id}:`, data.Attributes);
    });
}

module.exports = { updateTable };