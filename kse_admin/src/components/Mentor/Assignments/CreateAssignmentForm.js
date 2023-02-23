import React, { useState } from 'react';
import { Container, Button } from 'react-bootstrap';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import './CreateAssignmentForm.scss';
import { AiOutlineUpload, AiFillProfile } from 'react-icons/ai';
import { FcEmptyTrash } from 'react-icons/fc';
import axios from 'axios';
import config from '../../../config.json';

const CreateAssignmentForm = (props) => {
	const [ assignmentName, setAssignmentName ] = useState('');
	const [ deadline, setDeadline ] = useState('');
	const [ file, setFile ] = useState('');
	const [ selected, setSelected ] = useState(false);
	const my_ID = localStorage.getItem('uID');
	const token = localStorage.getItem('token');
	const handleSubmit = (e) => {
		e.preventDefault();
		console.log(file[0]);
		const form = new FormData();
		form.append('assignmentName', assignmentName);
		form.append('fileName', file[0].name);
		form.append('file', file[0]);
		form.append('folderName', 'Assignments');
		form.append('deadline', deadline);
		form.append('mentor_id', my_ID);
		createAssignment(form);
	};
	const createAssignment = async (formdata) => {
		try {
			const url = config.rapidServerPath + config.createAssignment;
			const resp = await axios.post(
				url,
				formdata,
				{
					// headers: {
					// 	'x-access-token': token
					// }
				}
			);
			if (resp.status === 200) {
				props.closeModel();
				props.sendUpdate(true);
			}
		} catch (error) {
			console.log(error);
		}
	};
	const deleteFile = () => {
		setFile('');
		setSelected(false);
	};
	return (
		<Container className="m-0 p-0">
			<Form
				onSubmit={(e) => {
					handleSubmit(e);
				}}
			>
				<FloatingLabel controlId="Name" label="Assignment Name" className="mb-3">
					<Form.Control
						onChange={(e) => {
							setAssignmentName(e.target.value);
						}}
						type="text"
						placeholder="name@example.com"
						required
					/>
				</FloatingLabel>
				<FloatingLabel controlId="Deadline" label="Last Date" className="mb-3">
					<Form.Control
						onChange={(e) => {
							setDeadline(e.target.valueAsDate);
						}}
						type="date"
						placeholder="name@example.com"
						required
					/>
				</FloatingLabel>
				<div className="file-card">
					<div className="file-inputs">
						{!selected ? (
							<div>
								<input
									required
									type="file"
									onChange={(e) => {
										setFile(e.target.files);
										setSelected(true);
									}}
								/>
								<button>
									<AiOutlineUpload size={25} />
									Upload
								</button>
							</div>
						) : (
							<p className="main">File Selected</p>
						)}
					</div>
					<p className="main">Supported files</p>
					<p className="info">Please Upload a Single file </p>
					<p className="info">PDF, Zip</p>
				</div>
				{file !== '' ? (
					<li className="file-item" key={file.name}>
						<AiFillProfile />
						<p>{file[0].name}</p>
						<div className="actions">
							<FcEmptyTrash
								onClick={() => {
									deleteFile();
								}}
							/>
						</div>
					</li>
				) : null}
				<div>
					<br />
					<Button type="submit">Assign</Button>
				</div>
			</Form>
		</Container>
	);
};

export default CreateAssignmentForm;
