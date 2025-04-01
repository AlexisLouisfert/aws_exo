const inquirer = require('inquirer');
const { createAnnonce } = require('./src/crudFiles/create/createAnnonce');
const { listAnnonces } = require('./src/crudFiles/list/listAnnonce');
const { updateAnnonce } = require('./src/crudFiles/update/updateAnnonce');
const { deleteAnnonce } = require('./src/crudFiles/delete/deleteAnnonce');
const { createReservation } = require('./src/crudFiles/create/createReservation');
const { listReservation } = require('./src/crudFiles/list/listReservation');
// const { updateReservation } = require('./src/crudFiles/update/updateReservation'); //la fonxtion n'existe plus, j'ai fait autrement car je doit gérer la disponibilité 
// const { deleteReservation } = require('./src/crudFiles/delete/deleteReservation'); //la fonxtion n'existe plus, j'ai fait autrement car je doit gérer la disponibilité

async function mainMenu() {
    const choices = [
        'Ajouter une annonce',
        'Voir toutes les annonces',
        'Modifier une annonce',
        'Supprimer une annonce',
        'Ajouter une réservation',
        'Voir toutes les réservations',
        'Modifier une réservation',
        'Supprimer une réservation',
        'Quitter'
    ];

    const { action } = await inquirer.prompt([
        {
            type: 'list',
            name: 'action',
            message: 'Que veux-tu faire ?',
            choices
        }
    ]);

    switch (action) {
        case 'Ajouter une annonce':
            const annonce = await inquirer.prompt([
                { type: 'input', name: 'titre', message: 'Titre de l\'annonce :' },
                { type: 'input', name: 'description', message: 'Description :' },
                { type: 'number', name: 'prix', message: 'Prix :' },
                { type: 'input', name: 'imageUrl', message: 'URL de l\'image :' },
                { type: 'input', name: 'disponibilites', message: 'Dates disponibles (séparées par une virgule) :' }
            ]);
            annonce.disponibilites = annonce.disponibilites.split(',').map(date => date.trim());
            await createAnnonce(annonce);
            break;

        case 'Voir toutes les annonces':
            const annonces = await listAnnonces();
            console.table(annonces);
            break;

        case 'Modifier une annonce':
            const { annonceIdToUpdate } = await inquirer.prompt([
                { type: 'input', name: 'annonceIdToUpdate', message: 'ID de l\'annonce à modifier :' }
            ]);
            const annonceUpdate = await inquirer.prompt([
                { type: 'input', name: 'titre', message: 'Nouveau titre (laisser vide pour ne pas modifier) :' },
                { type: 'input', name: 'description', message: 'Nouvelle description :' },
                { type: 'number', name: 'prix', message: 'Nouveau prix :' },
                { type: 'input', name: 'imageUrl', message: 'Nouvelle URL de l\'image :' },
                { type: 'input', name: 'disponibilites', message: 'Nouvelles disponibilités (séparées par une virgule) :' }
            ]);
            annonceUpdate.disponibilites = annonceUpdate.disponibilites ? annonceUpdate.disponibilites.split(',').map(date => date.trim()) : undefined;
            await updateAnnonce(annonceIdToUpdate, annonceUpdate);
            break;

        case 'Supprimer une annonce':
            const { annonceId } = await inquirer.prompt([
                { type: 'input', name: 'annonceId', message: 'ID de l\'annonce à supprimer :' }
            ]);
            await deleteAnnonce(annonceId);
            break;

        case 'Ajouter une réservation':
            const reservation = await inquirer.prompt([
                { type: 'input', name: 'annonceId', message: 'ID de l\'annonce :' },
                { type: 'input', name: 'startDate', message: 'Date de début (YYYY-MM-DD) :' },
                { type: 'input', name: 'endDate', message: 'Date de fin (YYYY-MM-DD) :' }
            ]);
            await createReservation(reservation);
            break;

        case 'Voir toutes les réservations':
            const reservations = await listReservation();
            console.table(reservations);
            break;

        case 'Modifier une réservation':
            // const { reservationIdToUpdate } = await inquirer.prompt([
            //     { type: 'input', name: 'reservationIdToUpdate', message: 'ID de la réservation à modifier :' }
            // ]);
            // const reservationUpdate = await inquirer.prompt([
            //     { type: 'input', name: 'startDate', message: 'Nouvelle date de début (YYYY-MM-DD) :' },
            //     { type: 'input', name: 'endDate', message: 'Nouvelle date de fin (YYYY-MM-DD) :' }
            // ]);
            // await updateReservation(reservationIdToUpdate, reservationUpdate);
            break;

        case 'Supprimer une réservation':
            // const { reservationId } = await inquirer.prompt([
            //     { type: 'input', name: 'reservationId', message: 'ID de la réservation à supprimer :' }
            // ]);
            // await deleteReservation(reservationId);
            break;

        case 'Quitter':
            console.log('👋 Bye !');
            process.exit();
    }

    mainMenu(); 
}

mainMenu();