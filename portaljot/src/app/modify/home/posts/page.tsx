"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { TPost } from "@/types/modify/post";
import { withAuth } from "@/hooks/modify/withAuth";
import Post from "@/components/modify/Post";
import { isEqual } from "lodash";
import { Session } from "next-auth";

type WithAuthProps = {
	session: (Session & { accessToken?: string }) | null;
	loading: boolean;
};

const PostsPage = (props: Record<string, any>) => {
	const { session, loading } = props as WithAuthProps;
	const [posts, setPosts] = useState<TPost[]>([]);
	const [fetchingPosts, setFetchingPosts] = useState<boolean>(false);

	useEffect(() => {
		console.log("SESSION [POSTSPAGE]: ", session);

		if (!session || !session.user) {
			console.log("No session or user available");
			return; // Prevent fetch if no session or user
		}

		// Now TypeScript recognizes accessToken on session.user
		const accessToken = session.accessToken;

		if (!accessToken) {
			console.log("No access token available");
			return; // Prevent fetch if no access token
		}

		console.log("Session before fetch:", session);
		console.log("Access Token:", accessToken);

		async function getPosts() {
			console.log(
				"Authorization Header:",
				`Bearer ${session ? (session.user as { accessToken: string }).accessToken : ""}`
			);

			setFetchingPosts(true);
			try {
				console.log("SESSION DURING FETCH[POSTSPAGE]: ", session);
				console.log("FETCHING POSTS[POSTSPAGE]: ", fetchingPosts);
				const response = await fetch(
					// `${process.env.BACKEND_API_BASE}/api/posts/`,
					`http://127.0.0.1:8001/api/posts/`,
					{
						method: "GET",
						headers: new Headers({
							// Authorization: `Bearer ${session?.user.accessToken}`,
							Authorization: `Bearer ${accessToken}`,
							"Content-Type": "application/json",
						}),
						// headers: {
						// 	Authorization: `Bearer ${session?.user.accessToken}`,
						// 	"Content-Type": "application/json",
						// },
					}
				);

				console.log("RESPONSE [POSTSPAGE]: ", response.clone());

				if (response.ok) {
					const postData: TPost[] = await response.json();
					console.log("POSTS DATA: ", postData);
					if (!isEqual(posts, postData)) {
						setPosts(postData);
					}
				} else {
					console.error("Error fetching posts:", response.statusText);
				}
			} catch (error) {
				console.error("Error in getPosts:", error);
			}
			setFetchingPosts(false);
		}

		getPosts();
		const intervalId = setInterval(getPosts, 10 * 1000);

		return () => clearInterval(intervalId);
	}, [session, posts]);

	if (loading) return <div>Loading...</div>;
	if (!session) return <div>Not authenticated</div>;

	return (
		<div className="absolute top-[50vh]">
			<h2>Fetched at {JSON.stringify(new Date())}</h2>
			<Link href="/modify/home">Back to homepage</Link>
			{posts.map((post) => (
				<Post key={post.postId} post={post} />
			))}
		</div>
	);
};

export default withAuth(3 * 60)(PostsPage);
