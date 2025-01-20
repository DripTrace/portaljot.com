import "@/styles/advanced-practice/advancedpractice.css";

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body>
                <div className="smooth-scroll">{children}</div>
            </body>
        </html>
    );
}
