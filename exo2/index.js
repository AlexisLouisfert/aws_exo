const AWS = require('./aws-config');
const s3 = new AWS.S3();

s3.createBucket({ Bucket: "fzfzepjzoefiezfz191fz" }, function(err, data) {
    if (err) console.log(err, err.stack);
    else console.log('Bucket créé avec succès', data);
});