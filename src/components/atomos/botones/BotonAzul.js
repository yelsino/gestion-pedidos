const BotonAzul = (props) => {
	return (
		<button
			type={props.type}
			className={`bg-primario-blue-claro p-4 px-8 text-primario-blue rounded-md font-bold  outline-none hover:bg-primario-blue hover:text-white z-10 ${
				props.style ? props.style : ""
			}`}
			onClick={props.onBtn}
		>
			{props.texto}
		</button>
	);
};

export default BotonAzul;
