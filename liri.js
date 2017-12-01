// link to our keys
var myKeys = require('./keys.js');
// command to switch to
var command = process.argv[2];
// second thing you input
var action = process.argv[3];
// fs is a core Node package for reading and writing files
var fs = require("fs");
// require the twitter npm
var Twitter = require('twitter');
// put our keys in
var client = new Twitter(myKeys.twitterKeys);
// require the spotify npm
var Spotify = require("node-spotify-api");
// put our keys in
var client2 = new Spotify(myKeys.spotifyKeys);
// We then store the textfile filename given to us from the command line
var textFile = ('./log.txt');

// The switch-case will direct which function gets run.
switch (command) {
  case "movie-this":
    ``
    movie();
    break;

  case "my-tweets":
    tweet();
    break;

  case "spotify-this-song":
    spot();
    break;

  case "do-what-it-says":
    justDoIt();
    break;

}

// function calling out to OMDB
function movie() {
  if (action === undefined) {
    action = "Mr. Nobody";
    console.log("If you haven't seen Mr. Nobody, you should. It's on netflix now, so you have no excuse")
  }
  var request = require("request");
  //  run a request to the OMDB API with the movie title
  var queryUrl = "http://www.omdbapi.com/?t=" + action + "&y=&plot=short&apikey=trilogy";

  // Then create a request to the queryUrl
  request(queryUrl, function(error, response, body) {
    // If the request is successful

    // If the request is successful, tell me it was then log the info
    if (!error && response.statusCode === 200) {
      // create a variable for JSON parse so you don't have to type it out each time
      var body = JSON.parse(body);
      console.log("Title: " + body.Title);
      fs.appendFile(textFile, "Title: " + body.Title + "\n")
      //Year the movie came out.
      console.log("Release Year: " + body.Year);
      fs.appendFile(textFile, "Release Year: " + body.Year + "\n")
      // IMDB Rating of the movie.
      console.log("IMdB Rating: " + body.imdbRating);
      fs.appendFile(textFile, "IMdB Rating: " + body.imdbRating)
      //Country where the movie was produced.
      console.log("Country: " + body.Country);
      fs.appendFile(textFile, "Country: " + body.Country + "\n")
      //Language of the movie.
      console.log("Language: " + body.Language);
      fs.appendFile(textFile, "Language: " + body.Language + "\n")
      //Plot of the movie.
      console.log("Plot: " + body.Plot);
      fs.appendFile(textFile, "Plot: " + body.Plot + "\n")
      //Actors in the movie.
      console.log("Actors: " + body.Actors);
      fs.appendFile(textFile, "Actors: " + body.Actors + "\n")
      //Rotten Tomatoes Rating of the movie.
      console.log("Rotten Tomatoes Rating: " + body.Ratings[1].Value);
      fs.appendFile(textFile, "Rotten Tomatoes Rating: " + body.Ratings[1].Value + "\n");
    }
  });
}

// function to call twitter
function tweet() {

  // your username and number of searches to render
  var params = {
    screen_name: 'johnsmi88488059',
    count: 20

  };
  // get some tweets
  client.get('statuses/user_timeline', params, function(err, tweets) {
    if (err) { // tell me if an error occurs
      console.log("something is wrong" + err);
      return;
    } // and if one doesn't go thru the tweets and get 20
    else {
      for (var i = 0; i < tweets.length; i++) {
        // show me the tweets and append them
        console.log(tweets[i].text);
        fs.appendFile(textFile, tweets[i].txt + "\n");
      }
    }
  });
}

// function to call spotify
function spot() {
  if (action === undefined) {
    action = "The Sign";
  }
  // Search tracks whose name, album or artist contain your input
  client2.search({ type: 'track', query: action }, function(err, data) {
    if (err) {
      console.log("something is wrong" + err);
      return;
    }
    else {
      // console log results and append them to the log.txt file
      // artist
      console.log("Artist: " + data.tracks.items[0].artists[0].name);
      fs.appendFile(textFile, "Artist: " + data.tracks.items[0].artists[0].name + "\n");
      // song name
      console.log("Song Name: " + data.tracks.items[0].name);
      fs.appendFile(textFile, "Song Name: " + data.tracks.items[0].name + "\n");
      // preview link of the song from Spotify
      console.log("Preview Link: " + data.tracks.items[0].preview_url)
      fs.appendFile(textFile, "Preview Link: " + data.tracks.items[0].preview_url + "\n")
      // album song is from
      console.log("Album: " + data.tracks.items[0].album.name)
      fs.appendFile(textFile, "Album: " + data.tracks.items[0].album.name + "\n")

    }

  });

}

// do-what-it-says function
function justDoIt() {

  // This block of code will read from the "random.txt" file.
  fs.readFile("random.txt", "utf8", function(error, contents) {
    // If the code experiences any errors it will log the error to the console.
    if (error) {
      return console.log(error);
    }
    // array holds the contents we got from random.txt
    var contentsArr = contents

    // newAction = the second thing in the array because we're gonna call spotify this way and bypass first argument of the file
    var newAction = contentsArr[1];
    // give a shout out to spotify
    client2.search({ type: 'track', query: newAction }, function(err, data) {
      if (err) {
        console.log("something is wrong" + err);
        return;
      }
      else {
        // console log results and append them to the log.txt file
        // artist
        console.log("Artist: " + data.tracks.items[0].artists[0].name);
        fs.appendFile(textFile, "Artist: " + data.tracks.items[0].artists[0].name + "\n");
        // song name
        console.log("Song Name: " + data.tracks.items[0].name);
        fs.appendFile(textFile, "Song Name: " + data.tracks.items[0].name + "\n");
        // preview link of the song from Spotify
        console.log("Preview Link: " + data.tracks.items[0].preview_url)
        fs.appendFile(textFile, "Preview Link: " + data.tracks.items[0].preview_url + "\n")
        // album song is from
        console.log("Album: " + data.tracks.items[0].album.name)
        fs.appendFile(textFile, "Album: " + data.tracks.items[0].album.name + "\n")
      }

    });

  });

}



