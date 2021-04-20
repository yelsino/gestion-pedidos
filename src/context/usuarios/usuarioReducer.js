import {
	OBTENER_USUARIOS,
	SELECCIONAR_USUARIO,
	SELECCIONAR_USUARIO_PEDIDO,
	REMOVER_USUARIO_PEDIDO,
} from "../../types";

export default (state, action) => {
	switch (action.type) {
		case OBTENER_USUARIOS:
			return {
				...state,
				usuarios: action.payload,
			};
		case SELECCIONAR_USUARIO:
			const usuario_seleccionado = state.usuarios.filter(
				(usuario) => usuario._id === action.payload
			);
			localStorage.setItem(
				"usuario_seleccionado",
				JSON.stringify(usuario_seleccionado)
			);
		case SELECCIONAR_USUARIO_PEDIDO:
			return {
				...state,
				usuario_pedido: state.usuarios.filter(
					(usuario) => usuario._id === action.payload
				),
			};
		case REMOVER_USUARIO_PEDIDO:
			return {
				...state,
				usuario_pedido: action.payload,
			};
		default:
			return state;
	}
};
