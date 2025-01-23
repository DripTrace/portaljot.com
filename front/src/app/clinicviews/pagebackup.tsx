import { GetStaticProps } from "next";
import { useRouter } from "next/router";

export default function NotFound() {
	const router = useRouter();
	return (
		<div>
			<h1>404 - Page Not Found</h1>
			<p>The page {router.asPath} could not be found.</p>
		</div>
	);
}

// This is the key addition
export function generateStaticParams() {
	return [{ not_found: ["404"] }];
}

export const getStaticProps: GetStaticProps = async (context) => {
	return {
		props: {},
	};
};
