declare global {
	interface Navigator {
		connection: {
			downlink: number;
			effectiveType: string;
			rtt: number;
		};
	}
}

type Location = {
	city: string;
	region: string;
	country: string;
};

export type DeviceInfo = {
	device: string;
	browser: string;
	ip: string;
	location: Location;
	error: string;
	language: string;
	timezone: string;
	operatingSystem: string;
	connection: Navigator["connection"];
};

export type User = {
	rank: number;
	name: string;
	user: string;
	pfp: string;
	badges: number;
	followers: number;
	portfoliovalue: number;
	fnftholder: boolean;
};

export type Field = {
	segment: number;
	kind: string;
	alias: string;
};

// Define the props type for ProfileBar
export type ProfileBarProps = {
	users: User[];
};

export type FieldItems = {
	field: Field[];
};

export type SortCriteria = "rank" | "followers" | "portfoliovalue";

export type OrderSpec = "segment" | "kind" | "alias";
