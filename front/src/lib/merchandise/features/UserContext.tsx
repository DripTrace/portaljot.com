"use client";

import { AccessControl, Permission } from "accesscontrol";
import { useSession } from "next-auth/react";
import {
    createContext,
    useCallback,
    useContext,
    useEffect,
    ReactNode,
} from "react";

const ac = new AccessControl();

interface UserContextProps {
    access: (
        resource: string,
        action: string,
        possession: string
    ) => Permission;
    loading: boolean;
    user: any; // You can replace 'any' with a more specific user type if available
}

export const UserContext = createContext<UserContextProps>({
    access: () => ({ granted: false }) as Permission,
    loading: false,
    user: {},
});

export const useUserContext = () => useContext(UserContext);

interface UserProviderProps {
    children: ReactNode;
}

const UserProvider = ({ children }: UserProviderProps) => {
    const { data: session, status } = useSession();
    const loading = status === "loading";

    const permissions = session?.user?.permissions || {};

    useEffect(() => {
        ac.setGrants(permissions);
        return () => {
            ac.reset();
        };
    }, [permissions]);

    const role = session?.user?.role || "guest";
    const access = useCallback(
        (resource: string, action: string, possession: string): Permission => {
            try {
                return ac.permission({
                    role,
                    resource,
                    action,
                    possession,
                });
            } catch {
                return { granted: false } as Permission;
            }
        },
        [role]
    );

    const context = {
        access,
        loading,
        user: session?.user,
    };

    return (
        <UserContext.Provider value={context}>{children}</UserContext.Provider>
    );
};

export default UserProvider;
