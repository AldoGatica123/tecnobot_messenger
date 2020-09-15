const axios = require('axios');

const headers = {
  'x-api-key': process.env.API_KEY,
  'Content-Type': 'application/json'
  }

const validateMessage = (message, field) => {
  switch (field) {
    case 'business_name':
    case 'description':
    case 'slogan':
      return validateLength(message, 30);
    case 'history':
      return validateLength(message, 90)
    case 'location':
      return validateLocation(message);
    case 'phone':
      return validatePhone(message);
    case 'search_terms':
      return true;
    case 'website':
      return validateWebsite(message);
    default:
      return false;
  }
}

const validateTransactionNumber = (transaction_number, callback) => {
  console.log("Checking transaction number")
  axios.post('https://00bgzxxjsf.execute-api.us-east-1.amazonaws.com/api/payment',
    {
    transaction_number: transaction_number
  }, {
    headers: headers
  }).then((response) => {
    console.log("Response: " + JSON.stringify(response.data));
    if (response.status === 201){
      callback(true);
    }
  }).catch((error) => {
    console.log("Error: " + error)
      callback(false);
  })
}

const startNewCampaign = (conversation, callback) => {
  console.log("Starting new campaign")
  console.log("Payload: " + JSON.stringify(conversation))
  axios.post('https://o2ka6ctw13.execute-api.us-east-1.amazonaws.com/api/adwords',
    conversation
    , {
      headers: headers
    }).then((response) => {
    console.log("Response: " + JSON.stringify(response.data));
    if (response.status === 201){
      callback(true);
    }
  }).catch((error) => {
    console.log("Error: " + error)
    callback(false);
  })
}

const talkToBot = (psid, callback) => {
  console.log("Handover to tecnobot")
  axios.post('https://graph.facebook.com/v2.6/me/take_thread_control?access_token=' + process.env.PAGE_ACCESS_TOKEN,
    {recipient:{id:psid}})
    .then((response) => {
      console.log("Response: " + JSON.stringify(response.data));
      callback(true);
    })
    .catch((error) => {
      console.log(error);
      callback(false);
    });
}

const talkToHuman = (psid, callback) => {
  console.log("Handover to inbox")
  axios.post('https://graph.facebook.com/v2.6/me/pass_thread_control?access_token=' + process.env.PAGE_ACCESS_TOKEN,
    {recipient:{id:psid},target_app_id:parseInt(process.env.PAGE_ID)})
    .then((response) => {
      console.log("Response: " + JSON.stringify(response.data));
      callback(true);
    })
    .catch((error) => {
      console.log(error);
      callback(false);
    });
}

const validateWebsite = (message) => {
  message = message.toLowerCase();
  const pattern = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/gm
  return pattern.test(message)
}

const validatePhone = (message) => {
  message = message.replace('-','');
  message = message.replace(' ','');
  const pattern = /^([0-9]{8})*$/gm
  return pattern.test(message)
}

const validateLocation = (message) => {
  const countries = ['Mexico', 'Guatemala', 'El Salvador', 'Honduras', 'Nicaragua', 'Costa Rica', 'Panamá', 'Colombia'];
  return countries.includes(message);
}

const validateLength = (message, length) => {
  return message.length < length && message.length > 2;
}


exports.validateMessage = validateMessage;
exports.validateTransactionNumber = validateTransactionNumber;
exports.talkToBot = talkToBot;
exports.talkToHuman = talkToHuman;
exports.startNewCampaign = startNewCampaign;