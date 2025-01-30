// // components/ClientOnly.tsx
// "use client";

// import { useEffect, useState, ComponentType } from "react";

// interface ClientOnlyProps {
//     component: ComponentType<any>;
// }

// export default function ClientOnly({ component: Component }: ClientOnlyProps) {
//     const [hasMounted, setHasMounted] = useState(false);

//     useEffect(() => {
//         setHasMounted(true);
//     }, []);

//     if (!hasMounted) {
//         return null;
//     }

//     return <Component />;
// }

export default function ClientOnly() {}
