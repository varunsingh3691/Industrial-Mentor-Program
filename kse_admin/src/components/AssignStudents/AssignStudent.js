import React, { useEffect, useState } from 'react';
import { Card, Container, Row, Col, Button, Modal } from 'react-bootstrap';
import config from '../../config.json';
import axios from 'axios';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine-dark.css';
import EditMentorForm from './EditMentorForm';
import AddMenteesForm from './AddMenteesForm';
import EditMenteesForm from './EditMenteesForm';

// import Select from 'react-select';
const AssignStudent = () => {
	const [ mentorsList, setMentorsList ] = useState('');
	const [ showEdit, setShowEdit ] = useState(false);
	const [ isUpdated, setIsUpdated ] = useState(false);
	const [ openedMentor, setOpenedMentor ] = useState({ data: {} });
	const [ showAddMentees, setShowAddMentees ] = useState(false);
	const token = localStorage.getItem('token');
	const [ showEditMentees, setShowEditMentees ] = useState('');
	const [ studentsList, setStudentsList ] = useState('');
	const [ menteesList, setMenteesList ] = useState('');
	useEffect(
		() => {
			const fetchData = async () => {
				const url = config.rapidServerPath + config.getAllMentors;
				const response = await axios.get(url, {
					headers: {
						'x-access-token': token
					}
				});
				setMentorsList({ data: response.data });
				setIsUpdated(false);
			};
			fetchData();
		},
		[ token, isUpdated ]
	);
	const fetchUnassignedStudentData = async () => {
		const url = config.rapidServerPath + config.getAllUnassignedStudents;
		const response = await axios.get(url, {
			headers: {
				'x-access-token': token
			}
		});
		setStudentsList({ data: response.data });
	};
	const fetchMenteesonMentor = async (data) => {
		const url = config.rapidServerPath + config.getMentees + '/' + data;
		const response = await axios.get(url, {
			headers: {
				'x-access-token': token
			}
		});
		setMenteesList({ data: response.data });
	};
	const handleEditOpen = (data) => {
		console.log(data);
		setOpenedMentor({ data: data });
		setShowEdit(true);
	};

	const handleEditClose = () => {
		setShowEdit(false);
	};

	const handleEditMenteesOpen = async (data) => {
		await fetchMenteesonMentor(data._id);
		setOpenedMentor({ data: data });
		setShowEditMentees(true);
	};

	const handleEditeMenteesClose = () => {
		setShowEditMentees(false);
	};

	const handleAddMenteesOpen = async (data) => {
		await fetchUnassignedStudentData();
		setOpenedMentor({ data: data });
		setShowAddMentees(true);
	};
	const handleAddMenteesClose = () => {
		setShowAddMentees(false);
	};
	const gridOptions = {
		columnDefs: [
			{
				field: 'Edit Mentor',
				cellRenderer: function(params) {
					return (
						<Button onClick={() => handleEditOpen(params.data)} variant="primary" size="sm">
							Edit
						</Button>
					);
				},
				width: 100,
				resizable: true
			},
			{
				field: 'Add Mentees',
				cellRenderer: function(params) {
					return (
						<Button onClick={() => handleAddMenteesOpen(params.data)} variant="primary" size="sm">
							Edit
						</Button>
					);
				},
				width: 150,
				resizable: true
			},
			{
				field: 'Edit Mentees',
				cellRenderer: function(params) {
					return (
						<Button
							onClick={() => {
								handleEditMenteesOpen(params.data);
							}}
							variant="primary"
							size="sm"
						>
							Edit
						</Button>
					);
				},
				width: 150,
				resizable: true
			},
			{
				field: 'firstName',
				width: 100,
				sortable: true,
				filter: true,
				resizable: true
			},
			{
				field: 'lastName',
				width: 150,
				sortable: true,
				filter: true,
				resizable: true
			},
			{
				field: 'email',
				width: 200,
				sortable: true,
				filter: true,
				resizable: true
			},
			{
				field: 'mobile',
				width: 200,
				sortable: true,
				filter: true,
				resizable: true
			},
			{
				field: 'designation',
				width: 200,
				sortable: true,
				filter: true,
				resizable: true
			},
			{
				field: 'address',
				width: 200,
				sortable: true,
				filter: true,
				resizable: true
			},
			{
				field: 'experience',
				width: 200,
				sortable: true,
				filter: true,
				resizable: true
			},
			{
				field: 'gender',
				width: 200,
				sortable: true,
				filter: true,
				resizable: true
			}
		]
	};
	return (
		<Container>
			<h1 className="shadow-sm text-success mt-5 p-3 text-center rounded">Add Mentees</h1>
			<Row>
				<Col md={12} lg={12} style={{ marginBottom: 20 }}>
					<Card className={'ag-theme-alpine'} style={{ width: 'auto', height: 620 }}>
						<h5 className="heading">Mentor</h5>
						<AgGridReact rowData={mentorsList.data} gridOptions={gridOptions} />

						{/* EDIT Mentor MODAL */}
						<Modal
							size="lg"
							show={showEdit}
							onHide={handleEditClose}
							backdrop="static"
							keyboard={false}
							supportedorientations={[ 'portrait', 'landscape' ]}
						>
							<Modal.Header closeButton>
								<Modal.Title>Create User</Modal.Title>
							</Modal.Header>
							<Modal.Body>
								<EditMentorForm
									mentor={openedMentor}
									sendUpdate={setIsUpdated}
									closeModel={handleEditClose}
								/>
							</Modal.Body>
						</Modal>

						{/* ADD MENTEES MODAL */}
						<Modal
							size="lg"
							show={showAddMentees}
							onHide={handleAddMenteesClose}
							backdrop="static"
							keyboard={false}
							supportedorientations={[ 'portrait', 'landscape' ]}
						>
							<Modal.Header closeButton>
								<Modal.Title>Add Mentees</Modal.Title>
							</Modal.Header>
							<Modal.Body>
								<AddMenteesForm
									list={studentsList}
									mentor={openedMentor}
									sendUpdate={setIsUpdated}
									closeModel={handleAddMenteesClose}
								/>
							</Modal.Body>
						</Modal>

						{/* EDIT MENTEES MODAL  */}
						<Modal
							size="lg"
							show={showEditMentees}
							onHide={handleEditeMenteesClose}
							backdrop="static"
							keyboard={false}
							supportedorientations={[ 'portrait', 'landscape' ]}
						>
							<Modal.Header closeButton>
								<Modal.Title>Edit Mentees</Modal.Title>
							</Modal.Header>
							<Modal.Body>
								<EditMenteesForm
									list={menteesList}
									mentor={openedMentor}
									sendUpdate={setIsUpdated}
									closeModel={handleEditeMenteesClose}
								/>
							</Modal.Body>
						</Modal>
					</Card>
				</Col>
			</Row>
		</Container>
	);
};

export default AssignStudent;
