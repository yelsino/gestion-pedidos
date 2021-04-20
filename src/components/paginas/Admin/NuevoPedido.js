import { useContext, useEffect, useState } from "react";
import ListaContext from "../../../context/lista/listaContext";
import ProductoContext from "../../../context/productos/productoContext";
import NewFiltro from "../../organismos/NewFiltro";
import AddCard from "../../organismos/AddCard";
import RemoveCard from "../../organismos/RemoveCard";
import SubTitulo from "../../atomos/textos/TxtSubTitle";
import Modal from "../../organismos/Modal";
import InputRdVerde from "../../atomos/inputs/InputRdVerde";
import Notification from "../../moleculas/Notification";

import PedidoContext from "../../../context/pedidos/pedidoContext";
import ItemUsuario from "../../moleculas/ItemUsuario";
import UsuarioContext from "../../../context/usuarios/usuarioContext";
import { Link, useHistory } from "react-router-dom";
import DireccionContext from "../../../context/direcciones/direccionContext";
import AlertaContext from "../../../context/alertas/alertaContext";

const NuevoPedido = () => {
	useEffect(() => {
		obtenerProductos();
		obtenerUsuarios();
		obtenerDirecciones();
	}, []);

	const direcionesContext = useContext(DireccionContext);
	const {
		direcciones,
		direccion_seleccionada,
		crearNuevaDireccion,
		obtenerDirecciones,
		seleccionarDireccion,
		removerDireccionSeleccionada,
	} = direcionesContext;

	const productosContext = useContext(ProductoContext);
	const { productos, obtenerProductos, obtenerporCategoria } = productosContext;

	const alertaContext = useContext(AlertaContext);
	const { alerta, mostrarAlerta } = alertaContext;

	const history = useHistory();
	const usuariosContext = useContext(UsuarioContext);
	const {
		usuarios,
		usuario_pedido,
		usuario,
		obtenerUsuarios,
		obtenerUsuarioActual,
		seleccionarUsuarioPedido,
		removerUsuarioPedido,
	} = usuariosContext;

	const listaContext = useContext(ListaContext);
	const {
		lista_creada,
		lista_productos,
		quitarProductos,
		agregarProductos,
		crearNuevaLista,
		eliminarLista,
	} = listaContext;

	const pedidoContext = useContext(PedidoContext);
	const { crearNuevoPedido } = pedidoContext;

	const [modal, openModal] = useState(false);
	const [modal_inicio, openModalInicio] = useState(false);
	const [btnlista, setBtnLista] = useState(false);
	const [btnpedido, setBtnPedido] = useState(false);
	const [modal_codigo, setModalCodigo] = useState(false);

	const getVegetales = () => {
		obtenerporCategoria("601ecaad34bf2f55c7fbfd82");
	};
	const getFrutas = () => {
		obtenerporCategoria("601ecaad34bf2f55c7fbfd83");
	};
	const getAbarrotes = () => {
		obtenerporCategoria("601ecaad34bf2f55c7fbfd84");
	};

	const [datoslista, setDatosLista] = useState({
		abono: 0,
	});

	const { abono } = datoslista;
	const [buscar, setBuscador] = useState("");
	const [filtrado, setFiltrado] = useState([]);

	const onChangeLista = (e) => {
		setDatosLista({
			...datoslista,
			[e.target.name]: e.target.value,
		});
	};

	const crearLista = () => {
		setBtnLista(false);
		const nuevaLista = {
			creador: usuario_pedido[0]._id,
			productos: lista_productos.map((e) => (e = e._id)),
			nombre: "LISTA CREADA EN TIENDA",
		};
		crearNuevaLista(nuevaLista);
		setBtnPedido(true);
	};

	const crearPedido = () => {
		const datosPedido = {
			lista: lista_creada,
			copia_pedido: lista_productos,
			abono: datoslista.abono,
			direccion: direccion_seleccionada
				? direccion_seleccionada[0]._id
				: "604b7d777aefea0015e46e62",
			preparado: false,
			enviado: false,
			entregado: false,
			rechazado: false,
		};
		crearNuevoPedido(datosPedido);
		removerUsuarioPedido();
		removerDireccionSeleccionada();
		history.push("/admin/pedidos");
	};

	const buscadorForName = async (e) => {
		e.persist();
		await setBuscador(e.target.value);
		filtrarElementos();
		console.log(buscar);
	};

	const filtrarElementos = () => {
		const busqueda = productos.filter((item) => {
			if (item.nombre.includes(buscar)) {
				return item;
			}
		});
		setFiltrado(busqueda);
	};

	return (
		<div className="text-center relative">
			<SubTitulo texto={"crear una nueva lista"} />;
			<div className="flex  justify-center ">
				<div className="flex items-center  w-1/2 flex-col">
					<NewFiltro
						texto1={"vegetales"}
						texto2={"frutas"}
						texto3={"abarrotes"}
						texto4={""}
						texto5={""}
						stilo={"w-60"}
						filtro1={getVegetales}
						filtro2={getFrutas}
						filtro3={getAbarrotes}
						filtro4={() => {}}
						filtro5={() => {}}
					></NewFiltro>
					<InputRdVerde
						atributos={{
							name: "buscar",
							placeholder: "Buscar",
							id: "buscar",
							type: "text",
							value: buscar,
						}}
						handleChange={buscadorForName}
					/>
					<div className="flex flex-wrap justify-center mt-4">
						{filtrado.map((e) => (
							<AddCard
								key={e._id}
								agregarProductos={agregarProductos}
								producto={e}
							/>
						))}
					</div>
					<div className="flex flex-wrap justify-center mt-4">
						{productos.map((e) => (
							<AddCard
								key={e._id}
								agregarProductos={agregarProductos}
								producto={e}
							/>
						))}
					</div>
				</div>
				<div className="flex items-center flex-col w-1/2 ">
					<div className="font-bold text-lg">Lista de pedido</div>
					<div className="">
						{lista_productos.map((e) => (
							<RemoveCard
								key={e._id}
								producto={e}
								quitarProductos={quitarProductos}
							/>
						))}
					</div>
				</div>
			</div>
			{!modal && (
				<button
					onClick={() => {
						openModal(true);
						setBtnLista(true);
					}}
					className="fixed p-3 bg-primario-blue font-bold text-white rounded-lg hover:bg-blue-800 z-40 left-0 right-0 bottom-20 mx-auto h-12 bg  "
				>
					EMPEZAR
				</button>
			)}
			{!modal_inicio && (
				<button
					onClick={() => {
						openModalInicio(true);
					}}
					className="fixed p-3 bg-primario-blue font-bold text-white rounded-lg hover:bg-blue-800 z-40 left-0 right-0 bottom-20 ml-8 h-12 bg   "
				>
					REGISTRAR DATOS
				</button>
			)}
			{btnlista && (
				<div>
					{" "}
					<button
						onClick={() => {
							crearLista();
							setBtnPedido(true);
						}}
						className="fixed p-3 bg-primario-blue font-bold text-white rounded-lg hover:bg-blue-800  left-0 right-0 bottom-20 mx-auto h-12 bg z-40  "
					>
						CREAR PEDIDO
					</button>
				</div>
			)}
			{btnpedido && (
				<button
					onClick={crearPedido}
					className="fixed p-3 bg-primario-blue font-bold text-white rounded-lg hover:bg-blue-800 left-0 right-0 bottom-20 mx-auto h-12 bg z-40 "
				>
					Registrar Pedido
				</button>
			)}
			{modal && (
				<Modal style={"bg-primario-green"}>
					<div className="bg-white p-10 relative">
						<SubTitulo texto={"¿Cliente dejo abono?"} />

						<span className="block h-1"></span>

						<span className="block h-1"></span>
						<InputRdVerde
							handleChange={onChangeLista}
							atributos={{
								id: "abono",
								name: "abono",
								value: abono,
								type: "number",
								placeholder: "¿cliente dejo abono?",
								titulo: "¿cliente dejo abono? (opcional)",
							}}
						/>
						<div
							className="absolute top-5 right-5"
							onClick={() => {
								setBtnLista(false);
								setBtnPedido(false);
								openModal(false);
								eliminarLista(lista_creada);
							}}
						>
							<Notification texto={"X"} />
						</div>
					</div>
				</Modal>
			)}
			{modal_inicio && (
				<Modal style={"bg-primario-green z-40"}>
					<div className="text-center">
						{!usuario && (
							<button
								onClick={() => {
									obtenerDirecciones();
								}}
							>
								DIRECIONESSS
							</button>
						)}
						<SubTitulo texto={"REGISTRAR NUEVO PEDIDO"} stylos={"text"} />
					</div>

					<div className="bg-white p-10  rounded-md">
						{!usuario_pedido ? (
							<div>
								<h3 className="text-black font-medium text-lg">
									Elejir cliente
								</h3>
								<div className="flex">
									<InputRdVerde
										atributos={{
											name: "buscarcliente",
											placeholder: "Buscar",
											id: "buscarcliente",
											type: "text",
											value: "",
										}}
										handleChange={buscadorForName}
									/>

									<Link
										to="/admin/nuevo-usuario"
										className="bg-primario-blue p-2 text-white rounded-lg font-semibold shadow-md h-12 self-center ml-10 flex items-center hover:bg-blue-700"
									>
										Crear Usuario
									</Link>
								</div>

								{usuarios.map((e) => {
									return (
										e.roles[0].name === "user" && (
											<div
												onClick={() => {
													seleccionarUsuarioPedido(e._id);
												}}
												key={e._id}
												className=" w-full border-primario-blue border hover:bg-primario-blue hover:text-white font-medium p-2 rounded-md my-2 cursor-pointer flex justify-between "
											>
												<span>001</span>
												<span className="mx-2"></span>
												<span className="text-primario-blue hover:text-white">
													{e.username}
												</span>
												<span className="mx-2"></span>
												<span>77068159</span>
											</div>
										)
									);
								})}
							</div>
						) : (
							// D REGISTRO DE DIRECCION
							<div>
								{alerta ? (
									<p className="text-red-500 mt-3 mb-1">{alerta.msg}</p>
								) : null}
								<div className="flex items-center justify-between">
									<h3 className="text-black font-medium text-lg">
										Direccion de cliente
									</h3>
									<button className="bg-primario-blue p-2 mx-8 text-white rounded-lg font-semibold shadow-md">
										Nueva Direccion
									</button>
								</div>

								{!direccion_seleccionada ? (
									<div>
										{direcciones.map((e) => (
											<div
												key={e._id}
												onClick={() => {
													seleccionarDireccion(e._id);
												}}
												className="w-full border-primario-blue border hover:bg-primario-blue  font-medium p-2 rounded-md my-2 cursor-pointer text-primario-blue group "
											>
												<span className="text-gray-500 group-hover:text-white">
													N° 001
												</span>
												<span className="mx-2"></span>
												<span className="group-hover:text-white  p-2 inline-block w-full ">
													{e.nombre}
												</span>
												<span className="mx-2"></span>
											</div>
										))}
									</div>
								) : (
									<div>
										<h1>Lista para </h1>
										<p className="text-primario-blue">
											{usuario_pedido[0].username}
										</p>

										<h1>Direccion </h1>
										<p className="text-primario-blue">
											{direccion_seleccionada[0].nombre}
										</p>
									</div>
								)}

								<div className="flex justify-around ">
									<button
										onClick={() => {
											removerUsuarioPedido();
											removerDireccionSeleccionada();
										}}
										className="border-primario-red border-2 p-2 my-4 text-primario-red hover:text-white hover:bg-primario-red rounded-lg font-semibold shadow-md"
									>
										Regresar
									</button>
									<button
										onClick={() => {
											if (usuario_pedido && direccion_seleccionada) {
												openModalInicio(false);
											} else {
												mostrarAlerta(
													!direccion_seleccionada &&
														"debe serleccionar una direccion",
													"alerta"
												);
												return;
											}
										}}
										className="border-primario-blue border-2 p-2 my-4 text-primario-blue hover:text-white hover:bg-primario-blue rounded-lg font-semibold shadow-md"
									>
										Crear Lista
									</button>
								</div>
							</div>
						)}
					</div>
				</Modal>
			)}
		</div>
	);
};

export default NuevoPedido;
