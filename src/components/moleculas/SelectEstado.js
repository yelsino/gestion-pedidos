import { useState } from "react";

const SelectEstado = ({ actualizarDatos, datos }) => {
	let { estado } = datos;

	if (estado === true) {
		estado = "existente";
	}

	if (estado === false) {
		estado = "agotado";
	}

	const [value, setValue] = useState(estado);

	const onHandleChange = (e) => {
		setValue(e.target.value);
		let n_s = e.target.value;
		if (n_s === "existente") {
			n_s = true;
		}
		if (n_s === "agotado") {
			n_s = false;
		}
		actualizarDatos({ ...datos, estado: n_s });
	};

	return (
		<div className="  ">
			<label
				className={`p-2 rounded-md ${
					value === "existente"
						? "bg-primario-green shadow-sm text-green-700 font-semibold"
						: ""
				}`}
			>
				existente
				<input
					type="radio"
					value="existente"
					checked={value === "existente"}
					onChange={onHandleChange}
					className="hidden"
				/>
			</label>
			<label
				className={`p-2 rounded-md ${
					value === "agotado"
						? "bg-primario-green shadow-sm text-green-700 font-semibold"
						: ""
				}`}
			>
				agotado
				<input
					type="radio"
					value="agotado"
					checked={value === "agotado"}
					onChange={onHandleChange}
					className="hidden"
				/>
			</label>
		</div>
	);
};

export default SelectEstado;
