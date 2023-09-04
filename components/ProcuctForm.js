import { useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Spinner from "./Spinner";
import { ReactSortable } from "react-sortablejs";

export default function ProductForm({
	_id,
	title: existingTitle,
	description: existingDescription,
	price: existingPrice,
	images: existingImages,
	category: assignedCategory,
}) {
	const [title, setTitle] = useState(existingTitle || "");
	const [description, setDescription] = useState(existingDescription || "");
	const [category, setCategory] = useState(assignedCategory || "");
	const [price, setPrice] = useState(existingPrice || "");
	const [images, setImages] = useState(existingImages || []);
	const [goToProducts, setGoToProducts] = useState(false);
	const [isUploading, setIsUploading] = useState(false);
	const router = useRouter();

	async function saveProduct(ev) {
		ev.preventDefault();
		const data = {
			title,
			description,
			price,
			images,
			category,
		};
		if (_id) {
			//update
			await axios.put("/api/products", { ...data, _id });
		} else {
			//create
			await axios.post("/api/products", data);
		}
		setGoToProducts(true);
	}

	if (goToProducts) {
		router.push("/products");
	}

	async function uploadImages(ev) {
		const files = ev.target?.files;
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
				value={title}
				onChange={(ev) => setTitle(ev.target.value)}
				required
			/>
			<label>Categoría</label>
			<input
				type="text"
				placeholder="Categoría"
				value={category}
				onChange={(ev) => setCategory(ev.target.value)}
				required
			/>
			<label>Imágenes</label>
			<div className="mb-2 flex flex-wrap gap-1">
				<ReactSortable
					list={images}
					className="flex flex-wrap gap-1"
					setList={updateImagesOrder}
				>
					{!!images?.length &&
						images.map((link) => (
							<div
								key={link}
								className="h-24 shadow-md rounded-md border-2 border-gray-200 overflow-hidden"
							>
								<img
									src={link}
									alt=""
								/>
							</div>
						))}
				</ReactSortable>
				{isUploading && (
					<div className="h-24 flex items-center">
						<Spinner />
					</div>
				)}
				<label className="w-24 h-24 bg-white cursor-pointer text-center flex flex-col items-center justify-center text-sm gap-1 text-primary rounded-md shadow-sm border-2 border-primary">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						strokeWidth={1.5}
						stroke="currentColor"
						className="w-6 h-6"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
						/>
					</svg>
					<div>Agregar imágen</div>
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
				onChange={(ev) => setDescription(ev.target.value)}
			/>
			<label>Precio en Pesos ($))</label>
			<input
				type="number"
				placeholder="Precio"
				value={price}
				onChange={(ev) => setPrice(ev.target.value)}
			/>
			<button
				type="submit"
				className="btn-primary"
			>
				Guardar
			</button>
		</form>
	);
}
