"use client";

import Layout from "@/components/display/Layout";
import { useRef } from "react";

const HubPage = () => {
    const informationRef = useRef<HTMLDivElement>(null);
    const servicesRef = useRef<HTMLDivElement>(null);
    const policiesRef = useRef<HTMLDivElement>(null);

    return (
        <>
            <Layout
                informationReference={informationRef}
                servicesReference={servicesRef}
                policiesReference={policiesRef}
            >
                {/* <HubComponent /> */}hub
            </Layout>
        </>
    );
};

export default HubPage;
