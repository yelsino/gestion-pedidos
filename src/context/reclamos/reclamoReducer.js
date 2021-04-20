import { OBTENER_RECLAMOS, SELECCIONAR_REACLAMO } from "../../types";

export default (state, action) => {
	switch (action.type) {
		case OBTENER_RECLAMOS:
			return {
				...state,
				reclamos: action.payload,
			};
		case SELECCIONAR_REACLAMO:
			const reclamo_seleccionado = state.reclamos.filter(
				(reclamo) => reclamo._id === action.payload
			);
			localStorage.setItem(
				"reclamo_seleccionado",
				JSON.stringify(reclamo_seleccionado)
			);
			return {
				...state,
				reclamo: reclamo_seleccionado,
			};

		default:
			return state;
	}
};
