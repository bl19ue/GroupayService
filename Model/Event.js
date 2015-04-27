var mongoose = require('mongoose');

var EventSchema = new mongoose.Schema({
	eventid : Number,
	name : String,
	owner : {type: Number},
	users : [{type: Number}],
	money_required : Number,
	created_at : String,
	group : {type: Number}
});

mongoose.model('Event', EventSchema, 'Event');