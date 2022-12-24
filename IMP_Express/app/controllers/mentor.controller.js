const config = require('../config/auth.config');
const { mentor } = require('../models');
const db = require('../models');
const Student = db.student;
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

const getAllMentor = async (req, res) => {
	try {
		await Mentor.find({}, (err, mentors) => {
			if (!err) {
				res.send(mentors);
			} else {
				res.status(500).send({ message: err.message });
			}
		});
	} catch (error) {
		console.log(error);
		res.status(500).send({ message: error.message });
	}
};

const getMentees = async (req, res) => {
	try {
		await Mentor.findById(req.params.mentorID, async (err, mentor) => {
			if (!err) {
				await Student.find(
					{
						_id: {
							$in: mentor.mentees
						}
					},
					(err, data) => {
						if (!err) {
							res.status(200).send(data);
						}
					}
				);
			} else {
				res.status(500).send({ message: err.message });
			}
		});
	} catch (error) {
		console.log(error);
		res.status(500).send({ message: error.message });
	}
};

const getMentorOnMentorID = async (req, res) => {
	try {
		await Mentor.findById(req.params.mentorID, (err, mentor) => {
			if (!err) {
				res.status(200).send(mentor);
			} else {
				res.status(500).send({ message: err.message });
			}
		});
	} catch (error) {
		console.log(error);
		res.status(500).send({ message: error.message });
	}
};

const addMenteesOnMentorID = async (req, res) => {
	try {
		const mentees = req.body.mentees;
		const doc = await Mentor.findOne({ _id: req.params.mentorID });
		const addedMentees = doc.mentees;
		for (var i = 0; i < mentees.length; i++) {
			addedMentees.push(db.mongoose.Types.ObjectId(mentees[i]));
			const student = await Student.findOne({ _id: db.mongoose.Types.ObjectId(mentees[i]) });

			student.mentorAssigned = true;
			await student.save();
		}
		doc.mentees = addedMentees;
		await doc.save();
		res.status(200).send({ message: 'Mentees Added Successfully' });
	} catch (error) {
		console.log(error);
		res.status(500).send({ message: error.message });
	}
};
const deleteMenteesOnMentorID = async (req, res) => {
	try {
		const mentees = req.body.mentees;
		const doc = await Mentor.findOne({ _id: req.params.mentorID });
		const presentMentees = doc.mentees;

		for (var i = 0; i < mentees.length; i++) {
			const index = presentMentees.indexOf(mentees[i]);
			const x = presentMentees.splice(index, 1);
			const student = await Student.findOne({ _id: db.mongoose.Types.ObjectId(mentees[i]) });
			student.mentorAssigned = false;
			await student.save();
		}
		doc.mentees = presentMentees;
		await doc.save();
		res.status(200).send({ message: 'Mentees Deleted Successfully' });
	} catch (error) {
		console.log(error);
		res.status(500).send({ message: error.message });
	}
};

module.exports = {
	addMentorData: addMentorData,
	getAllMentor: getAllMentor,
	getMentees: getMentees,
	getMentorOnMentorID: getMentorOnMentorID,
	addMenteesOnMentorID: addMenteesOnMentorID,
	deleteMenteesOnMentorID: deleteMenteesOnMentorID
};
