"use client";

import { createContext, useContext, useEffect, useState } from "react";

interface Location {
	city: string;
	region: string;
	country: string;
	loc: string;
	postal: string;
}

interface Connection {
	downlink: number;
	effectiveType: string;
	rtt: number;
}

interface DeviceInfo {
	device: string;
	browser: string;
	ip: string;
	hostname: string;
	location: Location;
	error: string;
	language: string;
	timezone: string;
	operatingSystem: string;
	connection: Connection;
	vpn: boolean;
	org: string;
	method: string;
	errors: string[];
	logs: string[];
	sources: { [key: string]: string };
}

interface Dimensions {
	width: number;
	height: number;
	fontSize: number;
	deviceInfo: DeviceInfo;
}

const ViewportContext = createContext<Dimensions>({
	width: 0,
	height: 0,
	fontSize: 0,
	deviceInfo: {
		device: "",
		browser: "",
		ip: "",
		hostname: "",
		location: {
			city: "",
			region: "",
			country: "",
			loc: "",
			postal: "",
		},
		error: "",
		language: "",
		timezone: "",
		operatingSystem: "",
		connection: {
			downlink: 0,
			effectiveType: "",
			rtt: 0,
		},
		vpn: false,
		org: "",
		method: "",
		errors: [],
		logs: [],
		sources: {},
	},
});

export const useViewport = (): Dimensions => {
	const [width, setWidth] = useState<number>(0);
	const [height, setHeight] = useState<number>(0);
	const [fontSize, setFontSize] = useState<number>(0);
	const [deviceInfo, setDeviceInfo] = useState<DeviceInfo>({
		device: "",
		browser: "",
		ip: "",
		hostname: "",
		location: {
			city: "",
			region: "",
			country: "",
			loc: "",
			postal: "",
		},
		error: "",
		language: "",
		timezone: "",
		operatingSystem: "",
		connection: {
			downlink: 0,
			effectiveType: "",
			rtt: 0,
		},
		vpn: false,
		org: "",
		method: "",
		errors: [],
		logs: [],
		sources: {},
	});

	useEffect(() => {
		const fetchDeviceInfo = async () => {
			try {
				const response = await fetch("/api/ip/getIp");
				if (!response.ok) {
					throw new Error(`Fetch failed: ${response.statusText}`);
				}
				const data = await response.json();
				console.log("Device Info Logs: ", data.logs);
				console.log("Device Info Errors: ", data.errors);
				console.log("Data Sources: ", data.sources);
				setDeviceInfo((prevState) => ({
					...prevState,
					ip: data.ip,
					hostname: data.hostname,
					location: data.location,
					vpn: data.vpn,
					org: data.org,
					timezone: data.timezone,
					method: data.method,
					errors: data.errors,
					logs: data.logs,
					sources: data.sources,
				}));
			} catch (error) {
				const errorMessage =
					error instanceof Error ? error.message : "Unknown error";
				setDeviceInfo((prevState) => ({
					...prevState,
					error: errorMessage,
				}));
			}
		};

		const htmlFontSize = window.getComputedStyle(
			document.documentElement
		).fontSize;
		const fontSizeInPixels = parseInt(htmlFontSize);
		const device = navigator.platform;
		const browser = navigator.userAgent;
		const language = navigator.language;
		const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
		const operatingSystem = navigator.platform;
		const connectionInfo = navigator.connection
			? {
					downlink: navigator.connection.downlink,
					effectiveType: navigator.connection.effectiveType,
					rtt: navigator.connection.rtt,
			  }
			: {
					downlink: 0,
					effectiveType: "unknown",
					rtt: 0,
			  };

		setWidth(window.innerWidth);
		setHeight(window.innerHeight);
		setFontSize(fontSizeInPixels);
		setDeviceInfo((prevState) => ({
			...prevState,
			device,
			browser,
			language,
			timezone,
			operatingSystem,
			connection: connectionInfo,
		}));

		fetchDeviceInfo();

		const handleResize = () => {
			setWidth(window.innerWidth);
			setHeight(window.innerHeight);
			setFontSize(fontSizeInPixels);
		};

		window.addEventListener("resize", handleResize);

		return () => {
			window.removeEventListener("resize", handleResize);
		};
	}, []);

	return { width, height, fontSize, deviceInfo };
};

export const ViewportProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const viewport = useViewport();
	return (
		<ViewportContext.Provider value={viewport}>
			{children}
		</ViewportContext.Provider>
	);
};

export const useViewportContext = (): Dimensions => {
	const context = useContext(ViewportContext);
	if (!context) {
		throw new Error(
			"useViewportContext must be used within a ViewportProvider"
		);
	}
	return context;
};
