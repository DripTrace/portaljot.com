import "cross-fetch/polyfill";

export class PrintfulClient {
    constructor(printfulToken: any, options = {}) {
        if (!printfulToken) throw new Error("Printful token not provided");

        const { headers } = options as any;

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        this.printfulToken = printfulToken;

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        this.options = {
            baseUrl: "https://api.printful.com",
            ...options,
        };

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        this.headers = {
            "Content-Type": "application/json",
            // Authorization: `Bearer ${Buffer.from(printfulToken).toString("base64")}`,
            Authorization: `Bearer ${printfulToken}`,
            ...headers,
        };
    }

    async request({ method, endpoint, data, params = {} }: any) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const { baseUrl } = this.options;
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const headers = this.headers;

        const queryString = Object.keys(params).length
            ? `?${Object.keys(params)
                  .map(
                      (k) =>
                          `${encodeURIComponent(k)}=${encodeURIComponent(params[k])}`
                  )
                  .join("&")}`
            : "";

        const url = `${baseUrl}/${endpoint}${queryString}`;

        const response = await fetch(url, {
            headers,
            ...(method && { method }),
            ...(data && { body: JSON.stringify(data) }),
        });

        const json = await response.json();

        if (!response.ok) throw json;

        return json;
    }

    get(endpoint: any, params: any) {
        return this.request({ endpoint, params });
    }

    post(endpoint: any, data: any) {
        return this.request({ method: "POST", endpoint, data });
    }

    put(endpoint: any, data: any) {
        return this.request({ method: "PUT", endpoint, data });
    }

    delete(endpoint: any) {
        return this.request({ method: "DELETE", endpoint });
    }
}

export async function request(endpoint: any, { printfulToken, ...rest }: any) {
    const client = new PrintfulClient(printfulToken);

    return client.request({ endpoint, ...rest });
}

// module.exports = {
//   PrintfulClient,
//   request,
// };

// export {PrintfulClient, request}
