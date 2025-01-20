import axios from "axios";
import { NextApiRequest } from "next";
import { getAuthToken } from "@/components/layout/authProvider";

class ApiProxy {
    private static getHeaders(req: NextApiRequest): Record<string, string> {
        const token = getAuthToken() || req.cookies["access_token"];
        console.log("Token:", token ? "Present" : "Not present");
        return {
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
            "Content-Type": "application/json",
        };
    }

    static async get(url: string, req: NextApiRequest) {
        console.log("ApiProxy GET request:", { url });
        try {
            const headers = this.getHeaders(req);
            console.log("Request headers:", headers);
            const response = await axios.get(url, { headers });
            return { data: response.data, status: response.status };
        } catch (error) {
            console.error("ApiProxy GET error:", error);
            return this.handleError(error);
        }
    }

    static async post(url: string, data: any, req: NextApiRequest) {
        try {
            console.log("ApiProxy POST request:", { url, data });
            const headers = this.getHeaders(req);
            console.log("Request headers:", headers);
            const response = await axios.post(url, data, { headers });
            console.log("ApiProxy POST response:", {
                status: response.status,
                data: response.data,
            });
            return { data: response.data, status: response.status };
        } catch (error) {
            console.error("ApiProxy POST error:", error);
            return this.handleError(error);
        }
    }

    static async put(url: string, req: NextApiRequest, data: any) {
        console.log("ApiProxy PUT request:", { url, data });
        try {
            const headers = this.getHeaders(req);
            console.log("PUT Request headers:", headers);
            const formattedUrl = url.endsWith("/") ? url : `${url}/`;
            const response = await axios.put(formattedUrl, data, { headers });
            console.log("ApiProxy PUT response:", {
                status: response.status,
                data: response.data,
            });
            return { data: response.data, status: response.status };
        } catch (error) {
            console.error("ApiProxy PUT error:", error);
            return this.handleError(error);
        }
    }

    private static handleError(error: any) {
        if (axios.isAxiosError(error) && error.response) {
            return { data: error.response.data, status: error.response.status };
        } else {
            return { data: { message: "An error occurred" }, status: 500 };
        }
    }
}

export default ApiProxy;
