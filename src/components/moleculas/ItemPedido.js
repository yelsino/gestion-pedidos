import { Link } from "react-router-dom";
import moment from "moment";
import "moment/locale/es";

const ItemPedido = ({ pedido,  estilos, seleccionarPedido }) => {
	const {
		_id,
		createdAt,
		copia_pedido,
		codigo_pedido,
		orden_pedido,
		creador,
		preparado,
		enviado,
		entregado,
		rechazado,
		lista,
	} = pedido;
	const { nombre: nombre_de_lista } = lista;

	return (
		<Link to={`/admin/pedidos/${_id}`} className="" onClick={() => {
			seleccionarPedido(_id)
		}}>
			{" "}
			<div
				className={`bg-white shadow-lg rounded-lg  p-4 py-8  hover:bg-primario-green flex justify-center items-center flex-col relative border border-primario-green ${
					rechazado && "border-primario-red hover:bg-primario-red-transparente"
				}`}
			>
				<span className="text-gray-500 text-sm font-normal absolute top-2 right-4 ">
					{moment(createdAt).format("LLLL")}
				</span>
				<p>
					<span className="mt-2 text-lg text-green-600 my-2  font-semibold">
						{creador.username
							.charAt(0)
							.toUpperCase()
							.concat(
								creador.username
									.substring(1, creador.username.length)
									.toLowerCase()
							)}
					</span>
				</p>
				<p>
					{orden_pedido <= 99 && (
						<span className="text-gray-500 font-semibold">
							{orden_pedido <= 9
								? "N° 00" + orden_pedido
								: "N° 0" + orden_pedido}
						</span>
					)}
				</p>
			</div>
		</Link>
	);
};

export default ItemPedido;
