import { useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import PedidoContext from "../../context/pedidos/pedidoContext";
import SubTitulo from "../atomos/textos/TxtSubTitle";
import ItemProducto from "../moleculas/ItemProducto";
import Detail from "./Detail";

const Pedido = () => {
	const pedidosContext = useContext(PedidoContext);
	const {
		atenderPedidoActual,
		cancelarPedidoActual,
		obtenerPedidos,
		retomarPedidoActual,
	} = pedidosContext;

	useEffect(() => {
	
	}, []);
	const history = useHistory();

	const json_pedido_actual = localStorage.getItem("pedido_actual") || "[]";
	const pedido = JSON.parse(json_pedido_actual);

	const { _id, lista, copia_pedido} = pedido;
	const { productos, cantidad_producto } = copia_pedido[0].datos_lista;
	const { nombre: namelist } = lista;
	const actualizarLista = () => {
		history.push("/admin/pedidos");
		setTimeout(() => {
			history.push(`/admin/pedidos/${_id}`);
		}, 60000);
	};

	useEffect(() => {
		if (!pedido) {
			history.goBack();
		}
	}, [history, pedido]);
	return (
		<div className="  flex  flex-col items-center mr-4">
			<div className="text-center w-full mb-5 ">
				<SubTitulo texto={namelist} />
				<Detail
					pedido={pedido}
					atenderPedidoActual={atenderPedidoActual}
					cancelarPedidoActual={cancelarPedidoActual}
					retomarPedidoActual={retomarPedidoActual}
				/>
			</div>
			<SubTitulo texto={"productos"} />
			<div className="flex  w-full mb-32 ">
				<div className=" w-full ">
					<table className="w-full  mx-5 ">
						<tbody>
							{productos.map((producto) => (
								<ItemProducto
									key={producto._id}
									pedidoId={_id}
									producto={producto}
									atenderPedidoActual={atenderPedidoActual}
									cantidad_producto={cantidad_producto}
									productos={productos}
								/>
							))}
						</tbody>
					</table>
				</div>
			</div>
		</div>
	);
};

export default Pedido;
