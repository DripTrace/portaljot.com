"use client";

import React, { MouseEvent } from "react";
import ContentComponent from "@/components/merchandise/ContentComponent";

// Define the types for the functions and responses
type FetcherFunction = () => Promise<unknown>;

const Request = () => {
    const useRequest = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        try {
            const fetchWithAutoRetry = (
                fetcher: FetcherFunction,
                maxRetryCount: number
            ): Promise<unknown> => {
                return new Promise((resolve, reject) => {
                    let retries = 0;
                    const caller = () =>
                        fetcher()
                            .then((data) => {
                                resolve(data);
                            })
                            .catch((error) => {
                                if (retries < maxRetryCount) {
                                    retries++;
                                    console.log(retries);
                                    caller();
                                } else {
                                    reject(error);
                                }
                            });
                    retries = 1;
                    caller();
                });
            };

            const fetchGithubProfile = async (): Promise<unknown> => {
                console.log("Fetching github profile . . .");
                const rawResponse = await fetch(
                    "https://api.github.com/users/russpalms"
                );
                const jsonResponse = await rawResponse.json();
                console.log(jsonResponse);
                return jsonResponse;
            };

            fetchWithAutoRetry(fetchGithubProfile, 5);
        } catch (error) {
            console.log("promise error: ", error);
        }
    };

    return (
        <ContentComponent title="" description="">
            <button
                onClick={(e) => {
                    useRequest(e);
                }}
            >
                Request Button
            </button>
        </ContentComponent>
    );
};

export default Request;
