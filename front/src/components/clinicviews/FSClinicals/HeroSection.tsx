// "use client"

// import React from 'react';
// import { motion } from 'framer-motion';
// import { useSelector } from 'react-redux';
// import { FSClinicalsRootState } from '@/store/fsclinicalsStore';
// import dynamic from 'next/dynamic';

// const Calendar = dynamic(() => import('lucide-react').then((mod) => mod.Calendar), { ssr: false });

// const HeroSection: React.FC = () => {
//   const isDarkMode = useSelector((state: FSClinicalsRootState) => state.theme.fsclinicalsIsDarkMode);

//   return (
//     <section className={`${isDarkMode ? 'bg-blue-900' : 'bg-blue-500'} text-white py-20`}>
//       <div className="container mx-auto text-center">
//         <motion.h1
//           initial={{ opacity: 0, y: -50 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.8 }}
//           className="text-4xl font-bold mb-4"
//         >
//           Innovative Strategies for Achieving Health
//         </motion.h1>
//         <motion.p
//           initial={{ opacity: 0, y: 50 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.8, delay: 0.2 }}
//           className="text-xl mb-8"
//         >
//           Improving quality of life for those struggling with mental health and substance use
//         </motion.p>
//         <motion.a
//           href="#"
//           initial={{ opacity: 0, scale: 0.5 }}
//           animate={{ opacity: 1, scale: 1 }}
//           transition={{ duration: 0.5, delay: 0.4 }}
//           className={`${isDarkMode ? 'bg-gray-800 text-white hover:bg-gray-700' : 'bg-white text-blue-500 hover:bg-blue-100'} py-2 px-6 rounded-full text-lg font-semibold transition-colors inline-flex items-center cursor-pointer select-auto`}
//         >
//           <Calendar size={20} className="mr-2" />
//           Schedule an Appointment
//         </motion.a>
//       </div>
//     </section>
//   );
// };

// export default HeroSection;

"use client";

import React from "react";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { FSClinicalsRootState } from "@/store/fsclinicalsStore";
import dynamic from "next/dynamic";
import Link from "next/link";
import Image from "next/image";

const Calendar = dynamic(
    () => import("lucide-react").then((mod) => mod.Calendar),
    { ssr: false }
);

const HeroSection: React.FC = () => {
    const isDarkMode = useSelector(
        (state: FSClinicalsRootState) => state.theme.fsclinicalsIsDarkMode
    );

    return (
        <section
            className={`${
                isDarkMode ? "bg-[#0C3C60]" : "bg-[#6EA4CE]"
            } py-20 relative z-20 text-[#1FABC7]`}
        >
            <Image
                src="/fsclinicals/Psychiatrist-Session-freesvgillustration.com/Psychiatrist-Session.svg"
                alt="psych"
                width={800}
                height={500}
                className="rounded-lg mb-8 absolute object-cover size-full z-20 top-0"
            />
            <div className="container mx-auto text-center relative z-20">
                <motion.h1
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-4xl font-bold mb-4 relative z-40"
                >
                    Innovative Strategies for Achieving Health
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                >
                    <mark className="text-xl mb-8 relative z-40 text-[#0C3C60]">
                        Improving quality of life for those struggling with
                        mental health and substance use
                    </mark>
                </motion.p>
                <motion.div
                    //   href="#"
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className={`${
                        isDarkMode
                            ? "bg-[#D1E0EB] text-[#0C3C60] hover:bg-[#B3BEDC]"
                            : "bg-white text-[#6EA4CE] hover:bg-[#D1E0EB]"
                    } py-2 px-6 rounded-full text-lg font-semibold transition-colors inline-flex items-center cursor-pointer select-auto relative z-40`}
                >
                    <Calendar size={20} className="mr-2 relative z-40" />
                    <Link
                        href="/fsclinicals/fsclinicals-view/fsclinicals-form"
                        className="relative z-40"
                    >
                        Schedule an Appointment
                    </Link>
                </motion.div>
            </div>
        </section>
    );
};

export default HeroSection;
