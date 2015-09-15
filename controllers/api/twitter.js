var express = require('express');
var twitter = require('../../twitter');
var router = express.Router();

/* GET Twitter Standard Search */
router.get('/search/:hashtag/:since', function(req, res, next) {
	console.log('Executing a standard non-geotagged twitter search...');
	// Execute a Twitter search for any hashtag
	// get the query sytax
	if (req.params.since) {
		var query = { q: '#' + req.params.hashtag, since_id: req.params.since, count: 100 };	
	} else {
		var query = { q: '#' + req.params.hashtag, count: 100 };	
	}
	twitter.twitterHashtagSearch(query, twitter.authToken(), function(data, highest_id, lowest_id) {
		//get the hashtags from the tweet
		res.json({ tweets: data, highest_id: highest_id, lowest_id: lowest_id });
	});
});


/* GET Twitter Geo Search */
router.get('/search/:hashtag/:lat/:lon/:radius/:since', function(req, res, next) {
	console.log('Executing a geotagged twitter search...');
	// Execute a Twitter search for any hashtag
	// get the query sytax including geo location data
	if (req.params.since) {
		var query = {q: twitter.geoHashTagQuery(req.params.hashtag, req.params.lat, req.params.lon, req.params.radius), since_id: req.params.since, count: 100 };
	} else {
		var query = {q: twitter.geoHashTagQuery(req.params.hashtag, req.params.lat, req.params.lon, req.params.radius), count: 100 };
	}
	twitter.twitterHashtagSearch(query, twitter.authToken(), function(data, highest_id) {
		//get the hashtags from the tweet
		res.json({ tweets: data, highest_id: highest_id });
	});
});

module.exports = router;