import { useState } from "react";
import { useHistory } from "react-router";

const ItemProducto = ({
	producto,
	atenderPedidoActual,
	productos,
	pedidoId,
	cantidad_producto,
}) => {
	const history = useHistory();
	const {
		_id,
		nombre,
		peso_minoreo,
		precio_minoreo,
		medida_minoreo,
		categoria,
		peso_mayoreo,
		medidada_mayoreo,
		precio_mayoreo,
		stock,
		imgURL,
		cantidad_minima,
		cantidad_seleccionada,
	} = producto;
	const [preciostate, setPrecio] = useState(precio_minoreo);

	const actualizarProducto = () => {
		const producto = {
			_id,
			nombre,
			peso_minoreo,
			precio_minoreo,
			medida_minoreo,
			categoria,
			peso_mayoreo,
			medidada_mayoreo,
			precio_mayoreo,
			stock,
			imgURL,
			cantidad_minima,
			cantidad_seleccionada,
		};
		const filtrar = productos.filter((e) => e._id !== _id);
		filtrar.push(producto);

		atenderPedidoActual(pedidoId, { copia_pedido: filtrar });
	};

	return (
		<tr className="flex justify-evenly items-center border-b border-gray-300 mb-2 pb-2 relative ">
			<td>x {cantidad_producto.find((e) => e.id === _id).cantidad_producto}</td>
			<td className=" w-20">
				<img alt="" className="w-16" src={imgURL} />
			</td>
			<td className=" w-36">
				<span className=" "> {producto.nombre} </span>
			</td>
			<td className="flex  ">
				s/{" "}
				<input
					type="text"
					value={preciostate}
					name="precio"
					className="w-12 text-center outline-none"
					onChange={(e) => {
						setPrecio(e.target.value);
					}}
				/>
			</td>

			<td className="flex">
				<span className="text-blue-500 font-semibold mx-4 w-16">
					{peso_minoreo} {medida_minoreo}
				</span>
			</td>
			<td>
				<span>
					{(cantidad_producto.find((e) => e.id === _id).cantidad_producto *
						precio_minoreo).toFixed(2)
						
						}{" "}
					s/
				</span>
			</td>
		
			{cantidad_seleccionada > 1 && (
				<td className="absolute top-0 left-0 text-primario-blue text-lg transform -rotate-45 -mb-8">
					<span className="">x {cantidad_seleccionada}</span>
				</td>
			)}
		</tr>
	);
};

export default ItemProducto;
