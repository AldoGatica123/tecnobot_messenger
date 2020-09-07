
# Get Started

```
"get_started":{
    "payload":"get_started"
  }
```

# Greeting 

```
"greeting": [
    {
      "locale":"default",
      "text":"Hola {{user_first_name}}! Soy tecnobot, te puedo ayudar a iniciar campañas de marketing digital!" 
    }
  ]
```

# Ice breakers

```
"ice_breakers":[
     {
        "question": "Quisiera iniciar una campaña de marketing",
        "payload": "init_campaign",
     },
     {
        "question": "Quiero hablar con un asesor",
        "payload": "talk_human",
     }
]
```

# Persistent menu

```
"persistent_menu": [
        {
            "locale": "default",
            "composer_input_disabled": false,
            "call_to_actions": [
                {
                    "type": "postback",
                    "title": "Iniciar campaña de marketing",
                    "payload": "init_campaign"
                },
                {
                    "type": "postback",
                    "title": "Hablar con un asesor",
                    "payload": "talk_human"
                },
                {
                    "type": "web_url",
                    "title": "Ir a tecnómetro",
                    "url": "https://www.tecnometro.net/",
                    "webview_height_ratio": "full"
                }
            ]
        }
    ]
```
