// import NextAuth from "next-auth";
// import { type NextAuthOptions } from "next-auth";
// import CredentialsProvider from "next-auth/providers/credentials";
// import FacebookProvider from "next-auth/providers/facebook";
// import EmailProvider from "next-auth/providers/email";
// import nodemailer from "nodemailer";
// import { html, text } from "@/lib/modify/createEmail";
// import { collection, query, getDocs, where } from "firebase/firestore";
// import { NextRequest, NextResponse } from "next/server";
// import { adapterInstance } from "@/config/firebase/firestore";
// import { db } from "@/config/firebase/storage";
// import { verifyPassword } from "@/lib/modify/authentication/password";
// import ac from "@/lib/modify/authentication/accessControl";
// const THIRTY_DAYS = 30 * 24 * 60 * 60;
// const THIRTY_MINUTES = 30 * 60;

// export const authOptions: NextAuthOptions = {
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
// 					placeholder: "email",
// 				},
// 			},
// 			async authorize(credentials) {
// 				if (!credentials?.email || !credentials?.password) {
// 					throw new Error("Email and password are required.");
// 				}

// 				const AuthenticationQuery = query(
// 					collection(db, "users"),
// 					where("email", "==", credentials.email)
// 				);

// 				const authSnapshot = await getDocs(AuthenticationQuery);
// 				const userCollection: any = {};
// 				authSnapshot.forEach((doc) => {
// 					const a = doc.data();
// 					a["_id"] = doc.id;
// 					userCollection[doc.id] = a;
// 				});

// 				const user = Object.values(userCollection)[0] as any;

// 				if (!user || !user.password) {
// 					throw new Error("User not found or invalid credentials.");
// 				}

// 				const isValid = await verifyPassword(
// 					credentials.password,
// 					user.password
// 				);
// 				if (!isValid) {
// 					throw new Error("Could not log you in!");
// 				}

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
// 	],
// 	callbacks: {
// 		async signIn() {
// 			const isAllowedToSignIn = true;
// 			if (isAllowedToSignIn) {
// 				return true;
// 			} else {
// 				return false;
// 			}
// 		},
// 		async jwt({ token }) {
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

// 			if (userToken) {
// 				token.name = userToken.name;
// 				token.id = userToken._id;
// 				token.firestoreId = userToken._id;
// 				token.role = userToken.role;
// 				token.stripeId = userToken.stripeId;
// 				token.customerId = userToken.customerId;
// 				token.images = userToken.images;
// 				token.modifyId = userToken.modifyUuid;
// 				token.printful = userToken.printful;
// 				token.registeredInfo = userToken.registeredInfo;
// 				token.firstname = userToken.firstname;
// 				token.lastname = userToken.lastname;
// 				token.username = userToken.username;
// 				token.shipping = userToken.shipping;
// 				token.neccessary_actions = userToken.neccessary_actions;
// 				token.personal_info = userToken.personal_info;
// 				token.verification = userToken.verification;
// 				token.external_accounts = userToken.external_accounts;
// 				token.company_verification = userToken.company_verification;
// 				token.individual_verification =
// 					userToken.individual_verification;
// 				token.stripe_metadata = userToken.stripe_metadata;
// 				token.stripeBalance = userToken.stripeBalance;
// 			}
// 			return token;
// 		},
// 		async session({ session, token }: { session: any; token: any }) {
// 			if (token) session.id = token.id;
// 			session.user.role = token.role;
// 			session.user.stripeId = token.stripeId;
// 			session.user.customerId = token.customerId;
// 			session.user.images = token.images;
// 			session.user.modifyId = token.modifyId;
// 			session.user.firestoreId = token.firestoreId;
// 			session.user.printful = token.printful;
// 			session.user.registeredInfo = token.registeredInfo;
// 			session.user.firstname = token.firstname;
// 			session.user.lastname = token.lastname;
// 			session.user.username = token.username;
// 			session.user.shipping = token.shipping;
// 			session.user.neccessary_actions = token.neccessary_actions;
// 			session.user.personal_info = token.personal_info;
// 			session.user.verification = token.verification;
// 			session.user.external_accounts = token.external_accounts;
// 			session.user.company_verification = token.company_verification;
// 			session.user.individual_verification =
// 				token.individual_verification;
// 			session.user.stripe_metadata = token.stripe_metadata;
// 			session.user.stripeBalance = token.stripeBalance;

// 			const grants = ac.getGrants();
// 			session.user.permissions =
// 				token.role in grants
// 					? { [token.role]: grants[token.role] }
// 					: {};
// 			return session;
// 		},
// 		async redirect({ url, baseUrl }) {
// 			const customBaseUrl = `${process.env.MODIFY_URL}`;
// 			const customApiUrl = `${process.env.MODIFY_API}`;

// 			console.log("DEFINED URL >>>>", url, "BASE URL >>>>", baseUrl);

// 			// Handle URLs that should be prefixed with the custom base URL
// 			if (url.startsWith(customBaseUrl) || url.startsWith(customApiUrl)) {
// 				return url;
// 			}

// 			// Ensure all internal URLs are prefixed correctly
// 			if (url.startsWith("/modify")) {
// 				return `${customBaseUrl}${url.slice("/modify".length)}`;
// 			} else if (url.startsWith("/api/modify")) {
// 				return `${customApiUrl}${url.slice("/api/modify".length)}`;
// 			}

// 			// Default to the custom base URL if no match is found
// 			return customBaseUrl;
// 		},
// 	},
// 	events: {},
// 	// pages: {
// 	// 	signIn: "/api/modify/auth/login",
// 	// 	signOut: "/api/modify/auth/logout",
// 	// 	error: "/api/modify/auth/error", // Error code passed in query string as ?error=
// 	// 	// verifyRequest: '/api/modify/auth/verify-request', // (used for check email message)
// 	// 	newUser: "/api/modify/auth/register", // New users will be directed here on first sign in (leave undefined to disable)
// 	// 	session: '/api/modify/auth/session', // To customize the session endpoint
// 	// },
// };

// // export default async function handler(
// //     req: NextRequest,
// //     res: NextResponse
// // ) {
// //     return NextAuth(req, res, authOptions);
// // }

// // const nextAuthResult = NextAuth(authOptions);
// // export const { handlers, auth, signIn, signOut } = nextAuthResult as ReturnType<
// // 	typeof NextAuth
// // >;

// const handler = NextAuth(authOptions);

// // export const GET = handler;
// // export const POST = handler;

// export { handler as GET, handler as POST };

// import { authOptions } from "@/auth"
import NextAuth from "next-auth";
import { authOptions } from "../route";

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
