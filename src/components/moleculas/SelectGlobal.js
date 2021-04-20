import { useState } from "react";

const SelectGlobal = ({ atributos, valor_inicial, changeSelection }) => {
	return (
		<div className="flex ">
			{atributos.valor1 && (
				<label
					className={`cursor-pointer p-2 mx-1 rounded-md ${
						valor_inicial === atributos.valor1
							? "bg-primario-green shadow-sm text-green-700 font-semibold "
							: ""
					}`}
				>
					{atributos.valor1}
					<input
						type="radio"
						value={atributos.valor1}
						checked={valor_inicial === atributos.valor1}
						onChange={() => {
							changeSelection(atributos.valor1);
						}}
						className="hidden"
					/>
				</label>
			)}

			{atributos.valor2 && (
				<label
					className={`cursor-pointer p-2 mx-1 rounded-md ${
						valor_inicial === atributos.valor2
							? "bg-primario-green shadow-sm text-green-700 font-semibold"
							: ""
					}`}
				>
					{atributos.valor2}
					<input
						type="radio"
						value={atributos.valor2}
						checked={valor_inicial === atributos.valor2}
						onChange={() => {
							changeSelection(atributos.valor2);
						}}
						className="hidden"
					/>
				</label>
			)}
			{atributos.valor3 && (
				<label
					className={`cursor-pointer p-2 mx-1 rounded-md ${
						valor_inicial === atributos.valor3
							? "bg-primario-green shadow-sm text-green-700 font-semibold"
							: ""
					}`}
				>
					{atributos.valor3}
					<input
						type="radio"
						value={atributos.valor3}
						checked={valor_inicial === atributos.valor3}
						onChange={() => {
							changeSelection(atributos.valor3);
						}}
						className="hidden"
					/>
				</label>
			)}
			{atributos.valor4 && (
				<label
					className={`cursor-pointer p-2 mx-1 rounded-md ${
						valor_inicial === atributos.valor4
							? "bg-primario-green shadow-sm text-green-700 font-semibold"
							: ""
					}`}
				>
					{atributos.valor4}
					<input
						type="radio"
						value={atributos.valor4}
						checked={valor_inicial === atributos.valor4}
						onChange={() => {
							changeSelection(atributos.valor4);
						}}
						className="hidden"
					/>
				</label>
			)}
		</div>
	);
};

export default SelectGlobal;
