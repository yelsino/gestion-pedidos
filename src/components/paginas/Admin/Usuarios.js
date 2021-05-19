import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PedidoContext from "../../../context/pedidos/pedidoContext";
import UsuarioContext from "../../../context/usuarios/usuarioContext";
import SubTitulo from "../../atomos/textos/TxtSubTitle";
import ItemUsuario from "../../moleculas/ItemUsuario";
import NewFiltro from "../../organismos/NewFiltro";

const Usuarios = () => {
	const usuariosContext = useContext(UsuarioContext);
	const { usuarios, obtenerUsuarios, obtenerUsuarioActual } = usuariosContext;

	const pedidosContext = useContext(PedidoContext);
	const { pedidos } = pedidosContext;

	useEffect(() => {
		obtenerUsuarios();
	}, []);

	const [cantidad, setCantidad] = useState({
		nuevos: 1,
		atendidos: 1,
	});

	const { nuevos, atendidos } = cantidad;

	const obtenerPedidosTodos = () => {
		obtenerUsuarios();
		setCantidad({
			...cantidad,
			nuevos: 1,
			atendidos: 1,
		});
	};
	const obtenerPedidosNuevos = () => {
		obtenerUsuarios();
		setCantidad({
			...cantidad,
			nuevos: 1,
			atendidos: 0,
		});
	};
	const obtenerPedidosAtendidos = () => {
		obtenerUsuarios();
		setCantidad({
			...cantidad,
			nuevos: 0,
			atendidos: 1,
		});
	};

	return (
		<div className="sm:mx-5 md:mx-10 lg:mx-32 xl:mx-40 2xl:mx-96 ">
			<NewFiltro
				stilo={""}
				texto1={"Todos"}
				texto2={"Clientes"}
				texto3={"Personal"}
				texto4={""}
				texto5={""}
				filtro1={obtenerPedidosTodos}
				filtro2={obtenerPedidosNuevos}
				filtro3={obtenerPedidosAtendidos}
				filtro4={() => {}}
				filtro5={() => {}}
			/>
			<div>
				{nuevos > 0 && (
					<div className="my-4">
						<SubTitulo texto={"Clientes"} />
						{usuarios.map((e) => {
							return (
								e.roles[0].name === "user" && (
									<ItemUsuario
										onBtn={obtenerUsuarioActual}
										key={e._id}
										estilos={
											"hover:bg-primario-green hover:text-primario-green-pure"
										}
										roles={e.roles}
										texto1={e.username}
										texto2={e.celular}
										id={e._id}
									/>
								)
							);
						})}
					</div>
				)}
				{atendidos > 0 && (
					<div className="my-4 text-primario-blue  ">
						<SubTitulo texto={"Personal"} />
						{usuarios.map((e) => {
							return (
								e.roles[0].name !== "user" && (
									<ItemUsuario
										onBtn={obtenerUsuarioActual}
										key={e._id}
										estilos={
											"hover:bg-primario-green hover:text-primario-green-pure"
										}
										roles={e.roles}
										texto1={e.username}
										texto2={e.celular}
										id={e._id}
									/>
								)
							);
						})}
					</div>
				)}
			</div>
			{/* <Link
				to={"/admin/nuevo-usuario"}
				className="fixed p-2 rounded-md text-lg font-bold bg-primario-blue text-white bottom-10 right-10 hover:bg-blue-800"
			>
				Nuevo Usuario
			</Link> */}
		</div>
	);
};

export default Usuarios;
