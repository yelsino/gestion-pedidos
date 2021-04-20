import {
	OBTENER_DIRECCIONES,
	ACTUALIZAR_DIRECCION,
	SELECCIONAR_DIRECCION,
	CREAR_NUEVA_DIRECCION,
	REMOVER_DIRECCION_SELECCIONADA,
} from "../../types";

export default (state, action) => {
	switch (action.type) {
		case CREAR_NUEVA_DIRECCION:
			return {
				direcciones: [...state.direcciones, action.payload],
			};
		case SELECCIONAR_DIRECCION:
			return {
				...state,
				direccion_seleccionada: state.direcciones.filter(
					(direccion) => direccion._id === action.payload
				),
			};
		case ACTUALIZAR_DIRECCION:
			const filtrar_direccion = state.direcciones.filter(
				(e) => e._id !== action.payload._id
			);
			return {
				...state,
				direcciones: [...filtrar_direccion, action.payload],
			};

		case OBTENER_DIRECCIONES:
			return {
				...state,
				direcciones: action.payload,
			};
		case REMOVER_DIRECCION_SELECCIONADA:
			return {
				...state,
				direccion_seleccionada: action.payload,
			};

		default:
			return state;
	}
};
