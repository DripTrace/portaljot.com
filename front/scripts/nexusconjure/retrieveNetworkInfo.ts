interface CloudflareVerifyResponse {
    result: {
        id: string;
        ip: string;
        // Add other properties here based on the actual API response
    };
    success: boolean;
}

const getPublicIpInfo = async (token: string): Promise<any> => {
    try {
        const response = await fetch(
            "https://api.cloudflare.com/client/v4/user/tokens/verify",
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            }
        );

        if (!response.ok) {
            throw new Error(
                `Failed to fetch public IP info: ${response.statusText}`
            );
        }

        const data: CloudflareVerifyResponse = await response.json();
        const ip = data?.result?.ip; // Extract IP address from response

        if (ip) {
            console.log(
                `Attempting to fetch IP info from ipinfo.io for IP: ${ip}`
            );
            const geoResponse = await fetch(
                `https://ipinfo.io/${ip}?token=${process.env.IPINFO_API_TOKEN}`
            );
            if (!geoResponse.ok) {
                const errorText = await geoResponse.text();
                throw new Error(
                    `ipinfo.io fetch failed: ${geoResponse.statusText} - ${errorText}`
                );
            }
            const geoData = await geoResponse.json();
            console.log("Fetched IP info from ipinfo.io:", geoData);
            return { ...geoData, source: "ipinfo.io" };
        }

        return null;
    } catch (error) {
        console.error(
            `Error fetching public IP info: ${(error as Error).message}`
        );
        return null;
    }
};
