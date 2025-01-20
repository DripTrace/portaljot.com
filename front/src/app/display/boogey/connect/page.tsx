"use client";

import Layout from "@/components/display/Layout";
import { useRef } from "react";

const ConnectPage = () => {
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
            {/* ConnectComponent */}connect
        </Layout>
    );
};

export default ConnectPage;
