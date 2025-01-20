// "use client";

import HeroSection from "../HeroSection";
import LocationsSection from "../LocationsSection";
import ServicesSection from "../ServicesSection";
import CTASection from "../CTASection";

// import React from "react";
// import { useSelector } from "react-redux";
// import { FSClinicalsRootState } from "@/store/fsclinicalsStore";
// import PatientRegistration from "../PatientRegistration";
// import AppointmentSuggestion from "../AppointmentSuggestion";
// import { FSClinicalsHeader } from "../FSClinicalsHeader";
// import HeroSection from "../HeroSection";
// import ServicesSection from "../ServicesSection";
// import AboutUsSection from "../AboutUsSection";
// import LocationsSection from "../LocationsSection";
// import CTASection from "../CTASection";
// import { FSClinicalsFooter } from "../FSClinicalsFooter";

// const Home: React.FC = () => {
// 	const isDarkMode = useSelector(
// 		(state: FSClinicalsRootState) => state.theme.fsclinicalsIsDarkMode
// 	);

// 	return (
// 		<div
// 			className={`min-h-screen flex flex-col ${isDarkMode ? "bg-gray-900 text-gray-100" : "bg-white text-gray-900"} select-none`}
// 		>
// 			{/* <FSClinicalsHeader /> */}
// 			<main className="flex-grow">
// 				<HeroSection />
// 				<ServicesSection />
// 				<AboutUsSection />
// 				<LocationsSection />
// 				<section className="py-16 bg-gray-100">
// 					<div className="container mx-auto">
// 						<h2 className="text-3xl font-bold text-center mb-12">
// 							Patient Services
// 						</h2>
// 						<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
// 							<PatientRegistration />
// 							<AppointmentSuggestion />
// 						</div>
// 					</div>
// 				</section>
// 				<CTASection />
// 			</main>
// 			{/* <FSClinicalsFooter /> */}
// 		</div>
// 	);
// };

// export default Home;

// src/app/page.tsx
// import HeroSection from '@/components/FSClinicals/Home/HeroSection';
// import ServicesSection from '@/components/FSClinicals/Home/ServicesSection';
// import LocationsSection from '@/components/FSClinicals/Home/LocationsSection';
// import CTASection from '@/components/FSClinicals/Home/CTASection';

export default function Home() {
	return (
		<>
			<HeroSection />
			<ServicesSection />
			{/* <LocationsSection /> */}
			<CTASection />
		</>
	);
}
