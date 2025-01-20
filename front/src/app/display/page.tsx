"use client";

import { useRef } from "react";
import DisplayComponent from "@/components/display/DisplayComponent";
import Layout from "@/components/display/Layout";

const DisplayPage = () => {
    const informationRef = useRef<HTMLDivElement>(null);
    const servicesRef = useRef<HTMLDivElement>(null);
    const policiesRef = useRef<HTMLDivElement>(null);

    return (
        <Layout
            informationReference={informationRef}
            servicesReference={servicesRef}
            policiesReference={policiesRef}
        >
            <DisplayComponent
                informationReference={informationRef}
                servicesReference={servicesRef}
                policiesReference={policiesRef}
            />
        </Layout>
    );
};

export default DisplayPage;
