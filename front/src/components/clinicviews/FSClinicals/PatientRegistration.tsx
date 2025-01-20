"use client";

import React, { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import { FSClinicalsRootState } from "@/store/fsclinicalsStore";
import AppointmentSuggestion from "./AppointmentSuggestion";
// import { useDomainSelector } from "@/store/domainHooks";
// import { headers } from "next/headers";

interface AppointmentData {
    date: string;
    time: string;
}
// interface CustomWindow extends Window {
//     __DOMAIN_CONTEXT__: string;
// }

const PatientRegistration: React.FC = () => {
    // const headersList = headers();
    // // const allHeaders = Object.fromEntries(headersList.entries());
    // const protocol = process.env.NODE_ENV === "development" ? "http" : "https";
    // const host = headersList.get("host") || "localhost";
    // // const [hostname, port] = host.split(":");
    // const pathname = headersList.get("x-invoke-path") || "/";
    // const fullUrl = `${protocol}://${host}${pathname}`;

    // const reduxDomainContext = useDomainSelector(
    //     (state) => state.app.domainContext
    // );
    // const [domainContext, setDomainContext] = useState("unknown");

    const isDarkMode = useSelector(
        (state: FSClinicalsRootState) => state.theme.fsclinicalsIsDarkMode
    );
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [reason, setReason] = useState("");
    const [appointmentData, setAppointmentData] = useState<AppointmentData>({
        date: "",
        time: "",
    });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        setDefaultAppointmentTime();
    }, []);

    const setDefaultAppointmentTime = () => {
        const now = new Date();
        let futureDate = new Date(now.getTime() + 72 * 60 * 60 * 1000); // 72 hours in the future

        // Adjust to next business day if it's a weekend
        while (futureDate.getDay() === 0 || futureDate.getDay() === 6) {
            futureDate.setDate(futureDate.getDate() + 1);
        }

        // Set time to 9 AM
        futureDate.setHours(9, 0, 0, 0);

        const dateString = futureDate.toISOString().split("T")[0];
        const timeString = "09:00";

        setAppointmentData({ date: dateString, time: timeString });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");

        const formData = new FormData();
        formData.append("patientName", name);
        formData.append("email", email);
        formData.append("phone", phone);
        formData.append("reason", reason);
        formData.append("appointmentDate", appointmentData.date);
        formData.append("appointmentTime", appointmentData.time);
        // formData.append("domainContext", domainContext);

        if (
            fileInputRef.current &&
            fileInputRef.current.files &&
            fileInputRef.current.files.length > 0
        ) {
            formData.append("file", fileInputRef.current.files[0]);
        }

        console.log("Form data:\n", formData);

        try {
            const response = await fetch(
                "/api/register-fsclinicals-patient/route",
                {
                    method: "POST",
                    body: formData,
                }
            );

            if (!response.ok) {
                const errorData = await response.json();
                console.error("Error response data:", errorData);
                throw new Error("Failed to register patient");
            }

            const data = await response.json();
            console.log("Response data:", data);
            alert(
                "Patient registered successfully! Please check your email for confirmation."
            );
            // Reset form
            setName("");
            setEmail("");
            setPhone("");
            setReason("");
            setDefaultAppointmentTime();
            if (fileInputRef.current) {
                fileInputRef.current.value = "";
            }
        } catch (err) {
            console.error("Error submitting form:", err);
            setError(
                "An error occurred while registering the patient. Please try again."
            );
        } finally {
            setIsLoading(false);
        }
    };

    // useEffect(() => {
    //     if (reduxDomainContext) {
    //         setDomainContext(reduxDomainContext);
    //     }
    // }

    // useEffect(() => {
    //     setDomainContext(reduxDomainContext);
    //     console.log("reduxDomainContext: ", domainContext);
    // }, [reduxDomainContext]);

    // useEffect(() => {
    //     setDomainContext(
    //         (window as unknown as CustomWindow).__DOMAIN_CONTEXT__
    //     );
    //     console.log(
    //         "domain:\n",
    //         (window as unknown as CustomWindow).__DOMAIN_CONTEXT__
    //     );
    // }, []);

    // useEffect(() => {
    //     setDomainContext(fullUrl);
    // }, []);

    return (
        <form
            onSubmit={handleSubmit}
            className={`flex-1 flex flex-col h-full max-w-md mx-auto ${
                isDarkMode ? "text-[#D1E0EB]" : "text-[#494949]"
            }`}
        >
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <div className="mb-4">
                <label htmlFor="name" className="block mb-2">
                    Name <span className="text-red-500">*</span>
                </label>
                <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="w-full px-3 py-2 border rounded text-[#494949]"
                />
            </div>
            <div className="mb-4">
                <label htmlFor="email" className="block mb-2">
                    Email <span className="text-red-500">*</span>
                </label>
                <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full px-3 py-2 border rounded text-[#494949]"
                />
            </div>
            <div className="mb-4">
                <label htmlFor="phone" className="block mb-2">
                    Phone <span className="text-red-500">*</span>
                </label>
                <input
                    type="tel"
                    id="phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                    className="w-full px-3 py-2 border rounded text-[#494949]"
                />
            </div>
            <div className="mb-4">
                <label htmlFor="reason" className="block mb-2">
                    Reason for Visit <span className="text-red-500">*</span>
                </label>
                <textarea
                    id="reason"
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    required
                    className="w-full px-3 py-2 border rounded text-[#494949]"
                />
            </div>
            <div className="mb-4">
                <label htmlFor="pdf" className="block mb-2">
                    Upload PDF Document (optional)
                </label>
                <input
                    type="file"
                    id="pdf"
                    ref={fileInputRef}
                    accept=".pdf"
                    className={`${
                        isDarkMode ? "text-text-[#494949]" : "text-[#1FABC7]"
                    } w-full px-3 py-2 border rounded `}
                />
            </div>
            <div className="mb-4">
                <label className="block mb-2">
                    Suggested Appointment{" "}
                    <span className="text-red-500">*</span>
                </label>
                <AppointmentSuggestion
                    appointmentData={appointmentData}
                    onAppointmentChange={setAppointmentData}
                />
            </div>
            <button
                type="submit"
                disabled={isLoading}
                className={`w-full py-2 px-4 ${
                    isDarkMode
                        ? "bg-[#1FABC7] hover:bg-[#6EA4CE]"
                        : "bg-[#6EA4CE] hover:bg-[#1FABC7]"
                } text-white rounded ${
                    isLoading ? "opacity-50 cursor-not-allowed" : ""
                }`}
            >
                {isLoading ? "Submitting..." : "Register"}
            </button>
        </form>
    );
};

export default PatientRegistration;
