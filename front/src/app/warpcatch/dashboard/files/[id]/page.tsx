import { auth } from "@clerk/nextjs/server";
import PDFView from "@/components/warpcatch/PDFView";
import Chat from "@/components/warpcatch/Chat";
import { adminDb } from "@/config/warpcatch/firebaseAdmin";

const ChatToFilePage = async ({
	params: { id },
}: {
	params: { id: string };
}) => {
	const authInstance = await auth();
	if ("userId" in authInstance) {
		const { userId } = authInstance;

		const ref = await adminDb
			.collection("users")
			.doc(userId!)
			.collection("files")
			.doc(id)
			.get();

		const url = ref.data()?.downloadUrl;

		return (
			<div className="grid lg:grid-cols-5 h-full overflow-hidden">
				<div className="col-span-5 lg:col-span-2 overflow-y-auto">
					<Chat id={id} />
				</div>
				<div className="col-span-5 lg:col-span-3 bg-gray-100 border-r-2 lg:border-indigo-600 lg:-order-1 overflow-auto">
					<PDFView url={url} />
				</div>
			</div>
		);
	} else {
		return <div>Please sign in to access this page.</div>;
	}
};

export default ChatToFilePage;
