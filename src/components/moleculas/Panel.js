import React, {  useState } from "react";
import { useHistory } from "react-router-dom";

import Logo from "./Logo";

const Panel = (props) => {
	const [value, setValue] = useState("productos");


	const history = useHistory();
	const onHandleChange = (e) => {
		setValue(e.target.value);
	};

	return (
		<div
			className={`py-4 shadow-md   flex-col items-center border justify-between
         w-60 h-screen fixed bg-white z-30
           lg:flex ${props.activar ? "flex " : "hidden "}`}
		>
			<div className="list-none flex flex-col items-center text-center">
				<Logo />

				<label
					onClick={() => {
						history.push("/admin/productos");
					}}
					className={`  cursor-pointer mx-4 p-6 w-56 rounded-md text-4xl mb-2 ${
						value === "productos" ? "bg-primario-green shadow-sm " : ""
					}`}
				>
					Productos
					<input
						type="radio"
						value="productos"
						checked={value === "productos"}
						onChange={onHandleChange}
						className="hidden"
					/>
				</label>
				<label
					onClick={() => {
						history.push("/admin/pedidos");
					}}
					className={`  cursor-pointer mx-4 p-6 w-56 rounded-md text-4xl mb-2 ${
						value === "pedidos" ? "bg-primario-green shadow-sm " : ""
					}`}
				>
					Pedidos
					<input
						type="radio"
						value="pedidos"
						checked={value === "pedidos"}
						onChange={onHandleChange}
						className="hidden"
					/>
				</label>
				<label
					onClick={() => {
						history.push("/admin/reclamos");
					}}
					className={`  cursor-pointer mx-4 p-6 w-56 rounded-md text-4xl mb-2 ${
						value === "reclamos" ? "bg-primario-green shadow-sm " : ""
					}`}
				>
					Reclamos
					<input
						type="radio"
						value="reclamos"
						checked={value === "reclamos"}
						onChange={onHandleChange}
						className="hidden"
					/>
				</label>

				<label
					onClick={() => {
						history.push("/admin/usuarios");
				
					}}
					className={` cursor-pointer mx-4 p-6 w-56 rounded-md text-4xl mb-2 ${
						value === "usuarios" ? "bg-primario-green shadow-sm " : ""
					}`}
				>
					Usuarios
					<input
						type="radio"
						value="usuarios"
						checked={value === "usuarios"}
						onChange={onHandleChange}
						className="hidden"
					/>
				</label>
			</div>
		</div>
	);
};

export default Panel;
