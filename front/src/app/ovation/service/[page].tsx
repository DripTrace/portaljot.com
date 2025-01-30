import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import LeftSidebar from "@/components/Legacy/LeftSidebar";
import Tos from "./tos";
import Privacy from "./privacy";

const Page: React.FC = () => {
    const router = useRouter();
    const { page } = router.query;
    const PAGES = {
        "terms-of-service": Tos,
        "privacy-policy": Privacy,
    };
    const PageComponent = PAGES[page as keyof typeof PAGES];
    console.log("Page query parameter:", page);
    console.log("PageComponent:", PageComponent);

    return (
        <div className="flex">
            <div className="w-1/3">
                <LeftSidebar />
            </div>
            <div className="text-white w-2/3 bg-bgcolor p-4 leading-relaxed text-lg">
                {PageComponent ? <PageComponent /> : <p>Page not found</p>}
            </div>
        </div>
    );
};
export default Page;
