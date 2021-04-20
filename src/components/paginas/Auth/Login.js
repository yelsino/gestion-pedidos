import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../../../context/autenticacion/authContext";
import AlertaContext from "../../../context/alertas/alertaContext";
import InputRdVerde from "../../atomos/inputs/InputRdVerde";
import Logo from "../../moleculas/Logo";
const Login = (props) => {
	const alertaContext = useContext(AlertaContext);
	const { alerta, mostrarAlerta } = alertaContext;
	const authContext = useContext(AuthContext);
	const {
		usuario: userlogged,
		mensaje,
		autenticado,
		iniciarSesion,
	} = authContext;
	// devolver mensajes

	useEffect(() => {
		if (autenticado) {
			props.history.push("/admin/productos");
		}
	}, [mensaje, autenticado, props.history]);

	const [usuario, guardarUsuario] = useState({
		email: "",
		password: "",
	});

	const { email, password } = usuario;

	const onchangeInicio = (e) => {
		guardarUsuario({
			...usuario,
			[e.target.name]: e.target.value,
		});
	};

	const onSubmit = (e) => {
		e.preventDefault();

		if (email.trim() === "" || password.trim() === "") {
			mostrarAlerta("todos los campos son obligatorios", "alerta-error");
			return;
		}

		iniciarSesion({ email, password });
	};

	return (
		<form
			className="flex justify-center items-center flex-col h-screen"
			onSubmit={onSubmit}
		>
			<Logo />
			{alerta ? <p className="text-red-500 mt-3 mb-1">{alerta.msg}</p> : null}
			<div className="contenedor-form sombra-dark"></div>
			{mensaje ? <p className="text-red-500 mt-3 mb-1">{mensaje}</p> : null}

			<InputRdVerde
				handleChange={onchangeInicio}
				atributos={{
					id: "email",
					name: "email",
					value: email,
					type: "email",
					placeholder: "correo electronico",
					titulo: "correo electronico",
				}}
			/>
			<InputRdVerde
				handleChange={onchangeInicio}
				atributos={{
					id: "password",
					name: "password",
					value: password,
					type: "password",
					placeholder: "contraseña",
					titulo: "contraseña",
				}}
			/>

			<Link to={"/registrar"} className="text-primario-blue">
				No tengo una cuenta
			</Link>
			<button
				type="submit"
				className="bg-blue-50 p-2 px-6 text-primario-blue rounded-md font-semibold hover:bg-blue-600 hover:text-white my-2 text-xl "
			>
				Iniciar Sesion
			</button>
		</form>
	);
};

export default Login;
