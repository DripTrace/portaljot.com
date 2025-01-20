"use server";

import { ProjectsClient } from "@google-cloud/resource-manager";

const serviceKey = {
    projectId: `${process.env.GOOGLE_PROJECT_ID}`,
    keyFilename: globalThis.__filename,
    credentials: {
        type: `${process.env.GOOGLE_CREDENTIALS_TYPE}`,
        project_id: `${process.env.GOOGLE_PROJECT_ID}`,
        private_key_id: `${process.env.GOOGLE_PRIVATE_KEY_ID}`,
        private_key: `${process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/gm, "\n")}`,
        client_email: `${process.env.GOOGLE_CLIENT_EMAIL}`,
        client_id: `${process.env.GOOGLE_CLIENT_ID}`,
        auth_uri: `${process.env.GOOGLE_AUTH_URI}`,
        token_uri: `${process.env.GOOGLE_TOKEN_URI}`,
        auth_provider_x509_cert_url: `${process.env.GOOGLE_AUTH_PROVIDER_CERT_URL}`,
        client_x509_cert_url: `${process.env.GOOGLE_CLIENT_CERT_URL}`,
        universe_domain: `${process.env.GOOGLE_UNIVERSE_DOMAIN}`,
    },
};

export const handleGcpView = async () => {
    const client = new ProjectsClient({
        credentials: serviceKey.credentials,
    });

    try {
        const [projects] = await client.searchProjects();
        console.log("GCP Projects: ", projects);
        return projects;
    } catch (error) {
        const errorMessage =
            error instanceof Error ? error.message : "Unknown error";
        throw new Error(`GCP: ${errorMessage}`);
    }
};
