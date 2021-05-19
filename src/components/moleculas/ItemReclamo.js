import { Link } from "react-router-dom";
import moment from "moment";
import "moment/locale/es";

const ItemReclamo = (props) => {
	const { id, estilos, texto1, texto2, fecha, onBtn, reclamoActual } = props;
	return (
		<Link
			to={`/admin/reclamos/${id}`}
			onClick={() => {
				reclamoActual(id);
			}}
		>
			{" "}
			<div
				onClick={onBtn}
				className={` bg-primario-gray 
     py-6 shadow-md flex justify-between px-20 rounded-md  text-lg font-medium  mb-4 cursor-pointer relative  ${
				estilos && estilos
			}
    `}
			>
				<div className="flex flex-col sm:flex-row justify-between w-full">
					<span className="mt-2">{texto1}</span>
					<span className="mt-2">{texto2}</span>
				</div>

				<span className="text-gray-400 absolute top-4 font-normal text-sm">
					{moment(fecha).format("LLLL")}
				</span>
			</div>
		</Link>
	);
};

export default ItemReclamo;
