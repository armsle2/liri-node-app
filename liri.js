var keys = require("./keys.js");
var twitter = require("twitter");
var request = require("request");
var nodeSpotify = require("node-spotify-api");
// console.log(keys);

var argOne = process.argv[2];
var argTwo = process.argv[3];



var client = new twitter(keys.twitter_keys);
var spotify = new nodeSpotify(keys.spotify_keys);
var omdbKey = keys.omdb_key;

// console.log(keys.spotify_keys)


function spotifySearch(search){

	spotify.search({ type: 'track', query: "track:" + search /*+ "%20artist:ace+base"*/, limit: '1' }, function(err, data) {
	  if (err) {
	    return console.log('Error occurred: ' + err);
	  }

	 // data = JSON.stringify(data)
	 // console.log(data.tracks.items)
	 
	 var albumName = data.tracks.items[0].album.name;
	 var trackName = data.tracks.items[0].name;
	 var artists = data.tracks.items[0].artists;
	 var artist = data.tracks.items[0].artists[0].name;
	 var previewURL = data.tracks.items[0].preview_url;

	if (artists.length > 1){
		console.log("*********************");
		console.log();
		console.log("Artists: ")
		artists.forEach((results)=>{
			console.log(results.name)
		});
	}else {
		console.log("*********************");
		console.log();
		console.log("Artist: " + artist);

	}
	// console.log(artistName); 
	console.log();
	console.log("Song Name: " + trackName); 
	if (previewURL === null){
		console.log();
		console.log("Sorry, No Preview For This Song!");
	}else{
		console.log();
		console.log("Spotify Preview: " + previewURL);
	}
	console.log();
	console.log("Album Name: " + albumName); 
	console.log();
	console.log("*********************");

	//artist(s). the song name, preview link of the song from Spotify, the album that the song is from, default "The Sign" by Ace of Base

	});
}

function myTweets(){
	var params = {
	screen_name: 'cl_atlanta', 
	count: '20'
	}
	client.get("statuses/user_timeline", params,  function (error, tweets, response) {

	// console.log(tweets)
  if (error) {return console.log(error)}
 // body = JSON.parse(body);
	console.log("***********************");
	tweets.forEach((results)=>{
			console.log();
	  		console.log(results.created_at.slice(0, -10));
	  		console.log(results.text);
			console.log();
	  		console.log("-------------------")
		
		})
	console.log();
	console.log("***********************");	
	});
}

function movieInfo(search){
	var omdbAPI = 
	{ 
		method: 'GET',
	  	url: 'http://www.omdbapi.com/?apikey=' + omdbKey + '&',
	  	qs: { t: search, r: 'json', type: 'movie' }
	};

	request(omdbAPI, function (error, response, body) {
	  // if (error) {return console.log(error)}
	 	body = JSON.parse(body);
	 	console.log("**************************")
		console.log();
		console.log("Movie Title: " + body.Title);
		console.log();
		console.log("Year: " + body.Year);
		console.log();
		console.log("IMDB Rating: " + body.Ratings[0].Value);
		console.log();
		console.log("Rotten Tomatoes Rating: " + body.Ratings[1].Value);
		console.log();
		console.log("Country: " + body.Country);
		console.log();
		console.log("Language: " + body.Language);
		console.log();
		console.log("Actors: " + body.Actors);
		console.log();
		console.log("Plot: " + body.Plot);
		console.log();
		console.log("**************************")
	});
}

//spotify if statement
if (argOne === "spotify-this-song" && argTwo === undefined){
	spotifySearch("The Sign")
}else if (argOne === "spotify-this-song"){
	spotifySearch(argTwo);
}

//twitter if statement
if (argOne === "my-tweets"){
	myTweets();
}

//OMDB if statement
if (argOne === "movie-this" && argTwo === undefined){
	movieInfo("Mr. Nobody");  
}
else if (argOne === "movie-this"){
	movieInfo(argTwo);
}





