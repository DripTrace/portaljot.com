import type Ngrok from "ngrok";

const customDev = process.env.NODE_ENV !== "production";
const customPort = (process.env.PORT || 8000) as number;

const ngrokConfig = {
    ngrok: {
        enabled: customDev,
        port: customPort,
        subDomain: process.env.NGROK_SUBDOMAIN,
        authToken: process.env.NGROK_AUTHTOKEN,
    },
};

const ngrokRef = ngrokConfig.ngrok;

type NgrokServer = typeof Ngrok | null;

const ngrokServer: NgrokServer = ngrokRef.enabled ? require("ngrok") : null;

if (ngrokServer !== null) {
    ngrokServer
        .connect({
            addr: ngrokConfig.ngrok.port,
            aubdomain: ngrokConfig.ngrok.subDomain,
            authtoken: ngrokConfig.ngrok.authToken,
        })
        .then((ngrokUrl: string) => {
            console.log(
                `💳  Ngrok URL to see the https test in the browser: ${ngrokUrl}/`
            );
        })
        .catch((ngrokErr: any) => {
            if (ngrokErr.code === "ECONNREFUSED") {
                console.log(
                    `⚠️  Connection refused at ${ngrokErr.address}:${ngrokErr.port}`
                );
            } else {
                console.log(`⚠️ Ngrok error: ${JSON.stringify(ngrokErr)}`);
            }
            process.exit(1);
        });
}
