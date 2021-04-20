import { useContext, useState } from "react";
import ProductoContext from "../../context/productos/productoContext";
import CardAlerta from "./CardAlerta";
import EditarProducto from "./EditarProducto";
import Modal from "./Modal";

const Card = ({ producto }) => {
	const productosContext = useContext(ProductoContext);
	const {
		productoseleccionado,
		obtenerProductos,
		obtenerProductoSeleccionado,
		desactivarProductoSeleccionado,
		activarProductoSeleccionado,
		actualizarProductoSeleccionado,
		eliminarProductoSeleccionado,
	} = productosContext;

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
	} = producto;

	const [desactivar, setDesactivar] = useState(false);
	const [editar, setEditar] = useState(false);
	const [eliminar, setEliminar] = useState(false);

	const [activar, setActivar] = useState(false);

	const [btneditar, setBtnEditar] = useState(false);
	const [modal_eliminar, setModalEliminar] = useState(false);

	const desactivarProducto = (e) => {
		setDesactivar(!desactivar);
		e.preventDefault();
		desactivarProductoSeleccionado(_id);
		// obtenerProductos();
	};
	const activarProducto = (e) => {
		e.preventDefault();
		activarProductoSeleccionado(_id);
	};

	const editarProducto = (e) => {
		e.preventDefault();
		setBtnEditar(true);
	};
	// const eliminarProducto = () => {}

	const handleKeyUp = (e) => {
		if (e.keyCode === 27 || e.keyCode === 67) {
			setDesactivar(false);
			setEditar(false);
			setEliminar(false);
			setActivar(false);
		}
		if (e.keyCode === 69) {
			obtenerProductoSeleccionado(_id);
			setDesactivar(false);
			setActivar(false);
			setEditar(false);
			setEliminar(true);
		}
	};

	return (
		<div className="flex m-2 mx-4 relative h-20">
			<div className={`w-24 flex items-center justify-center  rounded-md ${"bg-primario-green"}`}>
				<img src={imgURL} alt="" />
			</div>

			<div className="shadow-lg bg-white rounded-md w-32 flex flex-col justify-around items-center">
				<span className="text-sm font-bold"> {nombre} </span>
				<div className="flex  w-full justify-around ">
					<span className="text-xs text-gray-600">
						{peso_minoreo} {medida_minoreo}
					</span>
					<span className="text-red-500 text-base font-semibold">
						S/ {precio_minoreo}
					</span>
				</div>
			</div>

			<button
				onKeyUp={handleKeyUp}
				onClick={(e) => {
					e.stopPropagation();
					obtenerProductoSeleccionado(_id);
					setEliminar(false);
					setEditar(false);
					setDesactivar(!desactivar);
					setActivar(!activar);
				}}
				onDoubleClick={(e) => {
					e.stopPropagation();
					obtenerProductoSeleccionado(_id);
					setEliminar(false);
					setDesactivar(false);
					setActivar(false);
					setEditar(true);
				}}
				className="w-full h-full absolute z-0 outline-none focus:outline-none"
			>
				{/* {desactivar && estado && (
					<span
						onClick={desactivarProducto}
						className="bg-white p-2 px-4 rounded-md  font-bold border border-gray-500 hover:bg-black hover:text-white"
					>
						desactivar
					</span>
				)} */}

				{editar && (
					<span
						onClick={editarProducto}
						className="bg-white p-2 px-4 rounded-md text-primario-blue font-bold border border-primario-blue hover:bg-primario-blue hover:text-white"
					>
						EDITAR
					</span>
				)}

				{eliminar && (
					<span
						onClick={() => setModalEliminar(!modal_eliminar)}
						className="bg-white p-2 px-4 rounded-md text-primario-red font-bold border border-primario-red hover:bg-primario-red hover:text-white"
					>
						ELIMINAR
					</span>
				)}
				{/* 
				{activar && !estado && (
					<span
						onClick={activarProducto}
						className="bg-primario-green p-2 px-4 rounded-md text-green-800 font-bold shadow-md hover:bg-green-800 hover:text-white "
					>
						ACTIVAR
					</span>
				)} */}
			</button>

			{btneditar && (
				<Modal style={"bg-gray-700 opacity-75 "}>
					<EditarProducto
						productoseleccionado={productoseleccionado}
						onBtnClose={setBtnEditar}
						btneditar={btneditar}
						actualizarProductoSeleccionado={actualizarProductoSeleccionado}
						setDesactivar={setDesactivar}
					/>
				</Modal>
			)}

			{modal_eliminar && (
				<Modal style={"bg-gray-700 opacity-75"}>
					<CardAlerta
						setModalEliminar={setModalEliminar}
						modal_eliminar={modal_eliminar}
						eliminarProductoSeleccionado={eliminarProductoSeleccionado}
						_id={_id}
						obtenerProductos={obtenerProductos}
					/>
				</Modal>
			)}
		</div>
	);
};

export default Card;
