var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var cors = require('cors');
var bcrypt = require('bcrypt');
var mongoose = require('mongoose');
var Hashtag = require('../../models/hashtags');
var User = require('../../models/users');

// POST an authentication request for an email / password confirmation
router.post('/', function(req, res, next) {
	console.log('retrieving credentials from the POST...');

});

module.exports = router;