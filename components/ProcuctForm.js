import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Spinner from "./Spinner";
import { ReactSortable } from "react-sortablejs";

const ProcuctForm = ({
	_id,
	name: existingName,
	description: existingDescription,
	price: existingPrice,
	images: existingImages,
	category: existingCategory,
}) => {
	const [name, setName] = useState(existingName || "");
	const [description, setDescription] = useState(existingDescription || "");
	const [category, setCategory] = useState("");
	const [price, setPrice] = useState(existingPrice || "");
	const [images, setImages] = useState(existingImages || []);
	const [goToProduct, setGoToProduct] = useState(false);
	const [isUploading, setIsUploading] = useState(false);
	const [categories, setCategories] = useState([]);
	const router = useRouter();

	useEffect(() => {
		axios.get("/api/categories").then((result) => {
			setCategories(result.data);
		});
	}, []);

	async function saveProduct(event) {
		event.preventDefault();
		const data = { name, description, price, images, category };

		if (_id) {
			//update product
			await axios.put("/api/products", { ...data, _id });
		} else {
			//create product
			await axios.post("/api/products", { ...data });
		}
		setGoToProduct(true);
	}

	if (goToProduct) {
		router.push("/productsList");
	}

	async function uploadImages(event) {
		const files = event.target?.files;

		if (files?.length > 0) {
			setIsUploading(true);
			const data = new FormData();

			for (const file of files) {
				data.append("file", file);
			}

			const res = await axios.post("/api/upload", data);
			setImages((oldImages) => {
				return [...oldImages, ...res.data.links];
			});
			setIsUploading(false);
		}
	}

	function updateImagesOrder(images) {
		setImages(images);
	}

	return (
		<form onSubmit={saveProduct}>
			<label>Nombre del producto</label>
			<input
				type="text"
				placeholder="Nombre del producto"
				value={name}
				onChange={(event) => setName(event.target.value)}
			/>
			<label>Categoría</label>
			<select
				value={category}
				onChange={(ev) => setCategory(ev.target.value)}
			>
				<option value="">Sin categoría</option>
				{categories.length > 0 &&
					categories.map((cat) => <option value={cat._id}>{cat.name}</option>)}
			</select>
			<label>Imágenes</label>
			<div className="mb-2 gap-2 flex flex-wrap">
				<ReactSortable
					list={images}
					className="flex flex-wrap gap-2"
					setList={updateImagesOrder}
				>
					{!!images?.length &&
						images.map((link) => (
							<div
								key={link}
								className="w-24 h-24 rounded-md border-2 border-gray-300 overflow-hidden"
							>
								<img
									src={link}
									alt=""
								/>
							</div>
						))}
				</ReactSortable>

				{isUploading && (
					<div className="h-24 flex justify-center items-centers">
						<Spinner />
					</div>
				)}
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
