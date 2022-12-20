const mongoose = require('mongoose');

const User = mongoose.model(
	'User',
	new mongoose.Schema({
		email: String,
		password: String,
		dataAt: mongoose.Schema.Types.ObjectId,
		typeID: Number,
		roles: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: 'Role'
			}
		]
	})
);

module.exports = User;
