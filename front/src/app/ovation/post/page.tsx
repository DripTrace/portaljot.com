import Link from "next/link";

const Post = () => {
    return (
        <div className="fixed inset-0 bg-bgcolor bg-opacity-50 flex justify-center items-center">
            <div className="bg-neutral-600 p-6 rounded-md shadow-lg space-y-4">
                <textarea
                    className="w-full h-40 border border-neutral-600 rounded-md p-2"
                    placeholder="What's on your mind?"
                ></textarea>
                <button className="w-full bg-ovteal hover:bg-opacity-70 text-neutral-600 font-bold py-2 px-4 rounded">
                    Post
                </button>
                <Link href="/">
                    <div className="block text-center text-ovteal hover:text-opacity-70">
                        X
                    </div>
                </Link>
            </div>
        </div>
    );
};

export default Post;
