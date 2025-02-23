import { Session } from "next-auth";
import { useAuth } from "./useAuthSession";
import { signIn } from "next-auth/react";
import { type ComponentType } from "react";

type TSessionProps = {
	session: Session;
};

export function withAuth<P extends object>(refreshInterval?: number) {
	/*
    @param { number } refreshInterval: number of seconds before each refresh
  */
	return function (Component: ComponentType<P>) {
		return function (props: Exclude<P, TSessionProps>) {
			const { session, loading } = useAuth(refreshInterval);

			if (typeof window !== undefined && loading) {
				return null;
			}

			if (!loading && !session) {
				return (
					<>
						<p className="text-white">Not signed in</p>
						<br />
						<button className="text-white" onClick={() => signIn()}>
							Sign in
						</button>
						<pre className="text-white">
							{"User is not logged in"}
						</pre>
					</>
				);
			}

			return <Component session={session} {...props} />;
		};
	};
}
