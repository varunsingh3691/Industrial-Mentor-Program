import React from 'react';
import { Container } from 'react-bootstrap';
import StudentRegistrationForm from './StudentRegistrationForm';

const Register = () => {
	return (
		<Container>
			<h1 className="shadow-sm text-success mt-5 p-3 text-center rounded">Register a New Mentor</h1>
			<StudentRegistrationForm />
		</Container>
	);
};

export default Register;
