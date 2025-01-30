"use client";
// import { withAuth } from '../../utils/withAuth';
// export const getServerSideProps = withAuth();
// import { useSession } from 'next-auth/react'
// import { useRouter } from 'next/router'
// import { useEffect } from 'react'
// import LeftSidebar from "@/components/LeftSidebar"
// import InitiativePage from '@/components/InitiativePage';

import { withAuth } from "@/utils/withAuth";
import InitiativePage from "@/components/Legacy/InitiativePage";
import LeftSidebar from "@/components/Legacy/LeftSidebar";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

const InitiativeMain = () => {
    const { data: session, status } = useSession();
    const router = useRouter();

    if (status === "loading") {
        return <p>Loading...</p>;
    }

    return (
        <>
            <LeftSidebar />
            <InitiativePage />
        </>
    );
};

export default InitiativeMain;
