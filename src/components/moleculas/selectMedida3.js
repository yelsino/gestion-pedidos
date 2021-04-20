import { useState } from "react";

const SelectMedida3 = ({ actualizarDatos, datos }) => {
	let { medidada_mayoreo } = datos;

	const [value, setValue] = useState(medidada_mayoreo);

	const onHandleChange = (e) => {
		setValue(e.target.value);
		actualizarDatos({ ...datos, medidada_mayoreo: e.target.value });
	};

	return (
		<div className="  ">
			<label
				className={`p-2 rounded-md ${
					value === "saco"
						? "bg-primario-green shadow-sm text-green-700 font-semibold"
						: ""
				}`}
			>
				saco
				<input
					type="radio"
					value="saco"
					checked={value === "saco"}
					onChange={onHandleChange}
					className="hidden"
				/>
			</label>
			<label
				className={`p-2 rounded-md ${
					value === "cajon"
						? "bg-primario-green shadow-sm text-green-700 font-semibold"
						: ""
				}`}
			>
				cajon
				<input
					type="radio"
					value="cajon"
					checked={value === "cajon"}
					onChange={onHandleChange}
					className="hidden"
				/>
			</label>
			<label
				className={`p-2 rounded-md ${
					value === "bolsa"
						? "bg-primario-green shadow-sm text-green-700 font-semibold"
						: ""
				}`}
			>
				bolsa
				<input
					type="radio"
					value="bolsa"
					checked={value === "bolsa"}
					onChange={onHandleChange}
					className="hidden"
				/>
			</label>
		</div>
	);
};

export default SelectMedida3;
