const mongoose = require('mongoose');

const User = mongoose.model(
	'User',
	new mongoose.Schema({
		email: {
			type: String,
			trim: true
		},
		password: String,
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
