import React from "react";

const PlayButton: React.FC = () => {
    return (
        <div className="h-screen overflow-hidden bg-gradient-to-tr from-green-50 via-green-200 to-[#CFF073] flex items-center justify-center cursor-pointer">
            <div className="relative w-32 h-32 playBtn">
                <svg
                    id="play"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 119.91 119.91"
                    /*className="absolute inset-0 m-auto w-full h-full animation-[bouncejs-playVisible_1.8s_linear_1_both]"*/
                >
                    <path
                        fill="#B3B3B3"
                        // fill="#E74C3C"
                        d="M58.8 10.8c-27.77 0-50.3 22.5-50.3 50.3 0 27.78 22.53 50.3 50.3 50.3 27.8 0 50.32-22.52 50.32-50.3 0-27.8-22.53-50.3-50.3-50.3zm0 97.97c-26.32 0-47.66-21.34-47.66-47.67 0-26.34 21.34-47.68 47.67-47.68 26.37 0 47.7 21.34 47.7 47.67 0 26.3-21.33 47.64-47.66 47.64z"
                    />
                    <path
                        fill="#B3B3B3"
                        // fill="#E74C3C"
                        d="M58.8 21.12c-22.07 0-39.97 17.9-39.97 39.98s17.9 39.98 39.98 39.98c22.1 0 40-17.9 40-39.98s-17.9-39.98-40-39.98zm3.52 50.7L43.77 82.47l.04-21.37.07-21.37 18.5 10.72 18.5 10.72L62.3 71.82z"
                    />
                </svg>
            </div>
        </div>
    );
};

export default PlayButton;

// Additional styles for animations and gradients
// {<style>
//     {`
//     @keyframes bouncejs-playVisible {
//         /* Keyframes copied from CSS */
//     }
//     @keyframes bouncejs-playHidden {
//         /* Keyframes copied from CSS */
//     }
// `}
// </style>;}
