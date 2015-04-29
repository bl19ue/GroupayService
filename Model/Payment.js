var mongoose = require('mongoose');

var PaymentSchema = new mongoose.Schema({
	paymentid : Number,
	group : {type : String},
	user : {type: String},
	amount : Number,
	date : String
});

mongoose.model('Payment', PaymentSchema, 'Payment');