import React from "react";
import {
    PiPaintBrushBold,
    PiHeartBold,
    PiCirclesThreePlusBold,
    PiFadersBold,
} from "react-icons/pi";

interface ProfileIconsProps {
    paths: string[];
}

const ProfileIcons: React.FC<ProfileIconsProps> = ({ paths }) => {
    return (
        <>
            {Array.isArray(paths) &&
                paths.map((pathType) => {
                    let IconComponent: React.ComponentType<{
                        size: number;
                    }> | null = null;
                    let color = "";
                    let description = "";
                    switch (pathType) {
                        case "artist":
                            IconComponent = PiPaintBrushBold;
                            color = "green";
                            description =
                                "Create and share their own original artwork.";
                            break;
                        case "enthusiast":
                            IconComponent = PiHeartBold;
                            color = "red";
                            description =
                                "Passionate about the community and actively participate in discussions and events.";
                            break;
                        case "project":
                            IconComponent = PiCirclesThreePlusBold;
                            color = "blue";
                            description =
                                "Initiated and managed one or more projects within the community.";
                            break;
                        case "trader":
                            IconComponent = PiFadersBold;
                            color = "purple";
                            description = "Active trader in the marketplace.";
                            break;
                        default:
                            break;
                    }
                    return (
                        <div
                            key={pathType}
                            className="text-bgcolor mx-5"
                            style={{
                                backgroundColor: color,
                                width: "33px",
                                height: "33px",
                                borderRadius: "50%",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                marginRight: "4px",
                            }}
                            title={description}
                        >
                            {IconComponent && <IconComponent size={25} />}
                        </div>
                    );
                })}
        </>
    );
};

export default ProfileIcons;
