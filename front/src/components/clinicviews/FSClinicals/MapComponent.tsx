import React from "react";

interface MapComponentProps {
	encoded: string;
	isDarkMode: boolean;
}

const MapComponent: React.FC<MapComponentProps> = ({ encoded, isDarkMode }) => {
	const encodedAddress = encoded;
	// const encodedAddress = encodeURIComponent(encoded);
	// const mapUrl = `https://www.google.com/maps/embed/v1/place?q=${encodedAddress}&zoom=14`;
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
		// <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3077.5209395169586!2d-119.81923322348412!3d39.525300709411155!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x809940cb25419537%3A0x60e85be369ace7e8!2s100%20N%20Arlington%20Ave%20%23340a%2C%20Reno%2C%20NV%2089501!5e0!3m2!1sen!2sus!4v1720074308138!5m2!1sen!2sus" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
		// <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3312.494856478956!2d-117.84453832366965!3d33.87690702696721!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80dcd6a888549635%3A0xa78d75b370047cb5!2s650%20N%20Rose%20Dr%20%23472%2C%20Placentia%2C%20CA%2092870!5e0!3m2!1sen!2sus!4v1720074440707!5m2!1sen!2sus" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
	);
};

export default MapComponent;
