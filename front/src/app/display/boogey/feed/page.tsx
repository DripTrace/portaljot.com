"use client";

import Layout from "@/components/display/Layout";
import { useRef } from "react";

const FeedPage = () => {
    // Create references for the required props
    const informationRef = useRef<HTMLDivElement>(null);
    const servicesRef = useRef<HTMLDivElement>(null);
    const policiesRef = useRef<HTMLDivElement>(null);

    return (
        <Layout
            informationReference={informationRef}
            servicesReference={servicesRef}
            policiesReference={policiesRef}
        >
            {/* <FeedComponent /> */}feed
        </Layout>
    );
};

export default FeedPage;
