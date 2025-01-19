const description = "Access exclusive merch from OBINSUN";
const title = "Your SWAG store";
const url = "https://localhost:420";

const seo = {
    title,
    titleTemplate: "%s | Obinsun Merch",
    description,
    openGraph: {
        description,
        title,
        type: "website",
        url,
    },
    twitter: {
        handle: "@obinsun",
        site: "@obinsun",
    },
};

export { seo as defaultSEO, url as defaultUrl };
