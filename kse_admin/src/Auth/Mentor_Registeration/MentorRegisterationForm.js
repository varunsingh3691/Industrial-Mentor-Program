import { Button, Col, Form, Row, Container } from 'react-bootstrap';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
// import { useNavigate } from 'react-router-dom';

import React, { useState } from 'react';

import axios from 'axios';
import config from '../../config.json';
const MentorRegisterationForm = (props) => {
	const [ showPassword, setShowPassword ] = useState('password');
	const [ showPasswordDefn, setShowPasswordDefn ] = useState(false);
	const [ userData, setUserData ] = useState({
		firstName: '',
		lastName: '',
		email: '',
		company: '',
		mobile: '',
		designation: '',
		address: '',
		experience: '',
		expertise: '',
		gender: '',
		qualification: '',
		password: '',
		confirmPassword: ''
	});
	const token = localStorage.getItem('token');
	// const navigate = useNavigate();
	// const navigateToLogin = () => {
	// 	navigate('/login');
	// };

	const submitHandler = async (e) => {
		e.preventDefault();

		try {
			console.table(userData);
			//TODO add notification feature for proper messages
			const url = config.rapidServerPath + config.signup;
			const response = await axios.post(url, {
				email: userData.email,
				password: userData.password,
				roles: [ 'mentor' ]
			});
			if (response.status === 201) {
				const saveDataURL = config.rapidServerPath + config.saveMentorData;
				const resp = await axios.post(
					saveDataURL,
					{
						firstName: userData.firstName.trim(),
						lastName: userData.lastName.trim(),
						email: userData.email.trim(),
						company: userData.company,
						qualification: userData.qualification,
						mobile: userData.mobile.trim(),
						designation: userData.designation,
						address: userData.address,
						experience: userData.experience,
						expertise: userData.expertise,
						gender: userData.gender
					},
					{ headers: { 'x-access-token': token } }
				);
				if (resp.status === 201) {
					console.log('user Created and Data saved');
					setUserData({
						firstName: '',
						lastName: '',
						email: '',
						company: '',
						mobile: '',
						designation: '',
						address: '',
						experience: '',
						expertise: '',
						gender: '',
						qualification: '',
						password: '',
						confirmPassword: ''
					});
				}
			}
		} catch (error) {
			console.log(error.response.data.message); //TODO notification !important
		}
	};

	return (
		<Row className="mt-3">
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
					<Row className="g-2">
						<Col md>
							<FloatingLabel controlId="floatingInputfirstName" label="First Name" className="mb-3">
								<Form.Control
									value={userData.firstName}
									onChange={(e) => {
										setUserData((prev) => {
											return { ...prev, firstName: e.target.value };
										});
									}}
									type="text"
									placeholder="First Name"
								/>
							</FloatingLabel>
						</Col>
						<Col md>
							<FloatingLabel controlId="floatingInputlastName" label="Last Name" className="mb-3">
								<Form.Control
									value={userData.lastName}
									onChange={(e) => {
										setUserData((prev) => {
											return { ...prev, lastName: e.target.value };
										});
									}}
									type="text"
									placeholder="Last Name"
								/>
							</FloatingLabel>
						</Col>
					</Row>
					<FloatingLabel controlId="floatingPasswordConfirm" label="Password" className="mb-3">
						<Form.Control
							value={userData.password}
							onChange={(e) => {
								setUserData((prev) => {
									return { ...prev, password: e.target.value };
								});
							}}
							onBlur={() => {
								setShowPasswordDefn(!showPasswordDefn);
							}}
							onFocus={() => {
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
					<Row className="g-2">
						<Col md>
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
						</Col>

						<Col md>
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
						</Col>
					</Row>

					<Row className="g-2">
						<Col md>
							<FloatingLabel controlId="designation" label="Designation" className="mb-3">
								<Form.Control
									value={userData.designation}
									onChange={(e) => {
										setUserData((prev) => {
											return { ...prev, designation: e.target.value };
										});
									}}
									type="text"
									placeholder="First Name"
								/>
							</FloatingLabel>
						</Col>
						<Col md>
							<FloatingLabel controlId="experience" label="Experience" className="mb-3">
								<Form.Control
									value={userData.experience}
									onChange={(e) => {
										setUserData((prev) => {
											return { ...prev, experience: e.target.value };
										});
									}}
									type="text"
									placeholder="Last Name"
								/>
							</FloatingLabel>
						</Col>
					</Row>
					<Row className="g-2">
						<Col md>
							<FloatingLabel controlId="expertise" label="Expertise" className="mb-3">
								<Form.Control
									value={userData.expertise}
									onChange={(e) => {
										setUserData((prev) => {
											return { ...prev, expertise: e.target.value };
										});
									}}
									type="text"
									placeholder="First Name"
								/>
							</FloatingLabel>
						</Col>
						<Col md>
							<FloatingLabel controlId="qualification" label="Qualification" className="mb-3">
								<Form.Control
									value={userData.qualification}
									onChange={(e) => {
										setUserData((prev) => {
											return { ...prev, qualification: e.target.value };
										});
									}}
									type="text"
									placeholder="Last Name"
								/>
							</FloatingLabel>
						</Col>
					</Row>

					<FloatingLabel controlId="address" label="Address" className="mb-3">
						<Form.Control
							value={userData.address}
							onChange={(e) => {
								setUserData((prev) => {
									return { ...prev, address: e.target.value };
								});
							}}
							type="text"
							placeholder="Full Name"
						/>
					</FloatingLabel>

					<FloatingLabel controlId="floatingSelect" label="Gender">
						<Form.Select
							value={userData.gender}
							onChange={(e) => {
								setUserData((prev) => {
									return { ...prev, gender: e.target.value };
								});
							}}
							aria-label="Floating label select example"
						>
							<option value=""> Select </option>
							<option value="Male">Male</option>
							<option value="Female">Female</option>
						</Form.Select>
					</FloatingLabel>

					<Container className="p-1 rounded" />
					<Container className="p-0">
						<Button onClick={submitHandler} variant="primary btn-block" type="button">
							Register
						</Button>
					</Container>
				</Form>
			</Col>
		</Row>
	);
};

export default MentorRegisterationForm;
