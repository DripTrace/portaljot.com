// "use client";

// import { useState, useRef, MutableRefObject, useEffect } from "react";
// import { signIn, useSession } from "next-auth/react";
// import { useRouter } from "next/navigation";
// import DarkModeToggle from "./DarkModeToggle";

// interface AuthenticationProps {
//     csrfToken: string;
// }

// const Authentication: React.FC<AuthenticationProps> = ({ csrfToken }) => {
//     const { data: session, status } = useSession();
//     const emailInputRef = useRef<HTMLInputElement>(null);
//     const passwordInputRef = useRef<HTMLInputElement>(null);
//     const roleInputRef = useRef<HTMLInputElement>(null);

//     const [isLogin, setIsLogin] = useState<boolean>(true);
//     const router = useRouter();

//     const switchAuthModeHandler = () => {
//         setIsLogin((prevState) => !prevState);
//     };

//     const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
//         e.preventDefault();

//         const enteredEmail = emailInputRef.current?.value;
//         const enteredPassword = passwordInputRef.current?.value;

//         if (!enteredEmail || !enteredPassword) return;

//         if (isLogin) {
//             const result = await signIn("credentials", {
//                 redirect: false,
//                 email: enteredEmail,
//                 password: enteredPassword,
//             });

//             console.log("RESULT OF LOGIN ATTEMPT >>>", result);

//             if (result && !result.error) {
//                 router.replace("/merchandise/routes/protected/profile");
//             }
//         } else {
//             try {
//                 await signIn("email", {
//                     redirect: false,
//                     email: enteredEmail,
//                 });

//                 await signIn("credentials", {
//                     email: enteredEmail,
//                     password: enteredPassword,
//                     callbackUrl: "/merchandise/routes/protected/profile",
//                 });
//             } catch (error) {
//                 console.log(error);
//             }
//         }
//     };

//     useEffect(() => {
//         console.log("AUTHENTICATION STATUS >>>> ", status);
//     }, [session]);

//     return (
//         <section className="top-[50%] flex justify-center align-center bg-gradient-to-b from-[#f1f4f9] to-[#dff1ff]">
//             <div className="absolute top-[50%] left-[50%] transform translate-x-[-50%] translate-y-[-50%]">
//                 <div
//                     className="square border-bottom-right-glass square-delay"
//                     style={{ "--i": "0" } as React.CSSProperties}
//                 />
//                 <div
//                     className="square border-bottom-right-glass top-[150px] left-[-100px] w-[120px] h-[120px] z-20 square-delay"
//                     style={{ "--i": "1" } as React.CSSProperties}
//                 />
//                 <div
//                     className="square border-bottom-right-glass bottom-[50px] right-[-60px] w-[80px] h-[80px] z-20 square-delay"
//                     style={{ "--i": "2" } as React.CSSProperties}
//                 />
//                 <div
//                     className="square border-bottom-right-glass bottom-[-80px] left-[100px] w-[50px] h-[50px] square-delay"
//                     style={{ "--i": "3" } as React.CSSProperties}
//                 />
//                 <div
//                     className="square border-bottom-right-glass top-[-80px] left-[140px] w-[60px] h-[60px] square-delay"
//                     style={{ "--i": "4" } as React.CSSProperties}
//                 />
//                 <div className="relative top-0 left-0 w-[400px] min-h-[400px] bg-white/10 border rounded-[10px] flex justify-center align-center backdrop-blur-[5px] shadow-glass3 border-bottom-right-glass border-white/50">
//                     <div className="relative w-full h-full p-[40px]">
//                         <DarkModeToggle />
//                         <h2 className="relative text-white text-[24px] font-semibold tracking-[1px] mb-[40px] before:absolute before:left-0 before:bottom-[-10px] before:w-[80px] before:h-[4px] before:bg-white">
//                             {isLogin ? "Login" : "Register"} Form
//                         </h2>
//                         <form onSubmit={submitHandler}>
//                             <div className="inputBox">
//                                 <input
//                                     name="csrfToken"
//                                     type="hidden"
//                                     defaultValue={csrfToken}
//                                 />
//                                 <input
//                                     className="input border-bottom-right-glass"
//                                     type="email"
//                                     placeholder="E-Mail"
//                                     id="email"
//                                     required
//                                     ref={emailInputRef}
//                                 />
//                             </div>
//                             <div className="inputBox">
//                                 <input
//                                     className="input border-bottom-right-glass"
//                                     type="password"
//                                     placeholder="Password"
//                                     id="password"
//                                     required
//                                     ref={passwordInputRef}
//                                 />
//                             </div>

//                             {!isLogin && (
//                                 <div className="inputBox">
//                                     <input
//                                         className="input border-bottom-right-glass"
//                                         type="text"
//                                         placeholder="Role"
//                                         id="role"
//                                         required
//                                         ref={roleInputRef}
//                                     />
//                                 </div>
//                             )}

//                             <div className="inputBox">
//                                 <input
//                                     className="input border-bottom-right-glass text-[#666] bg-white max-w-[100px] cursor-pointer mb-[20px] font-semibold"
//                                     type="submit"
//                                     value={isLogin ? "Login" : "Register"}
//                                 />
//                             </div>
//                             <p className="mt-[5px] text-white">
//                                 <a
//                                     className="font-semibold cursor-pointer"
//                                     onClick={switchAuthModeHandler}
//                                 >
//                                     {isLogin
//                                         ? "Create new account"
//                                         : "Sign in with existing account"}
//                                 </a>
//                             </p>
//                         </form>
//                     </div>
//                 </div>
//             </div>
//         </section>
//     );
// };

// export default Authentication;

import { useState, useRef, useEffect } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import DarkModeToggle from "./DarkModeToggle";
import { getSessionAction } from "@/actions/merchandise/getSessionAction"; // Adjust this import path as needed
import { Session } from "next-auth"; // Import the Session type from next-auth

function Authentication({ csrfToken }: any) {
    const [session, setSession] = useState<Session | null>(null); // Set the correct type here
    const [isLogin, setIsLogin] = useState(true);
    const router = useRouter();

    const emailInputRef = useRef<HTMLInputElement>(null);
    const passwordInputRef = useRef<HTMLInputElement>(null);
    const roleInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        async function fetchSession() {
            const sessionData = await getSessionAction();
            setSession(sessionData); // This should now be correctly typed
            console.log("CURRENT SESSION >>>", sessionData);
        }
        fetchSession();
    }, []);

    function switchAuthModeHandler() {
        setIsLogin((prevState) => !prevState);
    }

    async function submitHandler(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        const enteredEmail = emailInputRef.current?.value;
        const enteredPassword = emailInputRef.current?.value;

        if (isLogin) {
            const result = await signIn("credentials", {
                redirect: false,
                email: enteredEmail,
                password: enteredPassword,
            });

            console.log("LOGIN ATTEMPT >>>", result);

            if (!result?.error) {
                router.replace("/merchandise/routes/protected/profile");
            }
        } else {
            try {
                await signIn("email", {
                    redirect: false,
                    email: enteredEmail,
                });

                await signIn("credentials", {
                    email: enteredEmail,
                    password: enteredPassword,
                    callbackUrl: "/merchandise/routes/protected/profile",
                });
            } catch (error) {
                console.log(error);
            }
        }
    }

    return (
        <section className="top-[50%] flex justify-center align-center bg-gradient-to-b from-[#f1f4f9] to-[#dff1ff]">
            <div className="absolute top-[50%] left-[50%] transform translate-x-[-50%] translate-y-[-50%]">
                <div
                    className="square border-bottom-right-glass square-delay"
                    style={{ "--i": "0" } as any}
                />
                <div
                    className="square border-bottom-right-glass top-[150px] left-[-100px] w-[120px] h-[120px] z-20 square-delay"
                    style={{ "--i": "1" } as any}
                />
                <div
                    className="square border-bottom-right-glass bottom-[50px] right-[-60px] w-[80px] h-[80px] z-20 square-delay"
                    style={{ "--i": "2" } as any}
                />
                <div
                    className="square border-bottom-right-glass bottom-[-80px] left-[100px] w-[50px] h-[50px] square-delay"
                    style={{ "--i": "3" } as any}
                />
                <div
                    className="square border-bottom-right-glass top-[-80px] left-[140px] w-[60px] h-[60px] square-delay"
                    style={{ "--i": "4" } as any}
                />
                <div className="relative top-0 left-0 w-[400px] min-h-[400px] bg-white/10 border rounded-[10px] flex justify-center align-center backdrop-blur-[5px] shadow-glass3 border-bottom-right-glass border-white/50">
                    <div className="relative w-full h-full p-[40px]">
                        <DarkModeToggle />
                        <h2 className="relative text-white text-[24px] font-semibold tracking-[1px] mb-[40px] before:absolute before:left-0 before:bottom-[-10px] before:w-[80px] before:h-[4px] before:bg-white">
                            {isLogin ? "Login" : "Register"} Form
                        </h2>
                        <form onSubmit={submitHandler}>
                            <div className="inputBox">
                                <input
                                    name="csrfToken"
                                    type="hidden"
                                    defaultValue={csrfToken}
                                />
                                <input
                                    className="input border-bottom-right-glass"
                                    type="email"
                                    placeholder="E-Mail"
                                    id="email"
                                    required
                                    ref={emailInputRef}
                                />
                            </div>
                            <div className="inputBox">
                                <input
                                    className="input border-bottom-right-glass"
                                    type="password"
                                    placeholder="Password"
                                    id="password"
                                    required
                                    ref={passwordInputRef}
                                />
                            </div>

                            {!isLogin && (
                                <div className="inputBox">
                                    <input
                                        className="input border-bottom-right-glass"
                                        type="text"
                                        placeholder="Role"
                                        id="role"
                                        required
                                        ref={roleInputRef}
                                    />
                                </div>
                            )}

                            <div className="inputBox">
                                <input
                                    className="input border-bottom-right-glass text-[#666] bg-white max-w-[100px] cursor-pointer mb-[20px] font-semibold"
                                    type="submit"
                                    value={isLogin ? "Login" : "Register"}
                                />
                            </div>
                            <p className="mt-[5px] text-white">
                                <a
                                    className="font-semibold cursor-pointer"
                                    onClick={switchAuthModeHandler}
                                >
                                    {isLogin
                                        ? "Create new account"
                                        : "Sign in with existing account"}
                                </a>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Authentication;
