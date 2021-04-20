import {
	OBTENER_PRODUCTOS,
	OBTENER_PRODUCTOS_CATEGORIAS,
	PRODUCTO_SELECCIONADO,
	PRODUCTOS_LISTA,
	OBTENER_PRODUCTOS_AGOTADOS,
	LIMPIAR,
	ACTUALIZAR_PRODUCTO,
	LIMPIAR_PRODUCTO_ELEJIDO,
	MANTENER_ESTADO,
	CREAR_PRODUCTO,
} from "../../types";

export default (state, action) => {
	switch (action.type) {
		case OBTENER_PRODUCTOS_CATEGORIAS:
		case OBTENER_PRODUCTOS:
		case OBTENER_PRODUCTOS_AGOTADOS:
			return {
				...state,
				productos: action.payload,
			};
		case PRODUCTOS_LISTA:
			return {
				...state,
				productoslista: action.payload,
			};
		case PRODUCTO_SELECCIONADO:
			return {
				...state,
				productoseleccionado: state.productos.filter(
					(producto) => producto._id === action.payload
				),
			};
		case LIMPIAR:
			return {
				...state,
				productoseleccionado: null,
			};
		case ACTUALIZAR_PRODUCTO:
			return {
				...state,
				productos: action.payload,
			};
		case LIMPIAR_PRODUCTO_ELEJIDO:
			return {
				...state,
				productos: state.productos.filter((e) => e._id !== action.payload),
			};
		// case MANTENER_ESTADO:
		// 	return {
		// 		productos: action.payload,
		// 	};
		case CREAR_PRODUCTO:
			return {
				...state,
				productos: [...state.productos, action.payload],
			};
		// case DESACTIVAR_PRODUCTO:
		// 	return {
		// 		...state,
		// 		productos: productos,
		// 	};
		default:
			return state;
	}
};
