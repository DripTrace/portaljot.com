import React from "react";
import Image from "next/image";

const insurances = [
    {
        name: "IEHP",
        // logo: "/iehp-logo.png",
        logo: "/iehp.svg",
        url: "https://www.iehp.org",
    },
    {
        name: "Blue Cross Blue Shield",
        // logo: "/bluecross-logo.png",
        logo: "/BlueCrossBlueShield.svg",
        url: "https://www.blueshieldca.com/",
    },
    {
        name: "UnitedHealthcare",
        // logo: "/unitedhealthcare-logo.png",
        logo: "/united-healthcare.svg",
        url: "https://www.uhc.com/",
    },
    // {
    //     name: "Health Net",
    //     // logo: "/healthnet-logo.png",
    //     logo: "/health-net.svg",
    //     url: "https://www.healthnet.com/content/healthnet/en_us.html",
    // },
    {
        name: "Central Health Plan of California",
        // logo: "/centralhealth-logo.png",
        logo: "/central-health-plan.svg",
        url: "https://www.centralhealthplan.com/",
    },
    {
        name: "Aetna",
        // logo: "/aetna-logo.png",
        logo: "/aetna.svg",
        url: "https://www.aetna.com/",
    },
    {
        name: "Cigna",
        // logo: "/cigna-logo.png",
        logo: "/cigna.svg",
        url: "https://www.cigna.com/",
    },
    {
        name: "Medicare",
        // logo: "/medicare-logo.png",
        logo: "/medicare.svg",
        url: "https://www.medicare.gov/",
    },
    {
        name: "Tricare",
        // logo: "/medicare-logo.png",
        logo: "/tricare.svg",
        url: "https://www.tricare.mil/",
    },
];

const Footer: React.FC = () => {
    return (
        <footer className="bg-blue-50/20 dark:bg-gray-900/20 py-5 z-0 w-full z-30">
            <div className="container mx-auto px-4 z-0">
                <h2 className="text-2xl font-bold text-center mb-6 text-gray-300 dark:text-blue-100">
                    Insurance Accepted
                </h2>
                {/* <div className="grid grid-cols-2 md:grid-cols-4 gap-4 align-items-center justify-items-center"> */}
                <div className="grid sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4 align-items-center justify-items-center">
                    {insurances.map((insurance) => (
                        <a
                            title="insurances"
                            key={insurance.name}
                            href={insurance.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center p-2 bg-white/70 dark:bg-blue-100/50 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
                        >
                            <Image
                                src={insurance.logo}
                                alt={`${insurance.name} logo`}
                                width={50}
                                height={25}
                                // objectFit="contain"
                                style={{ objectFit: "contain" }}
                                className="h-[4rem] w-[5rem]"
                                unoptimized
                            />
                        </a>
                    ))}
                </div>
                <p className="text-center mt-8 text-sm text-gray-600 dark:text-gray-100">
                    Disclaimer: Loma Linda Psychiatric Medical Group is not an
                    affiliate of Loma Linda University Health
                </p>
            </div>
        </footer>
    );
};

export default Footer;
