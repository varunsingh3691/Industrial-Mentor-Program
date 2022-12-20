const config = require('../config/auth.config');
const { mentor } = require('../models');
const db = require('../models');
const User = db.user;
const Student = db.student;

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
					email: req.body.email
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

module.exports = {
	addStudentData: addStudentData
};
