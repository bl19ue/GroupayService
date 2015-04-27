var mongoose = require('mongoose');

var GroupSchema = new mongoose.Schema({
	groupid : Number,
	name : String,
	created_at : String,
	admin : {type: Number}, 
	moneypool : {type : Number, default : 0},
	frequency : Number,
	frequency_type : String,
	frequency_amount : Number,
	users : [{type: Number}],
	events : [{type: Number}]
});


mongoose.model('Group', GroupSchema, 'Group');