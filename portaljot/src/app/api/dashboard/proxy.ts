import { getToken } from "@/lib/auth";

type RequestOptions = {
	method: string;
	headers: Record<string, string>;
	body?: string;
};

export default class ApiProxy {
	static async getHeaders(
		requireAuth: boolean
	): Promise<Record<string, string>> {
		let headers: Record<string, string> = {
			"Content-Type": "application/json",
			Accept: "application/json",
		};
		const authToken = getToken();
		if (authToken && requireAuth === true) {
			headers["Authorization"] = `Bearer ${authToken}`;
		}
		return headers;
	}

	static async handleFetch(
		endpoint: string,
		requestOptions: RequestOptions
	): Promise<{ data: any; status: number }> {
		let data = {};
		let status = 500;
		try {
			const response = await fetch(endpoint, requestOptions);
			data = await response.json();
			status = response.status;
		} catch (error) {
			data = { message: "Cannot reach API server", error: error };
			status = 500;
		}
		return { data, status };
	}

	static async put(
		endpoint: string,
		object: any,
		requireAuth: boolean
	): Promise<{ data: any; status: number }> {
		const jsonData = JSON.stringify(object);
		const headers = await ApiProxy.getHeaders(requireAuth);
		const requestOptions: RequestOptions = {
			method: "PUT",
			headers: headers,
			body: jsonData,
		};
		return await ApiProxy.handleFetch(endpoint, requestOptions);
	}

	static async delete(
		endpoint: string,
		requireAuth: boolean
	): Promise<{ data: any; status: number }> {
		const headers = await ApiProxy.getHeaders(requireAuth);
		const requestOptions: RequestOptions = {
			method: "DELETE",
			headers: headers,
		};
		return await ApiProxy.handleFetch(endpoint, requestOptions);
	}

	static async post(
		endpoint: string,
		object: any,
		requireAuth: boolean
	): Promise<{ data: any; status: number }> {
		const jsonData = JSON.stringify(object);
		const headers = await ApiProxy.getHeaders(requireAuth);
		const requestOptions: RequestOptions = {
			method: "POST",
			headers: headers,
			body: jsonData,
		};
		return await ApiProxy.handleFetch(endpoint, requestOptions);
	}

	static async get(
		endpoint: string,
		requireAuth: boolean
	): Promise<{ data: any; status: number }> {
		const headers = await ApiProxy.getHeaders(requireAuth);
		const requestOptions: RequestOptions = {
			method: "GET",
			headers: headers,
		};
		return await ApiProxy.handleFetch(endpoint, requestOptions);
	}
}
