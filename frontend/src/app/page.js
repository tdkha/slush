'use client'
import Image from "next/image";
import Link from 'next/link';

export default function Home() {
	return (
		<main className="flex min-h-screen flex-col items-center justify-between p-24">
				<iframe src="https://giphy.com/embed/wsUAhrHlxwZX0eKYGF" className="min-w-[180px] min-h-[180px]" allowFullScreen>
				</iframe>
			<div className="z-10 max-w-5xl w-full flex flex-col gap-8 items-center justify-center font-mono text-sm lg:flex">
				<h1 className="text-4xl">Welcome to landing page</h1>
				<div className="flex justify-center gap-8">
					<button>
						<Link href={"/auth/register"}>Register</Link>
					</button>
					<button className="bg-mylightgreen hover:bg-mygreen text-black font-bold py-2 px-4 rounded-xl">
						<Link href={"/auth/login"}>Login</Link>
					</button>
				</div>
			</div>
		</main>
	);
}
