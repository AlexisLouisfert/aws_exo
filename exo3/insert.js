const AWS = require('./aws-config');
const dynamoDB = new AWS.DynamoDB.DocumentClient();
const dynamoDBRaw = new AWS.DynamoDB();

const students = [
    {
        id: 1,
        nom: 'Alice',
        age: 12,
        classe: '6ème'
    },
    {
        id: 2,
        nom: 'Bob',
        age: 13,
        classe: '5ème'
    }
];

function checkTableExists(callback) {
    const params = {
        TableName: 'Eleves'
    };
    
    dynamoDBRaw.describeTable(params, (err, data) => {
        if (err) {
            console.error("Erreur lors de la vérification de la table:", err);
            callback(false);
        } else {
            const tableStatus = data.Table.TableStatus;
            console.log(`État de la table: ${tableStatus}`);
            callback(tableStatus === 'ACTIVE');
        }
    });
}

function insertData() {
    students.forEach((student) => {
        const params = {
            TableName: 'Eleves',
            Item: student 
        };

        dynamoDB.put(params, (err, student) => {
            if (err)console.error('Erreur lors de l\'insertion de l\'élément:', err);
            else console.log('Élément inséré avec succès:', student);
        });
    });
}

module.exports = { insertData, checkTableExists };

