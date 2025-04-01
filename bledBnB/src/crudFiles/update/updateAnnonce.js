const AWS = require('aws-sdk');

AWS.config.update({
    region: 'eu-west-3'
});

const dynamoDB = new AWS.DynamoDB.DocumentClient();

// Fonction pour mettre à jour une annonce en modifiant directement les variables dans DynamoDB
async function updateAnnonce(annonceId, updatedAnnonce) {
    const params = {
        TableName: 'Annonces',
        Key: { id: annonceId },
        UpdateExpression: 'SET titre = :titre, description = :description, prix = :prix, disponibilites = :disponibilites, imageUrl = :imageUrl',
        ExpressionAttributeValues: {
            ':titre': updatedAnnonce.titre,
            ':description': updatedAnnonce.description,
            ':prix': updatedAnnonce.prix,
            ':disponibilites': updatedAnnonce.disponibilites,
            ':imageUrl': updatedAnnonce.imageUrl || null
        }
    };

    try {
        await dynamoDB.update(params).promise();
        return updatedAnnonce;
    } catch (error) {
        console.error('Erreur lors de la mise à jour de l\'annonce :', error);
        throw error;
    }
}

exports.handler = async (event) => {
    try {
        const { annonceId } = event.pathParameters;
        const updatedAnnonce = JSON.parse(event.body);

        if (!updatedAnnonce.titre || !updatedAnnonce.description || !updatedAnnonce.prix || !updatedAnnonce.disponibilites) {
            return {
                statusCode: 400,
                body: JSON.stringify({ error: 'Tous les champs sont obligatoires' })
            };
        }

        const result = await updateAnnonce(annonceId, updatedAnnonce);
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

module.exports = { updateAnnonce };