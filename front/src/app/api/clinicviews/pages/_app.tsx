import { AppProps } from "next/app";
import "@/styles/globals.css";

function ClinicViewsCom({ Component, pageProps }: AppProps) {
    return <Component {...pageProps} />;
}

export default ClinicViewsCom;
