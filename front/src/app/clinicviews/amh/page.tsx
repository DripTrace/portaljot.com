"use client";

import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import FeatureCard from "@/components/Access-MentalHealth/FeatureCard";
import TestimonialCard from "@/components/Access-MentalHealth/TestimonialCard";
import { AMHRootState } from "@/store/access-mentalhealth/anAMHStore";
import AnimatedBackground from "@/components/Access-MentalHealth/AnimatedBackground";
import AccessMentalHealthHeader from "@/components/Access-MentalHealth/AccessMentalHealthHeader";
// import Header from "@/components/Access-MentalHealth/Header";
// import Header from "@/components/shared/Header";

const features = [
    {
        title: "Accessibility",
        description:
            "Telepsychiatry services that eliminate geographic limitations.",
        icon: "🌐",
    },
    {
        title: "Flexibility",
        description: "Care that fits within each person’s unique schedule.",
        icon: "⏰",
    },
    {
        title: "Quality",
        description:
            "Personalized, evidence-based treatment from licensed professionals.",
        icon: "🏥",
    },
];

const testimonials = [
    {
        quote: "Access Mental Healthcare has transformed the way I receive care.",
        name: "John Doe",
        title: "Patient",
    },
    {
        quote: "The flexibility and accessibility are unmatched.",
        name: "Jane Smith",
        title: "Patient",
    },
];

const AccessMentalHealthHomePage: React.FC = () => {
    const isAMHDarkMode = useSelector(
        (state: AMHRootState) => state.anAMHDarkMode.isAMHDarkMode
    );

    return (
        <div
            className={`relative overflow-hidden ${isAMHDarkMode ? "dark" : ""}`}
        >
            <AnimatedBackground />
            <div className="relative z-10 min-h-screen">
                <AccessMentalHealthHeader />

                {/* Hero Section */}
                <section className="text-center py-20 px-6">
                    <motion.h2
                        className="text-5xl font-bold mb-6 text-gray-900 dark:text-white"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        Revolutionizing Access to Psychiatric Care
                    </motion.h2>
                    <motion.p
                        className="max-w-3xl mx-auto text-xl text-gray-700 dark:text-gray-300"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                    >
                        Access Mental Healthcare is dedicated to making mental
                        health services accessible, flexible, and of the highest
                        quality.
                    </motion.p>
                </section>

                {/* About Us Section */}
                <section
                    id="about"
                    className="py-12 px-6 bg-white dark:bg-gray-900 bg-opacity-90 dark:bg-opacity-90"
                >
                    <h2 className="text-4xl font-bold text-center mb-6 text-gray-900 dark:text-white">
                        About Us
                    </h2>
                    <p className="max-w-4xl mx-auto text-lg text-gray-700 dark:text-gray-300">
                        We are an innovative and patient-centered platform
                        designed to revolutionize how individuals access
                        psychiatric care. Our mission is to remove barriers to
                        mental healthcare.
                    </p>
                </section>

                {/* Services Section */}
                <section id="services" className="py-12 px-6">
                    <h2 className="text-4xl font-bold text-center mb-12 text-gray-900 dark:text-white">
                        Our Services
                    </h2>
                    <div className="grid gap-8 md:grid-cols-3">
                        {features.map((feature, index) => (
                            <FeatureCard
                                key={index}
                                icon={feature.icon}
                                title={feature.title}
                                description={feature.description}
                            />
                        ))}
                    </div>
                </section>

                {/* Testimonials Section */}
                <section
                    id="testimonials"
                    className="py-12 px-6 bg-gray-100 dark:bg-gray-800 bg-opacity-90 dark:bg-opacity-90"
                >
                    <h2 className="text-4xl font-bold text-center mb-12 text-gray-900 dark:text-white">
                        Testimonials
                    </h2>
                    <div className="grid gap-8 md:grid-cols-2">
                        {testimonials.map((testimonial, index) => (
                            <TestimonialCard
                                key={index}
                                quote={testimonial.quote}
                                name={testimonial.name}
                                title={testimonial.title}
                            />
                        ))}
                    </div>
                </section>

                {/* Call to Action */}
                <section id="contact" className="text-center py-12 px-6">
                    <motion.h3
                        className="text-3xl font-bold mb-6 text-gray-900 dark:text-white"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                    >
                        Start Your Mental Wellness Journey Today
                    </motion.h3>
                    <motion.button
                        className="px-8 py-4 bg-blue-600 text-white rounded-lg text-lg font-semibold hover:bg-blue-700"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        Get Started
                    </motion.button>
                </section>

                {/* Footer */}
                <footer className="p-6 text-center bg-gray-200 dark:bg-gray-900 text-gray-700 dark:text-gray-400">
                    <p>
                        &copy; {new Date().getFullYear()} Access Mental
                        Healthcare. All rights reserved.
                    </p>
                    <p>
                        <a href="#" className="hover:text-blue-600">
                            Privacy Policy
                        </a>{" "}
                        |{" "}
                        <a href="#" className="hover:text-blue-600">
                            Terms of Service
                        </a>
                    </p>
                </footer>
            </div>
        </div>
    );
};

export default AccessMentalHealthHomePage;
