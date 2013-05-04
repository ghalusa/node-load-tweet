/**
 * Script dependencies
 */

var twitter = require('ntwitter');
var settings = require('./config.js');
var exec = require('child_process').exec;

var twit = new twitter({
  consumer_key: settings.consumer_key ,
  consumer_secret: settings.consumer_secret ,
  access_token_key: settings.access_token_key ,
  access_token_secret: settings.access_token_secret
});

/**
 * Callback function for the uptime twitter command
 */

function twitter_uptime_callback (error, stdout, stderr) {
  twit.verifyCredentials(function (err, data) {
    if (err) {
      console.log("Error verifying credentials: " + err);
      process.exit(1);
    }
    }).updateStatus(settings.server_name+' uptime+load: /' +
        stdout + settings.additional_status_content,
      function (err, data) {
        if (err) console.log('Tweeting failed: ' + err);
        else console.log('Success!')
      }
  );
}

/**
 * Function to get the uptime of the server
 */

function tweet () {
  child = exec("uptime", twitter_uptime_callback);
}

/**
 * Execute at the desired interval (miliseconds)
 */

// 60000 (one minute), 3600000 (one hour), 28800000 (8 hours)
setInterval(tweet,28800000);