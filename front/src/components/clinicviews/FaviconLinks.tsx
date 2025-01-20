// // app/layout.tsx

// import { Metadata } from "next";
// import { cookies } from "next/headers";
// import "@/styles/globals.css";
// import { getFavicon } from "@/utils/getFavicon";
// import ClientLayout from "./ClientLayout";

// export async function generateMetadata(): Promise<Metadata> {
//   const cookieStore = cookies();
//   const domainContext = cookieStore.get("domainContext")?.value || "driptrace";
//   const favicon = getFavicon(domainContext);

//   return {
//     manifest: "/manifest.webmanifest",
//     icons: {
//       icon: favicon.icon,
//       apple: favicon.apple,
//       shortcut: favicon.shortcut,
//     },
//     // other metadata...
//   };
// }

// export default function RootLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   const cookieStore = cookies();
//   const domainContext = cookieStore.get("domainContext")?.value || "driptrace";
//   const favicon = getFavicon(domainContext);

//   return (
//     <html lang="en">
//       <head>
//         <link rel="manifest" href="/manifest.webmanifest" />
//         <link rel="icon" href={favicon.icon} />
//         <link rel="apple-touch-icon" href={favicon.apple} />
//         <link rel="shortcut icon" href={favicon.shortcut} />
//       </head>
//       <body>
//         <ClientLayout>{children}</ClientLayout>
//       </body>
//     </html>
//   );
// }

export default function FaviconLinks() {}
