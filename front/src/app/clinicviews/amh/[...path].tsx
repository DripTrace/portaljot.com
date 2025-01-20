import { GetServerSideProps } from "next";
import { useRouter } from "next/router";

interface PageProps {
    appContext: string;
}

export default function AMHPage({ appContext }: PageProps) {
    const router = useRouter();
    const { path } = router.query;

    return (
        <div>
            <h1>Welcome to AMH</h1>
            <p>Current context: {appContext}</p>
            <p>Current path: {Array.isArray(path) ? path.join("/") : path}</p>
        </div>
    );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const appContext =
        (context.req.headers["x-app-context"] as string) || "unknown";

    return {
        props: { appContext },
    };
};
