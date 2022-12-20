const mongoose = require('mongoose');

const mentor = mongoose.model(
	'Mentor',
	new mongoose.Schema({
		_id: mongoose.Schema.Types.ObjectId,
		firstName: String,
		lastName: String,
		companyName: String,
		mobile: Number,
		email: String,
		designation: String,
		address: String,
		experience: String,
		expertise: String,
		gender: String
	})
);

module.exports = mentor;
