const mongoose = require('mongoose');

const Role = mongoose.model(
	'Role',
	new mongoose.Schema({
		name: {
			type: String,
			trim: true
		},
		typeID: Number
	})
);

module.exports = Role;
