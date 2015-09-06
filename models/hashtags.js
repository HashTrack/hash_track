var mongoose = require('mongoose');

var HashtagSchema = mongoose.Schema({
	name: String,
	tracked: Boolean,
	user_count: Number,
	tweet_count: Number,
	created_at: { type: Date, "default": new Date() }
});

module.exports = mongoose.model('Hashtag', HashtagSchema);