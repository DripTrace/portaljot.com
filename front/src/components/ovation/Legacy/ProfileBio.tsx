import React from "react";

interface ProfileBioProps {
    bio: string;
}

const ProfileBio: React.FC<ProfileBioProps> = ({ bio }) => {
    const convertUnicode = (str: string) => {
        return str.replace(/\\u(\w\w\w\w)/g, function (a, b) {
            const charcode = parseInt(b, 16);
            return String.fromCharCode(charcode);
        });
    };

    return (
        <>
            {bio &&
                bio.split("\n").map((line, index) => (
                    <React.Fragment key={index}>
                        {convertUnicode(line)}
                        <br />
                    </React.Fragment>
                ))}
        </>
    );
};

export default ProfileBio;
