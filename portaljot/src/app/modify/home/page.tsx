// import { withAuth } from "@/hooks/modify/withAuth";
// import { signOut } from "next-auth/react";
// import Link from "next/link";

// const PostHomePage = (props) => {
//   const { session } = props;
//   return (
//     session && (
//       <>
//         Signed in as {session.user.email} <br />
//         <button onClick={() => signOut()}>Sign out</button>
//         {session.accessToken && <pre>User has access token</pre>}
//         <Link href="/modify/home/posts">Go to posts</Link>
//       </>
//     )
//   );
// }

// export default withAuth(3 * 60)(PostHomePage);

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
	const { session, loading } = props as WithAuthProps;

	if (loading) return <div>Loading...</div>;
	if (!session) return <div>Not authenticated</div>;

	return (
		<div className="">
			Signed in as {session.user.email} <br />
			<button onClick={() => signOut()}>Sign out</button>
			{session.accessToken && <pre>User has access token</pre>}
			<Link href="/modify/home/posts">Go to posts</Link>
		</div>
	);
};

export default withAuth(3 * 60)(PostHomePage);
