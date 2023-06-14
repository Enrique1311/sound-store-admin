import React, { useEffect, useState } from "react";
import Layout from "../../../components/Layout";
import { useRouter } from "next/router";
import axios, { Axios } from "axios";
import ProcuctForm from "../../../components/ProcuctForm";

const EditProductPage = () => {
	const [productInfo, setProductInfo] = useState(null);
	const router = useRouter();
	const { id } = router.query;

	useEffect(() => {
		if (!id) {
			return;
		}
		axios.get("/api/products?id=" + id).then((response) => {
			setProductInfo(response.data);
		});
	}, [id]);

	return (
		<Layout>
			<h1>Editar Producto</h1>
			{productInfo && <ProcuctForm {...productInfo} />}
		</Layout>
	);
};

export default EditProductPage;
