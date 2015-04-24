var mongoose = require('mongoose');

var GroupSchema = new mongoose.Schema({
	groupid : Number,
	name : String,
	created_at : String,
	admin : {type: mongoose.Schema.Types.ObjectId, ref : 'User'}, 
	moneypool : {type : Number, default : 0},
	
	users : [{type: mongoose.Schema.Types.ObjectId, ref : 'User'}],
	events : [{type: mongoose.Schema.Types.ObjectId, ref : 'Event'}]
});

mongoose.model('Group', GroupSchema, 'Group');