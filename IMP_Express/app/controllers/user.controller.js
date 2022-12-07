exports.allAccess = (req, res) => {
	res.status(200).send('Public Content.');
};

exports.studentBoard = (req, res) => {
	res.status(200).send('Student Content.');
};

exports.adminBoard = (req, res) => {
	res.status(200).send('Admin Content.');
};

exports.mentorBoard = (req, res) => {
	res.status(200).send('Mentor Content.');
};
