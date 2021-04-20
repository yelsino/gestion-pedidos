import { useReducer } from "react";
import clienteAxios from "../../config/axios";
import {
	AGREGAR_PRODUCTOS,
	QUITAR_PRODUCTOS,
	SELECIONAR_ITEM,
	ACTUALIZAR_ITEM,
	OBTENER_LISTA_CREADA,
	ELIMINAR_LISTA,
	OBTENER_LISTAS,
} from "../../types";

import listaReducer from "./listaReducer";
import ListaContext from "./listaContext";

const ListaState = (props) => {
	const InitialState = {
		lista_productos: [],
		itemseleccionado: null,
		lista_creada: null,
		listas: [],
	};

	const [state, dispatch] = useReducer(listaReducer, InitialState);

	// d crear nueva lista
	const crearNuevaLista = async (data) => {
		try {
			const resultado = await clienteAxios.post("api/listas", data);
			console.log(resultado.data._id);
			dispatch({
				type: OBTENER_LISTA_CREADA,
				payload: resultado.data._id,
			});
		} catch (error) {
			console.log(error.response);
		}
	};

	// d obtener listas
	const obtenerListas = async () => {
		console.log("raaa");
		try {
			const resultado = await clienteAxios.get("api/listas");
			console.log(resultado);

			dispatch({
				type: OBTENER_LISTAS,
				payload: resultado.data,
			});
		} catch (error) {
			console.log(error.response);
		}
	};

	// d eliminar lista
	const eliminarLista = async (listaId) => {
		try {
			const resultado = await clienteAxios.delete(`api/listas/${listaId}`);

			dispatch({
				type: ELIMINAR_LISTA,
				payload: listaId,
			});
		} catch (error) {
			console.log(error.response);
		}
	};

	// d agregar productosa la lista
	const quitarProductos = (productoId) => {
		dispatch({
			type: QUITAR_PRODUCTOS,
			payload: productoId,
		});
	};

	const agregarProductos = (producto) => {
		const validar = state.lista_productos.filter((e) => e._id === producto._id);

		if (validar[0]) return;

		dispatch({
			type: AGREGAR_PRODUCTOS,
			payload: producto,
		});
	};

	const seleccionarItem = (productoId) => {
		dispatch({
			type: SELECIONAR_ITEM,
			payload: productoId,
		});
	};

	const actualizarItem = (producto) => {
		dispatch({
			type: ACTUALIZAR_ITEM,
			payload: producto,
		});
	};

	return (
		<ListaContext.Provider
			value={{
				listas: state.listas,
				itemseleccionado: state.itemseleccionado,
				lista_creada: state.lista_creada,
				lista_productos: state.lista_productos,
				quitarProductos,
				agregarProductos,
				seleccionarItem,
				actualizarItem,
				crearNuevaLista,
				obtenerListas,
				eliminarLista,
			}}
		>
			{props.children}
		</ListaContext.Provider>
	);
};

export default ListaState;
