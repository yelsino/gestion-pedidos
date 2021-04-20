import { OBTENER_PEDIDOS, PEDIDO_SELECCIONADO } from "../../types";

export default (state, action) => {
	switch (action.type) {
		case OBTENER_PEDIDOS:
			return {
				...state,
				pedidos: action.payload,
			};
		case PEDIDO_SELECCIONADO:
			const pedidoseleccionado = state.pedidos.filter(
				(pedido) => pedido._id === action.payload
			);

			localStorage.setItem("pedido_actual", JSON.stringify(pedidoseleccionado[0]));
			return {
				...state,
				pedido: pedidoseleccionado[0],
			};
		default:
			return state;
	}
};
