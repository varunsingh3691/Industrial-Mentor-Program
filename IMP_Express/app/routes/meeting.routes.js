const { authJwt } = require('../middlewares');
const controller = require('../controllers/meeting.controller');

const router = (app) => {
	app.get('/meet/createMeetings', authJwt.verifyToken, authJwt.isAdmin);
};
module.exports = router;
