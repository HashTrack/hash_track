var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var bcrypt = require('bcrypt');
var passport = require('passport');
var mongoose = require('mongoose');
var Hashtag = require('../../models/hashtags');
var User = require('../../models/users');

// new user registrations
// POST a new user to the DB
router.post('/', function(req, res, next) {
	console.log('Registering user');
	if (!req.body.email_address || !req.body.password) {
		sendJSONresponse(res, 400, {
			message: 'all fields are required'
		});
		return;
	}
	User.findOne({email_address: req.body.email_address}, function(error, data) {
		if (data) {
			sendJSONresponse(res, 400, {
				message: 'User already exists'
			});
		} else {
			var user = new User(); 
		 	user.email_address = req.body.email_address; 
		 	user.setPassword(req.body.password, function() {
				user.save(function(error) {
			 		var token;
			 		if (error) {
			 			sendJSONresponse(res, 400, error)
			 		} else {
			 			token = user.generateJwt();
			 			sendJSONresponse(res, 200, {"token": token})
			 			console.log('The saved user has a password_hash of: ' + user.password_hash);
			 		}
			 	});
		 	});
		}
	});
});

var sendJSONresponse = function(res, status, content) {
	res.status(status);
	res.json(content);
}; 

module.exports = router;
