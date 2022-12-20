import './App.css';
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Login from './Auth/Login/Login';
import Home from './components/Home/Home';
import MentorRegister from './Auth/Mentor_Registeration/Mentor_Register';
import LoginProtected from './Auth/Protection/LoginProtected';
import PublicRoutes from './Auth/Protection/PublicRoutes';
import Missing from './components/Missing';
import StudentRegister from './Auth/Student_Registration/Student_Register';
import AssignStudent from './components/AssignStudent';
function App() {
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
				<Route path="/registerMentor" element={<MentorRegister />} />
				<Route path="/users" element={<Home />} />
				<Route path="/assignStudent" element={<AssignStudent />} />
				<Route path="/users" element={<Home />} />
				<Route path="/*" element={<Missing />} />
			</Route>
		</Routes>
	);
}

export default App;
