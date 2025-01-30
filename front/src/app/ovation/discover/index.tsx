"use client";
import { withAuth } from "@/utils/withAuth";
export const getServerSideProps = withAuth();
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import DiscoverMain from "@/components/Legacy/DiscoverMain";
import LeftSidebar from "@/components/Legacy/LeftSidebar";
import React from "react";
interface User {
    name?: string | null;
    email?: string | null;
    image?: string | null;
    // ...other properties...
}

interface Session {
    user?: User;
    // ...other properties...
}
const DiscoverPage = () => {
    const { data: session, status } = useSession();
    const router = useRouter();

    if (status === "loading") {
        return <p>Loading...</p>;
    }
    return (
        // <div className="w-full h-full flex justify-center items-center relative">
        //   <div className=" max-w-screen-2xl w-full h-full flex relative">
        <>
            <LeftSidebar />
            <DiscoverMain />
        </>
        //   </div>
        // </div>
    );
};

export default DiscoverPage;
