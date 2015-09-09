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
	if (!req.body.email_address || !req.body.password) {
		sendJSONresponse(res, 400, {
			message: 'all fields are required'
		});
	}
});

var sendJSONresponse = function(res, status, content) {
	res.status(status);
	res.json(content);
}; 

module.exports = router;
