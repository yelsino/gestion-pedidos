import React, { useContext, useState } from "react";
import Notification from "../moleculas/Notification";
import ViewCard from "./ViewCard";
import SelectMedida from "../moleculas/SelectMedida";
import SelectCategoria2 from "../moleculas/selectCategoria2";
import SelectMedida3 from "../moleculas/selectMedida3";
import "../../../src/style/input.css";
import AlertaContext from "../../context/alertas/alertaContext";

const NewProduct = ({ closeBtn, crearNuevoProducto }) => {
	const [producto, setProducto] = useState({
		nombre: "",
		peso_minoreo: 0,
		precio_minoreo: 0,
		medida_minoreo: "",
		categoria: "",
		peso_mayoreo: 0,
		precio_mayoreo: 0,
		medidada_mayoreo: "",
		stock: 0,
		imgURL: "",
		cantidad_minima: 0,
	});

	const {
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
	} = producto;

	const alertaContext = useContext(AlertaContext);
	const { alerta, mostrarAlerta } = alertaContext;

	const handleChange = (e) => {
		e.preventDefault();
		const { name, value } = e.target;
		if (name === "imagen") {
			console.log(e.target.files[0]);
			setProducto({
				...producto,
				imgURL: e.target.files[0],
			});
		} else {
			setProducto({
				...producto,
				[name]: value,
			});
		}
	};
	let formData = new FormData();

	formData.set("nombre", nombre);
	formData.append("precio_minoreo", JSON.stringify(precio_minoreo));
	formData.append("medida_minoreo", medida_minoreo);
	formData.append("peso_minoreo", JSON.stringify(peso_minoreo));
	formData.append("categoria", categoria);
	formData.append("peso_mayoreo", JSON.stringify(peso_mayoreo));
	formData.append("medidada_mayoreo", medidada_mayoreo);
	formData.append("precio_mayoreo", JSON.stringify(precio_mayoreo));
	formData.append("stock", JSON.stringify(stock));
	formData.append("imgURL", imgURL);
	formData.append("cantidad_minima", JSON.stringify(cantidad_minima));

	const onSubmitForm = (e) => {
		e.preventDefault();

		if (
			nombre.trim() === "" ||
			!peso_minoreo ||
			!precio_minoreo ||
			categoria.trim() === "" ||
			!peso_mayoreo ||
			medidada_mayoreo.trim() === "" ||
			!precio_mayoreo ||
			!stock ||
			!imgURL ||
			!cantidad_minima
		) {
			mostrarAlerta("todos los campos son obligatorios", "alerta-error");
			return;
		}

		if (cantidad_minima > stock) {
			mostrarAlerta(
				"la cantidad minima para alertar, debe ser menor al del stock",
				"alerta-error"
			);
			return;
		}

		crearNuevoProducto(formData);
		closeBtn(false);
		// console.log(producto);
	};

	return (
		<div className="flex">
			<div className=" bg-white p-8 rounded-lg">
				<div className="flex justify-between">
					<h2 className="font-semibold">Crear Producto</h2>
				</div>

				<div className="flex">
					<div className="flex flex-col justify-center mr-6">
						<div className="mt-6">
							<SelectCategoria2
								datos={producto}
								actualizarDatos={setProducto}
							/>
						</div>

						<div className="my-6 border-b">
							<input
								type="text"
								placeholder="nombre de producto"
								name="nombre"
								value={nombre}
								className="focus:outline-none py-2"
								onChange={handleChange}
							/>
						</div>

						<SelectMedida datos={producto} actualizarDatos={setProducto} />

						<div className="my-6 border-b relative">
							<input
								type="text"
								placeholder="precio de producto"
								name="precio_minoreo"
								value={precio_minoreo}
								className=" focus:outline-none py-2"
								onChange={handleChange}
							/>
							<span className="text-primario-blue font-medium absolute top-3 right-4">
								S/
							</span>
						</div>

						<div className="my-6 border-b relative">
							<input
								type="number"
								placeholder="peso de producto"
								className=" focus:outline-none py-2"
								name="peso_minoreo"
								value={peso_minoreo}
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
								onChange={handleChange}
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
							{/* <SelectEstado actualizarDatos={setProducto} datos={producto} /> */}

							<button
								onClick={onSubmitForm}
								type="button"
								className="bg-blue-200 m-4 px-20 rounded-md py-1 mt-8 text-blue-800"
							>
								crear
							</button>
						</div>
					</div>
				</div>
			</div>

			{/*  */}

			
			<div className="w-72  text-center bg-white	 p-8 ml-10 rounded-lg relative">
				<div onClick={() => closeBtn()} className="absolute right-5 top-5">
					<Notification texto={"X"} />
				</div>
				<h2 className="font-semibold mb-4">Datos Mayoreo</h2>
				<SelectMedida3 datos={producto} actualizarDatos={setProducto} />
				<div className="relative my-8">
					<input
						onChange={handleChange}
						className=" border   rounded-lg   outline-none   text-lg input_text py-2 px-4 text-center"
						id="precio_mayoreo"
						name="precio_mayoreo"
						type="text"
						placeholder="precio"
					/>
					<label
						className="absolute left-4 top-2  font-semibold text-lg cursor-text label_texto hidden "
						htmlFor="precio_mayoreo"
					>
						precio por {medidada_mayoreo}
					</label>
					<span className="text-primario-blue font-medium absolute top-3 right-4">
						S/
					</span>
				</div>

				<div className="relative my-8">
					<input
						onChange={handleChange}
						className=" border   rounded-lg   outline-none   text-lg input_text py-2 px-4 text-center"
						id="peso_mayoreo"
						name="peso_mayoreo"
						type="text"
						placeholder="peso"
					/>

					<label
						className="absolute left-4 top-2  font-semibold text-lg cursor-text label_texto hidden "
						htmlFor="peso_mayoreo"
					>
						{medida_minoreo} por {medidada_mayoreo}
					</label>
					<span className="text-primario-blue font-medium absolute top-3 right-4">
						{medida_minoreo}
					</span>
				</div>
				<div className="relative my-8">
					<input
						onChange={handleChange}
						className=" border   rounded-lg   outline-none   text-lg input_text py-2  text-left pl-8  "
						id="stock"
						name="stock"
						type="text"
						placeholder="stock"
					/>

					<label
						className="absolute left-4 top-2  font-semibold text-lg cursor-text label_texto hidden "
						htmlFor="stock"
					>
						stock en{" "}
						{medidada_mayoreo === "cajon"
							? medidada_mayoreo + "es"
							: medidada_mayoreo + "s"}
					</label>
					<span
						className={`font-medium absolute top-3 right-4 
							text-primario-blue  text-sm
						`}
					>
						{medidada_mayoreo} = {stock * peso_mayoreo}{" "}
						{medida_minoreo === "kilo" ? "kg" : "und"}
					</span>
				</div>
				<div className="relative my-8">
					<input
						onChange={handleChange}
						className=" border   rounded-lg   outline-none   text-lg input_text py-2  text-primario-red text-left pl-8 "
						id="cantidad_minima"
						name="cantidad_minima"
						type="text"
						placeholder="minimo"
					/>

					<label
						className="absolute left-4 top-2  font-semibold text-lg cursor-text label_texto hidden "
						htmlFor="cantidad_minima"
					>
						alertarme en {cantidad_minima} {medidada_mayoreo}
					</label>
					<span
						className={`font-medium absolute top-3 right-4 
							alerta text-primario-blue text-sm`}
					>
						{medidada_mayoreo} = {cantidad_minima * peso_mayoreo}
						{medida_minoreo === "kilo" ? "kg" : "und"}
					</span>
				</div>
				{alerta ? <p className="text-red-500 mt-3 mb-1">{alerta.msg}</p> : null}
			</div>
		</div>
	);
};

export default NewProduct;
