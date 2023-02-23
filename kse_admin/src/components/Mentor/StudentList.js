import React, { useEffect, useState } from 'react';
import config from '../../config.json';
import axios from 'axios';
import { Container } from 'react-bootstrap';
import { AgGridReact } from 'ag-grid-react';
import ScheduleMeeting from '../Admin/ScheduleMeetings/ScheduleMeeting';

const StudentList = (props) => {
	const [ menteesList, setMenteesList ] = useState('');
	const token = localStorage.getItem('token');
	const my_ID = localStorage.getItem('uID');

	useEffect(
		() => {
			const fetchData = async () => {
				const url = config.rapidServerPath + config.getMentees + '/' + my_ID;
				const response = await axios.get(url, {
					headers: {
						'x-access-token': token
					}
				});
				setMenteesList({ data: response.data });
			};
			fetchData();
		},
		[ token, my_ID ]
	);
	const gridOptions = {
		columnDefs: [
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
			}
		]
	};

	return (
		<Container style={{ width: 'auto', height: 620 }} className="ag-theme-alpine p-2">
			<h1 className="shadow-sm text-success mt-5 p-3 text-center rounded">Student List</h1>
			<div style={{ height: 400, width: '100%' }}>
				<ScheduleMeeting />
				<AgGridReact gridOptions={gridOptions} rowData={menteesList.data} />
			</div>
		</Container>
	);
};

export default StudentList;
