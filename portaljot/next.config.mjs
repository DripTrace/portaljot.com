import { createVanillaExtractPlugin } from '@vanilla-extract/next-plugin';
import path from 'path';

const withVanillaExtract = createVanillaExtractPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        stripe_public_key: process.env.STRIPE_PUBLIC_KEY,
        // printful_client_id: process.env.PRINTFUL_CLIENT_ID,
        NEXTAUTH_URL: process.env.NEXTAUTH_URL,
        NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
    },
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "uploadthing.com",
                pathname: "**",
            },]
    },
    async rewrites() {
        return [
            // {
            //     source: '/api/auth/:path*',
            //     destination: '/api/modify/auth/:path*',
            // },
            {
                source: '/api/auth/:session*',
                destination: '/api/modify/auth/:session*',
            },
        ];
    },
    webpack: (config) => {
        config.resolve.alias = {
            ...config.resolve.alias,
            '@': path.resolve(__dirname, './src'),
        };
        return config;
    },

    transpilePackages: ["fabric"],
};

export default withVanillaExtract(nextConfig);
