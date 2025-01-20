// // // pages/api/merchandise/api/auth/session.ts

// // import { NextApiRequest, NextApiResponse } from "next";
// // import { getServerSession } from "next-auth/next";
// // import { authOptions } from "./[...nextauth]";
// // // import { authOptions } from "authOptions"; // Adjust path as needed

// // export default async function handler(
// //     req: NextApiRequest,
// //     res: NextApiResponse
// // ) {
// //     try {
// //         const session = await getServerSession(req, res, authOptions);
// //         if (session) {
// //             res.status(200).json(session);
// //         } else {
// //             res.status(401).json({ error: "Unauthorized" });
// //         }
// //     } catch (error) {
// //         console.error("Error fetching session:", error);
// //         res.status(500).json({ error: "Internal Server Error" });
// //     }
// // }

// "use server";

// import { getServerSession } from "next-auth/next";
// import { authOptions } from "@/pages/api/merchandise/api/auth/[...nextauth]";
// import { NextApiRequest, NextApiResponse } from "next";

// export default async function getSessionAction(
//     req: NextApiRequest,
//     res: NextApiResponse
// ) {
//     try {
//         const session = await getServerSession(req, res, authOptions);
//         console.log("GETTING SESSION >>>", session);
//         return session;
//     } catch (error) {
//         console.error("Error getting session:", error);
//         return null;
//     }
// }

// src/pages/api/merchandise/api/auth/session.ts

import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/pages/api/merchandise/api/auth/[...nextauth]";

export default async function sessionHandler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    try {
        const session = await getServerSession(req, res, authOptions);

        if (!session) {
            return res.status(401).json({ message: "No active session found" });
        }

        // Respond with the session data
        return res.status(200).json(session);
    } catch (error) {
        console.error("Session retrieval failed:", error);
        return res.status(500).json({ message: "Failed to retrieve session" });
    }
}
