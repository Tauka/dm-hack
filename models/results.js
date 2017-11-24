var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//create a schema
var resultSchema = new Schema({
	name: {
		type: String,
		required: true
	},
	error: {
		type: Number,
		required: true
	}
},	
{
	timestamps: true
});

//thse schema is useless so far
//we need to create a model using it
var Results = mongoose.model('Result', resultSchema);

//make this available to our Node applications
module.exports = Results;