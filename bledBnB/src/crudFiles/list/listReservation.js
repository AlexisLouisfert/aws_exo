const AWS = require('aws-sdk');

AWS.config.update({
    region: 'eu-west-3'
});

const dynamoDB = new AWS.DynamoDB.DocumentClient();

async function listReservation() {
    const params = {
        TableName: 'Reservations'
    };
    const result = await dynamoDB.scan(params).promise();
    return result.Items || [];
}

exports.handler = async () => {
    try {
        const reservations = await listReservation();

        if (reservations.length === 0) {
            return {
                statusCode: 200,
                body: JSON.stringify({ message: "Aucune réservation trouvée" })
            };
        }

        return {
            statusCode: 200,
            body: JSON.stringify(reservations)
        };
    } catch (error) {
        console.error("Erreur lors de la récupération des réservations :", error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: error.message })
        };
    }
};

module.exports.handler = { listReservation };