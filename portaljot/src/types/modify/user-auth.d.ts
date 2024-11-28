import { Session, User } from "next-auth";

export interface ExtendedSession extends Session {
	user?: {
		modifyId?: string;
		username?: string;
		role?: string;
		stripeId?: string;
		customerId?: string;
		// Add any other properties that exist on your user object
	} & Session["user"];
}

export interface AuthenticatedUser extends User {
	accessToken?: string;
	refreshToken?: string;
}
