import React, { useContext, useState } from "react";
import Notification from "../moleculas/Notification";
import ViewCard from "./ViewCard";
import SelectMedida from "../moleculas/SelectMedida";
import SelectCategoria from "../moleculas/selectCategoria";
import SelectMedida3 from "../moleculas/selectMedida3";
import AlertaContext from "../../context/alertas/alertaContext";

const EditarProducto = ({
	productoseleccionado,
	onBtnClose,
	btneditar,
	actualizarProductoSeleccionado,
	setDesactivar,
}) => {
	const alertaContext = useContext(AlertaContext);
	const { alerta, mostrarAlerta } = alertaContext;

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
	} = productoseleccionado[0];

	const [producto, setProducto] = useState({
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
	});

	const handleChange = (e) => {
		// if (producto.cantidad_minima > stock) {
		// 	setAlerta(!alerta);
		// }
		e.preventDefault();
		e.stopPropagation();
		const { name, value } = e.target;
		setProducto({
			...producto,
			[name]: value,
		});
	};

	const actualizarProducto = (e) => {
		e.preventDefault();
		if (producto.cantidad_minima > producto.stock) {
			mostrarAlerta(
				"la cantidad minima para alertar, debe ser menor al del stock",
				"alerta-error"
			);
			return;
		}

		console.log(producto);
		e.preventDefault();
		actualizarProductoSeleccionado(_id, producto);
		onBtnClose(!btneditar);
		setDesactivar(false);
	};

	return (
		<div className="flex">
			<div className="p-8 bg-white">
				<div className="flex justify-between">
					<h2 className="font-semibold">Editar Producto</h2>
					<div onClick={() => onBtnClose(!btneditar)}>
						<Notification texto={"X"} />
					</div>
				</div>

				<div className="flex">
					<div className="flex flex-col justify-center mr-6">
						<div className="mt-4">
							<SelectCategoria actualizarDatos={setProducto} datos={producto} />
						</div>

						<div className="my-4 border-b">
							<input
								type="text"
								placeholder="nombre de producto"
								name="nombre"
								value={producto.nombre}
								onChange={handleChange}
								className="focus:outline-none py-2"
								maxLength={12}
							/>
						</div>

						<SelectMedida actualizarDatos={setProducto} datos={producto} />

						<div className="my-4 border-b relative">
							<input
								type="number"
								placeholder="precio de producto"
								name="precio_minoreo"
								value={producto.precio_minoreo}
								onChange={handleChange}
								className=" focus:outline-none py-2"
							/>
							<span className="text-primario-blue font-medium absolute top-3 right-4">
								S/
							</span>
						</div>

						<div className="my-4 border-b relative">
							<input
								type="number"
								placeholder="peso de producto"
								className=" focus:outline-none py-2"
								name="peso_minoreo"
								value={producto.peso_minoreo}
								onChange={handleChange}
							/>
							<span className="text-primario-blue font-medium absolute top-3 right-4">
								{producto.medida_minoreo}
							</span>
						</div>

						<div className=" ">
							<input
								className="hidden "
								type="file"
								placeholder="imagen de producto"
								id="file"
								accept="image/*"
								name="imagen"
								onChange={() => {}}
							/>
							<label
								className="cursor-pointer  text-blue-800 bg-blue-200 text-center rounded-md px-20 py-2"
								htmlFor="file"
							>
								Imagen
							</label>
						</div>
					</div>

					<div className="mr-6 ">
						<ViewCard producto={producto} imagen={imgURL} />

						<div className="flex justify-center flex-col items-center">
							<button
								type="submit"
								className="bg-blue-200 m-4 px-20 rounded-md py-1 mt-8 text-blue-800"
								onClick={actualizarProducto}
							>
								actualizar
							</button>
						</div>
					</div>
				</div>
			</div>

			{/*  */}

			<div className="w-72  text-center bg-white	 p-8 ml-10 rounded-lg relative">
				<h2 className="font-semibold mb-4">Datos Mayoreo</h2>
				<SelectMedida3 datos={producto} actualizarDatos={setProducto} />
				<div className="relative my-8">
					<input
						onChange={handleChange}
						className=" border   rounded-lg   outline-none   text-lg input_text py-2 px-4 text-center"
						id="precio_mayoreo"
						name="precio_mayoreo"
						value={producto.precio_mayoreo}
						type="text"
						placeholder="precio"
					/>
					<label
						className="absolute left-4 top-2  font-semibold text-lg cursor-text label_texto hidden "
						htmlFor="precio_mayore"
					>
						precio por {producto.medidada_mayoreo}
					</label>
					<span className="text-primario-blue font-medium absolute top-3 right-4">
						S/
					</span>
				</div>

				<div className="relative my-8">
					<input
						onChange={handleChange}
						className=" border   rounded-lg   outline-none   text-lg input_text py-2 text-center px-4"
						id="peso_mayoreo"
						name="peso_mayoreo"
						value={producto.peso_mayoreo}
						type="text"
						placeholder="peso"
					/>

					<label
						className="absolute left-4 top-2  font-semibold text-lg cursor-text label_texto hidden "
						htmlFor="peso_mayoreo"
					>
						{producto.medida_minoreo} por {producto.medidada_mayoreo}
					</label>
					<span className="text-primario-blue font-medium absolute top-3 right-4">
						{producto.medida_minoreo}
					</span>
				</div>
				<div className="relative my-8">
					<input
						onChange={handleChange}
						className=" border   rounded-lg   outline-none   text-lg input_text py-2  text-left pl-8  "
						id="stock"
						name="stock"
						value={producto.stock}
						type="number"
						placeholder="stock"
					/>

					<label
						className="absolute left-4 top-2  font-semibold text-lg cursor-text label_texto hidden "
						htmlFor="stock"
					>
						stock en{" "}
						{producto.medidada_mayoreo === "cajon"
							? producto.medidada_mayoreo + "es"
							: producto.medidada_mayoreo + "s"}
					</label>
					<span
						className={`font-medium absolute top-3 right-4 
							alerta text-primario-blue text-sm
						`}
					>
						{producto.medidada_mayoreo} ={" "}
						{producto.stock * producto.peso_mayoreo}{" "}
						{producto.medida_minoreo === "kilo" ? "kg" : "und"}
					</span>
				</div>
				<div className="relative my-8">
					<input
						onChange={handleChange}
						className=" border   rounded-lg   outline-none   text-lg input_text py-2 pl-8  text-left text-primario-red "
						id="cantidad_minima"
						name="cantidad_minima"
						value={producto.cantidad_minima}
						type="number"
						placeholder="minimo"
					/>

					<label
						className="absolute left-4 top-2  font-semibold text-lg cursor-text label_texto hidden "
						htmlFor="cantidad_minima"
					>
						alertarme en {producto.cantidad_minima} {producto.medidada_mayoreo}
					</label>
					<span
						className={`font-medium absolute top-3 right-4 
							alerta text-primario-blue text-sm`}
					>
						{producto.medidada_mayoreo}{" "}
						{producto.cantidad_minima * producto.peso_mayoreo}{" "}
						{producto.medida_minoreo === "kilo" ? " kg" : " und"}
					</span>
				</div>
				{alerta ? <p className="text-red-500 mt-3 mb-1">{alerta.msg}</p> : null}
			</div>
		</div>
	);
};

export default EditarProducto;
