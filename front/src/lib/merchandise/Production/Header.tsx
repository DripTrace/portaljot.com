// // // // "use client";

// // // // import { useSession, signOut } from "next-auth/react";
// // // // import Link from "next/link";
// // // // import React, { useEffect, useState } from "react";
// // // // import { BiBook, BiCart } from "react-icons/bi";
// // // // import { RiHeartFill } from "react-icons/ri";
// // // // import { CgProfile, CgSearch } from "react-icons/cg";
// // // // import { IoIosHome, IoIosColorPalette } from "react-icons/io";
// // // // import { VscSettingsGear } from "react-icons/vsc";
// // // // import { CgGitFork } from "react-icons/cg";
// // // // import { FaPenFancy } from "react-icons/fa";
// // // // import { MdPrint } from "react-icons/md";
// // // // import { useSelector } from "react-redux";
// // // // import { useRouter } from "next/navigation";
// // // // import { selectItems } from "../state/slices/basketSlice";
// // // // import DarkModeToggle from "@/components/merchandise/DarkModeToggle";
// // // // import { useUserContext } from "../features/UserContext";
// // // // import ZLogo from "../ObinsunVectors/ZLogo";

// // // // interface HeaderProps {
// // // //     openModal: () => void;
// // // //     openSketch: () => void;
// // // // }

// // // // const Header: React.FC<HeaderProps> = ({ openModal, openSketch }) => {
// // // //     const { data: session } = useSession();
// // // //     const items = useSelector(selectItems);
// // // //     const router = useRouter();
// // // //     const { access } = useUserContext();

// // // //     const handleLogMode = async () => {
// // // //         if (!session) {
// // // //             openModal();
// // // //         } else {
// // // //             await signOut({ redirect: false, callbackUrl: "/merchandise" });
// // // //             router.push("/merchandise");
// // // //         }
// // // //     };

// // // //     const quickSketch = (e: React.MouseEvent) => {
// // // //         console.log("opening quick sketch...");
// // // //         openSketch();
// // // //     };

// // // //     useEffect(() => {}, [session]);

// // // //     const [menuOpen, setMenuOpen] = useState(false);
// // // //     const [closeMenu, setCloseMenu] = useState(false);

// // // //     const handleMenu = () => {
// // // //         setMenuOpen(!menuOpen);
// // // //     };

// // // //     const handleRoute = () => {
// // // //         if (menuOpen) {
// // // //             setCloseMenu(!closeMenu);
// // // //             handleMenu();
// // // //         }
// // // //     };

// // // "use client";

// // // import Link from "next/link";
// // // import React, { useEffect, useState } from "react";
// // // import { useRouter } from "next/navigation";
// // // import { BiBook, BiCart } from "react-icons/bi";
// // // import { RiHeartFill } from "react-icons/ri";
// // // import { CgProfile, CgSearch, CgGitFork } from "react-icons/cg";
// // // import { IoIosHome, IoIosColorPalette } from "react-icons/io";
// // // import { VscSettingsGear } from "react-icons/vsc";
// // // import { FaPenFancy } from "react-icons/fa";
// // // import { MdPrint } from "react-icons/md";
// // // import { useSelector } from "react-redux";
// // // import DarkModeToggle from "@/components/merchandise/DarkModeToggle";
// // // import { useUserContext } from "../features/UserContext";
// // // import ZLogo from "../ObinsunVectors/ZLogo";
// // // import { getSessionAction } from "@/actions/merchandise/getSessionAction";
// // // import { selectItems } from "../state/slices/basketSlice";

// // // interface HeaderProps {
// // //     openModal: () => void;
// // //     openSketch: () => void;
// // // }

// // // const Header: React.FC<HeaderProps> = ({ openModal, openSketch }) => {
// // //     const [session, setSession] = useState<any>(null);
// // //     const router = useRouter();
// // //     const { access } = useUserContext();
// // //     const items = useSelector(selectItems);

// // //     // Function to check session state
// // //     const fetchSession = async () => {
// // //         const currentSession = await getSessionAction();
// // //         setSession(currentSession);
// // //     };

// // //     const handleLoginLogout = async () => {
// // //         if (!session) {
// // //             openModal(); // Open login modal if not logged in
// // //         } else {
// // //             // Call the logout API route
// // //             const response = await fetch("/api/merchandise/api/auth/logout", {
// // //                 method: "POST",
// // //             });

// // //             if (response.ok) {
// // //                 setSession(null); // Clear session state
// // //                 router.push("/merchandise"); // Redirect to merchandise page
// // //             } else {
// // //                 console.error("Failed to log out");
// // //             }
// // //         }
// // //     };

// // //     const quickSketch = (e: React.MouseEvent) => {
// // //         console.log("opening quick sketch...");
// // //         openSketch();
// // //     };

// // //     const [menuOpen, setMenuOpen] = useState(false);
// // //     const [closeMenu, setCloseMenu] = useState(false);

// // //     const handleMenu = () => {
// // //         setMenuOpen(!menuOpen);
// // //     };

// // //     const handleRoute = () => {
// // //         if (menuOpen) {
// // //             setCloseMenu(!closeMenu);
// // //             handleMenu();
// // //         }

// // //         useEffect(() => {
// // //             fetchSession(); // Check session on component mount
// // //         }, [handleLoginLogout]);
// // //     };

// // //     return (
// // //         <>
// // //             <header
// // //                 className={`px-1 transition-all ease-in-out glass-container sticky ${
// // //                     menuOpen
// // //                         ? "h-[100vh] w-[100%] top-[0%] grow"
// // //                         : "h-[10.3em] laptop:h-[11em] w-[80%] top-[3%] laptop-l:h-[9em]"
// // //                 } z-[1000] overflow-hidden tablet:px-4`}
// // //             >
// // //                 <div className="relative flex vs:flex-col laptop-l:flex-row flex-col items-evenly p-3 flex-1 h-full w-full laptop-l:h-[10em]">
// // //                     <div className="flex vs:flex-col flex-col laptop:flex-col laptop-l:flex-row laptop-l:flex-1 gap-1">
// // //                         <div className="relative flex items-center justify-center pb-2 px-3 gap-1">
// // //                             <Link href="/merchandise" passHref>
// // //                                 <span className="flex items-center justify-center">
// // //                                     <ZLogo
// // //                                         id="logo"
// // //                                         className="relative h-[5em] w-[5em] laptop:h-[6em] laptop:w-[6em] cursor-pointer flex items-center justify-center"
// // //                                     />
// // //                                     <h1 className="text-[3em] xs:text-[3.3em] mobile-l:text-[3.5em] tablet:text-[4.5em] laptop-l:text-[5.5em] flex items-center justify-center tracking-tight h-full w-full cursor-pointer">
// // //                                         Obinsun
// // //                                     </h1>
// // //                                 </span>
// // //                             </Link>
// // //                             <DarkModeToggle />
// // //                         </div>

// // //                         <div className="flex vs:flex-col laptop:flex-col laptop-l:flex-col relative w-full items-center justify-evenly gap-[1em] laptop-l:gap-0 px-4 -mt-2  laptop-l:py-2 laptop-l:flex-1">
// // //                             <div className="flex relative vs:h-full vs:w-full vs:items-center vs:justify-center vs:gap-[1em] laptop:h-full laptop:w-full laptop:items-center laptop:justify-center laptop:gap-[1em] laptop-l:h-full laptop-l:w-full laptop-l:items-center laptop-l:justify-center laptop-l:gap-[1em] laptop-l:flex-1">
// // //                                 <div className="relative flex-2 flex items-center p-2 rounded-[0.625em] w-full bg-gray-800/20 dark:bg-gray-300/20 flex-2">
// // //                                     <input
// // //                                         className="w-full select-none border-none rounded-[0.625em] bg-gray-800/0 dark:bg-gray-300/0 outline-none p-1 placeholder-gray-800 dark:placeholder-[#4C8EFF]"
// // //                                         placeholder="Search For Merch"
// // //                                         type="text"
// // //                                     />
// // //                                     <CgSearch
// // //                                         className="rounded-full cursor-pointer h-6 w-6"
// // //                                         type="submit"
// // //                                     />
// // //                                 </div>
// // //                                 <button
// // //                                     className="flex-1 py-3 px-6 relative border border-gray-800/20 dark:border-gray-300/20 rounded-[0.625em] flex-2 hover:bg-gray-800 hover:text-gray-300 dark:hover:bg-[#4C8EFF] dark:hover:text-gray-300"
// // //                                     type="button"
// // //                                     onClick={handleLoginLogout}
// // //                                 >
// // //                                     <h2 className="relative z-50 h-full w-full">
// // //                                         {session ? (
// // //                                             <Link href="/merchandise">
// // //                                                 Logout
// // //                                             </Link>
// // //                                         ) : (
// // //                                             "Login"
// // //                                         )}
// // //                                     </h2>
// // //                                 </button>

// // //                                 <div className="relative w-full flex-[0.2] items-center justify-center">
// // //                                     <div className="relative filter-container">
// // //                                         <span className="relative filter-icon-list-container">
// // //                                             <FaPenFancy
// // //                                                 className="relative h-[2.5em] w-[2.5em] cursor-pointer"
// // //                                                 onClick={quickSketch}
// // //                                             />
// // //                                         </span>
// // //                                     </div>
// // //                                 </div>

// // //                                 <div className="relative w-full flex-[0.2] items-center justify-center">
// // //                                     <Link href="/merchandise/checkout">
// // //                                         <div className="relative filter-container">
// // //                                             <span className="relative filter-icon-list-container">
// // //                                                 <BiCart className="relative h-[2.5em] w-[2.5em] cursor-pointer" />
// // //                                                 <span className="z-50 pt-[0.125em] mobile-l:pt-[0.15em] pl-[0.05em] absolute flex items-center justify-center top-[0.1em] xs:top-[-0.025em] mobile-l:top-[0.2em] right-[-0.25em] vs:h-[1em] xs:h-[1.25em] vs:w-[1em] xs:w-[1.25em]  bg-gray-300/70 dark:bg-gray-800/70 text-center border-black dark:border-[#4C8EFF] border-[0.025em] rounded-full text-gray-800 dark:text-gray-300 text-xs mobile-l:text-sm font-bold">
// // //                                                     {items.length}
// // //                                                 </span>
// // //                                             </span>
// // //                                         </div>
// // //                                     </Link>
// // //                                 </div>

// // //                                 <div className="relative flex-1 h-full w-full flex items-center justify-center">
// // //                                     <div
// // //                                         className="relative cursor-pointer transform h-[2em] w-[2em] flex items-center justify-center z-50"
// // //                                         onClick={handleMenu}
// // //                                     >
// // //                                         <div
// // //                                             className={`flex-1 transform duration-3000 translate-y-[1em] absolute top-0 left-0 menu-toggle ${
// // //                                                 menuOpen
// // //                                                     ? "before:translate-y-0 before:rotate-45 after:translate-y-0 after:rotate-[-45deg] after:shadow-active-menu after:dark:shadow-active-dark-menu "
// // //                                                     : "before:translate-y-[-0.5em] before:rotate-0 after:translate-y-[0.5em] after:rotate-0"
// // //                                             }`}
// // //                                         />
// // //                                     </div>
// // //                                 </div>
// // //                             </div>

// // //                             <nav className="p-3 laptop-l:p-2 relative flex items-center laptop-l:content-evenly laptop-l:h-full laptop-l:w-full laptop-l:justify-evenly laptop-l:flex-1">
// // //                                 <ul className="flex flex-col laptop-l:flex-row justify-center items-start laptop-l:items-center gap-[1em] relative ml-[0%] laptop-l:flex-1">
// // //                                     <li className="filter-container flex-1">
// // //                                         <span className="filter-icon-list-container">
// // //                                             <Link href="/merchandise/wishlist">
// // //                                                 <span className="filter-icon-glass-container">
// // //                                                     <RiHeartFill
// // //                                                         onClick={handleRoute}
// // //                                                         className="filter-icon-size"
// // //                                                     />
// // //                                                 </span>
// // //                                             </Link>
// // //                                             <span className="filter-text-container laptop-l:hidden">
// // //                                                 Wishlist
// // //                                             </span>
// // //                                         </span>
// // //                                     </li>

// // //                                     <li className="filter-container flex-1">
// // //                                         <span className="filter-icon-list-container">
// // //                                             <Link href="/merchandise/orders">
// // //                                                 <span className="filter-icon-glass-container">
// // //                                                     <BiBook className="filter-icon-size" />
// // //                                                 </span>
// // //                                             </Link>
// // //                                             <span className="filter-text-container laptop-l:hidden">
// // //                                                 Orders
// // //                                             </span>
// // //                                         </span>
// // //                                     </li>

// // //                                     {access("users", "read", "own").granted && (
// // //                                         <li className="filter-container flex-1">
// // //                                             <span className="filter-icon-list-container">
// // //                                                 <Link href="/merchandise/profile">
// // //                                                     <span className="filter-icon-glass-container">
// // //                                                         <CgProfile
// // //                                                             onClick={
// // //                                                                 handleRoute
// // //                                                             }
// // //                                                             className="filter-icon-size"
// // //                                                         />
// // //                                                     </span>
// // //                                                 </Link>
// // //                                                 <span className="filter-text-container laptop-l:hidden">
// // //                                                     Profile
// // //                                                 </span>
// // //                                             </span>
// // //                                         </li>
// // //                                     )}

// // //                                     <li className="filter-container flex-1">
// // //                                         <span className="filter-icon-list-container">
// // //                                             <Link href="/merchandise/dashboard">
// // //                                                 <span className="filter-icon-glass-container">
// // //                                                     <IoIosHome
// // //                                                         onClick={handleRoute}
// // //                                                         className="filter-icon-size"
// // //                                                     />
// // //                                                 </span>
// // //                                             </Link>
// // //                                             <span className="filter-text-container laptop-l:hidden">
// // //                                                 Shop
// // //                                             </span>
// // //                                         </span>
// // //                                     </li>

// // //                                     {access("users", "read", "any").granted && (
// // //                                         <li className="filter-container flex-1">
// // //                                             <span className="filter-icon-list-container">
// // //                                                 <Link href="/merchandise/studio">
// // //                                                     <span className="filter-icon-glass-container">
// // //                                                         <IoIosColorPalette
// // //                                                             onClick={
// // //                                                                 handleRoute
// // //                                                             }
// // //                                                             className="filter-icon-size"
// // //                                                         />
// // //                                                     </span>
// // //                                                 </Link>
// // //                                                 <span className="filter-text-container laptop-l:hidden">
// // //                                                     Studio
// // //                                                 </span>
// // //                                             </span>
// // //                                         </li>
// // //                                     )}

// // //                                     {access("users", "read", "any").granted && (
// // //                                         <li className="filter-container flex-1">
// // //                                             <span className="filter-icon-list-container">
// // //                                                 <Link href="/merchandise/print">
// // //                                                     <span className="filter-icon-glass-container">
// // //                                                         <MdPrint
// // //                                                             onClick={
// // //                                                                 handleRoute
// // //                                                             }
// // //                                                             className="filter-icon-size"
// // //                                                         />
// // //                                                     </span>
// // //                                                 </Link>
// // //                                                 <span className="filter-text-container laptop-l:hidden">
// // //                                                     Print
// // //                                                 </span>
// // //                                             </span>
// // //                                         </li>
// // //                                     )}

// // //                                     {access("users", "read", "any").granted && (
// // //                                         <li className="filter-container flex-1">
// // //                                             <span className="filter-icon-list-container">
// // //                                                 <Link href="/merchandise/settings">
// // //                                                     <span className="filter-icon-glass-container">
// // //                                                         <VscSettingsGear
// // //                                                             onClick={
// // //                                                                 handleRoute
// // //                                                             }
// // //                                                             className="filter-icon-size"
// // //                                                         />
// // //                                                     </span>
// // //                                                 </Link>
// // //                                                 <span className="filter-text-container laptop-l:hidden">
// // //                                                     Settings
// // //                                                 </span>
// // //                                             </span>
// // //                                         </li>
// // //                                     )}

// // //                                     {access("app", "read", "any").granted && (
// // //                                         <li className="filter-container flex-1">
// // //                                             <span className="filter-icon-list-container">
// // //                                                 <Link href="/merchandise/dev">
// // //                                                     <span className="filter-icon-glass-container">
// // //                                                         <CgGitFork
// // //                                                             onClick={
// // //                                                                 handleRoute
// // //                                                             }
// // //                                                             className="filter-icon-size"
// // //                                                         />
// // //                                                     </span>
// // //                                                 </Link>
// // //                                                 <span className="filter-text-container laptop-l:hidden">
// // //                                                     Dev
// // //                                                 </span>
// // //                                             </span>
// // //                                         </li>
// // //                                     )}
// // //                                 </ul>
// // //                             </nav>
// // //                         </div>
// // //                     </div>
// // //                 </div>
// // //             </header>
// // //         </>
// // //     );
// // // };

// // // export default Header;

// // "use client";

// // import { useSession } from "next-auth/react";
// // import Link from "next/link";
// // import React, { useEffect, useState } from "react";
// // import { BiBook, BiCart } from "react-icons/bi";
// // import { RiHeartFill } from "react-icons/ri";
// // import { CgProfile, CgSearch, CgGitFork } from "react-icons/cg";
// // import { IoIosHome, IoIosColorPalette } from "react-icons/io";
// // import { VscSettingsGear } from "react-icons/vsc";
// // import { FaPenFancy } from "react-icons/fa";
// // import { MdPrint } from "react-icons/md";
// // import { useSelector } from "react-redux";
// // import { useRouter } from "next/navigation";
// // import { selectItems } from "@/lib/merchandise/state/slices/basketSlice";
// // import DarkModeToggle from "@/components/merchandise/DarkModeToggle";
// // import { useUserContext } from "@/lib/merchandise/features/UserContext";
// // import ZLogo from "@/lib/merchandise/ObinsunVectors/ZLogo";
// // import { logoutAction } from "@/actions/merchandise/logoutAction"; // Ensure these imports exist
// // import { checkSession } from "@/actions/merchandise/checkSession"; // Ensure these imports exist

// // interface HeaderProps {
// //     openModal: () => void;
// //     openSketch: () => void;
// // }

// // const Header: React.FC<HeaderProps> = ({ openModal, openSketch }) => {
// //     const [hasSession, setHasSession] = useState<any>(null);
// //     const { data: session, status } = useSession();
// //     const items = useSelector(selectItems);
// //     const router = useRouter();
// //     const { access } = useUserContext();

// //     const [menuOpen, setMenuOpen] = useState(false);
// //     const [closeMenu, setCloseMenu] = useState(false);

// //     const handleMenu = () => {
// //         setMenuOpen(!menuOpen);
// //     };

// //     const handleRoute = () => {
// //         if (menuOpen) {
// //             setCloseMenu(!closeMenu);
// //             handleMenu();
// //         }
// //     };

// //     // const handleLogMode = async () => {
// //     //     if (!session) {
// //     //         openModal();
// //     //     } else {
// //     //         await logoutAction();
// //     //         router.push("/merchandise");
// //     //     }
// //     // };

// //     const handleLogMode = async () => {
// //         if (!session) {
// //             openModal(); // Open login modal if not logged in
// //         } else {
// //             // Call the logout API route
// //             const response = await fetch("/api/merchandise/api/auth/logout", {
// //                 method: "POST",
// //             });

// //             if (response.ok) {
// //                 setHasSession(null); // Clear session state
// //                 router.push("/merchandise"); // Redirect to merchandise page
// //             } else {
// //                 console.error("Failed to log out");
// //             }
// //         }
// //     };

// //     useEffect(() => {
// //         const fetchSession = async () => {
// //             const activeSession = await checkSession();
// //             if (!activeSession) {
// //                 router.push("/merchandise");
// //             }
// //         };
// //         fetchSession();
// //     }, [session]);

// //     return (
// //         <>
// //             <header
// //                 className={`px-1 transition-all ease-in-out glass-container sticky ${
// //                     menuOpen
// //                         ? "h-[100vh] w-[100%] top-[0%] grow"
// //                         : "h-[10.3em] laptop:h-[11em] w-[80%] top-[3%] laptop-l:h-[9em]"
// //                 } z-[1000] overflow-hidden tablet:px-4`}
// //             >
// //                 <div className="relative flex vs:flex-col laptop-l:flex-row flex-col items-evenly p-3 flex-1 h-full w-full laptop-l:h-[10em]">
// //                     <div className="flex vs:flex-col flex-col laptop:flex-col laptop-l:flex-row laptop-l:flex-1 gap-1">
// //                         <div className="relative flex items-center justify-center pb-2 px-3 gap-1">
// //                             <Link href="/merchandise" passHref>
// //                                 <span className="flex items-center justify-center">
// //                                     <ZLogo
// //                                         id="logo"
// //                                         className="relative h-[5em] w-[5em] laptop:h-[6em] laptop:w-[6em] cursor-pointer flex items-center justify-center"
// //                                     />
// //                                     <h1 className="text-[3em] xs:text-[3.3em] mobile-l:text-[3.5em] tablet:text-[4.5em] laptop-l:text-[5.5em] flex items-center justify-center tracking-tight h-full w-full cursor-pointer">
// //                                         Obinsun
// //                                     </h1>
// //                                 </span>
// //                             </Link>
// //                             <DarkModeToggle />
// //                         </div>

// //                         <div className="flex vs:flex-col laptop:flex-col laptop-l:flex-col relative w-full items-center justify-evenly gap-[1em] laptop-l:gap-0 px-4 -mt-2  laptop-l:py-2 laptop-l:flex-1">
// //                             <div className="flex relative vs:h-full vs:w-full vs:items-center vs:justify-center vs:gap-[1em] laptop:h-full laptop:w-full laptop:items-center laptop:justify-center laptop:gap-[1em] laptop-l:h-full laptop-l:w-full laptop-l:items-center laptop-l:justify-center laptop-l:gap-[1em] laptop-l:flex-1">
// //                                 <div className="relative flex-2 flex items-center p-2 rounded-[0.625em] w-full bg-gray-800/20 dark:bg-gray-300/20 flex-2">
// //                                     <input
// //                                         className="w-full select-none border-none rounded-[0.625em] bg-gray-800/0 dark:bg-gray-300/0 outline-none p-1 placeholder-gray-800 dark:placeholder-[#4C8EFF]"
// //                                         placeholder="Search For Merch"
// //                                         type="text"
// //                                     />
// //                                     <CgSearch
// //                                         className="rounded-full cursor-pointer h-6 w-6"
// //                                         type="submit"
// //                                     />
// //                                 </div>
// //                                 <button
// //                                     className="flex-1 py-3 px-6 relative border border-gray-800/20 dark:border-gray-300/20 rounded-[0.625em] flex-2 hover:bg-gray-800 hover:text-gray-300 dark:hover:bg-[#4C8EFF] dark:hover:text-gray-300"
// //                                     type="button"
// //                                     onClick={handleLogMode}
// //                                 >
// //                                     <h2 className="relative z-50 h-full w-full">
// //                                         {session ? (
// //                                             <Link href="/merchandise">
// //                                                 Logout
// //                                             </Link>
// //                                         ) : (
// //                                             "Login"
// //                                         )}
// //                                     </h2>
// //                                 </button>

// //                                 <div className="relative w-full flex-[0.2] items-center justify-center">
// //                                     <div className="relative filter-container">
// //                                         <span className="relative filter-icon-list-container">
// //                                             <FaPenFancy
// //                                                 className="relative h-[2.5em] w-[2.5em] cursor-pointer"
// //                                                 onClick={openSketch}
// //                                             />
// //                                         </span>
// //                                     </div>
// //                                 </div>

// //                                 <div className="relative w-full flex-[0.2] items-center justify-center">
// //                                     <Link href="/merchandise/checkout">
// //                                         <div className="relative filter-container">
// //                                             <span className="relative filter-icon-list-container">
// //                                                 <BiCart className="relative h-[2.5em] w-[2.5em] cursor-pointer" />
// //                                                 <span className="z-50 pt-[0.125em] mobile-l:pt-[0.15em] pl-[0.05em] absolute flex items-center justify-center top-[0.1em] xs:top-[-0.025em] mobile-l:top-[0.2em] right-[-0.25em] vs:h-[1em] xs:h-[1.25em] vs:w-[1em] xs:w-[1.25em]  bg-gray-300/70 dark:bg-gray-800/70 text-center border-black dark:border-[#4C8EFF] border-[0.025em] rounded-full text-gray-800 dark:text-gray-300 text-xs mobile-l:text-sm font-bold">
// //                                                     {items.length}
// //                                                 </span>
// //                                             </span>
// //                                         </div>
// //                                     </Link>
// //                                 </div>

// //                                 <div className="relative flex-1 h-full w-full flex items-center justify-center">
// //                                     <div
// //                                         className="relative cursor-pointer transform h-[2em] w-[2em] flex items-center justify-center z-50"
// //                                         onClick={handleMenu}
// //                                     >
// //                                         <div
// //                                             className={`flex-1 transform duration-3000 translate-y-[1em] absolute top-0 left-0 menu-toggle ${
// //                                                 menuOpen
// //                                                     ? "before:translate-y-0 before:rotate-45 after:translate-y-0 after:rotate-[-45deg] after:shadow-active-menu after:dark:shadow-active-dark-menu "
// //                                                     : "before:translate-y-[-0.5em] before:rotate-0 after:translate-y-[0.5em] after:rotate-0"
// //                                             }`}
// //                                         />
// //                                     </div>
// //                                 </div>
// //                             </div>

// //                             <nav className="p-3 laptop-l:p-2 relative flex items-center laptop-l:content-evenly laptop-l:h-full laptop-l:w-full laptop-l:justify-evenly laptop-l:flex-1">
// //                                 <ul className="flex flex-col laptop-l:flex-row justify-center items-start laptop-l:items-center gap-[1em] relative ml-[0%] laptop-l:flex-1">
// //                                     <li className="filter-container flex-1">
// //                                         <span className="filter-icon-list-container">
// //                                             <Link href="/merchandise/wishlist">
// //                                                 <span className="filter-icon-glass-container">
// //                                                     <RiHeartFill
// //                                                         onClick={handleRoute}
// //                                                         className="filter-icon-size"
// //                                                     />
// //                                                 </span>
// //                                             </Link>
// //                                             <span className="filter-text-container laptop-l:hidden">
// //                                                 Wishlist
// //                                             </span>
// //                                         </span>
// //                                     </li>

// //                                     <li className="filter-container flex-1">
// //                                         <span className="filter                                        -icon-list-container">
// //                                             <Link href="/merchandise/orders">
// //                                                 <span className="filter-icon-glass-container">
// //                                                     <BiBook
// //                                                         onClick={handleRoute}
// //                                                         className="filter-icon-size"
// //                                                     />
// //                                                 </span>
// //                                             </Link>
// //                                             <span className="filter-text-container laptop-l:hidden">
// //                                                 Orders
// //                                             </span>
// //                                         </span>
// //                                     </li>

// //                                     {access("users", "read", "own").granted && (
// //                                         <li className="filter-container flex-1">
// //                                             <span className="filter-icon-list-container">
// //                                                 <Link href="/merchandise/profile">
// //                                                     <span className="filter-icon-glass-container">
// //                                                         <CgProfile
// //                                                             onClick={
// //                                                                 handleRoute
// //                                                             }
// //                                                             className="filter-icon-size"
// //                                                         />
// //                                                     </span>
// //                                                 </Link>
// //                                                 <span className="filter-text-container laptop-l:hidden">
// //                                                     Profile
// //                                                 </span>
// //                                             </span>
// //                                         </li>
// //                                     )}

// //                                     <li className="filter-container flex-1">
// //                                         <span className="filter-icon-list-container">
// //                                             <Link href="/merchandise/dashboard">
// //                                                 <span className="filter-icon-glass-container">
// //                                                     <IoIosHome
// //                                                         onClick={handleRoute}
// //                                                         className="filter-icon-size"
// //                                                     />
// //                                                 </span>
// //                                             </Link>
// //                                             <span className="filter-text-container laptop-l:hidden">
// //                                                 Shop
// //                                             </span>
// //                                         </span>
// //                                     </li>

// //                                     {access("users", "read", "any").granted && (
// //                                         <li className="filter-container flex-1">
// //                                             <span className="filter-icon-list-container">
// //                                                 <Link href="/merchandise/studio">
// //                                                     <span className="filter-icon-glass-container">
// //                                                         <IoIosColorPalette
// //                                                             onClick={
// //                                                                 handleRoute
// //                                                             }
// //                                                             className="filter-icon-size"
// //                                                         />
// //                                                     </span>
// //                                                 </Link>
// //                                                 <span className="filter-text-container laptop-l:hidden">
// //                                                     Studio
// //                                                 </span>
// //                                             </span>
// //                                         </li>
// //                                     )}

// //                                     {access("users", "read", "any").granted && (
// //                                         <li className="filter-container flex-1">
// //                                             <span className="filter-icon-list-container">
// //                                                 <Link href="/merchandise/print">
// //                                                     <span className="filter-icon-glass-container">
// //                                                         <MdPrint
// //                                                             onClick={
// //                                                                 handleRoute
// //                                                             }
// //                                                             className="filter-icon-size"
// //                                                         />
// //                                                     </span>
// //                                                 </Link>
// //                                                 <span className="filter-text-container laptop-l:hidden">
// //                                                     Print
// //                                                 </span>
// //                                             </span>
// //                                         </li>
// //                                     )}

// //                                     {access("users", "read", "any").granted && (
// //                                         <li className="filter-container flex-1">
// //                                             <span className="filter-icon-list-container">
// //                                                 <Link href="/merchandise/settings">
// //                                                     <span className="filter-icon-glass-container">
// //                                                         <VscSettingsGear
// //                                                             onClick={
// //                                                                 handleRoute
// //                                                             }
// //                                                             className="filter-icon-size"
// //                                                         />
// //                                                     </span>
// //                                                 </Link>
// //                                                 <span className="filter-text-container laptop-l:hidden">
// //                                                     Settings
// //                                                 </span>
// //                                             </span>
// //                                         </li>
// //                                     )}

// //                                     {access("app", "read", "any").granted && (
// //                                         <li className="filter-container flex-1">
// //                                             <span className="filter-icon-list-container">
// //                                                 <Link href="/merchandise/dev">
// //                                                     <span className="filter-icon-glass-container">
// //                                                         <CgGitFork
// //                                                             onClick={
// //                                                                 handleRoute
// //                                                             }
// //                                                             className="filter-icon-size"
// //                                                         />
// //                                                     </span>
// //                                                 </Link>
// //                                                 <span className="filter-text-container laptop-l:hidden">
// //                                                     Dev
// //                                                 </span>
// //                                             </span>
// //                                         </li>
// //                                     )}
// //                                 </ul>
// //                             </nav>
// //                         </div>
// //                     </div>
// //                 </div>
// //             </header>
// //         </>
// //     );
// // };

// // export default Header;

// "use client";

// import Link from "next/link";
// import React, { useEffect, useState } from "react";
// import { useSelector } from "react-redux";
// import { useRouter } from "next/navigation";
// import { selectItems } from "@/lib/merchandise/state/slices/basketSlice";
// import { useUserContext } from "@/lib/merchandise/features/UserContext";
// import { BiBook, BiCart } from "react-icons/bi";
// import { RiHeartFill } from "react-icons/ri";
// import { CgProfile, CgSearch, CgGitFork } from "react-icons/cg";
// import { IoIosHome, IoIosColorPalette } from "react-icons/io";
// import { VscSettingsGear } from "react-icons/vsc";
// import { FaPenFancy } from "react-icons/fa";
// import { MdPrint } from "react-icons/md";
// import DarkModeToggle from "@/components/merchandise/DarkModeToggle";
// import ZLogo from "@/lib/merchandise/ObinsunVectors/ZLogo";
// import { checkSession } from "@/actions/merchandise/checkSession";

// interface HeaderProps {
//     openModal: () => void;
//     openSketch: () => void;
// }

// const Header: React.FC<HeaderProps> = ({ openModal, openSketch }) => {
//     const [session, setSession] = useState<any>(null);
//     const items = useSelector(selectItems);
//     const router = useRouter();
//     const { access } = useUserContext();

//     useEffect(() => {
//         const fetchSession = async () => {
//             const sessionData = await checkSession();
//             setSession(sessionData);
//         };

//         fetchSession();
//     }, []);

//     const handleLogMode = async () => {
//         if (!session) {
//             openModal();
//         } else {
//             const response = await fetch("/api/merchandise/api/auth/logout", {
//                 method: "POST",
//             });

//             if (response.ok) {
//                 setSession(null);
//                 router.push("/merchandise");
//             } else {
//                 console.error("Failed to log out");
//             }
//         }
//     };

//     const quickSketch = (e: React.MouseEvent) => {
//         console.log("opening quick sketch...");
//         openSketch();
//     };

//     const [menuOpen, setMenuOpen] = useState(false);

//     const handleMenu = () => {
//         setMenuOpen(!menuOpen);
//     };

//     const handleRoute = () => {
//         if (menuOpen) {
//             handleMenu();
//         }
//     };

//     return (
//         <>
//             <header
//                 className={`px-1 transition-all ease-in-out glass-container sticky ${
//                     menuOpen
//                         ? "h-[100vh] w-[100%] top-[0%] grow"
//                         : "h-[10.3em] laptop:h-[11em] w-[80%] top-[3%] laptop-l:h-[9em]"
//                 } z-[1000] overflow-hidden tablet:px-4`}
//             >
//                 <div className="relative flex vs:flex-col laptop-l:flex-row flex-col items-evenly p-3 flex-1 h-full w-full laptop-l:h-[10em]">
//                     <div className="flex vs:flex-col flex-col laptop:flex-col laptop-l:flex-row laptop-l:flex-1 gap-1">
//                         <div className="relative flex items-center justify-center pb-2 px-3 gap-1">
//                             <Link href="/merchandise" passHref>
//                                 <span className="flex items-center justify-center">
//                                     <ZLogo
//                                         id="logo"
//                                         className="relative h-[5em] w-[5em] laptop:h-[6em] laptop:w-[6em] cursor-pointer flex items-center justify-center"
//                                     />
//                                     <h1 className="text-[3em] xs:text-[3.3em] mobile-l:text-[3.5em] tablet:text-[4.5em] laptop-l:text-[5.5em] flex items-center justify-center tracking-tight h-full w-full cursor-pointer">
//                                         Obinsun
//                                     </h1>
//                                 </span>
//                             </Link>
//                             <DarkModeToggle />
//                         </div>

//                         <div className="flex vs:flex-col laptop:flex-col laptop-l:flex-col relative w-full items-center justify-evenly gap-[1em] laptop-l:gap-0 px-4 -mt-2  laptop-l:py-2 laptop-l:flex-1">
//                             <div className="flex relative vs:h-full vs:w-full vs:items-center vs:justify-center vs:gap-[1em] laptop:h-full laptop:w-full laptop:items-center laptop:justify-center laptop:gap-[1em] laptop-l:h-full laptop-l:w-full laptop-l:items-center laptop-l:justify-center laptop-l:gap-[1em] laptop-l:flex-1">
//                                 <div className="relative flex-2 flex items-center p-2 rounded-[0.625em] w-full bg-gray-800/20 dark:bg-gray-300/20 flex-2">
//                                     <input
//                                         className="w-full select-none border-none rounded-[0.625em] bg-gray-800/0 dark:bg-gray-300/0 outline-none p-1 placeholder-gray-800 dark:placeholder-[#4C8EFF]"
//                                         placeholder="Search For Merch"
//                                         type="text"
//                                     />
//                                     <CgSearch
//                                         className="rounded-full cursor-pointer h-6 w-6"
//                                         type="submit"
//                                     />
//                                 </div>
//                                 <button
//                                     className="flex-1 py-3 px-6 relative border border-gray-800/20 dark:border-gray-300/20 rounded-[0.625em] flex-2 hover:bg-gray-800 hover:text-gray-300 dark:hover:bg-[#4C8EFF] dark:hover:text-gray-300"
//                                     type="button"
//                                     onClick={handleLogMode}
//                                 >
//                                     <h2 className="relative z-50 h-full w-full">
//                                         {session ? "Logout" : "Login"}
//                                     </h2>
//                                 </button>

//                                 <div className="relative w-full flex-[0.2] items-center justify-center">
//                                     <div className="relative filter-container">
//                                         <span className="relative filter-icon-list-container">
//                                             <FaPenFancy
//                                                 className="relative h-[2.5em] w-[2.5em] cursor-pointer"
//                                                 onClick={quickSketch}
//                                             />
//                                         </span>
//                                     </div>
//                                 </div>

//                                 <div className="relative w-full flex-[0.2] items-center justify-center">
//                                     <Link href="/merchandise/checkout">
//                                         <div className="relative filter-container">
//                                             <span className="relative filter-icon-list-container">
//                                                 <BiCart className="relative h-[2.5em] w-[2.5em] cursor-pointer" />
//                                                 <span className="z-50 pt-[0.125em] mobile-l:pt-[0.15em] pl-[0.05em] absolute flex items-center justify-center top-[0.1em] xs:top-[-0.025em] mobile-l:top-[0.2em] right-[-0.25em] vs:h-[1em] xs:h-[1.25em] vs:w-[1em] xs:w-[1.25em]  bg-gray-300/70 dark:bg-gray-800/70 text-center border-black dark:border-[#4C8EFF] border-[0.025em] rounded-full text-gray-800 dark:text-gray-300 text-xs mobile-l:text-sm font-bold">
//                                                     {items.length}
//                                                 </span>
//                                             </span>
//                                         </div>
//                                     </Link>
//                                 </div>

//                                 <div className="relative flex-1 h-full w-full flex items-center justify-center">
//                                     <div
//                                         className="relative cursor-pointer transform h-[2em] w-[2em] flex items-center justify-center z-50"
//                                         onClick={handleMenu}
//                                     >
//                                         <div
//                                             className={`flex-1 transform duration-3000 translate-y-[1em] absolute top-0 left-0 menu-toggle ${
//                                                 menuOpen
//                                                     ? "before:translate-y-0 before:rotate-45 after:translate-y-0 after:rotate-[-45deg] after:shadow-active-menu after:dark:shadow-active-dark-menu "
//                                                     : "before:translate-y-[-0.5em] before:rotate-0 after:translate-y-[0.5em] after:rotate-0"
//                                             }`}
//                                         />
//                                     </div>
//                                 </div>
//                             </div>

//                             <nav className="p-3 laptop-l:p-2 relative flex items-center laptop-l:content-evenly laptop-l:h-full laptop-l:w-full laptop-l:justify-evenly laptop-l:flex-1">
//                                 <ul className="flex flex-col laptop-l:flex-row justify-center items-start laptop-l:items-center gap-[1em] relative ml-[0%] laptop-l:flex-1">
//                                     <li className="filter-container flex-1">
//                                         <span className="filter-icon-list-container">
//                                             <Link href="/merchandise/wishlist">
//                                                 <span className="filter-icon-glass-container">
//                                                     <RiHeartFill
//                                                         onClick={handleRoute}
//                                                         className="filter-icon-size"
//                                                     />
//                                                 </span>
//                                             </Link>
//                                             <span className="filter-text-container laptop-l:hidden">
//                                                 Wishlist
//                                             </span>
//                                         </span>
//                                     </li>

//                                     <li className="filter-container flex-1">
//                                         <span className="filter-icon-list-container">
//                                             <Link href="/merchandise/orders">
//                                                 <span className="filter-icon-glass-container">
//                                                     <BiBook
//                                                         onClick={handleRoute}
//                                                         className="filter-icon-size"
//                                                     />
//                                                 </span>
//                                             </Link>
//                                             <span className="filter-text-container laptop-l:hidden">
//                                                 Orders
//                                             </span>
//                                         </span>
//                                     </li>

//                                     {access("users", "read", "own").granted && (
//                                         <li className="filter-container flex-1">
//                                             <span className="filter-icon-list-container">
//                                                 <Link href="/merchandise/profile">
//                                                     <span className="filter-icon-glass-container">
//                                                         <CgProfile
//                                                             onClick={
//                                                                 handleRoute
//                                                             }
//                                                             className="filter-icon-size"
//                                                         />
//                                                     </span>
//                                                 </Link>
//                                                 <span className="filter-text-container laptop-l:hidden">
//                                                     Profile
//                                                 </span>
//                                             </span>
//                                         </li>
//                                     )}

//                                     <li className="filter-container flex-1">
//                                         <span className="filter-icon-list-container">
//                                             <Link href="/merchandise/dashboard">
//                                                 <span className="filter-icon-glass-container">
//                                                     <IoIosHome
//                                                         onClick={handleRoute}
//                                                         className="filter-icon-size"
//                                                     />
//                                                 </span>
//                                             </Link>
//                                             <span className="filter-text-container laptop-l:hidden">
//                                                 Shop
//                                             </span>
//                                         </span>
//                                     </li>

//                                     {access("users", "read", "any").granted && (
//                                         <li className="filter-container flex-1">
//                                             <span className="filter-icon-list-container">
//                                                 <Link href="/merchandise/studio">
//                                                     <span className="filter-icon-glass-container">
//                                                         <IoIosColorPalette
//                                                             onClick={
//                                                                 handleRoute
//                                                             }
//                                                             className="filter-icon-size"
//                                                         />
//                                                     </span>
//                                                 </Link>
//                                                 <span className="filter-text-container laptop-l:hidden">
//                                                     Studio
//                                                 </span>
//                                             </span>
//                                         </li>
//                                     )}

//                                     {access("users", "read", "any").granted && (
//                                         <li className="filter-container flex-1">
//                                             <span className="filter-icon-list-container">
//                                                 <Link href="/merchandise/print">
//                                                     <span className="filter-icon-glass-container">
//                                                         <MdPrint
//                                                             onClick={
//                                                                 handleRoute
//                                                             }
//                                                             className="filter-icon-size"
//                                                         />
//                                                     </span>
//                                                 </Link>
//                                                 <span className="filter-text-container laptop-l:hidden">
//                                                     Print
//                                                 </span>
//                                             </span>
//                                         </li>
//                                     )}

//                                     {access("users", "read", "any").granted && (
//                                         <li className="filter-container flex-1">
//                                             <span className="filter-icon-list-container">
//                                                 <Link href="/merchandise/settings">
//                                                     <span className="filter-icon-glass-container">
//                                                         <VscSettingsGear
//                                                             onClick={
//                                                                 handleRoute
//                                                             }
//                                                             className="filter-icon-size"
//                                                         />
//                                                     </span>
//                                                 </Link>
//                                                 <span className="filter-text-container laptop-l:hidden">
//                                                     Settings
//                                                 </span>
//                                             </span>
//                                         </li>
//                                     )}

//                                     {access("app", "read", "any").granted && (
//                                         <li className="filter-container flex-1">
//                                             <span className="filter-icon-list-container">
//                                                 <Link href="/merchandise/dev">
//                                                     <span className="filter-icon-glass-container">
//                                                         <CgGitFork
//                                                             onClick={
//                                                                 handleRoute
//                                                             }
//                                                             className="filter-icon-size"
//                                                         />
//                                                     </span>
//                                                 </Link>
//                                                 <span className="filter-text-container laptop-l:hidden">
//                                                     Dev
//                                                 </span>
//                                             </span>
//                                         </li>
//                                     )}
//                                 </ul>
//                             </nav>
//                         </div>
//                     </div>
//                 </div>
//             </header>
//         </>
//     );
// };

// export default Header;

"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { selectItems } from "@/lib/merchandise/state/slices/basketSlice";
import { useUserContext } from "@/lib/merchandise/features/UserContext";
import { BiBook, BiCart } from "react-icons/bi";
import { RiHeartFill } from "react-icons/ri";
import { CgProfile, CgSearch, CgGitFork } from "react-icons/cg";
import { IoIosHome, IoIosColorPalette } from "react-icons/io";
import { VscSettingsGear } from "react-icons/vsc";
import { FaPenFancy } from "react-icons/fa";
import { MdPrint } from "react-icons/md";
import DarkModeToggle from "@/components/merchandise/DarkModeToggle";
import ZLogo from "@/lib/merchandise/ObinsunVectors/ZLogo";
import { checkSession } from "@/actions/merchandise/checkSession";

interface HeaderProps {
    openModal: () => void;
    openSketch: () => void;
}

const Header: React.FC<HeaderProps> = ({ openModal, openSketch }) => {
    const [session, setSession] = useState<any>(null);
    const items = useSelector(selectItems);
    const router = useRouter();
    const { access } = useUserContext();

    useEffect(() => {
        const fetchSession = async () => {
            const sessionData = await checkSession();
            console.log("CURRENT SESSION DATA >>>> ", sessionData);
            setSession(sessionData);
        };
        console.log("THE SESSION >>>> ", session);

        fetchSession();
    }, []);

    const handleLogMode = async () => {
        if (!session) {
            openModal();
        } else {
            // Clear the session on the server side
            const response = await fetch("/api/merchandise/api/auth/logout", {
                method: "POST",
            });

            if (response.ok) {
                // Clear session state on the client side
                setSession(null);
                router.push("/merchandise");
            } else {
                console.error("Failed to log out");
            }
        }
    };

    const quickSketch = (e: React.MouseEvent) => {
        console.log("opening quick sketch...");
        openSketch();
    };

    const [menuOpen, setMenuOpen] = useState(false);

    const handleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    const handleRoute = () => {
        if (menuOpen) {
            handleMenu();
        }
    };

    useEffect(() => {
        console.log("SESSION STATUS >>>> ", session);
    }, []);

    return (
        <>
            <header
                className={`px-1 transition-all ease-in-out glass-container sticky ${
                    menuOpen
                        ? "h-[100vh] w-[100%] top-[0%] grow"
                        : "h-[10.3em] laptop:h-[11em] w-[80%] top-[3%] laptop-l:h-[9em]"
                } z-[1000] overflow-hidden tablet:px-4`}
            >
                <div className="relative flex vs:flex-col laptop-l:flex-row flex-col items-evenly p-3 flex-1 h-full w-full laptop-l:h-[10em]">
                    <div className="flex vs:flex-col flex-col laptop:flex-col laptop-l:flex-row laptop-l:flex-1 gap-1">
                        <div className="relative flex items-center justify-center pb-2 px-3 gap-1">
                            <Link href="/merchandise" passHref>
                                <span className="flex items-center justify-center">
                                    <ZLogo
                                        id="logo"
                                        className="relative h-[5em] w-[5em] laptop:h-[6em] laptop:w-[6em] cursor-pointer flex items-center justify-center"
                                    />
                                    <h1 className="text-[3em] xs:text-[3.3em] mobile-l:text-[3.5em] tablet:text-[4.5em] laptop-l:text-[5.5em] flex items-center justify-center tracking-tight h-full w-full cursor-pointer">
                                        Obinsun
                                    </h1>
                                </span>
                            </Link>
                            <DarkModeToggle />
                        </div>

                        <div className="flex vs:flex-col laptop:flex-col laptop-l:flex-col relative w-full items-center justify-evenly gap-[1em] laptop-l:gap-0 px-4 -mt-2  laptop-l:py-2 laptop-l:flex-1">
                            <div className="flex relative vs:h-full vs:w-full vs:items-center vs:justify-center vs:gap-[1em] laptop:h-full laptop:w-full laptop:items-center laptop:justify-center laptop:gap-[1em] laptop-l:h-full laptop-l:w-full laptop-l:items-center laptop-l:justify-center laptop-l:gap-[1em] laptop-l:flex-1">
                                <div className="relative flex-2 flex items-center p-2 rounded-[0.625em] w-full bg-gray-800/20 dark:bg-gray-300/20 flex-2">
                                    <input
                                        className="w-full select-none border-none rounded-[0.625em] bg-gray-800/0 dark:bg-gray-300/0 outline-none p-1 placeholder-gray-800 dark:placeholder-[#4C8EFF]"
                                        placeholder="Search For Merch"
                                        type="text"
                                    />
                                    <CgSearch
                                        className="rounded-full cursor-pointer h-6 w-6"
                                        type="submit"
                                    />
                                </div>
                                <button
                                    className="flex-1 py-3 px-6 relative border border-gray-800/20 dark:border-gray-300/20 rounded-[0.625em] flex-2 hover:bg-gray-800 hover:text-gray-300 dark:hover:bg-[#4C8EFF] dark:hover:text-gray-300"
                                    type="button"
                                    onClick={handleLogMode}
                                >
                                    <h2 className="relative z-50 h-full w-full">
                                        {session ? "Logout" : "Login"}
                                    </h2>
                                </button>

                                <div className="relative w-full flex-[0.2] items-center justify-center">
                                    <div className="relative filter-container">
                                        <span className="relative filter-icon-list-container">
                                            <FaPenFancy
                                                className="relative h-[2.5em] w-[2.5em] cursor-pointer"
                                                onClick={quickSketch}
                                            />
                                        </span>
                                    </div>
                                </div>

                                <div className="relative w-full flex-[0.2] items-center justify-center">
                                    <Link href="/merchandise/checkout">
                                        <div className="relative filter-container">
                                            <span className="relative filter-icon-list-container">
                                                <BiCart className="relative h-[2.5em] w-[2.5em] cursor-pointer" />
                                                <span className="z-50 pt-[0.125em] mobile-l:pt-[0.15em] pl-[0.05em] absolute flex items-center justify-center top-[0.1em] xs:top-[-0.025em] mobile-l:top-[0.2em] right-[-0.25em] vs:h-[1em] xs:h-[1.25em] vs:w-[1em] xs:w-[1.25em]  bg-gray-300/70 dark:bg-gray-800/70 text-center border-black dark:border-[#4C8EFF] border-[0.025em] rounded-full text-gray-800 dark:text-gray-300 text-xs mobile-l:text-sm font-bold">
                                                    {items.length}
                                                </span>
                                            </span>
                                        </div>
                                    </Link>
                                </div>

                                <div className="relative flex-1 h-full w-full flex items-center justify-center">
                                    <div
                                        className="relative cursor-pointer transform h-[2em] w-[2em] flex items-center justify-center z-50"
                                        onClick={handleMenu}
                                    >
                                        <div
                                            className={`flex-1 transform duration-3000 translate-y-[1em] absolute top-0 left-0 menu-toggle ${
                                                menuOpen
                                                    ? "before:translate-y-0 before:rotate-45 after:translate-y-0 after:rotate-[-45deg] after:shadow-active-menu after:dark:shadow-active-dark-menu "
                                                    : "before:translate-y-[-0.5em] before:rotate-0 after:translate-y-[0.5em] after:rotate-0"
                                            }`}
                                        />
                                    </div>
                                </div>
                            </div>

                            <nav className="p-3 laptop-l:p-2 relative flex items-center laptop-l:content-evenly laptop-l:h-full laptop-l:w-full laptop-l:justify-evenly laptop-l:flex-1">
                                <ul className="flex flex-col laptop-l:flex-row justify-center items-start laptop-l:items-center gap-[1em] relative ml-[0%] laptop-l:flex-1">
                                    <li className="filter-container flex-1">
                                        <span className="filter-icon-list-container">
                                            <Link href="/merchandise/wishlist">
                                                <span className="filter-icon-glass-container">
                                                    <RiHeartFill
                                                        onClick={handleRoute}
                                                        className="filter-icon-size"
                                                    />
                                                </span>
                                            </Link>
                                            <span className="filter-text-container laptop-l:hidden">
                                                Wishlist
                                            </span>
                                        </span>
                                    </li>

                                    <li className="filter-container flex-1">
                                        <span className="filter-icon-list-container">
                                            <Link href="/merchandise/orders">
                                                <span className="filter-icon-glass-container">
                                                    <BiBook
                                                        onClick={handleRoute}
                                                        className="filter-icon-size"
                                                    />
                                                </span>
                                            </Link>
                                            <span className="filter-text-container laptop-l:hidden">
                                                Orders
                                            </span>
                                        </span>
                                    </li>

                                    {access("users", "read", "own").granted && (
                                        <li className="filter-container flex-1">
                                            <span className="filter-icon-list-container">
                                                <Link href="/merchandise/profile">
                                                    <span className="filter-icon-glass-container">
                                                        <CgProfile
                                                            onClick={
                                                                handleRoute
                                                            }
                                                            className="filter-icon-size"
                                                        />
                                                    </span>
                                                </Link>
                                                <span className="filter-text-container laptop-l:hidden">
                                                    Profile
                                                </span>
                                            </span>
                                        </li>
                                    )}

                                    <li className="filter-container flex-1">
                                        <span className="filter-icon-list-container">
                                            <Link href="/merchandise/dashboard">
                                                <span className="filter-icon-glass-container">
                                                    <IoIosHome
                                                        onClick={handleRoute}
                                                        className="filter-icon-size"
                                                    />
                                                </span>
                                            </Link>
                                            <span className="filter-text-container laptop-l:hidden">
                                                Shop
                                            </span>
                                        </span>
                                    </li>

                                    {access("users", "read", "any").granted && (
                                        <li className="filter-container flex-1">
                                            <span className="filter-icon-list-container">
                                                <Link href="/merchandise/studio">
                                                    <span className="filter-icon-glass-container">
                                                        <IoIosColorPalette
                                                            onClick={
                                                                handleRoute
                                                            }
                                                            className="filter-icon-size"
                                                        />
                                                    </span>
                                                </Link>
                                                <span className="filter-text-container laptop-l:hidden">
                                                    Studio
                                                </span>
                                            </span>
                                        </li>
                                    )}

                                    {access("users", "read", "any").granted && (
                                        <li className="filter-container flex-1">
                                            <span className="filter-icon-list-container">
                                                <Link href="/merchandise/print">
                                                    <span className="filter-icon-glass-container">
                                                        <MdPrint
                                                            onClick={
                                                                handleRoute
                                                            }
                                                            className="filter-icon-size"
                                                        />
                                                    </span>
                                                </Link>
                                                <span className="filter-text-container laptop-l:hidden">
                                                    Print
                                                </span>
                                            </span>
                                        </li>
                                    )}

                                    {access("users", "read", "any").granted && (
                                        <li className="filter-container flex-1">
                                            <span className="filter-icon-list-container">
                                                <Link href="/merchandise/settings">
                                                    <span className="filter-icon-glass-container">
                                                        <VscSettingsGear
                                                            onClick={
                                                                handleRoute
                                                            }
                                                            className="filter-icon-size"
                                                        />
                                                    </span>
                                                </Link>
                                                <span className="filter-text-container laptop-l:hidden">
                                                    Settings
                                                </span>
                                            </span>
                                        </li>
                                    )}

                                    {access("app", "read", "any").granted && (
                                        <li className="filter-container flex-1">
                                            <span className="filter-icon-list-container">
                                                <Link href="/merchandise/dev">
                                                    <span className="filter-icon-glass-container">
                                                        <CgGitFork
                                                            onClick={
                                                                handleRoute
                                                            }
                                                            className="filter-icon-size"
                                                        />
                                                    </span>
                                                    <span className="filter-text-container laptop-l:hidden">
                                                        Dev
                                                    </span>
                                                </Link>
                                            </span>
                                        </li>
                                    )}
                                </ul>
                            </nav>
                        </div>
                    </div>
                </div>
            </header>
        </>
    );
};

export default Header;
