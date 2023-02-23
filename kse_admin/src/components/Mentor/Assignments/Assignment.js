import { Button, Card, Container, Col, Row, Modal } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import config from '../../../config.json';
import { AgGridReact } from 'ag-grid-react';
import CreateAssignmentForm from './CreateAssignmentForm';
import Submissions from './Submissions';
import FileSaver from 'file-saver';
const Assignment = () => {
	const [ rowData, setRowData ] = useState('');
	const [ showCreateForm, setShowCreateForm ] = useState(false);
	const [ showSubmissions, setShowSubmissions ] = useState(false);
	const [ isUpdated, setIsUpdated ] = useState(false);
	const my_ID = localStorage.getItem('uID');
	const token = localStorage.getItem('token');
	useEffect(
		() => {
			const fetchData = async () => {
				try {
					const url = config.rapidServerPath + config.getAssignmentListOnMentorID + '/' + my_ID;
					const resp = await axios.get(url, { headers: { 'x-access-token': token } });
					setRowData({ data: resp.data });
				} catch (error) {
					console.log(error);
				}
				setIsUpdated(false);
			};
			fetchData();
		},
		[ my_ID, token, isUpdated ]
	);
	const handleViewAssignmentClicked = async (params) => {
		try {
			const url = config.rapidServerPath + config.getAssignmentFile + '/' + my_ID + '/' + params.data._id;

			axios.get(url, { headers: { 'x-access-token': token }, responseType: 'blob' }).then(async (res) => {
				FileSaver.saveAs(url, params.data.name, res.data.type);
			});
		} catch (error) {
			console.log(error);
		}
	};

	const handleCreateOpen = async () => {
		setShowCreateForm(true);
	};
	const handleCreateClose = () => {
		setShowCreateForm(false);
	};

	const handleSubmissionsOpen = async (data) => {
		setShowSubmissions(true);
	};
	const handleSubmissionsClose = () => {
		setShowSubmissions(false);
	};
	const gridOptions = {
		columnDefs: [
			{
				field: 'name',
				width: 200,
				sortable: true,
				filter: true,
				resizable: true
			},
			{
				field: 'Assignment',
				width: 150,
				resizable: true,
				cellRenderer: function(params) {
					return (
						<Button
							variant="primary"
							size="sm"
							onClick={() => {
								handleViewAssignmentClicked(params);
							}}
						>
							View
						</Button>
					);
				}
			},
			{
				field: 'dateAssigned',
				width: 200,
				resizable: true,
				cellRenderer: (params) => {
					return params.data.dateAssigned ? new Date(params.data.dateAssigned).toLocaleDateString() : '';
				}
			},
			{
				field: 'lastDate',
				width: 200,
				resizable: true,
				cellRenderer: (params) => {
					return params.data.lastDate ? new Date(params.data.lastDate).toLocaleDateString() : '';
				}
			},
			{
				field: 'submissions',
				width: 200,
				resizable: true,
				cellRenderer: function(params) {
					return (
						<Button
							onClick={() => {
								handleSubmissionsOpen(params.data);
							}}
							variant="primary"
							size="sm"
						>
							Show Submissions
						</Button>
					);
				}
			}
		]
	};
	return (
		<Container>
			<h1 className="shadow-sm text-success mt-5 p-3 text-center rounded">Assignments</h1>
			<Row>
				<Col md={12} lg={12} style={{ marginBottom: 20 }}>
					<Card className={'ag-theme-alpine p-2'} style={{ width: 'auto', height: 620 }}>
						<div>
							<Button
								onClick={() => {
									handleCreateOpen();
								}}
								className="mt-2"
							>
								Create New Assignment
							</Button>
						</div>
						<h5 className="heading mt-2">Assignments List</h5>
						<AgGridReact gridOptions={gridOptions} rowData={rowData.data} />
						<Modal
							size="lg"
							show={showCreateForm}
							onHide={handleCreateClose}
							backdrop="static"
							keyboard={false}
							supportedorientations={[ 'portrait', 'landscape' ]}
						>
							<Modal.Header closeButton>
								<Modal.Title>Edit Mentees</Modal.Title>
							</Modal.Header>
							<Modal.Body>
								<CreateAssignmentForm sendUpdate={setIsUpdated} closeModel={handleCreateClose} />
							</Modal.Body>
						</Modal>
						<Modal
							size="lg"
							show={showSubmissions}
							onHide={handleSubmissionsClose}
							backdrop="static"
							keyboard={false}
							supportedorientations={[ 'portrait', 'landscape' ]}
						>
							<Modal.Header closeButton>
								<Modal.Title>Submision</Modal.Title>
							</Modal.Header>
							<Modal.Body>
								<Submissions sendUpdate={setIsUpdated} closeModel={handleSubmissionsClose} />
							</Modal.Body>
						</Modal>
					</Card>
				</Col>
			</Row>
		</Container>
	);
};

export default Assignment;
