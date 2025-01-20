import { Session, User } from "next-auth";

declare module "next-auth" {
	interface Session {
        firebaseToken?: string;
		user: {
			permissions?: { admin: any[] };
			refreshToken?: {
				access?: string;
				refresh?: string;
				key?: string;
			};
			accessToken?: string;
            id?: string;
			availableLanguages?: string[];
		} & DefaultSession["user"];
	}
}

export interface ExtendedSession extends Session {
	user: {
		refreshToken?: {
			access?: string;
			refresh?: string;
			key?: string;
		};
		accessToken?: string;
		role?: string;
		stripeId?: string;
		customerId?: string;
		username?: string;
		firstname?: string;
		lastname?: string;
		modifyId?: string;
		registeredInfo?: {
			userCountryCode: string;
			userCurrency: string;
			userFlag: string;
		};
		shipping?: {
			address?: {
				line1?: string;
				line2?: string;
				city?: string;
				postal_code?: string;
				state?: string;
			};
			name?: string;
			phone?: string;
		};
		neccessary_actions?: any;
		personal_info?: any;
		verification?: any;
		company_verification?: any;
		individual_verification?: any;
		stripe_metadata?: any;
		stripeBalance?: any;
		external_accounts?: any;
		permissions?: { admin: [any] };
	} & Session["user"];
}

export interface AuthenticatedUser extends User {
	accessToken?: string;
	refreshToken?: string;
}
