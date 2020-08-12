const AWS = require('aws-sdk');

AWS.config.update({
  region: "us-east-1"
});
const client = new AWS.DynamoDB.DocumentClient();

const conversationExists = (psid, callback) => {
  const params = {
    TableName: process.env.TABLE_NAME,
    Key:{
      "psid": psid,
    }
  };

  client.get(params, (err, data) => {
    if (err) {
      console.error("Unable to read item. Error JSON:", JSON.stringify(err));
      callback(err, null);
    } else {
      console.log("GetItem succeeded:", JSON.stringify(data));
      callback(null, data.Item);
    }
  });
}

const createConversation = (psid) => {
  const table = process.env.TABLE_NAME;

  const params = {
    TableName: table,
    Item:{
      "psid": psid,
      "fillingData": true
    }
  };

  console.log("Adding a new item...");
  client.put(params, (err, data) => {
    if (err) {
      console.error("Unable to add item. Error JSON:", JSON.stringify(err));
    }
    else {
      console.log("Added item:", JSON.stringify(data));
    }
  });
}


exports.conversationExists = conversationExists;
exports.createConversation = createConversation;