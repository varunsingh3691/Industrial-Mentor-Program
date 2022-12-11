const config = require('../config/auth.config');
const db = require('../models');
const mentor = db.mentor;

const addMentorData = (req, res) => {
	try {
		const user = new mentor({
			fullName: req.body.fullName,
			email: req.body.email,
			company: req.body.company,
			mobile: req.body.mobile
		});
		user
			.save(user)
			.then((data) => {
				res.status(201).send({ message: 'User was registered successfully!' });
			})
			.catch((err) => {
				res.status(500).send({
					message: err.message || 'Some error occurred while creating a create operation'
				});
			});
	} catch (error) {
		console.log(error);
	}
};

module.exports = {
	addMentorData: addMentorData
};
