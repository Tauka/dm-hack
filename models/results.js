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

resultSchema.methods.getUpdatedTime = function() {
	const date = new Date(this.updatedAt.getTime());
	let minutes = date.getMinutes() + '';
	if (minutes.length < 2) {
		minutes = '0' + minutes;
	}

	let hours = date.getHours() + '';
	if (hours.length < 2) {
		hours = '0' + hours;
	}

	let month = (date.getMonth() + 1) + '';

	if (month.length < 2) {
		month = '0' + month;
	}

	let day = date.getDate() + '';

	if (day.length < 2) {
		day = '0' + day;
	}

	let year = date.getFullYear();

	return `${hours}:${minutes} ${day}.${month}.${year}`
};

//thse schema is useless so far
//we need to create a model using it
var Results = mongoose.model('Result', resultSchema);

//make this available to our Node applications
module.exports = Results;