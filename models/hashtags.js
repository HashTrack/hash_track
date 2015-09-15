var mongoose = require('mongoose');

var HashtagSchema = mongoose.Schema({
	name: String,
	user: {type: mongoose.Schema.ObjectId, ref: 'User'},
	last_tweet_id: Number,
	tracked: Boolean,
	created_at: { type: Date, "default": new Date() }
});

module.exports = mongoose.model('Hashtag', HashtagSchema);