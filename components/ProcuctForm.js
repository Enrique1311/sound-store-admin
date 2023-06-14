import axios from "axios";
import { useRouter } from "next/router";
import React, { useState } from "react";

const ProcuctForm = ({
	_id,
	name: existingName,
	images,
	description: existingDescription,
	price: existingPrice,
}) => {
	const [name, setName] = useState(existingName || "");
	const [description, setDescription] = useState(existingDescription || "");
	const [price, setPrice] = useState(existingPrice || "");
	const [goToProduct, setGoToProduct] = useState(false);
	const router = useRouter();

	console.log({ _id });

	async function saveProduct(event) {
		event.preventDefault();
		const data = { name, description, price };

		if (_id) {
			// update product
			await axios.put("/api/products", { ...data, _id });
		} else {
			// create product
			await axios.post("/api/products", { ...data });
		}
		setGoToProduct(true);
	}

	if (goToProduct) {
		router.push("/products");
	}

	const uploadImages = async function (event) {
		const files = event.target.files;

		if (files?.length > 0) {
			const data = new FormData();

			for (const file of files) {
				data.append("file", file);
			}

			const res = await axios.post("/api/upload", data, {
				headers: { "Content-Type": "multipart/form-data" },
			});
			console.log(res.data);
		}
	};

	return (
		<form onSubmit={saveProduct}>
			<label>Nombre del producto</label>
			<input
				type="text"
				placeholder="Nombre del producto"
				value={name}
				onChange={(event) => setName(event.target.value)}
			/>
			<label>Imágenes</label>
			<div className="mb-2">
				<label className="w-24 h-24 flex gap-1 justify-center items-center text-gray-500 rounded-md bg-gray-200 cursor-pointer">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						strokeWidth={2}
						stroke="currentColor"
						className="w-6 h-6 text-orange-500"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
						/>
					</svg>
					Cargar
					<input
						type="file"
						onChange={uploadImages}
						className="hidden"
					/>
				</label>

				{!images?.length && <div>Éste producto no posee imágenes</div>}
			</div>
			<label>Descripción</label>
			<textarea
				placeholder="Descripción"
				value={description}
				onChange={(event) => setDescription(event.target.value)}
			></textarea>
			<label>Precio en Pesos ($)</label>
			<input
				type="number"
				placeholder="Precio"
				value={price}
				onChange={(event) => setPrice(event.target.value)}
			/>
			<button
				type=""
				className="btn-primary"
			>
				Guardar
			</button>
		</form>
	);
};

export default ProcuctForm;
