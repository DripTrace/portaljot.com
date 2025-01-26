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
