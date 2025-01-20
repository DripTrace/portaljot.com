import { type ServiceAccount } from "firebase-admin";

export const serviceAccount: ServiceAccount = {
	projectId: `${process.env.FIREBASE_PROJECT_ID}`,
	privateKey: `${process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/gm, "\n")}`,
	clientEmail: `${process.env.FIREBASE_CLIENT_EMAIL}`,
};
