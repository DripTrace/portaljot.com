import PlaceholderDocument from "@/components/warpcatch/PlaceholderDocument";
import { adminDb } from "@/config/warpcatch/firebaseAdmin";
import { auth } from "@clerk/nextjs/server";
import Document from "./Document";

const Documents = async () => {
	auth().protect();

	const { userId } = await auth();

	if (!userId) {
		throw new Error("User not found");
	}

	const documentsSnapshot = await adminDb
		.collection("users")
		.doc(userId)
		.collection("files")
		.get();

	return (
		<div className="flex flex-wrap p-5 bg-gray-100 justify-center lg:justify-start rounded-sm gap-5 max-w-7xl mx-auto">
			{documentsSnapshot.docs.map((doc) => {
				const { name, downloadUrl, size } = doc.data();

				return (
					<Document
						id={doc.id}
						key={doc.id}
						name={name}
						downloadUrl={downloadUrl}
						size={size}
					/>
				);
			})}

			<PlaceholderDocument />
		</div>
	);
};

export default Documents;
