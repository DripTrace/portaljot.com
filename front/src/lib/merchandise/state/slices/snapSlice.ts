import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SnapState {
    user: string | null;
    selectedImage: string | null;
}

const initialState: SnapState = {
    user: null,
    selectedImage: null,
};

export const snapSlice = createSlice({
    name: "snap",
    initialState,
    reducers: {
        selectImage: (state, action: PayloadAction<string>) => {
            state.selectedImage = action.payload;
        },
        resetImage: (state) => {
            state.selectedImage = null;
        },
    },
});

export const { selectImage, resetImage } = snapSlice.actions;

export const selectSelectedImage = (state: { snap: SnapState }) =>
    state.snap.selectedImage;

export default snapSlice.reducer;
