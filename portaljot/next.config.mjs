// import { createVanillaExtractPlugin } from '@vanilla-extract/next-plugin';

// const withVanillaExtract = createVanillaExtractPlugin();

// /** @type {import('next').NextConfig} */
// const nextConfig = {
//     env: {
//         stripe_public_key: process.env.STRIPE_PUBLIC_KEY,
//         // printful_client_id: process.env.PRINTFUL_CLIENT_ID,
//         NEXTAUTH_URL: process.env.NEXTAUTH_URL,
//         NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
//     },
//     images: {
//         remotePatterns: [
//             {
//                 protocol: "https",
//                 hostname: "uploadthing.com",
//                 pathname: "**",
//             },]
//     },
//     async rewrites() {
//         return [
//             // {
//             //     source: '/api/auth/:path*',
//             //     destination: '/api/modify/auth/:path*',
//             // },
//             {
//                 source: '/api/auth/:session*',
//                 destination: '/api/modify/auth/:session*',
//             },
//         ];
//     },

//     transpilePackages: ["fabric"],
// };

// export default withVanillaExtract(nextConfig);


import { createVanillaExtractPlugin } from '@vanilla-extract/next-plugin';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const withVanillaExtract = createVanillaExtractPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        stripe_public_key: process.env.STRIPE_PUBLIC_KEY,
        NEXTAUTH_URL: process.env.NEXTAUTH_URL,
        NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
    },
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "uploadthing.com",
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
    webpack: (config) => {
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
            }
        };
        return config;
    },
    transpilePackages: ["fabric"],
    experimental: {
        esmExternals: true,
    },
    output: "standalone"
};

export default withVanillaExtract(nextConfig);