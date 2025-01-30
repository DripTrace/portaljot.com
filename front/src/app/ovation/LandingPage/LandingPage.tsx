"use client";

import Land from "@/stories/figma/Landing/Land";
import React from "react";

const LandingPage = () => {
    return (
        <>
            <Land />
        </>
    );
};

export default LandingPage;

// import React from "react";
// import NextLink from "next/link";

// export default function LandingPage(props: { message: string }) {
//     return (
//         <div>
//             <p>{props.message}</p>
//             <NextLink href="/">Landing</NextLink>
//         </div>
//     );
// }

// export const getServerSideProps = () => {
//     return {
//         props: { message: "This landing page is rendered on the server!" },
//     };
// };
