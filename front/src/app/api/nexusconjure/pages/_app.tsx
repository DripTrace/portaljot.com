import { AppProps } from "next/app";
import "@/styles/globals.css";

function TheBase({ Component, pageProps }: AppProps) {
    return <Component {...pageProps} />;
}

export default TheBase;
