import { useState } from "react";

const SelectMedida2 = ({ actualizarDatos, datos, atributos }) => {
	// let { medida_minoreo } = datos;

	const [value, setValue] = useState(datos);

	const onHandleChange = (e) => {
		e.preventDefault();
		setValue(e.target.value);
		actualizarDatos(e.target.value);
	};

	return (
		<div className="flex ">
			{atributos.valor1 && (
				<label
					className={`cursor-pointer p-2 mx-1 rounded-md ${
						value === atributos.valor1
							? "bg-primario-green shadow-sm text-green-700 font-semibold "
							: ""
					}`}
				>
					{atributos.valor1}
					<input
						type="radio"
						value={atributos.valor1}
						checked={value === atributos.valor1}
						onChange={onHandleChange}
						className="hidden"
					/>
				</label>
			)}

			{atributos.valor2 && (
				<label
					className={`cursor-pointer p-2 mx-1 rounded-md ${
						value === atributos.valor2
							? "bg-primario-green shadow-sm text-green-700 font-semibold"
							: ""
					}`}
				>
					{atributos.valor2}
					<input
						type="radio"
						value={atributos.valor2}
						checked={value === atributos.valor2}
						onChange={onHandleChange}
						className="hidden"
					/>
				</label>
			)}
			{atributos.valor3 && (
				<label
					className={`cursor-pointer p-2 mx-1 rounded-md ${
						value === atributos.valor3
							? "bg-primario-green shadow-sm text-green-700 font-semibold"
							: ""
					}`}
				>
					{atributos.valor3}
					<input
						type="radio"
						value={atributos.valor3}
						checked={value === atributos.valor3}
						onChange={onHandleChange}
						className="hidden"
					/>
				</label>
			)}
			{atributos.valor4 && (
				<label
					className={`cursor-pointer p-2 mx-1 rounded-md ${
						value === atributos.valor4
							? "bg-primario-green shadow-sm text-green-700 font-semibold"
							: ""
					}`}
				>
					{atributos.valor4}
					<input
						type="radio"
						value={atributos.valor4}
						checked={value === atributos.valor4}
						onChange={onHandleChange}
						className="hidden"
					/>
				</label>
			)}
		</div>
	);
};

export default SelectMedida2;
