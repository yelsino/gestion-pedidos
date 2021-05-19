const InputRdVerde = ({ atributos, handleChange, style }) => {
	const onFocus = (event) => {
		if (event.target.autocomplete) {
			event.target.autocomplete = "whatever";
		}
	};
	return (
		<div className="relative my-2">
			<input
				onChange={handleChange}
				className={`  border-primario-green text-green-500 rounded-lg  font-semibold outline-none py-3 px-6 text-lg input_text fill-current appearance-none ${
					style ? style : "border-4"
				}`}
				id={atributos.id}
				value={atributos.value}
				name={atributos.name}
				type={atributos.type}
				autoComplete="off"
				onFocus={onFocus}
				placeholder={atributos.placeholder}
				minLength={atributos.min}
				maxLength={atributos.max}
				readOnly={atributos.readOnly}
			/>

			<label
				className="absolute left-4 top-2 text-green-500 font-semibold text-lg cursor-text label_texto hidden "
				htmlFor={atributos.id}
			>
				{atributos.titulo}
			</label>
		</div>
	);
};

export default InputRdVerde;
