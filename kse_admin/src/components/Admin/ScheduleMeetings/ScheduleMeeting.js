import React, { useState } from 'react';
import { Button, Container } from 'react-bootstrap';

const ScheduleMeeting = () => {
	const [ showCreateMeeting, setShowCreateMeeting ] = useState('');
	const onCreateShow = () => {
		setShowCreateMeeting(true);
	};
	const onCreateHide = () => {
		setShowCreateMeeting(false);
	};
	return <Button className="mt-3 mb-3"> New Meeting </Button>;
};

export default ScheduleMeeting;
