const AWS = require('aws-sdk');
const s3 = new AWS.S3();

exports.handler = async (event) => {
const params = { Bucket: 'fzfzepjzoefiezfz191fz', Key: 'exotest.txt' };
const data = await s3.getObject(params).promise();
return data.Body.toString();
}