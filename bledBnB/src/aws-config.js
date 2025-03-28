const AWS = require('aws-sdk');

AWS.config.update({
    region: 'eu-west-3'
});

module.exports = AWS;