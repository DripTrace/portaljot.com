// "use client"

// import React from 'react';
// import { motion } from 'framer-motion';
// import { useSelector } from 'react-redux';
// import { FSClinicalsRootState } from '@/store/fsclinicalsStore';
// import dynamic from 'next/dynamic';

// const ChevronDown = dynamic(() => import('lucide-react').then((mod) => mod.ChevronDown), { ssr: false });

// const AboutUsSection: React.FC = () => {
//   const isDarkMode = useSelector((state: FSClinicalsRootState) => state.theme.fsclinicalsIsDarkMode);

//   return (
//     <section className={`${isDarkMode ? 'bg-gray-800' : 'bg-gray-100'} py-16`}>
//       <div className="container mx-auto">
//         <h2 className="text-3xl font-bold text-center mb-12">About Us</h2>
//         <motion.div
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ duration: 0.8 }}
//           className={`${isDarkMode ? 'bg-gray-700' : 'bg-white'} rounded-lg shadow-lg p-8`}
//         >
//           <p className="mb-4">
//             Four Square (FS) Clinicals offers direct client services from psychiatric evaluations and
//             substance abuse treatments to clinical research, practice management, and administrative support.
//             We utilize our resources to help identify and improve patient care.
//           </p>
//           <p className="mb-4">
//             FS Clinicals provides support in private, non-profit, government agencies and clinical research.
//             We strive to build lasting relationships in order to address patient needs by utilizing our
//             patient centered approach and collaborations for &ldquo;whole patient&ldquo; health.
//           </p>
//           <p>
//             From the private sector to community programs, we have been able to connect and build a
//             well-rounded support that has been lacking in mental health services. Our integrated team of
//             experts has allowed us to reach out to those who have been lost in the disparities of healthcare
//             systems.
//           </p>
//           <motion.a
//             href="#"
//             className={`inline-block mt-6 ${isDarkMode ? 'text-blue-300 hover:text-blue-400' : 'text-blue-500 hover:text-blue-700'} transition-colors cursor-pointer select-auto`}
//             whileHover={{ x: 5 }}
//           >
//             Read More <ChevronDown size={16} className="inline" />
//           </motion.a>
//         </motion.div>
//       </div>
//     </section>
//   );
// };

// export default AboutUsSection;

// "use client";

// import React from "react";
// import { motion } from "framer-motion";
// import { useSelector } from "react-redux";
// import { FSClinicalsRootState } from "@/store/fsclinicalsStore";
// import dynamic from "next/dynamic";
// import Image from "next/image";

// const ChevronDown = dynamic(
//     () => import("lucide-react").then((mod) => mod.ChevronDown),
//     { ssr: false }
// );

// const AboutUsSection: React.FC = () => {
//     const isDarkMode = useSelector(
//         (state: FSClinicalsRootState) => state.theme.fsclinicalsIsDarkMode
//     );

//     return (
//         <section
//             className={`${
//                 isDarkMode ? "bg-[#0C3C60]" : "bg-[#D1E0EB]"
//             } py-16 px-6 rounded-lg shadow-lg relative z-0`}
//         >
//             <div className="container mx-auto relative z-0">
//                 <Image
//                     src="/fsclinicals/About-Us-freesvgillustration.com/About-Us.svg"
//                     alt="about"
//                     width={800}
//                     height={500}
//                     className="rounded-lg absolute object-cover w-full h-full z-10 top-0 left-0"
//                 />
//                 <h2
//                     className={`relative z-20 text-3xl font-bold text-center mb-12 ${
//                         isDarkMode ? "text-[#D1E0EB]" : "text-[#0C3C60]"
//                     }`}
//                 >
//                     About Us
//                 </h2>
//                 <motion.div
//                     initial={{ opacity: 0 }}
//                     animate={{ opacity: 1 }}
//                     transition={{ duration: 0.8 }}
//                     className={`${
//                         isDarkMode
//                             ? "bg-[#494949]/60 text-[#D1E0EB]"
//                             : "bg-white/60 text-[#494949]"
//                     } rounded-lg shadow-lg p-8 relative z-20`}
//                 >
//                     <p className="mb-4 relative z-20">
//                         Four Square (FS) Clinicals offers direct client services
//                         from psychiatric evaluations and substance abuse
//                         treatments to clinical research, practice management,
//                         and administrative support. We utilize our resources to
//                         help identify and improve patient care.
//                     </p>
//                     <p className="mb-4 relative z-20">
//                         FS Clinicals provides support in private, non-profit,
//                         government agencies and clinical research. We strive to
//                         build lasting relationships in order to address patient
//                         needs by utilizing our patient centered approach and
//                         collaborations for &rdquo;whole patient&rdquo; health.
//                     </p>
//                     <p>
//                         From the private sector to community programs, we have
//                         been able to connect and build a well-rounded support
//                         that has been lacking in mental health services. Our
//                         integrated team of experts has allowed us to reach out
//                         to those who have been lost in the disparities of
//                         healthcare systems.
//                     </p>
//                     <motion.a
//                         href="#"
//                         className={`relative z-20 inline-block mt-6 ${
//                             isDarkMode
//                                 ? "text-[#1FABC7] hover:text-[#6EA4CE]"
//                                 : "text-[#6EA4CE] hover:text-[#1FABC7]"
//                         } transition-colors cursor-pointer select-auto`}
//                         whileHover={{ x: 5 }}
//                     >
//                         Read More{" "}
//                         <ChevronDown
//                             size={16}
//                             className="inline relative z-20"
//                         />
//                     </motion.a>
//                 </motion.div>
//             </div>
//         </section>
//     );
// };

// export default AboutUsSection;

// "use client";

// import React, { useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { useSelector } from "react-redux";
// import { FSClinicalsRootState } from "@/store/fsclinicalsStore";
// import dynamic from "next/dynamic";
// import Image from "next/image";

// const ChevronDown = dynamic(
//     () => import("lucide-react").then((mod) => mod.ChevronDown),
//     { ssr: false }
// );

// const ThreeDVisualization = dynamic(() => import("./ThreeDVisualization"), {
//     ssr: false,
// });

// const AboutUsSection: React.FC = () => {
//     const isDarkMode = useSelector(
//         (state: FSClinicalsRootState) => state.theme.fsclinicalsIsDarkMode
//     );
//     const [isExpanded, setIsExpanded] = useState(false);

//     return (
//         <section
//             className={`${
//                 isDarkMode ? "bg-[#0C3C60]" : "bg-[#D1E0EB]"
//             } py-16 px-6 rounded-lg shadow-lg relative z-0`}
//         >
//             <div className="container mx-auto relative z-0">
//                 <Image
//                     src="/fsclinicals/About-Us-freesvgillustration.com/About-Us.svg"
//                     alt="about"
//                     width={800}
//                     height={500}
//                     className="rounded-lg absolute object-cover w-full h-full z-10 top-0 left-0"
//                 />
//                 <h2
//                     className={`relative z-20 text-3xl font-bold text-center mb-12 ${
//                         isDarkMode ? "text-[#D1E0EB]" : "text-[#0C3C60]"
//                     }`}
//                 >
//                     About Us
//                 </h2>
//                 <motion.div
//                     initial={{ opacity: 0 }}
//                     animate={{ opacity: 1 }}
//                     transition={{ duration: 0.8 }}
//                     className={`${
//                         isDarkMode
//                             ? "bg-[#494949]/60 text-[#D1E0EB]"
//                             : "bg-white/60 text-[#494949]"
//                     } rounded-lg shadow-lg p-8 relative z-20`}
//                 >
//                     <p className="mb-4 relative z-20">
//                         Four Square (FS) Clinicals offers direct client services
//                         from psychiatric evaluations and substance abuse
//                         treatments to clinical research, practice management,
//                         and administrative support. We utilize our resources to
//                         help identify and improve patient care.
//                     </p>
//                     <p className="mb-4 relative z-20">
//                         FS Clinicals provides support in private, non-profit,
//                         government agencies and clinical research. We strive to
//                         build lasting relationships in order to address patient
//                         needs by utilizing our patient centered approach and
//                         collaborations for &quot;whole patient&quot; health.
//                     </p>
//                     <p className="mb-4 relative z-20">
//                         From the private sector to community programs, we have
//                         been able to connect and build a well-rounded support
//                         that has been lacking in mental health services. Our
//                         integrated team of experts has allowed us to reach out
//                         to those who have been lost in the disparities of
//                         healthcare systems.
//                     </p>
//                     <AnimatePresence>
//                         {isExpanded && (
//                             <motion.div
//                                 initial={{ opacity: 0, height: 0 }}
//                                 animate={{ opacity: 1, height: "auto" }}
//                                 exit={{ opacity: 0, height: 0 }}
//                                 transition={{ duration: 0.3 }}
//                             >
//                                 <p className="mb-4 relative z-20">
//                                     Our approach is rooted in the understanding
//                                     that mental health is a complex and
//                                     multifaceted issue. We believe in addressing
//                                     not just the symptoms, but the underlying
//                                     causes of mental health challenges. This
//                                     holistic approach allows us to provide
//                                     comprehensive care that goes beyond
//                                     traditional treatment methods.
//                                 </p>
//                                 <p className="mb-4 relative z-20">
//                                     Four Square Clinicals is committed to
//                                     breaking down barriers to mental health
//                                     care. We recognize that many individuals
//                                     face obstacles in accessing quality mental
//                                     health services, whether due to financial
//                                     constraints, stigma, or lack of awareness.
//                                     Our team works tirelessly to create
//                                     inclusive and accessible programs that cater
//                                     to diverse populations.
//                                 </p>
//                                 <p className="mb-4 relative z-20">
//                                     Innovation is at the heart of our practice.
//                                     We continuously explore and implement
//                                     cutting-edge therapies and technologies to
//                                     enhance our services. From teletherapy
//                                     options to advanced diagnostic tools, we
//                                     strive to stay at the forefront of mental
//                                     health care advancements.
//                                 </p>
//                                 <div className="h-64 relative z-20">
//                                     <ThreeDVisualization />
//                                 </div>
//                             </motion.div>
//                         )}
//                     </AnimatePresence>
//                     <motion.button
//                         onClick={() => setIsExpanded(!isExpanded)}
//                         className={`relative z-20 inline-flex items-center mt-6 ${
//                             isDarkMode
//                                 ? "text-[#1FABC7] hover:text-[#6EA4CE]"
//                                 : "text-[#6EA4CE] hover:text-[#1FABC7]"
//                         } transition-colors cursor-pointer select-auto`}
//                         whileHover={{ x: 5 }}
//                     >
//                         {isExpanded ? "Read Less" : "Read More"}
//                         <ChevronDown
//                             size={16}
//                             className={`inline ml-1 transition-transform duration-300 ${
//                                 isExpanded ? "rotate-180" : ""
//                             }`}
//                         />
//                     </motion.button>
//                 </motion.div>
//             </div>
//         </section>
//     );
// };

// export default AboutUsSection;

"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSelector } from "react-redux";
import { FSClinicalsRootState } from "@/store/fsclinicalsStore";
import Image from "next/image";
import CustomVisualization from "./CustomVisualization";
// import CustomVisualization from './CustomVisualization';

const AboutUsSection: React.FC = () => {
    const isDarkMode = useSelector(
        (state: FSClinicalsRootState) => state.theme.fsclinicalsIsDarkMode
    );
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <section
            className={`${
                isDarkMode ? "bg-[#0C3C60]" : "bg-[#D1E0EB]"
            } py-16 px-6 rounded-lg shadow-lg relative z-0`}
        >
            <div className="container mx-auto relative z-0">
                <Image
                    src="/fsclinicals/About-Us-freesvgillustration.com/About-Us.svg"
                    alt="about"
                    width={800}
                    height={500}
                    className="rounded-lg absolute object-cover w-full h-full z-10 top-0 left-0"
                />
                <h2
                    className={`relative z-20 text-3xl font-bold text-center mb-12 ${
                        isDarkMode ? "text-[#D1E0EB]" : "text-[#0C3C60]"
                    }`}
                >
                    About Us
                </h2>
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8 }}
                    className={`${
                        isDarkMode
                            ? "bg-[#494949]/60 text-[#D1E0EB]"
                            : "bg-white/60 text-[#494949]"
                    } rounded-lg shadow-lg p-8 relative z-20`}
                >
                    <p className="mb-4 relative z-20">
                        Four Square (FS) Clinicals offers direct client services
                        from psychiatric evaluations and substance abuse
                        treatments to clinical research, practice management,
                        and administrative support. We utilize our resources to
                        help identify and improve patient care.
                    </p>
                    <p className="mb-4 relative z-20">
                        FS Clinicals provides support in private, non-profit,
                        government agencies and clinical research. We strive to
                        build lasting relationships in order to address patient
                        needs by utilizing our patient centered approach and
                        collaborations for &quot;whole patient&quot; health.
                    </p>
                    <p className="mb-4 relative z-20">
                        From the private sector to community programs, we have
                        been able to connect and build a well-rounded support
                        that has been lacking in mental health services. Our
                        integrated team of experts has allowed us to reach out
                        to those who have been lost in the disparities of
                        healthcare systems.
                    </p>
                    <AnimatePresence>
                        {isExpanded && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.3 }}
                            >
                                <p className="mb-4 relative z-20">
                                    Our approach is rooted in the understanding
                                    that mental health is a complex and
                                    multifaceted issue. We believe in addressing
                                    not just the symptoms, but the underlying
                                    causes of mental health challenges. This
                                    holistic approach allows us to provide
                                    comprehensive care that goes beyond
                                    traditional treatment methods.
                                </p>
                                <p className="mb-4 relative z-20">
                                    Four Square Clinicals is committed to
                                    breaking down barriers to mental health
                                    care. We recognize that many individuals
                                    face obstacles in accessing quality mental
                                    health services, whether due to financial
                                    constraints, stigma, or lack of awareness.
                                    Our team works tirelessly to create
                                    inclusive and accessible programs that cater
                                    to diverse populations.
                                </p>
                                <p className="mb-4 relative z-20">
                                    Innovation is at the heart of our practice.
                                    We continuously explore and implement
                                    cutting-edge therapies and technologies to
                                    enhance our services. From teletherapy
                                    options to advanced diagnostic tools, we
                                    strive to stay at the forefront of mental
                                    health care advancements.
                                </p>
                                <div className="h-64 relative z-20">
                                    <CustomVisualization />
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                    <button
                        onClick={() => setIsExpanded(!isExpanded)}
                        className={`relative z-20 inline-flex items-center mt-6 ${
                            isDarkMode
                                ? "text-[#1FABC7] hover:text-[#6EA4CE]"
                                : "text-[#6EA4CE] hover:text-[#1FABC7]"
                        } transition-colors cursor-pointer select-auto`}
                    >
                        {isExpanded ? "Read Less" : "Read More"}
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className={`h-5 w-5 ml-1 transition-transform duration-300 ${
                                isExpanded ? "rotate-180" : ""
                            }`}
                            viewBox="0 0 20 20"
                            fill="currentColor"
                        >
                            <path
                                fillRule="evenodd"
                                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </button>
                </motion.div>
            </div>
        </section>
    );
};

export default AboutUsSection;
