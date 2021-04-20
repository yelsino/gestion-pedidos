import { useContext } from "react";
import { useHistory } from "react-router";
import ProductoContext from "../../context/productos/productoContext";
import IconDelete from "../atomos/icons/IconDelete";

const RemoveCard = ({ producto, quitarProductos }) => {
	const history = useHistory();
	const productosContext = useContext(ProductoContext);
	const {
		obtenerProductoSeleccionado,
		actualizarProductoSeleccionado,
	} = productosContext;

	let {
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

	const quitarProductosAlista = () => {
		const devolver = cantidad_seleccionada / precio_mayoreo;
		producto.stock = stock + devolver;

		actualizarProductoSeleccionado(_id, producto);
		quitarProductos(_id);
		history.push("recargando...");
		setTimeout(() => {
			history.push("/admin/nuevo-pedido");
		}, 100);
	};

	const kilogramo = parseInt(
		(cantidad_seleccionada / peso_mayoreo -
			parseInt(cantidad_seleccionada / peso_mayoreo)) *
			peso_mayoreo
	);

	const gramos = parseInt(
		((cantidad_seleccionada / peso_mayoreo -
			parseInt(cantidad_seleccionada / peso_mayoreo)) *
			peso_mayoreo -
			parseInt(
				(cantidad_seleccionada / peso_mayoreo -
					parseInt(cantidad_seleccionada / peso_mayoreo)) *
					peso_mayoreo
			)) *
			1000
	);

	return (
		<div className="flex ">
			<div className="flex m-4 relative items-center">
				<div
					className={`w-14  rounded-md h-10 flex items-center justify-center bg-primario-green `}
				>
					<img src={imgURL} alt="" />
				</div>

				<div className="shadow-lg bg-white rounded-md w-40 flex flex-col justify-around items-center">
					<span className="text-sm font-bold"> {nombre} </span>

					<div>
						<span>cant: {cantidad_seleccionada}</span>
					</div>

					<label
						className="text-primario-blue  text-sm"
						htmlFor="cantidad_seleccionada"
					>
						{cantidad_seleccionada > peso_mayoreo && (
							<span>
								{cantidad_seleccionada >= peso_mayoreo &&
									parseInt(cantidad_seleccionada / peso_mayoreo)}{" "}
								sacos -{" "}
							</span>
						)}
						{kilogramo > 0 && (
							<span>
								{parseInt(
									(cantidad_seleccionada / peso_mayoreo -
										parseInt(cantidad_seleccionada / peso_mayoreo)) *
										peso_mayoreo
								)}{" "}
								{medida_minoreo} -{" "}
							</span>
						)}

						{gramos > 0 && <span>{gramos} gr</span>}
					</label>
				</div>
			</div>
			<IconDelete onIcon={quitarProductosAlista} />
		</div>
	);
};

export default RemoveCard;
