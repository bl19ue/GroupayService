var mongoose = require('mongoose');

var EventSchema = new mongoose.Schema({
	eventid : Integer,
	name : String,
	owner : {type: mongoose.Schema.Types.ObjectId, ref : 'User'},
	users : [{type: mongoose.Schema.Types.ObjectId, ref : 'User'}],
	money_required : Number,
	created_at : String,
	group : {type: mongoose.Schema.Types.ObjectId, ref : 'Group'}
});

mongoose.model('Event', EventSchema, 'Event');