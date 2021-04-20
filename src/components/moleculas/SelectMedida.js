import { useState } from "react";

const SelectMedida = ({ actualizarDatos, datos }) => {
	let { medida_minoreo } = datos;

	const [value, setValue] = useState(medida_minoreo);

	const onHandleChange = (e) => {
		setValue(e.target.value);
		actualizarDatos({ ...datos, medida_minoreo: e.target.value });
	};

	return (
		<div className="  ">
			<label
				className={`p-2 rounded-md ${
					value === "kilo"
						? "bg-primario-green shadow-sm text-green-700 font-semibold"
						: ""
				}`}
			>
				kilo
				<input
					type="radio"
					value="kilo"
					checked={value === "kilo"}
					onChange={onHandleChange}
					className="hidden"
				/>
			</label>
			{/* <label
				className={`p-2 rounded-md ${
					value === "gramos"
						? "bg-primario-green shadow-sm text-green-700 font-semibold"
						: ""
				}`}
			>
				gramos
				<input
					type="radio"
					value="gramos"
					checked={value === "gramos"}
					onChange={onHandleChange}
					className="hidden"
				/>
			</label> */}
			<label
				className={`p-2 rounded-md ${
					value === "unidad"
						? "bg-primario-green shadow-sm text-green-700 font-semibold"
						: ""
				}`}
			>
				unidad
				<input
					type="radio"
					value="unidad"
					checked={value === "unidad"}
					onChange={onHandleChange}
					className="hidden"
				/>
			</label>
		</div>
	);
};

export default SelectMedida;
