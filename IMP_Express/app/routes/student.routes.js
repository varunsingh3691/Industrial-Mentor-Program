const { authJwt } = require('../middlewares');
const controller = require('../controllers/student.controller');

const router = (app) => {
	app.post('/api/stud/addData', controller.addStudentData);
	app.get(
		'/api/stud/getAllUnassignedStudents',
		authJwt.verifyToken,
		authJwt.isAdmin,
		controller.getUnassignedStudent
	);
};

module.exports = router;
