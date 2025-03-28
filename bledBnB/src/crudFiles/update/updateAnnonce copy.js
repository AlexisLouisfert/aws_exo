import AWS from '../../aws-config';

const dynamoDB = new AWS.DynamoDB.DocumentClient();

export async function updateAnnonce(id, annonce) {
    const params = {
        TableName: 'Annonces',
        Key: { id },
        UpdateExpression: 'SET #annonce = :annonce',
        ExpressionAttributeNames: {
            '#annonce': 'annonce'
        },
        ExpressionAttributeValues: {
            ':annonce': annonce
        },
        ReturnValues: 'UPDATED_NEW'
    };
    try {
        const result = await dynamoDB.update(params).promise();
        return result.Attributes;
    } catch (error) {
        console.error("Erreur lors de la mise à jour :", error);
        throw error;
    }
}