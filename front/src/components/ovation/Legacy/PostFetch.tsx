"use_client";
import { withAuth } from "@/utils/withAuth";
export const getServerSideProps = withAuth();
import { useEffect, useState } from "react";
import { PiHouse } from "react-icons/pi";
import Link from "next/link";
import PostForBlogModal from "./PostForBlogModal";

type Post = {
    id: number;
    title: string;
    content: string;
    date: string;
    user_id: number;
    username: string;
    pfp_image: string;
};

const PostFetch = () => {
    const [posts, setPosts] = useState<Post[]>([]);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        const fetchPosts = async () => {
            const res = await fetch("/api/fetchPosts");
            const data = await res.json();

            const [innerArray] = data;

            setPosts(innerArray);
        };

        fetchPosts();
    }, [showModal]);
    const handleOpenModal = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };
    return (
        <main className="ml-[400px] flex w-[1040px] h-full min-h-[1350px] flex-col border-r border-l border-neutral-600">
            <div className="border-b border-neutral-600 h-40 bg-bgcolor sticky top-0">
                <div className="flex text-ovteal justify-center mt-8">
                    <h1 className="text-2xl font-bold">
                        <PiHouse size={50} />
                    </h1>
                    <button
                        onClick={handleOpenModal}
                        className="absolute bottom-4 right-4 px-4 py-2 bg-bgcolor w-52 border border-ovteal text-white mt-4 hover:bg-white/10 rounded-full"
                    >
                        New Post
                    </button>
                </div>
                {showModal && (
                    <PostForBlogModal
                        show={showModal}
                        onClose={handleCloseModal}
                    >
                        Your content here
                    </PostForBlogModal>
                )}
            </div>
            <div className="flex flex-col">
                {posts.length > 0 ? (
                    posts.map((post) => (
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

export default PostFetch;
