import { useReducer } from "react";
import clienteAxios from "../../config/axios";
import tokenAuth from "../../config/token";
import {
	OBTENER_USUARIO,
	LOGIN_EXITOSO,
	LOGIN_ERROR,
	REGISTRO_EXITOSO,
	REGISTRO_ERROR,
	CERRAR_SESION,
	MOSTRAR_ALERTA,
	OCULTAR_ALERTA,
} from "../../types";
import AuthContext from "./authContext";
import AuthReducer from "../../context/autenticacion/authReducer";

const AuthState = (props) => {
	const initialState = {
		token: localStorage.getItem("token"),
		autenticado: null,
		usuario: localStorage.getItem("usuario"),
		mensaje: null,
	};

	const [state, dispatch] = useReducer(AuthReducer, initialState);

	// d las funcioens
	const registrarUsuario = async (datos) => {
		try {
			const respuesta = await clienteAxios.post("api/auth/signup", datos);

			dispatch({
				type: REGISTRO_EXITOSO,
				payload: respuesta.data,
			});

			// obtener usuario autenticado
			usuarioAutenticado();
		} catch (error) {
			dispatch({
				type: REGISTRO_ERROR,
			});
			mostrarMensaje(error.response.data.message);
		}
	};

	// d retorna al usuario autenticado
	const usuarioAutenticado = async () => {
		try {
			const token = localStorage.getItem("token");
			if (token) {
				tokenAuth(token);
			}

			try {
				const respuesta = await clienteAxios.get("api/auth");

				dispatch({
					type: OBTENER_USUARIO,
					payload: respuesta.data,
				});
			} catch (error) {
				dispatch({
					type: LOGIN_ERROR,
				});
			}
		} catch (error) {
			console.log(error.response);
		}
	};

	// d cuando el usuario iniciar sesion
	const iniciarSesion = async (datos) => {
		try {
			const respuesta = await clienteAxios.post("api/auth/signinadmin", datos);

			dispatch({
				type: LOGIN_EXITOSO,
				payload: respuesta.data,
			});

			// Obtener al usuario
			usuarioAutenticado();
		} catch (error) {
			mostrarMensaje(error.response.data.message);
		}
	};

	// CIERRA LA SESION DEL USUARIO
	const cerrarSesion = () => {
		try {
			dispatch({
				type: CERRAR_SESION,
			});
		} catch (error) {
			console.log(error);
		}
	};

	// d mostrar mensaje
	const mostrarMensaje = (msg) => {
		dispatch({
			type: MOSTRAR_ALERTA,
			payload: msg,
		});

		setTimeout(() => {
			dispatch({
				type: OCULTAR_ALERTA,
			});
		}, 3000);
	};

	return (
		<AuthContext.Provider
			value={{
				token: state.token,
				autenticado: state.autenticado,
				usuario: state.usuario,
				mensaje: state.mensaje,
				registrarUsuario,
				iniciarSesion,
				usuarioAutenticado,
				cerrarSesion,
				mostrarMensaje,
			}}
		>
			{" "}
			{props.children}
		</AuthContext.Provider>
	);
};

export default AuthState;
