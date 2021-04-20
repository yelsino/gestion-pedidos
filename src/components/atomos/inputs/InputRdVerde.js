import "../../../style/input.css";

const InputRdVerde = ({ atributos, handleChange }) => {
	const onFocus = (event) => {
		if (event.target.autocomplete) {
			event.target.autocomplete = "whatever";
		}
	};
	return (
		<div className="relative my-4">
			<input
				onChange={handleChange}
				className=" border border-green-500 text-green-500 rounded-lg  font-semibold outline-none py-4 px-6 text-lg input_text fill-current"
				id={atributos.id}
				value={atributos.value}
				name={atributos.name}
				type={atributos.type}
				autoComplete="off"
				onFocus={onFocus}
				placeholder={atributos.placeholder}
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
