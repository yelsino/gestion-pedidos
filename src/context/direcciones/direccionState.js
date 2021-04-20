import { useReducer } from "react";
import clienteAxios from "../../config/axios";
import {
	OBTENER_DIRECCIONES,
	SELECCIONAR_DIRECCION,
	CREAR_NUEVA_DIRECCION,
	REMOVER_DIRECCION_SELECCIONADA,
} from "../../types";

import direccionReducer from "./direccionReducer.js";
import DireccionContext from "./direccionContext";

const DireccionState = (props) => {
	const InitialState = {
		direcciones: [],
		direccion_seleccionada: null,
	};

	const [state, dispatch] = useReducer(direccionReducer, InitialState);

	// d crear nueva direccion
	const crearNuevaDireccion = async (data) => {
		try {
			const resultado = await clienteAxios.post("api/direcciones", data);
			dispatch({
				type: CREAR_NUEVA_DIRECCION,
				payload: resultado.data,
			});
		} catch (error) {
			console.log(error.response);
		}
	};

	// d obtener listas
	const obtenerDirecciones = async () => {
		try {
			const resultado = await clienteAxios.get("api/direcciones");
			console.log(resultado);
			dispatch({
				type: OBTENER_DIRECCIONES,
				payload: resultado.data.direcciones,
			});
		} catch (error) {
			console.log(error.response);
		}
	};

	const seleccionarDireccion = (direccionId) => {
		dispatch({
			type: SELECCIONAR_DIRECCION,
			payload: direccionId,
		});
	};

	const removerDireccionSeleccionada = () => {
		dispatch({
			type: REMOVER_DIRECCION_SELECCIONADA,
			payload: null,
		});
	};

	return (
		<DireccionContext.Provider
			value={{
				direcciones: state.direcciones,
				direccion_seleccionada: state.direccion_seleccionada,
				crearNuevaDireccion,
				obtenerDirecciones,
				seleccionarDireccion,
				removerDireccionSeleccionada,
			}}
		>
			{props.children}
		</DireccionContext.Provider>
	);
};

export default DireccionState;
