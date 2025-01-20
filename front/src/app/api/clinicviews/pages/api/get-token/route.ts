import type { NextApiRequest, NextApiResponse } from "next";

const local = process.env;

const tokenRetrieval = local.MICROSOFT_AZURE_TOKEN_ENDPOINT as string;
const graphScope = local.MICROSOFT_GRAPH_SCOPE_ENDPOINT as string;
const azureId = local.NEXT_PUBLIC_AZURE_AD_CLIENT_ID as string;
const azureSecret = local.NEXT_PUBLIC_AZURE_AD_CLIENT_SECRET as string;

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    console.log("request\n", req);
    const tokenEndpoint = `${tokenRetrieval}`;
    const clientId = `${azureId}`;
    const clientSecret = `${azureSecret}`;
    const requestBody = new URLSearchParams({
        grant_type: "client_credentials",
        client_id: clientId,
        client_secret: clientSecret,
        scope: `${graphScope}`,
    });
    console.log(
        "tokenEndpoint:\n",
        tokenEndpoint,
        "\n",
        "requestBody:\n",
        requestBody,
        "\n",
        "bodyDetailsType:\n",
        typeof requestBody
    );

    try {
        const response = await fetch(tokenEndpoint, {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: requestBody.toString(),
        });
        console.log("response:\n", response);

        if (!response.ok) {
            console.error("HTTP error! status: ", response);
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log("data:\n", data);
        res.status(200).json({ accessToken: data.access_token });
    } catch (error) {
        if (error instanceof Error) {
            console.error("Error obtaining access token:", error.message);
            res.status(500).json({ error: error.message });
        }
    }
}
