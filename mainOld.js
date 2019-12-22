console.log("Starting... ");

var Twit = require('twit')
var Config = require('./config');
var T = new Twit(Config);
const https = require('https');
var request = require('request');

/**
 * Generates a random string containing numbers and letters
 * @param  {number} length The length of the string
 * @return {string} The generated string
 */
var generateRandomString = function(length) {
  var text = '';
  var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (var i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

tweetIt();

setInterval(tweetIt,1000*60*2);

function tryUri(random) {
  request('https://open.spotify.com/track/'+random, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      console.log("URL is OK")
    } else {
      console.log("URL is NOK")
      return false
    }
  })
};



function tweetIt(){
  var tweet ; 
  do
  {
    var randomtoken = generateRandomString(22);
    var tweet = { 
      status: 'https://open.spotify.com/track/'+randomtoken
      };
  }while(!tryUri(randomtoken))
   /* var tweet = { 
    status: 'https://open.spotify.com/track/'+randomtoken
} ;*/

T.post('statuses/update', tweet , tweetCallBack);

function tweetCallBack(err, data, response){
    if(err){
        console.log("We encoutered an error :"+err);
    }else { 
        console.log("Looks fine "+data);
    }
}
}
