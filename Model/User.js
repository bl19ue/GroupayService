var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
	userid : Number,
	name : String,
	email : String,
	groups : [{type: Number}],
	events : [{type: Number}],
	payments : [{type: Number}],
	notifications : [{type: Number}]
});

mongoose.model('User', UserSchema, 'User');