var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var cors = require('cors');
var bcrypt = require('bcrypt');
var mongoose = require('mongoose');
var Hashtag = require('../models/hashtags');
var User = require('../models/users');

// POST an authentication request for an email / password confirmation
router.post('/', function(req, res, next) {
	console.log('retrieving credentials from the POST...');
	User.findOne({ email_address: req.body.email_address })
	.exec(function(error, data) {
		if (error) return error;
		console.log(data);
		if (typeof data != 'undefined') {
			bcrypt.compare(req.body.password, data.password_hash, function(error, auth) {
				if (error) return error;
				console.log('auth value: ' + auth);
				if (auth) {
					res.json(data);
				} else res.status(401).send("Email address and/or password do not match our records")
			});
		} else {
			res.status(401).send("Email address and/or password do not match our records")
		}
	});
});

module.exports = router;