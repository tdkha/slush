export default function DashboardLayout({children})
{
	return (
		<main className="abstract-background flex min-h-screen  flex-col items-center justify-between p-10 md:p-24">
			{children}
		</main>
	);
} 