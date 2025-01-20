"use client";

import { motion } from "framer-motion";

const services = [
    {
        title: "Psychiatric Evaluation and Consultation",
        description:
            "Our team of board-certified psychiatrists and psychiatric nurse practitioners conducts comprehensive evaluations to help you understand and manage mental health issues impacting your life.",
    },
    {
        title: "Psychotherapy",
        description:
            "We offer various forms of therapy including Cognitive Behavioral Therapy (CBT), Eye Movement Desensitization and Reprocessing (EMDR), Exposure Response Prevention Therapy (ERP), and more.",
    },
    {
        title: "Medication Management",
        description:
            "We are committed to providing the best possible care for your condition. Your providers ensure that you are receiving optimal treatment for the prescription medications you are taking.",
    },
    {
        title: "Telepsychiatry",
        description:
            "Your providers can provide direct interaction with you through HIPAA-compliant video-conferencing.",
    },
    {
        title: "Support Programs Education Referrals",
        description:
            "We offer trauma-informed staff training, psychiatric nurse practitioner programs, ADHD testing, and more.",
    },
    {
        title: "Outpatient Mental Health Treatment",
        description:
            "We provide group home services for the developmentally disabled, community-based homes for serious mental illness.",
    },
];

interface ServicesProps {
    id: string;
}

const Services: React.FC<ServicesProps> = ({ id }: ServicesProps) => {
    return (
        <motion.div
            id={id}
            // initial={{ opacity: 0 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="container mt-[4rem] mx-auto px-4 py-8 bg-blue-50/70 dark:bg-gray-700/50 rounded-md flex items-center justify-center flex-col"
        >
            <h2 className="text-3xl font-bold text-blue-900 dark:text-blue-100 mb-4">
                Our Services
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {services.map((service, index) => (
                    <motion.div
                        key={index}
                        className="dark:bg-gray-800/70 bg-white/70 p-6 rounded-lg shadow-md dark:text-blue-100 text-blue-900"
                        whileHover={{ scale: 1.05 }}
                        transition={{ type: "spring", stiffness: 300 }}
                    >
                        <h3 className="text-xl font-semibold mb-2">
                            {service.title}
                        </h3>
                        <p>{service.description}</p>
                    </motion.div>
                ))}
            </div>
        </motion.div>
    );
};

export default Services;
