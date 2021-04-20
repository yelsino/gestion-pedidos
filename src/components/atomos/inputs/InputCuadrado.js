const InputCuadrado = ({ atributos, handleChange }) => {
	const onFocus = (event) => {
		if (event.target.autocomplete) {
			event.target.autocomplete = "whatever";
		}
	};
	return (
		<label
			htmlFor={atributos.id}
			className="rounded-md shadow-md border border-blue-500   text-primario-blue text-xl w-full mb-4 pl-4  flex items-center relative "
		>
			{atributos.texto}
			<input
				className="outline-none text-gray-700  w-full py-4  mx-4"
				placeholder={atributos.placeholder}
				value={atributos.value}
				id={atributos.id}
				name={atributos.name}
				type={atributos.type}
				onFocus={onFocus}
				onChange={handleChange}
				maxLength={atributos.txtmax}
			/>
		</label>
	);
};

export default InputCuadrado;
