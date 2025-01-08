import { createVanillaExtractPlugin } from '@vanilla-extract/next-plugin';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const withVanillaExtract = createVanillaExtractPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
    // eslint: {
    //     ignoreDuringBuilds: true
    // },
    env: {
        stripe_public_key: process.env.STRIPE_PUBLIC_KEY,
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
            }
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

export default withVanillaExtract(nextConfig);