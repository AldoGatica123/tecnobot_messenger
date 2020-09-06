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
  console.log("Making call")
  axios.post('https://2swpoc4hc4.execute-api.us-east-1.amazonaws.com/api/payment',
    {
    transaction_number: transaction_number
  }, {
    headers: headers
  }).then( (response) => {
    console.log(response.data);
    if (response.status === 201){
      callback(true);
    }
  }).catch( (error) => {
    console.log(error.data)
      callback(false);
  })
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