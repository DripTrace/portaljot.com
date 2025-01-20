// import Footer from "@/components/site/footer";
// import Navigation from "@/components/site/navigation";
// import { ClerkProvider } from "@clerk/nextjs";
// import { dark } from "@clerk/themes";
// import React from "react";

// const layout = ({ children }: { children: React.ReactNode }) => {
// 	return (
// 		<ClerkProvider appearance={{ baseTheme: dark }}>
// 			<main className="h-full">
// 				<Navigation />
// 				{children}
// 				{/* <Footer /> */}
// 			</main>
// 		</ClerkProvider>
// 	);
// };

// export default layout;

import Footer from "@/components/nexusconjure/site/footer";
import Navigation from "@/components/nexusconjure/site/navigation";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <ClerkProvider appearance={{ baseTheme: dark }}>
            <main className="layout-main">
                <Navigation />
                {children}
                {/* <Footer /> */}
            </main>
        </ClerkProvider>
    );
};

export default Layout;
