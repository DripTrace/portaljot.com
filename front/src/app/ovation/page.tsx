// // "use client";

// // import { useState } from "react";
// // import { ProfilePage } from "./ProfilePage";
// // import ScrollTrap from "@/components/Scroll/ScrollTrap";
// // import HorizontalScrollCards from "@/components/Scroll/Horizontal";
// // import InfiniteScrollTags from "@/components/Scroll/Infinite";
// // import Badge from "@/components/Text/Rotation";
// // import { ScrollContainer } from "@/components/Scroll/Scrolling";

// // export default function Home() {
// //     // This state will later be set based on actual authentication logic
// //     // For now, it's set to false to simulate a logged-out user
// //     const [isLoggedIn, setIsLoggedIn] = useState(true);

// //     // Temporary toggle function to simulate logging in/out
// //     // This should eventually be replaced with real authentication logic
// //     const toggleLogin = () => setIsLoggedIn(!isLoggedIn);

// //     return (
// //         <main id="home" className="home">
// //             {/* {isLoggedIn ? <ProfilePage /> : <Landing />} */}
// //             {/* {isLoggedIn ? <HypePage /> : <Landing />} */}
// //             {/* Temporary button to toggle login state */}
// //             {/* <button onClick={toggleLogin}> */}
// //             {/* {isLoggedIn ? "Log Out" : "Log In"} */}
// //             {/* </button> */}
// //             {/* <HypePage /> */}
// //             <ProfilePage />
// //             {/* <ScrollTrap /> */}
// //             {/* <ScrollContainer /> */}
// //             {/* <HorizontalScrollCards /> */}
// //             {/* <InfiniteScrollTags /> */}
// //             {/* <Badge /> */}
// //         </main>
// //     );
// // }

// import { GetServerSidePropsContext } from "next";
// import { getSession } from "next-auth/react";
// import { Session } from "next-auth";
// import HomeTopbar from "@/components/Legacy/HomeTopbar";

// interface User {
//     id: string;
//     name: string;
//     email: string;
//     image: string;
// }

// interface CustomSession extends Session {
//     user: User;
// }

// // export default function ProfilePage() {
// //     // This component will never be rendered
// //     return null;
// // }

// const Home = () => {
//     return (
//         <>
//             <HomeTopbar />
//         </>
//     );
// };

// export default Home;

// export async function getServerSideProps(context: GetServerSidePropsContext) {
//     const session = (await getSession(context)) as CustomSession | null;

//     if (session?.user) {
//         return {
//             redirect: {
//                 destination: `/profile/${session.user.id}`,
//                 permanent: false,
//             },
//         };
//     }

//     return {
//         props: {}, // Add any other props you need
//     };
// }

// "use client";

// import React, { useEffect } from "react";
// import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
// // import { ProfilePage } from "./ProfilePage";
// // import HomePage from "./HomePage";
// // import LandingPage from "./LandingPage";
// // import SettingsPage from "./SettingsPage";
// import { LandingPage } from "@/app/LandingPage";
// import { HomePage } from "@/app/HomePage";
// import { SettingsPage } from "@/app/SettingsPage";
// import { ProfilePage } from "@/app/ProfilePage";
// import Card from "@/components/Card";
// import Land from "@/stories/figma/Landing/Land";
// import { LogPage } from "@/app/LogPage";
// import { SocialsPage } from "@/app/SocialsPage";
// import { HypePage } from "@/app//HypePage";

// export default function App() {
//     useEffect(() => {
//         console.log("root page:\n");
//     }, []);

//     return (
//         <Router>
//             <main className="/*home*/">
//                 {/* <Land /> */}

//                 {/* <div> */}
//                 <ul>
//                     <li>
//                         <Link to="/">Welcome</Link>
//                     </li>
//                     <li>
//                         <Link to="/hype">Hype</Link>
//                     </li>
//                     <li>
//                         <Link to="/landing">Landing</Link>
//                     </li>
//                     <li>
//                         <Link to="/home">Home</Link>
//                     </li>
//                     <li>
//                         <Link to="/profile">Profile</Link>
//                     </li>
//                     <li>
//                         <Link to="/settings">Settings</Link>
//                     </li>
//                     <li>
//                         <Link to="/log">Log</Link>
//                     </li>
//                     <li>
//                         <Link to="/socials">Socials</Link>
//                     </li>
//                 </ul>

//                 <Routes>
//                     <Route path="/" element={<h1>Root</h1>} />
//                     <Route path="/hype" element={<HypePage />} />
//                     <Route path="/landing" element={<LandingPage />} />
//                     <Route path="/home" element={<HomePage />} />
//                     <Route path="/profile" element={<ProfilePage />} />
//                     <Route path="/settings" element={<SettingsPage />} />
//                     <Route path="/log" element={<LogPage />} />
//                     <Route path="/socials" element={<SocialsPage />} />
//                 </Routes>
//                 {/* </div> */}
//                 {/* <Card /> */}
//                 {/* <ProfilePage /> */}
//                 {/* <Land /> */}
//             </main>
//         </Router>
//         // <Card />
//         // <main className="home">
//         //     <ProfilePage />
//         // </main>
//     );
// }

// "use client";

// import React, { useEffect } from "react";
// import { ProfilePage } from "@/app/ProfilePage";

// export default function App() {
//     useEffect(() => {
//         console.log("root page:\n");
//     }, []);

//     return (
//         <main className="home">
//             <ProfilePage />
//         </main>
//     );
// }

"use client";

import { Content, Introduction, Navigation } from "@/components";
import { ProfilePage } from "./ProfilePage";
import ErrorBoundary from "@/components/Error/ErrorBoundary";

const RootPage: React.FC = () => {
    return (
        <main className="home">
            <div className="profile-grid">
                <ErrorBoundary>
                    <Navigation />
                    <Introduction />
                    <Content />
                </ErrorBoundary>
            </div>
            {/* <ProfilePage /> */}
        </main>
    );
};

export default RootPage;
