import "next/head";

declare module "next/head" {
	interface LinkProps {
		rel?: "apple-touch-icon" | string;
		href?: string;
	}
}
