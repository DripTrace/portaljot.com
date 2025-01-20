import Link from "next/link";

export const dynamic = "auto";

export default function Page() {
    return (
        <>
            <h1>You are offline!</h1>
            <Link href="/" prefetch={false}>
                back home
            </Link>
        </>
    );
}
