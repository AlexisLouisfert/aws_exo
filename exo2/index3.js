const AWS = require('./aws-config');
var fs = require('fs');
const s3 = new AWS.S3();

function getnputObject() {
    const downloadParams = {
        Bucket: "fzfzepjzoefiezfz191fz",
        Key: "exotest.txt"
    };
    
    s3.getObject(downloadParams, (err, data) => {
        
        if (err) console.log(err, err.stack);
        else {
            console.log('Fichier télécharger avec succès', data);
                
            var fileContent = fs.readFileSync('exotest.txt');
            var params = {
                Bucket: "fzfzepjzoefiezfz191fz",
                Key: "exotest.txt",
                Body: fileContent,
                Metadata: {
                  'custom-meta': 'c\'est la mer noire'
                }
            };
            
            s3.putObject(params, function(err, data) {
            if (err) console.log(err, err.stack);
            else console.log('Fichier téléversé avec succès', data);
            });
        }
    });
}

module.exports = { getnputObject };
