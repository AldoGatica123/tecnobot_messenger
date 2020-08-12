const dynamodb = require('./dynamodb')


const initCampaign = async (psid) => {
  dynamodb.conversationExists(psid, (err, items) => {
    if (items){
      console.log("Conversation already exists")
    }
    else{
      console.log("Creating new conversation " + psid);
      dynamodb.createConversation(psid);
    }
  });
}

const campaignResponse = (message, psid) => {
  console.log('Saving ' + message + ' in row ' + psid )
  return {text: 'You said ' + message }
}

const isFillingCampaign = (psid) => {
  console.log('Checking ' + psid + ' campaignFilling value' )
  return true;
}

exports.initCampaign = initCampaign;
exports.isFillingCampaign = isFillingCampaign;
exports.campaignResponse = campaignResponse;