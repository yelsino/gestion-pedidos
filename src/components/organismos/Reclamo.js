import { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router";
import ReclamoContext from "../../context/reclamos/reclamoContext";
import SubTitulo from "../atomos/textos/TxtSubTitle";
import "../../style/reclamo.css";
import IconSend from "../atomos/icons/IconSend";
import { Link } from "react-router-dom";
import PedidoContext from "../../context/pedidos/pedidoContext";

const Reclamo = () => {
	const history = useHistory();
	const reclamosContext = useContext(ReclamoContext);
	const { obtenerReclamos, responderReclamo } = reclamosContext;

	const pedidosContext = useContext(PedidoContext);
	const { seleccionarPedido } = pedidosContext;

	const json_reclamo_actual =
		localStorage.getItem("reclamo_seleccionado") || "{}";
	const reclamo = JSON.parse(json_reclamo_actual);

	const { _id, creador, asunto, detalle, pedido, respuesta } = reclamo[0];

	const { username: nombre_usuario, celular } = creador;

	const { _id: pedidoId, lista, monto, direccion } = pedido;
	const { nombre: nombre_direccion } = direccion;

	useEffect(() => {
		if (!reclamo) {
			history.goBack();
		}
	}, [history, reclamo]);

	const [texto_respuesta, actualizarTextoRespuesta] = useState("");
	const [rows, actualizarRows] = useState(1);
	const [text_area, openTextArea] = useState(false);

	const onChange = (e) => {
		actualizarTextoRespuesta(e.target.value);
		if (texto_respuesta.length > 43) {
			actualizarRows(2);
		} else {
			actualizarRows(1);
		}
		if (texto_respuesta.length > 70) {
			actualizarRows(3);
		}
	};
	const onKeyUp = (e) => {
		if (e.keyCode === 27) {
			openTextArea(false);
		}
	};

	const enviarRespuesta = () => {
		const respuesta = {
			respuesta: texto_respuesta,
		};
		responderReclamo(_id, respuesta);
		obtenerReclamos();
		history.push(`/admin/reclamos`);
	};

	useEffect(() => {
		obtenerReclamos();
		seleccionarPedido(pedidoId);
	}, []);
	return (
		<div className="mx-auto w-10/12">
			<SubTitulo texto={nombre_usuario} />
			<div className="p-6 px-10 bg-primario-gray border-2 border-primario-blue shadow-lg rounded-md w-10/12">
				<div>
					<div className="">
						<h3 className="font-medium text-lg">asunto</h3>
						<span className="text-gray-600">{asunto}</span>
					</div>
					<div className="">
						<h3 className="font-medium text-lg">detalle</h3>
						<span className="text-gray-600">{detalle}</span>
					</div>
					{respuesta && (
						<div className="">
							<h3 className="font-medium text-lg">respuesta</h3>
							<span className="text-gray-600">{respuesta}</span>
						</div>
					)}

					{text_area && (
						<textarea
							id="w3review"
							name="w3review"
							rows={rows}
							// cols={65}
							className="border-2 rounded-md p-4 border-primario-blue outline-none boxsizingBorder w-full mt-4"
							onChange={onChange}
							onKeyUp={onKeyUp}
						></textarea>
					)}
				</div>
				{!respuesta && !text_area && (
					<p
						onClick={() => {
							openTextArea(true);
						}}
						className="text-primario-blue font-semibold text-right cursor-pointer"
					>
						responder
					</p>
				)}

				{text_area && (
					<p
						onClick={() => {
							openTextArea(true);
						}}
						className="text-primario-blue font-semibold text-right cursor-pointer flex justify-end"
					>
						<IconSend style={''} enviar={enviarRespuesta} />
					</p>
				)}
			</div>

			<div className="p-6 px-10 bg-primario-gray border-2 border-primario-blue shadow-lg rounded-md w-10/12 mt-10">
				<div>
					<div className="flex  items-center">
						<h3 className="font-medium text-lg w-24">lista</h3>
						<span className="text-gray-600">{lista.nombre}</span>
					</div>
					<div className="flex  items-center">
						<h3 className="font-medium text-lg w-24">direcion</h3>
						<span className="text-gray-600">{nombre_direccion}</span>
					</div>
					<div className=" flex  items-center">
						<h3 className="font-medium text-lg w-24">monto</h3>
						<span>{monto}</span>
					</div>
					<div className=" flex">
						<h3 className="font-medium text-lg w-24 ">envio</h3>
						<span>gratis</span>
					</div>
					<div className="flex">
						<h3 className="font-medium text-lg  w-24 ">celular</h3>
						<span>{celular}</span>
					</div>
				</div>
				<Link
					onClick={() => {
						seleccionarPedido(pedidoId);
					}}
					to={`/admin/pedidos/${pedidoId}`}
					className="text-primario-blue font-semibold text-right cursor-pointer flex justify-end"
				>
					ver lista
				</Link>
			</div>
		</div>
	);
};

export default Reclamo;
