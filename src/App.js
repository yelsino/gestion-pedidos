import "./tailwind.output.css";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./components/paginas/Auth/Login";
import Register from "./components/paginas/Auth/Register";
import tokenAuth from "./config/token";
import AuthState from "./context/autenticacion/authState";
import Admin from "./components/paginas/Admin/Admin";
import AlertaState from "./context/alertas/alertaState";
import ProductoState from "./context/productos/productoState";
import PedidoState from "./context/pedidos/pedidoState";
import ReclamoState from "./context/reclamos/reclamoState";
import UsuarioState from "./context/usuarios/usuario.State";
import ListaState from "./context/lista/listaState";
import DireccionState from "./context/direcciones/direccionState";

// revisar si existe token
const token = localStorage.getItem("token");
if (token) {
	tokenAuth(token);
}

function App() {
	return (
		<DireccionState>
			<ListaState>
				<UsuarioState>
					<ReclamoState>
						<PedidoState>
							<ProductoState>
								<AuthState>
									<AlertaState>
										<Router>
											<Switch>
												<Route exact path="/" component={Login} />
												<Route exact path="/registrar" component={Register} />
												<Route path="/admin" component={Admin} />
											</Switch>
										</Router>
									</AlertaState>
								</AuthState>
							</ProductoState>
						</PedidoState>
					</ReclamoState>
				</UsuarioState>
			</ListaState>
		</DireccionState>
	);
}

export default App;
