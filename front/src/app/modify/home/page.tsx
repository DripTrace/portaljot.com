"use client";

import { Session } from "next-auth";
import { withAuth } from "@/hooks/modify/withAuth";
import { signOut } from "next-auth/react";
import Link from "next/link";

type WithAuthProps = {
	session: (Session & { accessToken?: string }) | null;
	loading: boolean;
};

const PostHomePage = (props: Record<string, any>) => {
	console.log("=== PostHomePage Rendered ===");
	console.log("Incoming props:", props);

	const { session, loading } = props as WithAuthProps;

	console.log("Session object:", session);
	console.log("Loading state:", loading);

	// Flow #1: Still loading user session
	if (loading) {
		console.log("Still loading user session...");
		return <div>Loading...</div>;
	}

	// Flow #2: Session not present => user not authenticated
	if (!session) {
		console.log("No session found, user is not authenticated.");
		return <div>Not authenticated</div>;
	}

	// Flow #3: Session present => user is authenticated
	console.log("User is authenticated with session data.");

	// Optional: We can wrap signOut in a custom function to log sign-out action
	const handleSignOut = async () => {
		console.log("Sign out button clicked, initiating signOut().");
		await signOut();
		console.log("User has signed out.");
	};

	return (
		<div className="text-white">
			<p>Signed in as {session.user.email}</p>
			<button className="text-white" onClick={handleSignOut}>
				Sign out
			</button>
			<br />
			{session.accessToken && <pre>User has access token</pre>}

			<Link className="text-white" href="/modify/home/posts">
				Go to posts
			</Link>
		</div>
	);
};

export default withAuth(3 * 60)(PostHomePage);
