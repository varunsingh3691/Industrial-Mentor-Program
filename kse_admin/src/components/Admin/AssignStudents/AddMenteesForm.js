import React, { useState } from 'react';

import axios from 'axios';
import { DataGrid } from '@mui/x-data-grid';
import { Button, Container } from 'react-bootstrap';

const AddMenteesForm = (props) => {
	const [ studentsList, setStudentsList ] = useState('');

	const columns = [
		{ field: 'Student_First_Name', headerName: 'First name', width: 130 },
		{ field: 'Student_Middle_Name', headerName: 'Middle name', width: 130 },
		{ field: 'Student_Last_Name', headerName: 'Last name', width: 130 },
		{ field: 'Student_EmailId', headerName: 'Email', width: 130 }
	];
	const assignHandler = async () => {
		try {
			if (studentsList.length > 0) {
				console.log(props.mentor.data.Mentor_Name);
				const url = 'http://localhost:9003/api/v1/AssignMentees';

				const resp = await axios.post(url, {
					mentorName: props.mentor.data.Mentor_Name,
					mentees: studentsList,
					groupName: props.mentor.data.Mentor_Group_Name
				});
				if (resp.status === 200) {
					props.closeModel();
					props.sendUpdate(true);
				}
			} else {
				console.log('none selected');
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
				<Button onClick={assignHandler}>Assign </Button>
			</div>
		</Container>
	);
};

export default AddMenteesForm;
