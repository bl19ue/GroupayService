var mongoose = require('mongoose');

var JoinSchema = new mongoose.Schema({
	notificationid: Number,
	user: {type: Number},
	admin: {type: Number},
	group: {type: Number},
	is_accepted: {type: Boolean, default: false}
});

mongoose.model('Join', JoinSchema, 'Join');
