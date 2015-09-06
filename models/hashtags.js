var mongoose = require('mongoose');

var HashtagSchema = mongoose.Schema({
	name: String,
	user: {type: mongoose.Schema.ObjectId, ref: 'User'},
	tracked: Boolean,
	user_count: Number,
	tweet_count: Number,
	created_at: { type: Date, "default": new Date() }
});

module.exports = mongoose.model('Hashtag', HashtagSchema);