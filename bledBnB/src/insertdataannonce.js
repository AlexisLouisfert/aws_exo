const AWS = require('aws-sdk');
const { v4: uuidv4 } = require('uuid');

AWS.config.update({
    region: 'eu-west-3'
});

const dynamoDB = new AWS.DynamoDB.DocumentClient();

// Liste des annonces à insérer avec des images déjà dans S3
const annonces = [
    {
        id: uuidv4(),
        titre: "Charmante maison en périphérie rurale",
        description: "Une maison confortable et bien situé, idéal pour les courts séjours.",
        prix: 75,
        imageUrl: "https://bledbnbimagesbucket5518185188151.s3.eu-west-3.amazonaws.com/maisona.png",  // Lien vers l'image dans S3
        disponibilites: ["2025-04-10", "2025-04-11","2025-04-12","2025-04-13","2025-04-14", "2025-04-15"]
    },
    {
        id: uuidv4(),
        titre: "Maison avec piscine et terrasse",
        description: "Superbe maison avec terrasse et piscine.",
        prix: 120,
        imageUrl: "https://bledbnbimagesbucket5518185188151.s3.eu-west-3.amazonaws.com/maisone.png",  // Lien vers l'image dans S3
        disponibilites: ["2025-05-01", "2025-05-05", "2025-05-10"]
    },
    {
        id: uuidv4(),
        titre: "Maison de campagne paisible",
        description: "Profitez du calme de la campagne dans cette maison cosy avec jardin.",
        prix: 90,
        imageUrl: "https://bledbnbimagesbucket5518185188151.s3.eu-west-3.amazonaws.com/maisonp.png",  // Lien vers l'image dans S3
        disponibilites: ["2025-06-01", "2025-06-07", "2025-06-15"]
    }
];

// Fonction pour insérer une annonce dans DynamoDB
async function insertAnnonce(annonce) {
    const params = {
        TableName: 'Annonces',
        Item: annonce
    };

    try {
        await dynamoDB.put(params).promise();
        console.log(`Annonce insérée : ${annonce.titre}`);
    } catch (error) {
        console.error("Erreur lors de l'insertion :", error);
    }
}

// Exécuter l'insertion pour toutes les annonces
async function insertAllAnnonces() {
    for (const annonce of annonces) {
        await insertAnnonce(annonce);
    }
    console.log("Toutes les annonces ont été insérées !");
}
// pour executer l'insertion directement, à commenter si le fichier est appelé ailleur
if (require.main === module) {
    insertAllAnnonces();
}

module.exports = { insertAllAnnonces };
