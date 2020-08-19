const request = require('request')
const responses_ = require('./responses');
const campaign = require('./create_campaign');
const validations = require('./validations')

const handleMessage = (res, sender_psid, received_message) => {
  let responses;
  const message = received_message.text.trim();
  if (message) {
    campaign.isFillingCampaign(sender_psid, (is_filling, conversation) => {
      if (conversation.filling_data !== "FINISHED") {
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
      campaign.initCampaign(sender_psid);
      responses = responses_.initCampaign();
      break;
    case 'complete_payment':
      responses = responses_.completePayment();
      break;
    default:
      responses = responses_.helpMessage();
      break
  }
  handleResponses(res, sender_psid, responses);
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