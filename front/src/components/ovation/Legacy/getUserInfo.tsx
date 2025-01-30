"use client";
import { decode, JwtPayload } from "jsonwebtoken"; // add JwtPayload here
import { parseCookies } from "nookies";
import { createContext, useEffect, useState, ReactNode } from "react";

// Create the UserContext
export const UserContext = createContext(null);
type UserProviderProps = {
    children: ReactNode;
};

export function UserProvider({ children }: UserProviderProps) {
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            // Get the JWT from the cookies
            const cookies = parseCookies();
            const jwt = cookies.token;

            // Decode the JWT
            const decodedJwt = decode(jwt);

            // Fetch the user data
            if (decodedJwt !== null) {
                const response = await fetch(
                    `/api/userData?userId=${(decodedJwt as JwtPayload).userId}`
                );
                const data = await response.json();
                setUserData(data);
            }
        };

        fetchData();
    }, []);

    return (
        <UserContext.Provider value={userData}>{children}</UserContext.Provider>
    );
}
