// import type { Metadata } from "next";
// import localFont from "next/font/local";
// import "@/styles/advancedpracticepsych/advpracpsy.css";
// import Script from "next/script";
// import Head from "next/head";

// const geistSans = localFont({
//     src: "../../fonts/GeistVF.woff",
//     variable: "--font-geist-sans",
//     weight: "100 900",
// });
// const geistMono = localFont({
//     src: "../../fonts/GeistMonoVF.woff",
//     variable: "--font-geist-mono",
//     weight: "100 900",
// });

// export const metadata: Metadata = {
//     title: "Advanced Practice",
//     description: "Advanced Practice Clinical Education",
// };

// export default function AdvPracPsyPRootLayout({
//     children,
// }: Readonly<{
//     children: React.ReactNode;
// }>) {
//     return (
//         // <AdvPracPsyProviderWrapper>
//         // <html lang="en">
//         //     <body
//         //         className={`${geistSans.variable} ${geistMono.variable} antialiased`}
//         //     >
//         //         {children}
//         //     </body>
//         // </html>
//         // </AdvPracPsyProviderWrapper>
//         <html lang="en" className="no-js">
//             <Head>
//                 <meta charSet="UTF-8" />
//                 <meta
//                     name="viewport"
//                     content="width=device-width, initial-scale=1"
//                 />
//                 <title>Sliced Text Effect | Advanced Practice</title>
//                 <meta
//                     name="description"
//                     content="A scroll-based sliced text animation for Advanced Practice, focusing on education in psychiatric practice."
//                 />
//                 <meta
//                     name="keywords"
//                     content="text effect, psychiatry, psychiatric education, animation, typography"
//                 />
//                 <meta name="author" content="Advanced Practice" />
//                 <link rel="shortcut icon" href="favicon.ico" />
//                 <Script strategy="beforeInteractive">
//                     document.documentElement.className = "js";
//                 </Script>
//             </Head>

//             <body className="loading">
//                 <Script
//                     src="https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js"
//                     strategy="beforeInteractive"
//                 />
//                 <Script
//                     src="/advanced-practice-psych/js/lenis.min.js"
//                     strategy="beforeInteractive"
//                 />
//                 <Script
//                     src="/advanced-practice-psych/js/gsap.min.js"
//                     strategy="beforeInteractive"
//                 />
//                 <Script
//                     src="/advanced-practice-psych/js/ScrollTrigger.min.js"
//                     strategy="beforeInteractive"
//                 />
//                 <Script
//                     src="/advanced-practice-psych/js/imagesloaded.pkgd.min.js"
//                     strategy="beforeInteractive"
//                 />
//                 <Script
//                     src="/advanced-practice-psych/js/utils.js"
//                     strategy="afterInteractive"
//                     type="module"
//                 />
//                 <Script
//                     src="/advanced-practice-psych/js/index.js"
//                     strategy="afterInteractive"
//                     type="module"
//                 />
//                 {children}
//             </body>
//         </html>
//     );
// }

import type { Metadata } from "next";
import localFont from "next/font/local";
import "@/styles/advancedpracticepsych/advpracpsy.css";
import Head from "next/head";
import AdvancedPracticePsychLogo from "@/components/AdvancedPracticePsych/AdvancedPracticePsychLogo";
import Script from "next/script";
// import { AMHProviderWrapper } from "@/wrappers/access-mentalhealth/Access-MentalHealthProvider";

// const geistSans = localFont({
//     src: "../../fonts/GeistVF.woff",
//     variable: "--font-geist-sans",
//     weight: "100 900",
// });
// const geistMono = localFont({
//     src: "../../fonts/GeistMonoVF.woff",
//     variable: "--font-geist-mono",
//     weight: "100 900",
// });

export const metadata: Metadata = {
    title: "Advanced Practice",
    description: "Advanced Practice Psych Education",
};

export default function AdvPracPsyRootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <Head>
                <meta charSet="UTF-8" />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
                <title>Sliced Text Effect | Advanced Practice</title>
                <meta
                    name="description"
                    content="A scroll-based sliced text animation for Advanced Practice, focusing on education in psychiatric practice."
                />
                <meta
                    name="keywords"
                    content="text effect, psychiatry, psychiatric education, animation, typography"
                />
                <meta name="author" content="Advanced Practice" />
                <link
                    rel="shortcut icon"
                    href="/advanced-practice-psych/favicon.ico"
                />
                {/* <link
                    rel="stylesheet"
                    type="text/css"
                    href="advanced-practice-psych/css/base.css"
                /> */}

                <Script src="https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js"></Script>
                {/* <Script src="/advanced-practice-psych/js/gsap.min.js"></Script>
                <Script src="/advanced-practice-psych/js/imagesloaded.pkgd.min.js"></Script>
                <Script src="/advanced-practice-psych/js/index.js"></Script>
                <Script src="/advanced-practice-psych/js/item.js"></Script>
                <Script src="/advanced-practice-psych/js/lenis.min.js"></Script>
                <Script src="/advanced-practice-psych/js/ScrollTrigger.min.js"></Script>
                <Script src="/advanced-practice-psych/js/utils.js"></Script> */}
            </Head>
            {/* <body className={`antialiased relative`}> */}
            <body className={``}>
                {children}
                {/* <html lang="en" className="no-js"> */}
                {/* <head> */}
                {/* <meta charSet="UTF-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1" />
		<title>Sliced Text Effect | Advanced Practice</title>
		<meta
			name="description"
			content="A scroll-based sliced text animation for Advanced Practice, focusing on education in psychiatric practice."
		/>
		<meta
			name="keywords"
			content="text effect, psychiatry, psychiatric education, animation, typography"
		/>
		<meta name="author" content="Advanced Practice" />
		<link rel="shortcut icon" href="favicon.ico" />
		<link rel="stylesheet" type="text/css" href="css/base.css" />
		<script src="https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js"></script>
		<script>
			document.documentElement.className = "js";
		</script>
	</head>
	<body className="loading"> */}
                {/* <main>
			<header className="frame frame--header">
				<h1 className="frame__title">Advanced Practice</h1>
				<a
					className="frame__back"
					href="https://advancedpracticepsych.com/about-us"
					>About Us</a
				>
				<a
					className="frame__prev"
					href="https://advancedpracticepsych.com/contact"
					>Contact</a
				>
				<a
					className="frame__sub"
					href="https://advancedpracticepsych.com/services"
					>Services</a
				>
			</header>
			<div className="deco">
				<div
					className="deco__item"
					style={{"backgroundImage": "url(advanced-practice-psych/img/images/1.jpg)"}}
				></div>
				<div
					className="deco__item"
					style={{"backgroundImage": "url(advanced-practice-psych/img/images/2.jpg)"}}
				></div>
				<div
					className="deco__item"
					style={{"backgroundImage": "url(advanced-practice-psych/img/images/3.jpg)"}}
				></div>
				<div
					className="deco__item"
					style={{"backgroundImage": "url(advanced-practice-psych/img/images/4.jpg)"}}
				></div>
				<div
					className="deco__item"
					style={{"backgroundImage": "url(advanced-practice-psych/img/images/5.jpg)"}}
				></div>
				<div
					className="deco__item"
					style={{"backgroundImage": "url(advanced-practice-psych/img/images/6.jpg)"}}
				></div>
				<div
					className="deco__item"
					style={{"backgroundImage": "url(advanced-practice-psych/img/images/7.jpg)"}}
				></div>
				<div
					className="deco__item"
					style={{"backgroundImage": "url(advanced-practice-psych/img/images/8.jpg)"}}
				></div>
				<div
					className="deco__item"
					style={{"backgroundImage": "url(advanced-practice-psych/img/images/9.jpg)"}}
				></div>
				<div
					className="deco__item"
					style={{"backgroundImage": "url(advanced-practice-psych/img/images/10.jpg)"}}
				></div>
				<div
					className="deco__item"
					style={{"backgroundImage": "url(advanced-practice-psych/img/images/11.jpg)"}}
				></div>
				<div
					className="deco__item"
					style={{"backgroundImage": "url(advanced-practice-psych/img/images/12.jpg)"}}
				></div>
				<div
					className="deco__item"
					style={{"backgroundImage": "url(advanced-practice-psych/img/images/13.jpg)"}}
				></div>
				<div
					className="deco__item"
					style={{"backgroundImage": "url(advanced-practice-psych/img/images/14.jpg)"}}
				></div>
				<div
					className="deco__item"
					style={{"backgroundImage": "url(advanced-practice-psych/img/images/15.jpg)"}}
				></div>
				<div
					className="deco__item"
					style={{"backgroundImage": "url(advanced-practice-psych/img/images/16.jpg)"}}
				></div>
				<div
					className="deco__item"
					style={{"backgroundImage": "url(advanced-practice-psych/img/images/17.jpg)"}}
				></div>
				<div
					className="deco__item"
					style={{"backgroundImage": "url(advanced-practice-psych/img/images/18.jpg)"}}
				></div>
			</div>

			<div className="content">
				<p>
					At Advanced Practice,<br />
					We are committed to advancing the knowledge<br />
					of mental health professionals.<br />
					You'd enhance your skills through our curated programs<br />
					and deepen your understanding of psychiatric care.
				</p>

				<h2
					className="gtext size-s font-4 end"
					data-text="Enhance Your Practice"
				>
					Enhance Your Practice
				</h2>
				<h2
					className="gtext size-s font-4 end"
					data-text="Enhance Your Practice"
				>
					Enhance Your Practice
				</h2>
			</div>

			<div className="content content--full">
				<h3
					className="gtext size-xxl font-5 shadow-1 spaced"
					data-text="expertise"
					data-effect="1"
				>
					expertise
				</h3>
			</div>

			<div className="content">
				<p>
					For years, we have dedicated ourselves to helping
					psychiatric professionals<br />
					gain new insights and skills.<br />
					You'd grow your expertise through our evidence-based
					learning modules<br />
					and expand your knowledge of modern psychiatric practice.
				</p>

				<h2
					className="gtext size-s font-5 end"
					data-text="Expand Your Knowledge"
				>
					Expand Your Knowledge
				</h2>
			</div>

			<div className="content content--full">
				<h3
					className="gtext size-xl font-4 shadow-2 color-1 spaced"
					data-text="education"
					data-effect="2"
				>
					education
				</h3>
			</div>

			<div className="content">
				<p>
					Through quiet reflection and rigorous study,<br />
					You can elevate your psychiatric practice.<br />
					You'd find clarity through our well-structured courses<br />
					and feel empowered to bring new ideas into your work.
				</p>

				<h2 className="gtext size-s font-1 end" data-text="Start Learning">
					Start Learning
				</h2>
				<h2 className="gtext size-s font-1 end" data-text="Start Learning">
					Start Learning
				</h2>
			</div>

			<div className="content content--full">
				<h3
					className="gtext size-xl font-7 shadow-1 spaced"
					data-text="growth"
					data-effect="3"
				>
					growth
				</h3>
			</div>

			<div className="content content--full">
				<h2
					className="gtext size-m font-7 end end"
					data-text="Continue Your Journey"
				>
					Continue Your Journey
				</h2>
			</div>

			<div className="content">
				<p>
					In a world of ever-evolving mental health challenges,<br />
					We stand ready to help you stay informed.<br />
					You'd stay updated on the latest research and techniques<br />
					and bring fresh approaches to your practice.
				</p>
			</div>

			<div className="content content--full">
				<h3
					className="gtext size-xl font-2 shadow-2 color-1 blendmode-1 spaced"
					data-text="innovation"
					data-effect="4"
				>
					innovation
				</h3>
			</div>

			<div className="content content--full">
				<h2
					className="gtext size-m font-4 end end"
					data-text="Embrace New Knowledge"
				>
					Embrace New Knowledge
				</h2>
			</div>

			<div className="content">
				<p>
					With the right educational resources,<br />
					Even the most complex psychiatric challenges can be met.<br />
					You'd discover new possibilities through our training
					programs<br />
					and explore innovations that lead to improved patient care.
				</p>

				<h2 className="gtext size-s font-1 end" data-text="Lead the Change">
					Lead the Change
				</h2>
				<h2 className="gtext size-s font-1 end" data-text="Lead the Change">
					Lead the Change
				</h2>
			</div>

			<div className="content content--full">
				<h3
					className="gtext size-xxl font-6 shadow-1 spaced"
					data-text="professionalism"
					data-effect="5"
				>
					professionalism
				</h3>

				<p>
					As you grow in your career,<br />
					You'd feel empowered to make a lasting impact in psychiatric
					care.<br />
					Our programs are designed to enhance your professional
					journey,<br />
					fostering confidence and competence.
				</p>
			</div>

			<div className="content">
				<h2
					className="gtext size-s font-1 end"
					data-text="Take the Next Step"
				>
					Take the Next Step
				</h2>
				<h2
					className="gtext size-s font-1 end"
					data-text="Take the Next Step"
				>
					Take the Next Step
				</h2>
			</div>

			<div className="content content--full">
				<h3
					className="gtext size-xl font-3 shadow-1 spaced"
					data-text="clarity"
					data-effect="6"
				>
					clarity
				</h3>

				<p>
					Our mission at Advanced Practice<br />
					is to guide you through every step of your professional
					journey.<br />
					You'd gain clarity and confidence as you evolve as a
					psychiatric practitioner,<br />
					and embrace the knowledge that will help you thrive.
				</p>
			</div>

			<footer className="frame frame--footer">
				<span
					>Created by
					<a href="https://x.com/advancedpracticepsych"
						>@AdvancedPracticePsych</a
					></span
				>
				<a href="https://advancedpracticepsych.com/subscribe"
					>Subscribe</a
				>
			</footer>
		</main> */}

                {/* <script src="js/imagesloaded.pkgd.min.js"></script>
		<script src="js/gsap.min.js"></script>
		<script src="js/ScrollTrigger.min.js"></script>
		<script src="js/lenis.min.js"></script>
		<script type="module" src="js/index.js"></script> */}
                {/* </body>
</html> */}
            </body>
            {/* <main> */}
            {/* {children} */}
            {/* </main> */}

            <AdvancedPracticePsychLogo
                id="advanced-practice-psych-logo"
                className="text-blue-900 absolute top-[1rem] right-[1rem] h-[9rem] w-[9rem] z-50"
            />
        </html>
    );
}
