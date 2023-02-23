import './App.css';
import './global.css';
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Login from './Auth/Login/Login';
import Home from './components/Home/Home';
import MentorRegister from './Auth/Mentor_Registeration/Mentor_Register';
import LoginProtected from './Auth/Protection/LoginProtected';
import PublicRoutes from './Auth/Protection/PublicRoutes';
import Missing from './components/Missing';
import StudentRegister from './Auth/Student_Registration/Student_Register';
import AssignStudent from './components/Admin/AssignStudents/AssignStudent';
import Assignment from './components/Mentor/Assignments/Assignment';
import './services/interceptor';
import StudentList from './components/Mentor/StudentList';
import AssignmentsList from './components/Student/AssignmentsList';
import ScheduleMeeting from './components/Admin/ScheduleMeetings/ScheduleMeeting';
const App = () => {
	return (
		<Routes>
			{/* public routes */}
			<Route element={<PublicRoutes />}>
				<Route path="/" element={<Login />} />
				<Route path="/login" element={<Login />} />
				<Route path="/registerStudent" element={<StudentRegister />} />
			</Route>
			{/* protected routes */}
			<Route element={<LoginProtected />}>
				<Route path="/home" element={<Home />} />
				<Route path="/registerMentor" element={<MentorRegister />} />
				<Route path="/assignStudent" element={<AssignStudent />} />
				<Route path="/users" element={<Home />} />
				<Route path="/scheduleMeeting" element={<ScheduleMeeting />} />
				<Route path="/assignments" element={<Assignment />} />
				<Route path="/studentList" element={<StudentList />} />
				<Route path="/myAssignments" element={<AssignmentsList />} />
				<Route path="/*" element={<Missing />} />
			</Route>
		</Routes>
	);
};

export default App;
