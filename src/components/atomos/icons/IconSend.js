import { IoSend } from "react-icons/io5";

const IconSend = ({ enviar, style }) => {
	return (
		<IoSend
			onClick={enviar}
			className={`cursor-pointer ${style ? style : ""}`}
		/>
	);
};

export default IconSend;
