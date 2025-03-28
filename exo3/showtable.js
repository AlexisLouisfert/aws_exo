const AWS = require('./aws-config');
const dynamoDB = new AWS.DynamoDB.DocumentClient();

const tableName = 'Etudiants';

function showTable() {
    const params = {
        TableName: tableName
    };

    dynamoDB.scan(params, (err, data) => {
        if (err) console.error("Erreur lors de la récupération des données:", err);
        else console.log("Données de la table:", data.Items); 
    });
}

module.exports = { showTable };