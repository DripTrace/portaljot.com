"use client";

import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";

const Creator = () => {
    const { data: session, status } = useSession();
    const [userName, setUserName] = useState<string>("Guest");

    useEffect(() => {
        if (session?.user?.name) {
            setUserName(session.user.name);
        }
    }, [session]);

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold">Welcome, {userName}!</h1>
            <p className="mt-2">
                This is the creator's dashboard. Here you can manage your
                content, check stats, and more.
            </p>

            <div className="mt-8">
                <h2 className="text-xl font-semibold">Your Recent Posts</h2>
                <ul className="list-disc pl-5 mt-2">
                    <li className="mb-2">How to Optimize Your Workflow</li>
                    <li className="mb-2">Understanding JavaScript Closures</li>
                    <li className="mb-2">Tips for CSS Grid Layouts</li>
                    <li className="mb-2">
                        Designing with Figma: A Beginner’s Guide
                    </li>
                </ul>
            </div>

            <div className="mt-8">
                <h2 className="text-xl font-semibold">Statistics</h2>
                <div className="flex flex-col md:flex-row md:space-x-4 mt-4">
                    <div className="bg-gray-200 dark:bg-gray-700 p-4 rounded-lg shadow-md flex-1">
                        <h3 className="text-lg font-medium">Total Views</h3>
                        <p className="text-3xl font-bold">12,345</p>
                    </div>
                    <div className="bg-gray-200 dark:bg-gray-700 p-4 rounded-lg shadow-md flex-1 mt-4 md:mt-0">
                        <h3 className="text-lg font-medium">Total Likes</h3>
                        <p className="text-3xl font-bold">678</p>
                    </div>
                    <div className="bg-gray-200 dark:bg-gray-700 p-4 rounded-lg shadow-md flex-1 mt-4 md:mt-0">
                        <h3 className="text-lg font-medium">New Comments</h3>
                        <p className="text-3xl font-bold">34</p>
                    </div>
                </div>
            </div>

            <div className="mt-8">
                <h2 className="text-xl font-semibold">Manage Your Content</h2>
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4">
                    Create New Post
                </button>
                <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-4 ml-4">
                    Delete All Posts
                </button>
            </div>
        </div>
    );
};

export default Creator;
