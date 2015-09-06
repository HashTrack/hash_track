var express = require('express');
var twitter = require('../twitter');
var router = express.Router();

/* GET home page. */
router.get('/search/:hashtag', function(req, res, next) {
	// Execute a Twitter search for #meltdown
	twitter.twitterSearch('#' + req.params.hashtag, twitter.authToken(), function(data) {
		//get the hashtags from the tweet
		res.json(data);
	});
});

module.exports = router;


