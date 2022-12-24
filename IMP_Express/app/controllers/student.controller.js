const config = require('../config/auth.config');
const { mentor, student } = require('../models');
const db = require('../models');
const lodash = require('lodash');
const User = db.user;
const Student = db.student;
const Mentor = db.mentor;
const mongoose = db.mongoose;

const addStudentData = async (req, res) => {
	try {
		await User.findOne({ email: req.body.email }, async (err, user) => {
			if (err) {
				res.status(500).send({ message: err });
				return;
			} else {
				const addedStudent = await new Student({
					_id: user._id,
					firstName: req.body.firstName,
					lastName: req.body.lastName,
					email: req.body.email,
					mentorAssigned: false
				});
				addedStudent.save(async (err, student) => {
					if (err) {
						res.status(500).send({
							message: err.message || 'Some error occurred while saving data'
						});
					} else {
						res.status(201).send({ message: 'Student data was saved successfully!' });
					}
				});
			}
		});
	} catch (error) {
		console.log(error);
		res.status(500).send({ message: error.message });
	}
};
const getUnassignedStudent = async (req, res) => {
	try {
		var finalList = [];
		await Student.find({}, async (err, students) => {
			if (!err) {
				students.forEach((student) => {
					if (!student.mentorAssigned) {
						finalList.push(student);
					}
				});
			} else {
				res.status(500).send({ message: err.message });
			}
		});
		res.status(200).send(finalList);
	} catch (error) {
		console.log(error);
		res.status(500).send({ message: error.message });
	}
};

module.exports = {
	addStudentData: addStudentData,
	getUnassignedStudent: getUnassignedStudent
};
