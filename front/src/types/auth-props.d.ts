import { EventCallbacks } from "next-auth/core/types";
import "next-auth";

declare module "next-auth" {
	interface Session {
		accessToken?: string;
		user: {
			accessToken?: string;
			name?: string | null;
			email?: string | null;
			image?: string | null;
			id_token?: string | null;
			refreshToken?: {
				id_token?: string;
				key?: string;
			};
		};
	}
}

// Extend the default EventCallbacks interface
declare module "next-auth/core/types" {
	interface EventCallbacks {
		/**
		 * The error event is triggered when an error is thrown in NextAuth
		 */
		error?(message: { error: unknown }): Promise<void> | void;
	}
}

export interface TPost {
	userId: number;
	postId: string | number;
	title: string;
	body: string;
}
