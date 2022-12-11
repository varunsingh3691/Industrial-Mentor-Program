import { Button, Col, Form, Row, Container } from 'react-bootstrap';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import { useNavigate } from 'react-router-dom';

import React, { useState, useEffect } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import './Register.css';

const RegistrationForm = (props) => {
	const [ showPassword, setShowPassword ] = useState('password');
	const [ showPasswordDefn, setShowPasswordDefn ] = useState(false);
	const [ userData, setUserData ] = useState({
		email: '',
		password: '',
		confirmPassword: '',
		fullName: '',
		gender: '',
		company: '',
		designation: ''
	});
	const navigate = useNavigate();
	// const currentCollection = collection(db, 'Users');
	const navigateToLogin = () => {
		navigate('/login');
	};
	useEffect(() => {
		const fetchData = async () => {};
		fetchData();
	}, []);

	const submitHandler = async (e) => {
		e.preventDefault();

		try {
			//TODO add notification feature for proper messages
			navigateToLogin();
		} catch (error) {
			console.log(error); //TODO notification !important
		}
	};

	return (
		<Row className="mt-5">
			<Col lg={6} md={6} sm={12} className="p-5 m-auto shadow-sm rounded-lg">
				<Form>
					<FloatingLabel controlId="floatingInputEmail" label="Email address" className="mb-3">
						<Form.Control
							value={userData.email}
							onChange={(e) => {
								setUserData((prev) => {
									return { ...prev, email: e.target.value };
								});
							}}
							type="email"
							placeholder="name@example.com"
						/>
					</FloatingLabel>

					<FloatingLabel controlId="floatingInputName" label="Full Name" className="mb-3">
						<Form.Control
							value={userData.fullName}
							onChange={(e) => {
								setUserData((prev) => {
									return { ...prev, fullName: e.target.value };
								});
							}}
							type="text"
							placeholder="Full Name"
						/>
					</FloatingLabel>
					<FloatingLabel controlId="floatingPasswordConfirm" label="Password" className="mb-3">
						<Form.Control
							value={userData.password}
							onChange={(e) => {
								setUserData((prev) => {
									return { ...prev, password: e.target.value };
								});
							}}
							onBlur={() => {
								console.log('this');
								setShowPasswordDefn(!showPasswordDefn);
							}}
							onFocus={() => {
								console.log('triggered');
								setShowPasswordDefn(!showPasswordDefn);
							}}
							type={showPassword}
							placeholder="Password"
						/>
					</FloatingLabel>
					{showPasswordDefn && (
						<p className="fw-lighter">
							* Password must contain atleast an Uppercase letter <br />
							* Password must Containa a special Character<br />
							* Password should be atleast 8 characters Long<br />
						</p>
					)}

					<FloatingLabel controlId="floatingPassword" label="Password" className="mb-3">
						<Form.Control
							value={userData.confirmPassword}
							onChange={(e) => {
								setUserData((prev) => {
									return { ...prev, confirmPassword: e.target.value };
								});
							}}
							type={showPassword}
							placeholder="Password"
						/>
					</FloatingLabel>

					<Form.Group className="mb-3" controlId="formBasicCheckbox">
						<Form.Check
							onChange={(e) => {
								if (showPassword === 'password') {
									setShowPassword('text');
								} else {
									setShowPassword('password');
								}
							}}
							type="switch"
							id="custom-switch"
							label="Show Password"
						/>
					</Form.Group>

					<FloatingLabel controlId="floatingInputMobile" label="Mobile" className="mb-3">
						<Form.Control
							type="number"
							value={userData.mobile}
							onChange={(e) => {
								setUserData((prev) => {
									return { ...prev, mobile: e.target.value };
								});
							}}
							placeholder="Number"
						/>
					</FloatingLabel>

					<FloatingLabel controlId="floatingcompanyName" label="Company Name" className="mb-3">
						<Form.Control
							value={userData.company}
							onChange={(e) => {
								setUserData((prev) => {
									return { ...prev, company: e.target.value };
								});
							}}
							type="text"
							placeholder="Full Name"
						/>
					</FloatingLabel>

					<Container className="p-1 rounded" />
					<Container className="mt-3 p-0">
						<Button onClick={submitHandler} variant="primary btn-block" type="button">
							Register
						</Button>
						<span> </span>
					</Container>
				</Form>
			</Col>
		</Row>
	);
};

export default RegistrationForm;
