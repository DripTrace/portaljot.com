// // // import NextAuth from "next-auth";
// // // // import { type NextAuthOptions } from "next-auth";
// // // import CredentialsProvider from "next-auth/providers/credentials";
// // // import FacebookProvider from "next-auth/providers/facebook";
// // // import GoogleProvider from "next-auth/providers/google";
// // // import EmailProvider from "next-auth/providers/email";
// // // import nodemailer from "nodemailer";
// // // import { html, text } from "@/lib/modify/createEmail";
// // // import { collection, query, getDocs, where } from "firebase/firestore";
// // // // import { NextRequest, NextResponse } from "next/server";
// // // import { adapterInstance } from "@/config/firebase/firestore";
// // // import { db } from "@/config/firebase/storage";
// // // import { verifyPassword } from "@/lib/modify/authentication/password";
// // // import ac from "@/lib/modify/authentication/accessControl";
// // // import { type AuthOptions, getServerSession } from "next-auth";
// // // import axios from "axios"

// // // const THIRTY_DAYS = 30 * 24 * 60 * 60;
// // // const THIRTY_MINUTES = 30 * 60;

// // // const authOptions: AuthOptions = {
// // // 	secret: process.env.NEXTAUTH_SECRET,
// // // 	session: {
// // // 		strategy: "jwt",
// // // 		maxAge: THIRTY_DAYS,
// // // 		updateAge: THIRTY_MINUTES,
// // // 	},
// // // 	adapter: adapterInstance,
// // // 	providers: [
// // // 		CredentialsProvider({
// // // 			name: "Credentials",
// // // 			credentials: {
// // // 				email: { label: "email", type: "email", placeholder: "email" },
// // // 				password: {
// // // 					label: "Password",
// // // 					type: "password",
// // // 					placeholder: "email",
// // // 				},
// // // 			},
// // // 			async authorize(credentials) {
// // // 				if (!credentials?.email || !credentials?.password) {
// // // 					throw new Error("Email and password are required.");
// // // 				}

// // // 				const AuthenticationQuery = query(
// // // 					collection(db, "users"),
// // // 					where("email", "==", credentials.email)
// // // 				);

// // // 				const authSnapshot = await getDocs(AuthenticationQuery);
// // // 				const userCollection: any = {};
// // // 				authSnapshot.forEach((doc) => {
// // // 					const a = doc.data();
// // // 					a["_id"] = doc.id;
// // // 					userCollection[doc.id] = a;
// // // 				});

// // // 				const user = Object.values(userCollection)[0] as any;

// // // 				if (!user || !user.password) {
// // // 					throw new Error("User not found or invalid credentials.");
// // // 				}

// // // 				const isValid = await verifyPassword(
// // // 					credentials.password,
// // // 					user.password
// // // 				);
// // // 				if (!isValid) {
// // // 					throw new Error("Could not log you in!");
// // // 				}

// // // 				return {
// // // 					id: user.modifyUuid,
// // // 					name: `${user.firstname} ${user.lastname}`,
// // // 					email: user.email,
// // // 				};
// // // 			},
// // // 		}),
// // // 		EmailProvider({
// // // 			server: {
// // // 				host: process.env.SMTP_HOST,
// // // 				port: Number(process.env.SMTP_PORT),
// // // 				auth: {
// // // 					user: process.env.SMTP_USER,
// // // 					pass: process.env.SMTP_PASSWORD,
// // // 				},
// // // 			},
// // // 			from: process.env.SMTP_FROM,
// // // 			async sendVerificationRequest({
// // // 				identifier: email,
// // // 				url,
// // // 				provider: { server, from },
// // // 			}) {
// // // 				const { host } = new URL(url);
// // // 				const transport = nodemailer.createTransport(server);
// // // 				await transport.sendMail({
// // // 					to: email,
// // // 					from,
// // // 					subject: `Sign in to ${host}`,
// // // 					text: text({ url, host }),
// // // 					html: html({ url, host, email }),
// // // 				});
// // // 			},
// // // 		}),
// // // 		FacebookProvider({
// // // 			clientId: process.env.FACEBOOK_CLIENT_ID as string,
// // // 			clientSecret: process.env.FACEBOOK_CLIENT_SECRET as string,
// // // 		}),
// // // 	],
// // // 	callbacks: {
// // // 		async signIn() {
// // // 			const isAllowedToSignIn = true;
// // // 			if (isAllowedToSignIn) {
// // // 				return true;
// // // 			} else {
// // // 				return false;
// // // 			}
// // // 		},
// // // 		async jwt({ token }) {
// // // 			const authTokenQuery = query(
// // // 				collection(db, "users"),
// // // 				where("email", "==", token.email)
// // // 			);

// // // 			const authTokenSnapshot = await getDocs(authTokenQuery);

// // // 			const userCollection: Record<string, unknown> = {};

// // // 			authTokenSnapshot.forEach((doc) => {
// // // 				const a = doc.data();
// // // 				a["_id"] = doc.id;
// // // 				userCollection[doc.id] = a;
// // // 			});

// // // 			const userToken: any = Object.values(userCollection)[0];

// // // 			if (userToken) {
// // // 				token.name = userToken.name;
// // // 				token.id = userToken._id;
// // // 				token.firestoreId = userToken._id;
// // // 				token.role = userToken.role;
// // // 				token.stripeId = userToken.stripeId;
// // // 				token.customerId = userToken.customerId;
// // // 				token.images = userToken.images;
// // // 				token.modifyId = userToken.modifyUuid;
// // // 				token.printful = userToken.printful;
// // // 				token.registeredInfo = userToken.registeredInfo;
// // // 				token.firstname = userToken.firstname;
// // // 				token.lastname = userToken.lastname;
// // // 				token.username = userToken.username;
// // // 				token.shipping = userToken.shipping;
// // // 				token.neccessary_actions = userToken.neccessary_actions;
// // // 				token.personal_info = userToken.personal_info;
// // // 				token.verification = userToken.verification;
// // // 				token.external_accounts = userToken.external_accounts;
// // // 				token.company_verification = userToken.company_verification;
// // // 				token.individual_verification =
// // // 					userToken.individual_verification;
// // // 				token.stripe_metadata = userToken.stripe_metadata;
// // // 				token.stripeBalance = userToken.stripeBalance;
// // // 			}
// // // 			return token;
// // // 		},
// // // 		async session({ session, token }: { session: any; token: any }) {
// // // 			if (token) session.id = token.id;
// // // 			session.user.role = token.role;
// // // 			session.user.stripeId = token.stripeId;
// // // 			session.user.customerId = token.customerId;
// // // 			session.user.images = token.images;
// // // 			session.user.modifyId = token.modifyId;
// // // 			session.user.firestoreId = token.firestoreId;
// // // 			session.user.printful = token.printful;
// // // 			session.user.registeredInfo = token.registeredInfo;
// // // 			session.user.firstname = token.firstname;
// // // 			session.user.lastname = token.lastname;
// // // 			session.user.username = token.username;
// // // 			session.user.shipping = token.shipping;
// // // 			session.user.neccessary_actions = token.neccessary_actions;
// // // 			session.user.personal_info = token.personal_info;
// // // 			session.user.verification = token.verification;
// // // 			session.user.external_accounts = token.external_accounts;
// // // 			session.user.company_verification = token.company_verification;
// // // 			session.user.individual_verification =
// // // 				token.individual_verification;
// // // 			session.user.stripe_metadata = token.stripe_metadata;
// // // 			session.user.stripeBalance = token.stripeBalance;

// // // 			const grants = ac.getGrants();
// // // 			session.user.permissions =
// // // 				token.role in grants
// // // 					? { [token.role]: grants[token.role] }
// // // 					: {};
// // // 			return session;
// // // 		},
// // // 		async redirect({ url, baseUrl }) {
// // // 			const customBaseUrl = `${process.env.MODIFY_URL}`;
// // // 			const customApiUrl = `${process.env.MODIFY_API}`;

// // // 			console.log("DEFINED URL >>>>", url, "BASE URL >>>>", baseUrl);

// // // 			// Handle URLs that should be prefixed with the custom base URL
// // // 			if (url.startsWith(customBaseUrl) || url.startsWith(customApiUrl)) {
// // // 				return url;
// // // 			}

// // // 			// Ensure all internal URLs are prefixed correctly
// // // 			if (url.startsWith("/modify")) {
// // // 				return `${customBaseUrl}${url.slice("/modify".length)}`;
// // // 			} else if (url.startsWith("/api/modify")) {
// // // 				return `${customApiUrl}${url.slice("/api/modify".length)}`;
// // // 			}

// // // 			// Default to the custom base URL if no match is found
// // // 			return customBaseUrl;
// // // 		},
// // // 	},
// // // 	events: {},
// // // 	// pages: {
// // // 	// 	signIn: "/api/modify/auth/login",
// // // 	// 	signOut: "/api/modify/auth/logout",
// // // 	// 	error: "/api/modify/auth/error", // Error code passed in query string as ?error=
// // // 	// 	// verifyRequest: '/api/modify/auth/verify-request', // (used for check email message)
// // // 	// 	newUser: "/api/modify/auth/register", // New users will be directed here on first sign in (leave undefined to disable)
// // // 	// 	session: '/api/modify/auth/session', // To customize the session endpoint
// // // 	// },
// // // };

// // // // const authOptions: AuthOptions = {
// // // //     // Configure one or more authentication providers
// // // //   providers: [
// // // //         GithubProvider({
// // // //       clientId: process.env.GITHUB_ID,
// // // //       clientSecret: process.env.GITHUB_SECRET,
// // // //     }),
// // // //     // ...add more providers here
// // // //   ],
// // // // }

// // // /**
// // //  * Helper function to get the session on the server without having to import the authOptions object every single time
// // //  * @returns The session object or null
// // //  */
// // // const getSession = () => getServerSession(authOptions);

// // // export { authOptions, getSession };

// // import {
// // 	// NextAuth,
// // 	AuthOptions,
// // 	Session,
// // 	User,
// // 	Account,
// // 	Profile,
// // 	DefaultSession,
// // } from "next-auth";
// // import { JWT } from "next-auth/jwt";
// // import CredentialsProvider, {
// // 	CredentialInput,
// // } from "next-auth/providers/credentials";
// // import FacebookProvider from "next-auth/providers/facebook";
// // import GoogleProvider from "next-auth/providers/google";
// // import EmailProvider from "next-auth/providers/email";
// // import nodemailer from "nodemailer";
// // import { html, text } from "@/lib/modify/createEmail";
// // import { collection, query, getDocs, where } from "firebase/firestore";
// // import { adapterInstance } from "@/config/firebase/firestore";
// // import { db } from "@/config/firebase/storage";
// // import { verifyPassword } from "@/lib/modify/authentication/password";
// // import ac from "@/lib/modify/authentication/accessControl";
// // import { getServerSession } from "next-auth";
// // import axios from "axios";
// // import { JwtUtils, UrlUtils } from "@/lib/modify/authentication/jwtUtils";
// // import { AdapterUser } from "next-auth/adapters";

// // const THIRTY_DAYS = 30 * 24 * 60 * 60;
// // const THIRTY_MINUTES = 30 * 60;

// // // Extend the JWT interface to include our custom properties
// // interface ExtendedJWT extends JWT {
// // 	role?: string;
// // 	stripeId?: string;
// // 	customerId?: string;
// // 	username?: string;
// // 	firstname?: string;
// // 	lastname?: string;
// // 	modifyId?: string;
// // 	firestoreId?: string;
// // 	registeredInfo?: {
// // 		userCountryCode: string;
// // 		userCurrency: string;
// // 		userFlag: string;
// // 	};
// // 	shipping?: {
// // 		address?: {
// // 			line1?: string;
// // 			line2?: string;
// // 			city?: string;
// // 			postal_code?: string;
// // 			state?: string;
// // 		};
// // 		name?: string;
// // 		phone?: string;
// // 	};
// // 	neccessary_actions?: any;
// // 	personal_info?: any;
// // 	verification?: any;
// // 	company_verification?: any;
// // 	individual_verification?: any;
// // 	stripe_metadata?: any;
// // 	stripeBalance?: any;
// // 	external_accounts?: any;
// // 	accessToken?: string;
// // 	refreshToken?: string;
// // }

// // // Use the extended Session type from the module augmentation
// // declare module "next-auth" {
// // 	interface Session {
// // 		user: {
// // 			accessToken?: string; // Add accessToken here

// // 			role?: string;
// // 			stripeId?: string;
// // 			customerId?: string;
// // 			username?: string;
// // 			firstname?: string;
// // 			lastname?: string;
// // 			modifyId?: string;
// // 			firestoreId?: string;
// // 			registeredInfo?: {
// // 				userCountryCode: string;
// // 				userCurrency: string;
// // 				userFlag: string;
// // 			};
// // 			shipping?: {
// // 				address?: {
// // 					line1?: string;
// // 					line2?: string;
// // 					city?: string;
// // 					postal_code?: string;
// // 					state?: string;
// // 				};
// // 				name?: string;
// // 				phone?: string;
// // 			};
// // 			neccessary_actions?: any;
// // 			personal_info?: any;
// // 			verification?: any;
// // 			company_verification?: any;
// // 			individual_verification?: any;
// // 			stripe_metadata?: any;
// // 			stripeBalance?: any;
// // 			external_accounts?: any;
// // 			permissions?: { admin: [any] };
// // 		} & DefaultSession["user"];
// // 		expires: string;
// // 	}
// // }

// // namespace NextAuthUtils {
// // 	export const refreshToken = async function (
// // 		refreshToken: string
// // 	): Promise<[string | null, string | null]> {
// // 		try {
// // 			const response = await axios.post(
// // 				UrlUtils.makeUrl(
// // 					process.env.BACKEND_API_BASE as string,
// // 					"api",
// // 					"auth",
// // 					"token",
// // 					"refresh"
// // 				),
// // 				{
// // 					refresh: refreshToken,
// // 				}
// // 			);

// // 			const { access, refresh } = response.data;
// // 			return [access, refresh];
// // 		} catch {
// // 			return [null, null];
// // 		}
// // 	};
// // }

// // const authOptions: AuthOptions = {
// // 	secret: process.env.NEXTAUTH_SECRET,
// // 	session: {
// // 		strategy: "jwt",
// // 		maxAge: THIRTY_DAYS,
// // 		updateAge: THIRTY_MINUTES,
// // 	},
// // 	adapter: adapterInstance,
// // 	providers: [
// // 		CredentialsProvider({
// // 			name: "Credentials",
// // 			credentials: {
// // 				email: { label: "email", type: "email", placeholder: "email" },
// // 				password: {
// // 					label: "Password",
// // 					type: "password",
// // 					placeholder: "password",
// // 				},
// // 			},
// // 			async authorize(credentials) {
// // 				if (!credentials?.email || !credentials?.password) {
// // 					throw new Error("Email and password are required.");
// // 				}

// // 				const AuthenticationQuery = query(
// // 					collection(db, "users"),
// // 					where("email", "==", credentials.email)
// // 				);

// // 				const authSnapshot = await getDocs(AuthenticationQuery);
// // 				const userCollection: Record<string, any> = {};
// // 				authSnapshot.forEach((doc) => {
// // 					const a = doc.data();
// // 					a["_id"] = doc.id;
// // 					userCollection[doc.id] = a;
// // 				});

// // 				const user = Object.values(userCollection)[0] as any;

// // 				if (!user || !user.password) {
// // 					throw new Error("User not found or invalid credentials.");
// // 				}

// // 				const isValid = await verifyPassword(
// // 					credentials.password,
// // 					user.password
// // 				);
// // 				if (!isValid) {
// // 					throw new Error("Could not log you in!");
// // 				}

// // 				return {
// // 					id: user.modifyUuid,
// // 					name: `${user.firstname} ${user.lastname}`,
// // 					email: user.email,
// // 				};
// // 			},
// // 		}),
// // 		EmailProvider({
// // 			server: {
// // 				host: process.env.SMTP_HOST,
// // 				port: Number(process.env.SMTP_PORT),
// // 				auth: {
// // 					user: process.env.SMTP_USER,
// // 					pass: process.env.SMTP_PASSWORD,
// // 				},
// // 			},
// // 			from: process.env.SMTP_FROM,
// // 			async sendVerificationRequest({
// // 				identifier: email,
// // 				url,
// // 				provider: { server, from },
// // 			}) {
// // 				const { host } = new URL(url);
// // 				const transport = nodemailer.createTransport(server);
// // 				await transport.sendMail({
// // 					to: email,
// // 					from,
// // 					subject: `Sign in to ${host}`,
// // 					text: text({ url, host }),
// // 					html: html({ url, host, email }),
// // 				});
// // 			},
// // 		}),
// // 		FacebookProvider({
// // 			clientId: process.env.FACEBOOK_CLIENT_ID as string,
// // 			clientSecret: process.env.FACEBOOK_CLIENT_SECRET as string,
// // 		}),
// // 		GoogleProvider({
// // 			clientId: process.env.GOOGLE_AUTH_CLIENT_ID as string,
// // 			clientSecret: process.env.GOOGLE_AUTH_CLIENT_SECRET as string,
// // 		}),
// // 	],
// // 	callbacks: {
// // 		// async signIn({ account, profile }) {
// // 		async signIn(params: {
// // 			user: User | AdapterUser;
// // 			account: Account | null;
// // 			profile?: Profile;
// // 			email?: { verificationRequest?: boolean };
// // 			credentials?: Record<string, CredentialInput>;
// // 		}): Promise<string | boolean> {
// // 			console.log("[...NEXTAUTH SIGNIN PARAMS: ", params);

// // 			if (!params) {
// // 				console.log("NO PARAMETERS WERE PROVIDED AT LOGIN");
// // 				return false;
// // 			}

// // 			let { account, profile, user, email, credentials } = params;

// // 			if (credentials) return true;

// // 			if (!email) {
// // 				console.log("EMAIL NOT FOUND \nReturned properties: ", params);
// // 			}

// // 			// const { name, email, image, emailVarified, id } = user

// // 			// const { provider, type, providerAccountId, access_token, expires_at, scope, token_type, id_token } = account

// // 			if (!account) {
// // 				console.log(
// // 					"ACCOUNT NOT FOUND \nReturned properties: ",
// // 					params
// // 				);
// // 			}
// // 			if (!profile) {
// // 				console.log(
// // 					"PROFILE NOT FOUND \nReturned properties: ",
// // 					params
// // 				);
// // 			}
// // 			if (!user) {
// // 				console.log("USER NOT FOUND \nReturned properties: ", params);
// // 			}
// // 			if (!credentials) {
// // 				console.log(
// // 					"CREDENTIALS NOT FOUND \nReturned properties: ",
// // 					params
// // 				);
// // 			}

// // 			// if (account && profile) {
// // 			//     console.log("NO ACCOUNT HAS BEEN FOUND \nPROFILE RETURNED: ", profile, "\n----------")
// // 			// }
// // 			// if (profile && account) {
// // 			//     console.log("LOGGED IN USER HAS NO PROFILE \nUSER'S ACCOUNT ",account, "\n----------")
// // 			// }
// // 			// const { account, profile } = params;

// // 			if (account) {
// // 				console.log("USER ACCOUNT: ", account);
// // 				let { provider } = account;
// // 				if (profile) {
// // 					console.log("PROFILE FOUND: ", profile);
// // 					// const { email_verified, email } = profile
// // 					const { email, image, name, sub } = profile;
// // 					if (!email) {
// // 						console.log(
// // 							"NO EMAIL IN PROFILE. \nUSER DOES NOT USE EMAIL AS AUTH METHOD \nPOSSIBLE METHOD USED: PHONE, USERNAME/PASSWORD, SSO, AUTH APP, BIO"
// // 						);
// // 						return false;
// // 					}
// // 					if (!image) {
// // 						console.log("NO IMAGE IN PROFILE");
// // 					}
// // 					if (!name) {
// // 						console.log("NO NAME IN PROFILE");
// // 					}
// // 					if (!sub) {
// // 						console.log("NO SUB IN PROFILE");
// // 					}
// // 					const accountProfile = profile as {
// // 						email_verified: boolean;
// // 						email?: string;
// // 					}; // Type assertion
// // 					const emailTest =
// // 						/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(
// // 							email
// // 						);
// // 					const verifiedEmail =
// // 						accountProfile.email_verified && emailTest;

// // 					// const verification: boolean = (p: string, e: string, v: boolean) => {
// // 					//     console.log(`checking if ${p} email address has been verified . . .`)
// // 					//     switch (v) {
// // 					//         case (v === false):
// // 					//         console.log(`${p} email has not been verified, check email for verification . . .`)
// // 					//         return v
// // 					//         case (v === true):
// // 					//         console.log(`${e} has been verified as a ${p} email . . .`)
// // 					//         return v
// // 					//     }
// // 					//     return
// // 					// }

// // 					switch (provider) {
// // 						case "google":
// // 							// console.log("GOOGLE ACCOUNT: ",)
// // 							// const googleProfile = profile as { email_verified: boolean; email?: string }; // Type assertion

// // 							// return googleProfile.email_verified && googleProfile.email?.endsWith("@example.com") ? true : false; // Ensure a boolean is returned
// // 							// const email = googleProfile.email ?? ""; // Provide a default value if email is undefined
// // 							// console.log("GOOGLE ACCOUNT: ", googleProfile)
// // 							// return googleProfile.email_verified && /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email) ? true : false; // Ensure a boolean is returned
// // 							return verifiedEmail ? true : false; // Ensure a boolean is returned
// // 						case "microsoft":
// // 							console.log(
// // 								`verifying if ${email} has been verified by ${provider} . . .`
// // 							);
// // 							return verifiedEmail ? true : false; // Ensure a boolean is returned
// // 						case "facebook":
// // 							return verifiedEmail ? true : false; // Ensure a boolean is returned
// // 						case "amazon":
// // 							return verifiedEmail ? true : false; // Ensure a boolean is returned
// // 						case "discord":
// // 							return verifiedEmail ? true : false; // Ensure a boolean is returned
// // 						case "reddit":
// // 							return verifiedEmail ? true : false; // Ensure a boolean is returned
// // 						case "slack":
// // 							return verifiedEmail ? true : false; // Ensure a boolean is returned
// // 						case "tiktok":
// // 							return verifiedEmail ? true : false; // Ensure a boolean is returned
// // 						case "snapchat":
// // 							return verifiedEmail ? true : false; // Ensure a boolean is returned
// // 						// case "credential":
// // 						// 	return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(
// // 						// 		user.email!
// // 						// 	)
// // 						// 		? true
// // 						// 		: false; // Ensure a boolean is returned
// // 					}
// // 				}
// // 				console.log("NO PROFILE FOUND");
// // 				// continue
// // 			}
// // 			// throw new Error("NO USER ACCOUNT ------")

// // 			// if (params.account?.provider === "google" && params.profile) {
// // 			//     const googleProfile = params.profile as { email_verified: boolean; email?: string }; // Type assertion
// // 			//     return googleProfile.email_verified && googleProfile.email?.endsWith("@example.com") ? true : false; // Ensure a boolean is returned
// // 			// }
// // 			// return true; // Ensure a boolean is returned for other providers
// // 			// }

// // 			// const isAllowedToSignIn = true;
// // 			// return isAllowedToSignIn;
// // 			// console.log(
// // 			// 	"[...NEXTAUTH] SIGNIN ACCOUNT: ",
// // 			// 	account,
// // 			// 	"SIGNIN PROFILE: ",
// // 			// 	profile
// // 			// );

// // 			// if (account?.provider === "google" && profile?.email) {
// // 			// console.log("[...NEXTAUTH] SIGNIN ACCOUNT: ", account, "SIGNIN PROFILE: ", profile)
// // 			// return true; // Allow sign in if email is present
// // 			// }
// // 			return false; // Do not allow sign in if no email
// // 		},
// // 		async jwt({
// // 			token,
// // 			user,
// // 			account,
// // 		}: {
// // 			token: JWT;
// // 			user?: User;
// // 			account?: Account | null;
// // 			profile?: Profile;
// // 			isNewUser?: boolean;
// // 		}): Promise<ExtendedJWT> {
// // 			console.log("DEBUG: JWT Callback - token:", token);
// // 			console.log("DEBUG: JWT Callback - account:", account);
// // 			// const { provider, type, providerAccountId, access_token, expires_at, scope, token_type, id_token } = account
// // 			console.log("DEBUG: JWT Callback - user:", user);
// // 			if (account) {
// // 				console.log("THERE IS AN ACCOUNT[NAUTH]: ", account);
// // 				token.accessToken = account.access_token;
// // 			}
// // 			// if (user) {
// // 			if (account && user) {
// // 				// This is the first sign in, save the access token and user info
// // 				token.accessToken = account.access_token;
// // 				token.user = user;
// // 				// Persist the OAuth access_token to the token right after signin
// // 				//   if (account) {
// // 				//     token.accessToken = account.access_token;
// // 				//   }
// // 				//   return token;
// // 				console.log("ACCOUNT no google [NAUTH]: ", account);

// // 				if (account?.provider === "google") {
// // 					// if (account && account.provider === 'google') {

// // 					// const { accessToken, idToken } = account;

// // 					console.log("ACCOUNT [NAUTH]: ", account);

// // 					try {
// // 						// Verify the Google token
// // 						//   const response = await axios.get(
// // 						//     `https://www.googleapis.com/oauth2/v3/tokeninfo?access_token=${account.access_token}`
// // 						//   );
// // 						//   console.log("Google token info:", response.data);

// // 						// const backendResponse = await axios.post(
// // 						// 	UrlUtils.makeUrl(
// // 						// 		process.env.BACKEND_API_BASE as string,
// // 						// 		"api",
// // 						// 		"social",
// // 						// 		// "accounts",
// // 						// 		"login",
// // 						// 		account.provider
// // 						// 		// "login",
// // 						// 		// "callback"
// // 						// 	),
// // 						// 	{
// // 						// 		access_token: account.accessToken,
// // 						// 		id_token: account.idToken,
// // 						// 	}
// // 						// 	// {
// // 						// 	//     access_token: account.access_token,
// // 						// 	//     id_token: account.id_token,
// // 						// 	//   }
// // 						// );
// // 						//this did it fucking shit
// // 						const backendResponse = await axios.post(
// // 							`${process.env.BACKEND_API_BASE}/api/social/login/google/`,
// // 							{
// // 								access_token: account.access_token,
// // 								id_token: account.id_token,
// // 							}
// // 						);
// // 						//this did it fucking shit

// // 						console.log("Backend response:", backendResponse.data);

// // 						const backendResponseCopy = { ...backendResponse };
// // 						console.log(
// // 							"RESPONSE COPY[NAUTH]: ",
// // 							backendResponseCopy
// // 						);

// // 						// const { access_token, refresh_token } =
// // 						// backendResponse.data;
// // 						token = {
// // 							...token,
// // 							accessToken: account.access_token,
// // 							refreshToken: backendResponse.data,
// // 						};
// // 						console.log("TOKEN BEING RETURNED[NAUTHJWT]: ", token);

// // 						// Save the backend tokens in the NextAuth token
// // 						//   token.backendAccessToken = backendResponse.data.access_token;
// // 						//   token.backendRefreshToken = backendResponse.data.refresh_token;

// // 						return token as ExtendedJWT;
// // 					} catch (error) {
// // 						console.error("Error in Google authentication:", error);
// // 						return token as ExtendedJWT;
// // 					}
// // 				}
// // 				// else if (token.backendAccessToken) {
// // 				//     // This is a subsequent sign in, check if the backend token is expired
// // 				//     // You'll need to implement this check based on your backend token structure
// // 				//     const isExpired = checkIfBackendTokenIsExpired(token.backendAccessToken);
// // 				//     if (isExpired) {
// // 				//       // Refresh the backend token
// // 				//       try {
// // 				//         const refreshResponse = await axios.post(
// // 				//           `${process.env.BACKEND_API_BASE}/api/token/refresh/`,
// // 				//           {
// // 				//             refresh_token: token.backendRefreshToken,
// // 				//           }
// // 				//         );
// // 				//         token.backendAccessToken = refreshResponse.data.access_token;
// // 				//         token.backendRefreshToken = refreshResponse.data.refresh_token;
// // 				//       } catch (error) {
// // 				//         console.error("Error refreshing backend token:", error);
// // 				//         // Handle refresh failure (e.g., force re-authentication)
// // 				//       }
// // 				//     }
// // 				//   }
// // 			}

// // 			console.log("JWT TOKEN[NAUTH]: ", token);

// // 			if (
// // 				token.accessToken &&
// // 				typeof token.accessToken === "string" &&
// // 				(await JwtUtils.isJwtExpired(token.accessToken))
// // 			) {
// // 				const [newAccessToken, newRefreshToken] =
// // 					await NextAuthUtils.refreshToken(
// // 						token.refreshToken as string
// // 					);

// // 				if (newAccessToken && newRefreshToken) {
// // 					token = {
// // 						...token,
// // 						accessToken: newAccessToken,
// // 						refreshToken: newRefreshToken,
// // 						iat: Math.floor(Date.now() / 1000),
// // 						exp: Math.floor(Date.now() / 1000 + 2 * 60 * 60),
// // 					};

// // 					return token as ExtendedJWT;
// // 				}

// // 				return {
// // 					...token,
// // 					exp: 0,
// // 				} as ExtendedJWT;
// // 			}

// // 			// if (account?.provider === "credentials") {
// // 			const authTokenQuery = query(
// // 				collection(db, "users"),
// // 				where("email", "==", token.email)
// // 			);

// // 			const authTokenSnapshot = await getDocs(authTokenQuery);

// // 			const userCollection: Record<string, unknown> = {};

// // 			authTokenSnapshot.forEach((doc) => {
// // 				const a = doc.data();
// // 				a["_id"] = doc.id;
// // 				userCollection[doc.id] = a;
// // 			});

// // 			const userToken: any = Object.values(userCollection)[0];

// // 			if (userToken) {
// // 				token = {
// // 					...token,
// // 					role: userToken.role,
// // 					stripeId: userToken.stripeId,
// // 					customerId: userToken.customerId,
// // 					username: userToken.username,
// // 					firstname: userToken.firstname,
// // 					lastname: userToken.lastname,
// // 					modifyId: userToken.modifyUuid,
// // 					firestoreId: userToken._id,
// // 					registeredInfo: userToken.registeredInfo,
// // 					shipping: userToken.shipping,
// // 					neccessary_actions: userToken.neccessary_actions,
// // 					personal_info: userToken.personal_info,
// // 					verification: userToken.verification,
// // 					external_accounts: userToken.external_accounts,
// // 					company_verification: userToken.company_verification,
// // 					individual_verification: userToken.individual_verification,
// // 					stripe_metadata: userToken.stripe_metadata,
// // 					stripeBalance: userToken.stripeBalance,
// // 				};
// // 			}
// // 			// }

// // 			console.log(
// // 				"TOKEN BEING RETURNED TO SESSION[NAUTHJWTTOSESSION]: ",
// // 				token
// // 			);
// // 			return token as ExtendedJWT;
// // 		},
// // 		async session({
// // 			session,
// // 			token,
// // 		}: {
// // 			session: Session;
// // 			token: JWT;
// // 		}): Promise<Session> {
// // 			console.log("DEBUG: Session Callback - token:", token);

// // 			// Send properties to the client, like an access_token from a provider.
// // 			//   session.accessToken = token.accessToken;
// // 			//   return session;

// // 			// session.accessToken = token.accessToken as string;
// // 			//   session.user = {
// // 			// ...session.user,
// // 			// ...token.user,
// // 			//   };

// // 			// Add any additional fields you want in the session
// // 			//   session.backendAccessToken = token.backendAccessToken as string;

// // 			console.log("SESSION [NAUTH]: ", session, "\nTOKEN [NAUTH]", token);

// // 			const extendedToken = token as ExtendedJWT;

// // 			session.user = {
// // 				...session.user,
// // 				role: extendedToken.role,
// // 				stripeId: extendedToken.stripeId,
// // 				customerId: extendedToken.customerId,
// // 				username: extendedToken.username,
// // 				firstname: extendedToken.firstname,
// // 				lastname: extendedToken.lastname,
// // 				modifyId: extendedToken.modifyId,
// // 				firestoreId: extendedToken.firestoreId,
// // 				registeredInfo: extendedToken.registeredInfo,
// // 				shipping: extendedToken.shipping,
// // 				neccessary_actions: extendedToken.neccessary_actions,
// // 				personal_info: extendedToken.personal_info,
// // 				verification: extendedToken.verification,
// // 				external_accounts: extendedToken.external_accounts,
// // 				company_verification: extendedToken.company_verification,
// // 				individual_verification: extendedToken.individual_verification,
// // 				stripe_metadata: extendedToken.stripe_metadata,
// // 				stripeBalance: extendedToken.stripeBalance,
// // 				...extendedToken,
// // 			};

// // 			const grants = ac.getGrants();
// // 			if (extendedToken.role) {
// // 				session.user.permissions =
// // 					extendedToken.role in grants
// // 						? { admin: [grants[extendedToken.role]] }
// // 						: { admin: [{}] };
// // 			}

// // 			return session;
// // 		},
// // 		async redirect({ url, baseUrl }) {
// // 			const customBaseUrl = process.env.MODIFY_URL as string;
// // 			const customApiUrl = process.env.MODIFY_API as string;

// // 			console.log("DEFINED URL >>>>", url, "BASE URL >>>>", baseUrl);

// // 			if (url.startsWith(customBaseUrl) || url.startsWith(customApiUrl)) {
// // 				return url;
// // 			}

// // 			if (url.startsWith("/modify")) {
// // 				return `${customBaseUrl}${url.slice("/modify".length)}`;
// // 			} else if (url.startsWith("/api/modify")) {
// // 				return `${customApiUrl}${url.slice("/api/modify".length)}`;
// // 			}

// // 			return customBaseUrl;
// // 		},
// // 	},
// // 	events: {},
// // };

// // const getSession = () => getServerSession(authOptions);

// // export { authOptions, getSession };

// // // import NextAuth, { AuthOptions, Session, User, Account, Profile, DefaultSession } from "next-auth";
// // // import { JWT } from "next-auth/jwt";
// // // import CredentialsProvider from "next-auth/providers/credentials";
// // // import FacebookProvider from "next-auth/providers/facebook";
// // // import GoogleProvider from "next-auth/providers/google";
// // // import EmailProvider from "next-auth/providers/email";
// // // import nodemailer from "nodemailer";
// // // import { html, text } from "@/lib/modify/createEmail";
// // // import { collection, query, getDocs, where, doc, setDoc, updateDoc } from "firebase/firestore";
// // // import { adapterInstance } from "@/config/firebase/firestore";
// // // import { db } from "@/config/firebase/storage";
// // // import { verifyPassword } from "@/lib/modify/authentication/password";
// // // import ac from "@/lib/modify/authentication/accessControl";
// // // import { getServerSession } from "next-auth";
// // // import axios from "axios";
// // // import { JwtUtils, UrlUtils } from "@/lib/modify/authentication/jwtUtils";
// // // import { AdapterUser } from "next-auth/adapters";

// // // const THIRTY_DAYS = 30 * 24 * 60 * 60;
// // // const THIRTY_MINUTES = 30 * 60;

// // // interface ExtendedUser extends User {
// // //   password?: string;
// // //   firstname?: string;
// // //   lastname?: string;
// // //   role?: string;
// // //   stripeId?: string;
// // //   customerId?: string;
// // //   username?: string;
// // //   modifyId?: string;
// // //   firestoreId?: string;
// // //   registeredInfo?: {
// // //     userCountryCode: string;
// // //     userCurrency: string;
// // //     userFlag: string;
// // //   };
// // //   shipping?: {
// // //     address?: {
// // //       line1?: string;
// // //       line2?: string;
// // //       city?: string;
// // //       postal_code?: string;
// // //       state?: string;
// // //     };
// // //     name?: string;
// // //     phone?: string;
// // //   };
// // //   neccessary_actions?: any;
// // //   personal_info?: any;
// // //   verification?: any;
// // //   company_verification?: any;
// // //   individual_verification?: any;
// // //   stripe_metadata?: any;
// // //   stripeBalance?: any;
// // //   external_accounts?: any;
// // //   accessToken?: string;
// // //   account?: Account;
// // //   permissions?: { admin: any[] };
// // // }

// // // interface ExtendedJWT extends JWT {
// // //   accessToken?: string;
// // //   refreshToken?: string;
// // //   account?: Account;
// // //   user?: ExtendedUser;
// // // }

// // // declare module "next-auth" {
// // //   interface Session {
// // //     user: ExtendedUser;
// // //     expires: string;
// // //   }
// // // }

// // // const saveUserToFirestore = async (user: ExtendedUser, account: Account | null) => {
// // //   if (!user.email) return;

// // //   const userRef = doc(db, "users", user.id);
// // //   await setDoc(userRef, {
// // //     ...user,
// // //     account: account || null,
// // //     updatedAt: new Date().toISOString(),
// // //   }, { merge: true });
// // // };

// // // const getUserFromFirestore = async (email: string): Promise<ExtendedUser | null> => {
// // //   const usersRef = collection(db, "users");
// // //   const q = query(usersRef, where("email", "==", email));
// // //   const querySnapshot = await getDocs(q);

// // //   if (querySnapshot.empty) return null;

// // //   const userDoc = querySnapshot.docs[0];
// // //   return { id: userDoc.id, ...userDoc.data() } as ExtendedUser;
// // // };

// // // const authOptions: AuthOptions = {
// // //   secret: process.env.NEXTAUTH_SECRET,
// // //   session: {
// // //     strategy: "jwt",
// // //     maxAge: THIRTY_DAYS,
// // //     updateAge: THIRTY_MINUTES,
// // //   },
// // //   adapter: adapterInstance,
// // //   providers: [
// // //     CredentialsProvider({
// // //       name: "Credentials",
// // //       credentials: {
// // //         email: { label: "email", type: "email", placeholder: "email" },
// // //         password: { label: "Password", type: "password", placeholder: "password" },
// // //       },
// // //       async authorize(credentials) {
// // //         if (!credentials?.email || !credentials?.password) {
// // //           throw new Error("Email and password are required.");
// // //         }

// // //         const user = await getUserFromFirestore(credentials.email);

// // //         if (!user || !user.password) {
// // //           throw new Error("User not found or invalid credentials.");
// // //         }

// // //         const isValid = await verifyPassword(credentials.password, user.password);
// // //         if (!isValid) {
// // //           throw new Error("Could not log you in!");
// // //         }

// // //         return user;
// // //       },
// // //     }),
// // //     EmailProvider({
// // //       server: {
// // //         host: process.env.SMTP_HOST,
// // //         port: Number(process.env.SMTP_PORT),
// // //         auth: {
// // //           user: process.env.SMTP_USER,
// // //           pass: process.env.SMTP_PASSWORD,
// // //         },
// // //       },
// // //       from: process.env.SMTP_FROM,
// // //       async sendVerificationRequest({
// // //         identifier: email,
// // //         url,
// // //         provider: { server, from },
// // //       }) {
// // //         const { host } = new URL(url);
// // //         const transport = nodemailer.createTransport(server);
// // //         await transport.sendMail({
// // //           to: email,
// // //           from,
// // //           subject: `Sign in to ${host}`,
// // //           text: text({ url, host }),
// // //           html: html({ url, host, email }),
// // //         });
// // //       },
// // //     }),
// // //     FacebookProvider({
// // //       clientId: process.env.FACEBOOK_CLIENT_ID as string,
// // //       clientSecret: process.env.FACEBOOK_CLIENT_SECRET as string,
// // //     }),
// // //     GoogleProvider({
// // //       clientId: process.env.GOOGLE_AUTH_CLIENT_ID as string,
// // //       clientSecret: process.env.GOOGLE_AUTH_CLIENT_SECRET as string,
// // //     }),
// // //   ],
// // //   callbacks: {
// // //     async signIn(params) {
// // //       const { user, account, profile } = params;
// // //       console.log("SignIn callback", { user, account, profile });

// // //       if (account && user) {
// // //         await saveUserToFirestore(user as ExtendedUser, account);
// // //       }

// // //       return true;
// // //     },
// // //     async jwt({ token, user, account }): Promise<ExtendedJWT> {
// // //       console.log("JWT callback", { token, user, account });

// // //       if (user) {
// // //         const firestoreUser = await getUserFromFirestore(user.email as string);
// // //         if (firestoreUser) {
// // //           token.user = firestoreUser;
// // //         }
// // //       }

// // //       // 						const backendResponse = await axios.post(
// // // // 							`${process.env.BACKEND_API_BASE}/api/social/login/google/`,
// // // // 							{
// // // // 								access_token: account.access_token,
// // // // 								id_token: account.id_token,
// // // // 							}
// // // // 						);

// // //       if (account) {
// // //         token.accessToken = account.access_token;
// // //         token.refreshToken = account.refresh_token;
// // //         token.account = account;
// // //       }

// // //       return token as ExtendedJWT;
// // //     },
// // //     async session({ session, token }): Promise<Session> {
// // //       console.log("Session callback", { session, token });

// // //       const extendedToken = token as ExtendedJWT;
// // //       const user: ExtendedUser = {
// // //         ...session.user,
// // //         ...extendedToken.user,
// // //         accessToken: extendedToken.accessToken,
// // //         account: extendedToken.account,
// // //       };

// // //       const grants = ac.getGrants();
// // //       if (user.role) {
// // //         user.permissions = user.role in grants
// // //           ? { admin: [grants[user.role]] }
// // //           : { admin: [{}] };
// // //       }

// // //       return { ...session, user };
// // //     },
// // //     async redirect({ url, baseUrl }) {
// // //       const customBaseUrl = process.env.MODIFY_URL as string;
// // //       const customApiUrl = process.env.MODIFY_API as string;

// // //       console.log("Redirect callback", { url, baseUrl, customBaseUrl, customApiUrl });

// // //       if (url.startsWith(customBaseUrl) || url.startsWith(customApiUrl)) {
// // //         return url;
// // //       }

// // //       if (url.startsWith("/modify")) {
// // //         return `${customBaseUrl}${url.slice("/modify".length)}`;
// // //       } else if (url.startsWith("/api/modify")) {
// // //         return `${customApiUrl}${url.slice("/api/modify".length)}`;
// // //       }

// // //       return customBaseUrl;
// // //     },
// // //   },
// // //   events: {
// // //     async signIn(message) { console.log("User signed in", message); },
// // //     async signOut(message) { console.log("User signed out", message); },
// // //     async createUser(message) {
// // //       console.log("User created", message);
// // //       if (message.user) {
// // //         await saveUserToFirestore(message.user as ExtendedUser, null);
// // //       }
// // //     },
// // //     async linkAccount(message) {
// // //       console.log("Account linked", message);
// // //       if (message.user && message.account) {
// // //         await saveUserToFirestore(message.user as ExtendedUser, message.account);
// // //       }
// // //     },
// // //     async session(message) { console.log("Session updated", message); },
// // //   },
// // // };

// // // const getSession = () => getServerSession(authOptions);

// // // export { authOptions, getSession };

// // import {
// // 	AuthOptions,
// // 	Session,
// // 	User,
// // 	Account,
// // 	Profile,
// // 	DefaultSession,
// // } from "next-auth";
// // import { JWT } from "next-auth/jwt";
// // import CredentialsProvider, {
// // 	CredentialInput,
// // } from "next-auth/providers/credentials";
// // import FacebookProvider from "next-auth/providers/facebook";
// // import GoogleProvider from "next-auth/providers/google";
// // import EmailProvider from "next-auth/providers/email";
// // import nodemailer from "nodemailer";
// // import { html, text } from "@/lib/modify/createEmail";
// // import { collection, query, getDocs, where } from "firebase/firestore";
// // import { adapterInstance } from "@/config/firebase/firestore";
// // import { db } from "@/config/firebase/storage";
// // import { verifyPassword } from "@/lib/modify/authentication/password";
// // import ac from "@/lib/modify/authentication/accessControl";
// // import { getServerSession } from "next-auth";
// // import axios from "axios";
// // // import { JwtUtils, UrlUtils } from "@/lib/modify/authentication/jwtUtils";
// // import { isJwtExpired, makeUrl } from "@/lib/modify/authentication/jwtUtils";
// // import { AdapterUser } from "next-auth/adapters";

// // const THIRTY_DAYS = 30 * 24 * 60 * 60;
// // const THIRTY_MINUTES = 30 * 60;

// // interface ExtendedJWT extends JWT {
// // 	role?: string;
// // 	stripeId?: string;
// // 	customerId?: string;
// // 	username?: string;
// // 	firstname?: string;
// // 	lastname?: string;
// // 	modifyId?: string;
// // 	firestoreId?: string;
// // 	registeredInfo?: {
// // 		userCountryCode: string;
// // 		userCurrency: string;
// // 		userFlag: string;
// // 	};
// // 	shipping?: {
// // 		address?: {
// // 			line1?: string;
// // 			line2?: string;
// // 			city?: string;
// // 			postal_code?: string;
// // 			state?: string;
// // 		};
// // 		name?: string;
// // 		phone?: string;
// // 	};
// // 	neccessary_actions?: any;
// // 	personal_info?: any;
// // 	verification?: any;
// // 	company_verification?: any;
// // 	individual_verification?: any;
// // 	stripe_metadata?: any;
// // 	stripeBalance?: any;
// // 	external_accounts?: any;
// // 	accessToken?: string;
// // 	refreshToken?: string;
// // }

// // declare module "next-auth" {
// // 	interface Session {
// // 		user: {
// // 			accessToken?: string;
// // 			role?: string;
// // 			stripeId?: string;
// // 			customerId?: string;
// // 			username?: string;
// // 			firstname?: string;
// // 			lastname?: string;
// // 			modifyId?: string;
// // 			firestoreId?: string;
// // 			registeredInfo?: {
// // 				userCountryCode: string;
// // 				userCurrency: string;
// // 				userFlag: string;
// // 			};
// // 			shipping?: {
// // 				address?: {
// // 					line1?: string;
// // 					line2?: string;
// // 					city?: string;
// // 					postal_code?: string;
// // 					state?: string;
// // 				};
// // 				name?: string;
// // 				phone?: string;
// // 			};
// // 			neccessary_actions?: any;
// // 			personal_info?: any;
// // 			verification?: any;
// // 			company_verification?: any;
// // 			individual_verification?: any;
// // 			stripe_metadata?: any;
// // 			stripeBalance?: any;
// // 			external_accounts?: any;
// // 			permissions?: { admin: [any] };
// // 		} & DefaultSession["user"];
// // 		expires: string;
// // 	}
// // }

// // export const refreshToken = async function (
// // 	refreshToken: string
// // ): Promise<[string | null, string | null]> {
// // 	try {
// // 		const response = await axios.post(
// // 			makeUrl(
// // 				process.env.BACKEND_API_BASE as string,
// // 				"api",
// // 				"auth",
// // 				"token",
// // 				"refresh"
// // 			),
// // 			{ refresh: refreshToken }
// // 		);
// // 		const { access, refresh } = response.data;
// // 		return [access, refresh];
// // 	} catch {
// // 		return [null, null];
// // 	}
// // };

// // const authOptions: AuthOptions = {
// // 	secret: process.env.NEXTAUTH_SECRET,
// // 	session: {
// // 		strategy: "jwt",
// // 		maxAge: THIRTY_DAYS,
// // 		updateAge: THIRTY_MINUTES,
// // 	},
// // 	adapter: adapterInstance,
// // 	providers: [
// // 		CredentialsProvider({
// // 			name: "Credentials",
// // 			credentials: {
// // 				email: { label: "email", type: "email", placeholder: "email" },
// // 				password: {
// // 					label: "Password",
// // 					type: "password",
// // 					placeholder: "password",
// // 				},
// // 			},
// // 			async authorize(credentials) {
// // 				if (!credentials?.email || !credentials?.password) {
// // 					throw new Error("Email and password are required.");
// // 				}

// // 				const AuthenticationQuery = query(
// // 					collection(db, "users"),
// // 					where("email", "==", credentials.email)
// // 				);

// // 				const authSnapshot = await getDocs(AuthenticationQuery);
// // 				const userCollection: Record<string, any> = {};
// // 				authSnapshot.forEach((doc) => {
// // 					const a = doc.data();
// // 					a["_id"] = doc.id;
// // 					userCollection[doc.id] = a;
// // 				});

// // 				const user = Object.values(userCollection)[0] as any;

// // 				if (!user || !user.password) {
// // 					throw new Error("User not found or invalid credentials.");
// // 				}

// // 				const isValid = await verifyPassword(
// // 					credentials.password,
// // 					user.password
// // 				);
// // 				if (!isValid) {
// // 					throw new Error("Could not log you in!");
// // 				}

// // 				return {
// // 					id: user.modifyUuid,
// // 					name: `${user.firstname} ${user.lastname}`,
// // 					email: user.email,
// // 				};
// // 			},
// // 		}),
// // 		EmailProvider({
// // 			server: {
// // 				host: process.env.SMTP_HOST,
// // 				port: Number(process.env.SMTP_PORT),
// // 				auth: {
// // 					user: process.env.SMTP_USER,
// // 					pass: process.env.SMTP_PASSWORD,
// // 				},
// // 			},
// // 			from: process.env.SMTP_FROM,
// // 			async sendVerificationRequest({
// // 				identifier: email,
// // 				url,
// // 				provider: { server, from },
// // 			}) {
// // 				const { host } = new URL(url);
// // 				const transport = nodemailer.createTransport(server);
// // 				await transport.sendMail({
// // 					to: email,
// // 					from,
// // 					subject: `Sign in to ${host}`,
// // 					text: text({ url, host }),
// // 					html: html({ url, host, email }),
// // 				});
// // 			},
// // 		}),
// // 		FacebookProvider({
// // 			clientId: process.env.FACEBOOK_CLIENT_ID as string,
// // 			clientSecret: process.env.FACEBOOK_CLIENT_SECRET as string,
// // 		}),
// // 		GoogleProvider({
// // 			clientId: process.env.GOOGLE_AUTH_CLIENT_ID as string,
// // 			clientSecret: process.env.GOOGLE_AUTH_CLIENT_SECRET as string,
// // 		}),
// // 	],
// // 	callbacks: {
// // 		async signIn(params: {
// // 			user: User | AdapterUser;
// // 			account: Account | null;
// // 			profile?: Profile;
// // 			email?: { verificationRequest?: boolean };
// // 			credentials?: Record<string, CredentialInput>;
// // 		}): Promise<string | boolean> {
// // 			if (!params) return false;

// // 			const { account, profile, credentials } = params;
// // 			if (credentials) return true;

// // 			if (account && profile) {
// // 				const { email } = profile;
// // 				if (!email) return false;

// // 				const accountProfile = profile as {
// // 					email_verified: boolean;
// // 					email?: string;
// // 				};
// // 				const emailTest =
// // 					/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
// // 				const verifiedEmail =
// // 					accountProfile.email_verified && emailTest;

// // 				switch (account.provider) {
// // 					case "google":
// // 					case "microsoft":
// // 					case "facebook":
// // 					case "amazon":
// // 					case "discord":
// // 					case "reddit":
// // 					case "slack":
// // 					case "tiktok":
// // 					case "snapchat":
// // 						return verifiedEmail;
// // 					default:
// // 						return false;
// // 				}
// // 			}
// // 			return false;
// // 		},

// // 		async jwt({
// // 			token,
// // 			user,
// // 			account,
// // 		}: {
// // 			token: JWT;
// // 			user?: User;
// // 			account?: Account | null;
// // 			profile?: Profile;
// // 			isNewUser?: boolean;
// // 		}): Promise<ExtendedJWT> {
// // 			if (account) {
// // 				token.accessToken = account.access_token;
// // 			}

// // 			if (account && user) {
// // 				token.accessToken = account.access_token;
// // 				token.user = user;

// // 				if (account?.provider === "google") {
// // 					try {
// // 						const backendResponse = await axios.post(
// // 							`${process.env.BACKEND_API_BASE}/api/social/login/google/`,
// // 							{
// // 								access_token: account.access_token,
// // 								id_token: account.id_token,
// // 							}
// // 						);

// // 						console.log("BACKEND_RESPONSE: \n", backendResponse);

// // 						token = {
// // 							...token,
// // 							accessToken: account.access_token,
// // 							refreshToken: backendResponse.data,
// // 						};

// // 						console.log("TOKEN: ", token);

// // 						// const headers = {
// // 						// 	Authorization: `Bearer ${token.accessToken}`,
// // 						// 	"Content-Type": "application/json",
// // 						// };

// // 						// const response = await fetch(
// // 						// 	"http://127.0.0.1:8001/api/posts/",
// // 						// 	{
// // 						// 		method: "GET",
// // 						// 		headers,
// // 						// 		credentials: "include",
// // 						// 	}
// // 						// );

// // 						// console.log(response.clone());

// // 						return token as ExtendedJWT;
// // 					} catch (error) {
// // 						return token as ExtendedJWT;
// // 					}
// // 				}
// // 			}

// // 			if (
// // 				token.accessToken &&
// // 				typeof token.accessToken === "string" &&
// // 				(await isJwtExpired(token.accessToken))
// // 			) {
// // 				const [newAccessToken, newRefreshToken] = await refreshToken(
// // 					token.refreshToken as string
// // 				);

// // 				if (newAccessToken && newRefreshToken) {
// // 					token = {
// // 						...token,
// // 						accessToken: newAccessToken,
// // 						refreshToken: newRefreshToken,
// // 						iat: Math.floor(Date.now() / 1000),
// // 						exp: Math.floor(Date.now() / 1000 + 2 * 60 * 60),
// // 					};
// // 					return token as ExtendedJWT;
// // 				}
// // 				return { ...token, exp: 0 } as ExtendedJWT;
// // 			}

// // 			const authTokenQuery = query(
// // 				collection(db, "users"),
// // 				where("email", "==", token.email)
// // 			);

// // 			const authTokenSnapshot = await getDocs(authTokenQuery);
// // 			const userCollection: Record<string, unknown> = {};
// // 			authTokenSnapshot.forEach((doc) => {
// // 				const a = doc.data();
// // 				a["_id"] = doc.id;
// // 				userCollection[doc.id] = a;
// // 			});

// // 			const userToken: any = Object.values(userCollection)[0];

// // 			if (userToken) {
// // 				token = {
// // 					...token,
// // 					role: userToken.role,
// // 					stripeId: userToken.stripeId,
// // 					customerId: userToken.customerId,
// // 					username: userToken.username,
// // 					firstname: userToken.firstname,
// // 					lastname: userToken.lastname,
// // 					modifyId: userToken.modifyUuid,
// // 					firestoreId: userToken._id,
// // 					registeredInfo: userToken.registeredInfo,
// // 					shipping: userToken.shipping,
// // 					neccessary_actions: userToken.neccessary_actions,
// // 					personal_info: userToken.personal_info,
// // 					verification: userToken.verification,
// // 					external_accounts: userToken.external_accounts,
// // 					company_verification: userToken.company_verification,
// // 					individual_verification: userToken.individual_verification,
// // 					stripe_metadata: userToken.stripe_metadata,
// // 					stripeBalance: userToken.stripeBalance,
// // 				};
// // 			}
// // 			return token as ExtendedJWT;
// // 		},

// // 		async session({
// // 			session,
// // 			token,
// // 		}: {
// // 			session: Session;
// // 			token: JWT;
// // 		}): Promise<Session> {
// // 			const extendedToken = token as ExtendedJWT;

// // 			session.user = {
// // 				...session.user,
// // 				role: extendedToken.role,
// // 				stripeId: extendedToken.stripeId,
// // 				customerId: extendedToken.customerId,
// // 				username: extendedToken.username,
// // 				firstname: extendedToken.firstname,
// // 				lastname: extendedToken.lastname,
// // 				modifyId: extendedToken.modifyId,
// // 				firestoreId: extendedToken.firestoreId,
// // 				registeredInfo: extendedToken.registeredInfo,
// // 				shipping: extendedToken.shipping,
// // 				neccessary_actions: extendedToken.neccessary_actions,
// // 				personal_info: extendedToken.personal_info,
// // 				verification: extendedToken.verification,
// // 				external_accounts: extendedToken.external_accounts,
// // 				company_verification: extendedToken.company_verification,
// // 				individual_verification: extendedToken.individual_verification,
// // 				stripe_metadata: extendedToken.stripe_metadata,
// // 				stripeBalance: extendedToken.stripeBalance,
// // 				...extendedToken,
// // 			};

// // 			const grants = ac.getGrants();
// // 			if (extendedToken.role) {
// // 				session.user.permissions =
// // 					extendedToken.role in grants
// // 						? { admin: [grants[extendedToken.role]] }
// // 						: { admin: [{}] };
// // 			}

// // 			return session;
// // 		},

// // 		async redirect({ url }) {
// // 			const customBaseUrl = process.env.MODIFY_URL as string;
// // 			const customApiUrl = process.env.MODIFY_API as string;

// // 			if (url.startsWith(customBaseUrl) || url.startsWith(customApiUrl)) {
// // 				return url;
// // 			}

// // 			if (url.startsWith("/modify")) {
// // 				return `${customBaseUrl}${url.slice("/modify".length)}`;
// // 			} else if (url.startsWith("/api/modify")) {
// // 				return `${customApiUrl}${url.slice("/api/modify".length)}`;
// // 			}

// // 			return customBaseUrl;
// // 		},
// // 	},
// // 	events: {},
// // };

// // const getSession = () => getServerSession(authOptions);

// // export { authOptions, getSession };

// import {
// 	AuthOptions,
// 	Session,
// 	User,
// 	Account,
// 	Profile,
// 	DefaultSession,
// } from "next-auth";
// import { JWT } from "next-auth/jwt";
// import CredentialsProvider, {
// 	CredentialInput,
// } from "next-auth/providers/credentials";
// import FacebookProvider from "next-auth/providers/facebook";
// import GoogleProvider from "next-auth/providers/google";
// import EmailProvider from "next-auth/providers/email";
// import nodemailer from "nodemailer";
// import { html, text } from "@/lib/modify/createEmail";
// import { collection, query, getDocs, where } from "firebase/firestore";
// import { adapterInstance } from "@/config/firebase/firestore";
// import { db } from "@/config/firebase/storage";
// import { verifyPassword } from "@/lib/modify/authentication/password";
// import ac from "@/lib/modify/authentication/accessControl";
// import { getServerSession } from "next-auth";
// import axios from "axios";
// import { isJwtExpired, makeUrl } from "@/lib/modify/authentication/jwtUtils";
// import { AdapterUser } from "next-auth/adapters";

// const THIRTY_DAYS = 30 * 24 * 60 * 60;
// const THIRTY_MINUTES = 30 * 60;

// interface ExtendedJWT extends JWT {
// 	role?: string;
// 	stripeId?: string;
// 	customerId?: string;
// 	username?: string;
// 	firstname?: string;
// 	lastname?: string;
// 	modifyId?: string;
// 	firestoreId?: string;
// 	registeredInfo?: {
// 		userCountryCode: string;
// 		userCurrency: string;
// 		userFlag: string;
// 	};
// 	shipping?: {
// 		address?: {
// 			line1?: string;
// 			line2?: string;
// 			city?: string;
// 			postal_code?: string;
// 			state?: string;
// 		};
// 		name?: string;
// 		phone?: string;
// 	};
// 	neccessary_actions?: any;
// 	personal_info?: any;
// 	verification?: any;
// 	company_verification?: any;
// 	individual_verification?: any;
// 	stripe_metadata?: any;
// 	stripeBalance?: any;
// 	external_accounts?: any;
// 	accessToken?: string;
// 	// refreshToken?: string;
// 	refreshToken?: {
// 		id_token?: string;
// 		key?: string;
// 	};
// 	user?: User; // So we can store user object from OAuth if needed
// }

// declare module "next-auth" {
// 	interface Session {
// 		user: {
// 			refreshToken?: {
// 				// id_token?: string;
// 				access?: string;
// 				refresh?: string;
// 				key?: string;
// 			};
// 			accessToken?: string;
// 			role?: string;
// 			stripeId?: string;
// 			customerId?: string;
// 			username?: string;
// 			firstname?: string;
// 			lastname?: string;
// 			modifyId?: string;
// 			firestoreId?: string;
// 			registeredInfo?: {
// 				userCountryCode: string;
// 				userCurrency: string;
// 				userFlag: string;
// 			};
// 			shipping?: {
// 				address?: {
// 					line1?: string;
// 					line2?: string;
// 					city?: string;
// 					postal_code?: string;
// 					state?: string;
// 				};
// 				name?: string;
// 				phone?: string;
// 			};
// 			neccessary_actions?: any;
// 			personal_info?: any;
// 			verification?: any;
// 			company_verification?: any;
// 			individual_verification?: any;
// 			stripe_metadata?: any;
// 			stripeBalance?: any;
// 			external_accounts?: any;
// 			permissions?: { admin: [any] };
// 		} & DefaultSession["user"];
// 		expires: string;
// 	}
// }

// export const refreshToken = async function (
// 	refreshToken: string
// ): Promise<[string | null, string | null]> {
// 	console.log("=== refreshToken Function Called ===");
// 	console.log("RefreshToken provided:", refreshToken);

// 	try {
// 		const response = await axios.post(
// 			makeUrl(
// 				process.env.BACKEND_API_BASE as string,
// 				"api",
// 				"auth",
// 				"token",
// 				"refresh"
// 			),
// 			{ refresh: refreshToken }
// 		);
// 		const { access, refresh } = response.data;
// 		console.log("Refreshed tokens received from backend:", {
// 			access,
// 			refresh,
// 		});
// 		return [access, refresh];
// 	} catch (error) {
// 		console.error("Error while refreshing token:", error);
// 		return [null, null];
// 	}
// };

// const authOptions: AuthOptions = {
// 	secret: process.env.NEXTAUTH_SECRET,
// 	session: {
// 		strategy: "jwt",
// 		maxAge: THIRTY_DAYS,
// 		updateAge: THIRTY_MINUTES,
// 	},
// 	adapter: adapterInstance,
// 	providers: [
// 		CredentialsProvider({
// 			name: "Credentials",
// 			credentials: {
// 				email: { label: "email", type: "email", placeholder: "email" },
// 				password: {
// 					label: "Password",
// 					type: "password",
// 					placeholder: "password",
// 				},
// 			},
// 			async authorize(credentials) {
// 				console.log("=== CredentialsProvider.authorize Called ===");
// 				console.log("Credentials supplied:", credentials);

// 				if (!credentials?.email || !credentials?.password) {
// 					console.error("Missing email or password.");
// 					throw new Error("Email and password are required.");
// 				}

// 				const AuthenticationQuery = query(
// 					collection(db, "users"),
// 					where("email", "==", credentials.email)
// 				);

// 				const authSnapshot = await getDocs(AuthenticationQuery);
// 				const userCollection: Record<string, any> = {};
// 				authSnapshot.forEach((doc) => {
// 					const a = doc.data();
// 					a["_id"] = doc.id;
// 					userCollection[doc.id] = a;
// 				});

// 				const user = Object.values(userCollection)[0] as any;

// 				console.log("User found in DB (CredentialsProvider):", user);

// 				if (!user || !user.password) {
// 					console.error(
// 						"User not found or user has no password in DB."
// 					);
// 					throw new Error("User not found or invalid credentials.");
// 				}

// 				const isValid = await verifyPassword(
// 					credentials.password,
// 					user.password
// 				);

// 				if (!isValid) {
// 					console.error("Password verification failed.");
// 					throw new Error("Could not log you in!");
// 				}

// 				console.log("=== Credentials Verification Successful ===");
// 				return {
// 					id: user.modifyUuid,
// 					name: `${user.firstname} ${user.lastname}`,
// 					email: user.email,
// 				};
// 			},
// 		}),
// 		EmailProvider({
// 			server: {
// 				host: process.env.SMTP_HOST,
// 				port: Number(process.env.SMTP_PORT),
// 				auth: {
// 					user: process.env.SMTP_USER,
// 					pass: process.env.SMTP_PASSWORD,
// 				},
// 			},
// 			from: process.env.SMTP_FROM,
// 			async sendVerificationRequest({
// 				identifier: email,
// 				url,
// 				provider: { server, from },
// 			}) {
// 				console.log(
// 					"=== EmailProvider.sendVerificationRequest Called ==="
// 				);
// 				console.log("Verification email:", email);
// 				console.log("Verification URL:", url);

// 				const { host } = new URL(url);
// 				const transport = nodemailer.createTransport(server);
// 				await transport.sendMail({
// 					to: email,
// 					from,
// 					subject: `Sign in to ${host}`,
// 					text: text({ url, host }),
// 					html: html({ url, host, email }),
// 				});
// 			},
// 		}),
// 		FacebookProvider({
// 			clientId: process.env.FACEBOOK_CLIENT_ID as string,
// 			clientSecret: process.env.FACEBOOK_CLIENT_SECRET as string,
// 		}),
// 		GoogleProvider({
// 			clientId: process.env.GOOGLE_AUTH_CLIENT_ID as string,
// 			clientSecret: process.env.GOOGLE_AUTH_CLIENT_SECRET as string,
// 			authorization: {
// 				params: {
// 					access_type: "offline",
// 					prompt: "consent",
// 				},
// 			},
// 		}),
// 	],
// 	callbacks: {
// 		// -----------------------------------------------------------
// 		// signIn: Determine if sign-in should be allowed
// 		// -----------------------------------------------------------
// 		async signIn(params: {
// 			user: User | AdapterUser;
// 			account: Account | null;
// 			profile?: Profile;
// 			email?: { verificationRequest?: boolean };
// 			credentials?: Record<string, CredentialInput>;
// 			isNewUser?: boolean; // <-- This indicates if the user is new
// 		}): Promise<string | boolean> {
// 			console.log("=== signIn Callback Called ===");
// 			console.log("signIn params:", JSON.stringify(params, null, 2));

// 			// If there's no params at all, block sign-in
// 			if (!params) return false;

// 			const { account, profile, credentials, isNewUser } = params;

// 			// Log if user is new (per NextAuth docs)
// 			if (isNewUser) {
// 				console.log(
// 					">>> A NEW USER JUST LOGGED IN FOR THE FIRST TIME! <<<"
// 				);
// 			}

// 			// If it's a credentials-based sign-in
// 			if (credentials) {
// 				console.log(
// 					"Sign in with CredentialsProvider - returning true."
// 				);
// 				return true;
// 			}

// 			// If it's an OAuth-based sign-in
// 			if (account && profile) {
// 				const { email } = profile;
// 				if (!email) {
// 					console.error(
// 						"No email found in OAuth profile, sign-in denied."
// 					);
// 					return false;
// 				}

// 				const accountProfile = profile as {
// 					email_verified: boolean;
// 					email?: string;
// 				};

// 				// Rudimentary email checks
// 				const emailTest =
// 					/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
// 				const verifiedEmail =
// 					accountProfile.email_verified && emailTest;

// 				console.log(`OAuth provider: ${account.provider}`);
// 				console.log("Email is verified:", verifiedEmail);

// 				// Decide which providers you want to allow
// 				switch (account.provider) {
// 					case "google":
// 					case "microsoft":
// 					case "facebook":
// 					case "amazon":
// 					case "discord":
// 					case "reddit":
// 					case "slack":
// 					case "tiktok":
// 					case "snapchat":
// 						return verifiedEmail;
// 					default:
// 						return false;
// 				}
// 			}
// 			return false;
// 		},

// 		// -----------------------------------------------------------
// 		// jwt: Customize / populate JWT on sign-in and subsequent refresh
// 		// -----------------------------------------------------------
// 		async jwt({
// 			token,
// 			user,
// 			account,
// 			profile,
// 			isNewUser,
// 		}: {
// 			token: JWT;
// 			user?: User;
// 			account?: Account | null;
// 			profile?: Profile;
// 			isNewUser?: boolean;
// 		}): Promise<ExtendedJWT> {
// 			console.log("=== jwt Callback Called ===");
// 			console.log("Current JWT token:", JSON.stringify(token, null, 2));
// 			console.log("Incoming user (if any):", user);
// 			console.log("Incoming account (if any):", account);
// 			console.log("isNewUser:", isNewUser);

// 			// OAuth login case
// 			if (account && user) {
// 				console.log("OAuth-based login detected.");
// 				token.accessToken = account.access_token;
// 				token.user = user;

// 				// Example: If user logs in with Google, we might want to exchange tokens with the backend
// 				if (account?.provider === "google") {
// 					// const { accessToken, idToken } = account;
// 					try {
// 						console.log(
// 							"Attempting to send tokens to BACKEND for Google login."
// 						);

// 						const headers = {
// 							email: user.email,
// 							access_token: account.access_token,
// 							id_token: account.id_token,
// 						};

// 						console.log("Sending headers: ", headers);

// 						const backendResponse = await axios.post(
// 							`${process.env.BACKEND_API_BASE}/api/social/login/google/`,
// 							headers
// 							// {
// 							// 	access_token: accessToken,
// 							// 	id_token: idToken,
// 							// }
// 						);

// 						// console.log("BACKEND_RESPONSE:", backendResponse.data);
// 						// console.dir("BACKEND_RESPONSE:", backendResponse);
// 						console.dir(backendResponse);

// 						const { access_token, refresh_token } =
// 							backendResponse.data;

// 						token = {
// 							...token,
// 							accessToken: account.access_token,
// 							refreshToken: backendResponse.data, // adapt accordingly if your backend returns { access, refresh } or something else
// 							// key: backendResponse.
// 							// id_token: backendResponse.id_token
// 						};

// 						console.log("THE TOKEN: ", token);

// 						// token = {
// 						// 	...token,
// 						// 	accessToken: access_token,
// 						// 	refreshToken: refresh_token, // adapt accordingly if your backend returns { access, refresh } or something else
// 						// 	// id_token: backendResponse.id_token
// 						// };

// 						console.log(
// 							"Updated JWT token after Google login:",
// 							token
// 						);
// 						return token as ExtendedJWT;
// 					} catch (error) {
// 						console.error(
// 							"Error during Google social login:",
// 							error
// 						);
// 						return token as ExtendedJWT;
// 					}
// 				}
// 			}

// 			// If token exists and might be expired
// 			if (
// 				token.accessToken &&
// 				typeof token.accessToken === "string" &&
// 				(await isJwtExpired(token.accessToken))
// 			) {
// 				console.log("JWT access token expired, attempting refresh.");
// 				const [newAccessToken, newRefreshToken] = await refreshToken(
// 					token.refreshToken as string
// 				);

// 				if (newAccessToken && newRefreshToken) {
// 					token = {
// 						...token,
// 						accessToken: newAccessToken,
// 						refreshToken: newRefreshToken,
// 						iat: Math.floor(Date.now() / 1000),
// 						exp: Math.floor(Date.now() / 1000 + 2 * 60 * 60),
// 					};
// 					console.log("Access token successfully refreshed:", token);
// 					return token as ExtendedJWT;
// 				}

// 				// If token refresh fails
// 				console.error("Token refresh failed; setting exp = 0.");
// 				return { ...token, exp: 0 } as ExtendedJWT;
// 			}

// 			// If user just logged in or user is present, fetch additional data from Firestore
// 			// or do so even if no user object (depending on your logic)
// 			console.log("Fetching user data from Firestore to populate token.");
// 			const authTokenQuery = query(
// 				collection(db, "users"),
// 				where("email", "==", token.email)
// 			);

// 			const authTokenSnapshot = await getDocs(authTokenQuery);
// 			const userCollection: Record<string, unknown> = {};
// 			authTokenSnapshot.forEach((doc) => {
// 				const a = doc.data();
// 				a["_id"] = doc.id;
// 				userCollection[doc.id] = a;
// 			});

// 			const userToken: any = Object.values(userCollection)[0];
// 			console.log("User document found (Firestore):", userToken);

// 			if (userToken) {
// 				token = {
// 					...token,
// 					role: userToken.role,
// 					stripeId: userToken.stripeId,
// 					customerId: userToken.customerId,
// 					username: userToken.username,
// 					firstname: userToken.firstname,
// 					lastname: userToken.lastname,
// 					modifyId: userToken.modifyUuid,
// 					firestoreId: userToken._id,
// 					registeredInfo: userToken.registeredInfo,
// 					shipping: userToken.shipping,
// 					neccessary_actions: userToken.neccessary_actions,
// 					personal_info: userToken.personal_info,
// 					verification: userToken.verification,
// 					external_accounts: userToken.external_accounts,
// 					company_verification: userToken.company_verification,
// 					individual_verification: userToken.individual_verification,
// 					stripe_metadata: userToken.stripe_metadata,
// 					stripeBalance: userToken.stripeBalance,
// 				};
// 			}

// 			console.log("Final JWT token returned from callback:", token);
// 			return token as ExtendedJWT;
// 		},

// 		// -----------------------------------------------------------
// 		// session: Add data from JWT to Session object
// 		// -----------------------------------------------------------
// 		async session({
// 			session,
// 			token,
// 		}: {
// 			session: Session;
// 			token: JWT;
// 		}): Promise<Session> {
// 			console.log("=== session Callback Called ===");
// 			console.log("Incoming session:", JSON.stringify(session, null, 2));
// 			console.log("Incoming token:", JSON.stringify(token, null, 2));

// 			const extendedToken = token as ExtendedJWT;
// 			session.user = {
// 				...session.user,
// 				role: extendedToken.role,
// 				stripeId: extendedToken.stripeId,
// 				customerId: extendedToken.customerId,
// 				username: extendedToken.username,
// 				firstname: extendedToken.firstname,
// 				lastname: extendedToken.lastname,
// 				modifyId: extendedToken.modifyId,
// 				firestoreId: extendedToken.firestoreId,
// 				registeredInfo: extendedToken.registeredInfo,
// 				shipping: extendedToken.shipping,
// 				neccessary_actions: extendedToken.neccessary_actions,
// 				personal_info: extendedToken.personal_info,
// 				verification: extendedToken.verification,
// 				external_accounts: extendedToken.external_accounts,
// 				company_verification: extendedToken.company_verification,
// 				individual_verification: extendedToken.individual_verification,
// 				stripe_metadata: extendedToken.stripe_metadata,
// 				stripeBalance: extendedToken.stripeBalance,
// 				...extendedToken, // includes accessToken, refreshToken, user, etc.
// 			};

// 			// Access Control grants
// 			const grants = ac.getGrants();
// 			if (extendedToken.role) {
// 				session.user.permissions =
// 					extendedToken.role in grants
// 						? { admin: [grants[extendedToken.role]] }
// 						: { admin: [{}] };
// 			}

// 			console.log(
// 				"Updated session object:",
// 				JSON.stringify(session, null, 2)
// 			);
// 			return session;
// 		},

// 		// -----------------------------------------------------------
// 		// redirect: Control the URL to which the user is redirected
// 		// -----------------------------------------------------------
// 		async redirect({ url }) {
// 			console.log("=== redirect Callback Called ===");
// 			console.log("Incoming redirect URL:", url);

// 			const customBaseUrl = process.env.MODIFY_URL as string;
// 			const customApiUrl = process.env.MODIFY_API as string;

// 			// If the incoming URL is already part of our custom routes, return it as-is
// 			if (url.startsWith(customBaseUrl) || url.startsWith(customApiUrl)) {
// 				console.log(
// 					"URL is within custom base/API URL, returning as-is."
// 				);
// 				return url;
// 			}

// 			// Handle relative paths (/modify, /api/modify, etc.)
// 			if (url.startsWith("/modify")) {
// 				const newUrl = `${customBaseUrl}${url.slice("/modify".length)}`;
// 				console.log("Rewritten /modify URL:", newUrl);
// 				return newUrl;
// 			} else if (url.startsWith("/api/modify")) {
// 				const newUrl = `${customApiUrl}${url.slice("/api/modify".length)}`;
// 				console.log("Rewritten /api/modify URL:", newUrl);
// 				return newUrl;
// 			}

// 			console.log(
// 				"No match; defaulting to customBaseUrl:",
// 				customBaseUrl
// 			);
// 			return customBaseUrl;
// 		},
// 	},
// 	// -----------------------------------------------------------
// 	// events: Monitor user events (e.g., account creation, sign-in)
// 	// -----------------------------------------------------------
// 	events: {
// 		async createUser(message) {
// 			console.log("=== events.createUser Called ===");
// 			console.log("A new user was created in the DB:", message.user);
// 		},
// 		async signIn(message) {
// 			console.log("=== events.signIn Called ===");
// 			console.log("User just signed in:", message.user);
// 			console.log("Account details:", message.account);
// 		},
// 		async signOut(message) {
// 			console.log("=== events.signOut Called ===");
// 			console.log("User just signed out:", message.session);
// 		},
// 		async updateUser(message) {
// 			console.log("=== events.updateUser Called ===");
// 			console.log("User was updated in the DB:", message.user);
// 		},
// 		async linkAccount(message) {
// 			console.log("=== events.linkAccount Called ===");
// 			console.log("Provider account linked to a user:", message.account);
// 		},
// 		async session(message) {
// 			console.log("=== events.session Called ===");
// 			console.dir("Session is active:", message.session);
// 		},
// 		//   async error(message) {
// 		//     console.log("=== events.error Called ===");
// 		//     console.error("NextAuth error:", message.error);
// 		//   },
// 	},
// };

// const getSession = () => getServerSession(authOptions);

// export { authOptions, getSession };

export {};