import { AppProps } from "next/app";
import "@/styles/clinicviews/globals.css";

function ClinicViewsCom({ Component, pageProps }: AppProps) {
	return <Component {...pageProps} />;
}

export default ClinicViewsCom;
