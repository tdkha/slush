export default function AuthLayout({children})
{

	return (
		<main className="abstract-background flex min-h-screen  flex-col items-center justify-between p-24">
			{children}
		</main>
	);
} 