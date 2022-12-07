const { authJwt } = require('../middlewares');
const controller = require('../controllers/user.controller');

const router = (app) => {
	app.get('/api/test/all', controller.allAccess);

	app.get('/api/test/student', [ authJwt.verifyToken ], controller.studentBoard);

	app.get('/api/test/mentor', [ authJwt.verifyToken, authJwt.isMentor ], controller.mentorBoard);

	app.get('/api/test/admin', [ authJwt.verifyToken, authJwt.isAdmin ], controller.adminBoard);
};

module.exports = router;
