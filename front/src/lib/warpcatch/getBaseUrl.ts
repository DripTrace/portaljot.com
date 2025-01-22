const getBaseUrl = () =>
	process.env.NODE_ENV === "development"
		? `${process.env.NEXT_PUBLIC_URL}/warpcatch`
		: `https://${process.env.VERCEL_URL}/warpcatch`;

export default getBaseUrl;
