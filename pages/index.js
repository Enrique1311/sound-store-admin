import Layout from "../components/Layout";
import { useSession } from "next-auth/react";

export default function Home() {
	const { data: session } = useSession();

	return (
		<Layout>
			<div className="flex flex-1 justify-end">
				<span className="text-gray-600 h-fit flex gap-1 p-1 px-3 rounded-xl border-2 border-gray-500">
					{" "}
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						strokeWidth={2}
						stroke="currentColor"
						className="w-6 h-6"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
						/>
					</svg>
					Hola, <b className="text-orange-500">{session?.user?.name}</b>
				</span>
			</div>
		</Layout>
	);
}
