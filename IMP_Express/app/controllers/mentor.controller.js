const config = require('../config/auth.config');
const { mentor } = require('../models');
const db = require('../models');
const Mentor = db.mentor;
const User = db.user;

const addMentorData = async (req, res) => {
	try {
		await User.findOne({ email: req.body.email }, async (err, user) => {
			if (err) {
				res.status(500).send({ message: err });
				return;
			} else {
				const addedMentor = await new Mentor({
					_id: user._id,
					firstName: req.body.firstName,
					lastName: req.body.lastName,
					email: req.body.email,
					company: req.body.company,
					mobile: req.body.mobile,
					designation: req.body.designation,
					address: req.body.address,
					experience: req.body.experience,
					expertise: req.body.experitse,
					gender: req.body.gender,
					qualification: req.body.qualification
				});
				addedMentor.save(async (err, mentor) => {
					if (err) {
						res.status(500).send({
							message: err.message || 'Some error occurred while saving data'
						});
					} else {
						res.status(201).send({ message: 'Mentor data was saved successfully!' });
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
	addMentorData: addMentorData
};
