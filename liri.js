var twitterKeys = require("./keys.js")

// console.log(twitterKeys.consumer_key)

var request = require("request");

var options = 
{ method: 'GET',
  url: 'https://api.twitter.com/1.1/statuses/user_timeline.json',
  qs: { screen_name: 'cl_atlanta', count: '2' },
  headers: 
   { 'postman-token': '9afcbeea-3b88-7ed6-91e5-c3bb30a0d92c',
     'cache-control': 'no-cache',
     authorization: 'Bearer AAAAAAAAAAAAAAAAAAAAAKmU3gAAAAAANM9JAI5IJOaQdagVb%2FKHRLV1WhY%3DSY2BYcLqvMpXX9H4HFB4SwDzO2zvB2GkoAIvDDMPERc92wM7wo' } 
};

request(options, function (error, response, body) {
  if (error) {return console.log(error)}
 body = JSON.parse(body)
  console.log(body[0].created_at);
});