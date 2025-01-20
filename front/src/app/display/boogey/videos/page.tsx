"use client";

import Layout from "@/components/display/Layout";
import Videos from "@/components/display/Media/Videos";
import { useRef } from "react";

const PhotosPage = () => {
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
                <Videos />
            </Layout>
        </>
    );
};

export default PhotosPage;
