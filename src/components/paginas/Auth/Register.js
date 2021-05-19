import { useContext, useEffect, useState } from "react";
import AuthContext from "../../../context/autenticacion/authContext";
import AlertaContext from "../../../context/alertas/alertaContext";
import InputRdVerde from "../../atomos/inputs/InputRdVerde";
import { Link } from "react-router-dom";
import SubTitulo from "../../atomos/textos/TxtSubTitle";
import BotonAzul from "../../atomos/botones/BotonAzul";
import img2 from "../../../static/img2.svg";

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
		<div className="flex justify-center items-center  w-full lg:w-1/2 flex-col  h-screen ">
			<SubTitulo
				texto={"Registrarse"}
				style={"text-primario-green-pure text-4xl"}
			/>
			<form
				onSubmit={onSubmit}
				className="flex flex-col items-center justify-center h-screen  w-full"
			>
				{alerta ? <p className="text-red-500 mt-3 mb-1">{alerta.msg}</p> : null}
				{mensaje ? <p className="text-red-500 mt-3 mb-1">{mensaje}</p> : null}
				<div className="mb-5">
					<p className=" text-gray-500">Nombres</p>
					<InputRdVerde
						handleChange={onChangeLogin}
						atributos={{
							id: "username",
							name: "username",
							value: username,
							type: "text",
							placeholder: "nombre de usuario",
							min: 4,
							max: 40,
						}}
						style={"w-96 border-l-8  border-t-0 border-b-2 border-r-0"}
					/>
				</div>

				<div className="mb-5">
					<p className=" text-gray-500">Correo electronico</p>
					<InputRdVerde
						handleChange={onChangeLogin}
						atributos={{
							id: "email",
							name: "email",
							value: email,
							type: "email",
							placeholder: "correo electronico",
							min: 4,
							max: 40,
						}}
						style={"w-96 border-l-8  border-t-0 border-b-2 border-r-0"}
					/>
				</div>

				<div className="mb-5">
					<p className=" text-gray-500">Contraseña</p>
					<InputRdVerde
						handleChange={onChangeLogin}
						atributos={{
							id: "password",
							name: "password",
							value: password,
							type: "password",
							placeholder: "contraseña",
							max: 30,
						}}
						style={"w-96 border-l-8  border-t-0 border-b-2 border-r-0"}
					/>
				</div>

				<div className="mb-5">
					<p className=" text-gray-500">Confirmar contraseña</p>
					<InputRdVerde
						handleChange={onChangeLogin}
						atributos={{
							id: "confirmar",
							name: "confirmar",
							value: confirmar,
							type: "password",
							placeholder: "confirmar contraseña ",
							max: 30,
						}}
						style={"w-96 border-l-8  border-t-0 border-b-2 border-r-0"}
					/>
				</div>

				<BotonAzul
					texto={"Registrarse"}
					type={"submit"}
					style={"w-96 border-2 border-primario-blue"}
				/>
				<Link to={"/"} className="text-primario-blue my-2">
					tengo una cuenta
				</Link>
			</form>
			<div className=" absolute bottom-20 hidden lg:flex  right-0 z-0  w-1/2">
				<img src={img2} className="" />
			</div>
		</div>
	);
};

export default NuevaCuenta;
