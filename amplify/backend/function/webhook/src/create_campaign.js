const dynamodb = require('./dynamodb')
const responses_ = require('./responses')

const initCampaign = (psid) => {
  dynamodb.getConversation(psid, (err, item) => {
    if (item) {
      console.log("Conversation already exists")
    }
    else {
      console.log("Creating new conversation " + psid);
      dynamodb.createConversation(psid);
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
  return responses_.nextFieldRequired(next_field);
}

const getEmptyField = (conversation) => {
  console.log("Checking fields: " + JSON.stringify(conversation));
  let emptyField = "FINISHED";
  const fieldList = ["business_name", "marketing_package", "website", "phone", "location", "slogan", "description",
    "history", "search_terms"]
  Object.keys(fieldList).forEach(field => {
    if (conversation[fieldList[field]].length === 0 && emptyField === "FINISHED"){
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
        callback(true, item);
      }
      else {
        console.log("Ignore message")
        callback(false, null)
      }
    }
    else {
      console.log("Conversation does not exist")
      callback(false, null)
    }
  });
}

exports.initCampaign = initCampaign;
exports.isFillingCampaign = isFillingCampaign;
exports.campaignResponse = campaignResponse;