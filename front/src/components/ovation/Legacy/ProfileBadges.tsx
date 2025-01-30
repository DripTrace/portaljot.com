import React, { useEffect, useState } from "react";

interface Badge {
    name: string;
    imageUrl: string;
    description: string;
}

interface ProfileBadgesProps {
    badges: string | Badge[];
}

const ProfileBadges: React.FC<ProfileBadgesProps> = ({ badges }) => {
    const [processedBadges, setProcessedBadges] = useState<Badge[]>([]);

    useEffect(() => {
        if (typeof badges === "string") {
            const processed = badges.split(",").map((badge: string) => {
                const [name, imageUrl, description] = badge.split(";");
                return {
                    name,
                    imageUrl: `/images/badges/${imageUrl}`,
                    description,
                };
            });
            setProcessedBadges(processed);
        } else if (Array.isArray(badges)) {
            setProcessedBadges(badges);
        }
    }, [badges]);

    return (
        <>
            {processedBadges.map((badge: Badge) => (
                <div key={badge.name}>
                    <img
                        className="w-20 h-20 mx-10"
                        src={badge.imageUrl}
                        alt={badge.name}
                        title={badge.description}
                    />
                </div>
            ))}
        </>
    );
};

export default ProfileBadges;
