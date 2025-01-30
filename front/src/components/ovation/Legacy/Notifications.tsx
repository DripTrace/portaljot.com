"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { PiBell, PiBellFill } from "react-icons/pi";

type UserType = {
    id: string;
};

type Notification = {
    id: number;
    user_id: number;
    action: string;
    from_id: number;
    target: string;
    target_id: number | null;
    timestamp: string;
    viewed: number;
    from_username: string;
    from_image: string;
};

const Notifications = () => {
    const { data: session, status } = useSession();
    const initialItemCount = 10;
    const [itemCount, setItemCount] = useState(initialItemCount);
    const router = useRouter();
    const [userId, setUserId] = useState<string | null>(null);
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (status === "authenticated" && session?.user) {
            setUserId(session.user.id);
        } else {
            router.push("/signin");
        }
    }, [status, session, router]);

    useEffect(() => {
        setIsLoading(true);
        fetch(`/api/notifications?userId=${userId}`)
            .then((response) => response.json())
            .then((data) => {
                setNotifications(data);
                setIsLoading(false);
            });
    }, [userId]);

    if (status === "loading") {
        return <p>Loading...</p>;
    }

    return (
        <main className="ml-[400px] flex w-[1040px] h-full min-h-[1350px] flex-col border-r border-l border-neutral-600">
            <div className="border-b border-neutral-600 h-40 bg-bgcolor sticky top-0">
                <div className="flex text-ovteal justify-center mt-8">
                    <PiBellFill size={50} />
                </div>
            </div>
            <div className="flex flex-col">
                {isLoading ? (
                    <p className="p-20">Loading...</p>
                ) : notifications.length > 0 ? (
                    notifications.map((notification, i) => (
                        <div
                            key={i}
                            className="border-t-0.5 p-4 border-b flex space-x-4 border-neutral-600"
                        >
                            <div className="flex justify-center items-center">
                                <div className="text-ovteal mr-2">
                                    <PiBell size={20} />
                                </div>
                                <div className="flex flex-col items-center mr-5">
                                    <Link
                                        href={`/profile/${notification.from_id}`}
                                        className="flex flex-col items-center font-bold mr-1 hover:text-ovteal"
                                    >
                                        <img
                                            src={`/images/users/${notification.from_id}/${notification.from_image}`}
                                            alt={notification.from_username}
                                            className="w-9 h-9 text-ovteal rounded-full mr-2 object-cover"
                                            onError={(e) => {
                                                (
                                                    e.target as HTMLImageElement
                                                ).src = "/defaultPfp.svg";
                                            }}
                                        />

                                        {notification.from_username}
                                    </Link>
                                </div>
                                <div>
                                    <div>
                                        {notification.action
                                            .split("\n")
                                            .map((item, key) => {
                                                return (
                                                    <span key={key}>
                                                        {item}
                                                        <br />
                                                    </span>
                                                );
                                            })}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="p-20">No notifications</p>
                )}
            </div>
        </main>
    );
};

export default Notifications;
