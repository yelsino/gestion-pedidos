import { Link } from "react-router-dom";
import "moment/locale/es";

const ItemUsuario = (props) => {
	const { id, estilos, texto1, texto2, onBtn } = props;


	return (
		<Link to={`/admin/usuarios/${id}`}>
			{" "}
			<div
				onClick={onBtn}
				className={` bg-primario-gray 
     py-6 shadow-md flex justify-between px-20 rounded-md  text-lg font-medium  mb-4 cursor-pointer relative items-center  ${
				estilos && estilos
			}
    `}
			>
				<div className="flex flex-col sm:flex-row justify-between w-full">
					<span className="mt-2">{texto1}</span>
					<span className="mt-2">{texto2}</span>
				</div>
			</div>
		</Link>
	);
};

export default ItemUsuario;
