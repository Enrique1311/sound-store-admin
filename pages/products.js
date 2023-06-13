import React from "react";
import Layout from "../components/Layout";
import Link from "next/link";

const Products = () => {
	return (
		<Layout>
			<Link
				href="products/new"
				className="bg-orange-500 text-white border-4 border-orange-500 font-bold px-4 pt-1 pb-2 rounded-lg hover:text-orange-500 hover:bg-white"
			>
				Agregar productos
			</Link>
		</Layout>
	);
};

export default Products;
