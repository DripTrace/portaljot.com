// "use client";

// import SipComponent from "@/components/LLPMG/sip/SipComponent";
// import React, { useState, useEffect, useCallback } from "react";
// import { useRouter, useSearchParams } from "next/navigation";

// const SipPage = () => {
//     const [callActive, setCallActive] = useState(false);
//     const [isAuthenticating, setIsAuthenticating] = useState(false);
//     const [tokenData, setTokenData] = useState<any>(null);
//     const router = useRouter();
//     const searchParams = useSearchParams();

//     useEffect(() => {
//         // Check if token data is already available in localStorage
//         const storedTokenData = localStorage.getItem("rcTokenData");
//         if (storedTokenData) {
//             const parsedTokenData = JSON.parse(storedTokenData);
//             setTokenData(parsedTokenData);
//             console.log(
//                 "Token data found in localStorage. Using stored token."
//             );
//         } else {
//             const code = searchParams?.get("code");
//             const state = searchParams?.get("state");
//             const tokenDataParam = searchParams?.get("tokenData");

//             if (tokenDataParam) {
//                 const parsedTokenData = JSON.parse(
//                     decodeURIComponent(tokenDataParam)
//                 );
//                 localStorage.setItem(
//                     "rcTokenData",
//                     JSON.stringify(parsedTokenData)
//                 );
//                 setTokenData(parsedTokenData);
//                 router.replace("/llpmg/sip"); // Redirect without the token in the URL
//             }

//             if (code && state) {
//                 handleAuthCallback(code, state);
//             }
//         }
//     }, [searchParams, router]);

//     const handleHangup = useCallback(() => {
//         console.log("Call ended");
//         setCallActive(false);
//     }, []);

//     const initiateAuth = useCallback(async () => {
//         setIsAuthenticating(true);
//         try {
//             const response = await fetch("/api/llpmg/sip-auth");
//             if (!response.ok) {
//                 throw new Error(`HTTP error! status: ${response.status}`);
//             }
//             const data = await response.json();

//             if (data.loginUrl && data.codeVerifier) {
//                 localStorage.setItem("codeVerifier", data.codeVerifier);
//                 console.log("Redirecting to:", data.loginUrl);
//                 window.location.href = data.loginUrl;
//             } else {
//                 throw new Error("Login URL or code verifier not provided");
//             }
//         } catch (error) {
//             console.error("Failed to initiate authorization:", error);
//             setIsAuthenticating(false);
//         }
//     }, []);

//     const handleAuthCallback = useCallback(
//         async (code: string, state: string) => {
//             const storedCodeVerifier = localStorage.getItem("codeVerifier");
//             if (!storedCodeVerifier) {
//                 console.error("Code verifier not found in local storage");
//                 return;
//             }

//             try {
//                 const response = await fetch("/api/llpmg/sip-auth", {
//                     method: "POST",
//                     headers: {
//                         "Content-Type": "application/json",
//                     },
//                     body: JSON.stringify({
//                         code,
//                         state: storedCodeVerifier,
//                     }),
//                 });

//                 if (!response.ok) {
//                     throw new Error(`HTTP error! status: ${response.status}`);
//                 }

//                 const data = await response.json();

//                 if (data.tokenData) {
//                     setTokenData(data.tokenData);
//                     localStorage.setItem(
//                         "rcTokenData",
//                         JSON.stringify(data.tokenData)
//                     );
//                     setIsAuthenticating(false);
//                     router.replace("/llpmg/sip"); // Redirect to the page after storing the token
//                 } else {
//                     throw new Error("Token data not provided");
//                 }
//             } catch (error) {
//                 console.error("Failed to complete authorization:", error);
//                 setIsAuthenticating(false);
//             } finally {
//                 localStorage.removeItem("codeVerifier");
//             }
//         },
//         [router]
//     );

//     const handleLogout = () => {
//         localStorage.removeItem("rcTokenData");
//         setTokenData(null);
//         router.refresh(); // Refresh the current page to effectively "reload" it
//     };

//     useEffect(() => {
//         const rcTokenData = localStorage.getItem("rcTokenData");

//         if (rcTokenData) {
//             console.log("Using saved token data from localStorage.");
//             setTokenData(JSON.parse(rcTokenData));
//         } else {
//             const tokenDataParam = searchParams?.get("tokenData");
//             if (tokenDataParam) {
//                 const parsedTokenData = JSON.parse(
//                     decodeURIComponent(tokenDataParam)
//                 );
//                 localStorage.setItem(
//                     "rcTokenData",
//                     JSON.stringify(parsedTokenData)
//                 );
//                 setTokenData(parsedTokenData);
//                 router.replace("/llpmg/sip");
//             } else {
//                 console.log("No tokenData found in localStorage or URL.");
//             }
//         }
//     }, [searchParams, router]);

//     return (
//         <>
//             {isAuthenticating ? (
//                 <div>Authenticating...</div>
//             ) : (
//                 <SipComponent
//                     onHangup={handleHangup}
//                     initiateAuth={initiateAuth}
//                     tokenData={tokenData}
//                     onLogout={handleLogout}
//                     setTokenData={setTokenData}
//                 />
//             )}
//         </>
//     );
// };

// export default SipPage;

// "use client";

// import SipComponent from "@/components/LLPMG/sip/SipComponent";
// import React, { useState, useEffect, useCallback } from "react";
// import { useRouter, useSearchParams } from "next/navigation";
// import SipErrorBoundary from "@/components/LLPMG/sip/SipErrorBoundary";

// const SipPage = () => {
//     const [callActive, setCallActive] = useState(false);
//     const [isAuthenticating, setIsAuthenticating] = useState(false);
//     const [tokenData, setTokenData] = useState<any>(null);
//     const router = useRouter();
//     const searchParams = useSearchParams();

//     useEffect(() => {
//         // Check if token data is already available in localStorage
//         const storedTokenData = localStorage.getItem("rcTokenData");
//         if (storedTokenData) {
//             const parsedTokenData = JSON.parse(storedTokenData);
//             setTokenData(parsedTokenData);
//             console.log(
//                 "Token data found in localStorage. Using stored token."
//             );
//         } else {
//             const code = searchParams?.get("code");
//             const state = searchParams?.get("state");
//             const tokenDataParam = searchParams?.get("tokenData");

//             if (tokenDataParam) {
//                 const parsedTokenData = JSON.parse(
//                     decodeURIComponent(tokenDataParam)
//                 );
//                 localStorage.setItem(
//                     "rcTokenData",
//                     JSON.stringify(parsedTokenData)
//                 );
//                 setTokenData(parsedTokenData);
//                 router.replace("/llpmg/sip"); // Redirect without the token in the URL
//             }

//             if (code && state) {
//                 handleAuthCallback(code, state);
//             }
//         }
//     }, [searchParams, router]);

//     const handleHangup = useCallback(() => {
//         console.log("Call ended");
//         setCallActive(false);
//     }, []);

//     const initiateAuth = useCallback(async () => {
//         setIsAuthenticating(true);
//         try {
//             const response = await fetch("/api/llpmg/sip-auth");
//             if (!response.ok) {
//                 throw new Error(`HTTP error! status: ${response.status}`);
//             }
//             const data = await response.json();

//             if (data.loginUrl && data.codeVerifier) {
//                 localStorage.setItem("codeVerifier", data.codeVerifier);
//                 console.log("Redirecting to:", data.loginUrl);
//                 window.location.href = data.loginUrl;
//             } else {
//                 throw new Error("Login URL or code verifier not provided");
//             }
//         } catch (error) {
//             console.error("Failed to initiate authorization:", error);
//             setIsAuthenticating(false);
//         }
//     }, []);

//     const handleAuthCallback = useCallback(
//         async (code: string, state: string) => {
//             const storedCodeVerifier = localStorage.getItem("codeVerifier");
//             if (!storedCodeVerifier) {
//                 console.error("Code verifier not found in local storage");
//                 return;
//             }

//             try {
//                 const response = await fetch("/api/llpmg/sip-auth", {
//                     method: "POST",
//                     headers: {
//                         "Content-Type": "application/json",
//                     },
//                     body: JSON.stringify({
//                         code,
//                         state: storedCodeVerifier,
//                     }),
//                 });

//                 if (!response.ok) {
//                     throw new Error(`HTTP error! status: ${response.status}`);
//                 }

//                 const data = await response.json();

//                 if (data.tokenData) {
//                     setTokenData(data.tokenData);
//                     localStorage.setItem(
//                         "rcTokenData",
//                         JSON.stringify(data.tokenData)
//                     );
//                     setIsAuthenticating(false);
//                     router.replace("/llpmg/sip"); // Redirect to the page after storing the token
//                 } else {
//                     throw new Error("Token data not provided");
//                 }
//             } catch (error) {
//                 console.error("Failed to complete authorization:", error);
//                 setIsAuthenticating(false);
//             } finally {
//                 localStorage.removeItem("codeVerifier");
//             }
//         },
//         [router]
//     );

//     const handleLogout = () => {
//         localStorage.removeItem("rcTokenData");
//         setTokenData(null);
//         router.refresh(); // Refresh the current page to effectively "reload" it
//     };

//     useEffect(() => {
//         const rcTokenData = localStorage.getItem("rcTokenData");

//         if (rcTokenData) {
//             console.log("Using saved token data from localStorage.");
//             setTokenData(JSON.parse(rcTokenData));
//         } else {
//             const tokenDataParam = searchParams?.get("tokenData");
//             if (tokenDataParam) {
//                 const parsedTokenData = JSON.parse(
//                     decodeURIComponent(tokenDataParam)
//                 );
//                 localStorage.setItem(
//                     "rcTokenData",
//                     JSON.stringify(parsedTokenData)
//                 );
//                 setTokenData(parsedTokenData);
//                 router.replace("/llpmg/sip");
//             } else {
//                 console.log("No tokenData found in localStorage or URL.");
//             }
//         }
//     }, [searchParams, router]);

//     return (
//         <SipErrorBoundary>
//             {isAuthenticating ? (
//                 <div>Authenticating...</div>
//             ) : (
//                 <SipComponent
//                     onHangup={handleHangup}
//                     initiateAuth={initiateAuth}
//                     tokenData={tokenData}
//                     onLogout={handleLogout}
//                     setTokenData={setTokenData}
//                 />
//             )}
//         </SipErrorBoundary>
//     );
// };

// export default SipPage;

import { Suspense } from "react";
import dynamic from "next/dynamic";
import SipErrorBoundary from "@/components/LLPMG/sip/SipErrorBoundary";

const DynamicSipContent = dynamic(
    () => import("@/components/LLPMG/sip/SipContent"),
    {
        ssr: false,
    }
);

const SipPage = () => {
    return (
        // <SipErrorBoundary>
        <Suspense fallback={<div>Loading...</div>}>
            <DynamicSipContent />
        </Suspense>
        // </SipErrorBoundary>
    );
};

export default SipPage;
