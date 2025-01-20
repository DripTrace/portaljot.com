"use client";

import type React from "react";

interface FSClinicalsMapProps {
	address: string;
	encoded: string;
	isDarkMode: boolean;
}

const FSClinicalsMap: React.FC<FSClinicalsMapProps> = ({
	address,
	encoded,
	isDarkMode,
}) => {
	// const encodedAddress = encodeURIComponent(address);
	const encodedAddress = encoded;
	// const mapUrl = `https://www.google.com/maps/embed/v1/place?q=${encodedAddress}&zoom=14`;
	const mapUrl = `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d${encodedAddress}!5m2!1sen!2sus`;

	return (
		<iframe
			src={mapUrl}
			width="100%"
			height="100%"
			style={{ border: 0 }}
			allowFullScreen={false}
			loading="lazy"
			referrerPolicy="no-referrer-when-downgrade"
			title={`Map of ${address}`}
			className={`rounded-md size-full ${isDarkMode ? "opacity-80" : ""}`}
		></iframe>
	);
};

export default FSClinicalsMap;


// "use client"

// import React from 'react';

// // interface FSClinicalsMapProps {
// //   mapUrl: string;
// //   isDarkMode: boolean;
// // }

// interface FSClinicalsMapProps {
// 	address: string;
// 	encoded: string;
// 	isDarkMode: boolean;
// }

// // export const FSClinicalsMap: React.FC<FSClinicalsMapProps> = ({ mapUrl, isDarkMode }) => {
// const FSClinicalsMap: React.FC<FSClinicalsMapProps> = ({
// 	address,
// 	encoded,
// 	isDarkMode,
// }) => {
//     	const encodedAddress = encoded;
// 	const mapUrl = `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d${encodedAddress}!5m2!1sen!2sus`;
    
//     return (
//     <iframe
//     //   src={mapUrl}
//       src={mapUrl}
//       width="100%"
//       height="100%"
//       style={{ border: 0 }}
//       allowFullScreen={false}
//       loading="lazy"
//       referrerPolicy="no-referrer-when-downgrade"
//       className={`rounded-md ${isDarkMode ? 'opacity-80' : ''}`}
//     ></iframe>
//   );
// };