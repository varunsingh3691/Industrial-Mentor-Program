const mongoose = require('mongoose');

const Student = mongoose.model(
	'Student',
	new mongoose.Schema({
		_id: mongoose.Schema.Types.ObjectId,
		roll: { type: Number, trim: true },
		firstName: {
			type: String,
			trim: true
		},
		lastName: {
			type: String,
			trim: true
		},
		email: {
			type: String,
			trim: true
		},
		mentorAssigned: Boolean,
		mentor_id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Mentor'
		},
		assignmentsComplete: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: 'Assignment'
			}
		]
	})
);

module.exports = Student;
