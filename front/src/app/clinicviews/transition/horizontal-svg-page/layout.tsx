import { Metadata } from "next";
import "@/styles/effects/horizontal-svg-page.css";
import Script from "next/script";
import Head from "next/head";

export const metadata: Metadata = {
    title: "LLPMG",
    description: "Loma Linda Psychiatric Medical Group",
};

export default function HSPRootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        // <html lang="en">
        //     <body>{children}</body>
        // </html>
        <html lang="en" className="no-js">
            <Head>
                <meta charSet="UTF-8" />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
                <title>
                    Sketch 021: SVG Path Page Transition (Vertical) Demo |
                    Codrops
                </title>
                <meta
                    name="description"
                    content="A page transition with an animated SVG path."
                />
                <meta
                    name="keywords"
                    content="page transition, codrops sketch, svg path"
                />
                <meta name="author" content="Codrops" />
                <link
                    rel="shortcut icon"
                    href="https://tympanus.net/Sketches/favicon.ico"
                />
                {/* <link rel="stylesheet" type="text/css" href="/base.css" /> */}
                <Script id="support-css-vars">
                    {`
				document.documentElement.className="js";
				var supportsCssVars=function(){var e,t=document.createElement("style");return t.innerHTML="root: { --tmp-var: bold; }",document.head.appendChild(t),e=!!(window.CSS&&window.CSS.supports&&window.CSS.supports("font-weight","var(--tmp-var)")),t.parentNode.removeChild(t),e};
				supportsCssVars()||alert("Please view this demo in a modern browser");
			`}
                </Script>
                <Script src="https://tympanus.net/codrops/adpacks/analytics.js"></Script>
            </Head>
            <body>
                <main>
                    <div className="frame">
                        <h1 className="frame__title">
                            Sketch 021: SVG Path Page Transition (Vertical)
                        </h1>
                        <nav className="frame__links">
                            <a href="https://github.com/codrops/codrops-sketches/tree/main/021-svg-path-page-transition-vertical">
                                GitHub
                            </a>
                            <a href="https://tympanus.net/codrops/sketches">
                                Archive
                            </a>
                        </nav>
                    </div>
                    <div className="view view--1">
                        <button
                            className="unbutton button button--open"
                            aria-label="Open other view"
                        >
                            Open
                        </button>
                    </div>
                    <div className="view view--2">
                        <button
                            className="unbutton button button--close"
                            aria-label="Close current view"
                        >
                            Back
                        </button>
                    </div>
                    <svg
                        className="overlay"
                        width="100%"
                        height="100%"
                        viewBox="0 0 100 100"
                        preserveAspectRatio="none"
                    >
                        <path
                            className="overlay__path"
                            vector-effect="non-scaling-stroke"
                            d="M 0 100 V 100 Q 50 100 100 100 V 100 z"
                        />
                    </svg>
                </main>
                <Script src="https://tympanus.net/codrops/adpacks/cda_sponsor.js"></Script>
                <Script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.9.1/gsap.min.js"></Script>
                <Script src="effects/horizontal-svg-page/index.js"></Script>
            </body>
        </html>
    );
}
