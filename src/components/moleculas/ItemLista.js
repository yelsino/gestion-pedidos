import { Link } from "react-router-dom";
import moment from "moment";
import "moment/locale/es";

const ItemLista = ({ lista, estilos }) => {
	const { _id, nombre, celular, abono, createdAt } = lista;

	const onBtn = () => {};

	return (
		<Link to={`/admin/listas/${_id}`}>
			{" "}
			<div
				onClick={onBtn}
				className={` bg-primario-gray 
     py-6 shadow-md flex justify-between rounded-md  text-xl   mb-4 cursor-pointer relative px-5 max-w-3xl ${
				estilos && estilos
			}
    `}
			>
				<div className="flex flex-col sm:flex-row justify-between w-full">
					<span className="mt-2">{nombre}</span>
					<span className="text-3xl text-gray-400"> - </span>
					<span className="mt-2">{celular}</span>
				</div>

				<span className="text-gray-500 absolute top-2 font-normal text-sm">
					{moment(createdAt).format("LLLL")}
				</span>
			</div>
		</Link>
	);
};

export default ItemLista;
