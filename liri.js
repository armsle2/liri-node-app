var twitterKeys = require("./keys.js")

// console.log(twitterKeys.consumer_key)

var request = require("request");
var argOne = process.argv[2];
var argTwo = process.argv[3];
function movieInfo(body){
	console.log("Movie Title: " + body.Title);
	console.log("Year: " + body.Year);
	console.log("IMDB Rating: " + body.Ratings[0].Value);
	console.log("Rotten Tomatoes Rating: " + body.Ratings[1].Value);
	console.log("Country: " + body.Country);
	console.log("Language: " + body.Language);
	console.log("Actors: " + body.Actors);
	console.log("Plot: " + body.Plot);
}

var twitterAPI = 
{ method: 'GET',
  url: 'https://api.twitter.com/1.1/statuses/user_timeline.json',
  qs: { screen_name: 'cl_atlanta', count: '20' },
  headers: 
   { 'postman-token': '9afcbeea-3b88-7ed6-91e5-c3bb30a0d92c',
     'cache-control': 'no-cache',
     authorization: 'Bearer AAAAAAAAAAAAAAAAAAAAAKmU3gAAAAAANM9JAI5IJOaQdagVb%2FKHRLV1WhY%3DSY2BYcLqvMpXX9H4HFB4SwDzO2zvB2GkoAIvDDMPERc92wM7wo' } 
};

request(twitterAPI, function (error, response, body) {
  if (error) {return console.log(error)}
 body = JSON.parse(body);
body.forEach((results)=>{
	if (argOne === "my-tweets"){
  		console.log(results.created_at.slice(0, -10));
  		console.log(results.text);
  		console.log("-------------------")
	}

	})
});


var omdbAPI = 
{ method: 'GET',
  url: 'http://www.omdbapi.com/?apikey=trilogy&',
  qs: { t: argTwo, r: 'json', type: 'movie' }
};

request(omdbAPI, function (error, response, body) {
  // if (error) {return console.log(error)}
 body = JSON.parse(body);
 // console.log(body)

if (argOne === "movie-this" && body.Title === undefined){
	omdbAPI.qs.t = "Mr. Nobody"
    request(omdbAPI, function (error, response, body){body = JSON.parse(body);
		movieInfo(body);
			
	});
}
else if(argOne === "movie-this"){
	movieInfo(body);
}


});


