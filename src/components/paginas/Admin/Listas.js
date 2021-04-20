import { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import ListaContext from "../../../context/lista/listaContext";
import ItemLista from "../../moleculas/ItemLista";

const Listas = () => {
	const listasContext = useContext(ListaContext);
	const { listas, obtenerListas } = listasContext;
	useEffect(() => {
		obtenerListas();
	}, []);

	return (
		<div>
			<div>
				{listas.map((e) => (
					<ItemLista key={e._id} lista={e} estilos={""} />
				))}
			</div>

			<Link
				to={"/admin/nuevo-pedido"}
				className="fixed p-2 rounded-md text-lg font-bold bg-primario-blue text-white bottom-10 right-10 hover:bg-blue-800"
			>
				Nuevo Pedido
			</Link>
		</div>
	);
};

export default Listas;
