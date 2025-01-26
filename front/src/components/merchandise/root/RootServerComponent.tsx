"use server";

// This component is rendered on the server.
const RootServerComponent = async () => {
	const serverTimestamp = new Date().toLocaleString();

	return (
		<div>
			<h2>Welcome to the Server Component!</h2>
			<p>Server Rendered at: {serverTimestamp}</p>
		</div>
	);
};

export default RootServerComponent;
