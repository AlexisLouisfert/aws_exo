const AWS = require('./aws-config');
const dynamoDB = new AWS.DynamoDB();

var params = {
    TableName: "Eleves",
    KeySchema: [                 
        {
            AttributeName: 'id',   
            KeyType: 'HASH'         
        }
    ],
    AttributeDefinitions: [      
        {
            AttributeName: 'id',
            AttributeType: 'N'      
        }
    ],
    ProvisionedThroughput: {     
        ReadCapacityUnits: 5,
        WriteCapacityUnits: 5
    }
};

dynamoDB.createTable(params, function(err, data) {
    if (err) console.log(err, err.stack);
    else console.log("Table Created", data.Item);
});