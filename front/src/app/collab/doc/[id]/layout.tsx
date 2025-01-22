import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/modify/auth/route"; // Adjust path to your NextAuth config
import { redirect } from "next/navigation";
import RoomProvider from "@/components/collab/RoomProvider";

export default async function DocLayout({
	children,
	params: { id },
}: {
	children: React.ReactNode;
	params: { id: string };
}) {
	const session = await getServerSession(authOptions);

	if (!session?.user) {
		// If no valid session, redirect or handle as needed
		redirect("/api/modify/auth/login");
	}

	return <RoomProvider roomId={id}>{children}</RoomProvider>;
}
