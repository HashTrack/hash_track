var mongoose = require('mongoose');

var UserSchema = mongoose.Schema({
	email_address: String,
	password_hash: String,
	created_at: { type: Date, "default": new Date() }
});

module.exports = mongoose.model('User', UserSchema);