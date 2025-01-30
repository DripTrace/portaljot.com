// import React from "react";
// import ErrorBoundary from "./ErrorBoundary";
// import { AppProps } from "next/app"; // Import the AppProps type from the appropriate location

// // 1. Create a minimal test component
// const TestComponent: React.FC = () => {
//     const [count, setCount] = React.useState(0);

//     console.log("Rendering TestComponent");

//     return (
//         <ErrorBoundary>
//             <div>
//                 Count: {count}
//                 <button
//                     onClick={() => {
//                         console.log("Before state update");
//                         setCount((prev) => prev + 1);
//                         console.log("After state update");
//                     }}
//                 >
//                     Increment
//                 </button>
//             </div>
//         </ErrorBoundary>
//     );
// };

// // 2. Implement this in your app
// function MyApp({ Component, pageProps }: AppProps) {
//     return (
//         <ErrorBoundary>
//             <TestComponent />
//             <Component {...pageProps} />
//         </ErrorBoundary>
//     );
// }

// // 3. If the error occurs in TestComponent, gradually add more complexity
// // until you reproduce the error in a minimal setting

import React from "react";

const TestComponent = () => {
    return <div>TestComponent</div>;
};

export default TestComponent;
