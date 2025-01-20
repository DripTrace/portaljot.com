"use client";

import React from "react";
import { useSelector } from "react-redux";
import { FSClinicalsRootState } from "@/store/fsclinicalsStore";

const FSClinicalsFooter: React.FC = () => {
    const isDarkMode = useSelector(
        (state: FSClinicalsRootState) => state.theme.fsclinicalsIsDarkMode
    );

    return (
        <footer
            className={`${
                isDarkMode
                    ? "bg-[#0C3C60] text-[#D1E0EB]"
                    : "bg-[#494949] text-white"
            } p-8 relative bottom-0`}
        >
            <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
                <div>
                    <h3 className="text-xl font-bold mb-4">
                        Four Square Clinicals
                    </h3>
                    <p>Innovative strategies for achieving health</p>
                </div>
                <div>
                    <h3 className="text-xl font-bold mb-4">Contact Us</h3>
                    <p>
                        Email:{" "}
                        <a
                            href="mailto:info@fsclinicals.com"
                            className="hover:text-[#1FABC7] transition-colors cursor-pointer"
                        >
                            info@fsclinicals.com
                        </a>
                    </p>
                    <p>
                        Phone:{" "}
                        <a
                            href="tel:775-238-3082"
                            className="hover:text-[#1FABC7] transition-colors cursor-pointer"
                        >
                            775-238-3082
                        </a>
                    </p>
                </div>
                <div>
                    <h3 className="text-xl font-bold mb-4">Locations</h3>
                    <p>
                        California:{" "}
                        <a
                            href="https://www.google.com/maps?ll=33.876903,-117.841963&z=16&t=m&hl=en&gl=US&mapclient=embed&q=650+N+Rose+Dr+%23472+Placentia,+CA+92870"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-[#1FABC7] transition-colors"
                        >
                            650 N Rose Drive #472, Placentia, CA 92870
                        </a>
                    </p>
                    <p>
                        Nevada:{" "}
                        <a
                            href="https://www.google.com/maps?ll=39.525297,-119.816658&z=15&t=m&hl=en&gl=US&mapclient=embed&q=100+N+Arlington+Ave+%23340a+Reno,+NV+89501"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-[#1FABC7] transition-colors"
                        >
                            100 N Arlington Ave, Suite 340A, Reno, NV 89501
                        </a>
                    </p>
                </div>
            </div>
            <div className="mt-8 text-center">
                <p>&copy; 2024 by FS Clinicals. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default FSClinicalsFooter;
