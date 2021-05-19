import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../../../context/autenticacion/authContext";
import AlertaContext from "../../../context/alertas/alertaContext";
import InputRdVerde from "../../atomos/inputs/InputRdVerde";
import SubTitulo from "../../atomos/textos/TxtSubTitle";
import img2 from "../../../static/img2.svg";

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
		<div className="flex">
			<div className="flex justify-center items-center  w-full lg:w-1/2 flex-col   h-screen ">
				<SubTitulo
					texto={"Iniciar Sesion"}
					style={"text-primario-green-pure text-4xl "}
				/>

				<form
					className="flex justify-center items-center flex-col   py-6 rounded-lg  px-10 relative z-20  w-full"
					onSubmit={onSubmit}
				>
					{alerta ? (
						<p className="text-red-500 mt-3 mb-1">{alerta.msg}</p>
					) : null}
					<div className="contenedor-form sombra-dark"></div>
					{mensaje ? <p className="text-red-500 mt-3 mb-1">{mensaje}</p> : null}

					<div className="mb-10">
						<p className=" text-gray-500">Correo Electronico</p>

						<InputRdVerde
							handleChange={onchangeInicio}
							atributos={{
								id: "email",
								name: "email",
								value: email,
								type: "email",
								placeholder: "correo electronico",
							}}
							style={"w-96 border-l-8  border-t-0 border-b-2 border-r-0"}
						/>
					</div>
					<div className="mb-10">
						<p className="  text-gray-500">Contraseña</p>
						<InputRdVerde
							handleChange={onchangeInicio}
							atributos={{
								id: "password",
								name: "password",
								value: password,
								type: "password",
								placeholder: "contraseña",
							}}
							style={"w-96 border-l-8  border-t-0 border-b-2 border-r-0"}
						/>
					</div>

					<button
						type="submit"
						className=" p-4 px-8 text-primario-blue border-2 border-primario-blue bg-primario-blue-claro  rounded-md font-bold  outline-none hover:bg-primario-blue hover:text-white text-lg w-96 mt-5"
					>
						Iniciar Sesion
					</button>
					<Link to={"/registrar"} className="text-primario-red my-3">
						No tengo una cuenta
					</Link>
				</form>
			</div>
			<div className=" absolute bottom-20 hidden lg:flex  right-20 z-0">
				<img src={img2} className="" />
			</div>
		</div>
	);
};

export default Login;
