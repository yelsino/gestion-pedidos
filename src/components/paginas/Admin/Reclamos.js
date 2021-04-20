import { useContext, useEffect, useState } from "react";
import ReclamoContext from "../../../context/reclamos/reclamoContext";
import SubTitulo from "../../atomos/textos/TxtSubTitle";
import ItemReclamo from "../../moleculas/ItemReclamo";
import NewFiltro from "../../organismos/NewFiltro";

const Reclamos = () => {
	const reclamosContext = useContext(ReclamoContext);
	const { reclamos, obtenerReclamos, obtenerReclamoActual } = reclamosContext;

	useEffect(() => {
		obtenerReclamos();
	}, []);

	const [cantidad, setCantidad] = useState({
		nuevos: 1,
		atendidos: 1,
	});

	const { nuevos, atendidos } = cantidad;

	const obtenerPedidosTodos = () => {
		obtenerReclamos();
		setCantidad({
			...cantidad,
			nuevos: 1,
			atendidos: 1,
		});
	};
	const obtenerPedidosNuevos = () => {
		obtenerReclamos();
		setCantidad({
			...cantidad,
			nuevos: 1,
			atendidos: 0,
		});
	};
	const obtenerPedidosAtendidos = () => {
		obtenerReclamos();
		setCantidad({
			...cantidad,
			nuevos: 0,
			atendidos: 1,
		});
	};

	return (
		<div className="sm:mx-10 md:mx-20 lg:mx-32 xl:mx-40 2xl:mx-96 ">
			<NewFiltro
				stilo={""}
				texto1={"Todos"}
				texto2={"Nuevos"}
				texto3={"Atendidos"}
				texto4={""}
				texto5={""}
				filtro1={obtenerPedidosTodos}
				filtro2={obtenerPedidosNuevos}
				filtro3={obtenerPedidosAtendidos}
				filtro4={() => {}}
				filtro5={() => {}}
			/>
			<div>
				{nuevos > 0 && (
					<div className="my-4   ">
						<SubTitulo texto={"Nuevos Reclamos"} />
						{reclamos.map((e) => {
							return (
								!e.respuesta && (
									<ItemReclamo
										reclamoActual={obtenerReclamoActual}
										key={e._id}
										estilos={
											"text-primario-red hover:bg-primario-red-transparente"
										}
										texto1={e.asunto}
										texto2={e.creador.username}
										id={e._id}
										fecha={e.createdAt}
									/>
								)
							);
						})}
					</div>
				)}

				{atendidos > 0 && (
					<div className="my-4 text-primario-blue  ">
						<SubTitulo texto={"Reclamos Atendidos"} />
						{reclamos.map((e) => {
							return (
								e.respuesta && (
									<ItemReclamo
										reclamoActual={obtenerReclamoActual}
										key={e._id}
										estilos={"hover:bg-blue-100 text-primario-blue"}
										texto1={e.asunto}
										texto2={e.creador.username}
										id={e._id}
										fecha={e.createdAt}
									/>
								)
							);
						})}
					</div>
				)}
			</div>
		</div>
	);
};

export default Reclamos;
