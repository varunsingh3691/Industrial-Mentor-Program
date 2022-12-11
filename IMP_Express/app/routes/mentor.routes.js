const { authJwt } = require('../middlewares');
const controller = require('../controllers/mentor.controller');

const router = (app) => {
	app.post('/api/ment/addData', controller.addMentorData);
};

module.exports = router;
