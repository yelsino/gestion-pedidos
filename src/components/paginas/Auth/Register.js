import { useContext, useEffect, useState } from "react";
import AuthContext from "../../../context/autenticacion/authContext";
import AlertaContext from "../../../context/alertas/alertaContext";
import InputRdVerde from "../../atomos/inputs/InputRdVerde";
import Logo from "../../moleculas/Logo";
import { Link } from "react-router-dom";

const NuevaCuenta = (props) => {
	// d extraer  valores del contexto
	const alertaContext = useContext(AlertaContext);
	const { alerta, mostrarAlerta } = alertaContext;

	const authContext = useContext(AuthContext);
	const { mensaje, autenticado, registrarUsuario } = authContext;

	// en caso de que el usuario se haya autenticado o registrador o sea un registro duplicado

	useEffect(() => {
		if (autenticado) {
			props.history.push("/admin/productos");
		}
	}, [autenticado, props.history]);

	const [usuario, guardarUsuario] = useState({
		username: "",
		email: "",
		password: "",
		confirmar: "",
	});

	// extraer usuario
	const { username, email, password, confirmar } = usuario;

	const onChangeLogin = (e) => {
		guardarUsuario({
			...usuario,
			[e.target.name]: e.target.value,
		});
	};

	const onSubmit = (e) => {
		e.preventDefault();
		// validar campos vacios
		if (
			username.trim() === "" ||
			email.trim() === "" ||
			password.trim() === "" ||
			confirmar.trim() === ""
		) {
			mostrarAlerta("Todos los campos son requeridos");
			return;
		}

		// validar password
		if (password.length < 4) {
			mostrarAlerta("El password debe contener al menos 4 caracteres");
			return;
		}

		// los dos password sean igales
		if (password !== confirmar) {
			mostrarAlerta("las contraseñas no son iguales");
			return;
		}

		registrarUsuario({
			username,
			email,
			password,
			roles: ["moderator"],
		});
	};

	return (
		<form
			onSubmit={onSubmit}
			className="flex flex-col items-center justify-center h-screen"
		>
			<Logo />
			{alerta ? <p className="text-red-500 mt-3 mb-1">{alerta.msg}</p> : null}
			{mensaje ? <p className="text-red-500 mt-3 mb-1">{mensaje}</p> : null}
			<InputRdVerde
				handleChange={onChangeLogin}
				atributos={{
					id: "username",
					name: "username",
					value: username,
					type: "text",
					placeholder: "nombre de usuario",
					titulo: "nombre de usuario",
				}}
				activo={""}
			/>

			<InputRdVerde
				handleChange={onChangeLogin}
				atributos={{
					id: "email",
					name: "email",
					value: email,
					type: "email",
					placeholder: "correo electronico",
					titulo: "correo electronico",
				}}
				activo={""}
			/>

			<InputRdVerde
				handleChange={onChangeLogin}
				atributos={{
					id: "password",
					name: "password",
					value: password,
					type: "password",
					placeholder: "contraseña",
					titulo: "contraseña",
				}}
				activo={""}
			/>

			<InputRdVerde
				handleChange={onChangeLogin}
				atributos={{
					id: "confirmar",
					name: "confirmar",
					value: confirmar,
					type: "password",
					placeholder: "confirmar contraseña ",
					titulo: "confirmar contraseña",
				}}
				activo={""}
			/>

			<Link to={"/"} className="text-blue-500">
				tengo una cuenta
			</Link>

			<button
				type="submit"
				className="bg-blue-100 p-2 px-6 text-blue-700 rounded-md font-bold hover:bg-blue-600 hover:text-white my-2"
			>
				Registrarse
			</button>
		</form>
	);
};

export default NuevaCuenta;
