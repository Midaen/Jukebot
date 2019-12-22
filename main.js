console.log("Starting... ");
console.log("Version 1.0.0");

var Twit = require('twit')
var Config = require('./config');
var T = new Twit(Config);
let {PythonShell} = require('python-shell')


function callPython()
{
  console.log('callPython')
  PythonShell.run("/root/Discover/python/random_song.py",null,function(err,data){
    if(err)console.log("oopsie : "+err)

    console.log("done : "+data)
    tweetIt(data);
  })
}

callPython();
setInterval(callPython,1000*60*60);

function tweetIt(uri){

    var tweet = { 
      status: uri
  } ;

T.post('statuses/update', tweet , tweetCallBack);

function tweetCallBack(err, data, response){
    if(err){
        console.log("We encoutered an error :"+err);
    }else { 
        console.log("Looks fine "+data);
    }
}
}

