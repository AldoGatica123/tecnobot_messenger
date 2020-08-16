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
  if (current_field === "FINISHED"){
    console.log("Filling is over!");
    return responses_.finishedCampaignQuestions();
  }
  else{
    dynamodb.savetoDB(message, current_field);
    return responses_.nextFieldRequired(psid, message, current_field, getEmptyField(conversation))
  }
}

const getEmptyField = (conversation) => {
  console.log("Checking fields: " + JSON.stringify(conversation));
  let emptyField = undefined;
  const fieldList = ["business_name", "marketing_package", "website", "phone", "location", "slogan", "description",
    "history", "search_terms"]
  Object.keys(fieldList).forEach(field => {
    if (conversation[fieldList[field]] === "" && emptyField === undefined){
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
        console.log("Fill conversation data");
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