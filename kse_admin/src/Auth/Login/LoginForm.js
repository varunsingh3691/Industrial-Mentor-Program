import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import config from '../../config.json';
import AuthContext from '../store/auth-context';
const LoginForm = (props) => {
	const [ email, setEmail ] = useState('');
	const [ password, setPassword ] = useState('');
	const [ showPassword, setShowPassword ] = useState('password');
	const navigate = useNavigate();
	const navigateToRegister = (e) => {
		e.preventDefault();
		navigate('/registerStudent');
	};
	const authCtx = useContext(AuthContext);
	const loginSubmitHandler = async (e) => {
		e.preventDefault();
		//TODO enter validation for password
		try {
			const url = config.rapidServerPath + config.signin;
			const response = await axios.post(url, {
				email: email,
				password: password
			});
			const expirationTime = new Date(new Date().getTime() + +response.data.expiresIn * 1000);
			if (response.status === 200) {
				authCtx.login(response.data.accessToken, expirationTime.toISOString());
				authCtx.login(response.data.accessToken, expirationTime.toISOString());
				authCtx.storeCustomData('uID', response.data.id);
				authCtx.storeCustomData('Role', response.data.roles[0]);
			}
			console.log(response);

			// TODO add notification feature for proper messages
			setEmail('');
			setPassword('');
		} catch (error) {
			console.log(error); //TODO notification
		}
	};

	return (
		<Row className="mt-5">
			<Col lg={5} md={6} sm={12} className="p-5 m-auto shadow-sm rounded-lg">
				<Form onSubmit={loginSubmitHandler}>
					<FloatingLabel controlId="floatingInput" label="Email address" className="mb-3">
						<Form.Control
							value={email}
							onChange={(e) => {
								setEmail(e.target.value);
							}}
							type="email"
							placeholder="name@example.com"
						/>
					</FloatingLabel>
					<FloatingLabel className="mb-2" controlId="floatingPassword" label="Password">
						<Form.Control
							value={password}
							onChange={(e) => {
								setPassword(e.target.value);
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

					<Container className="mt-3 p-0">
						<Button variant="success btn-block" type="submit">
							Login
						</Button>
						<span> </span>

						<Button onClick={navigateToRegister} variant="outline-primary">
							Register as Student
						</Button>
					</Container>
				</Form>
			</Col>
		</Row>
	);
};

export default LoginForm;
