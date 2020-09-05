const request = require('request')
const responses_ = require('./responses');
const campaign = require('./create_campaign');
const validations = require('./validations')

const handleMessage = (res, sender_psid, received_message) => {
  let responses;
  const message = received_message.text.trim();
  if (message) {
    campaign.isFillingCampaign(sender_psid, (conversation) => {
      if (conversation.filling_data !== "transaction_number" && conversation.filling_data !== "marketing_package") {
        if (validations.validateMessage(message, conversation.filling_data)){
          responses = campaign.campaignResponse(message, sender_psid, conversation);
        }
        else {
          responses = responses_.errorInField(conversation.filling_data)
        }
      }
      else {
        responses = responses_.notRecognized(message);
      }
      handleResponses(res, sender_psid, responses);
    });
  }
}

const handlePostback = (res, sender_psid, received_postback) => {
  let responses;
  const payload = received_postback.payload;
  console.log("Postback: " + payload)

  switch (payload) {
    case 'get_started':
      responses = responses_.welcomeMessage();
      break;
    case 'help':
      responses = responses_.helpMessage();
      break;
    case 'talk_human':
      responses = responses_.talkHuman();
      break;
    case 'init_campaign':
      campaign.initCampaign(sender_psid, (item) => {
        if (item === null) {
          responses = responses_.initCampaign();
        }
        else {
          responses = responses_.conversationExists(item.filling_data);
        }
        handleResponses(res, sender_psid, responses);
      });
      break;
    case 'complete_payment':
      responses = responses_.completePayment();
      break;
    case 'MARKETING_COMBO_1':
    case 'MARKETING_COMBO_2':
    case 'MARKETING_COMBO_3':
      campaign.isFillingCampaign(sender_psid, (conversation) => {
        if (conversation.filling_data !== "transaction_number") {
          if (conversation.marketing_package.length === 0){
            conversation['filling_data'] = 'marketing_package';
            responses = campaign.campaignResponse(payload, sender_psid, conversation);
          }
          else {
            responses = responses_.errorInField('marketing_package')
          }
        }
        else {
          responses = responses_.notRecognized(payload);
        }
        handleResponses(res, sender_psid, responses);
      });
      break;
    case 'info_package_1':
    case 'info_package_2':
    case 'info_package_3':
      break;
    default:
      responses = responses_.helpMessage();
      break
  }
  if (responses !== undefined){
    handleResponses(res, sender_psid, responses);
  }
}

const handleResponses = (res, sender_psid, responses) => {
  if (Array.isArray(responses)) {
    let delay = 0;
    for (i = 0; i < responses.length - 1; i++){
      const response = responses[i];
      sendMessage(res, sender_psid, response, false, delay * 2500);
      delay++;
    }
    const last = responses[responses.length-1];
    sendMessage(res, sender_psid, last, true, delay * 2500);
  }
  else {
    sendMessage(res, sender_psid, responses, true);
  }
}

const sendMessage = (res, sender_psid, response, last, delay = 0) => {
  if ("delay" in response) {
    delay = response["delay"];
    delete response["delay"];
  }
  setTimeout(async() => await callSendAPI(res, sender_psid, response, last), delay);
}

const callSendAPI = (res, sender_psid, response, last) => {
  let request_body = {
    "recipient": {
      "id": sender_psid
    },
    "message": JSON.stringify(response)
  }

  request({
    "uri": "https://graph.facebook.com/v2.6/me/messages",
    "qs": { "access_token": process.env.PAGE_ACCESS_TOKEN },
    "method": "POST",
    "json": request_body
  }, (err, response, body) => {
    if (!err) {
      if (last){
        res.status(200).send({message: "SENDING MESSAGE"});
      }
      console.log(request_body);
    } else {
      console.error("Unable to send message:" + err);
    }
  });
}

exports.handleMessage = handleMessage;
exports.handlePostback = handlePostback;