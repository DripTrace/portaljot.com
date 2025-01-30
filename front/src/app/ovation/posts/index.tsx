import { useRouter } from "next/router";
import PostFetch from "@/components/Legacy/PostFetch";
import LeftSidebar from "@/components/Legacy/LeftSidebar";

const AllPostsPage = () => {
    const router = useRouter();
    const { msgId } = router.query;

    return (
        <div>
            <LeftSidebar />
            <PostFetch />
        </div>
    );
};

export default AllPostsPage;
