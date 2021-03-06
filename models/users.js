var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');

var UserSchema = new mongoose.Schema({
	email_address: { type: String, unique: true, required: true },
	password_hash: String,
	created_at: { type: Date, "default": new Date() }
});

UserSchema.methods.setPassword = function(password, callback) {
	var that = this;
	// build an encrypted password and store user in user DB
	bcrypt.genSalt(10, function(error, salt) {
		if (error) return error;
		bcrypt.hash(password, salt, function(error, hash) {
			if (error) return error;
			// Store hash in the password field of user DB.
			console.log(hash);
			that.password_hash = hash;
			callback(); 
		});
	});
}

UserSchema.methods.validatePassword = function(password, hash, callback) {
	bcrypt.compare(password, hash, function(error, auth) {
		console.log('is he auth\'d? ' + auth)
		if (error) return error;
		callback(auth);
	});
}

UserSchema.methods.generateJwt = function() {
	var expiry = new Date();
	expiry.setDate(expiry.getDate() + 7);
	return jwt.sign({
		_id: this._id,
		email_address: this.email_address,
		exp: parseInt(expiry.getTime() / 1000)
	}, process.env.JWT_SECRET);
}

module.exports = mongoose.model('User', UserSchema);