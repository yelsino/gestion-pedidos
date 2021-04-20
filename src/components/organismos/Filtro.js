import React from "react";

const Filtro = (props) => {
	const color =
		"px-8 border-b hover:bg-primario-green rounded-md py-2 cursor-pointer border-primario-green text-green-800 mx-2";

	return (
		<ul className=" flex  justify-center items-center flex-row flex-wrap">
			<button className={color} onClick={props.filtro1}>
				{props.texto1}
			</button>

			<button className={color} onClick={props.filtro2}>
				{props.texto2}
			</button>

			<button className={color} onClick={props.filtro3}>
				{props.texto3}
			</button>

			<button className={color} onClick={props.filtro4}>
				{props.texto4}
			</button>
			{props.texto5 && (
				<button className={color} onClick={props.filtro5}>
					{props.texto5}
				</button>
			)}
		</ul>
	);
};

export default Filtro;
