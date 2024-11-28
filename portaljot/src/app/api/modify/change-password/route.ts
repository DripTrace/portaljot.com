// import { NextApiRequest, NextApiResponse } from "next";
// import { getSession } from "next-auth/react";
// import {
// 	collection,
// 	query,
// 	getDocs,
// 	where,
// 	doc,
// 	updateDoc,
// 	DocumentData,
// 	QueryDocumentSnapshot,
// } from "firebase/firestore";
// import {
// 	hashPassword,
// 	verifyPassword,
// } from "@/lib/modify/authentication/password";
// import { firestoreConnect } from "@/config/firebase/firestore";
// // import { firestoreConnect } from "@/lib/merchandise/database/firebaseFirestore";
// // import { hashPassword, verifyPassword } from "@/lib/merchandise/password-auth";

// interface PasswordChangeRequest {
// 	oldPassword: string;
// 	newPassword: string;
// }

// interface UserDocument extends DocumentData {
// 	_id: string;
// 	email: string;
// 	password: string;
// }

// async function passwordHandler(
// 	req: NextApiRequest,
// 	res: NextApiResponse
// ): Promise<void> {
// 	if (req.method !== "PATCH") {
// 		res.setHeader("Allow", ["PATCH"]);
// 		res.status(405).json({ message: `Method ${req.method} Not Allowed` });
// 		return;
// 	}

// 	const session = await getSession({ req });

// 	if (!session) {
// 		res.status(401).json({ message: "Not authenticated!" });
// 		return;
// 	}

// 	const userEmail = session.user?.email;
// 	if (!userEmail) {
// 		res.status(400).json({ message: "User email not found in session." });
// 		return;
// 	}

// 	const { oldPassword, newPassword } = req.body as PasswordChangeRequest;

// 	if (!oldPassword || !newPassword) {
// 		res.status(400).json({
// 			message: "Old password and new password are required.",
// 		});
// 		return;
// 	}

// 	const db = firestoreConnect;

// 	const AuthenticationQuery = query(
// 		collection(db, "users"),
// 		where("email", "==", userEmail)
// 	);

// 	const authSnapshot = await getDocs(AuthenticationQuery);

// 	const userDocuments: UserDocument[] = authSnapshot.docs.map(
// 		(doc: QueryDocumentSnapshot<DocumentData>) => ({
// 			...doc.data(),
// 			_id: doc.id,
// 		})
// 	) as UserDocument[];

// 	const user = userDocuments[0];

// 	if (!user) {
// 		res.status(404).json({ message: "User not found." });
// 		return;
// 	}

// 	const currentPassword = user.password;
// 	const passwordsAreEqual = await verifyPassword(
// 		oldPassword,
// 		currentPassword
// 	);

// 	if (!passwordsAreEqual) {
// 		res.status(403).json({ message: "Invalid Password!" });
// 		return;
// 	}

// 	const hashedPassword = await hashPassword(newPassword);

// 	const userRef = doc(db, "users", user._id);

// 	try {
// 		await updateDoc(userRef, {
// 			email: userEmail,
// 			password: hashedPassword,
// 		});

// 		res.status(200).json({ message: "Password updated!" });
// 	} catch (error) {
// 		console.error("Error updating password:", error);
// 		res.status(500).json({
// 			message: "Failed to update password. Please try again.",
// 		});
// 	}
// }

// export default passwordHandler;

import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import {
	collection,
	query,
	getDocs,
	where,
	doc,
	updateDoc,
	DocumentData,
	QueryDocumentSnapshot,
} from "firebase/firestore";
import {
	hashPassword,
	verifyPassword,
} from "@/lib/modify/authentication/password";
import { firestoreConnect } from "@/config/firebase/firestore";

interface PasswordChangeRequest {
	oldPassword: string;
	newPassword: string;
}

interface UserDocument extends DocumentData {
	_id: string;
	email: string;
	password: string;
}

export async function PATCH(req: NextRequest): Promise<NextResponse> {
	const token = await getToken({ req });

	if (!token) {
		return NextResponse.json(
			{ message: "Not authenticated!" },
			{ status: 401 }
		);
	}

	const userEmail = token.email;
	if (!userEmail) {
		return NextResponse.json(
			{ message: "User email not found in session." },
			{ status: 400 }
		);
	}

	const { oldPassword, newPassword } =
		(await req.json()) as PasswordChangeRequest;

	if (!oldPassword || !newPassword) {
		return NextResponse.json(
			{
				message: "Old password and new password are required.",
			},
			{ status: 400 }
		);
	}

	const db = firestoreConnect;

	const AuthenticationQuery = query(
		collection(db, "users"),
		where("email", "==", userEmail)
	);

	const authSnapshot = await getDocs(AuthenticationQuery);

	const userDocuments: UserDocument[] = authSnapshot.docs.map(
		(doc: QueryDocumentSnapshot<DocumentData>) => ({
			...doc.data(),
			_id: doc.id,
		})
	) as UserDocument[];

	const user = userDocuments[0];

	if (!user) {
		return NextResponse.json(
			{ message: "User not found." },
			{ status: 404 }
		);
	}

	const currentPassword = user.password;
	const passwordsAreEqual = await verifyPassword(
		oldPassword,
		currentPassword
	);

	if (!passwordsAreEqual) {
		return NextResponse.json(
			{ message: "Invalid Password!" },
			{ status: 403 }
		);
	}

	const hashedPassword = await hashPassword(newPassword);

	const userRef = doc(db, "users", user._id);

	try {
		await updateDoc(userRef, {
			email: userEmail,
			password: hashedPassword,
		});

		return NextResponse.json(
			{ message: "Password updated!" },
			{ status: 200 }
		);
	} catch (error) {
		console.error("Error updating password:", error);
		return NextResponse.json(
			{
				message: "Failed to update password. Please try again.",
			},
			{ status: 500 }
		);
	}
}
