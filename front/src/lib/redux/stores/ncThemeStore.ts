import { configureStore } from "@reduxjs/toolkit";
import NexusConjureReducer from "@/lib/redux/slices/nexusConjureSlice";

export const ncThemeStore = configureStore({
	reducer: {
		nexusConjure: NexusConjureReducer,
	},
	devTools: process.env.NODE_ENV !== "production",
});

export type NexusConjureRootState = ReturnType<typeof ncThemeStore.getState>; // Export NexusConjureRootState type
export type NexusConjureAppDispatch = typeof ncThemeStore.dispatch;
