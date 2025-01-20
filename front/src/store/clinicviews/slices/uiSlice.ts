import { createSlice, PayloadAction, AnyAction } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";

interface UIState {
	isMenuOpen: boolean;
	theme: "light" | "dark";
}

const initialState: UIState = {
	isMenuOpen: false,
	theme: "light",
};

const uiSlice = createSlice({
	name: "ui",
	initialState,
	reducers: {
		toggleMenu: (state) => {
			state.isMenuOpen = !state.isMenuOpen;
		},
		setTheme: (state, action: PayloadAction<"light" | "dark">) => {
			state.theme = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder.addCase(HYDRATE, (state, action: AnyAction) => {
			if (action.payload && action.payload.ui) {
				return {
					...state,
					...action.payload.ui,
				};
			}
			return state;
		});
	},
});

export const { toggleMenu, setTheme } = uiSlice.actions;
export default uiSlice.reducer;
