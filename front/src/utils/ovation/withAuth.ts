// utils/withAuth.ts
import {
    GetServerSideProps,
    GetServerSidePropsContext,
    GetServerSidePropsResult,
} from "next";
import { getSession } from "next-auth/react";
export function withAuth<P extends { [key: string]: any }>(
    gssp?: GetServerSideProps<P>
): GetServerSideProps<P> {
    return async (
        context: GetServerSidePropsContext
    ): Promise<GetServerSidePropsResult<P>> => {
        const session = await getSession(context);
        if (!session) {
            return {
                redirect: {
                    destination: "/signin",
                    permanent: false,
                },
            };
        }

        return gssp ? await gssp(context) : { props: {} as P };
    };
}
