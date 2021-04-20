import { useContext, useEffect, useState } from "react";
import ReclamoContext from "../../context/reclamos/reclamoContext";
import SubTitulo from "../atomos/textos/TxtSubTitle";
import "../../style/reclamo.css";
import PedidoContext from "../../context/pedidos/pedidoContext";
import ItemPedido from "../moleculas/ItemPedido";
import ItemReclamo from "../moleculas/ItemReclamo";
import NewFiltro from "./NewFiltro";

const Usuario = () => {
	const pedidosContext = useContext(PedidoContext);
	const { pedidos, obtenerPedidos, seleccionarPedido } = pedidosContext;

	const reclamosContext = useContext(ReclamoContext);
	const { reclamos, obtenerReclamos, obtenerReclamoActual } = reclamosContext;

	const json_usuario_actual =
		localStorage.getItem("usuario_seleccionado") || "[]";
	const usuarioActual = JSON.parse(json_usuario_actual);

	const reclamosUser = reclamos.filter(
		(e) => e.creador._id === usuarioActual[0]._id
	);
	const pedidosUser = pedidos.filter(
		(e) => e.lista.creador._id === usuarioActual[0]._id
	);

	const [cantidad, setCantidad] = useState({
		nuevos: 1,
		atendidos: 1,
	});

	const { nuevos, atendidos } = cantidad;

	const obtenerPedidosTodos = () => {
		obtenerPedidos();
		obtenerReclamos();
		setCantidad({
			...cantidad,
			nuevos: 1,
			atendidos: 1,
		});
	};
	const obtenerPedidosNuevos = () => {
		obtenerPedidos();
		obtenerReclamos();
		setCantidad({
			...cantidad,
			nuevos: 1,
			atendidos: 0,
		});
	};
	const obtenerPedidosAtendidos = () => {
		obtenerPedidos();
		obtenerReclamos();
		setCantidad({
			...cantidad,
			nuevos: 0,
			atendidos: 1,
		});
	};

	useEffect(() => {
		obtenerPedidos();
		obtenerReclamos();
	}, []);

	return (
		<div className="sm:mx-5 md:mx-10 lg:mx-32 xl:mx-40 2xl:mx-96 ">
			<NewFiltro
				texto1={"Todos"}
				texto2={"Pedidos"}
				texto3={"Reclamos"}
				texto4={""}
				texto5={""}
				filtro1={obtenerPedidosTodos}
				filtro2={obtenerPedidosNuevos}
				filtro3={obtenerPedidosAtendidos}
				filtro4={() => {}}
				filtro5={() => {}}
				stilo={""}
			/>
			{nuevos > 0 && (
				<div className="grid grid-cols-1  lg:grid-cols-2 xl:grid-cols-3  gap-5">
					<SubTitulo texto={"Pedidos"} />
					{pedidosUser.map((e) => {
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

			{atendidos > 0 && (
				<div className="grid grid-cols-1  lg:grid-cols-2 xl:grid-cols-3  gap-5">
					<SubTitulo texto={"Reclamos"} />
					{reclamosUser.map((e) => {
						return (
							<ItemReclamo
								reclamoActual={obtenerReclamoActual}
								key={e._id}
								estilos={
									"hover:bg-primario-grpeen hover:text-primario-green-pure"
								}
								texto1={e.asunto}
								texto2={e.creador.username}
								id={e._id}
								fecha={e.createdAt}
							/>
						);
					})}
				</div>
			)}
		</div>
	);
};

export default Usuario;
