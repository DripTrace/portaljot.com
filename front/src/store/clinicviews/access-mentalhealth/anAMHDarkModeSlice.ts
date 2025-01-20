// store/darkModeSlice.ts
import { createSlice } from "@reduxjs/toolkit";

interface AMHDarkModeState {
    isAMHDarkMode: boolean;
}

const initialAMHState: AMHDarkModeState = {
    isAMHDarkMode: false,
};

const anAMHDarkModeSlice = createSlice({
    name: "anAMHDarkMode",
    initialState: initialAMHState,
    reducers: {
        toggleAMHDarkMode(state) {
            state.isAMHDarkMode = !state.isAMHDarkMode;
        },
        setAMHDarkMode(state, action) {
            state.isAMHDarkMode = action.payload;
        },
    },
});

export const { toggleAMHDarkMode, setAMHDarkMode } = anAMHDarkModeSlice.actions;
export default anAMHDarkModeSlice.reducer;
