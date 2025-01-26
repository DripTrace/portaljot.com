import { createVanillaExtractPlugin } from "@vanilla-extract/next-plugin";
import { fileURLToPath } from "url";
import path from "path";
import withPlugins from "next-compose-plugins";
import withVideos from "next-videos";
import withImages from "next-images";
import withSerwistInit from "@serwist/next";
import { execSync } from "child_process";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const withVanillaExtract = createVanillaExtractPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: false,
	i18n: {
		locales: ["en", "ja"],
		defaultLocale: "en",
		localeDetection: false,
	},
	compiler: {
		styledComponents: true,
	},
	env: {
		stripe_public_key: process.env.STRIPE_PUBLIC_KEY,
		printful_client_id: process.env.PRINTFUL_CLIENT_ID,
		NEXTAUTH_URL: process.env.NEXTAUTH_URL,
		NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
		runwayml_api_key: process.env.RUNWAY_API_KEY,
	},
	images: {
		// unoptimized: true,
		remotePatterns: [
			{
				protocol: "https",
				hostname: "uploadthing.com",
				pathname: "**",
			},
			{
				protocol: "https",
				hostname: "oaidalleapiprodscus.blob.core.windows.net",
				pathname: "**",
			},
			{
				protocol: "https",
				hostname: "picsum.photos",
				pathname: "**",
			},
			{
				protocol: "https",
				hostname: "utfs.io",
				pathname: "**",
			},
			{
				protocol: "https",
				hostname: "img.clerk.com",
				pathname: "**",
			},
			{
				protocol: "https",
				hostname: "subdomain",
				pathname: "**",
			},
			{
				protocol: "https",
				hostname: "files.stripe.com",
				pathname: "**",
			},
			{
				protocol: "https",
				hostname: "nexusconjure.com",
				pathname: "**",
			},
			{
				protocol: "https",
				hostname: "files.cdn.printful.com",
				pathname: "**",
			},
			{
				protocol: "https",
				hostname: "oaidalleapiprodscus.blob.core.windows.net",
				pathname: "**",
			},
			{
				protocol: "https",
				hostname: "firebasestorage.googleapis.com",
				pathname: "**",
			},
			{
				protocol: "https",
				hostname: "links.papareact.com",
				pathname: "**",
			},
			{
				protocol: "https",
				hostname: "www.facebook.com",
				pathname: "**",
			},
			{
				protocol: "https",
				hostname: "www.instagram.com",
				pathname: "**",
			},
			{
				protocol: "https",
				hostname: "www.linkedin.com",
				pathname: "**",
			},
			{
				protocol: "https",
				hostname: "twitter.com",
				pathname: "**",
			},
			{
				protocol: "https",
				hostname: "logos-world.net",
				pathname: "**",
			},
			{
				protocol: "https",
				hostname: "media.corporate-ir.net",
				pathname: "**",
			},
			{
				protocol: "https",
				hostname: "assets.turbologo.com",
				pathname: "**",
			},
			{
				protocol: "https",
				hostname: "ecstatic-leavitt-a2e426.netlify.app",
				pathname: "**",
			},
			{
				protocol: "https",
				hostname: "nervous-ramanujan-132263.netlify.app",
				pathname: "**",
			},
			{
				protocol: "https",
				hostname: "assetshuluimcom-a.akamaihd.net",
				pathname: "**",
			},
			{
				protocol: "https",
				hostname: "repository-images.githubusercontent.com",
				pathname: "**",
			},
			{
				protocol: "https",
				hostname: "raw.githubusercontent.com",
				pathname: "**",
			},
			{
				protocol: "https",
				hostname: "poke-assessment.driptrace.io",
				pathname: "**",
			},
			{
				protocol: "https",
				hostname: "i.imgur.com",
				pathname: "**",
			},
			{
				protocol: "https",
				hostname: "firebasestorage.googleapis.com",
				pathname: "**",
			},
			{
				protocol: "https",
				hostname: "media.discordapp.net",
				pathname: "**",
			},
			{
				protocol: "https",
				hostname: "cdn.discordapp.com",
				pathname: "**",
			},
			{
				protocol: "https",
				hostname: "lh3.googleusercontent.com",
				pathname: "**",
			},

			{
				protocol: "https",
				hostname: "links.papareact.com",
			},
			{
				protocol: "https",
				hostname: "ucarecdn.com",
			},
			{
				protocol: "https",
				hostname: "advanced-practice.vercel.app",
				pathname: "**",
			},
			{
				protocol: "https",
				hostname: "img.freepik.com",
				pathname: "**",
			},
			{
				protocol: "https",
				hostname: "github.com",
				pathname: "**",
			},
			{
				protocol: "https",
				hostname: "wordpress-1345160-4937502.cloudwaysapps.com",
				pathname: "**",
			},
			{
				protocol: "http",
				hostname: "144.202.50.187",
				pathname: "**",
			},
			{
				protocol: "https",
				hostname: "scontent-ord5-3.cdninstagram.com",
				pathname: "**",
			},
			{
				protocol: "https",
				hostname: "scontent-ord5-2.cdninstagram.com",
				pathname: "**",
			},
			{
				protocol: "https",
				hostname: "*cdninstagram.com",
				pathname: "**",
			},
			{
				protocol: "https",
				hostname: "img.clerk.com",
				pathname: "**",
			},
			{
				protocol: "https",
				hostname: "driptrace.github.io",
				pathname: "**",
			},
		],
	},
	async rewrites() {
		return [
			{
				source: "/api/auth/:session*",
				destination: "/api/modify/auth/:session*",
			},
			{
				source: "/:path*",
				destination: "/:path*",
			},
			{
				source: "/manifest.webmanifest",
				destination: "/api/manifest",
			},
			{
				source: "/favicon.ico",
				destination: "/api/favicon",
			},
			{
				source: "/api/:path*",
				destination: "/api/:path*",
			},
			{
				source: "/api/clinicviews/llpmg/sip-handler",
				destination: "/api/clinicviews/llpmg/sip-handler",
			},
			{
				source: "/api/clinicviews/llpmg/sip-ws",
				destination: "/api/clinicviews/llpmg/sip-handler",
			},
			{
				source: "/clinicviews/llpmg/audio/:path*",
				destination: "/public/clinicviews/llpmg/audio/:path*",
			},
		];
	},
	async headers() {
		return [
			{
				source: "/manifest.webmanifest",
				headers: [
					{
						key: "Cache-Control",
						value: "no-store, max-age=0",
					},
					{
						key: "Content-Type",
						value: "application/manifest+json",
					},
				],
			},
			{
				source: "/:path*",
				headers: [
					{
						key: "Content-Security-Policy",
						value: "script-src 'self' 'unsafe-eval' 'unsafe-inline' https://ajax.googleapis.com; object-src 'none';",
					},
				],
			},
		];
	},
	productionBrowserSourceMaps: true,
	// distDir: "out",
	// output: "export",
	basePath: "",
	assetPrefix: "/",
	webpack: (config, { isServer }) => {
		config.module.rules.push({
			test: /\.svg$/,
			use: [
				{
					loader: "@svgr/webpack",
					options: {
						typescript: true,
						ext: "tsx",
					},
				},
			],
		});

		config.module.rules.push({
			test: /\.(ogg|mp3|wav|flac|mpe?g)$/i,
			exclude: config.exclude,
			use: [
				{
					loader: "url-loader",
					options: {
						limit: config.inlineImageLimit,
						fallback: "file-loader",
						publicPath: `${config.assetPrefix}/_next/static/images/`,
						outputPath: `${isServer ? "../" : ""}static/images/`,
						name: "[name]-[hash].[ext]",
						esModule: config.esModule || false,
					},
				},
			],
		});

		if (!isServer) {
			execSync("node scripts/clinicviews/runGenerateManifest.js");
			config.resolve = {
				...config.resolve,
				alias: {
					...config.resolve.alias,
					"@": path.resolve(__dirname, "./src"),
				},
				fallback: {
					...config.resolve.fallback,
					fs: false,
					path: false,
					tls: false,
					events: "events",
					net: false,
					https: path.resolve("https-browserify"),
					http: path.resolve("stream-http"),
					buffer: path.resolve("buffer/"),
					canvas: false,
				},
			};
		}
		return config;
	},
	transpilePackages: ["framer-motion", "webfontloader", "fabric"],
	experimental: {
		esmExternals: true,
	},
	output: "standalone",
};

const withSerwist = withSerwistInit({
	swSrc: "src/app/clinicviews/sw.ts",
	swDest: "public/clinicviews/sw.js",
	// disable: process.env.NODE_ENV === "development",
});

// export default withPlugins(
// 	[[withVanillaExtract], [withVideos], [withImages], [withSerwist]],
// 	nextConfig
// );

export default withVanillaExtract(
	withVideos(withImages(withSerwist(nextConfig)))
);
