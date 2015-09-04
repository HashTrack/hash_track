var app = app || {}

var express = require('express');
var router = express.Router();
var request = require('request');
var qs = require('querystring');

//twitter api keys
app.consumer_key = 'eaGXlxn3LwlQCjsF4Yyh9Ns7e';
app.consumer_secret = '19fRDCso6Xq6GZjgzfRrxzRzcS33YmkUaXBXA14xueQegfyjB0';	

//URI encode the strings
app.consumer_key_encoded = encodeURIComponent(app.consumer_key);
app.consumer_secret_encoded = encodeURIComponent(app.consumer_secret);

//concatenate encoded key and secret with : as delimiter
app.bearer_token_credentials = app.consumer_key_encoded + ':' + app.consumer_secret_encoded

//base64 encode the bearer token credentials
app.bearer_token_credentials_base64 = base64EncodeString(app.bearer_token_credentials);


/* GET home page. */
router.get('/:hashtag', function(req, res, next) {
	// Execute a Twitter search for #meltdown
	twitterSearch('#' + req.params.hashtag, app.bearer_token_credentials_base64, function(data) {
		data.forEach(function(tweet) {
			console.log(tweet.text.search(/#/g));
		})
		res.render('index', { hashtag: '#' + req.params.hashtag })
	});
});

module.exports = router;

function base64EncodeString(s) {
	var ret = new Buffer(s).toString('base64');
	return ret;
}

function executeTwitterAPICall(authToken, callback) {
	var ret = {};
	var options = {
		url: "https://api.twitter.com/oauth2/token",
		method: "POST",
		headers: { "Authorization": "Basic " + authToken,
				   "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
		},
		body: "grant_type=client_credentials"
	}
	request(options, function(error, response, body) {
		console.log(body);
		var bearer_token = JSON.parse(body).access_token;
		callback(bearer_token);
	});
}

function twitterSearch(query, authToken, callback) {
	//execute the POST request to OAuth
	executeTwitterAPICall(authToken, function(bearer_token) {
		var search = qs.stringify({ q: query, count: 100 });
		var url = "https://api.twitter.com/1.1/search/tweets.json?" + search
		console.log("getting data from: " + url);
		var options = {
			method: 'GET',
			url: url,
			headers: { "Authorization": "Bearer " + bearer_token }
		}
		request(options, function(error, response, body) {
			var results = JSON.parse(body).statuses;
			callback(results);
		});
	});
}
