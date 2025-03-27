const { insertData } = require('./insert.js');
const { readAndInsertFromFile } = require('./insertjson.js');
const { updateTable } = require('./updatetable.js');
const { showTable } = require('./showtable.js');
const { createTable } = require('./createtable.js');
const { checkTableExists} = require('./insert.js');


if (action === '1') {
    createTable();
} else if (action === '2') {
    checkTableExists((exists) => {
        if (exists) insertData();
        else console.error("La table n'existe pas ou n'est pas active. Impossible d'insérer des données.");
    });
} else if (action === '3') {
    readAndInsertFromFile();
} else if (action === '4') {
    updateTable(1, "set age = age + :val, classe = :classe", { ":val": 1, ":classe": "5ème" });
    updateTable(3, "set nom = :nom", { ":nom": "Charles" });
} else if (action === '5') {
    showTable();
} else {
    console.log('Action invalide. Utilisez "createBucket", "putObject" ou "getnputObject".');
}

/* nb: actions:
node main.js 1
node main.js 2
node main.js 3
node main.js 4
node main.js 5
*/





