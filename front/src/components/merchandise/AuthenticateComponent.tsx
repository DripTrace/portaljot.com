// "use client";

// import { useRouter } from "next/navigation";
// import { getSession } from "next-auth/react";
// import { useState } from "react";
// import Preload from "@/components/merchandise/Progress/Preload";

// export default function AuthenticateComponent() {
//     const [isLoading, setIsLoading] = useState(true);
//     const router = useRouter();

//     async () => {
//         await getSession().then((session) => {
//             if (session) {
//                 console.log("RETRIEVED SESSION >>>", session);
//                 router.replace("/merchandise");
//             } else {
//                 setIsLoading(false);
//             }
//         });
//     };

//     if (isLoading) {
//         return <Preload />;
//     }

//     return;
// }

"use client";

import { useEffect, useState } from "react";
import Preload from "@/components/merchandise/Progress/Preload";
import { checkSession } from "@/actions/merchandise/checkSession"; // Adjust this import path as needed

export default function AuthenticateComponent() {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function authenticate() {
            const session = await checkSession();
            if (session) {
                console.log("RETRIEVED SESSION >>>", session);
                setIsLoading(false);
            }
        }

        authenticate();
    }, []);

    if (isLoading) {
        return <Preload />;
    }

    return null; // Or any other component you want to render when not loading
}
