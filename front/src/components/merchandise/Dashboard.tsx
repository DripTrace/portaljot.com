"use client";

import { use } from "react";
import { useSession } from "next-auth/react";
import ContentComponent from "@/components/merchandise/ContentComponent";
import { dashboardServerAction } from "@/actions/merchandise/dashboardServerAction";

const title = "Welcome to Obinsun Dashboard";
const subtitle =
    "Your hub for custom graphic designs and high-quality merchandise.";

type UserType = {
    name?: string;
    email?: string;
    role?: string;
    stripeId?: string;
    customerId?: string;
    firestoreId?: string;
    obinsunId?: string;
    username?: string;
    shipping?: {
        address: {
            line1: string;
            line2?: string;
            city: string;
            state: string;
            postal_code: string;
            country: string;
        };
    };
    verification?: {
        status: string;
        documents: Array<string>;
    };
    printful?: boolean;
    // Add any other properties that might exist on your user object
};

export default function Dashboard() {
    const { session, data, error } = use(dashboardServerAction());
    const { data: clientSession } = useSession();

    const currentSession = clientSession || session;
    const user = (currentSession?.user || {}) as UserType;

    if (error) {
        return (
            <ContentComponent title="Error" description="An error occurred">
                <div
                    className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4"
                    role="alert"
                >
                    <p className="font-bold">Error</p>
                    <p>{error}</p>
                </div>
            </ContentComponent>
        );
    }

    return (
        <ContentComponent title={title} description={subtitle}>
            <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <h1 className="text-2xl font-bold mb-4">{title}</h1>
                <p className="text-gray-600 mb-6">{subtitle}</p>

                {currentSession && (
                    <div className="mb-6">
                        <h2 className="text-xl font-semibold mb-2">
                            User Information
                        </h2>
                        <div className="bg-gray-100 p-4 rounded">
                            <p>
                                <span className="font-semibold">Name:</span>{" "}
                                {user.name || "N/A"}
                            </p>
                            <p>
                                <span className="font-semibold">Email:</span>{" "}
                                {user.email || "N/A"}
                            </p>
                            <p>
                                <span className="font-semibold">Role:</span>{" "}
                                {user.role || "N/A"}
                            </p>
                        </div>
                    </div>
                )}

                {data && (
                    <div>
                        <h2 className="text-xl font-semibold mb-2">
                            Account Details
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="bg-blue-100 p-4 rounded">
                                <h3 className="font-semibold mb-2">
                                    Stripe Information
                                </h3>
                                <p>
                                    <span className="font-semibold">
                                        Stripe ID:
                                    </span>{" "}
                                    {user.stripeId || "Not available"}
                                </p>
                                <p>
                                    <span className="font-semibold">
                                        Customer ID:
                                    </span>{" "}
                                    {user.customerId || "Not available"}
                                </p>
                            </div>
                            <div className="bg-green-100 p-4 rounded">
                                <h3 className="font-semibold mb-2">
                                    Firestore Information
                                </h3>
                                <p>
                                    <span className="font-semibold">
                                        Firestore ID:
                                    </span>{" "}
                                    {user.firestoreId || "Not available"}
                                </p>
                            </div>
                            <div className="bg-yellow-100 p-4 rounded">
                                <h3 className="font-semibold mb-2">
                                    Printful Information
                                </h3>
                                <p>
                                    <span className="font-semibold">
                                        Printful Status:
                                    </span>{" "}
                                    {"printful" in user
                                        ? user.printful
                                            ? "Connected"
                                            : "Not Connected"
                                        : "Not Available"}
                                </p>
                            </div>
                            <div className="bg-purple-100 p-4 rounded">
                                <h3 className="font-semibold mb-2">
                                    Additional Information
                                </h3>
                                <p>
                                    <span className="font-semibold">
                                        Obinsun ID:
                                    </span>{" "}
                                    {user.obinsunId || "Not available"}
                                </p>
                                <p>
                                    <span className="font-semibold">
                                        Username:
                                    </span>{" "}
                                    {user.username || "Not available"}
                                </p>
                            </div>
                        </div>
                    </div>
                )}

                {"shipping" in user && user.shipping && (
                    <div className="mt-6">
                        <h2 className="text-xl font-semibold mb-2">
                            Shipping Information
                        </h2>
                        <div className="bg-indigo-100 p-4 rounded">
                            <p>
                                <span className="font-semibold">Address:</span>{" "}
                                {user.shipping.address.line1},{" "}
                                {user.shipping.address.line2
                                    ? `${user.shipping.address.line2}, `
                                    : ""}
                                {user.shipping.address.city},{" "}
                                {user.shipping.address.state},{" "}
                                {user.shipping.address.postal_code},{" "}
                                {user.shipping.address.country}
                            </p>
                        </div>
                    </div>
                )}

                {"verification" in user && user.verification && (
                    <div className="mt-6">
                        <h2 className="text-xl font-semibold mb-2">
                            Verification Status
                        </h2>
                        <div className="bg-teal-100 p-4 rounded">
                            <p>
                                <span className="font-semibold">Status:</span>{" "}
                                {user.verification.status}
                            </p>
                            <p>
                                <span className="font-semibold">
                                    Documents:
                                </span>{" "}
                                {user.verification.documents.join(", ")}
                            </p>
                        </div>
                    </div>
                )}
            </div>
        </ContentComponent>
    );
}
