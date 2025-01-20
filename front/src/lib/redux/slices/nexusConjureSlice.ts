import { createSlice, PayloadAction, AnyAction } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";

export type NCThemeState = "nc-light" | "nc-dark";

interface NexusConjureUIState {
	isMenuOpen: boolean;
	theme: NCThemeState;
}

const initialState: NexusConjureUIState = {
	isMenuOpen: false,
	theme: "nc-dark",
};

const nexusConjureSlice = createSlice({
	name: "nexusConjure",
	initialState,
	reducers: {
		NexusConjureToggleMenu: (state) => {
			state.isMenuOpen = !state.isMenuOpen;
		},
		NexusConjureSetTheme: (state, action: PayloadAction<NCThemeState>) => {
			state.theme = action.payload;
		},
		NexusConjureToggleTheme: (state) => {
			state.theme = state.theme === "nc-dark" ? "nc-light" : "nc-dark";
		},
	},
	extraReducers: (builder) => {
		builder.addCase(HYDRATE, (state, action: AnyAction) => {
			if (action.payload && action.payload.nexusConjure) {
				return {
					...state,
					...action.payload.nexusConjure,
				};
			}
			return state;
		});
	},
});

export const {
	NexusConjureToggleMenu,
	NexusConjureSetTheme,
	NexusConjureToggleTheme,
} = nexusConjureSlice.actions;
export default nexusConjureSlice.reducer;
