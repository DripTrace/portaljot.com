// store/store.ts
import { configureStore } from "@reduxjs/toolkit";
import anAMHDarkModeReducer from "@/store/access-mentalhealth/anAMHDarkModeSlice";

export const anAMHStore = configureStore({
    reducer: {
        anAMHDarkMode: anAMHDarkModeReducer,
    },
});

export type AMHRootState = ReturnType<typeof anAMHStore.getState>;
export type AMHAppDispatch = typeof anAMHStore.dispatch;
