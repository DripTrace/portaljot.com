// import ArcMenu from "@/components/ArcMenu";

// export default function PageLayout({
// 	children,
// }: {
// 	children: React.ReactNode;
// }) {
// 	return (
// 		<div className="min-h-screen bg-gray-100">
// 			<ArcMenu />
// 			<main className="p-8">{children}</main>
// 		</div>
// 	);
// }

// src/app/page.tsx
import ArcLayout from "@/components/ArcLayout";

export default function Page() {
	return (
		<ArcLayout>
			<div>The Arc</div>
		</ArcLayout>
	);
}
