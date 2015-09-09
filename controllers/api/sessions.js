var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var bcrypt = require('bcrypt');
var passport = require('passport');
var mongoose = require('mongoose');
var Hashtag = require('../../models/hashtags');
var User = require('../../models/users');

// POST an authentication request for an email / password confirmation
router.post('/', function(req, res, next) {
	console.log('beginning of login route...');
	if (!req.body.email_address || !req.body.password) {
		sendJSONresponse(res, 400, {
			message: 'All fields are required'
		});
		return;	
	}
	passport.authenticate('local', function(error, user, info) {
		var token;
		console.log('passport authenticate callback');
		console.log(user);
		if (error) {
			sendJSONresponse(res, 401, error);
			return;
		} 
		if (user) {
			token = user.generateJwt();
			console.log(token);
			sendJSONresponse(res, 200, {"token": token});
		} else {
			sendJSONresponse(res, 401, info);
		}
	})(req, res);
});

var sendJSONresponse = function(res, status, content) {
	res.status(status);
	res.json(content);
}; 

module.exports = router;