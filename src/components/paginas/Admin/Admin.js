import { useContext, useEffect, useState } from "react";
import {
	BrowserRouter as Router,
	Switch,
	Route,
	useHistory,
} from "react-router-dom";
import PedidoContext from "../../../context/pedidos/pedidoContext";
import ProductoContext from "../../../context/productos/productoContext";
import IconMenu from "../../atomos/icons/IconMenu";
import Panel from "../../moleculas/Panel";
import Lista from "../../organismos/Lista";
import NuevoUsuario from "../../organismos/NuevoUsuario";
import Pedido from "../../organismos/Pedido";
import Reclamo from "../../organismos/Reclamo";
import Usuario from "../../organismos/Usuario";
import Listas from "./Listas";
import NuevoPedido from "./NuevoPedido";
import Pedidos from "./Pedidos";
import Productos from "./Productos";
import Reclamos from "./Reclamos";
import Usuarios from "./Usuarios";

const Admin = () => {
	const [menu, openMenu] = useState(true);

	const productosContext = useContext(ProductoContext);
	const { obtenerProductos } = productosContext;
	const pedidosContext = useContext(PedidoContext);
	const { obtenerPedidos } = pedidosContext;

	document.onkeyup = function (event) {
		if (event.altKey && event.which === 82) {
			obtenerProductos();
		}
	};

	useEffect(() => {
		obtenerPedidos();
		obtenerProductos();
	}, []);

	return (
		<Router>
			<div className="flex ">
				{menu && (
					<div className="absolute md:relative w-96">
						<Panel activar={menu} openMenu={openMenu} />
					</div>
				)}
				<div
					onClick={() => openMenu(!menu)}
					className="fixed right-10 top-10 cursor-pointer z-30 "
				>
					<IconMenu />
				</div>

				<div className="mt-10 ml-10 mr-14 w-full">
					<Switch>
						<Route exact path={"/admin/pedidos"} component={Pedidos} />
						<Route path="/admin/pedidos/:pedidoId" component={Pedido} />
						<Route exact path={"/admin/productos"} component={Productos} />
						<Route exact path={"/admin/reclamos"} component={Reclamos} />
						<Route path={"/admin/reclamos/:reclamoId"} component={Reclamo} />
						<Route exact path={"/admin/usuarios"} component={Usuarios} />

						<Route
							exact
							path={"/admin/nuevo-usuario"}
							component={NuevoUsuario}
						/>

						<Route
							exact
							path={"/admin/usuarios/:usuarioId"}
							component={Usuario}
						/>
						<Route exact path={"/admin/listas"} component={Listas} />
						<Route path={"/admin/listas/:listaId"} component={Lista} />
						<Route exact path={"/admin/nuevo-pedido"} component={NuevoPedido} />
					</Switch>
				</div>
			</div>
		</Router>
	);
};

export default Admin;
