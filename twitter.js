var twitter = twitter || {}

var request = require('request');
var qs = require('querystring');

twitter.base64EncodeString = function(s) {
	var ret = new Buffer(s).toString('base64');
	return ret;
}

twitter.authToken = function() {
	//twitter api keys
	twitter.consumer_key = process.env.TWITTER_KEY;
	twitter.consumer_secret = process.env.TWITTER_SECRET;

	//URI encode the strings
	twitter.consumer_key_encoded = encodeURIComponent(twitter.consumer_key);
	twitter.consumer_secret_encoded = encodeURIComponent(twitter.consumer_secret);

	//concatenate encoded key and secret with : as delimiter
	twitter.bearer_token_credentials = twitter.consumer_key_encoded + ':' + twitter.consumer_secret_encoded

	//base64 encode the bearer token credentials
	twitter.bearer_token_credentials_base64 = twitter.base64EncodeString(twitter.bearer_token_credentials);

	//return autho token
	return twitter.bearer_token_credentials_base64;
}

twitter.executeTwitterAPICall = function(authToken, callback) {
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

twitter.twitterHashtagSearch = function(query, authToken, callback) {
	//execute the POST request to OAuth
	twitter.executeTwitterAPICall(authToken, function(bearer_token) {
		var search = qs.stringify(query);
		var url = "https://api.twitter.com/1.1/search/tweets.json?" + search;
		console.log("getting data from: " + url);
		var options = {
			method: 'GET',
			url: url,
			headers: { "Authorization": "Bearer " + bearer_token }
		}
		request(options, function(error, response, body) {
			var results = JSON.parse(body).statuses;
			var highest_id = twitter.getHighestId(results);
			var lowest_id = twitter.getLowestId(results);
			callback(results, highest_id, lowest_id);
		});
	});
};

twitter.getHighestId = function(data) {
	var ids = data.map(function(tweet) { return tweet.id });
	return Math.max.apply(Math, ids);
};

twitter.getLowestId = function(data) {
	var ids = data.map(function(tweet) { return tweet.id });
	return Math.min.apply(Math, ids);
};

twitter.parseHashtags = function(tweet) {
	var hashtags = [];
	tweet.split(' ').forEach(function(word) {
    if (word.slice(0,1) == '#') hashtags.push(word); 
	});
	return hashtags;
}

twitter.geoHashTagQuery = function(hashtag, lat, lon, radius) {
	var ret = '#' + hashtag + ' geocode:' + lat.toString() + ',' + lon.toString() + ',' + radius.toString() + 'km';
	console.log('building a query: ' + ret);
	return ret;
}

module.exports = twitter;