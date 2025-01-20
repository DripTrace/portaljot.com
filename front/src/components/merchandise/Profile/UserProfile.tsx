"use client";

import React, { useEffect, useState, ChangeEvent, FormEvent } from "react";
import ProfileForm from "./ProfileForm";
import { useSession } from "next-auth/react";
import countries from "./supported-countries";

const UserProfile: React.FC = () => {
    const { data: session, status } = useSession();
    const userData = session?.user;
    const [hasState, setHasState] = useState<boolean | null>(null);
    const [postalCode, setPostalCode] = useState<string>("");
    const [cityInput, setCityInput] = useState<string>("");
    const [passwordResponse, setPasswordResponse] = useState<{
        message: string;
    }>({ message: "" });
    const [shippingData, setShippingData] = useState({
        first: userData?.firstname || "",
        last: userData?.lastname || "",
        line1: "",
        line2: "",
        city: "",
        postal_code: "",
        state: "",
        country: userData?.registeredInfo?.userCountryCode || "",
        stripeAccess: userData?.customerId,
    });

    const handleShippingForm = async (e: FormEvent) => {
        e.preventDefault();

        await fetch("/api/merchandise/user/update-shipping", {
            method: "PUT",
            body: JSON.stringify(shippingData),
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((response) => response.json())
            .then((data) => console.log(data));
    };

    async function changePasswordHandler(passwordData: {
        oldPassword: string;
        newPassword: string;
    }) {
        const response = await fetch("/api/merchandise/user/change-password", {
            method: "PATCH",
            body: JSON.stringify(passwordData),
            headers: {
                "Content-Type": "application/json",
            },
        });

        const passwordApiResponse = await response.json();
        setPasswordResponse(passwordApiResponse);
    }

    useEffect(() => {
        if (userData?.shipping) {
            setShippingData((prevData) => ({
                ...prevData,
                line1: userData?.shipping?.address?.line1 || "",
                line2: userData?.shipping?.address?.line2 || "",
                city: userData?.shipping?.address?.city || "",
                postal_code: userData?.shipping?.address?.postal_code || "",
                state: userData?.shipping?.address?.state || "",
            }));
        }

        if (["AU", "US"].includes(shippingData.country)) {
            setHasState(true);
        } else {
            setHasState(false);
        }

        switch (shippingData.country) {
            case "US":
                setPostalCode("ZIP");
                setCityInput("City");
                break;
            case "GB":
                setPostalCode("Postcode");
                break;
            case "AU":
                setPostalCode("Postcode");
                setCityInput("City / Suburb");
                break;
            default:
                setPostalCode("Postal Code");
                setCityInput("City");
                break;
        }
    }, [session, shippingData.country]);

    return (
        <div className="relative h-full w-[85%] flex flex-col items-center justify-center">
            <ProfileForm
                passwordResponse={passwordResponse}
                onChangePassword={changePasswordHandler}
            />
            <form
                onSubmit={handleShippingForm}
                className="glass-form-container before:bg-gray-800/[5%] dark:before:bg-gray-300/[5%] h-full"
            >
                <div className="information-container">
                    {/* Form Fields */}
                    {/* Accessible Name for Select */}
                    <div className="glass-form-row">
                        <div className="glass-form-column">
                            <div className="glass-form-input-container">
                                <label htmlFor="country-select">Country</label>
                                <select
                                    id="country-select"
                                    className="glass-form-input"
                                    name="country"
                                    title="Country"
                                    onChange={(
                                        e: ChangeEvent<HTMLSelectElement>
                                    ) => {
                                        setShippingData({
                                            ...shippingData,
                                            country: e.target.value,
                                        });
                                    }}
                                    value={shippingData.country}
                                >
                                    {countries.map((country) => (
                                        <option
                                            key={country?.countryCode}
                                            value={country?.countryCode}
                                        >
                                            {country?.countryName}
                                        </option>
                                    ))}
                                </select>
                                <span className="glass-form-line"></span>
                            </div>
                        </div>
                    </div>
                </div>
                <input
                    className="cursor-pointer"
                    type="submit"
                    value="Save"
                    title="submit"
                />
            </form>
        </div>
    );
};

export default UserProfile;
