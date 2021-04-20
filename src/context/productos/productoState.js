import { useReducer } from "react";
import clienteAxios from "../../config/axios";
import imagen from "../../static/logocarlos.png";
import {
	OBTENER_PRODUCTOS,
	OBTENER_PRODUCTOS_CATEGORIAS,
	PRODUCTOS_ERROR,
	PRODUCTO_SELECCIONADO,
	OBTENER_PRODUCTOS_AGOTADOS,
	ACTUALIZAR_PRODUCTO,
	CREAR_PRODUCTO,
} from "../../types";

import productoReducer from "./productoReducer";
import productoContext from "./productoContext";

// const productos = [
// 	{
// 		_id: 1,
// 		nombre: "Mango",
// 		peso_minoreo: 1,
// 		precio_minoreo: 5.5,
// 		medida_minoreo: "kilo",
// 		categoria: "frutas",
// 		peso_mayoreo: 25,
// 		medidada_mayoreo: "cajon",
// 		precio_mayoreo: 70,
// 		stock: 10,
// 		imgURL: imagen,
// 		cantidad_minima: 1,
// 	},
// 	{
// 		_id: 2,
// 		nombre: "Mango",
// 		peso_minoreo: 1,
// 		precio_minoreo: 5.5,
// 		medida_minoreo: "kilo",
// 		categoria: "frutas",
// 		peso_mayoreo: 25,
// 		medidada_mayoreo: "cajon",
// 		precio_mayoreo: 70,
// 		stock: 10,
// 		imgURL: imagen,
// 		cantidad_minima: 1,
// 	},
// 	{
// 		_id: 3,
// 		nombre: "Mango",
// 		peso_minoreo: 1,
// 		precio_minoreo: 5.5,
// 		medida_minoreo: "kilo",
// 		categoria: "frutas",
// 		peso_mayoreo: 25,
// 		medidada_mayoreo: "cajon",
// 		precio_mayoreo: 70,
// 		stock: 10,
// 		imgURL: imagen,
// 		cantidad_minima: 1,
// 	},
// 	{
// 		_id: 4,
// 		nombre: "Mango",
// 		peso_minoreo: 1,
// 		precio_minoreo: 5.5,
// 		medida_minoreo: "kilo",
// 		categoria: "frutas",
// 		peso_mayoreo: 25,
// 		medidada_mayoreo: "cajon",
// 		precio_mayoreo: 70,
// 		stock: 10,
// 		imgURL: imagen,
// 		cantidad_minima: 1,
// 	},
// ];

const ProductoState = (props) => {
	const InitialState = {
		productos: [],
		productoslista: [],
		productoseleccionado: null,
	};

	// d dispatch para ejecutar las acciones
	const [state, dispatch] = useReducer(productoReducer, InitialState);

	// const listaContext = useContext(ListaContext);
	// const { productoslista } = listaContext;
	//  d obtener todos los productos
	const obtenerProductos = async () => {
		try {
			const resultado = await clienteAxios.get("api/productos");
			console.log(resultado.data);
			dispatch({
				type: OBTENER_PRODUCTOS,
				payload: resultado.data,
			});
		} catch (error) {
			dispatch({
				type: PRODUCTOS_ERROR,
			});
		}
	};

	// d obtener productos por categoria
	const obtenerporCategoria = async (categoria) => {
		try {
			const resultado = await clienteAxios.get("api/productos/" + categoria);
			dispatch({
				type: OBTENER_PRODUCTOS_CATEGORIAS,
				payload: resultado.data,
			});
		} catch (error) {
			dispatch({
				type: PRODUCTOS_ERROR,
			});
		}
	};

	const obtenerProductosAgotados = async () => {
		try {
			const resultado = await clienteAxios.get("api/productos");

			const filtrar = resultado.data.filter((e) => e.estado !== true);
			dispatch({
				type: OBTENER_PRODUCTOS_AGOTADOS,
				payload: filtrar,
			});
		} catch (error) {
			dispatch({
				type: PRODUCTOS_ERROR,
			});
		}
	};

	// d obtener producto seleccionado para añadir a lista
	const obtenerProductoSeleccionado = async (productoId) => {
		// const id = await productoId
		try {
			dispatch({
				type: PRODUCTO_SELECCIONADO,
				payload: productoId,
			});
		} catch (error) {
			console.log(error.response);
		}
	};

	// d desactivar producto seleccionado
	const desactivarProductoSeleccionado = async (productoId) => {
		try {
			const {
				_id,
				nombre,
				precio,
				medida,
				peso,
				imgURL,
				categoria,
				updatedAt,
				createdAt,
			} = state.productoseleccionado[0];

			const cambio = {
				_id,
				nombre,
				precio,
				medida,
				peso,
				imgURL,
				categoria,
				updatedAt,
				createdAt,
				estado: false,
			};
			let actualizar_productos = state.productos.filter((e) => e._id !== _id);

			dispatch({
				type: ACTUALIZAR_PRODUCTO,
				payload: actualizar_productos,
			});

			await clienteAxios.put(`api/productos/${productoId}`, cambio);
		} catch (error) {
			console.log(error.response);
		}
	};

	// d actovar producto seleccionado
	const actualizarProductoSeleccionado = async (productoId, data) => {
		try {
			// data.imgURL = state.productoseleccionado[0].imgURL;
			let actualizar_productos = state.productos.filter(
				(e) => e._id !== productoId
			);
			actualizar_productos.push(data);

			dispatch({
				type: ACTUALIZAR_PRODUCTO,
				payload: actualizar_productos,
			});

			const resultado = await clienteAxios.put(
				`api/productos/${productoId}`,
				data
			);
			console.log(resultado);
		} catch (error) {
			console.log(error.response);
		}
	};

	// d activar producto seleccionado
	const activarProductoSeleccionado = async (productoId) => {
		try {
			const {
				_id,
				nombre,
				precio,
				medida,
				peso,
				imgURL,
				categoria,
				updatedAt,
				createdAt,
			} = state.productoseleccionado[0];

			const cambio = {
				_id,
				nombre,
				precio,
				medida,
				peso,
				imgURL,
				categoria,
				updatedAt,
				createdAt,
				estado: true,
			};
			let actualizar_productos = state.productos.filter((e) => e._id !== _id);

			dispatch({
				type: ACTUALIZAR_PRODUCTO,
				payload: actualizar_productos,
			});
			await clienteAxios.put(`api/productos/${productoId}`, cambio);
		} catch (error) {
			console.log(error.response);
		}
	};

	// d crear nuevo producto
	const eliminarProductoSeleccionado = async (productoId) => {
		try {
			const actualizar_productos = state.productos.filter(
				(e) => e._id !== productoId
			);
			dispatch({
				type: ACTUALIZAR_PRODUCTO,
				payload: actualizar_productos,
			});

			await clienteAxios.delete(`api/productos/${productoId}`);
		} catch (error) {
			console.log(error.response);
		}
	};

	// d crear nuevo producto
	const crearNuevoProducto = async (producto) => {
		try {
			dispatch({
				type: CREAR_PRODUCTO,
				payload: producto,
			});
			await clienteAxios.post("api/productos", producto, {
				headers: { "Content-Type": "multipart/form-data" },
			});
		} catch (error) {
			console.log(error.response);
		}
	};

	return (
		<productoContext.Provider
			value={{
				productos: state.productos,
				productoseleccionado: state.productoseleccionado,
				productoslista: state.productoslista,
				obtenerProductos,
				obtenerporCategoria,
				obtenerProductoSeleccionado,
				crearNuevoProducto,
				obtenerProductosAgotados,
				desactivarProductoSeleccionado,
				activarProductoSeleccionado,
				actualizarProductoSeleccionado,
				eliminarProductoSeleccionado,
			}}
		>
			{props.children}
		</productoContext.Provider>
	);
};

export default ProductoState;
