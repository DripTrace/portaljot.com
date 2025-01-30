"use client";
import { withAuth } from "@/utils/withAuth";
export const getServerSideProps = withAuth();
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import LeftSidebar from "@/components/Legacy/LeftSidebar";
import Profile from "@/components/Legacy/Profile";

const ProfileMain = () => {
    const { data: session, status } = useSession();
    const router = useRouter();

    let { id } = router.query;
    const userId = id ? Number(id) : null;
    const userb = userId !== null ? userId.toString() : "";

    useEffect(() => {
        if (status === "authenticated" && !session) {
            router.push("/signin");
        }
        if (userId === null && session?.user) {
            router.push(`/profile/${session.user.id}`);
        }
    }, [status, session, router, userId]);

    if (status === "loading") {
        return <p>Loading...</p>;
    }

    return (
        <>
            <div className="sidebar">
                <LeftSidebar />
            </div>

            <Profile userb={userb} />
        </>
    );
};

export default ProfileMain;
