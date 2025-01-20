// app/DomainContextInitializer.tsx
import { cookies } from "next/headers";

export function DomainContextInitializer() {
    const domainCookieStore = cookies();
    const domainContext =
        domainCookieStore.get("domainContext")?.value || "unknown";

    return (
        <>
            <script
                dangerouslySetInnerHTML={{
                    __html: `window.__DOMAIN_CONTEXT__ = "${domainContext}";`,
                }}
            />
            <script
                dangerouslySetInnerHTML={{
                    __html: `
            if (typeof window !== 'undefined') {
              window.__DOMAIN_CONTEXT__ = "${domainContext}";
            }
          `,
                }}
            />
        </>
    );
}
