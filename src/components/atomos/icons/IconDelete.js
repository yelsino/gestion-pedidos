import { RiDeleteBinLine } from "react-icons/ri";

const IconDelete = (props) => {
	return (
		<RiDeleteBinLine
			onClick={props.onIcon}
			className="text-primario-red text-3xl cursor-pointer"
		/>
	);
};

export default IconDelete;
