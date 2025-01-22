import LiveBlocksProvider from "@/components/collab/LiveBlocksProvider";

function PageLayout({ children }: { children: React.ReactNode }) {
	return <LiveBlocksProvider>{children}</LiveBlocksProvider>;
}

export default PageLayout;
