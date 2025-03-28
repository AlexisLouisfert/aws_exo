import AWS from '../../aws-config';

const dynamoDB = new AWS.DynamoDB.DocumentClient();

export async function deleteAnnonce(id) {
    const params = {
        TableName: 'Annonces',
        Key: { id }
    };
    try {
        await dynamoDB.delete(params).promise();
        return { id };
    } catch (error) {
        console.error("Erreur lors de la suppression :", error);
        throw error;
    }
}