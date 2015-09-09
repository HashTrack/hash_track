var mongoose = require('mongoose');
var bcrypt = require('bcrypt');

var UserSchema = new mongoose.Schema({
	email_address: { type: String, unique: true, required: true }
	password_hash: String,
	created_at: { type: Date, "default": new Date() }
});

UserSchema.methods.setPassword = function(password) {
	// build an encrypted password and store user in user DB
	bcrypt.genSalt(10, function(error, salt) {
		if (error) return error;
		bcrypt.hash(userPassword, salt, function(error, hash) {
			if (error) return error;
			// Store hash in the password field of user DB.
			this.password_hash = hash; 
}
UserSchema.methods.validatePassword = function(password) {
	bcrypt.compare(req.body.password, data.password_hash, function(error, auth) {
		if (error) return error;
		return auth;
}

module.exports = mongoose.model('User', UserSchema);