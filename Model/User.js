var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
	name : String,
	userid: String,
	email : String,
	groups : [{type: String}],
	events : [{type: String}],
	payments : [{type: String}],
	notifications : [{type: String}]
});

mongoose.model('User', UserSchema, 'User');