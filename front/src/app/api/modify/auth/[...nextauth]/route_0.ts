// // pages/api/auth/[...nextauth].ts

// import {
// 	AuthOptions,
// 	Session,
// 	User as NextAuthUser,
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
// import axios from "axios";
// import { isJwtExpired, makeUrl } from "@/lib/modify/authentication/jwtUtils";
// import { verifyPassword } from "@/lib/modify/authentication/password";
// import ac from "@/lib/modify/authentication/accessControl";
// import { getServerSession } from "next-auth";

// import { PrismaAdapter } from "@auth/prisma-adapter";
// import { prisma } from "@/lib/client/prisma";

// import { AdapterUser } from "next-auth/adapters";

// interface User extends NextAuthUser {
// 	firstname?: string;
// 	lastname?: string;
// 	role?: string;
// 	stripeId?: string;
// 	customerId?: string;
// 	username?: string;
// 	modifyId?: string;
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
// }

// // Refresh Token Helper
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

// // Extend JWT
// interface ExtendedJWT extends JWT {
// 	role?: string;
// 	stripeId?: string;
// 	customerId?: string;
// 	username?: string;
// 	firstname?: string;
// 	lastname?: string;
// 	modifyId?: string;
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
// 	refreshToken?: {
// 		access?: string;
// 		refresh?: string;
// 		key?: string;
// 	};
// 	user?: NextAuthUser; // So we can store user object from OAuth if needed
// }

// const THIRTY_DAYS = 30 * 24 * 60 * 60;
// const THIRTY_MINUTES = 30 * 60;

// // The main NextAuth config
// const authOptions: AuthOptions = {
// 	secret: process.env.NEXTAUTH_SECRET,
// 	session: {
// 		strategy: "jwt",
// 		maxAge: THIRTY_DAYS,
// 		updateAge: THIRTY_MINUTES,
// 	},
// 	// Prisma Adapter
// 	adapter: PrismaAdapter(prisma),

// 	// Providers
// 	providers: [
// 		CredentialsProvider({
// 			name: "Credentials",
// 			credentials: {
// 				email: {
// 					label: "Email",
// 					type: "email",
// 					placeholder: "email@example.com",
// 				},
// 				password: {
// 					label: "Password",
// 					type: "password",
// 					placeholder: "Your secure password",
// 				},
// 			},
// 			async authorize(credentials) {
// 				console.log("=== CredentialsProvider.authorize Called ===");
// 				console.log("Credentials supplied:", credentials);

// 				if (!credentials?.email || !credentials?.password) {
// 					console.error("Missing email or password.");
// 					throw new Error("Email and password are required.");
// 				}

// 				// Find user via Prisma
// 				const user = await prisma.user.findUnique({
// 					where: { email: credentials.email },
// 				});

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
// 					id: user.id,
// 					name: `${user.firstname} ${user.lastname}`,
// 					email: user.email,
// 					firstname: user.firstname,
// 					lastname: user.lastname,
// 					role: user.role,
// 					stripeId: user.stripeId,
// 					customerId: user.customerId,
// 					username: user.username,
// 					modifyId: user.modifyId,
// 					registeredInfo: user.registeredInfo,
// 					shipping: user.shipping,
// 					neccessary_actions: user.neccessary_actions,
// 					personal_info: user.personal_info,
// 					verification: user.verification,
// 					company_verification: user.company_verification,
// 					individual_verification: user.individual_verification,
// 					stripe_metadata: user.stripe_metadata,
// 					stripeBalance: user.stripeBalance,
// 					external_accounts: user.external_accounts,
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

// 	// Callbacks
// 	callbacks: {
// 		// signIn: Determine if sign-in should be allowed
// 		async signIn(params: {
// 			user: User | AdapterUser;
// 			account: Account | null;
// 			profile?: Profile;
// 			email?: { verificationRequest?: boolean };
// 			credentials?: Record<string, CredentialInput>;
// 			isNewUser?: boolean;
// 		}): Promise<string | boolean> {
// 			console.log("=== signIn Callback Called ===");
// 			console.log("signIn params:", JSON.stringify(params, null, 2));

// 			if (!params) return false;
// 			const { account, profile, credentials, isNewUser } = params;

// 			if (isNewUser) {
// 				console.log(
// 					">>> A NEW USER JUST LOGGED IN FOR THE FIRST TIME! <<<"
// 				);
// 			}

// 			// Credentials-based sign-in
// 			if (credentials) {
// 				console.log(
// 					"Sign in with CredentialsProvider - returning true."
// 				);
// 				return true;
// 			}

// 			// OAuth-based sign-in
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
// 				const emailTest =
// 					/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
// 				const verifiedEmail =
// 					accountProfile.email_verified && emailTest;

// 				console.log(`OAuth provider: ${account.provider}`);
// 				console.log("Email is verified:", verifiedEmail);

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

// 		// jwt: Customize / populate JWT on sign-in and subsequent refresh
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

// 			// OAuth-based login
// 			if (account && user) {
// 				console.log("OAuth-based login detected.");
// 				token.accessToken = account.access_token as string;
// 				token.user = user;

// 				if (account.provider === "google") {
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
// 						);

// 						console.dir(backendResponse);

// 						const { access_token, refresh_token, key } =
// 							backendResponse.data;
// 						token = {
// 							...token,
// 							accessToken: access_token,
// 							refreshToken: {
// 								access: access_token,
// 								refresh: refresh_token,
// 								key: key || "", // Populate if your backend provides a key
// 							},
// 						};

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

// 			// Check if token might be expired
// 			if (
// 				token.accessToken &&
// 				typeof token.accessToken === "string" &&
// 				(await isJwtExpired(token.accessToken))
// 			) {
// 				console.log("JWT access token expired, attempting refresh.");
// 				const refreshTokenValue = (
// 					token.refreshToken as { refresh?: string }
// 				)?.refresh; // Type assertion
// 				if (!refreshTokenValue) {
// 					console.error("Refresh token is not available.");
// 					return token; // Handle the case where refresh token is not available
// 				}

// 				const [newAccessToken, newRefreshToken] =
// 					await refreshToken(refreshTokenValue);

// 				if (newAccessToken && newRefreshToken) {
// 					token = {
// 						...token,
// 						accessToken: newAccessToken,
// 						refreshToken: {
// 							access: newAccessToken,
// 							refresh: newRefreshToken,
// 							key: (token.refreshToken as { key?: string })?.key,
// 						},
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

// 			// Fetch additional user data from Prisma to populate the token
// 			console.log("Fetching user data from Prisma to populate token.");
// 			if (token.email) {
// 				const userFromDb = await prisma.user.findUnique({
// 					where: { email: token.email },
// 				});

// 				console.log("User document found (Prisma):", userFromDb);

// 				if (userFromDb) {
// 					// Populate the token with fields from your Prisma user
// 					token = {
// 						...token,
// 						role: userFromDb.role,
// 						stripeId: userFromDb.stripeId,
// 						customerId: userFromDb.customerId,
// 						username: userFromDb.username,
// 						firstname: userFromDb.firstname,
// 						lastname: userFromDb.lastname,
// 						modifyId: userFromDb.userId, // Assuming userId corresponds to modifyId
// 						registeredInfo: userFromDb.registeredInfo,
// 						shipping: userFromDb.shipping,
// 						neccessary_actions: userFromDb.neccessary_actions,
// 						personal_info: userFromDb.personal_info,
// 						verification: userFromDb.verification,
// 						external_accounts: userFromDb.external_accounts,
// 						company_verification: userFromDb.company_verification,
// 						individual_verification:
// 							userFromDb.individual_verification,
// 						stripe_metadata: userFromDb.stripe_metadata,
// 						stripeBalance: userFromDb.stripeBalance,
// 					};
// 				}
// 			}

// 			console.log("Final JWT token returned from callback:", token);
// 			return token as ExtendedJWT;
// 		},

// 		// session: Add data from JWT to Session object
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

// 		// redirect: Control the URL to which the user is redirected
// 		async redirect({ url }) {
// 			console.log("=== redirect Callback Called ===");
// 			console.log("Incoming redirect URL:", url);

// 			const customBaseUrl = process.env.MODIFY_URL as string;
// 			const customApiUrl = process.env.MODIFY_API as string;

// 			if (url.startsWith(customBaseUrl) || url.startsWith(customApiUrl)) {
// 				console.log(
// 					"URL is within custom base/API URL, returning as-is."
// 				);
// 				return url;
// 			}

// 			// Handle relative paths
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

// 	// Events
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
// 		// async error(message) {
// 		//   console.log("=== events.error Called ===");
// 		//   console.error("NextAuth error:", message.error);
// 		// },
// 	},
// };

// // Helper to get server session
// const getSession = () => getServerSession(authOptions);

// export { authOptions, getSession };

export {};
