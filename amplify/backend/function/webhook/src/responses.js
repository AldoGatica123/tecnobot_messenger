const notRecognized = (message) => {
  return [{text: "No entendí '" + message + "'"}, helpMessage()];
}

const welcomeMessage = () => {
  return {
    attachment: {
      type: "template",
      payload: {
        template_type: "button",
        text: "¡Hola, bienvenido a Tecnobot! El Sistema automatizado para que puedas comenzar a realizar publicidad en medios digitales",
        buttons: [
          {
            type: "postback",
            title: "Hablar con un humano",
            payload: "talk_human"
          },
          {
            type: "postback",
            title: "Iniciar campaña",
            payload: "init_campaign"
          },
          {
            type: "postback",
            title: "Pagar campaña",
            payload: "complete_payment"
          },
        ]
      }
    }
  }
}

const helpMessage = () => {
  return {
    attachment: {
      type: "template",
        payload: {
        template_type: "button",
          text: "Te puedo asistir con las siguientes opciones:",
          buttons: [
          {
            type: "postback",
            title: "Hablar con un humano",
            payload: "talk_human"
          },
          {
            type: "postback",
            title: "Iniciar campaña",
            payload: "init_campaign"
          },
          {
            type: "postback",
            title: "Pagar campaña",
            payload: "complete_payment"
          },
        ]
      }
    }
  }
}

const initCampaign = () => {
  return [{
    text: "Para comenzar a hacer publicidad, primero necesitamos saber en qué paquete de marketing digital te interesa."
  }, marketingCombos()]
}

const talkHuman = () => {
  return { text: "Por favor indicanos tu nombre, número de teléfono y correo electrónico para que un asesor se pueda comunicar contigo." }
}

const completePayment = () => {
  return { text: "Cuál es tu número de transacción?" }
}

const nextFieldRequired = (next_field) => {
  console.log("Next field: " + next_field)
  switch (next_field) {
    case 'marketing_package':
      return [{text: "¿Qué combo de marketing digital te interesa"}, marketingCombos()]
    case 'business_name':
      return {text: "También necesitamos conocer tu negocio. ¿Cuál es el nombre de tu empresa?"}
    case 'website':
      return {text: "¡Gracias! ¿Cuál es el link hacia tu sitio web? (Si no tienes sitio web puedes utilizar el link de tu página de Facebook.)"}
    case 'location':
      return {text: "¿En dónde se encuentra ubicado tu negocio? Esto nos sirve para poder segmentar tu campaña."}
    case 'phone':
      return {text: "Ingresa el número de teléfono para que puedas recibir llamadas de clientes interesados"}
    case 'search_terms':
      return {text: "¿Cuáles son los servicios o productos principales de tu empresa?"}
    case 'description':
      return {text: "Perfecto, ahora necesito que puedas darnos una pequeña descripción de tu negocio en menos de 30 caracteres."}
    case 'slogan':
      return {text: "¿Cuál es el slogan o frase de tu negocio? Necesitamos que sea menos de 30 caracteres"}
    case 'history':
      return {text: "Excelente. Para finalizar necesitamos que nos cuentes un poco más de tu negocio, como información de tu historia y a que se dedican."}
    case 'FINISHED':
      return finishedCampaignQuestions();
  }
}


const errorInField = (field) => {
  console.log("Error in field: " + field)
  switch (field) {
    case 'business_name':
      return {text: "Esperamos que el nombre de la empresa sea entre 3 a 15 letras."}
    case 'marketing_package':
      return {text: "Por favor, elige uno de los paquetes de marketing. Si quieres cambiar el paquete elegido comunicate con un asesor."}
    case 'website':
      return {text: "Por favor, revisa que hayas escrito bien tu sitio web."}
    case 'location':
      return {text: "Por favor, elige una de las posibles ubicaciones."}
    case 'phone':
      return {text: "Esperamos que el número de teléfono sea de 8 dígitos."}
    case 'search_terms':
      return {text: "¿Cuáles son los servicios o productos principales de tu empresa?"}
    case 'description':
      return {text: "Perfecto, ahora necesito que puedas darnos una pequeña descripción de tu negocio en menos de 30 caracteres."}
    case 'slogan':
      return {text: "¿Cuál es el slogan o frase de tu negocio? Necesitamos que sea menos de 30 caracteres"}
    case 'history':
      return {text: "Excelente. Para finalizar necesitamos que nos cuentes un poco más de tu negocio, como información de tu historia y a que se dedican."}
  }
}

const finishedCampaignQuestions = () => {
  return [{text: "Muchas gracias por la información. ¡Estamos listos para lanzar tu campaña publicitaria! " +
      "Por último necesitamos que ingreses al siguiente enlace para ingresar tu método de pago y tu campaña publicitaria iniciará."},
    {text: "¡Eso sería todo! Si tienes alguna duda o pregunta puedes comunicarte directamente con nuestro equipo a info@tecnometro.net o puedes escribirnos a (502) 3517-7047"}];
}

const marketingCombos = () => {
  return {
    attachment: {
      type: "template",
      payload: {
        "template_type": "generic",
        "elements": [
          {
            "title": "Combo de Marketing 1",
            "image_url": "https://user-images.githubusercontent.com/10179447/90703755-d60fb680-e24b-11ea-8ad0-2ba9e4d9c16b.png",
            "subtitle": "GTQ 780.00",
            "buttons": [
              {
                "type":"postback",
                "title":"Quiero el combo 1",
                "payload":"choose_package_1"
              },
              {
                "type":"postback",
                "title":"Más información",
                "payload":"info_package_1"
              }
            ]
          },
          {
            "title": "Combo de Marketing 2",
            "image_url": "https://user-images.githubusercontent.com/10179447/90703761-d9a33d80-e24b-11ea-9919-75bebb8e9346.png",
            "subtitle": "GTQ 1,150.00",
            "buttons": [
              {
                "type":"postback",
                "title":"Quiero el combo 2",
                "payload":"choose_package_2"
              },
              {
                "type":"postback",
                "title":"Más información",
                "payload":"info_package_2"
              }
            ]
          },
          {
            "title": "Combo de Marketing 3",
            "image_url": "https://user-images.githubusercontent.com/10179447/90703763-db6d0100-e24b-11ea-9636-52df78997054.png",
            "subtitle": "GTQ 1,560.00",
            "buttons": [
              {
                "type":"postback",
                "title":"Quiero el combo 3",
                "payload":"choose_package_3"
              },
              {
                "type":"postback",
                "title":"Más información",
                "payload":"info_package_3"
              }
            ]
          }
        ]
      }
    }
  }
}

exports.errorInField = errorInField;
exports.initCampaign = initCampaign;
exports.talkHuman = talkHuman;
exports.helpMessage = helpMessage;
exports.welcomeMessage = welcomeMessage;
exports.notRecognized = notRecognized;
exports.completePayment = completePayment;
exports.nextFieldRequired = nextFieldRequired;
exports.finishedCampaignQuestions = finishedCampaignQuestions;