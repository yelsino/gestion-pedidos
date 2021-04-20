import {
	AGREGAR_PRODUCTOS,
	QUITAR_PRODUCTOS,
	SELECIONAR_ITEM,
	ACTUALIZAR_ITEM,
	OBTENER_LISTA_CREADA,
	ELIMINAR_LISTA,
	OBTENER_LISTAS,
} from "../../types";

export default (state, action) => {
	switch (action.type) {
		case QUITAR_PRODUCTOS:
			const lista_modificada = state.lista_productos.filter(
				(producto) => producto._id !== action.payload
			);
			return {
				...state,
				lista_productos: lista_modificada,
			};
		case AGREGAR_PRODUCTOS:
			return {
				lista_productos: [...state.lista_productos, action.payload],
			};
		case SELECIONAR_ITEM:
			return {
				...state,
				itemseleccionado: state.lista_productos.filter(
					(producto) => producto._id === action.payload
				),
			};
		case ACTUALIZAR_ITEM:
			const filtrar_item = state.lista_productos.filter(
				(e) => e._id !== action.payload._id
			);
			// filtrar_item.push(action.payload);
			return {
				...state,
				lista_productos: [...filtrar_item, action.payload],
			};
		case OBTENER_LISTA_CREADA:
			return {
				...state,
				lista_creada: action.payload,
			};
		case OBTENER_LISTAS:
			return {
				...state,
				listas: action.payload,
			};
		case ELIMINAR_LISTA:
			if (state.listas) {
				const filtrar = state.listas.filter((e) => e._id !== action.payload);
				return {
					...state,
					listas: filtrar,
				};
			}

		default:
			return state;
	}
};
