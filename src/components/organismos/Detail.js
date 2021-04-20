import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import CardAlertaPedido from "./CardAlertaPedido";
import Modal from "./Modal";

const Detail = ({
	pedido,
	atenderPedidoActual,
	cancelarPedidoActual,
	retomarPedidoActual,
}) => {
	let history = useHistory();
	const [modal, openModal] = useState(false);
	const {
		_id,
		codigo_pedido,
		copia_pedido,
		creador,
		direccion,
		entregado,
		enviado,
		lista,
		orden_pedido,
		preparado,
		rechazado
	
	} = pedido;
	const { datos_lista } = copia_pedido[0];
	const { abono } = copia_pedido[1];
	const { datos_direccion } = copia_pedido[2];
	const { pago_total } = copia_pedido[3];



	const pedidoPreparado = () => {
		const datos = { preparado: true };
		atenderPedidoActual(_id, datos);
		history.push("/admin/pedidos");
	};
	const pedidoEnviado = () => {
		const datos = { enviado: true };
		atenderPedidoActual(_id, datos);
		history.push("/admin/pedidos");
	};
	const pedidoEntregado = () => {
		const datos = { entregado: true };
		atenderPedidoActual(_id, datos);
		history.push("/admin/pedidos");
	};

	const cancelarPedido = () => {
		const datos = {
			rechazado: true,
			preparado: false,
			enviado: false,
			entregado: false,
		};
		cancelarPedidoActual(_id, datos);
		history.push("/admin/pedidos");
	};

	const retomarPedido = () => {
		const datos = {
			preparado: true,
			enviado: false,
			entregado: false,
			rechazado: false,
		};
		retomarPedidoActual(_id, datos);
		history.push("/admin/pedidos");
	};

	return (
		<div className=" w-full ">
			<div className="flex">
				<div className="text-left text-lg grid grid-cols-1 lg:grid-cols-2  w-full ">
					<p>
						Total:{" "}
						<span className="text-primario-blue text-lg font-semibold">
							S/ {pago_total}
						</span>
					</p>
					<p>
						Cliente:{" "}
						<span className="text-primario-blue tracking-widest">
							{creador.username}
						</span>
					</p>
					<p>
						Direccion:
						<span className="text-primario-blue tracking-widest">
							{" "}
							{direccion.nombre}
						</span>
					</p>
					<p>
						Referencia:
						<span className="text-primario-blue tracking-widest">
							{" "}
							{direccion.referencia}
						</span>
					</p>
					<p>
						Movil:
						<span className="text-primario-blue tracking-widest">
							{" "}
							{creador.celular}
						</span>
					</p>
					<p className="flex">
						Estado:{" "}
						<span className="">
							{preparado && !enviado && !entregado && !rechazado && (
								<span className="text-green-600 font-semibold">preparado</span>
							)}
							{preparado && enviado && !entregado && !rechazado && (
								<span className="text-green-600 font-semibold">enviado</span>
							)}
							{preparado && enviado && entregado && !rechazado && (
								<span className="text-primario-blue font-semibold">entregado</span>
							)}
							{!preparado && !enviado && !entregado && rechazado && (
								<span className="text-primario-red font-semibold">cancelado</span>
							)}
						</span>
					</p>
				</div>
			</div>

{/*  */}
{/* botones */}
{/*  */}
			<div className="flex z-20 justify-center mt-5 fixed bottom-5 right-5 flex-col text-center ">
				{!preparado && !enviado && !entregado && !rechazado && (
					<button
						onClick={pedidoPreparado}
						className=" bg-blue-50 border border-primario-blue px-5 py-4 rounded-md text-primario-blue hover:bg-primario-blue hover:text-white font-bold"
					>
						Pedido Atendido?
					</button>
				)}
				{preparado && !enviado && !entregado && !rechazado && (
					<button
						onClick={pedidoEnviado}
						className="bg-white border border-primario-blue px-5 py-4 rounded-md text-primario-blue hover:bg-primario-blue hover:text-white font-bold"
					>
						Pedido Enviado?
					</button>
				)}

				{preparado && enviado && !entregado && !rechazado && (
					<button
						onClick={pedidoEntregado}
						className="bg-white border border-primario-blue px-5 py-4 rounded-md text-primario-blue hover:bg-primario-blue hover:text-white font-bold"
					>
						Pedido Entregado?
					</button>
				)}
				{preparado && enviado && entregado && !rechazado && (
					<button className="bg-primario-blue border border-primario-blue px-5 py-4 rounded-md text-white  font-bold">
						Pedido Entregado
					</button>
				)}
				{!preparado && !enviado && !entregado && rechazado && (
					<button className="bg-primario-red border  px-5 py-4 rounded-md text-white  hover:text-white font-bold">
						Cancelado
					</button>
				)}

				{!rechazado && (
					<p
						// onClick={cancelarPedido}
						onClick={() => {
							openModal(!modal);
						}}
						className="flex justify-center   text-primario-red cursor-pointer bg-white p-4"
					>
						{" "}
						cancelar pedido
					</p>
				)}

				{rechazado && (
					<p
						onClick={retomarPedido}
						className="flex justify-center mt-4 text-primario-blue cursor-pointer"
					>
						{" "}
						retomar pedido
					</p>
				)}
			</div>

			{modal && (
				<Modal style={"bg-gray-700 opacity-75"}>
					<CardAlertaPedido
						botonCancelar={openModal}
						modal={modal}
						botonAccion={cancelarPedido}
						atributos={{
							titulo: "Cancelar Pedido",
							elemento: "pedido",
							name_boton_accion: "Cancelar",
						}}
					/>
				</Modal>
			)}
		</div>
	);
};

export default Detail;
