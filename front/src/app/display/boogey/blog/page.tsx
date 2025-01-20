"use client";

import Layout from "@/components/display/Layout";
import Blog from "@/components/display/Media/Blogs";
import { useRef } from "react";

const BlogPage = () => {
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
            <Blog />
        </Layout>
    );
};

export default BlogPage;
