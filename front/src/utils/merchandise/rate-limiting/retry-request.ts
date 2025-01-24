import { NextRequest, NextResponse } from "next/server";

export async function fetchWithAutoRetry(
	fetcher: () => Promise<any>,
	maxRetryCount: number
): Promise<any> {
	return new Promise((resolve, reject) => {
		let retries = 0;

		const retryCaller = async () => {
			try {
				const data = await fetcher();
				resolve(data);
			} catch (error) {
				if (retries < maxRetryCount) {
					retries++;
					console.log(`Retrying... Attempt ${retries}`);
					retryCaller();
				} else {
					reject(error);
				}
			}
		};

		retryCaller();
	});
}

// Example usage within Next.js API Route
export async function GET(req: NextRequest) {
	const fetchGithubProfile = async () => {
		const response = await fetch("https://api.github.com/users/russpalms");

		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}

		const data = await response.json();
		return data;
	};

	try {
		const data = await fetchWithAutoRetry(fetchGithubProfile, 5);
		console.log("Fetched data:", data);
		return NextResponse.json({ success: true, data });
	} catch (error: any) {
		console.error("Failed after retries:", error);
		return NextResponse.json(
			{ success: false, error: error.message },
			{ status: 500 }
		);
	}
}
