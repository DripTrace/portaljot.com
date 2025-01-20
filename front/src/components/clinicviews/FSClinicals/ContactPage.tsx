"use client";

import React, { useState } from "react";
import { useSelector } from "react-redux";
import { FSClinicalsRootState } from "@/store/fsclinicalsStore";
import PatientRegistration from "./PatientRegistration";
import { motion } from "framer-motion";

const ContactPage: React.FC = () => {
    const isDarkMode = useSelector(
        (state: FSClinicalsRootState) => state.theme.fsclinicalsIsDarkMode
    );
    const [activeTab, setActiveTab] = useState<"registration" | "appointment">(
        "registration"
    );

    return (
        <div
            className={`flex-1 size-full flex items-center justify-center flex-col p-4 ${
                isDarkMode
                    ? "bg-[#0C3C60] text-[#D1E0EB]"
                    : "bg-[#D1E0EB] text-[#0C3C60]"
            }`}
        >
            <h1 className="text-3xl font-bold mb-8 text-center">Contact Us</h1>
            <div className="max-w-lg mx-auto">
                <div className="relative mb-8">
                    {/* <div className="flex justify-between">
                        <button
                            onClick={() => setActiveTab("registration")}
                            className={`w-full py-2 text-center z-10 transition-colors duration-300 ${
                                activeTab === "registration"
                                    ? "text-white"
                                    : "text-[#0C3C60]"
                            }`}
                        >
                            Appointment Suggestion
                        </button>
                    </div> */}
                    <motion.div
                        className="absolute bottom-0 left-0 h-full bg-[#1FABC7] rounded-full p-4"
                        initial={false}
                        animate={{
                            x: "0%",
                            width: "100%",
                        }}
                        transition={{
                            type: "spring",
                            stiffness: 300,
                            damping: 30,
                        }}
                    />
                </div>
                <PatientRegistration />
            </div>
        </div>
    );
};

export default ContactPage;
