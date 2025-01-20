import Layout from "@/components/merchandise/Layout";
import { AppProps } from "next/app";
import "@/styles/globals.css";

interface LayoutPageProps extends AppProps {
    children: React.ReactNode;
}

export default function LayoutPage({
    Component,
    pageProps,
    router,
    children,
}: LayoutPageProps) {
    return (
        // <Layout Component={Component} pageProps={pageProps} router={router}>
        <Layout>{children}</Layout>
    );
}
