const mongoose = require('mongoose');

const mentor = mongoose.model(
	'Mentor',
	new mongoose.Schema({
		fullName: String,
		company: String,
		mobile: Number,
		email: String
	})
);

module.exports = mentor;
