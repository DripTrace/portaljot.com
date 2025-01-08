import ImageGenerator from "@/components/test/ImageGenerator";

export default function Home() {
	return (
		<main className="min-h-screen p-8">
			<h1 className="text-3xl font-bold text-center mb-8">
				DALL-E 3 Image Generator
			</h1>
			<ImageGenerator />
		</main>
	);
}
