const dynamodb = require('./dynamodb')
const responses_ = require('./responses')

const initCampaign = (psid, callback) => {
  dynamodb.getConversation(psid, (err, item) => {
    if (item) {
      console.log("Conversation already exists")
      callback(item);
    }
    else {
      console.log("Creating new conversation " + psid);
      dynamodb.createConversation(psid);
      callback(null);
    }
  });
}

const campaignResponse = (message, psid, conversation) => {
  const current_field = conversation.filling_data;
  console.log("Saving " + message + " in " + current_field);
  conversation[current_field] = message;
  const next_field = getEmptyField(conversation);
  conversation["filling_data"] = next_field;
  console.log("Updating " + JSON.stringify(conversation))
  dynamodb.savetoDB(conversation);
  return responses_.nextFieldRequired(next_field, conversation.marketing_package);
}

const getEmptyField = (conversation) => {
  console.log("Checking fields: " + JSON.stringify(conversation));
  let emptyField = "transaction_number";
  const fieldList = ["marketing_package", "business_name", "website", "phone", "location", "slogan", "description",
    "history", "search_terms"]
  Object.keys(fieldList).forEach(field => {
    if (conversation[fieldList[field]].length === 0 && emptyField === "transaction_number"){
      console.log(fieldList[field] + " is empty");
      emptyField = fieldList[field];
    }
  })
  return emptyField;
}

const isFillingCampaign = (psid, callback) => {
  dynamodb.getConversation(psid, (err, item) => {
    if (item) {
      if (item.filling_data){
        console.log("Conversation data exists");
        callback(item);
      }
      else {
        console.log("Ignore message")
        callback(null)
      }
    }
    else {
      console.log("Conversation does not exist")
      callback(null)
    }
  });
}

const acceptPayment = (conversation, transaction_number) => {
  conversation.transaction_number = transaction_number;
  conversation.filling_data = "FINISHED";

  dynamodb.savetoDB(conversation);
  return responses_.validPayment();
}

exports.initCampaign = initCampaign;
exports.isFillingCampaign = isFillingCampaign;
exports.campaignResponse = campaignResponse;
exports.acceptPayment = acceptPayment;