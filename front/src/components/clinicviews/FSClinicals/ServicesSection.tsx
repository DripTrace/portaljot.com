// // src/components/FSClinicals/Home/ServicesSection.tsx
// "use client"

// import React from 'react';
// import { motion } from 'framer-motion';
// import { useSelector } from 'react-redux';
// import { FSClinicalsRootState } from '@/store/fsclinicalsStore';

// const services = [
//   {
//     title: "Patients",
//     description: "We assist with mental illness, drugs and alcohol, building a positive and successful contribution to self, others and society in an outpatient setting."
//   },
//   {
//     title: "Collaborations",
//     description: "Our focus is to provide cost-effective, quality treatment through a hybrid model of Health Services. We help identify and bridge the gaps in healthcare services to improve quality of life."
//   },
//   {
//     title: "Affiliates",
//     description: "Four Square Clinicals consists of four branches: Clinical Practice, Research, Housing and Philanthropy. Our objectives include community outreach, job placement, improved skill-sets, and continuing care."
//   }
// ];

// const ServicesSection: React.FC = () => {
//   const isDarkMode = useSelector((state: FSClinicalsRootState) => state.theme.fsclinicalsIsDarkMode);

//   return (
//     <section className="py-16">
//       <div className="container mx-auto">
//         <h2 className="text-3xl font-bold text-center mb-12">Our Services</h2>
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//           {services.map((service, index) => (
//             <motion.div
//               key={service.title}
//               initial={{ opacity: 0, y: 50 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.5, delay: 0.2 * index }}
//               className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow`}
//             >
//               <h3 className="text-xl font-semibold mb-4">{service.title}</h3>
//               <p className="mb-4">{service.description}</p>
//               <a href="#" className={`${isDarkMode ? 'text-blue-300 hover:text-blue-400' : 'text-blue-500 hover:text-blue-700'} transition-colors cursor-pointer select-auto`}>
//                 Learn More
//               </a>
//             </motion.div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default ServicesSection;

// "use client";

// import React from "react";
// import { motion } from "framer-motion";
// import { useSelector } from "react-redux";
// import { FSClinicalsRootState } from "@/store/fsclinicalsStore";
// import Image from "next/image";

// const services = [
//     {
//         title: "Patients",
//         description:
//             "We assist with mental illness, drugs and alcohol, building a positive and successful contribution to self, others and society in an outpatient setting.",
//         picSrc: "/fsclinicals/Schedule-freesvgillustration.com/Schedule.svg",
//         alt: "schedule",
//     },
//     {
//         title: "Collaborations",
//         description:
//             "Our focus is to provide cost-effective, quality treatment through a hybrid model of Health Services. We help identify and bridge the gaps in healthcare services to improve quality of life.",
//         picSrc: "/fsclinicals/Meet-the-team-freesvgillustration.com/Meet-the-team.svg",
//         alt: "team",
//     },
//     {
//         title: "Affiliates",
//         description:
//             "Four Square Clinicals consists of four branches: Clinical Practice, Research, Housing and Philanthropy. Our objectives include community outreach, job placement, improved skill-sets, and continuing care.",
//         picSrc: "/fsclinicals/Doctors-team-discussion-freesvgillustration.com/Doctors-team-discussion.svg",
//         alt: "mental health",
//     },
// ];

// const ServicesSection: React.FC = () => {
//     const isDarkMode = useSelector(
//         (state: FSClinicalsRootState) => state.theme.fsclinicalsIsDarkMode
//     );

//     return (
//         <section className="py-16 bg-[#D1E0EB] relative z-10">
//             <div className="container mx-auto relative z-10">
//                 <h2 className="text-3xl font-bold text-center mb-12 text-[#0C3C60] relative z-10">
//                     Our Services
//                 </h2>
//                 <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//                     {services.map((service, index) => (
//                         <motion.div
//                             key={service.title}
//                             initial={{ opacity: 0, y: 50 }}
//                             animate={{ opacity: 1, y: 0 }}
//                             transition={{ duration: 0.5, delay: 0.2 * index }}
//                             className={`${
//                                 isDarkMode
//                                     ? "bg-[#0C3C60] text-[#0C3C60]"
//                                     : "bg-white text-[#494949]"
//                             } rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow relative z-10 text-start flex flex-col items-center justify-center0`}
//                         >
//                             <Image
//                                 src={service.picSrc}
//                                 alt={service.alt}
//                                 width={800}
//                                 height={500}
//                                 className="rounded-lg mb-8 absolute object-cover size-full z-20 top-0"
//                             />
//                             <h3 className="text-xl font-semibold mb-4 relative z-30  bg-[#D1E0EB]/50 p-[0.5rem] rounded-xl">
//                                 {service.title}
//                             </h3>
//                             <p className="mb-4 relative z-30 rounded-xl bg-[#D1E0EB]/50 p-[2rem]">
//                                 {service.description}
//                             </p>
//                             <a
//                                 href="#"
//                                 className={`${
//                                     isDarkMode
//                                         ? "text-[#1FABC7] hover:text-[#6EA4CE]"
//                                         : "text-[#6EA4CE] hover:text-[#1FABC7]"
//                                 } transition-colors cursor-pointer select-auto relative z-30`}
//                             >
//                                 Learn More
//                             </a>
//                         </motion.div>
//                     ))}
//                 </div>
//             </div>
//         </section>
//     );
// };

// export default ServicesSection;

"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSelector } from "react-redux";
import { FSClinicalsRootState } from "@/store/fsclinicalsStore";
import Image from "next/image";
import CustomPointerButton from "./CustomPointerButton";

const services = [
    {
        title: "Patients",
        description:
            "We assist with mental illness, drugs and alcohol, building a positive and successful contribution to self, others and society in an outpatient setting.",
        details: [
            "Comprehensive mental health assessments and personalized treatment plans",
            "Individual and group therapy sessions for various mental health conditions",
            "Substance abuse counseling and rehabilitation programs",
            "Medication management and monitoring",
            "Crisis intervention and emergency services",
            "Family therapy and support groups",
            "Life skills training and vocational rehabilitation",
            "Teletherapy options for remote access to mental health services",
        ],
        picSrc: "/fsclinicals/Schedule-freesvgillustration.com/Schedule.svg",
        alt: "schedule",
    },
    {
        title: "Collaborations",
        description:
            "Our focus is to provide cost-effective, quality treatment through a hybrid model of Health Services. We help identify and bridge the gaps in healthcare services to improve quality of life.",
        details: [
            "Partnerships with local hospitals and primary care providers for integrated care",
            "Collaboration with community organizations for outreach and education",
            "Joint research initiatives with universities and medical institutions",
            "Telemedicine collaborations to expand access to specialized care",
            "Partnerships with employers for workplace mental health programs",
            "Collaboration with schools for early intervention and prevention programs",
            "Coordination with social services for comprehensive patient support",
            "Participation in multi-disciplinary care teams for complex cases",
        ],
        picSrc: "/fsclinicals/Meet-the-team-freesvgillustration.com/Meet-the-team.svg",
        alt: "team",
    },
    {
        title: "Affiliates",
        description:
            "Four Square Clinicals consists of four branches: Clinical Practice, Research, Housing and Philanthropy. Our objectives include community outreach, job placement, improved skill-sets, and continuing care.",
        details: [
            "Clinical Practice: State-of-the-art facilities for outpatient care",
            "Research: Conducting studies on innovative treatments and therapies",
            "Housing: Transitional and supportive housing programs for patients",
            "Philanthropy: Fundraising initiatives to support low-income patients",
            "Community Outreach: Mental health awareness campaigns and educational programs",
            "Job Placement: Partnerships with local businesses for employment opportunities",
            "Skill Development: Workshops and training programs for patients",
            "Continuing Care: Long-term support and follow-up services for sustained recovery",
        ],
        picSrc: "/fsclinicals/Doctors-team-discussion-freesvgillustration.com/Doctors-team-discussion.svg",
        alt: "mental health",
    },
];

const ServicesSection: React.FC = () => {
    const isDarkMode = useSelector(
        (state: FSClinicalsRootState) => state.theme.fsclinicalsIsDarkMode
    );
    const [expandedService, setExpandedService] = useState<number | null>(null);

    const toggleExpand = (index: number) => {
        setExpandedService(expandedService === index ? null : index);
    };

    return (
        <section className="py-16 bg-[#D1E0EB] relative z-10">
            <div className="container mx-auto relative z-10">
                <h2 className="text-3xl font-bold text-center mb-12 text-[#0C3C60] relative z-10">
                    Our Services
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {services.map((service, index) => (
                        <motion.div
                            key={service.title}
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 * index }}
                            className={`${
                                isDarkMode
                                    ? "bg-[#0C3C60] text-[#D1E0EB]"
                                    : "bg-white text-[#494949]"
                            } rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow relative z-10 text-start flex flex-col items-center justify-center overflow-hidden`}
                        >
                            <Image
                                src={service.picSrc}
                                alt={service.alt}
                                width={800}
                                height={500}
                                className="rounded-lg absolute object-cover w-full h-full z-10 top-0 left-0"
                            />
                            <div
                                className={`${
                                    isDarkMode
                                        ? "text-[#0C3C60]"
                                        : "text-[#494949"
                                } relative z-20 w-full`}
                            >
                                <h3 className="text-xl font-semibold mb-4 bg-[#D1E0EB]/80 p-2 rounded-xl inline-block">
                                    {service.title}
                                </h3>
                                <p className="mb-4 bg-[#D1E0EB]/80 p-4 rounded-xl">
                                    {service.description}
                                </p>
                                <CustomPointerButton
                                    onClick={() => toggleExpand(index)}
                                    expanded={expandedService === index}
                                />
                                <AnimatePresence>
                                    {expandedService === index && (
                                        <motion.div
                                            initial={{ opacity: 0, height: 0 }}
                                            animate={{
                                                opacity: 1,
                                                height: "auto",
                                            }}
                                            exit={{ opacity: 0, height: 0 }}
                                            transition={{ duration: 0.3 }}
                                            className="mt-4 overflow-hidden"
                                        >
                                            <ul className="list-disc pl-[2rem] space-y-2 bg-[#D1E0EB]/80 p-4 rounded-xl">
                                                {service.details.map(
                                                    (detail, detailIndex) => (
                                                        <li key={detailIndex}>
                                                            {detail}
                                                        </li>
                                                    )
                                                )}
                                            </ul>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ServicesSection;
