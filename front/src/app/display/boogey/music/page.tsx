"use client";

import Layout from "@/components/display/Layout";
import Audios from "@/components/display/Media/Audios";
import { useRef } from "react";

const MusicPage = () => {
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
            <Audios />
        </Layout>
    );
};

export default MusicPage;
