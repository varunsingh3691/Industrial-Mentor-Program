const { authJwt } = require('../middlewares');
const controller = require('../controllers/mentor.controller');

const router = (app) => {
	app.post('/api/ment/addData', authJwt.verifyToken, authJwt.isAdmin, controller.addMentorData);
};

module.exports = router;
