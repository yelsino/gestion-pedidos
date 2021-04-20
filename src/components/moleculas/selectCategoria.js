import { useState } from "react";

const SelectCategoria = ({ actualizarDatos, datos }) => {
	let { categoria } = datos;

	if (datos.categoria === "601ecaad34bf2f55c7fbfd82") {
		categoria = "vegetales";
	}

	if (categoria === "601ecaad34bf2f55c7fbfd83") {
		categoria = "frutas";
	}

	if (categoria === "601ecaad34bf2f55c7fbfd84") {
		categoria = "abarrotes";
	}
	const [value, setValue] = useState(categoria);

	const onHandleChange = (e) => {
		setValue(e.target.value);
		let codigo_categoria = "";
		if (e.target.value === "vegetales") {
			codigo_categoria = "601ecaad34bf2f55c7fbfd82";
		}

		if (e.target.value === "frutas") {
			codigo_categoria = "601ecaad34bf2f55c7fbfd83";
		}
		if (e.target.value === "abarrotes") {
			codigo_categoria = "601ecaad34bf2f55c7fbfd84";
		}
		actualizarDatos({ ...datos, categoria: codigo_categoria });
	};

	return (
		<div className="  ">
			<label
				className={`p-2 rounded-md ${
					value === "vegetales"
						? "bg-primario-green shadow-sm text-green-700 font-semibold"
						: ""
				}`}
			>
				vegetales
				<input
					type="radio"
					value="vegetales"
					checked={value === "vegetales"}
					onChange={onHandleChange}
					className="hidden"
				/>
			</label>
			<label
				className={`p-2 rounded-md ${
					value === "frutas"
						? "bg-primario-green shadow-sm text-green-700 font-semibold"
						: ""
				}`}
			>
				frutas
				<input
					type="radio"
					value="frutas"
					checked={value === "frutas"}
					onChange={onHandleChange}
					className="hidden"
				/>
			</label>
			<label
				className={`p-2 rounded-md ${
					value === "abarrotes"
						? "bg-primario-green shadow-sm text-green-700 font-semibold"
						: ""
				}`}
			>
				abarrotes
				<input
					type="radio"
					value="abarrotes"
					checked={value === "abarrotes"}
					onChange={onHandleChange}
					className="hidden"
				/>
			</label>
		</div>
	);
};

export default SelectCategoria;
