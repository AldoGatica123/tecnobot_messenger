
const validateMessage = (message, field) => {
  switch (field) {
    case 'business_name':
    case 'description':
    case 'history':
    case 'slogan':
      return validateLength(message);
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
  const countries = ['Mexico', 'Guatemala', 'El Salvador', 'Honduras', 'Nicaragua', 'Costa Rica', 'Panamá'];
  return countries.includes(message);
}

const validateLength = (message) => {
  return message.length < 30 && message.length > 2;
}


exports.validateMessage = validateMessage;