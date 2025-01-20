"use client";

import { useEffect } from "react";
import ContactForm from "@/components/LLPMG/ContactForm";

export const dynamic = "auto";

const LLPMGContactUsPage: React.FC = () => {
    useEffect(() => {
        const scrollToTop = () => {
            window.scrollTo(0, 0);
        };

        // Attempt to scroll immediately
        scrollToTop();

        // Set a timeout to scroll again after a short delay
        const timeoutId = setTimeout(scrollToTop, 100);

        // Add an event listener for when the page has finished loading
        window.addEventListener("load", scrollToTop);

        return () => {
            clearTimeout(timeoutId);
            window.removeEventListener("load", scrollToTop);
        };
    }, []);

    return (
        <div id="page-top" className="z-10 py-10">
            <ContactForm />
        </div>
    );
};

export default LLPMGContactUsPage;
