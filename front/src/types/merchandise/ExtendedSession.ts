import { Session } from "next-auth";

export interface ExtendedSession extends Session {
    user?: {
        obinsunId?: string;
        username?: string;
        role?: string;
        stripeId?: string;
        customerId?: string;
        // Add any other properties that exist on your user object
    } & Session["user"];
}
