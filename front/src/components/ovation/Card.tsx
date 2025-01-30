// // Import necessary dependencies and styles
// "use client";
// import { getResources } from "@/lib/state/redux/slices/mainSliceReducer";
// import { useDispatch, useSelector } from "@/lib/state/redux/store";
// import React, { useEffect } from "react";
// // import { Card, CardContent, Typography, Link, Button } from '@mui/material';
// // import styles from "./page.module.css";

// // Import Redux-related functions and actions
// // import { useSelector, useDispatch } from '../redux/store';
// // import { getResources } from '@/redux/slices/mainSlice';

// // Define the Card component
// const Card: React.FC = () => {
//     // Initialize useDispatch to dispatch Redux actions
//     const dispatch = useDispatch();

//     // Select the 'cardDetails' data from the Redux store using useSelector
//     const { cardDetails } = useSelector((state) => state.cards);

//     // useEffect hook to dispatch 'getResources' action when the component mounts
//     useEffect(() => {
//         dispatch(getResources());
//     }, []);

//     // Handler function for clicking the 'Find something to do' button
//     const handleGetWorkClick = () => {
//         // Dispatch the 'getResources' action to fetch data
//         dispatch(getResources());
//     };

//     // JSX for rendering the button
//     const renderButton = (
//         <>
//             <h1
//                 style={{
//                     fontFamily: "Roboto, sans-serif",
//                     color: "#000000",
//                     textShadow: "2px 2px 4px rgba(0, 0, 0, 0.3)",
//                 }}
//             >
//                 Bored?
//             </h1>
//             <button onClick={handleGetWorkClick}>Find something to do</button>
//         </>
//     );

//     // JSX for rendering the card with fetched data
//     const renderCard = (
//         <div>
//             <div>
//                 <h5>{cardDetails.activity}</h5>

//                 <div>Type: {cardDetails.type}</div>

//                 {/* Link to external resource */}
//                 {/* <a href={cardDetails.link as string}>How to do...</a> */}
//             </div>
//         </div>
//     );

//     // JSX for the main component
//     return (
//         <main className={""}>
//             {/* Render the button */}
//             {renderButton}

//             <div style={{ marginTop: "30px" }}>
//                 {/* Render the card */}
//                 {renderCard}
//             </div>
//         </main>
//     );
// };

// // Export the Home component as the default export
// export default Card;

"use client";
import { getResources } from "@/lib/state/redux/slices/mainSliceReducer";
import { useDispatch, useSelector } from "@/lib/state/redux/store";
import React, { useEffect, useState } from "react";

// Define the Card component
const Card: React.FC = () => {
    // Initialize useDispatch to dispatch Redux actions
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);

    // Select the 'cardDetails' data from the Redux store using useSelector
    const { cardDetails } = useSelector((state) => state.cards);

    // useEffect hook to dispatch 'getResources' action when the component mounts
    useEffect(() => {
        dispatch(getResources()).finally(() => setLoading(false));
    }, [dispatch]);

    // Handler function for clicking the 'Find something to do' button
    const handleGetWorkClick = () => {
        setLoading(true);
        // Dispatch the 'getResources' action to fetch data
        dispatch(getResources()).finally(() => setLoading(false));
    };

    // JSX for rendering the button
    const renderButton = (
        <>
            <h1
                style={{
                    fontFamily: "Roboto, sans-serif",
                    color: "#000000",
                    textShadow: "2px 2px 4px rgba(0, 0, 0, 0.3)",
                }}
            >
                Bored?
            </h1>
            <button onClick={handleGetWorkClick}>Find something to do</button>
        </>
    );

    // JSX for rendering the card with fetched data
    const renderCard = (
        <div>
            <div>
                <h5>{cardDetails.activity}</h5>
                <div>Type: {cardDetails.type}</div>
            </div>
        </div>
    );

    // JSX for the main component
    return (
        <main className={""}>
            {/* Render the button */}
            {renderButton}

            <div style={{ marginTop: "30px" }}>
                {loading ? <div>Loading...</div> : renderCard}
            </div>
        </main>
    );
};

// Export the Home component as the default export
export default Card;
