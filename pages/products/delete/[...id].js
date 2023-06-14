import React, { useEffect, useState } from "react";
import Layout from "../../../components/Layout";
import { useRouter } from "next/router";
import axios from "axios";

const DeleteProductPage = () => {
	const router = useRouter();
	const [productInfo, setProductInfo] = useState("");
	const { id } = router.query;

	useEffect(() => {
		if (!id) {
			return;
		}
		axios
			.get("/api/products?id=" + id)
			.then((response) => setProductInfo(response.data));
		console.log(productInfo);
	}, [id]);

	const goBack = () => {
		router.push("/products");
	};

	async function deleteProduct() {
		await axios.delete("/api/products?id=" + id);
		goBack();
	}

	return (
		<Layout>
			<div className="bg-gray-200 p-4 gap-2 rounded-lg text-center">
				<div className="flex flex-col items-center">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						strokeWidth={2}
						stroke="currentColor"
						className="w-20 h-20 text-red-500"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
						/>
					</svg>
					<p>
						¿Estás seguro que querés borrar el producto "
						<b>{productInfo.name}</b>"?
					</p>
				</div>
				<div className="flex justify-center gap-2 m-2">
					{" "}
					<button
						className="red-btn"
						onClick={deleteProduct}
					>
						Si
					</button>
					<button
						className="green-btn"
						onClick={goBack}
					>
						No
					</button>
				</div>
			</div>
		</Layout>
	);
};

export default DeleteProductPage;
