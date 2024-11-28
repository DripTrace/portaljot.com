"use client";

import { AccessControl, type Permission } from "accesscontrol";
// import ac from "@/lib/modify/authentication/accessControl";
import { useSession } from "next-auth/react";
import {
	createContext,
	useCallback,
	useContext,
	useEffect,
	ReactNode,
} from "react";

interface GlassModifyUserContextProps {
	access: (
		resource: string,
		action: string,
		possession: string
	) => Permission;
	loading: boolean;
	user: any; // You can replace 'any' with a more specific user type if available
}

const ac = new AccessControl();

export const GlassModifyUserContext =
	createContext<GlassModifyUserContextProps>({
		access: () => ({ granted: false }) as Permission,
		loading: false,
		user: {},
	});

export const useGlassModifyUserContext = () =>
	useContext(GlassModifyUserContext);

interface UserProviderProps {
	children: ReactNode;
}

const UserProvider = ({ children }: UserProviderProps) => {
	const { data: session, status } = useSession();
	const loading = status === "loading";

	// if (!session) {
	// 	// User is not logged in, handle accordingly
	// 	console.log("log in ...");
	// 	return;
	// }

	// if (!session) {
	// 	// User is not logged in, handle accordingly
	// 	return <div>Please log in.</div>;
	// }

	// const permissions = session?.user?.permissions || {
	// 	guest: {
	// 		resource: {
	// 			readOwn: ["*"],
	// 		},
	// 	},
	// };

	const permissions = session?.user?.permissions || {
		guest: {
			resource: {
				readAny: ["*"],
			},
		},
	};

	useEffect(() => {
		console.log("SESSION IN CONTEXT: ", session);
		console.log("Permissions:", permissions);
		try {
			ac.setGrants(permissions);
		} catch (error) {
			console.error("Error setting grants:", error);
		}
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
		<GlassModifyUserContext.Provider value={context}>
			{children}
		</GlassModifyUserContext.Provider>
	);
};

export default UserProvider;
