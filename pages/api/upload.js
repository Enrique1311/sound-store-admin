import React from "react";
import multiparty from "multiparty";

export default async function handleUpload(req, res) {
	const form = new multiparty.Form();
	const { fields, files } = await new Promise((resolve, reject) => {
		form.parse(req, (error, fields, files) => {
			if (error) reject(error);
			resolve({ fields, files });
		});
	});
	console.log("length:", files);

	return res.json("ok");
}

export const config = {
	api: { bodyParser: false },
};