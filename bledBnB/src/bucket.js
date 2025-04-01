const AWS = require('aws-sdk');

AWS.config.update({
    region: 'eu-west-3' 
});

const s3 = new AWS.S3();

function createBucket() {
    s3.createBucket({ Bucket: "bledbnbimagesbucket5518185188151" }, function(err, data) {
        if (err) console.log(err, err.stack);
        else console.log('Bucket créé avec succès', data);
    });    
}

if (require.main === module) {
    createBucket();
}

module.exports = { createBucket };