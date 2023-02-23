const mongoose = require('mongoose');

const mentor = mongoose.model(
	'Submission',
	new mongoose.Schema({
		_id: mongoose.Schema.Types.ObjectId,
		student_id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Student'
		},
		assignemt_id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Assignment'
		}
	})
);

module.exports = mentor;
