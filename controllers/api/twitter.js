var express = require('express');
var twitter = require('../../twitter');
var router = express.Router();

/* GET Twitter Standard Search */
router.get('/search/:hashtag', function(req, res, next) {
	console.log('Executing a standard non-geotagged twitter search...');
	// Execute a Twitter search for any hashtag
	// get the query sytax
	var query = req.params.hashtag;
	twitter.twitterSearch(query, twitter.authToken(), function(data) {
		//get the hashtags from the tweet
		res.json(data);
	});
});


/* GET Twitter Geo Search */
router.get('/search/:hashtag/:lat/:lon/:radius', function(req, res, next) {
	console.log('Executing a geotagged twitter search...');
	// Execute a Twitter search for any hashtag
	// get the query sytax including geo location data
	var query = twitter.geoHashTagQuery(req.params.hashtag, req.params.lat, req.params.lon, req.params.radius)
	twitter.twitterSearch(query, twitter.authToken(), function(data) {
		//get the hashtags from the tweet
		res.json(data);
	});
});

module.exports = router;