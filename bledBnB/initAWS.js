const { createTableAnnonces } = require('./src/createTables/tAnnonces');
const { createTableReservations } = require('./src/createTables/tReservations');
// const { createS3Bucket } = require('./src/bucket');

async function initializeAWS() {
    try {
        console.log("🚀 Initialisation de l'infrastructure AWS...");

        // Création des tables DynamoDB
        await createTableAnnonces();
        await createTableReservations();

        // // Création du bucket S3
        // await createBucket();

        console.log("Infrastructure AWS prête !");
    } catch (error) {
        console.error("Erreur lors de l'initialisation :", error);
    }
}

// Exécute la fonction si le fichier est lancé directement
if (require.main === module) {
    initializeAWS();
}

module.exports = { initializeAWS };
