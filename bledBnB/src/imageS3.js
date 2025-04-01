const AWS = require('aws-sdk');
const uuid = require('uuid');
const s3 = new AWS.S3();

AWS.config.update({
    region: 'eu-west-3' // Région S3
});

async function uploadImageToS3(fileBuffer, fileName, bucketName) {
    const params = {
        Bucket: bucketName,
        Key: `images/${fileName}`,
        Body: fileBuffer,
        ContentType: 'image/png', 
        ACL: 'public-read' 
    };

    try {
        const result = await s3.upload(params).promise();
        console.log('Image téléchargée avec succès :', result.Location);
        return result.Location; 
    } catch (error) {
        console.error('Erreur lors du téléchargement de l\'image :', error);
        throw error;
    }
}

exports.handler = async (event) => {
    try {
        const { fileBuffer, fileName, bucketName } = JSON.parse(event.body);
        const imageUrl = await uploadImageToS3(fileBuffer, fileName, bucketName);
        
        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'Image téléchargée avec succès', imageUrl })
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: error.message })
        };
    }
};

module.exports = { uploadImageToS3 };