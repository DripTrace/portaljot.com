// import {
// 	collection,
// 	query,
// 	getDocs,
// 	where,
// 	doc,
// 	getDoc,
// 	setDoc,
// } from "firebase/firestore";
// import type Stripe from "stripe";
// import fetch from "node-fetch";
// import { NextRequest, NextResponse } from "next/server";
// import { hashPassword } from "@/lib/modify/authentication/password";
// import { db } from "@/config/firebase/storage";

// const stripe: Stripe = require("stripe")(`${process.env.STRIPE_SECRET_KEY}`);

// // Define types
// interface UserData {
// 	modifyUuid: string;
// 	username: string;
// 	firstname: string;
// 	lastname: string;
// 	email: string;
// 	password: string;
// 	role: string;
// 	personToken: {
// 		client_ip: string;
// 	};
// }

// interface CountryData {
// 	currencies: Record<string, { name: string; symbol: string }>;
// 	flag: string;
// }

// interface RegisteredData extends Omit<UserData, "password" | "personToken"> {
// 	password: string; // This will be the hashed password
// 	registeredInfo: {
// 		userCountryCode: string;
// 		userCurrency: string;
// 		userFlag: string;
// 	};
// }

// const handler = async (req: NextRequest) => {
// 	if (req.method !== "POST") {
// 		return new NextResponse(
// 			JSON.stringify({ message: "Method Not Allowed" }),
// 			{
// 				status: 405,
// 				headers: {
// 					"Content-Type": "application/json",
// 				},
// 			}
// 		);
// 	}

// 	const data = (await req.json()) as UserData;

// 	const {
// 		modifyUuid,
// 		username,
// 		firstname,
// 		lastname,
// 		email,
// 		password,
// 		role,
// 		personToken,
// 	} = data;

// 	// Input validation
// 	if (
// 		!email ||
// 		!email.includes("@") ||
// 		!email.includes(".") ||
// 		!password ||
// 		password.trim().length < 7
// 	) {
// 		return new NextResponse(
// 			JSON.stringify({
// 				message:
// 					"Invalid input - password should also be at least 7 characters long.",
// 			}),
// 			{
// 				status: 422,
// 				headers: {
// 					"Content-Type": "application/json",
// 				},
// 			}
// 		);
// 	}

// 	const hashedPassword = await hashPassword(password);

// 	// Check for existing user
// 	const checkExistingUser = query(
// 		collection(db, "users"),
// 		where("email", "==", email)
// 	);

// 	const existingUserSnapshot = await getDocs(checkExistingUser);

// 	if (!existingUserSnapshot.empty) {
// 		return new NextResponse(
// 			JSON.stringify({ message: "User already exists!" }),
// 			{
// 				status: 422,
// 				headers: {
// 					"Content-Type": "application/json",
// 				},
// 			}
// 		);
// 	}

// 	// Get visitor's country
// 	const getVisitorCountry = async (ip: string): Promise<string> => {
// 		try {
// 			const response = await fetch(`https://ip2c.org/${ip}`);
// 			const data = await response.text();
// 			const [status, country] = data.split(";");
// 			if (status !== "1") {
// 				throw new Error("Unable to fetch country");
// 			}
// 			return country;
// 		} catch {
// 			return "US";
// 		}
// 	};

// 	const countryCode = await getVisitorCountry(personToken.client_ip);

// 	// Get country currency and flag
// 	const getCountryData = async (code: string): Promise<CountryData> => {
// 		const response = await fetch(
// 			`https://restcountries.com/v3.1/alpha/${code}`
// 		);
// 		const data = (await response.json()) as CountryData[];
// 		if (!data || data.length === 0) {
// 			throw new Error("Unable to fetch country data");
// 		}
// 		return data[0];
// 	};

// 	const countryData = await getCountryData(countryCode);

// 	const retrievedCountryCurrency = Object.keys(
// 		countryData.currencies
// 	)[0].toLowerCase();
// 	const retrievedCountryFlag = countryData.flag;

// 	// Create Stripe customer
// 	await stripe.customers.create({
// 		email,
// 		metadata: {
// 			mId: modifyUuid,
// 			ipAddress: personToken.client_ip,
// 			userCountry: countryCode,
// 			username,
// 		},
// 		name: `${firstname} ${lastname}`,
// 		tax: {
// 			ip_address: personToken.client_ip,
// 		},
// 	});

// 	// Prepare user data for registration
// 	const registerData: RegisteredData = {
// 		modifyUuid,
// 		username,
// 		firstname,
// 		lastname,
// 		email,
// 		password: hashedPassword,
// 		role,
// 		registeredInfo: {
// 			userCountryCode: countryCode,
// 			userCurrency: retrievedCountryCurrency,
// 			userFlag: retrievedCountryFlag,
// 		},
// 	};

// 	// Save user to Firestore
// 	const userReference = doc(db, "users", username);
// 	await setDoc(userReference, registerData);

// 	const registeredUser = await getDoc(userReference);
// 	const registered = registeredUser.data() as RegisteredData;

// 	return new NextResponse(
// 		JSON.stringify({
// 			message: "Created user!",
// 			registered,
// 		}),
// 		{
// 			status: 201,
// 			headers: {
// 				"Content-Type": "application/json",
// 			},
// 		}
// 	);
// };

// export default handler;

import {
	collection,
	query,
	getDocs,
	where,
	doc,
	getDoc,
	setDoc,
} from "firebase/firestore";
import Stripe from "stripe";
import fetch from "node-fetch";
import { NextRequest, NextResponse } from "next/server";
import { hashPassword } from "@/lib/modify/authentication/password";
import { db } from "@/config/firebase/storage";

// const stripe: Stripe = require("stripe")(`${process.env.STRIPE_SECRET_KEY}`);

const stripe = new Stripe(`${process.env.STRIPE_SECRET_KEY}`, {
	// apiVersion: "2024-09-30.acacia", // Specify the API version
	apiVersion: "2024-12-18.acacia",
});

interface UserData {
	modifyUuid: string;
	username: string;
	firstname: string;
	lastname: string;
	email: string;
	password: string;
	role: string;
	personToken: {
		client_ip: string;
	};
}

interface CountryData {
	currencies: Record<string, { name: string; symbol: string }>;
	flag: string;
}

interface RegisteredData extends Omit<UserData, "password" | "personToken"> {
	password: string;
	registeredInfo: {
		userCountryCode: string;
		userCurrency: string;
		userFlag: string;
	};
}

export async function POST(req: NextRequest): Promise<NextResponse> {
	const data = (await req.json()) as UserData;

	const {
		modifyUuid,
		username,
		firstname,
		lastname,
		email,
		password,
		role,
		personToken,
	} = data;

	if (
		!email ||
		!email.includes("@") ||
		!email.includes(".") ||
		!password ||
		password.trim().length < 7
	) {
		return new NextResponse(
			JSON.stringify({
				message:
					"Invalid input - password should also be at least 7 characters long.",
			}),
			{
				status: 422,
				headers: {
					"Content-Type": "application/json",
				},
			}
		);
	}

	const hashedPassword = await hashPassword(password);

	const checkExistingUser = query(
		collection(db, "users"),
		where("email", "==", email)
	);

	const existingUserSnapshot = await getDocs(checkExistingUser);

	if (!existingUserSnapshot.empty) {
		return new NextResponse(
			JSON.stringify({ message: "User already exists!" }),
			{
				status: 422,
				headers: {
					"Content-Type": "application/json",
				},
			}
		);
	}

	const getVisitorCountry = async (ip: string): Promise<string> => {
		try {
			const response = await fetch(`https://ip2c.org/${ip}`);
			const data = await response.text();
			const [status, country] = data.split(";");
			if (status !== "1") {
				throw new Error("Unable to fetch country");
			}
			return country;
		} catch {
			return "US";
		}
	};

	const countryCode = await getVisitorCountry(personToken.client_ip);

	const getCountryData = async (code: string): Promise<CountryData> => {
		const response = await fetch(
			`https://restcountries.com/v3.1/alpha/${code}`
		);
		const data = (await response.json()) as CountryData[];
		if (!data || data.length === 0) {
			throw new Error("Unable to fetch country data");
		}
		return data[0];
	};

	const countryData = await getCountryData(countryCode);

	const retrievedCountryCurrency = Object.keys(
		countryData.currencies
	)[0].toLowerCase();
	const retrievedCountryFlag = countryData.flag;

	await stripe.customers.create({
		email,
		metadata: {
			mId: modifyUuid,
			ipAddress: personToken.client_ip,
			userCountry: countryCode,
			username,
		},
		name: `${firstname} ${lastname}`,
		tax: {
			ip_address: personToken.client_ip,
		},
	});

	const registerData: RegisteredData = {
		modifyUuid,
		username,
		firstname,
		lastname,
		email,
		password: hashedPassword,
		role,
		registeredInfo: {
			userCountryCode: countryCode,
			userCurrency: retrievedCountryCurrency,
			userFlag: retrievedCountryFlag,
		},
	};

	const userReference = doc(db, "users", username);
	await setDoc(userReference, registerData);

	const registeredUser = await getDoc(userReference);
	const registered = registeredUser.data() as RegisteredData;

	return new NextResponse(
		JSON.stringify({
			message: "Created user!",
			registered,
		}),
		{
			status: 201,
			headers: {
				"Content-Type": "application/json",
			},
		}
	);
}
