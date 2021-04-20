import React from "react";
import LOGO from "../../static/logocarlos.png";
const Logo = () => {
	return (
		<div className=" p-4 w-32 h-32 flex justify-center items-center my-10">
			<img src={LOGO} />
		</div>
	);
};

export default Logo;
