"use client";

import Layout from "@/components/display/Layout";
import Images from "@/components/display/Media/Images";
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
                <Images />
            </Layout>
        </>
    );
};

export default PhotosPage;
