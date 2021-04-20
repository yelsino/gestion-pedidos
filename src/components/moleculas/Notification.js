import React from "react";

const Notification = (props) => {
	return (
		<div className="flex justify-center items-center  w-6 h-6 rounded-full bg-red-200 cursor-pointer ">
			<div className="text-red-600 font-semibold">{props.texto}</div>
		</div>
	);
};

export default Notification;
