import { auth } from "@clerk/nextjs/server";
import { adminDb } from "../../../../../firebaseAdmin";
import PDFView from "@/components/PDFView";
import Chat from "@/components/Chat";

const ChatToFilePage = async ({
	params: { id },
}: {
	params: { id: string };
}) => {
	auth().protect();
	const { userId } = auth();

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
};

export default ChatToFilePage;
