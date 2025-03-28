import AWS from '../../aws-config';

const dynamoDB = new AWS.DynamoDB.DocumentClient();

export async function createAnnonce(annonce) {
    const params = {
        TableName: 'Annonces',
        Item: annonce
    };
    try {
        await dynamoDB.put(params).promise();
        return annonce;
    } catch (error) {
        console.error("Erreur lors de l'insertion :", error);
        throw error;
    }
}
