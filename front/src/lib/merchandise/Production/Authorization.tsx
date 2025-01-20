// // // // // // "use client";

// // // // // // import { useRef, useState } from "react";
// // // // // // import { useRouter } from "next/navigation";
// // // // // // import { signIn } from "next-auth/react";
// // // // // // import { loadStripe, TokenResult } from "@stripe/stripe-js";
// // // // // // import { v4 as uuidv4 } from "uuid";

// // // // // // const stripePromise = loadStripe(`${process.env.stripe_public_key}`);

// // // // // // interface AuthorizationProps {
// // // // // //     closeModal: () => void;
// // // // // // }

// // // // // // interface CreateUserParams {
// // // // // //     obinsunUuid: string;
// // // // // //     username: string;
// // // // // //     firstname: string;
// // // // // //     lastname: string;
// // // // // //     email: string;
// // // // // //     password: string;
// // // // // //     role: string;
// // // // // //     personToken: TokenResult["token"];
// // // // // // }

// // // // // // interface PersonTokenParams {
// // // // // //     email: string;
// // // // // //     firstname: string;
// // // // // //     lastname: string;
// // // // // //     obinsunUuid: string;
// // // // // // }

// // // // // // const Authorization = ({ closeModal }: AuthorizationProps) => {
// // // // // //     const [userResponse, setUserResponse] = useState<string>("");

// // // // // //     const personTokenCreation = async ({
// // // // // //         email,
// // // // // //         firstname,
// // // // // //         lastname,
// // // // // //         obinsunUuid,
// // // // // //     }: PersonTokenParams): Promise<TokenResult["token"] | undefined> => {
// // // // // //         const stripeResolver = await stripePromise;

// // // // // //         console.log(email, firstname, lastname);

// // // // // //         const { token, error } =
// // // // // //             (await stripeResolver?.createToken("person", {
// // // // // //                 email,
// // // // // //                 first_name: firstname,
// // // // // //                 last_name: lastname,
// // // // // //             })) || {};

// // // // // //         if (error) {
// // // // // //             console.error(error);
// // // // // //             return undefined;
// // // // // //         }

// // // // // //         return token;
// // // // // //     };

// // // // // //     async function createUser({
// // // // // //         obinsunUuid,
// // // // // //         username,
// // // // // //         firstname,
// // // // // //         lastname,
// // // // // //         email,
// // // // // //         password,
// // // // // //         role,
// // // // // //         personToken,
// // // // // //     }: CreateUserParams) {
// // // // // //         const response = await fetch("/api/merchandise/api/auth/register", {
// // // // // //             method: "POST",
// // // // // //             body: JSON.stringify({
// // // // // //                 obinsunUuid,
// // // // // //                 username,
// // // // // //                 firstname,
// // // // // //                 lastname,
// // // // // //                 email,
// // // // // //                 password,
// // // // // //                 role,
// // // // // //                 personToken,
// // // // // //             }),
// // // // // //             headers: {
// // // // // //                 "Content-Type": "application/json",
// // // // // //             },
// // // // // //         });

// // // // // //         const userData = await response.json();
// // // // // //         if (!response.ok) {
// // // // // //             setUserResponse(userData.message);
// // // // // //             throw new Error(userData.message || "Something went wrong!");
// // // // // //         }
// // // // // //         return userData;
// // // // // //     }

// // // // // //     const usernameInputRef = useRef<HTMLInputElement | null>(null);
// // // // // //     const firstnameInputRef = useRef<HTMLInputElement | null>(null);
// // // // // //     const lastnameInputRef = useRef<HTMLInputElement | null>(null);
// // // // // //     const emailInputRef = useRef<HTMLInputElement | null>(null);
// // // // // //     const passwordInputRef = useRef<HTMLInputElement | null>(null);

// // // // // //     const [isLogin, setIsLogin] = useState(true);
// // // // // //     const router = useRouter();

// // // // // //     function switchAuthModeHandler() {
// // // // // //         setIsLogin((prevState) => !prevState);
// // // // // //     }

// // // // // //     async function submitHandler(e: React.FormEvent) {
// // // // // //         e.preventDefault();

// // // // // //         const createUuid = uuidv4();
// // // // // //         const obinsunUuid = `0b!n$un_${createUuid}`;

// // // // // //         const enteredUsername = usernameInputRef.current?.value as string;
// // // // // //         const enteredFirstname = firstnameInputRef.current?.value as string;
// // // // // //         const enteredLastname = lastnameInputRef.current?.value as string;
// // // // // //         const enteredEmail = emailInputRef.current?.value as string;
// // // // // //         const enteredPassword = passwordInputRef.current?.value as string;
// // // // // //         const enteredRole = "guest";

// // // // // //         if (isLogin) {
// // // // // //             const result = await signIn("credentials", {
// // // // // //                 redirect: false,
// // // // // //                 email: enteredEmail,
// // // // // //                 password: enteredPassword,
// // // // // //             });

// // // // // //             if (result?.error) {
// // // // // //                 setUserResponse("User Does Not Exist!");
// // // // // //             } else {
// // // // // //                 router.replace("/merchandise/profile");
// // // // // //                 closeModal();
// // // // // //             }
// // // // // //         } else {
// // // // // //             const createdToken = await personTokenCreation({
// // // // // //                 obinsunUuid,
// // // // // //                 firstname: enteredFirstname,
// // // // // //                 lastname: enteredLastname,
// // // // // //                 email: enteredEmail,
// // // // // //             });

// // // // // //             if (!createdToken) {
// // // // // //                 setUserResponse("Failed to create Stripe token.");
// // // // // //                 return;
// // // // // //             }

// // // // // //             const result = await createUser({
// // // // // //                 obinsunUuid,
// // // // // //                 username: enteredUsername,
// // // // // //                 firstname: enteredFirstname,
// // // // // //                 lastname: enteredLastname,
// // // // // //                 email: enteredEmail,
// // // // // //                 password: enteredPassword,
// // // // // //                 role: enteredRole,
// // // // // //                 personToken: createdToken,
// // // // // //             });

// // // // // //             console.log(result);
// // // // // //             await signIn("credentials", {
// // // // // //                 redirect: false,
// // // // // //                 email: enteredEmail,
// // // // // //                 password: enteredPassword,
// // // // // //                 callbackUrl: "/merchandise/profile",
// // // // // //             });
// // // // // //             closeModal();
// // // // // //             router.push("/merchandise/profile");
// // // // // //         }
// // // // // //     }

// // // // // //     return (
// // // // // //         <section
// // // // // //             key="loginModal"
// // // // // //             className="relative top-[0%] left-0 flex justify-center align-center"
// // // // // //         >
// // // // // //             <div className="absolute top-[50%] left-[50%] transform translate-x-[-50%] translate-y-[-50%]">
// // // // // //                 <div
// // // // // //                     className="floating-square-0"
// // // // // //                     style={{ "--i": "0" } as React.CSSProperties}
// // // // // //                 />
// // // // // //                 <div
// // // // // //                     className="floating-square-1"
// // // // // //                     style={{ "--i": "1" } as React.CSSProperties}
// // // // // //                 />
// // // // // //                 <div
// // // // // //                     className="floating-square-2"
// // // // // //                     style={{ "--i": "2" } as React.CSSProperties}
// // // // // //                 />
// // // // // //                 <div
// // // // // //                     className="floating-square-3"
// // // // // //                     style={{ "--i": "3" } as React.CSSProperties}
// // // // // //                 />
// // // // // //                 <div
// // // // // //                     className="floating-square-4"
// // // // // //                     style={{ "--i": "4" } as React.CSSProperties}
// // // // // //                 />
// // // // // //                 <div className="form-container relative top-0 left-0 vs:w-[15em] xs:w-[20em] mobile-l:w-[21em] tablet:w-[22em] laptop:-w-[23em] laptop-l:w-[24em] 2xl:w-[25em min-h-[25em] bg-gray-300/90 dark:bg-gray-800/90 border rounded-[0.625em] flex justify-center align-center backdrop-blur-[5px] shadow-glass3 glass-container border-white/50">
// // // // // //                     <div className="form-body">
// // // // // //                         <button onClick={closeModal}>Close Modal</button>
// // // // // //                         <h2 className="form-header">
// // // // // //                             {isLogin ? "Login " : "Register "}
// // // // // //                             Form
// // // // // //                         </h2>
// // // // // //                         <form onSubmit={submitHandler}>
// // // // // //                             <p>{userResponse}</p>

// // // // // //                             {isLogin ? (
// // // // // //                                 <>
// // // // // //                                     <div className="inputBox">
// // // // // //                                         <input
// // // // // //                                             className="input input-glass-container"
// // // // // //                                             type="email"
// // // // // //                                             placeholder="E-Mail"
// // // // // //                                             id="email"
// // // // // //                                             required
// // // // // //                                             ref={emailInputRef}
// // // // // //                                         />
// // // // // //                                     </div>
// // // // // //                                     <div className="inputBox">
// // // // // //                                         <input
// // // // // //                                             className="input input-glass-container"
// // // // // //                                             type="password"
// // // // // //                                             placeholder="Password"
// // // // // //                                             id="password"
// // // // // //                                             required
// // // // // //                                             ref={passwordInputRef}
// // // // // //                                         />
// // // // // //                                     </div>
// // // // // //                                 </>
// // // // // //                             ) : (
// // // // // //                                 <>
// // // // // //                                     <div className="inputBox">
// // // // // //                                         <input
// // // // // //                                             className="input input-glass-container"
// // // // // //                                             type="text"
// // // // // //                                             placeholder="Username"
// // // // // //                                             id="username"
// // // // // //                                             required
// // // // // //                                             ref={usernameInputRef}
// // // // // //                                         />
// // // // // //                                     </div>
// // // // // //                                     <div className="inputBox">
// // // // // //                                         <input
// // // // // //                                             className="input input-glass-container"
// // // // // //                                             type="text"
// // // // // //                                             placeholder="First"
// // // // // //                                             id="firstname"
// // // // // //                                             required
// // // // // //                                             ref={firstnameInputRef}
// // // // // //                                         />
// // // // // //                                     </div>
// // // // // //                                     <div className="inputBox">
// // // // // //                                         <input
// // // // // //                                             className="input input-glass-container"
// // // // // //                                             type="text"
// // // // // //                                             placeholder="Last"
// // // // // //                                             id="lastname"
// // // // // //                                             required
// // // // // //                                             ref={lastnameInputRef}
// // // // // //                                         />
// // // // // //                                     </div>
// // // // // //                                     <div className="inputBox">
// // // // // //                                         <input
// // // // // //                                             className="input input-glass-container"
// // // // // //                                             type="email"
// // // // // //                                             placeholder="E-Mail"
// // // // // //                                             id="email"
// // // // // //                                             required
// // // // // //                                             ref={emailInputRef}
// // // // // //                                         />
// // // // // //                                     </div>
// // // // // //                                     <div className="inputBox">
// // // // // //                                         <input
// // // // // //                                             className="input input-glass-container"
// // // // // //                                             type="password"
// // // // // //                                             placeholder="Password"
// // // // // //                                             id="password"
// // // // // //                                             required
// // // // // //                                             ref={passwordInputRef}
// // // // // //                                         />
// // // // // //                                     </div>
// // // // // //                                 </>
// // // // // //                             )}

// // // // // //                             <div className="inputBox">
// // // // // //                                 <input
// // // // // //                                     className="input input-glass-container text-black dark:text-[#4C8EFF] bg-gray-800/40 dark:bg-gray-300/40 max-w-[10.25em] cursor-pointer mb-[1.25em] font-semibold"
// // // // // //                                     type="submit"
// // // // // //                                     value={isLogin ? "Login" : "Register"}
// // // // // //                                 />
// // // // // //                             </div>
// // // // // //                             <p className="mt-[0.3125em] text-gray-800 dark:text-gray-300">
// // // // // //                                 <a
// // // // // //                                     className="font-semibold cursor-pointer"
// // // // // //                                     onClick={switchAuthModeHandler}
// // // // // //                                 >
// // // // // //                                     {isLogin
// // // // // //                                         ? "Create new account"
// // // // // //                                         : "Sign in with existing account"}
// // // // // //                                 </a>
// // // // // //                             </p>
// // // // // //                         </form>
// // // // // //                     </div>
// // // // // //                 </div>
// // // // // //             </div>
// // // // // //         </section>
// // // // // //     );
// // // // // // };

// // // // // // export default Authorization;

// // // // // // "use client";

// // // // // // import { useRef, useState } from "react";
// // // // // // import { useRouter } from "next/navigation";
// // // // // // import { signIn } from "next-auth/react";
// // // // // // import { loadStripe, TokenResult } from "@stripe/stripe-js";
// // // // // // import { v4 as uuidv4 } from "uuid";

// // // // // // const stripePromise = loadStripe(`${process.env.stripe_public_key}`);

// // // // // // interface AuthorizationProps {
// // // // // //     closeModal: () => void;
// // // // // // }

// // // // // // interface CreateUserParams {
// // // // // //     obinsunUuid: string;
// // // // // //     username: string;
// // // // // //     firstname: string;
// // // // // //     lastname: string;
// // // // // //     email: string;
// // // // // //     password: string;
// // // // // //     role: string;
// // // // // //     personToken: TokenResult["token"];
// // // // // // }

// // // // // // interface PersonTokenParams {
// // // // // //     email: string;
// // // // // //     firstname: string;
// // // // // //     lastname: string;
// // // // // //     obinsunUuid: string;
// // // // // // }

// // // // // // const Authorization = ({ closeModal }: AuthorizationProps) => {
// // // // // //     const [userResponse, setUserResponse] = useState<string>("");

// // // // // //     const personTokenCreation = async ({
// // // // // //         email,
// // // // // //         firstname,
// // // // // //         lastname,
// // // // // //         obinsunUuid,
// // // // // //     }: PersonTokenParams): Promise<TokenResult["token"] | undefined> => {
// // // // // //         const stripeResolver = await stripePromise;

// // // // // //         const { token, error } =
// // // // // //             (await stripeResolver?.createToken("person", {
// // // // // //                 email,
// // // // // //                 first_name: firstname,
// // // // // //                 last_name: lastname,
// // // // // //             })) || {};

// // // // // //         if (error) {
// // // // // //             console.error(error);
// // // // // //             return undefined;
// // // // // //         }

// // // // // //         return token;
// // // // // //     };

// // // // // //     async function createUser({
// // // // // //         obinsunUuid,
// // // // // //         username,
// // // // // //         firstname,
// // // // // //         lastname,
// // // // // //         email,
// // // // // //         password,
// // // // // //         role,
// // // // // //         personToken,
// // // // // //     }: CreateUserParams) {
// // // // // //         const response = await fetch("/api/merchandise/api/auth/register", {
// // // // // //             method: "POST",
// // // // // //             body: JSON.stringify({
// // // // // //                 obinsunUuid,
// // // // // //                 username,
// // // // // //                 firstname,
// // // // // //                 lastname,
// // // // // //                 email,
// // // // // //                 password,
// // // // // //                 role,
// // // // // //                 personToken,
// // // // // //             }),
// // // // // //             headers: {
// // // // // //                 "Content-Type": "application/json",
// // // // // //             },
// // // // // //         });

// // // // // //         const userData = await response.json();
// // // // // //         if (!response.ok) {
// // // // // //             setUserResponse(userData.message);
// // // // // //             throw new Error(userData.message || "Something went wrong!");
// // // // // //         }
// // // // // //         return userData;
// // // // // //     }

// // // // // //     const usernameInputRef = useRef<HTMLInputElement | null>(null);
// // // // // //     const firstnameInputRef = useRef<HTMLInputElement | null>(null);
// // // // // //     const lastnameInputRef = useRef<HTMLInputElement | null>(null);
// // // // // //     const emailInputRef = useRef<HTMLInputElement | null>(null);
// // // // // //     const passwordInputRef = useRef<HTMLInputElement | null>(null);

// // // // // //     const [isLogin, setIsLogin] = useState(true);
// // // // // //     const router = useRouter();

// // // // // //     function switchAuthModeHandler() {
// // // // // //         setIsLogin((prevState) => !prevState);
// // // // // //     }

// // // // // //     async function fetchSession() {
// // // // // //         const response = await fetch("/api/merchandise/api/auth/session", {
// // // // // //             credentials: "include",
// // // // // //         });

// // // // // //         if (response.ok) {
// // // // // //             const sessionData = await response.json();
// // // // // //             console.log(
// // // // // //                 "Session fetched after login/registration:",
// // // // // //                 sessionData
// // // // // //             );
// // // // // //             return sessionData;
// // // // // //         } else {
// // // // // //             console.error("Failed to fetch session after login/registration");
// // // // // //             return null;
// // // // // //         }
// // // // // //     }

// // // // // //     async function submitHandler(e: React.FormEvent) {
// // // // // //         e.preventDefault();

// // // // // //         const createUuid = uuidv4();
// // // // // //         const obinsunUuid = `0b!n$un_${createUuid}`;

// // // // // //         const enteredUsername = usernameInputRef.current?.value as string;
// // // // // //         const enteredFirstname = firstnameInputRef.current?.value as string;
// // // // // //         const enteredLastname = lastnameInputRef.current?.value as string;
// // // // // //         const enteredEmail = emailInputRef.current?.value as string;
// // // // // //         const enteredPassword = emailInputRef.current?.value as string;
// // // // // //         const enteredRole = "guest";

// // // // // //         if (isLogin) {
// // // // // //             const result = await signIn("credentials", {
// // // // // //                 redirect: false,
// // // // // //                 email: enteredEmail,
// // // // // //                 password: enteredPassword,
// // // // // //             });

// // // // // //             if (result?.error) {
// // // // // //                 setUserResponse("User Does Not Exist!");
// // // // // //             } else {
// // // // // //                 await fetchSession(); // Fetch the session after successful login
// // // // // //                 router.replace("/merchandise/profile");
// // // // // //                 closeModal();
// // // // // //             }
// // // // // //         } else {
// // // // // //             const createdToken = await personTokenCreation({
// // // // // //                 obinsunUuid,
// // // // // //                 firstname: enteredFirstname,
// // // // // //                 lastname: enteredLastname,
// // // // // //                 email: enteredEmail,
// // // // // //             });

// // // // // //             if (!createdToken) {
// // // // // //                 setUserResponse("Failed to create Stripe token.");
// // // // // //                 return;
// // // // // //             }

// // // // // //             const result = await createUser({
// // // // // //                 obinsunUuid,
// // // // // //                 username: enteredUsername,
// // // // // //                 firstname: enteredFirstname,
// // // // // //                 lastname: enteredLastname,
// // // // // //                 email: enteredEmail,
// // // // // //                 password: enteredPassword,
// // // // // //                 role: enteredRole,
// // // // // //                 personToken: createdToken,
// // // // // //             });

// // // // // //             console.log(result);

// // // // // //             await signIn("credentials", {
// // // // // //                 redirect: false,
// // // // // //                 email: enteredEmail,
// // // // // //                 password: enteredPassword,
// // // // // //                 callbackUrl: "/merchandise/profile",
// // // // // //             });

// // // // // //             await fetchSession(); // Fetch the session after successful registration and login
// // // // // //             closeModal();
// // // // // //             router.push("/merchandise/profile");
// // // // // //         }
// // // // // //     }

// // // // // //     return (
// // // // // //         <section
// // // // // //             key="loginModal"
// // // // // //             className="relative top-[0%] left-0 flex justify-center align-center"
// // // // // //         >
// // // // // //             <div className="absolute top-[50%] left-[50%] transform translate-x-[-50%] translate-y-[-50%]">
// // // // // //                 <div
// // // // // //                     className="floating-square-0"
// // // // // //                     style={{ "--i": "0" } as React.CSSProperties}
// // // // // //                 />
// // // // // //                 <div
// // // // // //                     className="floating-square-1"
// // // // // //                     style={{ "--i": "1" } as React.CSSProperties}
// // // // // //                 />
// // // // // //                 <div
// // // // // //                     className="floating-square-2"
// // // // // //                     style={{ "--i": "2" } as React.CSSProperties}
// // // // // //                 />
// // // // // //                 <div
// // // // // //                     className="floating-square-3"
// // // // // //                     style={{ "--i": "3" } as React.CSSProperties}
// // // // // //                 />
// // // // // //                 <div
// // // // // //                     className="floating-square-4"
// // // // // //                     style={{ "--i": "4" } as React.CSSProperties}
// // // // // //                 />
// // // // // //                 <div className="form-container relative top-0 left-0 vs:w-[15em] xs:w-[20em] mobile-l:w-[21em] tablet:w-[22em] laptop:-w-[23em] laptop-l:w-[24em] 2xl:w-[25em min-h-[25em] bg-gray-300/90 dark:bg-gray-800/90 border rounded-[0.625em] flex justify-center align-center backdrop-blur-[5px] shadow-glass3 glass-container border-white/50">
// // // // // //                     <div className="form-body">
// // // // // //                         <button onClick={closeModal}>Close Modal</button>
// // // // // //                         <h2 className="form-header">
// // // // // //                             {isLogin ? "Login " : "Register "}
// // // // // //                             Form
// // // // // //                         </h2>
// // // // // //                         <form onSubmit={submitHandler}>
// // // // // //                             <p>{userResponse}</p>

// // // // // //                             {isLogin ? (
// // // // // //                                 <>
// // // // // //                                     <div className="inputBox">
// // // // // //                                         <input
// // // // // //                                             className="input input-glass-container"
// // // // // //                                             type="email"
// // // // // //                                             placeholder="E-Mail"
// // // // // //                                             id="email"
// // // // // //                                             required
// // // // // //                                             ref={emailInputRef}
// // // // // //                                         />
// // // // // //                                     </div>
// // // // // //                                     <div className="inputBox">
// // // // // //                                         <input
// // // // // //                                             className="input input-glass-container"
// // // // // //                                             type="password"
// // // // // //                                             placeholder="Password"
// // // // // //                                             id="password"
// // // // // //                                             required
// // // // // //                                             ref={passwordInputRef}
// // // // // //                                         />
// // // // // //                                     </div>
// // // // // //                                 </>
// // // // // //                             ) : (
// // // // // //                                 <>
// // // // // //                                     <div className="inputBox">
// // // // // //                                         <input
// // // // // //                                             className="input input-glass-container"
// // // // // //                                             type="text"
// // // // // //                                             placeholder="Username"
// // // // // //                                             id="username"
// // // // // //                                             required
// // // // // //                                             ref={usernameInputRef}
// // // // // //                                         />
// // // // // //                                     </div>
// // // // // //                                     <div className="inputBox">
// // // // // //                                         <input
// // // // // //                                             className="input input-glass-container"
// // // // // //                                             type="text"
// // // // // //                                             placeholder="First"
// // // // // //                                             id="firstname"
// // // // // //                                             required
// // // // // //                                             ref={firstnameInputRef}
// // // // // //                                         />
// // // // // //                                     </div>
// // // // // //                                     <div className="inputBox">
// // // // // //                                         <input
// // // // // //                                             className="input input-glass-container"
// // // // // //                                             type="text"
// // // // // //                                             placeholder="Last"
// // // // // //                                             id="lastname"
// // // // // //                                             required
// // // // // //                                             ref={lastnameInputRef}
// // // // // //                                         />
// // // // // //                                     </div>
// // // // // //                                     <div className="inputBox">
// // // // // //                                         <input
// // // // // //                                             className="input input-glass-container"
// // // // // //                                             type="email"
// // // // // //                                             placeholder="E-Mail"
// // // // // //                                             id="email"
// // // // // //                                             required
// // // // // //                                             ref={emailInputRef}
// // // // // //                                         />
// // // // // //                                     </div>
// // // // // //                                     <div className="inputBox">
// // // // // //                                         <input
// // // // // //                                             className="input input-glass-container"
// // // // // //                                             type="password"
// // // // // //                                             placeholder="Password"
// // // // // //                                             id="password"
// // // // // //                                             required
// // // // // //                                             ref={passwordInputRef}
// // // // // //                                         />
// // // // // //                                     </div>
// // // // // //                                 </>
// // // // // //                             )}

// // // // // //                             <div className="inputBox">
// // // // // //                                 <input
// // // // // //                                     className="input input-glass-container text-black dark:text-[#4C8EFF] bg-gray-800/40 dark:bg-gray-300/40 max-w-[10.25em] cursor-pointer mb-[1.25em] font-semibold"
// // // // // //                                     type="submit"
// // // // // //                                     value={isLogin ? "Login" : "Register"}
// // // // // //                                 />
// // // // // //                             </div>
// // // // // //                             <p className="mt-[0.3125em] text-gray-800 dark:text-gray-300">
// // // // // //                                 <a
// // // // // //                                     className="font-semibold cursor-pointer"
// // // // // //                                     onClick={switchAuthModeHandler}
// // // // // //                                 >
// // // // // //                                     {isLogin
// // // // // //                                         ? "Create new account"
// // // // // //                                         : "Sign in with existing account"}
// // // // // //                                 </a>
// // // // // //                             </p>
// // // // // //                         </form>
// // // // // //                     </div>
// // // // // //                 </div>
// // // // // //             </div>
// // // // // //         </section>
// // // // // //     );
// // // // // // };

// // // // // // export default Authorization;

// // // // // "use client";

// // // // // import { useRef, useState } from "react";
// // // // // import { useRouter } from "next/navigation";
// // // // // import { signIn } from "next-auth/react";
// // // // // import { loadStripe, TokenResult } from "@stripe/stripe-js";
// // // // // import { v4 as uuidv4 } from "uuid";
// // // // // import { getSessionAction } from "@/actions/merchandise/getSessionAction"; // Import the custom session action

// // // // // const stripePromise = loadStripe(`${process.env.stripe_public_key}`);

// // // // // interface AuthorizationProps {
// // // // //     closeModal: () => void;
// // // // // }

// // // // // interface CreateUserParams {
// // // // //     obinsunUuid: string;
// // // // //     username: string;
// // // // //     firstname: string;
// // // // //     lastname: string;
// // // // //     email: string;
// // // // //     password: string;
// // // // //     role: string;
// // // // //     personToken: TokenResult["token"];
// // // // // }

// // // // // interface PersonTokenParams {
// // // // //     email: string;
// // // // //     firstname: string;
// // // // //     lastname: string;
// // // // //     obinsunUuid: string;
// // // // // }

// // // // // const Authorization = ({ closeModal }: AuthorizationProps) => {
// // // // //     const usernameInputRef = useRef<HTMLInputElement | null>(null);
// // // // //     const firstnameInputRef = useRef<HTMLInputElement | null>(null);
// // // // //     const lastnameInputRef = useRef<HTMLInputElement | null>(null);
// // // // //     const emailInputRef = useRef<HTMLInputElement | null>(null);
// // // // //     const passwordInputRef = useRef<HTMLInputElement | null>(null);

// // // // //     const [userResponse, setUserResponse] = useState<string>("");
// // // // //     const [isLogin, setIsLogin] = useState(true);
// // // // //     const router = useRouter();

// // // // //     const personTokenCreation = async ({
// // // // //         email,
// // // // //         firstname,
// // // // //         lastname,
// // // // //         obinsunUuid,
// // // // //     }: PersonTokenParams): Promise<TokenResult["token"] | undefined> => {
// // // // //         const stripeResolver = await stripePromise;
// // // // //         const { token, error } =
// // // // //             (await stripeResolver?.createToken("person", {
// // // // //                 email,
// // // // //                 first_name: firstname,
// // // // //                 last_name: lastname,
// // // // //             })) || {};
// // // // //         if (error) {
// // // // //             console.error(error);
// // // // //             return undefined;
// // // // //         }
// // // // //         return token;
// // // // //     };

// // // // //     async function createUser({
// // // // //         obinsunUuid,
// // // // //         username,
// // // // //         firstname,
// // // // //         lastname,
// // // // //         email,
// // // // //         password,
// // // // //         role,
// // // // //         personToken,
// // // // //     }: CreateUserParams) {
// // // // //         const response = await fetch("/api/merchandise/api/auth/register", {
// // // // //             method: "POST",
// // // // //             body: JSON.stringify({
// // // // //                 obinsunUuid,
// // // // //                 username,
// // // // //                 firstname,
// // // // //                 lastname,
// // // // //                 email,
// // // // //                 password,
// // // // //                 role,
// // // // //                 personToken,
// // // // //             }),
// // // // //             headers: {
// // // // //                 "Content-Type": "application/json",
// // // // //             },
// // // // //         });

// // // // //         const userData = await response.json();
// // // // //         if (!response.ok) {
// // // // //             setUserResponse(userData.message);
// // // // //             throw new Error(userData.message || "Something went wrong!");
// // // // //         }
// // // // //         return userData;
// // // // //     }

// // // // //     async function handleSuccessfulAuth() {
// // // // //         const session = await getSessionAction(); // Fetch the session
// // // // //         if (session) {
// // // // //             router.push("/merchandise/profile"); // Redirect to the profile page
// // // // //             closeModal();
// // // // //         } else {
// // // // //             setUserResponse("Session not established, please try again.");
// // // // //         }
// // // // //     }

// // // // //     async function submitHandler(e: React.FormEvent) {
// // // // //         e.preventDefault();

// // // // //         const createUuid = uuidv4();
// // // // //         const obinsunUuid = `0b!n$un_${createUuid}`;

// // // // //         const enteredUsername = usernameInputRef.current?.value as string;
// // // // //         const enteredFirstname = firstnameInputRef.current?.value as string;
// // // // //         const enteredLastname = lastnameInputRef.current?.value as string;
// // // // //         const enteredEmail = emailInputRef.current?.value as string;
// // // // //         const enteredPassword = passwordInputRef.current?.value as string;
// // // // //         const enteredRole = "guest";

// // // // //         if (isLogin) {
// // // // //             const result = await signIn("credentials", {
// // // // //                 redirect: false,
// // // // //                 email: enteredEmail,
// // // // //                 password: enteredPassword,
// // // // //             });

// // // // //             if (result?.error) {
// // // // //                 setUserResponse("User Does Not Exist!");
// // // // //             } else {
// // // // //                 await handleSuccessfulAuth();
// // // // //             }
// // // // //         } else {
// // // // //             const createdToken = await personTokenCreation({
// // // // //                 obinsunUuid,
// // // // //                 firstname: enteredFirstname,
// // // // //                 lastname: enteredLastname,
// // // // //                 email: enteredEmail,
// // // // //             });

// // // // //             if (!createdToken) {
// // // // //                 setUserResponse("Failed to create Stripe token.");
// // // // //                 return;
// // // // //             }

// // // // //             await createUser({
// // // // //                 obinsunUuid,
// // // // //                 username: enteredUsername,
// // // // //                 firstname: enteredFirstname,
// // // // //                 lastname: enteredLastname,
// // // // //                 email: enteredEmail,
// // // // //                 password: enteredPassword,
// // // // //                 role: enteredRole,
// // // // //                 personToken: createdToken,
// // // // //             });

// // // // //             await signIn("credentials", {
// // // // //                 redirect: false,
// // // // //                 email: enteredEmail,
// // // // //                 password: enteredPassword,
// // // // //             });
// // // // //             await handleSuccessfulAuth();
// // // // //         }
// // // // //     }

// // // // //     function switchAuthModeHandler() {
// // // // //         setIsLogin((prevState) => !prevState);
// // // // //     }

// // // // //     return (
// // // // //         <section
// // // // //             key="loginModal"
// // // // //             className="relative top-[0%] left-0 flex justify-center align-center"
// // // // //         >
// // // // //             <div className="absolute top-[50%] left-[50%] transform translate-x-[-50%] translate-y-[-50%]">
// // // // //                 <div className="form-container relative top-0 left-0 vs:w-[15em] xs:w-[20em] mobile-l:w-[21em] tablet:w-[22em] laptop:-w-[23em] laptop-l:w-[24em] 2xl:w-[25em min-h-[25em] bg-gray-300/90 dark:bg-gray-800/90 border rounded-[0.625em] flex justify-center align-center backdrop-blur-[5px] shadow-glass3 glass-container border-white/50">
// // // // //                     <div className="form-body">
// // // // //                         <button onClick={closeModal}>Close Modal</button>
// // // // //                         <h2 className="form-header">
// // // // //                             {isLogin ? "Login " : "Register "} Form
// // // // //                         </h2>
// // // // //                         <form onSubmit={submitHandler}>
// // // // //                             <p>{userResponse}</p>

// // // // //                             {!isLogin && (
// // // // //                                 <>
// // // // //                                     <div className="inputBox">
// // // // //                                         <input
// // // // //                                             className="input input-glass-container"
// // // // //                                             type="text"
// // // // //                                             placeholder="Username"
// // // // //                                             id="username"
// // // // //                                             required
// // // // //                                             ref={usernameInputRef}
// // // // //                                         />
// // // // //                                     </div>
// // // // //                                     <div className="inputBox">
// // // // //                                         <input
// // // // //                                             className="input input-glass-container"
// // // // //                                             type="text"
// // // // //                                             placeholder="First Name"
// // // // //                                             id="firstname"
// // // // //                                             required
// // // // //                                             ref={firstnameInputRef}
// // // // //                                         />
// // // // //                                     </div>
// // // // //                                     <div className="inputBox">
// // // // //                                         <input
// // // // //                                             className="input input-glass-container"
// // // // //                                             type="text"
// // // // //                                             placeholder="Last Name"
// // // // //                                             id="lastname"
// // // // //                                             required
// // // // //                                             ref={lastnameInputRef}
// // // // //                                         />
// // // // //                                     </div>
// // // // //                                 </>
// // // // //                             )}

// // // // //                             <div className="inputBox">
// // // // //                                 <input
// // // // //                                     className="input input-glass-container"
// // // // //                                     type="email"
// // // // //                                     placeholder="E-Mail"
// // // // //                                     id="email"
// // // // //                                     required
// // // // //                                     ref={emailInputRef}
// // // // //                                 />
// // // // //                             </div>
// // // // //                             <div className="inputBox">
// // // // //                                 <input
// // // // //                                     className="input input-glass-container"
// // // // //                                     type="password"
// // // // //                                     placeholder="Password"
// // // // //                                     id="password"
// // // // //                                     required
// // // // //                                     ref={passwordInputRef}
// // // // //                                 />
// // // // //                             </div>

// // // // //                             <div className="inputBox">
// // // // //                                 <input
// // // // //                                     className="input input-glass-container text-black dark:text-[#4C8EFF] bg-gray-800/40 dark:bg-gray-300/40 max-w-[10.25em] cursor-pointer mb-[1.25em] font-semibold"
// // // // //                                     type="submit"
// // // // //                                     value={isLogin ? "Login" : "Register"}
// // // // //                                 />
// // // // //                             </div>
// // // // //                             <p className="mt-[0.3125em] text-gray-800 dark:text-gray-300">
// // // // //                                 <a
// // // // //                                     className="font-semibold cursor-pointer"
// // // // //                                     onClick={switchAuthModeHandler}
// // // // //                                 >
// // // // //                                     {isLogin
// // // // //                                         ? "Create new account"
// // // // //                                         : "Sign in with existing account"}
// // // // //                                 </a>
// // // // //                             </p>
// // // // //                         </form>
// // // // //                     </div>
// // // // //                 </div>
// // // // //             </div>
// // // // //         </section>
// // // // //     );
// // // // // };

// // // // // export default Authorization;

// // // // "use client";

// // // // import { useRef, useState } from "react";
// // // // import { useRouter } from "next/navigation";
// // // // import { signIn } from "next-auth/react";
// // // // import { loadStripe, TokenResult } from "@stripe/stripe-js";
// // // // import { v4 as uuidv4 } from "uuid";
// // // // import { getSession } from "next-auth/react"; // Import getSession directly

// // // // const stripePromise = loadStripe(`${process.env.stripe_public_key}`);

// // // // interface AuthorizationProps {
// // // //     closeModal: () => void;
// // // // }

// // // // interface CreateUserParams {
// // // //     obinsunUuid: string;
// // // //     username: string;
// // // //     firstname: string;
// // // //     lastname: string;
// // // //     email: string;
// // // //     password: string;
// // // //     role: string;
// // // //     personToken: TokenResult["token"];
// // // // }

// // // // interface PersonTokenParams {
// // // //     email: string;
// // // //     firstname: string;
// // // //     lastname: string;
// // // //     obinsunUuid: string;
// // // // }

// // // // const Authorization = ({ closeModal }: AuthorizationProps) => {
// // // //     const usernameInputRef = useRef<HTMLInputElement | null>(null);
// // // //     const firstnameInputRef = useRef<HTMLInputElement | null>(null);
// // // //     const lastnameInputRef = useRef<HTMLInputElement | null>(null);
// // // //     const emailInputRef = useRef<HTMLInputElement | null>(null);
// // // //     const passwordInputRef = useRef<HTMLInputElement | null>(null);

// // // //     const [userResponse, setUserResponse] = useState<string>("");
// // // //     const [isLogin, setIsLogin] = useState(true);
// // // //     const router = useRouter();

// // // //     const personTokenCreation = async ({
// // // //         email,
// // // //         firstname,
// // // //         lastname,
// // // //         obinsunUuid,
// // // //     }: PersonTokenParams): Promise<TokenResult["token"] | undefined> => {
// // // //         const stripeResolver = await stripePromise;
// // // //         const { token, error } =
// // // //             (await stripeResolver?.createToken("person", {
// // // //                 email,
// // // //                 first_name: firstname,
// // // //                 last_name: lastname,
// // // //             })) || {};
// // // //         if (error) {
// // // //             console.error(error);
// // // //             return undefined;
// // // //         }
// // // //         return token;
// // // //     };

// // // //     async function createUser({
// // // //         obinsunUuid,
// // // //         username,
// // // //         firstname,
// // // //         lastname,
// // // //         email,
// // // //         password,
// // // //         role,
// // // //         personToken,
// // // //     }: CreateUserParams) {
// // // //         const response = await fetch("/api/merchandise/api/auth/register", {
// // // //             method: "POST",
// // // //             body: JSON.stringify({
// // // //                 obinsunUuid,
// // // //                 username,
// // // //                 firstname,
// // // //                 lastname,
// // // //                 email,
// // // //                 password,
// // // //                 role,
// // // //                 personToken,
// // // //             }),
// // // //             headers: {
// // // //                 "Content-Type": "application/json",
// // // //             },
// // // //         });

// // // //         const userData = await response.json();
// // // //         if (!response.ok) {
// // // //             setUserResponse(userData.message);
// // // //             throw new Error(userData.message || "Something went wrong!");
// // // //         }
// // // //         return userData;
// // // //     }

// // // //     async function handleSuccessfulAuth() {
// // // //         const session = await getSession(); // Fetch the session
// // // //         if (session) {
// // // //             closeModal();
// // // //             router.push("/merchandise/profile"); // Redirect to the profile page
// // // //         } else {
// // // //             setUserResponse("Session not established, please try again.");
// // // //         }
// // // //     }

// // // //     async function submitHandler(e: React.FormEvent) {
// // // //         e.preventDefault();

// // // //         const createUuid = uuidv4();
// // // //         const obinsunUuid = `0b!n$un_${createUuid}`;

// // // //         const enteredUsername = usernameInputRef.current?.value as string;
// // // //         const enteredFirstname = firstnameInputRef.current?.value as string;
// // // //         const enteredLastname = lastnameInputRef.current?.value as string;
// // // //         const enteredEmail = emailInputRef.current?.value as string;
// // // //         const enteredPassword = passwordInputRef.current?.value as string;
// // // //         const enteredRole = "guest";

// // // //         if (isLogin) {
// // // //             const result = await signIn("credentials", {
// // // //                 redirect: false,
// // // //                 email: enteredEmail,
// // // //                 password: enteredPassword,
// // // //             });

// // // //             if (result?.error) {
// // // //                 setUserResponse("User Does Not Exist!");
// // // //             } else {
// // // //                 setTimeout(async () => {
// // // //                     await handleSuccessfulAuth(); // Delay to ensure session is established
// // // //                 }, 500); // Adding a slight delay
// // // //             }
// // // //         } else {
// // // //             const createdToken = await personTokenCreation({
// // // //                 obinsunUuid,
// // // //                 firstname: enteredFirstname,
// // // //                 lastname: enteredLastname,
// // // //                 email: enteredEmail,
// // // //             });

// // // //             if (!createdToken) {
// // // //                 setUserResponse("Failed to create Stripe token.");
// // // //                 return;
// // // //             }

// // // //             await createUser({
// // // //                 obinsunUuid,
// // // //                 username: enteredUsername,
// // // //                 firstname: enteredFirstname,
// // // //                 lastname: enteredLastname,
// // // //                 email: enteredEmail,
// // // //                 password: enteredPassword,
// // // //                 role: enteredRole,
// // // //                 personToken: createdToken,
// // // //             });

// // // //             const result = await signIn("credentials", {
// // // //                 redirect: false,
// // // //                 email: enteredEmail,
// // // //                 password: enteredPassword,
// // // //             });

// // // //             if (result?.error) {
// // // //                 setUserResponse("Failed to log in after registration.");
// // // //             } else {
// // // //                 setTimeout(async () => {
// // // //                     await handleSuccessfulAuth(); // Delay to ensure session is established
// // // //                 }, 500); // Adding a slight delay
// // // //             }
// // // //         }
// // // //     }

// // // //     function switchAuthModeHandler() {
// // // //         setIsLogin((prevState) => !prevState);
// // // //     }

// // // //     return (
// // // //         <section
// // // //             key="loginModal"
// // // //             className="relative top-[0%] left-0 flex justify-center align-center"
// // // //         >
// // // //             <div className="absolute top-[50%] left-[50%] transform translate-x-[-50%] translate-y-[-50%]">
// // // //                 <div className="form-container relative top-0 left-0 vs:w-[15em] xs:w-[20em] mobile-l:w-[21em] tablet:w-[22em] laptop:-w-[23em] laptop-l:w-[24em] 2xl:w-[25em min-h-[25em] bg-gray-300/90 dark:bg-gray-800/90 border rounded-[0.625em] flex justify-center align-center backdrop-blur-[5px] shadow-glass3 glass-container border-white/50">
// // // //                     <div className="form-body">
// // // //                         <button onClick={closeModal}>Close Modal</button>
// // // //                         <h2 className="form-header">
// // // //                             {isLogin ? "Login " : "Register "} Form
// // // //                         </h2>
// // // //                         <form onSubmit={submitHandler}>
// // // //                             <p>{userResponse}</p>

// // // //                             {!isLogin && (
// // // //                                 <>
// // // //                                     <div className="inputBox">
// // // //                                         <input
// // // //                                             className="input input-glass-container"
// // // //                                             type="text"
// // // //                                             placeholder="Username"
// // // //                                             id="username"
// // // //                                             required
// // // //                                             ref={usernameInputRef}
// // // //                                         />
// // // //                                     </div>
// // // //                                     <div className="inputBox">
// // // //                                         <input
// // // //                                             className="input input-glass-container"
// // // //                                             type="text"
// // // //                                             placeholder="First Name"
// // // //                                             id="firstname"
// // // //                                             required
// // // //                                             ref={firstnameInputRef}
// // // //                                         />
// // // //                                     </div>
// // // //                                     <div className="inputBox">
// // // //                                         <input
// // // //                                             className="input input-glass-container"
// // // //                                             type="text"
// // // //                                             placeholder="Last Name"
// // // //                                             id="lastname"
// // // //                                             required
// // // //                                             ref={lastnameInputRef}
// // // //                                         />
// // // //                                     </div>
// // // //                                 </>
// // // //                             )}

// // // //                             <div className="inputBox">
// // // //                                 <input
// // // //                                     className="input input-glass-container"
// // // //                                     type="email"
// // // //                                     placeholder="E-Mail"
// // // //                                     id="email"
// // // //                                     required
// // // //                                     ref={emailInputRef}
// // // //                                 />
// // // //                             </div>
// // // //                             <div className="inputBox">
// // // //                                 <input
// // // //                                     className="input input-glass-container"
// // // //                                     type="password"
// // // //                                     placeholder="Password"
// // // //                                     id="password"
// // // //                                     required
// // // //                                     ref={passwordInputRef}
// // // //                                 />
// // // //                             </div>

// // // //                             <div className="inputBox">
// // // //                                 <input
// // // //                                     className="input input-glass-container text-black dark:text-[#4C8EFF] bg-gray-800/40 dark:bg-gray-300/40 max-w-[10.25em] cursor-pointer mb-[1.25em] font-semibold"
// // // //                                     type="submit"
// // // //                                     value={isLogin ? "Login" : "Register"}
// // // //                                 />
// // // //                             </div>
// // // //                             <p className="mt-[0.3125em] text-gray-800 dark:text-gray-300">
// // // //                                 <a
// // // //                                     className="font-semibold cursor-pointer"
// // // //                                     onClick={switchAuthModeHandler}
// // // //                                 >
// // // //                                     {isLogin
// // // //                                         ? "Create new account"
// // // //                                         : "Sign in with existing account"}
// // // //                                 </a>
// // // //                             </p>
// // // //                         </form>
// // // //                     </div>
// // // //                 </div>
// // // //             </div>
// // // //         </section>
// // // //     );
// // // // };

// // // // export default Authorization;

// // // "use client";

// // // import { useRef, useState } from "react";
// // // import { useRouter } from "next/navigation";
// // // import { loadStripe, TokenResult } from "@stripe/stripe-js";
// // // import { v4 as uuidv4 } from "uuid";
// // // import { getSessionAction } from "@/actions/merchandise/getSessionAction"; // Import the custom session action

// // // const stripePromise = loadStripe(`${process.env.stripe_public_key}`);

// // // interface AuthorizationProps {
// // //     closeModal: () => void;
// // // }

// // // interface CreateUserParams {
// // //     obinsunUuid: string;
// // //     username: string;
// // //     firstname: string;
// // //     lastname: string;
// // //     email: string;
// // //     password: string;
// // //     role: string;
// // //     personToken: TokenResult["token"];
// // // }

// // // interface PersonTokenParams {
// // //     email: string;
// // //     firstname: string;
// // //     lastname: string;
// // //     obinsunUuid: string;
// // // }

// // // const Authorization = ({ closeModal }: AuthorizationProps) => {
// // //     const usernameInputRef = useRef<HTMLInputElement | null>(null);
// // //     const firstnameInputRef = useRef<HTMLInputElement | null>(null);
// // //     const lastnameInputRef = useRef<HTMLInputElement | null>(null);
// // //     const emailInputRef = useRef<HTMLInputElement | null>(null);
// // //     const passwordInputRef = useRef<HTMLInputElement | null>(null);

// // //     const [userResponse, setUserResponse] = useState<string>("");
// // //     const [isLogin, setIsLogin] = useState(true);
// // //     const router = useRouter();

// // //     const personTokenCreation = async ({
// // //         email,
// // //         firstname,
// // //         lastname,
// // //         obinsunUuid,
// // //     }: PersonTokenParams): Promise<TokenResult["token"] | undefined> => {
// // //         const stripeResolver = await stripePromise;
// // //         const { token, error } =
// // //             (await stripeResolver?.createToken("person", {
// // //                 email,
// // //                 first_name: firstname,
// // //                 last_name: lastname,
// // //             })) || {};
// // //         if (error) {
// // //             console.error(error);
// // //             return undefined;
// // //         }
// // //         return token;
// // //     };

// // //     async function createUser({
// // //         obinsunUuid,
// // //         username,
// // //         firstname,
// // //         lastname,
// // //         email,
// // //         password,
// // //         role,
// // //         personToken,
// // //     }: CreateUserParams) {
// // //         const response = await fetch("/api/merchandise/api/auth/register", {
// // //             method: "POST",
// // //             body: JSON.stringify({
// // //                 obinsunUuid,
// // //                 username,
// // //                 firstname,
// // //                 lastname,
// // //                 email,
// // //                 password,
// // //                 role,
// // //                 personToken,
// // //             }),
// // //             headers: {
// // //                 "Content-Type": "application/json",
// // //             },
// // //         });

// // //         const userData = await response.json();
// // //         if (!response.ok) {
// // //             setUserResponse(userData.message);
// // //             throw new Error(userData.message || "Something went wrong!");
// // //         }
// // //         return userData;
// // //     }

// // //     async function submitHandler(e: React.FormEvent) {
// // //         e.preventDefault();

// // //         const createUuid = uuidv4();
// // //         const obinsunUuid = `0b!n$un_${createUuid}`;

// // //         const enteredUsername = usernameInputRef.current?.value as string;
// // //         const enteredFirstname = firstnameInputRef.current?.value as string;
// // //         const enteredLastname = lastnameInputRef.current?.value as string;
// // //         const enteredEmail = emailInputRef.current?.value as string;
// // //         const enteredPassword = passwordInputRef.current?.value as string;
// // //         const enteredRole = "guest";

// // //         if (isLogin) {
// // //             try {
// // //                 // Manually post credentials to the API
// // //                 const response = await fetch(
// // //                     "/api/merchandise/api/auth/callback/credentials",
// // //                     {
// // //                         method: "POST",
// // //                         headers: {
// // //                             "Content-Type": "application/json",
// // //                         },
// // //                         body: JSON.stringify({
// // //                             email: enteredEmail,
// // //                             password: enteredPassword,
// // //                         }),
// // //                     }
// // //                 );

// // //                 if (!response.ok) {
// // //                     throw new Error("Failed to authenticate");
// // //                 }

// // //                 const session = await getSessionAction();

// // //                 if (session) {
// // //                     closeModal();
// // //                     router.push("/merchandise/profile");
// // //                 } else {
// // //                     setUserResponse(
// // //                         "Authentication failed, session not established."
// // //                     );
// // //                 }
// // //             } catch (error) {
// // //                 setUserResponse("Authentication failed, please try again.");
// // //             }
// // //         } else {
// // //             try {
// // //                 const createdToken = await personTokenCreation({
// // //                     obinsunUuid,
// // //                     firstname: enteredFirstname,
// // //                     lastname: enteredLastname,
// // //                     email: enteredEmail,
// // //                 });

// // //                 if (!createdToken) {
// // //                     setUserResponse("Failed to create Stripe token.");
// // //                     return;
// // //                 }

// // //                 await createUser({
// // //                     obinsunUuid,
// // //                     username: enteredUsername,
// // //                     firstname: enteredFirstname,
// // //                     lastname: enteredLastname,
// // //                     email: enteredEmail,
// // //                     password: enteredPassword,
// // //                     role: enteredRole,
// // //                     personToken: createdToken,
// // //                 });

// // //                 // After registration, attempt manual sign-in
// // //                 const response = await fetch(
// // //                     "/api/merchandise/api/auth/callback/credentials",
// // //                     {
// // //                         method: "POST",
// // //                         headers: {
// // //                             "Content-Type": "application/json",
// // //                         },
// // //                         body: JSON.stringify({
// // //                             email: enteredEmail,
// // //                             password: enteredPassword,
// // //                         }),
// // //                     }
// // //                 );

// // //                 if (!response.ok) {
// // //                     throw new Error(
// // //                         "Failed to authenticate after registration"
// // //                     );
// // //                 }

// // //                 const session = await getSessionAction();

// // //                 if (session) {
// // //                     closeModal();
// // //                     router.push("/merchandise/profile");
// // //                 } else {
// // //                     setUserResponse(
// // //                         "Authentication failed, session not established."
// // //                     );
// // //                 }
// // //             } catch (error) {
// // //                 setUserResponse(
// // //                     "Registration or authentication failed, please try again."
// // //                 );
// // //             }
// // //         }
// // //     }

// // //     function switchAuthModeHandler() {
// // //         setIsLogin((prevState) => !prevState);
// // //     }

// // //     return (
// // //         <section
// // //             key="loginModal"
// // //             className="relative top-[0%] left-0 flex justify-center align-center"
// // //         >
// // //             <div className="absolute top-[50%] left-[50%] transform translate-x-[-50%] translate-y-[-50%]">
// // //                 <div className="form-container relative top-0 left-0 vs:w-[15em] xs:w-[20em] mobile-l:w-[21em] tablet:w-[22em] laptop:-w-[23em] laptop-l:w-[24em] 2xl:w-[25em min-h-[25em] bg-gray-300/90 dark:bg-gray-800/90 border rounded-[0.625em] flex justify-center align-center backdrop-blur-[5px] shadow-glass3 glass-container border-white/50">
// // //                     <div className="form-body">
// // //                         <button onClick={closeModal}>Close Modal</button>
// // //                         <h2 className="form-header">
// // //                             {isLogin ? "Login " : "Register "} Form
// // //                         </h2>
// // //                         <form onSubmit={submitHandler}>
// // //                             <p>{userResponse}</p>

// // //                             {!isLogin && (
// // //                                 <>
// // //                                     <div className="inputBox">
// // //                                         <input
// // //                                             className="input input-glass-container"
// // //                                             type="text"
// // //                                             placeholder="Username"
// // //                                             id="username"
// // //                                             required
// // //                                             ref={usernameInputRef}
// // //                                         />
// // //                                     </div>
// // //                                     <div className="inputBox">
// // //                                         <input
// // //                                             className="input input-glass-container"
// // //                                             type="text"
// // //                                             placeholder="First Name"
// // //                                             id="firstname"
// // //                                             required
// // //                                             ref={firstnameInputRef}
// // //                                         />
// // //                                     </div>
// // //                                     <div className="inputBox">
// // //                                         <input
// // //                                             className="input input-glass-container"
// // //                                             type="text"
// // //                                             placeholder="Last Name"
// // //                                             id="lastname"
// // //                                             required
// // //                                             ref={lastnameInputRef}
// // //                                         />
// // //                                     </div>
// // //                                 </>
// // //                             )}

// // //                             <div className="inputBox">
// // //                                 <input
// // //                                     className="input input-glass-container"
// // //                                     type="email"
// // //                                     placeholder="E-Mail"
// // //                                     id="email"
// // //                                     required
// // //                                     ref={emailInputRef}
// // //                                 />
// // //                             </div>
// // //                             <div className="inputBox">
// // //                                 <input
// // //                                     className="input input-glass-container"
// // //                                     type="password"
// // //                                     placeholder="Password"
// // //                                     id="password"
// // //                                     required
// // //                                     ref={passwordInputRef}
// // //                                 />
// // //                             </div>

// // //                             <div className="inputBox">
// // //                                 <input
// // //                                     className="input input-glass-container text-black dark:text-[#4C8EFF] bg-gray-800/40 dark:bg-gray-300/40 max-w-[10.25em] cursor-pointer mb-[1.25em] font-semibold"
// // //                                     type="submit"
// // //                                     value={isLogin ? "Login" : "Register"}
// // //                                 />
// // //                             </div>
// // //                             <p className="mt-[0.3125em] text-gray-800 dark:text-gray-300">
// // //                                 <a
// // //                                     className="font-semibold cursor-pointer"
// // //                                     onClick={switchAuthModeHandler}
// // //                                 >
// // //                                     {isLogin
// // //                                         ? "Create new account"
// // //                                         : "Sign in with existing account"}
// // //                                 </a>
// // //                             </p>
// // //                         </form>
// // //                     </div>
// // //                 </div>
// // //             </div>
// // //         </section>
// // //     );
// // // };

// // // export default Authorization;

// // "use client";

// // import { useRef, useState } from "react";
// // import { useRouter } from "next/navigation";
// // import { getSessionAction } from "@/actions/merchandise/getSessionAction";

// // interface AuthorizationProps {
// //     closeModal: () => void;
// // }

// // interface CreateUserParams {
// //     obinsunUuid: string;
// //     username: string;
// //     firstname: string;
// //     lastname: string;
// //     email: string;
// //     password: string;
// //     role: string;
// // }

// // const Authorization = ({ closeModal }: AuthorizationProps) => {
// //     const usernameInputRef = useRef<HTMLInputElement | null>(null);
// //     const firstnameInputRef = useRef<HTMLInputElement | null>(null);
// //     const lastnameInputRef = useRef<HTMLInputElement | null>(null);
// //     const emailInputRef = useRef<HTMLInputElement | null>(null);
// //     const passwordInputRef = useRef<HTMLInputElement | null>(null);

// //     const [userResponse, setUserResponse] = useState<string>("");
// //     const [isLogin, setIsLogin] = useState(true);
// //     const router = useRouter();

// //     async function submitHandler(e: React.FormEvent) {
// //         e.preventDefault();

// //         const enteredEmail = emailInputRef.current?.value as string;
// //         const enteredPassword = passwordInputRef.current?.value as string;

// //         if (isLogin) {
// //             try {
// //                 setUserResponse("Authenticating...");

// //                 const response = await fetch("/api/merchandise/auth/login", {
// //                     method: "POST",
// //                     headers: {
// //                         "Content-Type": "application/json",
// //                     },
// //                     body: JSON.stringify({
// //                         email: enteredEmail,
// //                         password: enteredPassword,
// //                     }),
// //                 });

// //                 if (!response.ok) {
// //                     throw new Error("Failed to authenticate");
// //                 }

// //                 const session = await getSessionAction();

// //                 if (session) {
// //                     closeModal();
// //                     router.push("/merchandise/profile");
// //                 } else {
// //                     setUserResponse(
// //                         "Authentication failed, session not established."
// //                     );
// //                 }
// //             } catch (error) {
// //                 console.error("Authentication Error:", error);
// //                 setUserResponse("Authentication failed, please try again.");
// //             }
// //         }
// //     }

// //     function switchAuthModeHandler() {
// //         setIsLogin((prevState) => !prevState);
// //     }

// //     return (
// //         <section
// //             key="loginModal"
// //             className="relative top-[0%] left-0 flex justify-center align-center"
// //         >
// //             <div className="absolute top-[50%] left-[50%] transform translate-x-[-50%] translate-y-[-50%]">
// //                 <div className="form-container relative top-0 left-0 vs:w-[15em] xs:w-[20em] mobile-l:w-[21em] tablet:w-[22em] laptop:-w-[23em] laptop-l:w-[24em] 2xl:w-[25em min-h-[25em] bg-gray-300/90 dark:bg-gray-800/90 border rounded-[0.625em] flex justify-center align-center backdrop-blur-[5px] shadow-glass3 glass-container border-white/50">
// //                     <div className="form-body">
// //                         <button onClick={closeModal}>Close Modal</button>
// //                         <h2 className="form-header">
// //                             {isLogin ? "Login " : "Register "} Form
// //                         </h2>
// //                         <form onSubmit={submitHandler}>
// //                             <p>{userResponse}</p>

// //                             {!isLogin && (
// //                                 <>
// //                                     <div className="inputBox">
// //                                         <input
// //                                             className="input input-glass-container"
// //                                             type="text"
// //                                             placeholder="Username"
// //                                             id="username"
// //                                             required
// //                                             ref={usernameInputRef}
// //                                         />
// //                                     </div>
// //                                     <div className="inputBox">
// //                                         <input
// //                                             className="input input-glass-container"
// //                                             type="text"
// //                                             placeholder="First Name"
// //                                             id="firstname"
// //                                             required
// //                                             ref={firstnameInputRef}
// //                                         />
// //                                     </div>
// //                                     <div className="inputBox">
// //                                         <input
// //                                             className="input input-glass-container"
// //                                             type="text"
// //                                             placeholder="Last Name"
// //                                             id="lastname"
// //                                             required
// //                                             ref={lastnameInputRef}
// //                                         />
// //                                     </div>
// //                                 </>
// //                             )}

// //                             <div className="inputBox">
// //                                 <input
// //                                     className="input input-glass-container"
// //                                     type="email"
// //                                     placeholder="E-Mail"
// //                                     id="email"
// //                                     required
// //                                     ref={emailInputRef}
// //                                 />
// //                             </div>
// //                             <div className="inputBox">
// //                                 <input
// //                                     className="input input-glass-container"
// //                                     type="password"
// //                                     placeholder="Password"
// //                                     id="password"
// //                                     required
// //                                     ref={passwordInputRef}
// //                                 />
// //                             </div>

// //                             <div className="inputBox">
// //                                 <input
// //                                     className="input input-glass-container text-black dark:text-[#4C8EFF] bg-gray-800/40 dark:bg-gray-300/40 max-w-[10.25em] cursor-pointer mb-[1.25em] font-semibold"
// //                                     type="submit"
// //                                     value={isLogin ? "Login" : "Register"}
// //                                 />
// //                             </div>
// //                             <p className="mt-[0.3125em] text-gray-800 dark:text-gray-300">
// //                                 <a
// //                                     className="font-semibold cursor-pointer"
// //                                     onClick={switchAuthModeHandler}
// //                                 >
// //                                     {isLogin
// //                                         ? "Create new account"
// //                                         : "Sign in with existing account"}
// //                                 </a>
// //                             </p>
// //                         </form>
// //                     </div>
// //                 </div>
// //             </div>
// //         </section>
// //     );
// // };

// // export default Authorization;

// "use client";

// import { useRef, useState } from "react";
// import { useRouter } from "next/navigation";
// import { getSessionAction } from "@/actions/merchandise/getSessionAction";

// interface AuthorizationProps {
//     closeModal: () => void;
// }

// const Authorization = ({ closeModal }: AuthorizationProps) => {
//     const emailInputRef = useRef<HTMLInputElement | null>(null);
//     const passwordInputRef = useRef<HTMLInputElement | null>(null);

//     const [userResponse, setUserResponse] = useState<string>("");
//     const [isLogin, setIsLogin] = useState(true);
//     const router = useRouter();

//     async function submitHandler(e: React.FormEvent) {
//         e.preventDefault();

//         const enteredEmail = emailInputRef.current?.value as string;
//         const enteredPassword = passwordInputRef.current?.value as string;

//         try {
//             const response = await fetch(
//                 "/api/merchandise/api/auth/callback/credentials",
//                 {
//                     method: "POST",
//                     headers: {
//                         "Content-Type": "application/json",
//                     },
//                     body: JSON.stringify({
//                         csrfToken: document.querySelector<HTMLInputElement>(
//                             'input[name="csrfToken"]'
//                         )?.value,
//                         email: enteredEmail,
//                         password: enteredPassword,
//                     }),
//                 }
//             );

//             if (!response.ok) {
//                 throw new Error("Authentication failed");
//             }

//             const session = await getSessionAction();

//             if (session) {
//                 closeModal();
//                 router.push("/merchandise/profile");
//             } else {
//                 setUserResponse(
//                     "Authentication failed, session not established."
//                 );
//             }
//         } catch (error) {
//             setUserResponse("Authentication failed, please try again.");
//         }
//     }

//     function switchAuthModeHandler() {
//         setIsLogin((prevState) => !prevState);
//     }

//     return (
//         <section
//             key="loginModal"
//             className="relative top-[0%] left-0 flex justify-center align-center"
//         >
//             <div className="absolute top-[50%] left-[50%] transform translate-x-[-50%] translate-y-[-50%]">
//                 <div className="form-container relative top-0 left-0 vs:w-[15em] xs:w-[20em] mobile-l:w-[21em] tablet:w-[22em] laptop:-w-[23em] laptop-l:w-[24em] 2xl:w-[25em min-h-[25em] bg-gray-300/90 dark:bg-gray-800/90 border rounded-[0.625em] flex justify-center align-center backdrop-blur-[5px] shadow-glass3 glass-container border-white/50">
//                     <div className="form-body">
//                         <button onClick={closeModal}>Close Modal</button>
//                         <h2 className="form-header">
//                             {isLogin ? "Login " : "Register "} Form
//                         </h2>
//                         <form onSubmit={submitHandler}>
//                             <p>{userResponse}</p>

//                             <div className="inputBox">
//                                 <input
//                                     className="input input-glass-container"
//                                     type="email"
//                                     placeholder="E-Mail"
//                                     id="email"
//                                     required
//                                     ref={emailInputRef}
//                                 />
//                             </div>
//                             <div className="inputBox">
//                                 <input
//                                     className="input input-glass-container"
//                                     type="password"
//                                     placeholder="Password"
//                                     id="password"
//                                     required
//                                     ref={passwordInputRef}
//                                 />
//                             </div>

//                             <div className="inputBox">
//                                 <input
//                                     className="input input-glass-container text-black dark:text-[#4C8EFF] bg-gray-800/40 dark:bg-gray-300/40 max-w-[10.25em] cursor-pointer mb-[1.25em] font-semibold"
//                                     type="submit"
//                                     value={isLogin ? "Login" : "Register"}
//                                 />
//                             </div>
//                             <p className="mt-[0.3125em] text-gray-800 dark:text-gray-300">
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

// export default Authorization;

// "use client";

// import { useRef, useState } from "react";
// import { useRouter } from "next/navigation";
// import { signIn } from "next-auth/react";
// import { loadStripe, TokenResult } from "@stripe/stripe-js";
// import { v4 as uuidv4 } from "uuid";

// const stripePromise = loadStripe(`${process.env.stripe_public_key}`);

// interface AuthorizationProps {
//     closeModal: () => void;
// }

// interface CreateUserParams {
//     obinsunUuid: string;
//     username: string;
//     firstname: string;
//     lastname: string;
//     email: string;
//     password: string;
//     role: string;
//     personToken: TokenResult["token"];
// }

// interface PersonTokenParams {
//     email: string;
//     firstname: string;
//     lastname: string;
//     obinsunUuid: string;
// }

// const Authorization = ({ closeModal }: AuthorizationProps) => {
//     const [userResponse, setUserResponse] = useState<string>("");

//     const personTokenCreation = async ({
//         email,
//         firstname,
//         lastname,
//         obinsunUuid,
//     }: PersonTokenParams): Promise<TokenResult["token"] | undefined> => {
//         const stripeResolver = await stripePromise;

//         const { token, error } =
//             (await stripeResolver?.createToken("person", {
//                 email,
//                 first_name: firstname,
//                 last_name: lastname,
//             })) || {};

//         if (error) {
//             console.error(error);
//             return undefined;
//         }

//         return token;
//     };

//     async function createUser({
//         obinsunUuid,
//         username,
//         firstname,
//         lastname,
//         email,
//         password,
//         role,
//         personToken,
//     }: CreateUserParams) {
//         const response = await fetch("/api/merchandise/api/auth/register", {
//             method: "POST",
//             body: JSON.stringify({
//                 obinsunUuid,
//                 username,
//                 firstname,
//                 lastname,
//                 email,
//                 password,
//                 role,
//                 personToken,
//             }),
//             headers: {
//                 "Content-Type": "application/json",
//             },
//         });

//         const userData = await response.json();
//         if (!response.ok) {
//             setUserResponse(userData.message);
//             throw new Error(userData.message || "Something went wrong!");
//         }
//         return userData;
//     }

//     const usernameInputRef = useRef<HTMLInputElement | null>(null);
//     const firstnameInputRef = useRef<HTMLInputElement | null>(null);
//     const lastnameInputRef = useRef<HTMLInputElement | null>(null);
//     const emailInputRef = useRef<HTMLInputElement | null>(null);
//     const passwordInputRef = useRef<HTMLInputElement | null>(null);

//     const [isLogin, setIsLogin] = useState(true);
//     const router = useRouter();

//     function switchAuthModeHandler() {
//         setIsLogin((prevState) => !prevState);
//     }

//     async function fetchSession() {
//         const response = await fetch("/api/merchandise/api/auth/session", {
//             credentials: "include",
//         });

//         if (response.ok) {
//             const sessionData = await response.json();
//             console.log(
//                 "Session fetched after login/registration:",
//                 sessionData
//             );
//             return sessionData;
//         } else {
//             console.error("Failed to fetch session after login/registration");
//             return null;
//         }
//     }

//     async function submitHandler(e: React.FormEvent) {
//         e.preventDefault();

//         const createUuid = uuidv4();
//         const obinsunUuid = `0b!n$un_${createUuid}`;

//         const enteredUsername = usernameInputRef.current?.value as string;
//         const enteredFirstname = firstnameInputRef.current?.value as string;
//         const enteredLastname = lastnameInputRef.current?.value as string;
//         const enteredEmail = emailInputRef.current?.value as string;
//         const enteredPassword = emailInputRef.current?.value as string;
//         const enteredRole = "guest";

//         if (isLogin) {
//             const result = await signIn("credentials", {
//                 redirect: false,
//                 email: enteredEmail,
//                 password: enteredPassword,
//             });

//             if (result?.error) {
//                 setUserResponse("User Does Not Exist!");
//             } else {
//                 await fetchSession(); // Fetch the session after successful login
//                 router.replace("/merchandise/profile");
//                 closeModal();
//             }
//         } else {
//             const createdToken = await personTokenCreation({
//                 obinsunUuid,
//                 firstname: enteredFirstname,
//                 lastname: enteredLastname,
//                 email: enteredEmail,
//             });

//             if (!createdToken) {
//                 setUserResponse("Failed to create Stripe token.");
//                 return;
//             }

//             const result = await createUser({
//                 obinsunUuid,
//                 username: enteredUsername,
//                 firstname: enteredFirstname,
//                 lastname: enteredLastname,
//                 email: enteredEmail,
//                 password: enteredPassword,
//                 role: enteredRole,
//                 personToken: createdToken,
//             });

//             console.log(result);

//             await signIn("credentials", {
//                 redirect: false,
//                 email: enteredEmail,
//                 password: enteredPassword,
//                 callbackUrl: "/merchandise/profile",
//             });

//             await fetchSession(); // Fetch the session after successful registration and login
//             closeModal();
//             router.push("/merchandise/profile");
//         }
//     }

//     return (
//         <section
//             key="loginModal"
//             className="relative top-[0%] left-0 flex justify-center align-center"
//         >
//             <div className="absolute top-[50%] left-[50%] transform translate-x-[-50%] translate-y-[-50%]">
//                 <div
//                     className="floating-square-0"
//                     style={{ "--i": "0" } as React.CSSProperties}
//                 />
//                 <div
//                     className="floating-square-1"
//                     style={{ "--i": "1" } as React.CSSProperties}
//                 />
//                 <div
//                     className="floating-square-2"
//                     style={{ "--i": "2" } as React.CSSProperties}
//                 />
//                 <div
//                     className="floating-square-3"
//                     style={{ "--i": "3" } as React.CSSProperties}
//                 />
//                 <div
//                     className="floating-square-4"
//                     style={{ "--i": "4" } as React.CSSProperties}
//                 />
//                 <div className="form-container relative top-0 left-0 vs:w-[15em] xs:w-[20em] mobile-l:w-[21em] tablet:w-[22em] laptop:-w-[23em] laptop-l:w-[24em] 2xl:w-[25em min-h-[25em] bg-gray-300/90 dark:bg-gray-800/90 border rounded-[0.625em] flex justify-center align-center backdrop-blur-[5px] shadow-glass3 glass-container border-white/50">
//                     <div className="form-body">
//                         <button onClick={closeModal}>Close Modal</button>
//                         <h2 className="form-header">
//                             {isLogin ? "Login " : "Register "}
//                             Form
//                         </h2>
//                         <form onSubmit={submitHandler}>
//                             <p>{userResponse}</p>

//                             {isLogin ? (
//                                 <>
//                                     <div className="inputBox">
//                                         <input
//                                             className="input input-glass-container"
//                                             type="email"
//                                             placeholder="E-Mail"
//                                             id="email"
//                                             required
//                                             ref={emailInputRef}
//                                         />
//                                     </div>
//                                     <div className="inputBox">
//                                         <input
//                                             className="input input-glass-container"
//                                             type="password"
//                                             placeholder="Password"
//                                             id="password"
//                                             required
//                                             ref={passwordInputRef}
//                                         />
//                                     </div>
//                                 </>
//                             ) : (
//                                 <>
//                                     <div className="inputBox">
//                                         <input
//                                             className="input input-glass-container"
//                                             type="text"
//                                             placeholder="Username"
//                                             id="username"
//                                             required
//                                             ref={usernameInputRef}
//                                         />
//                                     </div>
//                                     <div className="inputBox">
//                                         <input
//                                             className="input input-glass-container"
//                                             type="text"
//                                             placeholder="First"
//                                             id="firstname"
//                                             required
//                                             ref={firstnameInputRef}
//                                         />
//                                     </div>
//                                     <div className="inputBox">
//                                         <input
//                                             className="input input-glass-container"
//                                             type="text"
//                                             placeholder="Last"
//                                             id="lastname"
//                                             required
//                                             ref={lastnameInputRef}
//                                         />
//                                     </div>
//                                     <div className="inputBox">
//                                         <input
//                                             className="input input-glass-container"
//                                             type="email"
//                                             placeholder="E-Mail"
//                                             id="email"
//                                             required
//                                             ref={emailInputRef}
//                                         />
//                                     </div>
//                                     <div className="inputBox">
//                                         <input
//                                             className="input input-glass-container"
//                                             type="password"
//                                             placeholder="Password"
//                                             id="password"
//                                             required
//                                             ref={passwordInputRef}
//                                         />
//                                     </div>
//                                 </>
//                             )}

//                             <div className="inputBox">
//                                 <input
//                                     className="input input-glass-container text-black dark:text-[#4C8EFF] bg-gray-800/40 dark:bg-gray-300/40 max-w-[10.25em] cursor-pointer mb-[1.25em] font-semibold"
//                                     type="submit"
//                                     value={isLogin ? "Login" : "Register"}
//                                 />
//                             </div>
//                             <p className="mt-[0.3125em] text-gray-800 dark:text-gray-300">
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

// export default Authorization;

"use client";

import { useRef, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getSessionAction } from "@/actions/merchandise/getSessionAction";

interface AuthorizationProps {
    closeModal: () => void;
}

const Authorization = ({ closeModal }: AuthorizationProps) => {
    const emailInputRef = useRef<HTMLInputElement | null>(null);
    const passwordInputRef = useRef<HTMLInputElement | null>(null);

    const [csrfToken, setCsrfToken] = useState<string | null>(null);
    const [userResponse, setUserResponse] = useState<string>("");
    const [isLogin, setIsLogin] = useState(true);
    const router = useRouter();

    useEffect(() => {
        // Fetch CSRF token
        async function fetchCsrfToken() {
            const response = await fetch("/api/merchandise/api/auth/csrf");
            const data = await response.json();
            setCsrfToken(data.csrfToken);
        }

        fetchCsrfToken();
    }, []);

    async function submitHandler(e: React.FormEvent) {
        e.preventDefault();

        const enteredEmail = emailInputRef.current?.value as string;
        const enteredPassword = passwordInputRef.current?.value as string;

        if (!csrfToken) {
            setUserResponse("CSRF token not found. Please try again.");
            return;
        }

        try {
            const response = await fetch(
                "/api/merchandise/api/auth/callback/credentials",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        csrfToken,
                        email: enteredEmail,
                        password: enteredPassword,
                    }),
                }
            );

            if (!response.ok) {
                throw new Error("Authentication failed");
            }

            const session = await getSessionAction();

            if (session) {
                closeModal();
                router.push("/merchandise/profile");
            } else {
                setUserResponse(
                    "Authentication failed, session not established."
                );
            }
        } catch (error) {
            setUserResponse("Authentication failed, please try again.");
        }
    }

    function switchAuthModeHandler() {
        setIsLogin((prevState) => !prevState);
    }

    return (
        <section
            key="loginModal"
            className="relative top-[0%] left-0 flex justify-center align-center"
        >
            <div className="absolute top-[50%] left-[50%] transform translate-x-[-50%] translate-y-[-50%]">
                <div className="relative top-0 left-0 vs:w-[15em] xs:w-[20em] mobile-l:w-[21em] tablet:w-[22em] laptop:-w-[23em] laptop-l:w-[24em] 2xl:w-[25em min-h-[25em] bg-gray-300/90 dark:bg-gray-800/90 border rounded-[0.625em] flex justify-center align-center backdrop-blur-[5px] shadow-glass3 glass-container border-white/50">
                    <div className="form-body">
                        <button onClick={closeModal}>Close Modal</button>
                        <h2 className="form-header">
                            {isLogin ? "Login " : "Register "} Form
                        </h2>
                        <form onSubmit={submitHandler}>
                            <p>{userResponse}</p>

                            <div className="inputBox">
                                <input
                                    className="input input-glass-container"
                                    type="email"
                                    placeholder="E-Mail"
                                    id="email"
                                    required
                                    ref={emailInputRef}
                                />
                            </div>
                            <div className="inputBox">
                                <input
                                    className="input input-glass-container"
                                    type="password"
                                    placeholder="Password"
                                    id="password"
                                    required
                                    ref={passwordInputRef}
                                />
                            </div>

                            <div className="inputBox">
                                <input
                                    className="input input-glass-container text-black dark:text-[#4C8EFF] bg-gray-800/40 dark:bg-gray-300/40 max-w-[10.25em] cursor-pointer mb-[1.25em] font-semibold"
                                    type="submit"
                                    value={isLogin ? "Login" : "Register"}
                                />
                            </div>
                            <p className="mt-[0.3125em] text-gray-800 dark:text-gray-300">
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
};

export default Authorization;
