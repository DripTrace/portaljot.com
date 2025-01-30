"use client";
import { withAuth } from "@/utils/withAuth";
export const getServerSideProps = withAuth();
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import LeftSidebar from "@/components/Legacy/LeftSidebar";
import PfpPost from "@/components/Legacy/PfpPost";
import ActiveBar from "@/components/Legacy/ActiveBar";
import Notifications from "@/components/Legacy/Notifications";
//import RightSearch from "@/components/RightSearch"

const NotificationsPage = () => {
    const { data: session, status } = useSession();
    const router = useRouter();

    if (status === "loading") {
        return <p>Loading...</p>;
    }
    return (
        <>
            <LeftSidebar />
            <Notifications />
        </>
    );
};

export default NotificationsPage;
