"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Testimonials from "./Testimonials";
import ConditionsTreated from "./ConditionsTreated";
import Slider from "react-slick";
import { FaQuoteLeft } from "react-icons/fa";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image from "next/image";
import Services from "./Services";
import Video from "next-video";

const SVGWave: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
	<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" {...props}>
		<path
			fill="#2a4365"
			fillOpacity="0.8"
			// fillOpacity="1"
			d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,112C672,96,768,96,864,112C960,128,1056,160,1152,160C1248,160,1344,128,1392,112L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
		></path>
	</svg>
);

const SVGBrain: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
	<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
		<path
			fill="currentColor"
			d="M13,3V4.8C17.33,5.3 20.3,9.4 20.3,14C20.3,15.92 19.75,17.73 18.82,19.3L20.06,20.54C21.21,18.68 21.9,16.43 21.9,14C21.9,8.6 18.41,3.8 13,3.2V1H11V3.2C5.59,3.8 2.1,8.6 2.1,14C2.1,16.43 2.79,18.68 3.94,20.54L5.18,19.3C4.25,17.73 3.7,15.92 3.7,14C3.7,9.4 6.67,5.3 11,4.8V3H13M12,6A8,8 0 0,0 4,14A8,8 0 0,0 12,22A8,8 0 0,0 20,14A8,8 0 0,0 12,6M12,8A6,6 0 0,1 18,14A6,6 0 0,1 12,20A6,6 0 0,1 6,14A6,6 0 0,1 12,8M12,10A4,4 0 0,0 8,14A4,4 0 0,0 12,18A4,4 0 0,0 16,14A4,4 0 0,0 12,10Z"
		/>
	</svg>
);

const SVGHeart: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
	<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
		<path
			fill="currentColor"
			d="M12,21.35L10.55,20.03C5.4,15.36 2,12.27 2,8.5C2,5.41 4.42,3 7.5,3C9.24,3 10.91,3.81 12,5.08C13.09,3.81 14.76,3 16.5,3C19.58,3 22,5.41 22,8.5C22,12.27 18.6,15.36 13.45,20.03L12,21.35Z"
		/>
	</svg>
);

const Landing: React.FC = () => {
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

	return (
		<div
			// className="size-full bg-blue-50 dark:bg-gray-900 transition-colors duration-300 relative z-40">
			// className="size-full transition-colors duration-300 relative z-40"
			className="relative min-h-screen overflow-x-hidden w-full"
		>
			<div className="fixed top-0 left-0 w-full h-full z-0">
				<video
					autoPlay
					muted
					loop
					className="object-cover w-full h-full"
					src="https://firebasestorage.googleapis.com/v0/b/photo-gallery-upload.appspot.com/o/5598970-uhd_3840_2160_24fps.mp4?alt=media&token=32d9c1a3-66e6-4a61-aa21-b8a3a267c170"
				>
					{/* <source
                        src="https://firebasestorage.googleapis.com/v0/b/photo-gallery-upload.appspot.com/o/5598970-uhd_3840_2160_24fps.mp4?alt=media&token=32d9c1a3-66e6-4a61-aa21-b8a3a267c170"
                        type="video/mp4"
                    /> */}
					Your browser does not support the video tag.
				</video>
				{/* <Video src="https://firebasestorage.googleapis.com/v0/b/photo-gallery-upload.appspot.com/o/7895836-hd_1920_1080_30fps.mp4?alt=media&token=afc7edd0-df45-413e-9d8c-38235b7b1d42" /> */}
			</div>
			<div className="fixed top-0 left-0 w-full h-full bg-black/30 dark:bg-black/50 z-10"></div>
			<div className="relative z-20 w-full">
				<motion.section
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5 }}
					// className="relative py-16 bg-white dark:bg-gray-800 transition-colors duration-300"
					// className="relative bg-white/50 dark:bg-gray-800/50 transition-colors duration-300 h-screen flex items-center justify-center"
					className="relative min-h-[55rem] flex flex-col items-center justify-center space-y-[5rem]"
				>
					{/* <video
                    autoPlay
                    muted
                    loop
                    src="/clinicviews/background/images/calm.mp4"
                    className="absolute h-[100vh] w-[100vw]"
                ></video> */}
					<div className="relative container mx-auto px-4 flex items-center justify-center py-4">
						<div className="absolute size-full z-10 rounded-lg py-8 px-[2.1rem]">
							<Image
								src="/clinicviews/llpmg-hero-image.svg"
								alt="llpmg-hero-img"
								height={50}
								width={150}
								className="size-full object-cover z-20 rounded-lg opacity-50"
								priority
							/>
						</div>
						<div className="relative z-30 size-full bg-blue-100/30 dark:bg-gray-700/30 rounded-lg p-8 shadow-lg leading-[1.5rem] sm:leading-[4rem] 2xl:leading-[5rem] text-[0.8rem] sm:text-[1rem] 2xl:text-[2rem] flex flex-col items-center justify-center">
							{/* Contact Number */}
							<a
								href="tel:+19098804200"
								className="text-4xl font-bold bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 text-transparent bg-clip-text hover:from-green-400 hover:to-blue-500 hover:via-teal-300 transition duration-300 transform hover:scale-110 animate-pulse focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-opacity-50 flex items-center justify-center mb-4 text-center"
							>
								(909) 880-4200
							</a>
							{/* Introductory Heading */}
							<h2 className="text-3xl font-black text-blue-900 dark:text-blue-300 mb-4 text-center tracking-normal sm:tracking-wide 2xl:tracking-widest">
								Welcome to Loma Linda Psychiatric Medical Group
							</h2>
							<p className="text-gray-700 dark:text-gray-300 text-center tracking-tight sm:tracking-wider2xl:tracking-wide font-medium">
								We are a behavioral health practice committed to
								providing excellent mental health care. Our
								multidisciplinary team of competent and
								compassionate clinicians offers comprehensive
								diagnostic and treatment services for all age
								groups - children, adolescents, adults, and
								seniors.
							</p>
						</div>
					</div>
					<section className="space-y-4 flex flex-col items-center justify-center z-10 max-w-[20rem] mx-auto">
						<Link
							href="/clinicviews/llpmg/register"
							className="w-full z-10"
						>
							<button
								className="w-full bg-blue-500 text-white py-3 px-4 rounded hover:bg-blue-600 transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 z-10"
								onClick={() => {
									setTimeout(() => {
										window.scrollTo(0, 0);
									}, 100);
								}}
							>
								Contact the Clinic
							</button>
						</Link>
						<Link
							href="/clinicviews/llpmg/intake-packet"
							className="w-full z-10"
						>
							<button className="w-full bg-gray-200 text-gray-800 py-3 px-4 rounded hover:bg-gray-300 transition duration-300 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600 z-10">
								Fill Out New Patient Packet
							</button>
						</Link>
					</section>
				</motion.section>

				<main className="container mx-auto px-4 py-8 gap-[5rem] space-y-[8rem] size-full z-40">
					<Services id="services" />
					<ConditionsTreated />
					{/* <Testimonials /> */}
					<section className="py-16 bg-white/70 dark:bg-gray-800/70 relative overflow-hidden transition-colors duration-300 rounded-xl">
						<div className="container mx-auto px-4 relative z-10">
							<h2 className="text-3xl font-bold text-blue-900 dark:text-blue-300 mb-8 text-center">
								What Our Patients Say
							</h2>
							<Slider {...sliderSettings}>
								{testimonials.map((testimonial, index) => (
									<div key={index} className="px-4">
										<div className="bg-blue-100/50 dark:bg-gray-700/50 p-8 rounded-lg shadow-lg relative transition-colors duration-300">
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
									href="/clinicviews/llpmg/feedback"
									className="inline-block bg-blue-500/70 hover:bg-blue-600/70 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out z-50"
								>
									Share Your Feedback
								</Link>
							</div>
						</div>
						<SVGWave
							className="absolute bottom-0 left-0 w-full text-blue-900 dark:text-gray-900/70"
							style={{ zIndex: 1 }}
						/>
					</section>
				</main>
			</div>
		</div>
	);
};

export default Landing;
