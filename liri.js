//variables
	var keys = require("./keys.js");
	var twitter = require("twitter");
	var request = require("request");
	var nodeSpotify = require("node-spotify-api");
	var fs = require("fs");
	var log4js = require('log4js');
	var inquirer = require('inquirer');

	var argOne = process.argv[2];
	var argTwo = process.argv[3];

	var client = new twitter(keys.twitter_keys);
	var spotify = new nodeSpotify(keys.spotify_keys);
	var omdbKey = keys.omdb_key;


log4js.configure({
  appenders: {
    out: { type: 'fileSync', filename: 'log.txt', layout: { type: 'messagePassThrough' } }
  },
  categories: {
    default: { appenders: [ 'out' ], level: 'info' }
  }
});

const logger = log4js.getLogger();

function spotifySearch(search){

	spotify.search({ type: 'track', query: "track:" + search /*+ "%20artist:ace+base"*/, limit: '1' }, function(err, data) {
	  if (err) {
	    return console.log('Error occurred: ' + err);
		logger.info('Error occurred: ' + err);

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
		logger.info("*********************");
		console.log();
		logger.info();
		console.log("Artists: ");
		logger.info("Artists: ");
		artists.forEach((results)=>{
			console.log(results.name)
			logger.info(results.name)
		});
	}else {
		console.log("*********************");
		logger.info("*********************");
		console.log();
		logger.info();
		console.log("Artist: " + artist);
		logger.info("Artist: " + artist);

	}
	// console.log(artistName); 
	console.log();
	logger.info();
	console.log("Song Name: " + trackName); 
	logger.info("Song Name: " + trackName); 
	if (previewURL === null){
		console.log();
		logger.info();
		console.log("Sorry, No Preview For This Song!");
		logger.info("Sorry, No Preview For This Song!");
	}else{
		console.log();
		logger.info();
		console.log("Spotify Preview: " + previewURL);
		logger.info("Spotify Preview: " + previewURL);
	}
	console.log();
	logger.info();
	console.log("Album Name: " + albumName); 
	logger.info("Album Name: " + albumName); 
	console.log();
	logger.info();
	console.log("*********************");
	logger.info("*********************");

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
  if (error) {
  	return console.log(error)
  	return logger.info(error)
  }
 // body = JSON.parse(body);
	console.log("***********************");
	logger.info("***********************");
	tweets.forEach((results)=>{
			console.log();
			logger.info();
	  		console.log(results.created_at.slice(0, -10));
	  		logger.info(results.created_at.slice(0, -10));
	  		console.log(results.text);
	  		logger.info(results.text);
			console.log();
			logger.info();
	  		console.log("-------------------")
	  		logger.info("-------------------")
		
		})
	console.log();
	logger.info();
	console.log("***********************");	
	logger.info("***********************");	
	});
}

function myTweets(){
	var params = {
	screen_name: 'cl_atlanta', 
	count: '20'
	}
	client.get("statuses/user_timeline", params,  function (error, tweets, response) {

	// console.log(tweets)
  if (error) {
  	return console.log(error)
  	return logger.info(error)
  }
 // body = JSON.parse(body);
	console.log("***********************");
	logger.info("***********************");
	tweets.forEach((results)=>{
			console.log();
			logger.info();
	  		console.log(results.created_at.slice(0, -10));
	  		logger.info(results.created_at.slice(0, -10));
	  		console.log(results.text);
	  		logger.info(results.text);
			console.log();
			logger.info();
	  		console.log("-------------------")
	  		logger.info("-------------------")
		
		})
	console.log();
	logger.info();
	console.log("***********************");	
	logger.info("***********************");	
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
	 	console.log("**************************");
	 	logger.info("**************************");
		console.log();
		logger.info();
		console.log("Movie Title: " + body.Title);
		logger.info("Movie Title: " + body.Title);
		console.log();
		logger.info();
		console.log("Year: " + body.Year);
		logger.info("Year: " + body.Year);
		console.log();
		logger.info();
		console.log("IMDB Rating: " + body.Ratings[0].Value);
		logger.info("IMDB Rating: " + body.Ratings[0].Value);
		console.log();
		logger.info();
		console.log("Rotten Tomatoes Rating: " + body.Ratings[1].Value);
		logger.info("Rotten Tomatoes Rating: " + body.Ratings[1].Value);
		console.log();
		logger.info();
		console.log("Country: " + body.Country);
		logger.info("Country: " + body.Country);
		console.log();
		logger.info();
		console.log("Language: " + body.Language);
		logger.info("Language: " + body.Language);
		console.log();
		logger.info();
		console.log("Actors: " + body.Actors);
		logger.info("Actors: " + body.Actors);
		console.log();
		logger.info();
		console.log("Plot: " + body.Plot);
		logger.info("Plot: " + body.Plot);
		console.log();
		logger.info();
		console.log("**************************")
		logger.info("**************************")
	});
}

function txtCommand(){
	fs.readFile('random.txt', 'utf-8', function(error, data){
	data = data.split(',');
	argOne = data[0];
	argTwo = data[1];
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
	}); 
}

function liriSearch(){

	if (argOne === "spotify-this-song" && argTwo === undefined ){
		spotifySearch("The Sign ace of base")
	}else if (argOne === "spotify-this-song" && argTwo === '') {
		spotifySearch("The Sign ace of base")
	}else if (argOne === "spotify-this-song"){
		spotifySearch(argTwo);
	}

	//twitter if statement
	if (argOne === "my-tweets"){
		myTweets();
	}

	//OMDB if statement
	if (argOne === "movie-this" && argTwo === undefined ){
		movieInfo("Mr. Nobody")
	}else if (argOne === "movie-this" && argTwo === '') {
		movieInfo("Mr. Nobody")  
	}else if (argOne === "movie-this"){
		movieInfo(argTwo);
	}

	//do what it says statement
	if (argOne === "do-what-it-says"){
		txtCommand();
	}
}

var liriSelect = function () {
	inquirer.prompt([
			{
				type: 'list',
				name: 'liriChoice',
				choices: ['LIRI for Developers', 'LIRI for Users'],
				message: 'Choose Your Preference'
			}, {
				type: 'input',
				name: 'command',
				message: 'Type your LIRI command:',
				when: function(answers){
					if (answers.liriChoice === 'LIRI for Developers'){
						return true;
					}
				}
			}, {
				type: 'list',
				name: 'liri',
				choices: ['Spotify A Song', 'OMDB A Movie', 'Check Recent Tweets', 'Special Sauce'],
				message: 'Choose A Command For LIRI',
				when: function(answers){
					if (answers.liriChoice === 'LIRI for Users'){
						return true;
					}
				}
			}, {
				type: 'input',
				name: 'spotifySong',
				message: 'Type in a song to search:',
				when: function(answers){
					if (answers.liri === 'Spotify A Song'){
						return true;
					}
				}
			}, {
				type: 'input',
				name: 'omdbSearch',
				message: 'Type in a movie to search:',
				when: function(answers){
					if (answers.liri === 'OMDB A Movie'){
						return true;
					}
				}
			}  
		]).then(answers => {
			if(answers.liri === 'Spotify A Song'){
			argOne = 'spotify-this-song';
			argTwo = answers.spotifySong;
			}else if(answers.liri === 'OMDB A Movie'){
			argOne = 'movie-this';
			argTwo = answers.omdbSearch;
			}else if(answers.liri === 'Check Recent Tweets'){
			argOne = 'my-tweets';
			}else if(answers.liri === 'Special Sauce'){
			argOne = 'do-what-it-says';
			}else {
				answers.command = answers.command.replace(/'|"/g, '');
				commandArr = answers.command.split(' ');
				argOne = commandArr[0];
				argTwo = commandArr.slice(1).toString().replace(/,/g, ' ');
			}
			// console.log(argTwo);
			liriSearch();
		})
}

liriSelect();

//**code to bypass console log and write directly to a file
// log4js.configure({
//   appenders: {
//     out: { type: 'fileSync', filename: 'log.txt', layout: { type: 'messagePassThrough' } }
//   },
//   categories: {
//     default: { appenders: [ 'out' ], level: 'info' }
//   }
// });

// const logger = log4js.getLogger();
// console.log = logger.info.bind(logger);


