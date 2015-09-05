var express = require('express');
var twitter = require('../twitter');
var router = express.Router();

/* GET home page. */
router.get('/:hashtag', function(req, res, next) {
	// Execute a Twitter search for #meltdown
	twitter.twitterSearch('#' + req.params.hashtag, twitter.authToken(), function(data) {
		//get the hashtags from the tweet
		res.render('index', { hashtag: '#' + req.params.hashtag, tweets: data, parseHashtags: twitter.parseHashtags })
	});
});

module.exports = router;


