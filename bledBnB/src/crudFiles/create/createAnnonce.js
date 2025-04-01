const AWS = require('aws-sdk');
const { v4: uuidv4 } = require('uuid');
const { uploadImageToS3 } = require('../../imageS3'); 

AWS.config.update({
    region: 'eu-west-3'
});

const dynamoDB = new AWS.DynamoDB.DocumentClient();
const s3Bucket = 'bledbnbimagesbucket'; 

async function createAnnonce(annonce, imageBuffer) {

    const imageUrl = await uploadImageToS3(imageBuffer, `${uuidv4()}.png`, s3Bucket); 

    annonce.imageUrl = imageUrl; 

    const params = {
        TableName: 'Annonces',
        Item: annonce
    };

    try {
        await dynamoDB.put(params).promise();
        return annonce;
    } catch (error) {
        console.error('Erreur lors de la création de l\'annonce :', error);
        throw error;
    }
}

exports.handler = async (event) => {
    try {
        const annonce = JSON.parse(event.body);
        const imageBuffer = Buffer.from(annonce.imageData, 'base64'); 

        if (!annonce.titre || !annonce.description || !annonce.prix || !annonce.disponibilites) {
            return {
                statusCode: 400,
                body: JSON.stringify({ error: 'Tous les champs sont obligatoires' })
            };
        }

        annonce.id = uuidv4();

        const result = await createAnnonce(annonce, imageBuffer);
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

module.exports = { createAnnonce };