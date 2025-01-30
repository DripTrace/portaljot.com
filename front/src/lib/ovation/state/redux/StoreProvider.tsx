// "use client";
// import { useRef } from "react";
// import { Provider } from "react-redux";
// import { makeStore, AppStore } from "@/lib/state/store";
// import { selectCount } from "../features/counter/counterSlice";
// // import { initializeCount } from '../lib/features/counter/counterSlice'

// export default function StoreProvider({
//     children,
// }: {
//     children: React.ReactNode;
// }) {
//     const storeRef = useRef<AppStore>();
//     if (!storeRef.current) {
//         // Create the store instance the first time this renders
//         storeRef.current = makeStore();
//         // storeRef.current.dispatch(initializeCount(count))
//         // storeRef.current.dispatch(selectCount(count))
//     }

//     return <Provider store={storeRef.current}>{children}</Provider>;
// }

"use client";

import { Provider } from "react-redux";
import { store } from "./store";

export function Providers({ children }: { children: React.ReactNode }) {
    return <Provider store={store}>{children}</Provider>;
}
