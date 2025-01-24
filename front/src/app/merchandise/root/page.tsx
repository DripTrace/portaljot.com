import RootServerComponent from "@/components/merchandise/root/RootServerComponent";
import RootClientComponent from "@/components/merchandise/root/RootClientComponent";

export default const RootPage = () => {
	return (
		<main>
			<h1>Styled Components SSR with App Router</h1>
			<RootServerComponent />
			<RootClientComponent />
		</main>
	);
}
