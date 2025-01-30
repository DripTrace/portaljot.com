"use client";

import { HomeInfo } from "@/lib/utils/constants";
import Link from "next/link";

const HomeGetStarted = () => {
    const { navigation, introduction, content } = HomeInfo;
    return (
        <div>
            <div className="get-started-container">
                <div className="gs-title">{content.getStarted.name}</div>
                <div className="gs-desc">{content.getStarted.desc}</div>
                <div className="task-container">
                    {content.getStarted.tasks.map((task, index) => (
                        <div key={index}>
                            <div className="flex task">
                                <task.icon className="task-icon" />
                                <div className="flex-col">
                                    <div className="gs-title">{task.name}</div>
                                    <div className="gs-desc">{task.desc}</div>
                                </div>
                                <div className="flex justify-end flex-grow">
                                    <Link href={task.path}>
                                        <button className="gs-button">
                                            {task.button}
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default HomeGetStarted;
