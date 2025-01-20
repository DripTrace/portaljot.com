// src/app/transition/about/page.tsx
"use client";

import { useTransitionLink } from "@/components/effects/TransitionLayout";

export default function About() {
    const TransitionLink = useTransitionLink();

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-200">
            <h1 className="text-4xl font-bold mb-4">About Page</h1>
            <TransitionLink
                href="/transition/home"
                className="text-blue-500 hover:text-blue-700"
            >
                Go back to Home
            </TransitionLink>
        </div>
    );
}
