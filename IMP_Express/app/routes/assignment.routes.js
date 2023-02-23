const { authJwt } = require('../middlewares');
const controller = require('../controllers/assignment.controller');

const router = (app) => {
	app.post('/api/ass/createAssignment/', authJwt.verifyToken, authJwt.isMentor, controller.createAssignment);
	app.get('/api/ass/getAssignmentList/:mentorID', authJwt.verifyToken, controller.getAssignmentDetailsOnMentorID);

	app.get('/api/ass/getAssignment/:mentorID/:assignmentID', controller.getAssignmentFile);
};
module.exports = router;
