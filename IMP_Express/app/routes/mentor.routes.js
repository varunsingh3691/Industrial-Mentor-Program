const { authJwt } = require('../middlewares');
const controller = require('../controllers/mentor.controller');

const router = (app) => {
	app.post('/api/ment/addData', authJwt.verifyToken, authJwt.isAdmin, controller.addMentorData);
	app.get('/api/ment/getAllMentors', authJwt.verifyToken, authJwt.isAdmin, controller.getAllMentor);
	app.get('/api/ment/getMenteesOnMentorID/:mentorID', authJwt.verifyToken, controller.getMentees);

	app.get(
		'/api/ment/getMentorOnMentorID/:mentorID',
		authJwt.verifyToken,
		authJwt.isAdmin,
		controller.getMentorOnMentorID
	);
	app.post('/api/ment/addMentees/:mentorID', authJwt.verifyToken, authJwt.isAdmin, controller.addMenteesOnMentorID);
	app.post(
		'/api/ment/removeMentees/:mentorID',
		authJwt.verifyToken,
		authJwt.isAdmin,
		controller.deleteMenteesOnMentorID
	);
};

module.exports = router;
