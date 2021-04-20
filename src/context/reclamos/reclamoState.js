import { useReducer } from "react";
import clienteAxios from "../../config/axios";
import { OBTENER_RECLAMOS, SELECCIONAR_REACLAMO } from "../../types";
import ReclamoContext from "./reclamoContext";
import reclamoReducer from "./reclamoReducer";

const ReclamoState = (props) => {
	const InitialState = {
		reclamos: [],
		reclamo: null,
	};

	// d dispatch para ejecutar las acciones
	const [state, dispatch] = useReducer(reclamoReducer, InitialState);

	// d obtener reclamos
	const obtenerReclamos = async () => {
		try {
			const resultado = await clienteAxios.get("api/reclamos");
			dispatch({
				type: OBTENER_RECLAMOS,
				payload: resultado.data,
			});
		} catch (error) {
			console.log(error.response);
		}
	};

	// d obtener reclamo actual
	const obtenerReclamoActual = async (reclamoId) => {
		try {
			const id = await reclamoId;
			dispatch({
				type: SELECCIONAR_REACLAMO,
				payload: id,
			});
		} catch (error) {
			console.log(error.response);
		}
	};

	const responderReclamo = async (reclamoId, reclamo) => {
		try {
			const resultado = await clienteAxios.put(
				`api/reclamos/${reclamoId}`,
				reclamo
			);
		} catch (error) {
			console.log(error.response);
		}
	};

	return (
		<ReclamoContext.Provider
			value={{
				reclamos: state.reclamos,
				reclamo: state.reclamo,
				obtenerReclamos,
				obtenerReclamoActual,
				responderReclamo,
			}}
		>
			{props.children}
		</ReclamoContext.Provider>
	);
};

export default ReclamoState;
