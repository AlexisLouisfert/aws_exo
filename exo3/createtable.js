const AWS = require('./aws-config');
const dynamoDB = new AWS.DynamoDB();

var params = {
    TableName: "Eleves",
    KeySchema: [                 
        {
            AttributeName: 'id',   
            KeyType: 'HASH'         
        }
    ],
    AttributeDefinitions: [      
        {
            AttributeName: 'id',
            AttributeType: 'N'      
        }
    ],
    ProvisionedThroughput: {     
        ReadCapacityUnits: 5,
        WriteCapacityUnits: 5
    }
};

function createTable() {
    dynamoDB.createTable(params, function(err, data) {
        if (err) console.error("Erreur lors de la création de la table:", err);
        else console.log("Table créée avec succès:", data);
    });
}

module.exports = { createTable };