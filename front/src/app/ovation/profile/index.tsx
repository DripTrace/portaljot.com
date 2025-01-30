import { GetServerSidePropsContext } from "next";
import { getSession } from "next-auth/react";
import { Session } from "next-auth";
// import profile from "./profile";

interface User {
    id: string;
    name: string;
    email: string;
    image: string;
}

interface CustomSession extends Session {
    user: User;
}

// export default function ProfilePage() {
//     // This component will never be rendered
//     return null;
// }

// export default { profile };

export async function getServerSideProps(context: GetServerSidePropsContext) {
    const session = (await getSession(context)) as CustomSession | null;

    if (session?.user) {
        return {
            redirect: {
                destination: `/profile/${session.user.id}`,
                permanent: false,
            },
        };
    }

    return {
        props: {}, // Add any other props you need
    };
}
