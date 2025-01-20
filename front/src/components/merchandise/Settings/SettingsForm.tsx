"use client";

import axios from "axios";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import BusinessInfo from "./BusinessInfo";
import StripeAgreement from "./StripeAgreement";

interface FormData {
    mcc: string;
    url: string;
    email: string;
    phone: string;
    firstName: string;
    lastName: string;
    dob: string;
    ssnLast4: string;
    line1: string;
    postalCode: string;
    city: string;
    state: string;
}

const SettingsForm = () => {
    const { data: session, status } = useSession() as any;
    let userData = session.user;

    const [ip, setIP] = useState<string>("");
    const [ts, setTS] = useState<number | null>(null);
    const [cc, setCC] = useState<string>("");

    const getData = async () => {
        const res = await axios.get("https://geolocation-db.com/json/");
        setIP(res.data.IPv4);
        setTS(Math.round(new Date().getTime() / 1000));
        setCC(res.data.country_code);
    };

    const [page, setPage] = useState<number>(0);
    const [formData, setFormData] = useState<FormData>({
        mcc: "7333",
        url: "Obinsun",
        email: session.user.email,
        phone: "",
        firstName: session.user.firstname,
        lastName: session.user.lastname,
        dob: "",
        ssnLast4: "",
        line1: session.user.shipping.address.line1,
        postalCode: session.user.shipping.address.postal_code,
        city: session.user.shipping.address.city,
        state: session.user.shipping.address.state,
    });

    const FormTitles = ["Business Information", "Onboarding Confirmation"];

    const PageDisplay = () => {
        if (page === 0) {
            return (
                <BusinessInfo formData={formData} setFormData={setFormData} />
            );
        } else {
            return <StripeAgreement />;
        }
    };

    const submitInformation = async (formData: FormData) => {
        await axios.post("/api/merchandise/events/stripe-events", {
            transactId: session?.user.username,
            change: "create-custom-account",
            date: ts,
            ip: ip,
            cc: cc,
            formData,
        });
    };

    useEffect(() => {
        getData();
    }, []);

    useEffect(() => {
        if (userData.personal_info) {
            const date_of_birth = userData.personal_info.dob;
            const day = date_of_birth.day.toString().padStart(2, "0");
            const month = date_of_birth.month.toString().padStart(2, "0");

            setFormData((prevData) => ({
                ...prevData,
                dob: `${date_of_birth.year}-${month}-${day}`,
                ssnLast4: "PROVIDED",
                phone: userData.personal_info.phone,
            }));
        }
    }, [session]);

    return (
        <div className="glass-form-container before:bg-gray-800/[5%] dark:before:bg-gray-300/[5%] h-full">
            <div className="information-heading">
                <div className="glass-progress-bar-container">
                    <div
                        className="glass-progress-bar"
                        style={{
                            width: page === 0 ? "25%" : "100%",
                        }}
                    ></div>
                </div>
                <h2 className="glass-form-header">{FormTitles[page]}</h2>
            </div>

            <div className="information-container">{PageDisplay()}</div>
            <div className="information-footing">
                <div className="flex flex-col tablet:flex-row">
                    {page > 0 && (
                        <div className="glass-form-row">
                            <div className="glass-form-column col">
                                <button
                                    className="glass-form-submit"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        setPage((currPage) => currPage - 1);
                                    }}
                                >
                                    Prev
                                </button>
                            </div>
                        </div>
                    )}
                    <div className="glass-form-row">
                        <div className="glass-form-column">
                            <button
                                className="glass-form-submit"
                                onClick={(e) => {
                                    e.preventDefault();
                                    if (page === FormTitles.length - 1) {
                                        submitInformation(formData);
                                    } else {
                                        setPage((currPage) => currPage + 1);
                                    }
                                }}
                            >
                                {page === FormTitles.length - 1
                                    ? "Submit"
                                    : "Next"}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SettingsForm;
