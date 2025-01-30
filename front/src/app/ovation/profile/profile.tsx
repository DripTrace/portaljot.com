// // import { ProfilePage } from "@/app/ProfilePage";

// // export default function profile() {
// //     return <ProfilePage />;
// // }

// import React from "react";
// import NextLink from "next/link";
// import { ProfilePage } from "@/app/ProfilePage";

// export default function profile(props: { message: string }) {
//     return (
//         <div>
//             <p>{props.message}</p>
//             <NextLink href="/profile">
//                 <ProfilePage />
//             </NextLink>
//         </div>
//     );
// }

// export const getServerSideProps = () => {
//     return {
//         props: { message: "This profile page is rendered on the server!" },
//     };
// };
