import React from "react";

interface MapComponentProps {
	encoded: string;
	isDarkMode: boolean;
}

const MapComponent: React.FC<MapComponentProps> = ({ encoded, isDarkMode }) => {
	const encodedAddress = encoded;
	const mapUrl = `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d${encodedAddress}!5m2!1sen!2sus`;

	return (
		<iframe
			width="100%"
			height="300"
			frameBorder="0"
			style={{ border: 0 }}
			src={mapUrl}
			allowFullScreen
			className={`rounded-lg ${isDarkMode ? "opacity-80" : ""}`}
		></iframe>
	);
};

export default MapComponent;
