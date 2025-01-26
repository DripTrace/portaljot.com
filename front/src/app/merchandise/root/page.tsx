import RootClientComponent from "@/components/merchandise/root/RootClientComponent";
import RootServerComponent from "@/components/merchandise/root/RootServerComponent";

const RootPage = () => {
	return (
		<main>
			<h1>Styled Components SSR with App Router</h1>
			<RootServerComponent />
			<RootClientComponent />
		</main>
	);
};

export default RootPage;
