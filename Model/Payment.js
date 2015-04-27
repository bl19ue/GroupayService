var mongoose = require('mongoose');

var PaymentSchema = new mongoose.Schema({
	paymentid : Number,
	group : {type: mongoose.Schema.Types.ObjectId, ref : 'Group'},
	user : {type: mongoose.Schema.Types.ObjectId, ref : 'User'},
	amount : Number,
	date : String
});

mongoose.model('Payment', PaymentSchema, 'Payment');