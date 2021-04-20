import { useEffect, useState } from "react";

const SelectCategoria2 = ({ actualizarDatos, datos }) => {
	useEffect(() => {
		actualizarDatos({ ...datos, categoria: "vegetales" });
	}, []);

	const [value, setValue] = useState("vegetales");

	const onHandleChange = (e) => {
		setValue(e.target.value);
		actualizarDatos({ ...datos, categoria: value });
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

export default SelectCategoria2;
