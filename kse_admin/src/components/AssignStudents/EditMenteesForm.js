import React, { useEffect, useState } from 'react';
import config from '../../config.json';
import axios from 'axios';
import { DataGrid } from '@mui/x-data-grid';
import { Button, Container } from 'react-bootstrap';

const EditMenteesForm = (props) => {
	const [ studentsList, setStudentsList ] = useState('');

	const token = localStorage.getItem('token');
	useEffect(() => {}, [ token ]);
	const columns = [
		{ field: 'firstName', headerName: 'First name', width: 130 },
		{ field: 'lastName', headerName: 'Last name', width: 130 },
		{ field: 'email', headerName: 'Email', width: 130 }
	];
	const assignHandler = async () => {
		try {
			if (studentsList.length > 0) {
				const url = config.rapidServerPath + config.removeMentees + '/' + props.mentor.data._id;
				const resp = await axios.post(
					url,
					{
						mentees: studentsList
					},
					{ headers: { 'x-access-token': token } }
				);
				if (resp.status === 200) {
					props.closeModel();
					props.sendUpdate(true);
				}
			}
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<Container className="m-0 p-0">
			<div style={{ height: 400, width: '100%' }}>
				<DataGrid
					getRowId={(row) => {
						return row._id;
					}}
					rows={props.list.data}
					columns={columns}
					pageSize={5}
					rowsPerPageOptions={[ 5 ]}
					onSelectionModelChange={(item) => {
						setStudentsList(item);
					}}
					checkboxSelection
				/>
			</div>
			<div>
				<br />
				<Button onClick={assignHandler}>Delete </Button>
			</div>
		</Container>
	);
};

export default EditMenteesForm;
