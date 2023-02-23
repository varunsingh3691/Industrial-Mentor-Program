const mongoose = require('mongoose');

const mentor = mongoose.model(
	'Assignment',
	new mongoose.Schema({
		name: {
			type: String,
			trim: true
		},
		mentor_id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Mentor'
		},

		dateAssigned: {
			type: Date,
			default: Date.now
		},
		url: {
			type: String
		},
		lastDate: { type: Date },
		submissions: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: 'Submission'
			}
		]
	})
);

module.exports = mentor;
