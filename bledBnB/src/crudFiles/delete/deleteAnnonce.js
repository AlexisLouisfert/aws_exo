const AWS = require('aws-sdk');

AWS.config.update({
    region: 'eu-west-3'
});

const dynamoDB = new AWS.DynamoDB.DocumentClient();

async function deleteAnnonce(annonceId) {
    const params = {
        TableName: 'Annonces',
        Key: { id: annonceId }
    };

    try {
        await dynamoDB.delete(params).promise();
        return { message: 'Annonce supprimée avec succès' };
    } catch (error) {
        console.error('Erreur lors de la suppression de l\'annonce :', error);
        throw error;
    }
}

exports.handler = async (event) => {
    try {
        const { annonceId } = event.pathParameters;

        const result = await deleteAnnonce(annonceId);
        return {
            statusCode: 200,
            body: JSON.stringify(result)
        };
    } catch (error) {
        console.error('Erreur:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: error.message })
        };
    }
};

module.exports = { deleteAnnonce };