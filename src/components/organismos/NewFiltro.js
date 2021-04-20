import { useState } from "react";

const NewFiltro = ({
	filtro1,
	filtro2,
	filtro3,
	filtro4,
	filtro5,
	texto1,
	texto2,
	texto3,
	texto4,
	texto5,
	stilo,
}) => {
	const [value, setValue] = useState("todos");

	const onHandleChange = (e) => {
		setValue(e.target.value);
	};

	return (
		<div className={` flex justify-center flex-wrap ${stilo} `}>
			<label
				onClick={filtro1}
				className={`hover:bg-primario-green cursor-pointer mx-4 p-2 rounded-md ${
					value === "todos"
						? "bg-primario-green shadow-sm text-green-700 font-semibold"
						: ""
				}`}
			>
				{texto1}
				<input
					type="radio"
					value="todos"
					checked={value === "todos"}
					onChange={onHandleChange}
					className="hidden"
				/>
			</label>
			<label
				onClick={filtro2}
				className={`hover:bg-primario-green cursor-pointer mx-4 p-2 rounded-md ${
					value === "agotados"
						? "bg-primario-green shadow-sm text-green-700 font-semibold"
						: ""
				}`}
			>
				{texto2}
				<input
					type="radio"
					value="agotados"
					checked={value === "agotados"}
					onChange={onHandleChange}
					className="hidden"
				/>
			</label>
			<label
				onClick={filtro3}
				className={`hover:bg-primario-green cursor-pointer mx-4 p-2 rounded-md ${
					value === "vegetales"
						? "bg-primario-green shadow-sm text-green-700 font-semibold"
						: ""
				}`}
			>
				{texto3}
				<input
					type="radio"
					value="vegetales"
					checked={value === "vegetales"}
					onChange={onHandleChange}
					className="hidden"
				/>
			</label>
			{texto4 && (
				<label
					onClick={filtro4}
					className={`hover:bg-primario-green cursor-pointer mx-4 p-2 rounded-md ${
						value === "frutas"
							? "bg-primario-green shadow-sm text-green-700 font-semibold"
							: ""
					}`}
				>
					{texto4}
					<input
						type="radio"
						value="frutas"
						checked={value === "frutas"}
						onChange={onHandleChange}
						className="hidden"
					/>
				</label>
			)}

			{texto5 && (
				<label
					onClick={filtro5}
					className={`hover:bg-primario-green cursor-pointer mx-4 p-2 rounded-md ${
						value === "abarrotes"
							? "bg-primario-green shadow-sm text-green-700 font-semibold"
							: ""
					}`}
				>
					{texto5}
					<input
						type="radio"
						value="abarrotes"
						checked={value === "abarrotes"}
						onChange={onHandleChange}
						className="hidden"
					/>
				</label>
			)}
		</div>
	);
};

export default NewFiltro;
