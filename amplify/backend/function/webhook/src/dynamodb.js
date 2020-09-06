const AWS = require('aws-sdk');

AWS.config.update({
  region: "us-east-1"
});
const client = new AWS.DynamoDB.DocumentClient();

const savetoDB = (conversation)  => {
  const params = {
    TableName: process.env.TABLE_NAME,
    Item: conversation
  };

  client.put(params, (err, data) => {
    if (err) {
      console.log("Error", err);
    } else {
      console.log("Success", data);
    }
  });
}

const getConversation = (psid, callback) => {
  const params = {
    TableName: process.env.TABLE_NAME,
    Key:{
      "psid": psid,
    }
  };

  client.get(params, (err, data) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, data.Item);
    }
  });
}

const createConversation = (psid) => {
  const params = {
    TableName: process.env.TABLE_NAME,
    Item:{
      psid: psid,
      filling_data: "marketing_package",
      business_name: "",
      phone: "",
      website: "",
      slogan: "",
      description: "",
      history: "",
      location: "",
      search_terms: "",
      marketing_package: "",
      transaction_number: "",
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

exports.savetoDB = savetoDB;
exports.getConversation = getConversation;
exports.createConversation = createConversation;