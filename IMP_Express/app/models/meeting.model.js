const mongoose = require('mongoose');

const mentor = mongoose.model(
	'Meeting',
	new mongoose.Schema({
		_id: mongoose.Schema.Types.ObjectId,
		mentor_id: {
			type: mongoose.Schema.Types.ObjectId
		},
		lastName: {
			type: String,
			trim: true
		},
		timing: {
			type: Date,
			trim: true
		},
		mobile: {
			type: String,
			trim: true
		},
		email: {
			type: String,
			trim: true
		},
		designation: {
			type: String,
			trim: true
		},
		address: {
			type: String,
			trim: true
		},
		experience: {
			type: String,
			trim: true
		},
		expertise: {
			type: String,
			trim: true
		},
		gender: {
			type: String,
			trim: true
		},
		mentees: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: 'Student'
			}
		]
	})
);

module.exports = mentor;
