var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var cors = require('cors');
var bcrypt = require('bcrypt');
var mongoose = require('mongoose');
var Hashtag = require('../../models/hashtags');
var User = require('../../models/users');

// new user registrations

// POST a new user to the DB
router.post('/', function(req, res, next) {
	console.log('Attempting to create a new user...');
	var userEmail = req.body.email_address;
	var userPassword = req.body.password;

	User.find({ email_address: userEmail }, function(error, data) {
		if (error) return error;
		if (data.length === 0) {
			// build an encrypted password and store user in user DB
			bcrypt.genSalt(10, function(error, salt) {
				if (error) return error;
			    bcrypt.hash(userPassword, salt, function(error, hash) {
			    	if (error) return error;
			        // Store hash in the password field of user DB. 
			        User.create({ email_address: userEmail, password_hash: hash }, function(error, data) {
			        	if (error) return error;
			        	res.json(data);
			        });
			    });
			});
		} else {
			res.status(403).send('User already exists or bad password format');
		}
	});


});

module.exports = router;
