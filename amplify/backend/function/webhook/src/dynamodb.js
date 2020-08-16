const AWS = require('aws-sdk');
const responses_ = require('./responses')

AWS.config.update({
  region: "us-east-1"
});
const client = new AWS.DynamoDB.DocumentClient();

const savetoDB = (message, field_name)  => {
  

  console.log('Saving ' + message + ' in field ' + field_name);
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
  const table = process.env.TABLE_NAME;

  const params = {
    TableName: table,
    Item:{
      psid: psid,
      filling_data: "business_name",
      business_name: "",
      phone: "",
      website: "",
      slogan: "",
      description: "",
      history: "",
      location: "",
      search_terms: "",
      marketing_package: "",
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