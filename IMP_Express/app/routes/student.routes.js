const { authJwt } = require('../middlewares');
const controller = require('../controllers/student.controller');

const router = (app) => {
	app.post('/api/stud/addData', controller.addStudentData);
};

module.exports = router;
