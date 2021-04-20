import { useReducer } from "react";
import clienteAxios from "../../config/axios";
import {
	OBTENER_USUARIOS,
	SELECCIONAR_USUARIO,
	SELECCIONAR_USUARIO_PEDIDO,
	REMOVER_USUARIO_PEDIDO,
} from "../../types";

import UsuarioContext from "./usuarioContext";
import UsuarioReducer from "./usuarioReducer";

const UsuarioState = (props) => {
	const InitialState = {
		usuarios: [],
		usuario: null,
		usuario_pedido: null,
	};

	// d dispatch para ejecutar las acciones
	const [state, dispatch] = useReducer(UsuarioReducer, InitialState);

	// d obtener reclamos
	const obtenerUsuarios = async () => {
		try {
			const resultado = await clienteAxios.get("api/users");
			dispatch({
				type: OBTENER_USUARIOS,
				payload: resultado.data,
			});
		} catch (error) {
			console.log(error.response);
		}
	};

	// d obtener reclamo actual
	const obtenerUsuarioActual = async (usuarioId) => {
		try {
			const id = await usuarioId;
			dispatch({
				type: SELECCIONAR_USUARIO,
				payload: id,
			});
		} catch (error) {
			console.log(error.response);
		}
	};

	// d seleccionar ususario para pedido
	const seleccionarUsuarioPedido = async (usuarioId) => {
		try {
			const id = await usuarioId;
			dispatch({
				type: SELECCIONAR_USUARIO_PEDIDO,
				payload: id,
			});
		} catch (error) {
			console.log(error.response);
		}
	};

	const removerUsuarioPedido = async () => {
		try {
			dispatch({
				type: REMOVER_USUARIO_PEDIDO,
				payload: null,
			});
		} catch (error) {
			console.log(error.response);
		}
	};

	return (
		<UsuarioContext.Provider
			value={{
				usuarios: state.usuarios,
				usuario: state.usuario,
				usuario_pedido: state.usuario_pedido,
				obtenerUsuarios,
				obtenerUsuarioActual,
				seleccionarUsuarioPedido,
				removerUsuarioPedido,
			}}
		>
			{props.children}
		</UsuarioContext.Provider>
	);
};

export default UsuarioState;
