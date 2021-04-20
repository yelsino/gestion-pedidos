import React, { Fragment } from "react";
import BotonVerde from "../atomos/botones/BotonVerde";

const ViewCard = ({ producto, imagen }) => {
	const {
		nombre,
		peso_minoreo,
		precio_minoreo,
		medida_minoreo,

	} = producto;

	return (
		<Fragment>
			<div className="m-2 col-span-4 sm:col-span-4 md:col-span-2 lg:col-span-1 xl:col-span-1 flex flex-col items-center mb-5">
				<div
					className={`rounded-lg w-52  flex justify-center ${"bg-green-200"}`}
				>
					<img
						alt="producto"
						className="h-28 object-cover"
						src={
							typeof imagen === "object" ? URL.createObjectURL(imagen) : imagen
						}
					></img>
				</div>
				<div className="bg-white shadow-lg rounded-lg w-60 h-24">
					<div className="py-5 px-5">
						<div className="flex justify-between">
							<p className="font-bold text-gray-800 text-lg  ">{nombre}</p>

							<div className="text-xl text-red-500 font-semibold">
								S/ {precio_minoreo}
							</div>
						</div>
						<div className="flex items-center justify-between">
							<div className="text-sm text-gray-600 font-light">
								{peso_minoreo} {medida_minoreo}
							</div>

							<BotonVerde onBtn={(e) => e.preventDefault()} texto={"AGREGAR"} />
						</div>
					</div>
				</div>
			</div>
		</Fragment>
	);
};

export default ViewCard;
