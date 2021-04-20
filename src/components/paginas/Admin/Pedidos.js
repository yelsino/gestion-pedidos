import { useContext, useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import PedidoContext from "../../../context/pedidos/pedidoContext";
import SubTitulo from "../../atomos/textos/TxtSubTitle";
import ItemPedido from "../../moleculas/ItemPedido";
import NewFiltro from "../../organismos/NewFiltro";

const Pedidos = () => {
	const pedidosContext = useContext(PedidoContext);
	const { pedidos, obtenerPedidos, seleccionarPedido } = pedidosContext;
	useEffect(() => {
		obtenerPedidos();
		setInterval(() => {
			obtenerPedidos();
		}, 10000);
	}, []);

	const [cantidad, setCantidad] = useState({
		nuevos: 1,
		preparados: 0,
		enviados: 0,
		entregados: 0,
		cancelados: 0,
	});

	const { nuevos, preparados, enviados, entregados, cancelados } = cantidad;

	const obtenerPedidosNuevos = () => {
		obtenerPedidos();
		setCantidad({
			...cantidad,
			nuevos: 1,
			preparados: 0,
			enviados: 0,
			entregados: 0,
			cancelados: 0,
		});
	};
	const obtenerPedidosAtendidos = () => {
		obtenerPedidos();
		setCantidad({
			...cantidad,
			nuevos: 0,
			preparados: 1,
			enviados: 0,
			entregados: 0,
			cancelados: 0,
		});
	};
	const obtenerPedidosEnviados = () => {
		obtenerPedidos();
		setCantidad({
			...cantidad,
			nuevos: 0,
			preparados: 0,
			enviados: 1,
			entregados: 0,
			cancelados: 0,
		});
	};
	const obtenerPedidosEntregados = () => {
		obtenerPedidos();
		setCantidad({
			...cantidad,
			nuevos: 0,
			preparados: 0,
			enviados: 0,
			entregados: 1,
			cancelados: 0,
		});
	};

	const obtenerPedidosCancelados = () => {
		obtenerPedidos();
		setCantidad({
			...cantidad,
			nuevos: 0,
			preparados: 0,
			enviados: 0,
			entregados: 0,
			cancelados: 1,
		});
	};

	return (
		<div className="sm:mx-10 md:mx-14 lg:mx-20 xl:mx-28 2xl:mx-40 ">
			<NewFiltro
				texto1={"Nuevos"}
				texto2={"Preparados"}
				texto3={"Enviados"}
				texto4={"Entregados"}
				texto5={"Rechazados"}
				stilo={""}
				filtro1={obtenerPedidosNuevos}
				filtro2={obtenerPedidosAtendidos}
				filtro3={obtenerPedidosEnviados}
				filtro4={obtenerPedidosEntregados}
				filtro5={obtenerPedidosCancelados}
			/>
			<SubTitulo texto={"Nuevos Pedidos"} />
			<div>
				{nuevos > 0 && (
					<div className=" grid grid-cols-1  lg:grid-cols-2 xl:grid-cols-3  gap-5">
						{pedidos.map((e) => {
							if (
								e.preparado === false &&
								e.enviado === false &&
								e.entregado === false &&
								e.rechazado === false
							)
								return (
									<ItemPedido
										seleccionarPedido={seleccionarPedido}
										estilos={""}
										key={e._id}
										pedido={e}
									/>
								);
						})}
					</div>
				)}

				{preparados > 0 && (
					<div className=" grid grid-cols-1  lg:grid-cols-2 xl:grid-cols-3  gap-5">
						<SubTitulo texto={"Pedidos Preparados"} />
						{pedidos.map((e) => {
							if (
								e.preparado === true &&
								e.enviado === false &&
								e.entregado === false &&
								e.rechazado === false
							)
								return (
									<ItemPedido
										seleccionarPedido={seleccionarPedido}
										
										estilos={
											"text-green-500 hover:bg-primario-green hover:text-primario-green-pure"
										}
										key={e._id}
										pedido={e}
									/>
								);
						})}
					</div>
				)}
				{enviados > 0 && (
					<div className=" grid grid-cols-1  lg:grid-cols-2 xl:grid-cols-3  gap-5">
						<SubTitulo texto={"Pedidos Preparados"} />
						{pedidos.map((e) => {
							if (
								e.preparado === true &&
								e.enviado === true &&
								e.entregado === false &&
								e.rechazado === false
							)
								return (
									<ItemPedido
										seleccionarPedido={seleccionarPedido}
										estilos={
											"text-green-500 hover:bg-primario-green hover:text-primario-green-pure"
										}
										key={e._id}
										pedido={e}
									/>
								);
						})}
					</div>
				)}
				{entregados > 0 && (
					<div className=" grid grid-cols-1  lg:grid-cols-2 xl:grid-cols-3  gap-5">
						<SubTitulo texto={"Pedidos Preparados"} />
						{pedidos.map((e) => {
							if (
								e.preparado === true &&
								e.enviado === true &&
								e.entregado === true &&
								e.rechazado === false
							)
								return (
									<ItemPedido
										seleccionarPedido={seleccionarPedido}
										estilos={
											"text-green-500 hover:bg-primario-green hover:text-primario-green-pure"
										}
										key={e._id}
										pedido={e}
									/>
								);
						})}
					</div>
				)}
				{cancelados > 0 && (
					<div className=" grid grid-cols-1  lg:grid-cols-2 xl:grid-cols-3  gap-5">
						<SubTitulo texto={"Pedidos Cancelados"} />
						{pedidos.map((e) => {
							if (e.rechazado === true)
								return (
									<ItemPedido
										seleccionarPedido={seleccionarPedido}
										estilos={
											"text-green-500 hover:bg-primario-green hover:text-primario-green-pure"
										}
										key={e._id}
										pedido={e}
									/>
								);
						})}
					</div>
				)}
			</div>
			<Link
				to={"/admin/nuevo-pedido"}
				className="fixed p-2 rounded-md text-lg font-bold bg-primario-blue text-white bottom-10 right-10 hover:bg-blue-800"
			>
				Nuevo Pedido
			</Link>
		</div>
	);
};

export default Pedidos;
