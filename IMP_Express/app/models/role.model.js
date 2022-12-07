const mongoose = require('mongoose');

const Role = mongoose.model(
	'Role',
	new mongoose.Schema({
		name: String,
		typeID: Number
	})
);

module.exports = Role;
