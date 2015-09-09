var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var mongoose = require('mongoose');
var User = mongoose.model('User'); 

passport.use(new LocalStrategy({
 	usernameField: 'email_address'
 	},
 	function(username, password, done) {
 		User.findOne({ email_address: username }, function(error, user) {
 			if (error) return done(error);
 			if ((!user) || (!user.validatePassword(password))) {
 				return done(null, false, {
 					message: 'Email address and/or password are missing or incorrect'
 				});
 			}
 			return done(null, user);
 		});
 	}
)); 