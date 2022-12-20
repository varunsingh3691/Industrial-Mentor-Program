const mongoose = require('mongoose');

const student = mongoose.model(
	'Student',
	new mongoose.Schema({
		_id: mongoose.Schema.Types.ObjectId,
		firstName: String,
		lastName: String,
		email: String
	})
);

module.exports = student;
