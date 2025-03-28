const AWS = require('aws-sdk');

AWS.config.update({
    region: 'eu-west-3'
});

const dynamoDB = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {
    try {
        if (!event.body) {
            throw new Error("Le corps de la requête est vide ou non défini.");
        }

        const student = JSON.parse(event.body); 
        const params = {
            TableName: 'Etudiants',
            Item: student
        };
        
        await dynamoDB.put(params).promise();
        
        return {
            statusCode: 201,
            body: JSON.stringify({ message: "Étudiant ajouté avec succès." })
        };
        
    } catch (error) {
        console.error("Erreur lors de l'insertion :", error);
        return {
            statusCode: 400,
            body: JSON.stringify({ error: error.message })
        };
    }
};
