import {
	OBTENER_USUARIO,
	LOGIN_EXITOSO,
	LOGIN_ERROR,
	CERRAR_SESION,
	REGISTRO_EXITOSO,
	REGISTRO_ERROR,
	MOSTRAR_ALERTA,
	OCULTAR_ALERTA,
} from "../../types";

export default (state, action) => {
	switch (action.type) {
		case REGISTRO_EXITOSO:
		case LOGIN_EXITOSO:
			localStorage.setItem("token", action.payload.token);
			return {
				...state,
				autenticado: true,
				mensaje: null,
				token: action.payload.token,
			};

		case OBTENER_USUARIO:
			localStorage.setItem("usuario", JSON.stringify(action.payload.usuario));
			return {
				...state,
				autenticado: true,
				usuario: action.payload.usuario,
			};

		case CERRAR_SESION:
		case REGISTRO_ERROR:
		case LOGIN_ERROR:
			localStorage.removeItem("token");
			localStorage.removeItem("usuario");
			return {
				...state,
				token: null,
				usuario: null,
				autenticado: null,
				mensaje: action.payload,
			};
		case MOSTRAR_ALERTA:
			return {
				mensaje: action.payload,
			};
		case OCULTAR_ALERTA:
			return {
				mensaje: null,
			};
		default:
			return state;
	}
};
