// "use client";

// import React, { useState, useEffect } from "react";

// interface SipProps {
//     onHangup: () => void;
//     tokenData: any;
//     onLogout: () => void;
//     setTokenData: (data: any) => void;
// }

// const Sip: React.FC<SipProps> = ({ onHangup, tokenData, onLogout }) => {
//     const [outgoingNumber, setOutgoingNumber] = useState<string>("");
//     const [connectionError, setConnectionError] = useState<string | null>(null);
//     const [callActive, setCallActive] = useState(false);

//     const handleOutgoingCall = async () => {
//         try {
//             const response = await fetch("/api/llpmg/sip-handler", {
//                 method: "POST",
//                 headers: {
//                     "Content-Type": "application/json",
//                 },
//                 body: JSON.stringify({ callee: outgoingNumber }),
//             });

//             if (!response.ok) {
//                 throw new Error(`HTTP error! status: ${response.status}`);
//             }

//             const data = await response.json();
//             console.log("Call initiated with Call ID:", data.callId);
//             setCallActive(true);
//         } catch (error) {
//             console.error("Failed to initiate call:", error);
//             setConnectionError((error as Error).message);
//         }
//     };

//     useEffect(() => {
//         if (tokenData) {
//             console.log("Token data is available, SIP setup can proceed.");
//         }
//     }, [tokenData]);

//     return (
//         <div className="bg-black min-h-screen flex items-center justify-center p-6">
//             <div className="bg-opacity-70 bg-gray-800 backdrop-blur-lg p-8 rounded-3xl shadow-lg w-full max-w-md">
//                 {connectionError && (
//                     <div className="text-red-500 text-sm">
//                         {connectionError}
//                     </div>
//                 )}
//                 <>
//                     <h3 className="text-white text-2xl mb-6">
//                         LLPMG WebPhone Dashboard
//                     </h3>
//                     <button
//                         onClick={onLogout}
//                         className="text-sm text-gray-400 hover:text-white"
//                     >
//                         Logout
//                     </button>
//                     {!callActive && (
//                         <div className="outgoing-call mt-4">
//                             <h4 className="text-white text-xl mb-3">
//                                 Outgoing Call
//                             </h4>
//                             <input
//                                 type="text"
//                                 value={outgoingNumber}
//                                 onChange={(e) =>
//                                     setOutgoingNumber(e.target.value)
//                                 }
//                                 placeholder="+1 234 567-8900"
//                                 className="w-full p-2 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
//                             />
//                             <div className="grid grid-cols-2 gap-4 mt-4">
//                                 <button
//                                     onClick={handleOutgoingCall}
//                                     className="py-2 bg-gradient-to-r from-green-400 to-blue-500 text-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300"
//                                 >
//                                     Call
//                                 </button>
//                             </div>
//                         </div>
//                     )}
//                     {callActive && (
//                         <div className="active-call mt-6">
//                             <h4 className="text-white text-xl mb-4">
//                                 Call In Progress
//                             </h4>
//                             <button
//                                 onClick={onHangup}
//                                 className="col-span-2 py-2 bg-red-500 text-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300"
//                             >
//                                 Hang Up
//                             </button>
//                         </div>
//                     )}
//                 </>
//             </div>
//         </div>
//     );
// };

// export default Sip;

// outgoing works no in and out audio
"use client";

import React, { useState, useEffect, useCallback } from "react";

interface SipProps {
    onHangup: () => void;
    tokenData: any;
    onLogout: () => void;
    setTokenData: (data: any) => void;
}

const SipOut: React.FC<SipProps> = ({ onHangup, tokenData, onLogout }) => {
    const [state, setState] = useState({
        outgoingNumber: "",
        connectionError: null as string | null,
        callActive: false,
        incomingCall: false,
        callerNumber: "",
    });

    const checkIncomingCall = useCallback(async () => {
        try {
            const response = await fetch("/api/llpmg/check-incoming-call");
            const data = await response.json();
            if (data.callerNumber) {
                setState((prevState) => ({
                    ...prevState,
                    incomingCall: true,
                    callerNumber: data.callerNumber,
                }));
                console.log("Incoming call detected:", data.callerNumber);
            }
        } catch (error) {
            console.error("Error checking for incoming call:", error);
        }
    }, []);

    useEffect(() => {
        const interval = setInterval(checkIncomingCall, 200);
        return () => clearInterval(interval);
    }, [checkIncomingCall]);

    const handleOutgoingCall = async () => {
        try {
            const response = await fetch("/api/llpmg/sip-handler", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    callee: state.outgoingNumber,
                    action: "call",
                }),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            console.log("Call initiated with Call ID:", data.callId);
            setState((prevState) => ({ ...prevState, callActive: true }));
        } catch (error) {
            console.error("Failed to initiate call:", error);
            setState((prevState) => ({
                ...prevState,
                connectionError: (error as Error).message,
            }));
        }
    };

    const handleAnswer = async () => {
        try {
            await fetch("/api/llpmg/sip-handler", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ action: "answer" }),
            });
            setState((prevState) => ({
                ...prevState,
                callActive: true,
                incomingCall: false,
            }));
        } catch (error) {
            console.error("Failed to answer call:", error);
            setState((prevState) => ({
                ...prevState,
                connectionError: (error as Error).message,
            }));
        }
    };

    const handleDecline = async () => {
        try {
            await fetch("/api/llpmg/sip-handler", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ action: "decline" }),
            });
            setState((prevState) => ({ ...prevState, incomingCall: false }));
        } catch (error) {
            console.error("Failed to decline call:", error);
            setState((prevState) => ({
                ...prevState,
                connectionError: (error as Error).message,
            }));
        }
    };

    const handleHangup = async () => {
        try {
            await fetch("/api/llpmg/sip-handler", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ action: "hangup" }),
            });
            setState((prevState) => ({ ...prevState, callActive: false }));
            onHangup();
        } catch (error) {
            console.error("Failed to hang up call:", error);
            setState((prevState) => ({
                ...prevState,
                connectionError: (error as Error).message,
            }));
        }
    };

    return (
        <div className="bg-black min-h-screen flex items-center justify-center p-6">
            <div className="bg-opacity-70 bg-gray-800 backdrop-blur-lg p-8 rounded-3xl shadow-lg w-full max-w-md">
                {state.connectionError && (
                    <div className="text-red-500 text-sm mb-4">
                        {state.connectionError}
                    </div>
                )}
                <h3 className="text-white text-2xl mb-6">
                    LLPMG WebPhone Dashboard
                </h3>
                <button
                    onClick={onLogout}
                    className="text-sm text-gray-400 hover:text-white mb-4"
                >
                    Logout
                </button>
                {!state.callActive && !state.incomingCall && (
                    <div className="outgoing-call mt-4">
                        <h4 className="text-white text-xl mb-3">
                            Outgoing Call
                        </h4>
                        <input
                            type="text"
                            value={state.outgoingNumber}
                            onChange={(e) =>
                                setState((prevState) => ({
                                    ...prevState,
                                    outgoingNumber: e.target.value,
                                }))
                            }
                            placeholder="+1 234 567-8900"
                            className="w-full p-2 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
                        />
                        <button
                            onClick={handleOutgoingCall}
                            className="w-full py-2 bg-gradient-to-r from-green-400 to-blue-500 text-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300"
                        >
                            Call
                        </button>
                    </div>
                )}
                {state.incomingCall && (
                    <div className="incoming-call mt-6">
                        <h4 className="text-white text-xl mb-4">
                            Incoming Call from {state.callerNumber}
                        </h4>
                        <div className="grid grid-cols-2 gap-4">
                            <button
                                onClick={handleAnswer}
                                className="py-2 bg-green-500 text-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300"
                            >
                                Answer
                            </button>
                            <button
                                onClick={handleDecline}
                                className="py-2 bg-red-500 text-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300"
                            >
                                Decline
                            </button>
                        </div>
                    </div>
                )}
                {state.callActive && (
                    <div className="active-call mt-6">
                        <h4 className="text-white text-xl mb-4">
                            Call In Progress
                        </h4>
                        <button
                            onClick={handleHangup}
                            className="w-full py-2 bg-red-500 text-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300"
                        >
                            Hang Up
                        </button>
                    </div>
                )}
            </div>
            <div className="fixed bottom-4 right-4 bg-white p-2 rounded">
                Debug: {JSON.stringify(state)}
            </div>
        </div>
    );
};

export default SipOut;
