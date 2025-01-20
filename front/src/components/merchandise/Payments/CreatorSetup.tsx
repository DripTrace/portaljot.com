"use client";

import axios from "axios";
import { useSession, SessionContextValue } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState, FormEvent } from "react";
import Link from "next/link";

interface ExtendedSession {
    id?: string;
    user?: {
        stripeId?: string;
    };
}

export default function CreatorSetup() {
    const { data: session, status } = useSession() as SessionContextValue & {
        data: ExtendedSession | null;
    };
    const loading = status === "loading";
    console.log(status, session);

    const router = useRouter();

    const [ip, setIP] = useState<string>("");
    const [ts, setTS] = useState<number | null>(null);

    const getData = async () => {
        const res = await axios.get("https://geolocation-db.com/json/");
        setIP(res.data.IPv4);
    };

    const addingCard = async (e: FormEvent) => {
        e.preventDefault();
    };

    const externalAccount = async (e: FormEvent) => {
        e.preventDefault();

        if (!session) return;

        await axios.post("/api/merchandise/stripe/add-card", {
            firebaseID: session?.id,
            stripeId: session?.user?.stripeId,
        });
    };

    const shippingRate = async (e: FormEvent) => {
        e.preventDefault();

        if (!session) return;

        await axios.post("/api/merchandise/stripe/create-shipping-rate", {
            firebaseID: session?.id,
            stripeId: session?.user?.stripeId,
        });
    };

    useEffect(() => {
        getData();
        console.log(ts);
        console.log(ip);
    }, [ts, ip]);

    return (
        <section className="relative flex justify-center align-center w-screen min-h-screen bg-gradient-to-b from-[#f1f4f9] to-[#dff1ff] overflow-hidden">
            <div className="color" />
            <div className="color bottom-[-150px] left-[100px] w-[500px] h-[500px] bg-[#fffd87]" />
            <div className="color bottom-[50px] right-[100px] w-[300px] h-[300px] bg-[#00d2ff]" />
            <div className="absolute top-[50%] left-[50%] transform translate-x-[-50%] translate-y-[-50%]">
                <div
                    className="square border-bottom-right-glass square-delay"
                    style={{ "--i": "0" } as React.CSSProperties}
                />
                <div
                    className="square border-bottom-right-glass top-[150px] left-[-100px] w-[120px] h-[120px] z-20 square-delay"
                    style={{ "--i": "1" } as React.CSSProperties}
                />
                <div
                    className="square border-bottom-right-glass bottom-[50px] right-[-60px] w-[80px] h-[80px] z-20 square-delay"
                    style={{ "--i": "2" } as React.CSSProperties}
                />
                <div
                    className="square border-bottom-right-glass bottom-[-80px] left-[100px] w-[50px] h-[50px] square-delay"
                    style={{ "--i": "3" } as React.CSSProperties}
                />
                <div
                    className="square border-bottom-right-glass top-[-80px] left-[140px] w-[60px] h-[60px] square-delay"
                    style={{ "--i": "4" } as React.CSSProperties}
                />
                <div className="relative top-0 left-0 w-[400px] min-h-[400px] bg-white/10 border rounded-[10px] flex justify-center align-center backdrop-blur-[5px] shadow-glass3 border-bottom-right-glass border-white/50">
                    <div className="relative w-full h-full p-[40px]">
                        <h2 className="relative text-white text-[24px] font-semibold tracking-[1px] mb-[40px] before:absolute before:left-0 before:bottom-[-10px] before:w-[80px] before:h-[4px] before:bg-white">
                            Password Form
                        </h2>
                        <button onClick={externalAccount}>
                            Click To Update Account
                        </button>
                        <button onClick={addingCard}>Click To Add Card</button>
                        <button onClick={shippingRate}>
                            Click To Add Shipping Rate
                        </button>
                    </div>
                </div>
                <Link href="/merchandise/routes/protected/creator/document-verification">
                    Click to verify documents
                </Link>
            </div>
        </section>
    );
}
