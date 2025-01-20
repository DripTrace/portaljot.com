import Link from "next/link";

type SidebarLinkWrapperProps = {
    href: string;
    onClick: () => void;
    children: React.ReactNode; // Include children prop
};

const SidebarLinkWrapper: React.FC<SidebarLinkWrapperProps> = ({
    href,
    onClick,
    children,
}) => (
    <Link href={href} passHref onClick={onClick}>
        {children}
    </Link>
);

export default SidebarLinkWrapper;
