const mongoose = require('mongoose');

const Student = mongoose.model(
	'Student',
	new mongoose.Schema({
		_id: mongoose.Schema.Types.ObjectId,
		firstName: String,
		lastName: String,
		email: String,
		mentorAssigned: Boolean
	})
);

module.exports = Student;
