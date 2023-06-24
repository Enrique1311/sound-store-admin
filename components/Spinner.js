import React from "react";
import { PropagateLoader } from "react-spinners";

const Spinner = () => {
	return (
		<PropagateLoader
			color={"orange"}
			speedMultiplier={1}
		/>
	);
};

export default Spinner;
