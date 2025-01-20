// "use client"; // Required for client-side code

// import { useEffect, useRef, useState } from "react";
// import NeuroCanvas from "./NeuroCanvas"; // Ensure the import path is correct

// const NeuralNoise: React.FC = () => {
//     const contentRef = useRef<HTMLDivElement>(null);
//     const [scrollProgress, setScrollProgress] = useState(0);

//     useEffect(() => {
//         const handleScroll = () => {
//             if (contentRef.current) {
//                 const scrollY = contentRef.current.scrollTop; // Scroll within this section
//                 const windowHeight = contentRef.current.clientHeight;
//                 const docHeight = contentRef.current.scrollHeight;
//                 const maxScroll = docHeight - windowHeight;

//                 const progress = scrollY / maxScroll;
//                 setScrollProgress(progress); // Update scroll progress state
//             }
//         };

//         const section = contentRef.current;
//         if (section) {
//             section.addEventListener("scroll", handleScroll);
//         }

//         return () => {
//             if (section) {
//                 section.removeEventListener("scroll", handleScroll);
//             }
//         };
//     }, []);

//     return (
//         <div
//             ref={contentRef}
//             className="relative overflow-auto h-screen"
//             style={{ height: "100vh" }}
//         >
//             {/* Content */}
//             <div className="min-h-[200vh] flex flex-col justify-center items-center text-[30vh] text-center">
//                 Scroll Inside This Area
//             </div>
//             <div className="h-[100vh] flex justify-center items-center text-[30vh] text-center">
//                 More Content to Scroll
//             </div>

//             {/* NeuroCanvas now receives scrollProgress as a prop */}
//             <NeuroCanvas scrollProgress={scrollProgress} />
//         </div>
//     );
// };

// export default NeuralNoise;

"use client"; // Required for client-side code

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import NeuroCanvas from "./NeuroCanvas"; // Ensure the import path is correct
import Image from "next/image";
import Link from "next/link";
import ConditionsTreated from "./ConditionsTreated";
import Services from "./Services";
import Slider from "react-slick";
import { FaQuoteLeft } from "react-icons/fa";

const SVGWave: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" {...props}>
        <path
            fill="#2a4365"
            fillOpacity="1"
            d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,112C672,96,768,96,864,112C960,128,1056,160,1152,160C1248,160,1344,128,1392,112L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
        ></path>
    </svg>
);

const NeuralNoise: React.FC = () => {
    const contentRef = useRef<HTMLDivElement>(null);
    const [scrollProgress, setScrollProgress] = useState(0);

    const handleScrollToServices = (e: React.MouseEvent) => {
        e.preventDefault();
        const servicesSection = document.getElementById("services");
        if (servicesSection) {
            servicesSection.scrollIntoView({ behavior: "smooth" });
        }
    };

    const handleClick = () => {
        if (
            /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
                navigator.userAgent
            )
        ) {
            window.location.href = "tel:9098804200";
        } else {
            window.location.href = "mailto:colton@lomalindapsych.com";
        }
    };

    const testimonials = [
        { quote: "I have never had a referral done so fast", author: "Carol" },
        {
            quote: "I feel extremely confident in him as a provider",
            author: "Shannon",
        },
        {
            quote: "...these people take care of their patients",
            author: "Richards D.",
        },
    ];

    const sliderSettings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 5000,
    };

    useEffect(() => {
        const handleScroll = () => {
            if (contentRef.current) {
                const scrollY = contentRef.current.scrollTop; // Scroll within this section
                const windowHeight = contentRef.current.clientHeight;
                const docHeight = contentRef.current.scrollHeight;
                const maxScroll = docHeight - windowHeight;

                const progress = scrollY / maxScroll;
                setScrollProgress(progress); // Update scroll progress state
            }
        };

        const section = contentRef.current;
        if (section) {
            section.addEventListener("scroll", handleScroll);
        }

        return () => {
            if (section) {
                section.removeEventListener("scroll", handleScroll);
            }
        };
    }, []);

    return (
        <div
            ref={contentRef}
            // className="relative overflow-auto h-screen"
            className="relative overflow-auto h-screen"
            style={{ height: "100vh" }}
        >
            {/* Content */}
            {/* <div className="min-h-[200vh] flex flex-col justify-center items-center text-[30vh] text-center">
                Scroll Inside This Area
            </div>
            <div className="h-[100vh] flex justify-center items-center text-[30vh] text-center">
                More Content to Scroll
            </div> */}

            <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="relative py-16 bg-white dark:bg-gray-800 transition-colors duration-300"
            >
                <div className="relative container mx-auto px-4 flex items-center justify-center py-4">
                    <div className="absolute size-full z-10 rounded-lg py-8 px-[2.1rem]">
                        <Image
                            src="/llpmg-hero-image.svg"
                            alt="llpmg-hero-img"
                            height={50}
                            width={150}
                            className="size-full object-cover z-20 rounded-lg"
                            priority
                        />
                    </div>
                    <div className="relative z-30 size-full bg-blue-100/50 dark:bg-gray-700/50 rounded-lg p-8 shadow-lg leading-[1.5rem] sm:leading-[4rem] 2xl:leading-[5rem] text-[0.8rem] sm:text-[1rem] 2xl:text-[2rem] flex flex-col items-center justify-center">
                        {/* Contact Number */}
                        <a
                            href="tel:+19098804200"
                            className="text-4xl font-bold bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 text-transparent bg-clip-text hover:from-green-400 hover:to-blue-500 hover:via-teal-300 transition duration-300 transform hover:scale-110 animate-pulse focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-opacity-50 flex items-center justify-center mb-4 text-center"
                        >
                            Direct Line: (909)-880-4200
                        </a>
                        {/* Introductory Heading */}
                        <h2 className="text-3xl font-black text-blue-900 dark:text-blue-300 mb-4 text-center tracking-normal sm:tracking-wide 2xl:tracking-widest">
                            Welcome to Loma Linda Psychiatric Medical Group
                        </h2>
                        <p className="text-gray-700 dark:text-gray-300 text-center tracking-tight sm:tracking-wider2xl:tracking-wide font-thin">
                            We are a behavioral health practice committed to
                            providing excellent mental health care. Our
                            multidisciplinary team of competent and
                            compassionate clinicians offers comprehensive
                            diagnostic and treatment services for all age groups
                            - children, adolescents, adults, and seniors.
                        </p>
                    </div>
                </div>
            </motion.section>

            <main className="container mx-auto px-4 py-8 gap-[5rem] space-y-[8rem] size-full z-40">
                {/* <Testimonials /> */}
                <section className="py-16 bg-white dark:bg-gray-800 relative overflow-hidden transition-colors duration-300 rounded-xl">
                    <div className="container mx-auto px-4 relative z-10">
                        <h2 className="text-3xl font-bold text-blue-900 dark:text-blue-300 mb-8 text-center">
                            What Our Patients Say
                        </h2>
                        <Slider {...sliderSettings}>
                            {testimonials.map((testimonial, index) => (
                                <div key={index} className="px-4">
                                    <div className="bg-blue-100 dark:bg-gray-700 p-8 rounded-lg shadow-lg relative transition-colors duration-300">
                                        <FaQuoteLeft className="text-4xl text-blue-500 dark:text-blue-400 absolute top-4 left-4 opacity-25" />
                                        <p className="text-xl mb-4 text-gray-700 dark:text-gray-300 italic">
                                            {testimonial.quote}
                                        </p>
                                        <p className="text-right font-semibold text-blue-900 dark:text-blue-300">
                                            - {testimonial.author}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </Slider>
                        <div className="mt-8 text-center z-50 relative top-[2rem]">
                            <Link
                                href="/llpmg/feedback"
                                className="inline-block bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out z-50"
                            >
                                Share Your Feedback
                            </Link>
                        </div>
                    </div>
                    <SVGWave
                        className="absolute bottom-0 left-0 w-full text-blue-900 dark:text-gray-900"
                        style={{ zIndex: 1 }}
                    />
                </section>

                <section className="mb-0 flex items-center justify-center flex-col relative max-h-[10rem] z-40">
                    <h2 className="text-3xl font-bold text-blue-900 mb-4 dark:text-blue-300">
                        Quick Links
                    </h2>
                    <div className="relative grid md:grid-cols-2 lg:grid-cols-3 gap-6 size-full">
                        <Link
                            href="/llpmg/why-choose-us"
                            className="bg-white/70 dark:bg-white/10 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 relative w-full"
                        >
                            <div className="absolute z-10 rounded-lg flex items-center justify-center top-0 right-0 h-[7rem]">
                                <Image
                                    src="/question.svg"
                                    alt="llpmg-services-img"
                                    height={50}
                                    width={150}
                                    className="relative object-fill z-20 rounded-lg size-[6rem]"
                                />
                            </div>
                            <h3 className="relative text-xl font-semibold mb-2 z-30 dark:text-blue-100">
                                Why Choose LLPMG
                            </h3>
                            {/* <div className="absolute">helo</div> */}
                            <p className="relative z-30 text-blue-500">
                                Learn about our mission, vision, and core
                                values.
                            </p>
                        </Link>
                        <a
                            onClick={(e) => handleScrollToServices(e)}
                            className="bg-white/70 dark:bg-white/10 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 relative w-full"
                        >
                            <div className="absolute z-10 rounded-lg flex items-center justify-center top-0 right-0 h-[7rem]">
                                <Image
                                    src="/services.svg"
                                    alt="llpmg-services-img"
                                    height={50}
                                    width={150}
                                    className="relative object-fill z-20 rounded-lg size-[6rem]"
                                />
                            </div>
                            <h3 className="relative text-xl font-semibold mb-2 z-30 dark:text-blue-100">
                                Our Services
                            </h3>
                            {/* <div className="absolute">helo</div> */}
                            <p className="relative z-30 text-blue-500">
                                Explore our comprehensive mental health
                                services.
                            </p>
                        </a>
                        <Link
                            href="/llpmg/locations"
                            className="bg-white/70 dark:bg-white/10 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 relative w-full"
                        >
                            <div className="absolute z-10 rounded-lg flex items-center justify-center top-0 right-0 h-[7rem]">
                                <Image
                                    src="/locations.svg"
                                    alt="llpmg-services-img"
                                    height={50}
                                    width={150}
                                    className="relative object-fill z-20 rounded-lg size-[6rem]"
                                />
                            </div>
                            <h3 className="relative text-xl font-semibold mb-2 z-30 dark:text-blue-100">
                                Our Locations
                            </h3>
                            {/* <div className="absolute">helo</div> */}
                            <p className="relative z-30 text-blue-500">
                                Find a Loma Linda Psychiatric Medical Group near
                                you.
                            </p>
                        </Link>
                    </div>
                </section>
                <ConditionsTreated />
                <Services id="services" />

                {/* <section id="contact-us" className="mb-12">
					<h2 className="text-3xl font-bold text-blue-900 mb-4 dark:text-blue-100">
						Contact Us
					</h2>
					<p className="mb-4 dark:text-blue-100 gap-[2-rem]">
						<span>
							For more information or to schedule an appointment,
							please contact us at
						</span>
						<a
							className="special-link"
							href="#"
							onClick={handleClick}
						>
							(909) 880-4200
						</a>
					</p>
				</section> */}
            </main>

            {/* NeuroCanvas now receives scrollProgress as a prop */}
            <NeuroCanvas scrollProgress={scrollProgress} />
        </div>
    );
};

export default NeuralNoise;
