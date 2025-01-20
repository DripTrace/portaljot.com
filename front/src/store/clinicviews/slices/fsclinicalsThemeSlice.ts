import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface FSClinicalsThemeState {
    fsclinicalsIsDarkMode: boolean;
}

const initialState: FSClinicalsThemeState = {
    fsclinicalsIsDarkMode: false,
};

const fsclinicalsThemeSlice = createSlice({
    name: "theme",
    initialState,
    reducers: {
        fsclinicalsToggleDarkMode: (fsclinicalsState) => {
            fsclinicalsState.fsclinicalsIsDarkMode =
                !fsclinicalsState.fsclinicalsIsDarkMode;
        },
        fsclinicalsSetDarkMode: (
            fsclinicalsState,
            fsclinicalsAction: PayloadAction<boolean>
        ) => {
            fsclinicalsState.fsclinicalsIsDarkMode = fsclinicalsAction.payload;
        },
    },
});

export const { fsclinicalsToggleDarkMode, fsclinicalsSetDarkMode } =
    fsclinicalsThemeSlice.actions;
export default fsclinicalsThemeSlice.reducer;
