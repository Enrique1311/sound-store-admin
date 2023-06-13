import React, { useState } from "react";
import Layout from "../../components/Layout";
import axios from "axios";

const NewProduct = () => {
	const [name, setName] = useState("");
	const [description, setDescription] = useState("");
	const [price, setPrice] = useState("");

	async function createProduct(event) {
		event.preventDefault();
		const data = { name, description, price };

		await axios.post("/api/products", data);
	}

	return (
		<Layout>
			<form onSubmit={createProduct}>
				{" "}
				<h1>Nuevo Producto</h1>
				<label>Nombre del producto</label>
				<input
					type="text"
					placeholder="Nombre del producto"
					value={name}
					onChange={(event) => setName(event.target.value)}
				/>
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
		</Layout>
	);
};

export default NewProduct;
