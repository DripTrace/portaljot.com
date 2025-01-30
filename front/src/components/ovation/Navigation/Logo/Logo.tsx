import { NavigationProps } from "@/lib/utils/constants";
import Link from "next/link";

const Logo = (navigation: NavigationProps) => {
    return (
        <Link href="/" passHref className="logo-link">
            {navigation.site.logo({
                id: "ovation-logo",
                className: "logo-container",
            })}
            <span className="logo-home">{navigation.site.name}</span>
        </Link>
    );
};

export default Logo;
