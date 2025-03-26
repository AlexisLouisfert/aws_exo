const AWS = require('aws-sdk');
const s3 = new AWS.S3();
s3.createBucket({ Bucket: "mon-bucket-unique" }, function(err, data) {
if (err) console.log(err, err.stack);
else console.log('Bucket créé avec succès', data);
});