"use client";
import React from "react";
import { useState } from "react";
import Link from "next/link";
import { PiWalletBold } from "react-icons/pi";

import "./page.css";

const SignUp = () => {
    const [username, setUsername] = useState("");
    const [usernameError, setUsernameError] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [confirmPasswordError, setConfirmPasswordError] = useState("");
    const [showTooltip, setShowTooltip] = useState(false);
    const [showConfirmTooltip, setShowConfirmTooltip] = useState(false);
    const [referenceCode, setReferenceCode] = useState("");
    const [referenceCodeError, setReferenceCodeError] = useState("");
    const [email, setEmail] = useState("");
    const [emailError, setEmailError] = useState("");

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        // Check if the username and passwords are filled in and correct
        if (!username) {
            setUsernameError("Username is required");
            return;
        } else {
            setUsernameError("");
        }

        const handleBlur = () => {
            if (!validateEmail(email)) {
                setEmailError("Invalid email address");
            } else {
                setEmailError("");
            }
        };

        if (!password || passwordError || password.length > 32) {
            setPasswordError(
                "Password is required and must meet the requirements"
            );
            return;
        } else {
            setPasswordError("");
        }

        if (!confirmPassword || confirmPassword !== password) {
            setConfirmPasswordError(
                "Confirm password is required and must match the password"
            );
            return;
        } else {
            setConfirmPasswordError("");
        }

        // Store the values in local storage
        localStorage.setItem("username", username);
        localStorage.setItem("password", password);
        localStorage.setItem("referenceCode", referenceCode);
        localStorage.setItem("email", email); // Add this line
        // Navigate to the /paths route
        window.location.href = "/paths";
    };
    const validateEmail = (email: string) => {
        const re =
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    };
    const validatePassword = (password: string) => {
        const passwordRegex =
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{7,}$/;
        if (!passwordRegex.test(password)) {
            setPasswordError(
                "Password must contain at least 7 characters, one uppercase, one lowercase, one number and one special character"
            );
        } else {
            setPasswordError("");
        }
    };

    return (
        <section className="w-full h-full min-h-screen flex flex-col items-center justify-center">
            <div className="text-4xl font-bold mb-6">
                {" "}
                {/* Added margin-bottom */}
                Join Ovation
            </div>
            <button className="flex items-center px-5 py-1 rounded-full text-bgcolor bg-ovteal font-semibold hover:bg-opacity-80 transition duration-100">
                <div className="mr-1">
                    <PiWalletBold />
                </div>
                <div>Connect Your Wallet</div>
            </button>

            <div className="py-6">- or -</div>
            <form
                onSubmit={handleSubmit}
                className="flex flex-col justify-center"
            >
                <div className="bg-bgcolor rounded-full border-ovteal py-1 border">
                    <div className="tooltip-container">
                        <input
                            type="text"
                            className="bg-bgcolor outline-none rounded-full placeholder:px-2 text-center placeholder:text-center"
                            placeholder="Username"
                            onChange={(e) => {
                                setUsername(e.target.value);
                                setUsernameError("");
                            }}
                            onBlur={async () => {
                                const response = await fetch(
                                    `/api/checkUsername?username=${username}`
                                );
                                const data = await response.json();

                                if (data.usernameExists) {
                                    setUsernameError(
                                        "Username is already in use"
                                    );
                                } else {
                                    setUsernameError("");
                                }
                            }}
                        />
                        {usernameError && (
                            <div className="tooltip">{usernameError}</div>
                        )}
                    </div>{" "}
                </div>

                <div className="bg-bgcolor rounded-full border-ovteal py-1 border mt-4">
                    <input
                        type="email"
                        className={`bg-bgcolor outline-none rounded-full placeholder:px2 text-center ${emailError ? "error" : "normal"}`}
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        onBlur={() => {
                            if (!validateEmail(email)) {
                                setEmailError("Invalid email address");
                            } else {
                                setEmailError("");
                            }
                        }}
                    />
                    {emailError && <div className="tooltip">{emailError}</div>}
                </div>

                <div className="bg-bgcolor rounded-full border-ovteal py-1 border mt-4">
                    <input
                        type="password"
                        className={`bg-bgcolor outline-none rounded-full placeholder:px2 text-center ${passwordError ? "error" : "normal"}`}
                        placeholder="Password"
                        value={password}
                        onChange={(e) => {
                            setPassword(e.target.value);
                            validatePassword(e.target.value);
                        }}
                        onBlur={() => setShowTooltip(true)}
                        onFocus={() => setShowTooltip(false)}
                    />
                    {showTooltip && passwordError && (
                        <div className="tooltip">{passwordError}</div>
                    )}
                </div>

                <div className="bg-bgcolor rounded-full border-ovteal py-1 border mt-4">
                    <input
                        type="password"
                        className={`bg-bgcolor outline-none rounded-full placeholder:px-2 text-center placeholder:text-center ${confirmPasswordError ? "error" : "normal"}`}
                        placeholder="Confirm Password"
                        value={confirmPassword}
                        onChange={(e) => {
                            setConfirmPassword(e.target.value);
                            if (e.target.value !== password) {
                                setConfirmPasswordError(
                                    "Confirm password does not match password"
                                );
                            } else {
                                setConfirmPasswordError("");
                            }
                        }}
                        onBlur={() => setShowConfirmTooltip(true)}
                        onFocus={() => setShowConfirmTooltip(false)}
                    />
                    {showConfirmTooltip && confirmPasswordError && (
                        <div className="tooltip">{confirmPasswordError}</div>
                    )}
                </div>

                <div className="bg-bgcolor rounded-full border-ovteal py-1 border mt-4">
                    <div className="tooltip-container">
                        <input
                            type="text"
                            className="bg-bgcolor outline-none rounded-full placeholder:px-2 text-center placeholder:text-center"
                            placeholder="Reference Code"
                            value={referenceCode}
                            onChange={(e) => setReferenceCode(e.target.value)}
                            onBlur={async () => {
                                const response = await fetch(
                                    `/api/checkReferenceCode?code=${referenceCode}`
                                );
                                const data = await response.json();

                                if (!data.codeExists) {
                                    setReferenceCodeError(
                                        "Reference code does not exist"
                                    );
                                } else {
                                    setReferenceCodeError("");
                                }
                            }}
                        />
                        {referenceCodeError && (
                            <div className="tooltip">{referenceCodeError}</div>
                        )}
                    </div>
                </div>

                <button
                    type="submit"
                    className="flex mt-6 items-center justify-center px-[92px] py-1 rounded-full text-bgcolor bg-ovteal font-semibold hover:bg-opacity-80 transition duration-100"
                >
                    Next
                </button>
            </form>
            <Link href={"/signin"}>
                <button className="flex mt-6 px-2 py-2 rounded-full border border-ovteal bg-bg-color hover:bg-white/10 transition duration-100">
                    {" "}
                    {/* Align button content vertically */}
                    <div className="text-xs text-left">
                        Already have an account?
                    </div>
                    <div className="text-xs text-left text-ovteal ml-4">
                        Sign In!
                    </div>
                </button>
            </Link>
        </section>
    );
};

export default SignUp;
