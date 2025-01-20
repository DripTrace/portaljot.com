"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import { useUserContext } from "../features/UserContext";
import { Permission } from "accesscontrol";

interface MainNavProps {
    // Define any props passed to MainNav if necessary
}

const MainNav = (props: MainNavProps) => {
    const { data: session, status } = useSession();
    console.log(session);
    const { access } = useUserContext();

    return (
        <ul>
            <li>
                <Link href="/merchandise">
                    <span>Home</span>
                </Link>
            </li>
            {access("app", "read", "any").granted && (
                <li>
                    <Link href="/merchandise/routes/protected/admin/users">
                        <span>Manage App</span>
                    </Link>
                </li>
            )}
            {access("users", "read", "any").granted && (
                <li>
                    <Link href="/routes/merchandise/protected/creator/studio">
                        <span>Manage Users</span>
                    </Link>
                </li>
            )}
            {access("users", "read", "own").granted && (
                <li>
                    <Link href="/merchandise/routes/protected/profile">
                        <span>Profile</span>
                    </Link>
                </li>
            )}
        </ul>
    );
};

export default MainNav;
