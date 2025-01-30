import { useEffect, useState } from "react";
import Link from "next/link";

type Post = {
    id: number;
    title: string;
    content: string;
    date: string;
    user_id?: number;
    username?: string;
    pfp_image?: string;
};

type ProfilePostFetchProps = {
    postsString: string;
};

const ProfilePostFetch: React.FC<ProfilePostFetchProps> = ({ postsString }) => {
    const [posts, setPosts] = useState<Post[]>([]);

    useEffect(() => {
        if (postsString) {
            const postsArray = postsString.split(" | ").map((postString) => {
                const [id, title, content, date] = postString.split(";");
                return { id: Number(id), title, content, date };
            });
            setPosts(postsArray);
        }
    }, [postsString]);

    return (
        <main className="flex w-full h-full mb-11 flex-col border-r border-l border-neutral-600">
            <div className="flex flex-col">
                {posts.length > 0 ? (
                    [...posts].reverse().map((post) => (
                        <div
                            key={post.id}
                            className="border-t-0.5 p-4 border-b flex space-x-4 border-neutral-600"
                        >
                            <div className="flex justify-center items-center">
                                <div className="flex flex-col items-center mr-5">
                                    <Link
                                        href={`/profile/${post.user_id}`}
                                        className="flex flex-col items-center font-bold mr-1 hover:text-ovteal"
                                    >
                                        <img
                                            src={`/images/users/${post.user_id}/${post.pfp_image}`}
                                            alt={post.username}
                                            className="w-11 h-11 text-ovteal rounded-full mr-2 object-cover"
                                            onError={(e) => {
                                                (
                                                    e.target as HTMLImageElement
                                                ).src = "/defaultPfp.svg";
                                            }}
                                        />
                                        {post.username}
                                    </Link>
                                </div>
                                <div>
                                    <h2 className="text-xl font-bold">
                                        {post.title}
                                    </h2>
                                    <p className="text-sm text-gray-400">
                                        {new Date(
                                            post.date
                                        ).toLocaleDateString()}
                                    </p>
                                    <p>{post.content}</p>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="p-20">No posts</p>
                )}
            </div>
        </main>
    );
};

export default ProfilePostFetch;
