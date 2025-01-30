// ProfileExperienceEdit.tsx
"use client";
import React, { useEffect, useState } from "react";
import { PiTrash } from "react-icons/pi";
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";

interface Experience {
    experienceId?: number;
    userId: string;
    company: string;
    role: string;
    jobDescription: string;
}

interface Props {
    experience: Experience[] | any;
    setExperience: (experience: Experience[]) => void;
}

const ProfileExperienceEdit: React.FC<Props> = ({
    experience,
    setExperience,
}) => {
    //const [experience, setExperience] = useState<Experience[]>([]);
    const { data: session } = useSession();
    const [userId, setUserId] = useState<number | null>(null);
    const [experienceChanged, setExperienceChanged] = useState(false);
    useEffect(() => {
        if (session && session.user) {
            setUserId(Number(session.user.id));
        }
    }, [session]);

    useEffect(() => {
        if (typeof experience === "string") {
            const parsedExperience: Experience[] = experience
                .split("|")
                .map((exp: string) => {
                    const [
                        experienceId,
                        userId,
                        company,
                        role,
                        jobDescription,
                    ] = exp.split(";").map((field) => field.trim());
                    return {
                        experienceId: Number(experienceId),
                        userId,
                        company,
                        role,
                        jobDescription,
                    };
                });
            setExperience(parsedExperience);
        }
    }, [experience, setExperience]);

    const addExperience = () => {
        setExperience([
            ...(experience || []),
            { experienceId: null, company: "", role: "", jobDescription: "" },
        ]);
    };

    const handleBlur = (index: number) => {
        if (!experienceChanged) {
            return;
        }
        console.log("handleBlur");
        const exp = experience[index];
        if (exp.company && exp.role && exp.jobDescription) {
            exp.userId = userId;
            fetch("/api/updateExperience", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ exp }),
            })
                .then((response) => {
                    if (!response.ok) {
                        throw new Error("Network response was not ok");
                    }
                    return response.json();
                })
                .then((data) => {
                    // If this was a new experience, update the experienceId with the ID returned from the server
                    if (!exp.experienceId) {
                        const newExperience = [...experience];
                        newExperience[index].experienceId = data.experienceId;
                        setExperience(newExperience);
                    }
                    toast.success("Experience saved successfully");
                })
                .catch(() => {
                    toast.error("Failed to save experience");
                });
        }
        setExperienceChanged(false);
    };

    const deleteExperience = (index: number) => {
        const deletedExperience = experience[index];
        const updatedExperience = experience.filter(
            (_: any, i: number) => i !== index
        );
        setExperience(updatedExperience);

        fetch("/api/updateExperience", {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                exp: {
                    experienceId: deletedExperience.experienceId,
                    userId: userId,
                },
            }),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.json();
            })
            .then(() => {
                toast.success("Experience deleted successfully");
            })
            .catch(() => {
                toast.error("Failed to delete experience");
            });
    };

    return (
        <>
            <div>
                {experience &&
                    Array.isArray(experience) &&
                    experience.map((exp, index) => (
                        <div key={index}>
                            <PiTrash
                                onClick={() => deleteExperience(index)}
                                className="ml-2 cursor-pointer"
                            />
                            <div onBlur={() => handleBlur(index)}>
                                <input
                                    id={`company-${index}`}
                                    className="w-full p-2 bg-bgcolor border-b border-ovteal placeholder:font-bold outline-none placeholder:pl-1"
                                    placeholder="Company"
                                    value={exp.company}
                                    onChange={(e) => {
                                        const newExperience = [...experience];
                                        newExperience[index].company =
                                            e.target.value;
                                        setExperience(newExperience);
                                        setExperienceChanged(true);
                                    }}
                                />
                                <input
                                    id={`role-${index}`}
                                    className="w-full p-2 bg-bgcolor border-b border-ovteal placeholder:font-bold outline-none placeholder:pl-1"
                                    placeholder="Role"
                                    value={exp.role}
                                    onChange={(e) => {
                                        const newExperience = [...experience];
                                        newExperience[index].role =
                                            e.target.value;
                                        setExperience(newExperience);
                                        setExperienceChanged(true);
                                    }}
                                />
                                <input
                                    id={`jobDescription-${index}`}
                                    className="w-full p-2 bg-bgcolor border-b border-ovteal placeholder:font-bold outline-none placeholder:pl-1"
                                    placeholder="Job Description"
                                    value={exp.jobDescription}
                                    onChange={(e) => {
                                        const newExperience = [...experience];
                                        newExperience[index].jobDescription =
                                            e.target.value;
                                        setExperience(newExperience);
                                        setExperienceChanged(true);
                                    }}
                                />
                            </div>
                            {experience &&
                                index < (experience as any[]).length - 1 && (
                                    <hr className="my-4" />
                                )}{" "}
                            {/* Add a horizontal line between each set, except after the last one */}
                        </div>
                    ))}
            </div>
            <button
                onClick={addExperience}
                type="button"
                className="mb-3 p-2 mt-3 text-ovteal bg-bgcolor border rounded-full border-ovteal hover:bg-white/10 transition duration-100"
            >
                Add Experience
            </button>
        </>
    );
};

export default ProfileExperienceEdit;
