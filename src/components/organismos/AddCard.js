import { useContext, useState } from "react";
import ProductoContext from "../../context/productos/productoContext";

const AddCard = ({ producto, agregarProductos }) => {
	const productosContext = useContext(ProductoContext);
	const { actualizarProductoSeleccionado } = productosContext;

	const [producto_state, setProducto] = useState({
		_id: producto._id,
		nombre: producto.nombre,
		peso_minoreo: producto.peso_minoreo,
		precio_minoreo: producto.precio_minoreo,
		medida_minoreo: producto.medida_minoreo,
		categoria: producto.categoria,
		peso_mayoreo: producto.peso_mayoreo,
		medidada_mayoreo: producto.medidada_mayoreo,
		precio_mayoreo: producto.precio_mayoreo,
		stock: producto.stock,
		imgURL: producto.imgURL,
		cantidad_minima: producto.cantidad_minima,
		cantidad_seleccionada: 0,
		precio_total: 0,
	});

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
		precio_total,
	} = producto_state;

	const [activar, setActivar] = useState(false);

	const onChange = (e) => {
		e.persist();
		if (medida_minoreo !== "unidad") {
			setProducto({
				...producto_state,
				[e.target.name]: parseFloat(e.target.value),
			});
		} else {
			setProducto({
				...producto_state,
				[e.target.name]: parseInt(e.target.value),
			});
		}
	};

	const agregarProductosAlista = () => {
		if (cantidad_seleccionada <= 0) {
			return;
		}

		const total_stock =
			medida_minoreo === "kilo"
				? parseFloat(peso_mayoreo) * parseFloat(stock) * 1000
				: parseFloat(peso_mayoreo) * parseFloat(stock);

		const cantidad =
			medida_minoreo === "kilo"
				? parseFloat(peso_mayoreo) *
				  parseFloat(cantidad_seleccionada / peso_mayoreo) *
				  1000
				: parseFloat(cantidad_seleccionada / peso_mayoreo) *
				  parseFloat(cantidad_seleccionada / peso_mayoreo);

		if (cantidad > total_stock) {
			return;
		}

		setActivar(!activar);

		producto_state.stock = stock - cantidad_seleccionada / peso_mayoreo;
		agregarProductos(producto_state);

		actualizarProductoSeleccionado(_id, producto_state);
	};

	return (
		<div className={`mb-6 mx-2 `}>
			<div className="">
				<div className="flex mt-1 mb-4 mx-2 relative">
					<div
						className={`rounded-md w-20 h-12 bg-primario-green ${
							activar ? "w-36 h-24  " : ""
						} flex items-center justify-center `}
					>
						<img src={imgURL} alt="" className="" />
					</div>

					<div className="shadow-lg bg-white rounded-md w-32 flex flex-col justify-around items-center">
						<span className={`text-sm font-bold ${activar ? "" : "text-lg"}`}>
							{" "}
							{nombre}{" "}
						</span>
						{activar && (
							<div className="flex  w-full justify-around ">
								<span className="text-xs text-gray-600">
									{peso_minoreo} {medida_minoreo}
								</span>
								<span className="text-primario-blue text-base font-semibold">
									S/ {precio_minoreo}
								</span>
							</div>
						)}
						{activar && (
							<div className="flex  w-full justify-around ">
								<span className="text-xs text-gray-600">
									{peso_mayoreo} {medida_minoreo}
								</span>
								<span className="text-primario-blue text-base font-semibold">
									S/ {precio_mayoreo}
								</span>
							</div>
						)}
						{activar && (
							<div className="flex  w-full justify-around ">
								<span className="text-xs text-gray-600">stock</span>
								<span className="text-red-500 text-base font-semibold">
									{stock % 1 === 0
										? parseInt(stock)
										: parseFloat(stock).toFixed(1)}
									{" " + medidada_mayoreo}
								</span>
							</div>
						)}
					</div>

					<label
						htmlFor="cantidad_seleccionada"
						onClick={(e) => {
							e.stopPropagation();
							e.preventDefault();
							setActivar(!activar);
						}}
						className="w-full h-full absolute z-0 flex items-center  outline-none "
					>
						{activar && (
							<div className="relative ">
								<span
									className="bg-primario-blue border-2 p-4   ml-8 outline-none rounded-md px-6 text-white font-semibold hover:bg-blue-700"
									onClick={agregarProductosAlista}
								>
									ADD
								</span>
							</div>
						)}
					</label>
				</div>
				{activar && (
					<div className="my-4 border-b relative flex">
						<div className="relative ">
							<input
								id="cantidad_seleccionada"
								type="number"
								value={cantidad_seleccionada}
								name="cantidad_seleccionada"
								className=" focus:outline-none py-2 text-center"
								onChange={onChange}
							/>
						</div>
					</div>
				)}
			</div>
			{activar && medida_minoreo === "kilo" && (
				<label
					className="text-primario-blue font-medium w-full"
					htmlFor="cantidad_seleccionada"
				>
					{cantidad_seleccionada >= peso_mayoreo &&
						parseInt(cantidad_seleccionada / peso_mayoreo)}{" "}
					sacos -{" "}
					{parseInt(
						(cantidad_seleccionada / peso_mayoreo -
							parseInt(cantidad_seleccionada / peso_mayoreo)) *
							peso_mayoreo
					)}{" "}
					kilos -{" "}
					{parseInt(
						((cantidad_seleccionada / peso_mayoreo -
							parseInt(cantidad_seleccionada / peso_mayoreo)) *
							peso_mayoreo -
							parseInt(
								(cantidad_seleccionada / peso_mayoreo -
									parseInt(cantidad_seleccionada / peso_mayoreo)) *
									peso_mayoreo
							)) *
							1000
					)}{" "}
					gramos
				</label>
			)}

			{activar && medida_minoreo !== "kilo" && (
				<label
					className="text-primario-blue font-medium w-full"
					htmlFor="cantidad_seleccionada"
				>
					{cantidad_seleccionada >= peso_mayoreo &&
						parseInt(cantidad_seleccionada / peso_mayoreo)}{" "}
					sacos -{" "}
					{parseInt(
						(cantidad_seleccionada / peso_mayoreo -
							parseInt(cantidad_seleccionada / peso_mayoreo)) *
							peso_mayoreo
					)}{" "}
					unidades
				</label>
			)}
		</div>
	);
};

export default AddCard;
