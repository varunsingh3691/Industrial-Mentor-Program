import React, { useEffect } from 'react';
import { Container } from 'react-bootstrap';
import Header from '../Helper/Header';
import config from '../../config.json';

const AssignmentsList = () => {
	useEffect(() => {
		const fetchData = () => {};
	}, []);

	return (
		<Container className="p-0">
			<h1 className="shadow-sm text-success mt-5 p-3 text-center rounded">My Assignments</h1>
		</Container>
	);
};

export default AssignmentsList;
