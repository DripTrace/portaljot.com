"use client";

import Layout from "@/components/display/Layout";
import { useRef } from "react";

const LoginPage = () => {
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
                {/* <LoginComponent /> */}login
            </Layout>
        </>
    );
};

export default LoginPage;
