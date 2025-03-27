const AWS = require('./aws-config');
const fs = require('fs');
const dynamoDB = new AWS.DynamoDB.DocumentClient();
const dynamoDBRaw = new AWS.DynamoDB();

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

function insertData(data) {
    data.forEach((student) => {
        const params = {
            TableName: 'Eleves',
            Item: student 
        };

        dynamoDB.put(params, (err, res) => {
            if (err) console.error("Erreur lors de l'insertion de l'élément:", err);
            else console.log("Élément inséré avec succès:", student);
        });
    });
}

function readAndInsertFromFile() {
    fs.readFile('eleves.json', 'utf8', (err, data) => {
        if (err) {
            console.error("Erreur lors de la lecture du fichier:", err);
            return;
        }
        try {
            const studentsFromFile = JSON.parse(data);
            if (!Array.isArray(studentsFromFile)) {
                throw new Error("Le fichier JSON doit contenir un tableau d'objets.");
            }
            checkTableExists((exists) => {
                if (exists) insertData(studentsFromFile);
                else console.error("La table n'existe pas ou n'est pas active. Impossible d'insérer des données.");
            });
        } catch (parseErr) {
            console.error("Erreur lors de l'analyse du fichier JSON:", parseErr);
        }
    });
}

readAndInsertFromFile();
