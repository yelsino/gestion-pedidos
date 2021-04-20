const BotonAzul = (props) => {
	return (
		<button
			className="bg-blue-200 p-2 px-6 text-blue-600 rounded-md font-bold hover:bg-blue-600 hover:text-blue-200"
			onClick={props.onBtn}
		>
			{props.texto}
		</button>
	);
};

export default BotonAzul;
