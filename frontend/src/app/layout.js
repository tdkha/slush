import { Inter } from "next/font/google";
import "./globals.css";
import MobileProvider from "./context/mobileContext"

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
	title: "Dev Office app",
	description: "Built by Kha Tieu",
};

export default function RootLayout({ children })
{
	return (
		<html lang="en">
			<body className={inter.className}>
				<MobileProvider>
					{children}
				</MobileProvider>
			</body>
		</html>
	);
}
