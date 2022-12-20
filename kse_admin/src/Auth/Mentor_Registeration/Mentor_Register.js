import React from 'react';
import { Container } from 'react-bootstrap';
import MentorRegisterationForm from './MentorRegisterationForm';

const Register = () => {
	return (
		<Container>
			<h1 className="shadow-sm text-success mt-5 p-3 text-center rounded">Register a New Mentor</h1>
			<MentorRegisterationForm />
		</Container>
	);
};

export default Register;
