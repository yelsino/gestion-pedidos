import { useContext, useEffect, useState } from "react";
import ProductoContext from "../../../context/productos/productoContext";
import Card from "../../organismos/Card";
import NewFiltro from "../../organismos/NewFiltro";
import Modal from "../../organismos/Modal";
import NewProduct from "../../organismos/NuevoProducto";

const Productos = () => {
	const productosContext = useContext(ProductoContext);
	const {
		productos,
		obtenerProductos,
		obtenerporCategoria,
		crearNuevoProducto,
		obtenerProductosAgotados,
	} = productosContext;

	const [openModal, setModal] = useState(false);

	const getAllproductos = () => obtenerProductos();
	const getVegetales = () => obtenerporCategoria("601ecaad34bf2f55c7fbfd82");
	const getFrutas = () => obtenerporCategoria("601ecaad34bf2f55c7fbfd83");
	const getAbarrotes = () => obtenerporCategoria("601ecaad34bf2f55c7fbfd84");
	const getAgotados = () => obtenerProductosAgotados();

	useEffect(() => {
		obtenerProductos();
	}, []);

	return (
		<div className="">
			<NewFiltro
				texto1={"Todos"}
				texto2={"Agotados"}
				texto3={"Vegetales"}
				texto4={"Frutas"}
				texto5={"Abarrotes"}
				stilo={""}
				filtro1={getAllproductos}
				filtro2={()=>{}}
				filtro3={getVegetales}
				filtro4={getFrutas}
				filtro5={getAbarrotes}
			/>


			<div className="flex flex-wrap mt-6 justify-center">
				{productos.length > 0 ? (
					productos.map((producto) => (
						<Card key={producto._id} producto={producto} />
					))
				) : (
					<p className="mt-20 font-bold text-gray-400">
						Los productos de esta categoria se han agotado
					</p>
				)}
			</div>

			<button
				type="submit"
				className="bg-primario-blue py-3 px-8 text-white rounded-md font-bold hover:bg-blue-600 hover:text-white my-2 fixed bottom-5 right-10 text-lg"
				onClick={() => setModal(true)}
			>
				Nuevo
			</button>
			{openModal && (
				<Modal style={"bg-gray-700 opacity-75 "}>
					<div className="">
						<NewProduct
							closeBtn={setModal}
							crearNuevoProducto={crearNuevoProducto}
						/>
					</div>
				</Modal>
			)}
		</div>
	);
};

export default Productos;
