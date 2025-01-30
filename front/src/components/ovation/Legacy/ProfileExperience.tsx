import React, { useEffect, useState } from "react";

interface Experience {
    experienceId: number;
    latestCompany: string;
    latestRole: string;
    jobDesc: string;
}

interface ProfileExperienceProps {
    experience: string | Experience[];
}

const ProfileExperience: React.FC<ProfileExperienceProps> = ({
    experience,
}) => {
    const [processedExperience, setProcessedExperience] = useState<
        Experience[]
    >([]);

    useEffect(() => {
        if (typeof experience === "string") {
            const processed = experience.split("|").map((job: string) => {
                const [experienceId, latestCompany, latestRole, jobDesc] = job
                    .split(";")
                    .map((s) => s.trim());
                return {
                    experienceId: Number(experienceId),
                    latestCompany,
                    latestRole,
                    jobDesc,
                };
            });
            processed.sort((a, b) => b.experienceId - a.experienceId);
            setProcessedExperience(processed);
        } else if (Array.isArray(experience)) {
            const sortedExperience = [...experience].sort(
                (a, b) => b.experienceId - a.experienceId
            );
            setProcessedExperience(sortedExperience);
        }
    }, [experience]);

    const [showAll, setShowAll] = useState(false);

    if (processedExperience && processedExperience.length > 0) {
        return (
            <div>
                <div className="px-4 mb-4 text-4xl font-semibold mt-6">
                    Experience
                </div>
                {processedExperience
                    .slice(0, showAll ? 3 : 1)
                    .map((job, index) => (
                        <div key={index} className="mb-4">
                            <div className="mb-1">
                                Company: {job.latestCompany}
                            </div>
                            <div className="mb-1">Role: {job.latestRole}</div>
                            <div>Job Description: {job.jobDesc}</div>
                        </div>
                    ))}
                {processedExperience.length > 1 && (
                    <button
                        className="px-3 py-1 text-bgcolor font-bold bg-ovteal rounded-full hover:bg-opacity-80 transition duration-100"
                        onClick={() => setShowAll(!showAll)}
                    >
                        {showAll ? "Show Less" : "Show More"}
                    </button>
                )}
            </div>
        );
    }
    return <div></div>;
};

export default ProfileExperience;
