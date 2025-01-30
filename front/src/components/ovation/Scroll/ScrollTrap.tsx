// import React, { useRef, useState } from "react";

// const ScrollTrap = () => {
//     const [isMessageVisible, setMessageVisible] = useState(false);
//     const [preventedCount, setPreventedCount] = useState(0);
//     const leftParentRef = useRef<HTMLDivElement>(null);
//     const rightParentRef = useRef<HTMLDivElement>(null);

//     const showEventPreventedMsg = () => {
//         setMessageVisible(true);
//     };

//     const hideEventPreventedMsg = () => {
//         setMessageVisible(false);
//     };

//     const addPreventedCount = () => {
//         setPreventedCount((prevCount) => prevCount + 1);
//     };

//     const trapScroll = (e: React.WheelEvent<HTMLDivElement>) => {
//         const element = e.currentTarget;
//         const scrollableDist = element.scrollHeight - element.clientHeight;

//         if (
//             (e.deltaY > 0 && element.scrollTop >= scrollableDist) ||
//             (e.deltaY < 0 && element.scrollTop <= 0)
//         ) {
//             e.preventDefault();
//             addPreventedCount();
//         }
//     };

//     return (
//         <div className="flex h-full bg-gray-800">
//             <div
//                 ref={leftParentRef}
//                 className="w-1/2 border-r border-gray-600 overflow-auto p-36 bg-gray-400"
//             >
//                 <div
//                     onMouseEnter={showEventPreventedMsg}
//                     onMouseLeave={hideEventPreventedMsg}
//                     onWheel={trapScroll}
//                     className="relative h-48 overflow-auto bg-purple-700 text-purple-300 p-8"
//                 >
//                     <div className="h-full">
//                         <h2>
//                             Scrolling in here doesn't scroll parent
//                             elementsScrolling in here doesn't scroll parent
//                             elementsScrolling in here doesn't scroll parent
//                             elementsScrolling in here doesn't scroll parent
//                             elementsScrolling in here doesn't scroll parent
//                             elementsScrolling in here doesn't scroll parent
//                             elementsScrolling in here doesn't scroll parent
//                             elementsScrolling in here doesn't scroll parent
//                             elementsScrolling in here doesn't scroll parent
//                             elementsScrolling in here doesn't scroll parent
//                             elementsScrolling in here doesn't scroll parent
//                             elementsScrolling in here doesn't scroll parent
//                             elementsScrolling in here doesn't scroll parent
//                             elementsScrolling in here doesn't scroll parent
//                             elementsScrolling in here doesn't scroll parent
//                             elementsScrolling in here doesn't scroll parent
//                             elementsScrolling in here doesn't scroll parent
//                             elements
//                         </h2>
//                     </div>
//                     {isMessageVisible && (
//                         <div className="absolute inset-x-0 top-0 opacity-100 transition-opacity duration-300 ease-in bg-black bg-opacity-90 text-white py-2 text-center">
//                             Scrolling trap enabled! prevented <small>x</small>
//                             {preventedCount}
//                         </div>
//                     )}
//                     <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-30 p-4">
//                         Scroll down <i className="fa-angle-down"></i>
//                     </div>
//                 </div>
//             </div>
//             <div
//                 ref={rightParentRef}
//                 className="w-1/2 overflow-auto p-36 bg-gray-400"
//             >
//                 <div className="relative h-48 overflow-auto bg-blue-700 text-blue-300 p-8">
//                     <div className="h-full">
//                         <h2>
//                             Scrolling here will scroll its parentsScrolling here
//                             will scroll its parentsScrolling here will scroll
//                             its parentsScrolling here will scroll its
//                             parentsScrolling here will scroll its
//                             parentsScrolling here will scroll its
//                             parentsScrolling here will scroll its
//                             parentsScrolling here will scroll its
//                             parentsScrolling here will scroll its
//                             parentsScrolling here will scroll its
//                             parentsScrolling here will scroll its
//                             parentsScrolling here will scroll its
//                             parentsScrolling here will scroll its
//                             parentsScrolling here will scroll its
//                             parentsScrolling here will scroll its
//                             parentsScrolling here will scroll its
//                             parentsScrolling here will scroll its parents
//                         </h2>
//                     </div>
//                     <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-30 p-4">
//                         Scroll down <i className="fa-angle-down"></i>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default ScrollTrap;

// import React, { useRef, useState } from "react";

// const ScrollTrap = () => {
//     const [isMessageVisible, setMessageVisible] = useState(false);
//     const [preventedCount, setPreventedCount] = useState(0);
//     const leftParentRef = useRef<HTMLDivElement>(null);
//     const rightParentRef = useRef<HTMLDivElement>(null);

//     const showEventPreventedMsg = () => {
//         setMessageVisible(true);
//     };

//     const hideEventPreventedMsg = () => {
//         setMessageVisible(false);
//     };

//     const addPreventedCount = () => {
//         setPreventedCount((prevCount) => prevCount + 1);
//     };

//     const trapScroll = (e: React.WheelEvent<HTMLDivElement>) => {
//         const element = e.currentTarget;
//         const scrollableDist = element.scrollHeight - element.clientHeight;

//         if (
//             (e.deltaY > 0 && element.scrollTop >= scrollableDist) ||
//             (e.deltaY < 0 && element.scrollTop <= 0)
//         ) {
//             e.preventDefault();
//             addPreventedCount();
//         }
//     };

//     return (
//         <div
//             style={{ display: "flex", height: "100%", backgroundColor: "#333" }}
//         >
//             <div
//                 ref={leftParentRef}
//                 style={{
//                     width: "50%",
//                     borderRight: "1px solid #999",
//                     overflow: "auto",
//                     padding: "9rem 2rem",
//                     backgroundColor: "#777",
//                 }}
//             >
//                 <div
//                     onMouseEnter={showEventPreventedMsg}
//                     onMouseLeave={hideEventPreventedMsg}
//                     onWheel={trapScroll}
//                     style={{
//                         position: "relative",
//                         height: "200px",
//                         overflow: "auto",
//                         backgroundColor: "#8205a1",
//                         color: "#e6b3e6",
//                         padding: "0 2em",
//                     }}
//                 >
//                     <div style={{ height: "120%", paddingTop: ".5em" }}>
//                         <h2>
//                             Scrolling (mousewheel / trackpad) in here doesn't
//                             scroll parent elements
//                         </h2>
//                     </div>
//                     {isMessageVisible && (
//                         <div
//                             style={{
//                                 position: "absolute",
//                                 top: 0,
//                                 left: 0,
//                                 width: "100%",
//                                 opacity: 1,
//                                 backgroundColor: "rgba(0,0,0,0.9)",
//                                 color: "white",
//                                 fontSize: ".9em",
//                                 textAlign: "center",
//                                 padding: ".8em 0",
//                             }}
//                         >
//                             Scrolling trap enabled! Prevented <small>x</small>
//                             {preventedCount}
//                         </div>
//                     )}
//                     <div
//                         style={{
//                             position: "absolute",
//                             bottom: 0,
//                             left: "50%",
//                             width: "6em",
//                             marginLeft: "-3em",
//                             background: "rgba(0,0,0,0.3)",
//                             padding: "1em",
//                         }}
//                     >
//                         Scroll down{" "}
//                         <i
//                             className="fa fa-angle-down"
//                             style={{ float: "right" }}
//                         ></i>
//                     </div>
//                 </div>
//             </div>
//             <div
//                 ref={rightParentRef}
//                 style={{
//                     width: "50%",
//                     overflow: "auto",
//                     padding: "9rem 2rem",
//                     backgroundColor: "#777",
//                 }}
//             >
//                 <div
//                     style={{
//                         position: "relative",
//                         height: "200px",
//                         overflow: "auto",
//                         backgroundColor: "#006ba1",
//                         color: "#4da6d9",
//                         padding: "0 2em",
//                     }}
//                 >
//                     <div style={{ height: "120%", paddingTop: ".5em" }}>
//                         <h2>Scrolling here will scroll its parents</h2>
//                     </div>
//                     <div
//                         style={{
//                             position: "absolute",
//                             bottom: 0,
//                             left: "50%",
//                             width: "6em",
//                             marginLeft: "-3em",
//                             background: "rgba(0,0,0,0.3)",
//                             padding: "1em",
//                         }}
//                     >
//                         Scroll down{" "}
//                         <i
//                             className="fa fa-angle-down"
//                             style={{ float: "right" }}
//                         ></i>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default ScrollTrap;

import React, { useState } from "react";
import HorizontalScrollCards from "./Horizontal";

const ScrollTrap = () => {
    const [isMessageVisible, setMessageVisible] = useState(false);
    const [preventedCount, setPreventedCount] = useState(0);

    const showEventPreventedMsg = () => {
        setMessageVisible(true);
    };

    const hideEventPreventedMsg = () => {
        setMessageVisible(false);
    };

    const addPreventedCount = () => {
        setPreventedCount((prevCount) => prevCount + 1);
    };

    const trapScroll = (e: React.WheelEvent<HTMLDivElement>) => {
        const element = e.currentTarget;
        const scrollableDist = element.scrollHeight - element.clientHeight;

        if (
            (e.deltaY > 0 && element.scrollTop >= scrollableDist) ||
            (e.deltaY < 0 && element.scrollTop <= 0)
        ) {
            e.preventDefault();
            addPreventedCount();
        }
    };

    return (
        <div className="flex h-screen bg-gray-900 border border-red-400">
            {" "}
            {/* <HorizontalScrollCards /> */}
            {/* Ensure the overall container fits the screen */}
            <div className="w-1/2 overflow-hidden p-20 border-r border-gray-600 bg-gray-700">
                {" "}
                {/* overflow-hidden to manage overflow at child level */}
                <div
                    onMouseEnter={showEventPreventedMsg}
                    onMouseLeave={hideEventPreventedMsg}
                    onWheel={trapScroll}
                    className="relative h-96 overflow-auto bg-purple-700 text-purple-200 p-8"
                >
                    {" "}
                    {/* Set fixed height and overflow-auto */}
                    <div className="pb-40">
                        {" "}
                        {/* padding-bottom to simulate extra content */}
                        <h2 className="text-lg">
                            Scrolling (mousewheel / trackpad) in here doesn't
                            scroll parent elements Scrolling (mousewheel /
                            trackpad) in here doesn't scroll parent elements
                            Scrolling (mousewheel / trackpad) in here doesn't
                            scroll parent elements Scrolling (mousewheel /
                            trackpad) in here doesn't scroll parent elements
                            Scrolling (mousewheel / trackpad) in here doesn't
                            scroll parent elements Scrolling (mousewheel /
                            trackpad) in here doesn't scroll parent elements
                            Scrolling (mousewheel / trackpad) in here doesn't
                            scroll parent elements Scrolling (mousewheel /
                            trackpad) in here doesn't scroll parent elements
                            Scrolling (mousewheel / trackpad) in here doesn't
                            scroll parent elements Scrolling (mousewheel /
                            trackpad) in here doesn't scroll parent elements
                            Scrolling (mousewheel / trackpad) in here doesn't
                            scroll parent elements
                        </h2>
                    </div>
                    {isMessageVisible && (
                        <div className="absolute top-0 left-0 w-full bg-black bg-opacity-90 text-white text-sm text-center p-2 opacity-100">
                            Scrolling trap enabled! Prevented <small>x</small>
                            {preventedCount}
                        </div>
                    )}
                    <div className="absolute bottom-0 left-1/2 w-24 -ml-12 bg-black bg-opacity-30 p-4">
                        Scroll down{" "}
                        <i className="fa fa-angle-down float-right"></i>
                    </div>
                </div>
            </div>
            <div className="w-1/2 overflow-hidden p-20 bg-gray-700">
                {" "}
                {/* overflow-hidden here as well */}
                <div className="relative h-96 overflow-auto bg-blue-700 text-blue-300 p-8">
                    {" "}
                    {/* Same fixed height and overflow-auto */}
                    <div className="pb-40">
                        {" "}
                        {/* More padding-bottom to ensure overflow */}
                        <h2 className="text-lg">
                            Scrolling here will scroll its parents Scrolling
                            here will scroll its parents Scrolling here will
                            scroll its parents Scrolling here will scroll its
                            parents Scrolling here will scroll its parents
                            Scrolling here will scroll its parents Scrolling
                            here will scroll its parents Scrolling here will
                            scroll its parents Scrolling here will scroll its
                            parents Scrolling here will scroll its parents
                            Scrolling here will scroll its parents Scrolling
                            here will scroll its parents Scrolling here will
                            scroll its parents Scrolling here will scroll its
                            parents
                        </h2>
                    </div>
                    <div className="absolute bottom-0 left-1/2 w-24 -ml-12 bg-black bg-opacity-30 p-4">
                        Scroll down{" "}
                        <i className="fa fa-angle-down float-right"></i>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ScrollTrap;
