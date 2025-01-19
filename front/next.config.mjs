import { createVanillaExtractPlugin } from '@vanilla-extract/next-plugin';
import { fileURLToPath } from 'url';
import path from 'path';
import withPlugins from "next-compose-plugins";
import withVideos from "next-videos";
import withImages from "next-images";

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
    // eslint: {
    //     ignoreDuringBuilds: true
    // },
    env: {
        stripe_public_key: process.env.STRIPE_PUBLIC_KEY,
        printful_client_id: process.env.PRINTFUL_CLIENT_ID,
        NEXTAUTH_URL: process.env.NEXTAUTH_URL,
        NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
        // runwayml_api_key: process.env.RUNWAY_API_KEY
    },
    images: {
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
                pathname: "**"
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
        ]
    },
    async rewrites() {
        return [
            {
                source: '/api/auth/:session*',
                destination: '/api/modify/auth/:session*',
            },
        ];
    },
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
            test: /\.(ogg|mp3|wav|mpe?g)$/i,
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

            config.resolve = {
                ...config.resolve,
                alias: {
                    ...config.resolve.alias,
                    '@': path.resolve(__dirname, './src'),
                },
                fallback: {
                    ...config.resolve.fallback,
                    fs: false,
                    path: false,
                    // child_process: false
                    tls: false,
                    events: "events",
                    net: false,
                }
            };
        }
        return config;
    },
    transpilePackages: ["fabric"],
    experimental: {
        esmExternals: true,
    },
    output: "standalone"
};

export default withPlugins([[withVanillaExtract], [withVideos], [withImages]], nextConfig);