import { GrUpdate } from "react-icons/gr";

const IconUpdate = (props) => {
	return (
		<GrUpdate
			onClick={props.onIcon}
			className="text-blue-500 cursor-pointer text-xl hover:text-blue-700"
		/>
	);
};

export default IconUpdate;
