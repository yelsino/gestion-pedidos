import { useReducer } from "react";
import { OBTENER_PEDIDOS, PEDIDO_SELECCIONADO } from "../../types";

import pedidoReducer from "./pedidoReducer";
import clienteAxios from "../../config/axios";
import PedidoContext from "./pedidoContext";

const PedidoState = (props) => {
	const InitialState = {
		pedidos: [],
		pedido: null,
	};

	const [state, dispatch] = useReducer(pedidoReducer, InitialState);

	// d obtener pedidos
	const obtenerPedidos = async () => {
		try {
			const resultado = await clienteAxios.get("/api/pedidos/admin");
			dispatch({
				type: OBTENER_PEDIDOS,
				payload: resultado.data,
			});
		} catch (error) {
			console.log(error);
		}
	};

	// d crear nuevo pedido
	const crearNuevoPedido = async (data) => {
		try {
			const resultado = await clienteAxios.post("api/pedidos", data);
			console.log(resultado);
		} catch (error) {
			console.log(error.response);
		}
	};

	// d seleccionar pedido seleccionado
	const seleccionarPedido = (pedidoId) => {
		console.log("gaaaaaaa")
		try {
			dispatch({
				type: PEDIDO_SELECCIONADO,
				payload: pedidoId,
			});
		} catch (error) {
			console.log(error);
		}
	};

	// d actualizar pedido actual
	const atenderPedidoActual = async (pedidoId, datos) => {
		try {
			await clienteAxios.put(`/api/pedidos/${pedidoId}`, datos);
			obtenerPedidos();
			seleccionarPedido(pedidoId);
		} catch (error) {
			console.log(error.response);
		}
	};

	// d cancelar pedido actual
	const cancelarPedidoActual = async (pedidoId, datos) => {
		try {
			await clienteAxios.put(`/api/pedidos/${pedidoId}`, datos);
			obtenerPedidos();
			seleccionarPedido(pedidoId);
		} catch (error) {
			console.log(error.response);
		}
	};

	// d retomar Pedido actual
	const retomarPedidoActual = async (pedidoId, datos) => {
		try {
			await clienteAxios.put(`/api/pedidos/${pedidoId}`, datos);
			obtenerPedidos();
			seleccionarPedido(pedidoId);
		} catch (error) {
			console.log(error.response);
		}
	};

	return (
		<PedidoContext.Provider
			value={{
				pedidos: state.pedidos,
				pedido: state.pedido,
				obtenerPedidos,
				seleccionarPedido,
				atenderPedidoActual,
				cancelarPedidoActual,
				retomarPedidoActual,
				crearNuevoPedido,
			}}
		>
			{props.children}
		</PedidoContext.Provider>
	);
};

export default PedidoState;
