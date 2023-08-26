export const exampleResponse = {
  body: {
    "manifestId": "64dcd7a6e5f74f15d6c42da8",
    "accountId": "648b012b4c35a89b4f25f035",
    "channelId": "64dcd7a6e5f74f15d6c42daa",
    "events": {
      "ticket_action": [
        {
          "ticketId": "64df79734ecfe084f398ae15",
          "networkItemId": "impossinle",
          "type": "reply",
          "actionId": "reply-as-comment",
          "payload": {
            "followupId": "e32f7bc0-4008-11ee-a26f-6d6444d01d92",
            "text": "werewr"
          },
          "time": 1692611741102,
          "uuid": "0b61f576-9b8f-4440-867f-72a170e29123"
        }
      ]
    }
  },
  headers: {
    "host": "localhost:4000",
    "accept-encoding": "gzip, deflate",
    "user-agent": "SocialHub",
    "content-type": "application/json",
    "x-socialhub-timestamp": "1692611741210",
    "x-socialhub-signature": "780d4a8b5a8f2e19cae5d3152147018e38d2c63266dc7180153e41644220a346",
    "content-length": "409",
    "connection": "close"
  },
  requestInfo: {
    "hostname": "localhost",
    "httpVersion": "1.1",
    "ip": "::ffff:127.0.0.1",
    "ips": [],
    "method": "POST",
    "route": {
      "path": "/webhook",
      "stack": [
        {
          "name": "verifySignature",
          "keys": [],
          "regexp": {
            "fast_star": false,
            "fast_slash": false
          },
          "method": "post"
        },
        {
          "name": "processWebhookData",
          "keys": [],
          "regexp": {
            "fast_star": false,
            "fast_slash": false
          },
          "method": "post"
        }
      ],
      "methods": {
        "post": true
      }
    }
  },
  urlInfo: {
    "url": "/webhook",
    "baseUrl": "",
    "protocol": "http",
    "params": {},
    "path": "/webhook",
    "query": {}
  }
}