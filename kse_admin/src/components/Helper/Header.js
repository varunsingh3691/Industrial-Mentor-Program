import React from 'react';

const Header = (props) => {
	return <h1 className="shadow-sm text-success mt-5 p-3 text-center rounded">{props.data}</h1>;
};

export default Header;
