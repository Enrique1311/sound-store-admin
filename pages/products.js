import React from "react";
import Layout from "../components/Layout";
import Link from "next/link";

const Products = () => {
	return (
		<Layout>
			<Link
				href="/products/new"
				className="bg-orange-500 text-white font-bold px-4 pt-2 pb-3 rounded-lg hover:text-gray-800"
			>
				Agregar productos
			</Link>
		</Layout>
	);
};

export default Products;
