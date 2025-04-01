const AWS = require('aws-sdk');

AWS.config.update({
    region: 'eu-west-3'
});

const dynamoDB = new AWS.DynamoDB.DocumentClient();

// Fonction pour lister toutes les annonces
async function listAnnonces() {
    const params = {
        TableName: 'Annonces'
    };

    try {
        const result = await dynamoDB.scan(params).promise();
        return result.Items || [];
    } catch (error) {
        console.error('Erreur lors de la récupération des annonces :', error);
        throw error;
    }
}

exports.handler = async () => {
    try {
        const annonces = await listAnnonces();
        return {
            statusCode: 200,
            body: JSON.stringify(annonces)
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: error.message })
        };
    }
};

module.exports = { listAnnonces };