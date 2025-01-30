// "use client";

// import { auth } from "@/firebase";
// import { signInWithCustomToken } from "firebase/auth";
// import { Session } from "next-auth";
// import { useSession } from "next-auth/react";
// import { useEffect } from "react";

// async function syncFirebaseAuth(session: Session) {
// 	if (session && session.nexusconjureToken) {
// 		try {
// 			await signInWithCustomToken(auth, session.nexusconjureToken);
// 		} catch (error) {
// 			console.error("Error signing in with custom token:", error);
// 		}
// 	} else {
// 		auth.signOut();
// 	}
// 	// console.log("SESSION(FirebaseAuthProvider.tsx): ", session);
// }

// export default function FirebaseAuthProvider({
// 	children,
// }: {
// 	children: React.ReactNode;
// }) {
// 	const { data: session } = useSession();

// 	useEffect(() => {
// 		if (!session) return;

// 		// Sync the Firebase auth state if the session changes.
// 		syncFirebaseAuth(session);
// 	}, [session]);

// 	return <>{children}</>;
// }

"use client";

import { useSession } from "next-auth/react";
import { useEffect } from "react";

/**
 * In Prisma-based apps, there's no client DB session to sync,
 * so we simply do nothing.
 * But you can add client-side checks or logs if needed.
 */
export default function PrismaAuthProvider({
	children,
}: {
	children: React.ReactNode;
}) {
	const { data: session } = useSession();

	useEffect(() => {
		// Optionally, do something when the NextAuth session changes,
		// like analytics, logs, or user greet messages.
		// There's no "Prisma sign-in" on the client side.
		if (session) {
			console.log("User is signed in via NextAuth:", session.user);
		} else {
			console.log("No active session.");
		}
	}, [session]);

	return <>{children}</>;
}
