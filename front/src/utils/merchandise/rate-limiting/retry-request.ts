export default async function fetchWithAutoRetry(
    fetcher: () => Promise<any>,
    maxRetryCount: number
): Promise<any> {
    return new Promise((resolve, reject) => {
        let retries = 0;

        const caller = () => {
            fetcher()
                .then((data) => {
                    resolve(data);
                })
                .catch((error) => {
                    if (retries < maxRetryCount) {
                        retries++;
                        console.log(`Retrying... Attempt ${retries}`);
                        caller();
                    } else {
                        reject(error);
                    }
                });
        };

        caller();
    });
}

// Example usage:
const fetchGithubProfile = async () => {
    const rawResponse = await fetch("https://api.github.com/users/russpalms");
    if (!rawResponse.ok) {
        throw new Error(`HTTP error! status: ${rawResponse.status}`);
    }
    const jsonResponse = await rawResponse.json();
    console.log(jsonResponse);
    return jsonResponse;
};

fetchWithAutoRetry(fetchGithubProfile, 5)
    .then((data) => console.log("Fetched data:", data))
    .catch((error) => console.error("Failed after retries:", error));
