import { SDK } from "@ringcentral/sdk";

const rcsdk = new SDK({
    server: process.env.RC_SERVER_URL,
    clientId: process.env.RC_CLIENT_ID,
    clientSecret: process.env.RC_CLIENT_SECRET,
});

export const ringCentralClient = rcsdk.platform();
