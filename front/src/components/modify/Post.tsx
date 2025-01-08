// components/Post.tsx

import { TPost } from "@/types/modify/post";
import Link from "next/link";

type TPostProps = {
	post: TPost;
};

const Post = ({ post }: TPostProps) => {
	const { userId, postId, body, title } = post;

	return (
		<div className="p-6 bg-gray-800 bg-opacity-75 rounded-lg shadow-lg transform hover:scale-105 transition duration-300">
			<h2 className="text-2xl font-semibold text-blue-400 mb-2">
				{title}
			</h2>
			<p className="text-gray-300 text-sm mb-4">by User {userId}</p>
			<p className="text-gray-200">{body}</p>
			<div className="mt-4">
				<Link
					href={`/posts/${postId}`}
					className="text-blue-500 hover:text-blue-700 underline"
				>
					Read More
				</Link>
			</div>
		</div>
	);
};

export default Post;
