"use server";

interface PageProps {
    params: Record<string, string>;
    searchParams: Record<string, string | string[]>;
}

export default async function Page({ params, searchParams }: PageProps) {
    return <h1>Api</h1>;
}
