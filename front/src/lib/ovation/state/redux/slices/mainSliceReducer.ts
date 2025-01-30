// import { createSlice, Dispatch } from "@reduxjs/toolkit";
// import axios from "axios";

// // Define the interface for a Card
// interface Card {
//     activity: string;
//     availability: number;
//     type: string;
//     participants: number;
//     price: number;
//     accessibility: number;
//     duration: string;
//     kidFriendly: boolean;
//     link: string;
//     key: string;

//     // {
//     //     "activity": "Learn Express.js",
//     //     "availability": 0.25,
//     //     "type": "education",
//     //     "participants": 1,
//     //     "price": 0.1,
//     //     "accessibility": "Few to no challenges",
//     //     "duration": "hours",
//     //     "kidFriendly": true,
//     //     "link": "https://expressjs.com/",
//     //     "key": "3943506"
//     //   }
// }

// // Define the interface for the state managed by this slice
// interface CardState {
//     cardDetails: Card;
// }

// // Define the initial state for this slice
// const initialState: CardState = {
//     cardDetails: {
//         activity: "",
//         availability: 0,
//         type: "",
//         participants: 0,
//         price: 0,
//         accessibility: 0,
//         duration: "",
//         kidFriendly: false,
//         link: "",
//         key: "",
//     },
// };

// // Create a Redux slice for managing card data
// const cardSlice = createSlice({
//     name: "cards", // Name of the slice
//     initialState, // Initial state
//     reducers: {
//         // Reducer for updating cardDetails after a successful resource fetch
//         getResourcesSuccess(state, action) {
//             const resources = action.payload;
//             state.cardDetails = resources;
//         },
//     },
// });

// // Export the action creator for getResourcesSuccess
// export const { getResourcesSuccess } = cardSlice.actions;

// // Export the reducer
// export default cardSlice.reducer;

// // Define an asynchronous action creator to fetch card resources from an API
// export function getResources() {
//     return async (dispatch: Dispatch) => {
//         try {
//             console.log("GETTING RESOURCES");
//             // Make an HTTP GET request to the API
//             const response = await axios.get(
//                 // "https://www.boredapi.com/api/activity"
//                 "https://bored-api.appbrewery.com/random"
//             );

//             // Extract card resources from the API response
//             console.log(response.data);
//             const resources: Card = response.data;

//             // Dispatch the getResourcesSuccess action to update the Redux state
//             dispatch(getResourcesSuccess(resources));
//         } catch (error) {
//             console.error("Error fetching card resources:", error);
//         }
//     };
// }

// import { createSlice, Dispatch } from "@reduxjs/toolkit";
// import axios from "axios";

// // Define the interface for a Card
// interface Card {
//     activity: string;
//     availability: number;
//     type: string;
//     participants: number;
//     price: number;
//     accessibility: number;
//     duration: string;
//     kidFriendly: boolean;
//     link: string;
//     key: string;
// }

// // Define the interface for the state managed by this slice
// interface CardState {
//     cardDetails: Card;
// }

// // Define the initial state for this slice
// const initialState: CardState = {
//     cardDetails: {
//         activity: "",
//         availability: 0,
//         type: "",
//         participants: 0,
//         price: 0,
//         accessibility: 0,
//         duration: "",
//         kidFriendly: false,
//         link: "",
//         key: "",
//     },
// };

// // Create a Redux slice for managing card data
// const cardSlice = createSlice({
//     name: "cards", // Name of the slice
//     initialState, // Initial state
//     reducers: {
//         // Reducer for updating cardDetails after a successful resource fetch
//         getResourcesSuccess(state, action) {
//             const resources = action.payload;
//             state.cardDetails = resources;
//         },
//     },
// });

// // Export the action creator for getResourcesSuccess
// export const { getResourcesSuccess } = cardSlice.actions;

// // Export the reducer
// export default cardSlice.reducer;

// // Define an asynchronous action creator to fetch card resources from an API
// export function getResources() {
//     return async (dispatch: Dispatch) => {
//         try {
//             console.log("Dispatching resource fetch");
//             // Make an HTTP GET request to the API
//             const response = await axios.get(
//                 // "http://localhost:3000/api/random"
//                 "/api/random"
//             );
//             // console.log("Fetched response:", response); // Log the fetched data
//             console.log("Fetched resources:", response.data); // Log the fetched data

//             // Extract card resources from the API response
//             const resources: Card = response.data;

//             // Dispatch the getResourcesSuccess action to update the Redux state
//             dispatch(getResourcesSuccess(resources));
//         } catch (error) {
//             if (axios.isAxiosError(error)) {
//                 console.error(
//                     "Axios error fetching card resources:",
//                     error.message
//                 );
//                 if (error.response) {
//                     console.error("Response data:", error.response.data); // Log response data if available
//                     console.error("Response status:", error.response.status); // Log response status if available
//                 }
//             } else {
//                 console.error(
//                     "Unexpected error fetching card resources:",
//                     error
//                 );
//             }
//         }
//     };
// }

import { createSlice, Dispatch } from "@reduxjs/toolkit";

// Define the interface for a Card
interface Card {
    activity: string;
    availability: number;
    type: string;
    participants: number;
    price: number;
    accessibility: number;
    duration: string;
    kidFriendly: boolean;
    link: string;
    key: string;
}

// Define the interface for the state managed by this slice
interface CardState {
    cardDetails: Card;
}

// Define the initial state for this slice
const initialState: CardState = {
    cardDetails: {
        activity: "",
        availability: 0,
        type: "",
        participants: 0,
        price: 0,
        accessibility: 0,
        duration: "",
        kidFriendly: false,
        link: "",
        key: "",
    },
};

// Create a Redux slice for managing card data
const cardSlice = createSlice({
    name: "cards", // Name of the slice
    initialState, // Initial state
    reducers: {
        // Reducer for updating cardDetails after a successful resource fetch
        getResourcesSuccess(state, action) {
            const resources = action.payload;
            state.cardDetails = resources;
        },
        getResourcesFailure(state) {
            state.cardDetails = initialState.cardDetails; // Reset to initial state on failure
        },
    },
});

// Export the action creator for getResourcesSuccess and getResourcesFailure
export const { getResourcesSuccess, getResourcesFailure } = cardSlice.actions;

// Export the reducer
export default cardSlice.reducer;

// Define an asynchronous action creator to fetch card resources from an API
export function getResources() {
    return async (dispatch: Dispatch) => {
        try {
            console.log("Dispatching resource fetch");
            // Make an HTTP GET request to the API
            const response = await fetch("/api/random");

            if (!response.ok) {
                throw new Error(`Error fetching data: ${response.statusText}`);
            }

            // Ensure the response is in JSON format
            const contentType = response.headers.get("content-type");
            if (!contentType || !contentType.includes("application/json")) {
                throw new TypeError("Response is not JSON");
            }

            const data = await response.json();
            console.log("Fetched resources:", data); // Log the fetched data

            // Extract card resources from the API response
            const resources: Card = data;

            // Dispatch the getResourcesSuccess action to update the Redux state
            dispatch(getResourcesSuccess(resources));
        } catch (error) {
            if (error instanceof Error) {
                console.error("Error fetching card resources:", error.message);
            } else {
                console.error(
                    "Unexpected error fetching card resources:",
                    error
                );
            }
            dispatch(getResourcesFailure()); // Dispatch failure action to reset state
        }
    };
}
