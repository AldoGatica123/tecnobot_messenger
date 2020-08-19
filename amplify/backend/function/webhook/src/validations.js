
const validateMessage = (message, field) => {
  switch (field) {
    case 'business_name':
      return validateBusinessName(message);
    case 'description':
      return true;
    case 'history':
      return true;
    case 'location':
      return true;
    case 'marketing_package':
      return true;
    case 'phone':
      return true;
    case 'search_terms':
      return true;
    case 'slogan':
      return true;
    case 'website':
      return true;
  }
}

const validateBusinessName = (message) => {
  message = message.trim();
  console.log("Business name: " + message)
  return message.length < 30 && message.length > 2;
}

exports.validateMessage = validateMessage;