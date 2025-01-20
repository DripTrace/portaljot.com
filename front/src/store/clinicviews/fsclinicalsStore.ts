import { configureStore } from "@reduxjs/toolkit";
import fsclinicalsThemeReducer from "./slices/fsclinicalsThemeSlice";

export const fsclinicalsStore = configureStore({
    reducer: {
        theme: fsclinicalsThemeReducer,
    },
});

export type FSClinicalsRootState = ReturnType<typeof fsclinicalsStore.getState>;
export type FSClinicalsAppDispatch = typeof fsclinicalsStore.dispatch;
