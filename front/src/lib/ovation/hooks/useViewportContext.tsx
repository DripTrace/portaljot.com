"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { Dimensions } from "../utils/interfaces";
import { DeviceInfo } from "../utils/types";

export const useViewport = (): Dimensions => {
    const [width, setWidth] = useState<number>(0);
    const [height, setHeight] = useState<number>(0);
    const [fontSize, setFontSize] = useState<number>(0);
    const [deviceInfo, setDeviceInfo] = useState<DeviceInfo>({
        device: "",
        browser: "",
        ip: "",
        location: {
            city: "",
            region: "",
            country: "",
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
    });

    useEffect(() => {
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
        setDeviceInfo({
            device,
            browser,
            ip: "",
            location: { city: "", region: "", country: "" },
            error: "",
            language,
            timezone,
            operatingSystem,
            connection: connectionInfo,
        });

        const handleResize = () => {
            setWidth(window.innerWidth);
            setHeight(window.innerHeight);
            setFontSize(fontSizeInPixels);
        };

        window.addEventListener("resize", handleResize);

        fetch("https://api.ipify.org?format=json")
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Failed to fetch IP");
                }
                return response.json();
            })
            .then((data) => {
                setDeviceInfo((prevState) => ({ ...prevState, ip: data.ip }));

                // Get location based on IP
                fetch(`https://ipapi.co/${data.ip}/json/`)
                    .then((response) => {
                        if (!response.ok) {
                            throw new Error("Failed to fetch location");
                        }
                        return response.json();
                    })
                    .then((data) => {
                        setDeviceInfo((prevState) => ({
                            ...prevState,
                            location: {
                                city: data.city,
                                region: data.region,
                                country: data.country_name,
                            },
                        }));
                    })
                    .catch((error) => {
                        setDeviceInfo((prevState) => ({
                            ...prevState,
                            error: error.message,
                        }));
                    });
            })
            .catch((error) => {
                setDeviceInfo((prevState) => ({
                    ...prevState,
                    error: error.message,
                }));
            });

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

export const ViewportContext = createContext<Dimensions>({
    width: 0,
    height: 0,
    fontSize: 0,
    deviceInfo: {
        device: "",
        browser: "",
        ip: "",
        location: {
            city: "",
            region: "",
            country: "",
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
    },
});

export const useViewportContext = (): Dimensions => {
    const context = useContext(ViewportContext);
    if (!context) {
        throw new Error(
            "useViewportContext must be used within a ViewportProvider"
        );
    }
    return context;
};
