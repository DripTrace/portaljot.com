// import React from "react";
// import { motion } from "framer-motion";
// import Slider from "react-slick";
// import { FaQuoteLeft } from "react-icons/fa";

// const testimonials = [
// 	{ quote: "I have never had a referral done so fast", author: "Carol" },
// 	{
// 		quote: "I feel extremely confident in him as a provider",
// 		author: "Shannon",
// 	},
// 	{
// 		quote: "...these people take care of their patients",
// 		author: "Richards D.",
// 	},
// ];

// const Testimonials: React.FC = () => {
// 	const sliderSettings = {
// 		dots: true,
// 		infinite: true,
// 		speed: 500,
// 		slidesToShow: 1,
// 		slidesToScroll: 1,
// 		autoplay: true,
// 		autoplaySpeed: 5000,
// 	};

// 	return (
// 		<motion.section
// 			initial={{ opacity: 0 }}
// 			animate={{ opacity: 1 }}
// 			transition={{ duration: 0.5 }}
// 			className="py-16 bg-white dark:bg-gray-800 relative overflow-hidden transition-colors duration-300 rounded-md"
// 		>
// 			{/* <div className="container mx-auto px-4 relative z-10">
// 				<h2 className="text-3xl font-bold text-blue-900 dark:text-blue-300 mb-8 text-center">
// 					What Our Patients Say
// 				</h2>
// 				<Slider {...sliderSettings}>
// 					{testimonials.map((testimonial, index) => (
// 						<div key={index} className="px-4">
// 							<div className="bg-blue-100 dark:bg-gray-700 p-8 rounded-lg shadow-lg relative transition-colors duration-300">
// 								<FaQuoteLeft className="text-4xl text-blue-500 dark:text-blue-400 absolute top-4 left-4 opacity-25" />
// 								<p className="text-xl mb-4 text-gray-700 dark:text-gray-300 italic">
// 									{testimonial.quote}
// 								</p>
// 								<p className="text-right font-semibold text-blue-900 dark:text-blue-300">
// 									- {testimonial.author}
// 								</p>
// 							</div>
// 						</div>
// 					))}
// 				</Slider>
// 			</div> */}
// 			<section className="py-16 bg-white dark:bg-gray-800 relative overflow-hidden transition-colors duration-300 rounded-md">
// 				<div className="container mx-auto px-4 relative z-10">
// 					<h2 className="text-3xl font-bold text-blue-900 dark:text-blue-300 mb-8 text-center">
// 						What Our Patients Say
// 					</h2>
// 					<Slider {...sliderSettings}>
// 						{testimonials.map((testimonial, index) => (
// 							<div key={index} className="px-4">
// 								<div className="bg-blue-100 dark:bg-gray-700 p-8 rounded-lg shadow-lg relative transition-colors duration-300">
// 									<FaQuoteLeft className="text-4xl text-blue-500 dark:text-blue-400 absolute top-4 left-4 opacity-25" />
// 									<p className="text-xl mb-4 text-gray-700 dark:text-gray-300 italic">
// 										{testimonial.quote}
// 									</p>
// 									<p className="text-right font-semibold text-blue-900 dark:text-blue-300">
// 										- {testimonial.author}
// 									</p>
// 								</div>
// 							</div>
// 						))}
// 					</Slider>
// 				</div>
// 				<SVGWave
// 					className="absolute bottom-0 left-0 w-full text-blue-900 dark:text-gray-900"
// 					style={{ zIndex: 1 }}
// 				/>
// 			</section>
// 		</motion.section>
// 	);
// };

// export default Testimonials;

// const SVGWave: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
// 	<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" {...props}>
// 		<path
// 			fill="#2a4365"
// 			fillOpacity="1"
// 			d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,112C672,96,768,96,864,112C960,128,1056,160,1152,160C1248,160,1344,128,1392,112L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
// 		></path>
// 	</svg>
// );

// const SVGBrain: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
// 	<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
// 		<path
// 			fill="currentColor"
// 			d="M13,3V4.8C17.33,5.3 20.3,9.4 20.3,14C20.3,15.92 19.75,17.73 18.82,19.3L20.06,20.54C21.21,18.68 21.9,16.43 21.9,14C21.9,8.6 18.41,3.8 13,3.2V1H11V3.2C5.59,3.8 2.1,8.6 2.1,14C2.1,16.43 2.79,18.68 3.94,20.54L5.18,19.3C4.25,17.73 3.7,15.92 3.7,14C3.7,9.4 6.67,5.3 11,4.8V3H13M12,6A8,8 0 0,0 4,14A8,8 0 0,0 12,22A8,8 0 0,0 20,14A8,8 0 0,0 12,6M12,8A6,6 0 0,1 18,14A6,6 0 0,1 12,20A6,6 0 0,1 6,14A6,6 0 0,1 12,8M12,10A4,4 0 0,0 8,14A4,4 0 0,0 12,18A4,4 0 0,0 16,14A4,4 0 0,0 12,10Z"
// 		/>
// 	</svg>
// );

// const SVGHeart: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
// 	<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
// 		<path
// 			fill="currentColor"
// 			d="M12,21.35L10.55,20.03C5.4,15.36 2,12.27 2,8.5C2,5.41 4.42,3 7.5,3C9.24,3 10.91,3.81 12,5.08C13.09,3.81 14.76,3 16.5,3C19.58,3 22,5.41 22,8.5C22,12.27 18.6,15.36 13.45,20.03L12,21.35Z"
// 		/>
// 	</svg>
// );

export default function Testamonials() {}
