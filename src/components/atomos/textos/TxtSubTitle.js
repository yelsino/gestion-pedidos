const SubTitulo = (props) => {
	return (
		<p
			className={` text-2xl font-medium mb-4 ${
				props.stylos ? props.stylos : "text-gray-600"
			}`}
		>
			{props.texto}
		</p>
	);
};

export default SubTitulo;
