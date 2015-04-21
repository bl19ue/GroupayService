var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
	userid : Integer,
	name : String,
	email : String,
	groups : [{type: mongoose.Schema.Types.ObjectId, ref : 'Group'}],
	events : [{type: mongoose.Schema.Types.ObjectId, ref : 'Event'}],
	payments : [{type: mongoose.Schema.Types.ObjectId, ref : 'Payment'}],
});

mongoose.model('User', UserSchema, 'User');