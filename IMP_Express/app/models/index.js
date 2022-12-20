const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

db.user = require('./user.model');
db.role = require('./role.model');
db.mentor = require('./mentor.model');
db.student = require('./student.model');

db.ROLES = [ 'student', 'admin', 'mentor' ];

module.exports = db;
