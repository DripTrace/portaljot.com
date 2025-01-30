import "./profile-button.css";

interface ProfileButtonProps {
    /**
     * Is this the principal call to action on the page?
     */
    primary?: boolean;
    /**
     * What background color to use
     */
    backgroundColor?: string;
    /**
     * How large should the profile button be?
     */
    size?: "small" | "medium" | "large";
    /**
     * Profile Button contents
     */
    label: string;
    /**
     * Optional click handler
     */
    onClick?: () => void;
}

/**
 * Primary UI component for user interaction
 */
export const ProfileButton = ({
    primary = false,
    size = "medium",
    backgroundColor,
    label,
    ...props
}: ProfileButtonProps) => {
    const mode = primary
        ? "profile-button--primary"
        : "profile-button--secondary";
    return (
        <button
            type="button"
            className={["profile-button", `profile-button--${size}`, mode].join(
                " "
            )}
            {...props}
        >
            {label}
            <style jsx>{`
                button {
                    background-color: ${backgroundColor};
                }
            `}</style>
        </button>
    );
};
