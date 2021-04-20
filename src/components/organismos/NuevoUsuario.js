import { Fragment, useState } from "react";
import InputCuadrado from "../atomos/inputs/InputCuadrado";
import SubTitulo from "../atomos/textos/TxtSubTitle";
import SelectGlobal from "../moleculas/SelectGlobal";

const NuevoUsuario = () => {
	// const [tipo_cuenta, setTipoCuenta] = useState("cliente");
	const [datos_usuairo, setDatosUsuario] = useState({
		username: "",
		direccion: "",
		dni: "",
		celular: "",
		referencia: "",
		correo: "",
		password: "",
		rol: "cliente",
	});
	const {
		username,
		direccion,
		dni,
		celular,
		referencia,
		rol,
		password,
		correo,
	} = datos_usuairo;

	const onChangeNewUsuario = (e) => {
		setDatosUsuario({
			...datos_usuairo,
			[e.target.name]: e.target.value,
		});
	};

	const registrarNuevoUsuario = () => {
		console.log(datos_usuairo);
	};

	const changeSelection = (nuevodato) => {
		setDatosUsuario({ ...datos_usuairo, rol: nuevodato });
	};

	return (
		<div className="flex flex-col">
			<SubTitulo texto="Registrar Usuario" />
			<span className="my-2"></span>
			<SelectGlobal
				atributos={{
					valor1: "cliente",
					valor2: "trabajador",
				}}
				valor_inicial={rol}
				changeSelection={changeSelection}
			/>
			<span className="mb-4"></span>
			<InputCuadrado
				atributos={{
					placeholder: "Nombes de usuario",
					name: "username",
					value: username,
					id: "username",
					type: "text",
					texto: "nombres:   ",
					txtmax: 40,
				}}
				handleChange={onChangeNewUsuario}
			/>
			<InputCuadrado
				atributos={{
					placeholder: "correo electronico",
					name: "correo",
					value: correo,
					id: "correo",
					type: "email",
					texto: "email:   ",
					txtmax: 30,
				}}
				handleChange={onChangeNewUsuario}
			/>

			<InputCuadrado
				atributos={{
					placeholder: "contraseña de cuenta",
					name: "password",
					value: password,
					id: "password",
					type: "text",
					texto: "contraseña:   ",
					txtmax: 20,
				}}
				handleChange={onChangeNewUsuario}
			/>

			<InputCuadrado
				atributos={{
					placeholder: "Nombes de usuario",
					name: "celular",
					value: celular,
					id: "celular",
					type: "text",
					texto: "celular:   ",
					txtmax: 9,
				}}
				handleChange={onChangeNewUsuario}
			/>
			<InputCuadrado
				atributos={{
					placeholder: "N° de dni",
					name: "dni",
					value: dni,
					id: "dni",
					type: "text",
					texto: "DNI:   ",
					txtmax: 12,
				}}
				handleChange={onChangeNewUsuario}
			/>
			{rol === "cliente" && (
				<div>
					<p className="font-medium my-2">Direccion de Usuario</p>
					<InputCuadrado
						atributos={{
							placeholder: "Direccion de usuario",
							name: "direccion",
							value: direccion,
							id: "direccion",
							type: "text",
							texto: "direccion:   ",
							txtmax: 40,
						}}
						handleChange={onChangeNewUsuario}
					/>

					<InputCuadrado
						atributos={{
							placeholder: "referencia de direccion",
							name: "referencia",
							value: referencia,
							id: "referencia",
							type: "text",
							texto: "referencia:   ",
							txtmax: 50,
						}}
						handleChange={onChangeNewUsuario}
					/>
				</div>
			)}

			<button
				className="bg-primario-blue text-white font-medium p-2  rounded-lg py-4"
				onClick={registrarNuevoUsuario}
			>
				REGISTRAR {rol.toUpperCase()}
			</button>
		</div>
	);
};

export default NuevoUsuario;
