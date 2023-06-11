import { useSession, signIn, signOut } from "next-auth/react";
import Navbar from "./Navbar";

export default function Layout({ children }) {
	const { data: session } = useSession();

	if (session) {
		return (
			<div className="bg-orange-500 min-h-screen flex">
				<Navbar />
				<div className="bg-white flex-grow m-2 ml-0 rounded-lg p-4">
					{children}
				</div>
			</div>
		);
	}
	return (
		<div className="bg-orange-500 w-screen h-screen flex justify-center items-center">
			<button
				onClick={() => signIn("google")}
				className="bg-white p-2 px-6 rounded-xl text-lg"
			>
				Ingresar con Google
			</button>
		</div>
	);
}
