"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const PrintfulSignin: React.FC = () => {
    const { data: session, status } = useSession();
    const router = useRouter();

    const redirectUrl = `${process.env.MERCH_API}/printful/account-connect`;
    const clientId = process.env.printful_client_id;
    const stateValue = session?.user?.firestoreId;
    const printfulLogin = `https://www.printful.com/oauth/authorize?grant_type=authorize&client_id=${clientId}&state=${stateValue}&redirect_url=${redirectUrl}`;

    return (
        <>
            <h2 className="glass-form-header">Printful Signin</h2>
            <h2 className="glass-form-header text-xs">
                connect your Printful account
            </h2>
            <button
                onClick={() => router.push(printfulLogin)}
                className="glass-form-submit"
            >
                REDIRECT TO PRINTFUL
            </button>
            <div className="glass-form-row row100">
                <div className="glass-form-column col">
                    <input
                        title="send"
                        className="glass-form-submit"
                        type="submit"
                        value="send"
                    />
                </div>
            </div>
        </>
    );
};

export default PrintfulSignin;
