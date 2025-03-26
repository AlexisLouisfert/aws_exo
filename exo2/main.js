const { createBucket } = require('./index.js');
const { putObject } = require('./index2.js');
const { getnputObject } = require('./index3.js');

const action = process.argv[2];

if (action === '1') {
    createBucket();
} else if (action === '2') {
    putObject();
} else if (action === '3') {
    getnputObject();
} else {
    console.log('Action invalide. Utilisez "createBucket", "putObject" ou "getnputObject".');
}

/* nb: actions:
node main.js 1
node main.js 2
node main.js 3
*/
