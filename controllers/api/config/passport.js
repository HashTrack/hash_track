var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var mongoose = require('mongoose');
var User = mongoose.model('User'); 

passport.use(new LocalStrategy({
 	usernameField: 'email_address'
 	},
 	function(username, password, done) {
 		console.log('beginning of passport middleware')
 		User.findOne({ email_address: username }, function(error, user) {
 			console.log('user find callback after passport middleware');
 			console.log(user);
 			if (error) return done(error);
 			if (!user) {
 				return done(null, false, {
 					message: 'Email address and/or password are missing or incorrect'
 				});
 			};
 			user.validatePassword(password, user.password_hash, function(auth) {
 				if (!auth) {
	 				return done(null, false, {
	 					message: 'Email address and/or password are missing or incorrect'
	 				});  					
	 			}
	 			return done(null, user);
 			});
 		});
 	}
)); 