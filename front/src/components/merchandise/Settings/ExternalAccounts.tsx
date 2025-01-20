"use client";

import axios from "axios";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import Banks from "./Banks";
import Cards from "./Cards";

interface BankFormData {
    bankName: string;
    currency: string;
    routing_number: string;
    account_number: string;
}

interface CardFormData {
    cardName: string;
    number: string;
    exp_month_year: string;
    cvc: string;
}

interface ExternalAccountsProps {}

const ExternalAccounts: React.FC<ExternalAccountsProps> = () => {
    const { data: session, status } = useSession() as any;

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
    const [object, setObject] = useState<string>("bank_account");
    const [formData, setFormData] = useState<BankFormData | CardFormData>({
        bankName: "",
        currency: "usd",
        routing_number: "",
        account_number: "",
        cardName: "",
        number: "",
        exp_month_year: "",
        cvc: "",
    });

    const FormTitles = ["Banks", "Cards"];

    const AccountDisplay = () => {
        if (page === 0) {
            return (
                <Banks
                    formData={formData as BankFormData}
                    setFormData={
                        setFormData as React.Dispatch<
                            React.SetStateAction<BankFormData>
                        >
                    }
                />
            );
        } else if (page === 1) {
            return (
                <Cards
                    formData={formData as CardFormData}
                    setFormData={
                        setFormData as React.Dispatch<
                            React.SetStateAction<CardFormData>
                        >
                    }
                />
            );
        }
        return null;
    };

    const createExternalAccount = async (
        formData: BankFormData | CardFormData,
        object: string
    ) => {
        await axios.post("/api/merchandise/events/stripe-events", {
            transactId: session?.id,
            stripeId: session.user.stripeId,
            change: "create-external-account",
            object,
            formData,
            ip,
            date: ts,
            country: cc,
        });
    };

    useEffect(() => {
        getData();
    }, []); // Call getData only once on component mount

    useEffect(() => {
        if (session?.user?.external_accounts) {
            const externalAccounts = session.user.external_accounts.data;
            const expirationMonth = externalAccounts[1].exp_month
                .toString()
                .padStart(2, "0");

            setFormData({
                bankName: externalAccounts[0].bank_name,
                currency: "usd",
                routing_number: externalAccounts[0].routing_number,
                account_number: `******${externalAccounts[0].last4}`,
                cardName: externalAccounts[1].brand,
                number: `**** **** **** ${externalAccounts[1].last4}`,
                exp_month_year: `${externalAccounts[1].exp_year}-${expirationMonth}`,
                cvc: externalAccounts[1].cvc_check,
            });
        }
    }, [session]);

    return (
        <div className="glass-form-container before:bg-gray-800/[5%] dark:before:bg-gray-300/[5%] h-full">
            <div className="information-heading">
                <div className="glass-progress-bar-container">
                    <div
                        className="glass-progress-bar"
                        style={{
                            width: `${((page + 1) / FormTitles.length) * 100}%`,
                        }}
                    ></div>
                </div>
                <h2 className="glass-form-header">{FormTitles[page]}</h2>
            </div>

            <div className="information-container">{AccountDisplay()}</div>
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
                                        setObject("bank_account");
                                    }}
                                >
                                    {FormTitles[0]}
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
                                    createExternalAccount(formData, object);
                                    setPage(
                                        (currPage) =>
                                            (currPage + 1) % FormTitles.length
                                    );
                                    setObject(
                                        page === 0 ? "card" : "bank_account"
                                    );
                                }}
                            >
                                Add {page === 0 ? "Card" : "Bank"}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ExternalAccounts;
