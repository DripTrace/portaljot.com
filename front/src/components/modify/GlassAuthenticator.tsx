// // "use client";

// // import { useRef, useState } from "react";
// // import { useRouter } from "next/navigation";
// // import { signIn } from "next-auth/react";
// // import { loadStripe, TokenResult } from "@stripe/stripe-js";
// // import { v4 as uuidv4 } from "uuid";

// // const stripePromise = loadStripe(`${process.env.stripe_public_key}`);

// // interface AuthorizationProps {
// //     closeModal: () => void;
// // }

// // interface CreateUserParams {
// //     modifyUuid: string;
// //     username: string;
// //     firstname: string;
// //     lastname: string;
// //     email: string;
// //     password: string;
// //     role: string;
// //     personToken: TokenResult["token"];
// // }

// // interface PersonTokenParams {
// //     email: string;
// //     firstname: string;
// //     lastname: string;
// //     modifyUuid: string;
// // }

// // const Authorization = ({ closeModal }: AuthorizationProps) => {
// //     const [userResponse, setUserResponse] = useState<string>("");

// //     const personTokenCreation = async ({
// //         email,
// //         firstname,
// //         lastname,
// //         modifyUuid,
// //     }: PersonTokenParams): Promise<TokenResult["token"] | undefined> => {
// //         const stripeResolver = await stripePromise;

// //         const { token, error } =
// //             (await stripeResolver?.createToken("person", {
// //                 email,
// //                 first_name: firstname,
// //                 last_name: lastname,
// //             })) || {};

// //         if (error) {
// //             console.error(error);
// //             return undefined;
// //         }

// //         return token;
// //     };

// //     async function createUser({
// //         modifyUuid,
// //         username,
// //         firstname,
// //         lastname,
// //         email,
// //         password,
// //         role,
// //         personToken,
// //     }: CreateUserParams) {
// //         const response = await fetch("/api/merchandise/api/auth/register", {
// //             method: "POST",
// //             body: JSON.stringify({
// //                 modifyUuid,
// //                 username,
// //                 firstname,
// //                 lastname,
// //                 email,
// //                 password,
// //                 role,
// //                 personToken,
// //             }),
// //             headers: {
// //                 "Content-Type": "application/json",
// //             },
// //         });

// //         const userData = await response.json();
// //         if (!response.ok) {
// //             setUserResponse(userData.message);
// //             throw new Error(userData.message || "Something went wrong!");
// //         }
// //         return userData;
// //     }

// //     const usernameInputRef = useRef<HTMLInputElement | null>(null);
// //     const firstnameInputRef = useRef<HTMLInputElement | null>(null);
// //     const lastnameInputRef = useRef<HTMLInputElement | null>(null);
// //     const emailInputRef = useRef<HTMLInputElement | null>(null);
// //     const passwordInputRef = useRef<HTMLInputElement | null>(null);

// //     const [isLogin, setIsLogin] = useState(true);
// //     const router = useRouter();

// //     function switchAuthModeHandler() {
// //         setIsLogin((prevState) => !prevState);
// //     }

// //     async function fetchSession() {
// //         const response = await fetch("/api/merchandise/api/auth/session", {
// //             credentials: "include",
// //         });

// //         if (response.ok) {
// //             const sessionData = await response.json();
// //             console.log(
// //                 "Session fetched after login/registration:",
// //                 sessionData
// //             );
// //             return sessionData;
// //         } else {
// //             console.error("Failed to fetch session after login/registration");
// //             return null;
// //         }
// //     }

// //     async function submitHandler(e: React.FormEvent) {
// //         e.preventDefault();

// //         const createUuid = uuidv4();
// //         const modifyUuid = `0b!n$un_${createUuid}`;

// //         const enteredUsername = usernameInputRef.current?.value as string;
// //         const enteredFirstname = firstnameInputRef.current?.value as string;
// //         const enteredLastname = lastnameInputRef.current?.value as string;
// //         const enteredEmail = emailInputRef.current?.value as string;
// //         const enteredPassword = emailInputRef.current?.value as string;
// //         const enteredRole = "guest";

// //         if (isLogin) {
// //             const result = await signIn("credentials", {
// //                 redirect: false,
// //                 email: enteredEmail,
// //                 password: enteredPassword,
// //             });

// //             if (result?.error) {
// //                 setUserResponse("User Does Not Exist!");
// //             } else {
// //                 await fetchSession(); // Fetch the session after successful login
// //                 router.replace("/merchandise/profile");
// //                 closeModal();
// //             }
// //         } else {
// //             const createdToken = await personTokenCreation({
// //                 modifyUuid,
// //                 firstname: enteredFirstname,
// //                 lastname: enteredLastname,
// //                 email: enteredEmail,
// //             });

// //             if (!createdToken) {
// //                 setUserResponse("Failed to create Stripe token.");
// //                 return;
// //             }

// //             const result = await createUser({
// //                 modifyUuid,
// //                 username: enteredUsername,
// //                 firstname: enteredFirstname,
// //                 lastname: enteredLastname,
// //                 email: enteredEmail,
// //                 password: enteredPassword,
// //                 role: enteredRole,
// //                 personToken: createdToken,
// //             });

// //             console.log(result);

// //             await signIn("credentials", {
// //                 redirect: false,
// //                 email: enteredEmail,
// //                 password: enteredPassword,
// //                 callbackUrl: "/merchandise/profile",
// //             });

// //             await fetchSession(); // Fetch the session after successful registration and login
// //             closeModal();
// //             router.push("/merchandise/profile");
// //         }
// //     }
// //

// "use client";

// import { useRef, useState, useEffect, type CSSProperties } from "react";
// import { useRouter } from "next/navigation";
// import { getNextAuthSessionAction } from "@/actions/modify/getNextAuthSession";
// import { loadStripe, TokenResult } from "@stripe/stripe-js";
// import { v4 as uuidv4 } from "uuid";
// import { signIn } from "next-auth/react";

// const stripePromise = loadStripe(`${process.env.stripe_public_key}`);

// interface PersonTokenParams {
// 	email: string;
// 	firstname: string;
// 	lastname: string;
// 	modifyUuid: string;
// }

// interface CreateUserParams {
// 	modifyUuid: string;
// 	username: string;
// 	firstname: string;
// 	lastname: string;
// 	email: string;
// 	password: string;
// 	role: string;
// 	personToken: TokenResult["token"];
// }

// interface GlassAuthenticatorProps {
// 	closeGlassModifyModal: () => void;
// }

// const GlassAuthenticator = ({
// 	closeGlassModifyModal,
// }: GlassAuthenticatorProps) => {
// 	const emailInputRef = useRef<HTMLInputElement | null>(null);
// 	const passwordInputRef = useRef<HTMLInputElement | null>(null);

// 	const usernameInputRef = useRef<HTMLInputElement | null>(null);
// 	const firstnameInputRef = useRef<HTMLInputElement | null>(null);
// 	const lastnameInputRef = useRef<HTMLInputElement | null>(null);

// 	const [csrfToken, setCsrfToken] = useState<string | null>(null);
// 	const [userResponse, setUserResponse] = useState<string>("");
// 	const [isLogin, setIsLogin] = useState(true);
// 	const router = useRouter();

// 	async function fetchSession() {
// 		const response = await fetch("/api/modify/auth/session", {
// 			credentials: "include",
// 		});

// 		if (response.ok) {
// 			const sessionData = await response.json();
// 			console.log(
// 				"Session fetched after login/registration:",
// 				sessionData
// 			);
// 			return sessionData;
// 		} else {
// 			console.error("Failed to fetch session after login/registration");
// 			return null;
// 		}
// 	}

// 	const personTokenCreation = async ({
// 		email,
// 		firstname,
// 		lastname,
// 		modifyUuid,
// 	}: PersonTokenParams): Promise<TokenResult["token"] | undefined> => {
// 		const stripeResolver = await stripePromise;

// 		const { token, error } =
// 			(await stripeResolver?.createToken("person", {
// 				email,
// 				first_name: firstname,
// 				last_name: lastname,
// 			})) || {};

// 		if (error) {
// 			console.error(error);
// 			return undefined;
// 		}

// 		return token;
// 	};

// 	async function createUser({
// 		modifyUuid,
// 		username,
// 		firstname,
// 		lastname,
// 		email,
// 		password,
// 		role,
// 		personToken,
// 	}: CreateUserParams) {
// 		const response = await fetch("/api/modify/auth/register", {
// 			method: "POST",
// 			body: JSON.stringify({
// 				modifyUuid,
// 				username,
// 				firstname,
// 				lastname,
// 				email,
// 				password,
// 				role,
// 				personToken,
// 			}),
// 			headers: {
// 				"Content-Type": "application/json",
// 			},
// 		});

// 		const userData = await response.json();
// 		if (!response.ok) {
// 			setUserResponse(userData.message);
// 			throw new Error(userData.message || "Something went wrong!");
// 		}
// 		return userData;
// 	}

// 	useEffect(() => {
// 		// Fetch CSRF token
// 		async function fetchCsrfToken() {
// 			const response = await fetch("/api/modify/auth/csrf");
// 			const data = await response.json();
// 			setCsrfToken(data.csrfToken);
// 		}

// 		fetchCsrfToken();
// 	}, []);

// 	async function submitHandler(e: React.FormEvent) {
// 		e.preventDefault();

// 		const createUuid = uuidv4();
// 		const modifyUuid = `p0r+4|j0t_${createUuid}`;

// 		const enteredUsername = usernameInputRef.current?.value as string;
// 		const enteredFirstname = firstnameInputRef.current?.value as string;
// 		const enteredLastname = lastnameInputRef.current?.value as string;
// 		const enteredRole = "guest";
// 		const enteredEmail = emailInputRef.current?.value as string;
// 		const enteredPassword = passwordInputRef.current?.value as string;

// 		//             if (isLogin) {
// 		//         const result = await signIn("credentials", {
// 		//             redirect: false,
// 		//             email: enteredEmail,
// 		//             password: enteredPassword,
// 		//         });

// 		//         if (result?.error) {
// 		//             setUserResponse("User Does Not Exist!");
// 		//         } else {
// 		//             await fetchSession();
// 		//             router.replace("/modify/user");
// 		//             closeGlassModifyModal();
// 		//         }
// 		//     } else {
// 		//         const createdToken = await personTokenCreation({
// 		//             modifyUuid,
// 		//             firstname: enteredFirstname,
// 		//             lastname: enteredLastname,
// 		//             email: enteredEmail,
// 		//         });

// 		//         if (!createdToken) {
// 		//             setUserResponse("Failed to create Stripe token.");
// 		//             return;
// 		//         }

// 		//         const result = await createUser({
// 		//             modifyUuid,
// 		//             username: enteredUsername,
// 		//             firstname: enteredFirstname,
// 		//             lastname: enteredLastname,
// 		//             email: enteredEmail,
// 		//             password: enteredPassword,
// 		//             role: enteredRole,
// 		//             personToken: createdToken,
// 		//         });

// 		//         console.log("REGISTERING WITH [GlassAuthenticator]: ",result);

// 		//         await signIn("credentials", {
// 		//             redirect: false,
// 		//             email: enteredEmail,
// 		//             password: enteredPassword,
// 		//             callbackUrl: "/modify/user",
// 		//         });

// 		//         await fetchSession();
// 		//         closeGlassModifyModal();
// 		//         router.push("/modify/user");
// 		//     }
// 		// }

// 		if (!csrfToken) {
// 			setUserResponse("CSRF token not found. Please try again.");
// 			return;
// 		}

// 		if (isLogin) {
// 			try {
// 				const response = await fetch(
// 					"/api/modify/auth/callback/credentials",
// 					{
// 						method: "POST",
// 						headers: {
// 							"Content-Type": "application/json",
// 						},
// 						body: JSON.stringify({
// 							csrfToken,
// 							email: enteredEmail,
// 							password: enteredPassword,
// 						}),
// 					}
// 				);

// 				if (!response.ok) {
// 					throw new Error("Authentication failed");
// 				}

// 				const session = await getNextAuthSessionAction();

// 				if (session) {
// 					closeGlassModifyModal();
// 					router.push("/modify/user");
// 				} else {
// 					setUserResponse(
// 						"Authentication failed, session not established."
// 					);
// 				}
// 			} catch (error) {
// 				setUserResponse("Authentication failed, please try again.");
// 			}
// 		}

// 		try {
// 			const createdToken = await personTokenCreation({
// 				modifyUuid,
// 				firstname: enteredFirstname,
// 				lastname: enteredLastname,
// 				email: enteredEmail,
// 			});

// 			if (!createdToken) {
// 				setUserResponse("Failed to create Stripe token.");
// 				return;
// 			}

// 			const result = await createUser({
// 				modifyUuid,
// 				username: enteredUsername,
// 				firstname: enteredFirstname,
// 				lastname: enteredLastname,
// 				email: enteredEmail,
// 				password: enteredPassword,
// 				role: enteredRole,
// 				personToken: createdToken,
// 			});

// 			console.log("REGISTERING WITH [GlassAuthenticator]: ", result);

// 			await signIn("credentials", {
// 				redirect: false,
// 				email: enteredEmail,
// 				password: enteredPassword,
// 				callbackUrl: "/modify/user",
// 			});

// 			await fetchSession();
// 			closeGlassModifyModal();
// 			router.push("/modify/user");
// 		} catch (error) {
// 			setUserResponse("Registration failed, please try again.");
// 		}

// 		// if (!csrfToken) {
// 		// 	setUserResponse("CSRF token not found. Please try again.");
// 		// 	return;
// 		// }

// 		// try {
// 		// 	const response = await fetch(
// 		// 		"/api/modify/auth/callback/credentials",
// 		// 		{
// 		// 			method: "POST",
// 		// 			headers: {
// 		// 				"Content-Type": "application/json",
// 		// 			},
// 		// 			body: JSON.stringify({
// 		// 				csrfToken,
// 		// 				email: enteredEmail,
// 		// 				password: enteredPassword,
// 		// 			}),
// 		// 		}
// 		// 	);

// 		// 	if (!response.ok) {
// 		// 		throw new Error("Authentication failed");
// 		// 	}

// 		// 	const session = await getNextAuthSessionAction();

// 		// 	if (session) {
// 		// 		closeGlassModifyModal();
// 		// 		router.push("/modify/user");
// 		// 	} else {
// 		// 		setUserResponse(
// 		// 			"Authentication failed, session not established."
// 		// 		);
// 		// 	}
// 		// } catch (error) {
// 		// 	setUserResponse("Authentication failed, please try again.");
// 		// }
// 	}

// 	function switchAuthModeHandler() {
// 		setIsLogin((prevState) => !prevState);
// 	}

// 	useEffect(() => {
// 		if (isLogin) {
// 			console.log("AUTH MODE [GlassAuthenticator]: login");
// 		}

// 		if (!isLogin) {
// 			console.log("AUTH MODE [GlassAuthenticator]: register");
// 		}
// 	}, [isLogin]);

// 	return (
// 		<section
// 			key="login-modal"
// 			className="relative top-[0%] left-0 flex justify-center align-center"
// 		>
// 			<div className="absolute top-[50%] left-[50%] transform translate-x-[-50%] translate-y-[-50%]">
// 				<div
// 					className="glass-floating-square-0"
// 					style={{ "--i": "0" } as CSSProperties}
// 				/>
// 				<div
// 					className="glass-floating-square-1"
// 					style={{ "--i": "1" } as CSSProperties}
// 				/>
// 				<div
// 					className="glass-floating-square-2"
// 					style={{ "--i": "2" } as CSSProperties}
// 				/>
// 				<div
// 					className="glass-floating-square-3"
// 					style={{ "--i": "3" } as CSSProperties}
// 				/>
// 				<div
// 					className="glass-floating-square-4"
// 					style={{ "--i": "4" } as CSSProperties}
// 				/>
// 				<div className="relative top-0 left-0 vs:w-[15em] xs:w-[20em] mobile-l:w-[21em] tablet:w-[22em] laptop:-w-[23em] laptop-l:w-[24em] 2xl:w-[25em min-h-[25em] bg-gray-300/90 dark:bg-gray-800/90 border rounded-[0.625em] flex justify-center align-center backdrop-blur-[5px] shadow-glass glass-container border-white/50">
// 					<div className="glass-form-body">
// 						<button onClick={closeGlassModifyModal}>
// 							Close Modal
// 						</button>
// 						<h2 className="glass-form-header">
// 							{isLogin ? "Login " : "Register "} Form
// 						</h2>
// 						<form onSubmit={submitHandler}>
// 							<p>{userResponse}</p>

// 							{/* <div className="glass-input-box">
// 								<input
// 									className="glass-input glass-container"
// 									type="email"
// 									title="email"
// 									placeholder="E-Mail"
// 									id="email"
// 									required
// 									ref={emailInputRef}
// 									autoComplete="email"
// 								/>
// 							</div>
// 							<div className="glass-input-box">
// 								<input
// 									className="glass-input glass-container"
// 									type="password"
// 									title="password"
// 									placeholder="Password"
// 									id="password"
// 									required
// 									ref={passwordInputRef}
// 									autoComplete="current-password"
// 								/>
// 							</div>

// 							<div className="glass-input-box">
// 								<input
// 									className="glass-input glass-container text-black dark:text-[#4C8EFF] bg-gray-800/40 dark:bg-gray-300/40 max-w-[10.25em] cursor-pointer mb-[1.25em] font-semibold"
// 									type="submit"
// 									value={isLogin ? "Login" : "Register"}
// 								/>
// 							</div>
// 							<p className="mt-[0.3125em] text-gray-800 dark:text-gray-300">
// 								<a
// 									className="font-semibold cursor-pointer"
// 									onClick={switchAuthModeHandler}
// 								>
// 									{isLogin
// 										? "Create new account"
// 										: "Sign in with existing account"}
// 								</a>
// 							</p> */}

// 							{isLogin ? (
// 								<>
// 									<div className="glass-input-box">
// 										<input
// 											className="glass-input glass-input-container"
// 											type="email"
// 											placeholder="E-Mail"
// 											id="email"
// 											required
// 											ref={emailInputRef}
// 											title="email"
// 											autoComplete="email"
// 										/>
// 									</div>
// 									<div className="glass-input-box">
// 										<input
// 											className="glass-input glass-input-container"
// 											type="password"
// 											placeholder="Password"
// 											id="password"
// 											required
// 											ref={passwordInputRef}
// 											title="password"
// 											autoComplete="current-password"
// 										/>
// 									</div>
// 								</>
// 							) : (
// 								<>
// 									<div className="glass-input-box">
// 										<input
// 											className="glass-input glass-input-container"
// 											type="text"
// 											placeholder="Username"
// 											id="username"
// 											required
// 											ref={usernameInputRef}
// 											title="username"
// 											autoComplete="username"
// 										/>
// 									</div>
// 									<div className="glass-input-box">
// 										<input
// 											className="glass-input glass-input-container"
// 											type="text"
// 											placeholder="First"
// 											id="firstname"
// 											required
// 											ref={firstnameInputRef}
// 											title="firstname"
// 											autoComplete="firstname"
// 										/>
// 									</div>
// 									<div className="glass-input-box">
// 										<input
// 											className="glass-input glass-input-container"
// 											type="text"
// 											placeholder="Last"
// 											id="lastname"
// 											required
// 											ref={lastnameInputRef}
// 											title="lastname"
// 											autoComplete="lastname"
// 										/>
// 									</div>
// 									<div className="glass-input-box">
// 										<input
// 											className="glass-input glass-input-container"
// 											type="email"
// 											placeholder="E-Mail"
// 											id="email"
// 											required
// 											ref={emailInputRef}
// 											title="email"
// 											autoComplete="email"
// 										/>
// 									</div>
// 									<div className="glass-input-box">
// 										<input
// 											className="glass-input glass-input-container"
// 											type="password"
// 											placeholder="Password"
// 											id="password"
// 											required
// 											ref={passwordInputRef}
// 											title="password"
// 											autoComplete="current-password"
// 										/>
// 									</div>
// 								</>
// 							)}
// 							<div className="glass-input-box">
// 								<input
// 									className="glass-input glass-container text-black dark:text-[#4C8EFF] bg-gray-800/40 dark:bg-gray-300/40 max-w-[10.25em] cursor-pointer mb-[1.25em] font-semibold"
// 									type="submit"
// 									value={isLogin ? "Login" : "Register"}
// 									title="auth-mode"
// 								/>
// 							</div>
// 							<p className="mt-[0.3125em] text-gray-800 dark:text-gray-300">
// 								<a
// 									className="font-semibold cursor-pointer"
// 									onClick={switchAuthModeHandler}
// 								>
// 									{isLogin
// 										? "Create new account"
// 										: "Sign in with existing account"}
// 								</a>
// 							</p>
// 						</form>
// 					</div>
// 				</div>
// 			</div>
// 		</section>
// 	);
// };

// export default GlassAuthenticator;

// // /components/GlassAuthenticator.tsx

// // "use client";

// // import { useState, useRef, CSSProperties } from "react";
// // import { useRouter } from "next/navigation";
// // import { signIn } from "next-auth/react";

// // interface GlassAuthenticatorProps {
// // 	closeGlassModifyModal: () => void;
// // }

// // const GlassAuthenticator = ({
// // 	closeGlassModifyModal,
// // }: GlassAuthenticatorProps) => {
// // 	const emailInputRef = useRef<HTMLInputElement | null>(null);
// // 	const passwordInputRef = useRef<HTMLInputElement | null>(null);

// // 	const [userResponse, setUserResponse] = useState<string>("");
// // 	const [isLogin, setIsLogin] = useState(true);
// // 	const router = useRouter();

// // 	async function submitHandler(e: React.FormEvent) {
// // 		e.preventDefault();

// // 		const enteredEmail = emailInputRef.current?.value as string;
// // 		const enteredPassword = passwordInputRef.current?.value as string;

// // 		const result = await signIn("credentials", {
// // 			redirect: false,
// // 			email: enteredEmail,
// // 			password: enteredPassword,
// // 		});

// // 		if (result?.error) {
// // 			setUserResponse("Authentication failed, please try again.");
// // 		} else {
// // 			closeGlassModifyModal();
// // 			router.push("/modify/user");
// // 		}
// // 	}

// // 	function switchAuthModeHandler() {
// // 		setIsLogin((prevState) => !prevState);
// // 	}

// // 	return (
// // 		<section
// // 			key="login-modal"
// // 			className="relative top-0 left-0 flex justify-center items-center"
// // 		>
// // 			<div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
// // 				<div
// // 					className="glass-floating-square-0"
// // 					style={{ "--i": "0" } as CSSProperties}
// // 				/>
// // 				<div
// // 					className="glass-floating-square-1"
// // 					style={{ "--i": "1" } as CSSProperties}
// // 				/>
// // 				<div
// // 					className="glass-floating-square-2"
// // 					style={{ "--i": "2" } as CSSProperties}
// // 				/>
// // 				<div
// // 					className="glass-floating-square-3"
// // 					style={{ "--i": "3" } as CSSProperties}
// // 				/>
// // 				<div
// // 					className="glass-floating-square-4"
// // 					style={{ "--i": "4" } as CSSProperties}
// // 				/>
// // 				<div className="relative top-0 left-0 vs:w-[15em] xs:w-[20em] mobile-l:w-[21em] tablet:w-[22em] laptop:w-[23em] laptop-l:w-[24em] 2xl:w-[25em] min-h-[25em] bg-gray-300/90 dark:bg-gray-800/90 border rounded-[0.625em] flex justify-center items-center backdrop-blur-[5px] shadow-glass glass-container border-white/50">
// // 					<div className="form-body">
// // 						<button onClick={closeGlassModifyModal}>
// // 							Close Modal
// // 						</button>
// // 						<h2 className="form-header">
// // 							{isLogin ? "Login " : "Register "} Form
// // 						</h2>
// // 						<form onSubmit={submitHandler}>
// // 							<p>{userResponse}</p>

// // 							<div className="glass-input-box">
// // 								<input
// // 									className="glass-input glass-container"
// // 									type="email"
// // 									title="email"
// // 									placeholder="E-Mail"
// // 									id="email"
// // 									required
// // 									ref={emailInputRef}
// // 									autoComplete="email"
// // 								/>
// // 							</div>
// // 							<div className="glass-input-box">
// // 								<input
// // 									className="glass-input glass-container"
// // 									type="password"
// // 									title="password"
// // 									placeholder="Password"
// // 									id="password"
// // 									required
// // 									ref={passwordInputRef}
// // 									autoComplete="current-password"
// // 								/>
// // 							</div>

// // 							<div className="glass-input-box">
// // 								<input
// // 									className="glass-input glass-container text-black dark:text-[#4C8EFF] bg-gray-800/40 dark:bg-gray-300/40 max-w-[10.25em] cursor-pointer mb-[1.25em] font-semibold"
// // 									type="submit"
// // 									value={isLogin ? "Login" : "Register"}
// // 								/>
// // 							</div>
// // 							<p className="mt-[0.3125em] text-gray-800 dark:text-gray-300">
// // 								<a
// // 									className="font-semibold cursor-pointer"
// // 									onClick={switchAuthModeHandler}
// // 								>
// // 									{isLogin
// // 										? "Create new account"
// // 										: "Sign in with existing account"}
// // 								</a>
// // 							</p>
// // 						</form>
// // 					</div>
// // 				</div>
// // 			</div>
// // 		</section>
// // 	);
// // };

// // export default GlassAuthenticator;

"use client";

import { useRef, useState, useEffect, type CSSProperties } from "react";
import { useRouter } from "next/navigation";
// import { getNextAuthSessionAction } from "@/actions/modify/getNextAuthSession";
import { loadStripe, TokenResult } from "@stripe/stripe-js";
import { v4 as uuidv4 } from "uuid";
import { signIn } from "next-auth/react";

const stripePromise = loadStripe(`${process.env.stripe_public_key}`);

interface PersonTokenParams {
	email: string;
	firstname: string;
	lastname: string;
	modifyUuid: string;
}

interface CreateUserParams {
	modifyUuid: string;
	username: string;
	firstname: string;
	lastname: string;
	email: string;
	password: string;
	role: string;
	personToken: TokenResult["token"];
}

interface GlassAuthenticatorProps {
	closeGlassModifyModal: () => void;
}

const GlassAuthenticator = ({
	closeGlassModifyModal,
}: GlassAuthenticatorProps) => {
	const emailInputRef = useRef<HTMLInputElement | null>(null);
	const passwordInputRef = useRef<HTMLInputElement | null>(null);
	const usernameInputRef = useRef<HTMLInputElement | null>(null);
	const firstnameInputRef = useRef<HTMLInputElement | null>(null);
	const lastnameInputRef = useRef<HTMLInputElement | null>(null);

	const [csrfToken, setCsrfToken] = useState<string | null>(null);
	const [userResponse, setUserResponse] = useState<string>("");
	const [isLogin, setIsLogin] = useState(true);
	const router = useRouter();

	async function fetchSession() {
		const response = await fetch("/api/modify/auth/session", {
			credentials: "include",
		});

		if (response.ok) {
			const sessionData = await response.json();
			console.log(
				"Session fetched after login/registration:",
				sessionData
			);
			return sessionData;
		} else {
			console.error("Failed to fetch session after login/registration");
			return null;
		}
	}

	const personTokenCreation = async ({
		email,
		firstname,
		lastname,
		modifyUuid,
	}: PersonTokenParams): Promise<TokenResult["token"] | undefined> => {
		const stripeResolver = await stripePromise;

		const { token, error } =
			(await stripeResolver?.createToken("person", {
				email,
				first_name: firstname,
				last_name: lastname,
			})) || {};

		if (error) {
			console.error(error);
			return undefined;
		}

		return token;
	};

	async function createUser(userData: CreateUserParams) {
		try {
			const response = await fetch("/api/modify/auth/register", {
				method: "POST",
				body: JSON.stringify(userData),
				headers: {
					"Content-Type": "application/json",
				},
			});

			if (!response.ok) {
				const errorData = await response.json();
				throw new Error(errorData.message || "Registration failed");
			}

			return await response.json();
		} catch (error) {
			console.error("Registration error:", error);
			throw error;
		}
	}

	useEffect(() => {
		async function fetchCsrfToken() {
			const response = await fetch("/api/modify/auth/csrf");
			const data = await response.json();
			setCsrfToken(data.csrfToken);
		}

		fetchCsrfToken();
	}, []);

	async function submitHandler(e: React.FormEvent) {
		e.preventDefault();

		if (!csrfToken) {
			setUserResponse("CSRF token not found. Please try again.");
			return;
		}

		const createUuid = uuidv4();
		const modifyUuid = `p0r+4|j0t_${createUuid}`;

		const enteredUsername = usernameInputRef.current?.value;
		const enteredFirstname = firstnameInputRef.current?.value;
		const enteredLastname = lastnameInputRef.current?.value;
		const enteredRole = "guest";
		const enteredEmail = emailInputRef.current?.value;
		const enteredPassword = passwordInputRef.current?.value;

		if (isLogin) {
			try {
				const result = await signIn("credentials", {
					redirect: false,
					email: enteredEmail,
					password: enteredPassword,
				});

				if (result?.error) {
					setUserResponse(result.error);
				} else {
					await fetchSession();
					closeGlassModifyModal();
					router.push("/modify/user");
				}
			} catch (error) {
				console.error("Login error:", error);
				setUserResponse("Login failed. Please try again.");
			}
		} else {
			try {
				const createdToken = await personTokenCreation({
					modifyUuid,
					firstname: enteredFirstname!,
					lastname: enteredLastname!,
					email: enteredEmail!,
				});

				if (!createdToken) {
					setUserResponse("Failed to create Stripe token.");
					return;
				}

				const userData: CreateUserParams = {
					modifyUuid,
					username: enteredUsername!,
					firstname: enteredFirstname!,
					lastname: enteredLastname!,
					email: enteredEmail!,
					password: enteredPassword!,
					role: enteredRole,
					personToken: createdToken,
				};

				const result = await createUser(userData);
				console.log("REGISTERING WITH [GlassAuthenticator]: ", result);

				const signInResult = await signIn("credentials", {
					redirect: false,
					email: enteredEmail,
					password: enteredPassword,
				});

				if (signInResult?.error) {
					setUserResponse(signInResult.error);
				} else {
					await fetchSession();
					closeGlassModifyModal();
					router.push("/modify/user");
				}
			} catch (error) {
				console.error("Registration error:", error);
				setUserResponse("Registration failed. Please try again.");
			}
		}
	}

	function switchAuthModeHandler() {
		setIsLogin((prevState) => !prevState);
	}

	useEffect(() => {
		if (isLogin) {
			console.log("AUTH MODE [GlassAuthenticator]: login");
		}

		if (!isLogin) {
			console.log("AUTH MODE [GlassAuthenticator]: register");
		}
	}, [isLogin]);

	return (
		<section
			key="login-modal"
			className="relative top-[0%] left-0 flex justify-center align-center"
		>
			<div className="absolute top-[50%] left-[50%] transform translate-x-[-50%] translate-y-[-50%]">
				<div
					className="glass-floating-square-0"
					style={{ "--i": "0" } as CSSProperties}
				/>
				<div
					className="glass-floating-square-1"
					style={{ "--i": "1" } as CSSProperties}
				/>
				<div
					className="glass-floating-square-2"
					style={{ "--i": "2" } as CSSProperties}
				/>
				<div
					className="glass-floating-square-3"
					style={{ "--i": "3" } as CSSProperties}
				/>
				<div
					className="glass-floating-square-4"
					style={{ "--i": "4" } as CSSProperties}
				/>
				<div className="relative top-0 left-0 vs:w-[15em] xs:w-[20em] mobile-l:w-[21em] tablet:w-[22em] laptop:-w-[23em] laptop-l:w-[24em] 2xl:w-[25em min-h-[25em] bg-gray-300/90 dark:bg-gray-800/90 border rounded-[0.625em] flex justify-center align-center backdrop-blur-[5px] shadow-glass glass-container border-white/50">
					<div className="glass-form-body">
						<button onClick={closeGlassModifyModal}>
							Close Modal
						</button>
						<h2 className="glass-form-header">
							{isLogin ? "Login " : "Register "} Form
						</h2>
						<form onSubmit={submitHandler}>
							<p>{userResponse}</p>

							{isLogin ? (
								<>
									<div className="glass-input-box">
										<input
											className="glass-input glass-input-container"
											type="email"
											placeholder="E-Mail"
											id="email"
											required
											ref={emailInputRef}
											title="email"
											autoComplete="email"
										/>
									</div>
									<div className="glass-input-box">
										<input
											className="glass-input glass-input-container"
											type="password"
											placeholder="Password"
											id="password"
											required
											ref={passwordInputRef}
											title="password"
											autoComplete="current-password"
										/>
									</div>
								</>
							) : (
								<>
									<div className="glass-input-box">
										<input
											className="glass-input glass-input-container"
											type="text"
											placeholder="Username"
											id="username"
											required
											ref={usernameInputRef}
											title="username"
											autoComplete="username"
										/>
									</div>
									<div className="glass-input-box">
										<input
											className="glass-input glass-input-container"
											type="text"
											placeholder="First"
											id="firstname"
											required
											ref={firstnameInputRef}
											title="firstname"
											autoComplete="firstname"
										/>
									</div>
									<div className="glass-input-box">
										<input
											className="glass-input glass-input-container"
											type="text"
											placeholder="Last"
											id="lastname"
											required
											ref={lastnameInputRef}
											title="lastname"
											autoComplete="lastname"
										/>
									</div>
									<div className="glass-input-box">
										<input
											className="glass-input glass-input-container"
											type="email"
											placeholder="E-Mail"
											id="email"
											required
											ref={emailInputRef}
											title="email"
											autoComplete="email"
										/>
									</div>
									<div className="glass-input-box">
										<input
											className="glass-input glass-input-container"
											type="password"
											placeholder="Password"
											id="password"
											required
											ref={passwordInputRef}
											title="password"
											autoComplete="current-password"
										/>
									</div>
								</>
							)}
							<div className="glass-input-box">
								<input
									className="glass-input glass-container text-black dark:text-[#4C8EFF] bg-gray-800/40 dark:bg-gray-300/40 max-w-[10.25em] cursor-pointer mb-[1.25em] font-semibold"
									type="submit"
									value={isLogin ? "Login" : "Register"}
									title="auth-mode"
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

export default GlassAuthenticator;
