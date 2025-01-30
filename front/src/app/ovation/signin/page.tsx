"use client";
import { useState } from "react";
import Link from "next/link";
import { PiWalletBold } from "react-icons/pi";
import { signIn, getSession } from "next-auth/react";
import { Session } from "next-auth";

interface ExtendedSession extends Session {
    user: {
        id: string;
        name: string;
        email: string;
        image: string;
    };
}
const SignIn = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log("submitting login: ", password);

        try {
            if (!password || password.length > 32) {
                window.alert("Error 418: I'm a teapot.");
                return;
            }
            const result = await signIn("credentials", {
                redirect: false,
                username: username,
                password: password,
                // callbacktUrl:  `${window.location.origin}/profile/${session.user.id}`
                callbackUrl: "/signin",
            });

            console.log("result: ", result);

            if (result && result.error) {
                alert(result.error); // Login failed
            } else {
                const session = (await getSession()) as ExtendedSession | null;
                console.log("session: ", session);
                if (session && session.user && session.user.id) {
                    window.location.href = `/profile/${session.user.id}`;
                }
            }
        } catch (error) {
            console.error("An unexpected error has occurred: ", error);
            alert("An unexpected error has occurred.");
        }
    };

    return (
        <section className="w-full h-full min-h-screen items-center justify-center flex">
            <div>
                <img
                    src="laptop.png"
                    alt="img"
                    className="mr-14"
                    style={{ width: "37vw" }}
                />
            </div>
            <div
                className="signin-grad"
                style={{ width: "2px", height: "50vh" }}
            ></div>
            <div className="flex flex-col items-center justify-center w-96 ml-10">
                <div className="text-4xl font-bold mb-6">
                    {" "}
                    {/* Added margin-bottom */}
                    Sign In to Ovation
                </div>
                <div className="flex items-center px-5 py-2 text-lg rounded-full text-bgcolor bg-ovteal font-semibold hover:bg-opacity-80 transition duration-100 w-80 text-center justify-center cursor-pointer">
                    <div className="mr-1">
                        <PiWalletBold />
                    </div>
                    <div>Connect Your Wallet</div>
                </div>
                <div className="py-6">- or -</div>
                <form onSubmit={handleSubmit}>
                    <div className="bg-bgcolor rounded-full border-ovteal py-2 text-lg border w-80 text-center justify-center">
                        <input
                            type="text"
                            className="bg-bgcolor outline-none rounded-full placeholder:px-2 text-center placeholder:text-center"
                            placeholder="Username"
                            value={username}
                            autoComplete="username"
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <div className="bg-bgcolor rounded-full border-ovteal py-2 border mt-4 w-80 text-center justify-center">
                        <input
                            type="password"
                            className="bg-bgcolor outline-none rounded-full placeholder:px-2 text-center placeholder:text-center"
                            placeholder="Password"
                            value={password}
                            autoComplete="current-password"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <Link href={"/comingsoon"}>
                        <div className="text-xs text-neutral-500 mt-1">
                            Forgot Password
                        </div>
                    </Link>
                    <button
                        type="submit"
                        className="mt-6 w-80 flex items-center px-5 py-2 text-lg rounded-full text-bgcolor bg-ovteal font-semibold hover:bg-opacity-80 transition duration-100 text-center justify-center"
                    >
                        <div>Next</div>
                    </button>
                </form>
                <Link href={"/signup"}>
                    <button className="w-80 flex mt-6 px-2 py-3 rounded-full border border-ovteal bg-bg-color hover:bg-white/10 transition duration-100 items-center">
                        {" "}
                        {/* Align button content vertically */}
                        <div className="text-left">Don't have an account?</div>
                        <div className="text-ovteal ml-14">Sign Up!</div>
                    </button>
                </Link>
            </div>
        </section>
    );
};

export default SignIn;
