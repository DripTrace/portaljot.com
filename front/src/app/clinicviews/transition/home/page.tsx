// src/app/transition/home/page.tsx
"use client";

import { useTransitionLink } from "@/components/effects/TransitionLayout";

export default function Home() {
    const TransitionLink = useTransitionLink();

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
            <h1 className="text-4xl font-bold mb-4">Home Page</h1>
            <TransitionLink
                href="/transition/about"
                className="text-blue-500 hover:text-blue-700"
            >
                Go to About Page
            </TransitionLink>
        </div>
    );
}
