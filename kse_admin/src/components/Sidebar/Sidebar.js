import { NavLink } from 'react-router-dom';
import { FaBars, FaUserAlt, FaUserFriends } from 'react-icons/fa';
import { MdMessage } from 'react-icons/md';
import { BiAnalyse, BiLogOut } from 'react-icons/bi';
import { AiFillHeart, AiOutlineUserAdd } from 'react-icons/ai';
import { HiUserAdd } from 'react-icons/hi';
import { BsCartCheck } from 'react-icons/bs';
import { Fragment, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import SidebarMenu from './SidebarMenu';
import './Sidebar.css';
import { Container } from 'react-bootstrap';

const adminRoutes = [
	{
		path: '/registerMentor',
		name: 'Mentor Registration',
		icon: <HiUserAdd size={30} />
	},
	{
		path: '/assignStudent',
		name: 'Assign Students ',
		icon: <FaUserFriends size={30} />
	},
	{
		path: '/analytics',
		name: 'Analytics',
		icon: <BiAnalyse size={30} />
	},
	{
		path: '/order',
		name: 'Order',
		icon: <BsCartCheck size={30} />
	},

	{
		path: '/saved',
		name: 'Saved',
		icon: <AiFillHeart size={30} />
	}
	// {
	// 	path: '/settings',
	// 	name: 'Settings',
	// 	icon: <BiCog />,
	// 	exact: true,
	// 	subRoutes: [
	// 		{
	// 			path: '/settings/profile',
	// 			name: 'Profile ',
	// 			icon: <FaUser />
	// 		},
	// 		{
	// 			path: '/settings/2fa',
	// 			name: '2FA',
	// 			icon: <FaLock />
	// 		},
	// 		{
	// 			path: '/settings/billing',
	// 			name: 'Billing',
	// 			icon: <FaMoneyBill />
	// 		}
	// 	]
	// }
];
const mentorRoutes = [
	{
		path: '/registerMentor',
		name: 'Mentor Registration',
		icon: <FaUserAlt size={30} />
	},
	{
		path: '/applyLeave',
		name: 'Leave Apply',
		icon: <MdMessage size={30} />
	},
	{
		path: '/analytics',
		name: 'Analytics',
		icon: <BiAnalyse size={30} />
	},
	{
		path: '/order',
		name: 'Order',
		icon: <BsCartCheck size={30} />
	},

	{
		path: '/saved',
		name: 'Saved',
		icon: <AiFillHeart size={30} />
	}
	// {
	// 	path: '/settings',
	// 	name: 'Settings',
	// 	icon: <BiCog />,
	// 	exact: true,
	// 	subRoutes: [
	// 		{
	// 			path: '/settings/profile',
	// 			name: 'Profile ',
	// 			icon: <FaUser />
	// 		},
	// 		{
	// 			path: '/settings/2fa',
	// 			name: '2FA',
	// 			icon: <FaLock />
	// 		},
	// 		{
	// 			path: '/settings/billing',
	// 			name: 'Billing',
	// 			icon: <FaMoneyBill />
	// 		}
	// 	]
	// }
];
const stuentRoutes = [
	{
		path: '/registerMentor',
		name: 'Mentor Registration',
		icon: <FaUserAlt size={30} />
	},
	{
		path: '/applyLeave',
		name: 'Leave Apply',
		icon: <MdMessage size={30} />
	},
	{
		path: '/analytics',
		name: 'Analytics',
		icon: <BiAnalyse size={30} />
	},
	{
		path: '/order',
		name: 'Order',
		icon: <BsCartCheck size={30} />
	},

	{
		path: '/saved',
		name: 'Saved',
		icon: <AiFillHeart size={30} />
	}
	// {
	// 	path: '/settings',
	// 	name: 'Settings',
	// 	icon: <BiCog />,
	// 	exact: true,
	// 	subRoutes: [
	// 		{
	// 			path: '/settings/profile',
	// 			name: 'Profile ',
	// 			icon: <FaUser />
	// 		},
	// 		{
	// 			path: '/settings/2fa',
	// 			name: '2FA',
	// 			icon: <FaLock />
	// 		},
	// 		{
	// 			path: '/settings/billing',
	// 			name: 'Billing',
	// 			icon: <FaMoneyBill />
	// 		}
	// 	]
	// }
];

const Sidebar = ({ children }) => {
	const [ isOpen, setIsOpen ] = useState(false);

	const toggle = () => setIsOpen(!isOpen);
	const showAnimation = {
		hidden: {
			width: 0,
			opacity: 0,
			transition: {
				duration: 0.5
			}
		},
		show: {
			opacity: 1,
			width: 'auto',
			transition: {
				duration: 0.5
			}
		}
	};
	var userRole = localStorage.getItem('Role');
	console.log(userRole);
	const aptMenu = (presentRole) => {
		const decidingRoutes = (role) => {
			switch (role) {
				case 'ROLE_ADMIN':
					return adminRoutes;
				case 'ROLE_MENTOR':
					return mentorRoutes;
				case 'ROLE_STUDENT':
					return stuentRoutes;
				default:
					console.log('unknown');
			}
		};
		const decidedRoutes = decidingRoutes(presentRole);

		return decidedRoutes.map((route, index) => {
			if (route.subRoutes) {
				return (
					<SidebarMenu setIsOpen={setIsOpen} route={route} showAnimation={showAnimation} isOpen={isOpen} />
				);
			}

			return (
				<NavLink
					to={route.path}
					key={index}
					className={(navData) => (navData.isActive ? 'link active' : 'link')}
				>
					<div className=" icon">{route.icon}</div>
					<AnimatePresence>
						{isOpen && (
							<motion.div
								variants={showAnimation}
								initial="hidden"
								animate="show"
								exit="hidden"
								className="link_text"
							>
								{route.name}
							</motion.div>
						)}
					</AnimatePresence>
				</NavLink>
			);
		});
	};

	return (
		<Fragment>
			<div className="main-container">
				<motion.div
					animate={{
						width: isOpen ? '200px' : '50px',

						transition: {
							duration: 0.5,
							type: 'spring',
							damping: 10
						}
					}}
					className={`sidebar `}
				>
					<div className="top_section">
						<AnimatePresence>
							{isOpen && (
								<motion.h1
									variants={showAnimation}
									initial="hidden"
									animate="show"
									exit="hidden"
									className="logo"
								>
									KSE
								</motion.h1>
							)}
						</AnimatePresence>

						<div className="bars">
							<FaBars size={30} onClick={toggle} />
						</div>
					</div>

					<section className="routes">{aptMenu(userRole)}</section>
				</motion.div>
				<main>{children}</main>
			</div>
		</Fragment>
	);
};

export default Sidebar;
