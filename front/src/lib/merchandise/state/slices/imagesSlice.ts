import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ImageItem {
    id: string;
    url: string;
    description?: string; // Optional field if not always present
    // Add any other fields your images might have
}

interface ImagesState {
    items: ImageItem[];
}

const initialState: ImagesState = {
    items: [],
};

export const imagesSlice = createSlice({
    name: "images",
    initialState,
    reducers: {
        addToImages: (state, action: PayloadAction<ImageItem>) => {
            state.items = [...state.items, action.payload];
        },
        removeFromImages: (state, action: PayloadAction<{ id: string }>) => {
            const index = state.items.findIndex(
                (imagesItem) => imagesItem.id === action.payload.id
            );

            let newImages = [...state.items];

            if (index >= 0) {
                newImages.splice(index, 1);
            } else {
                console.warn(
                    `Can't remove the image (id: ${action.payload.id}) as it's not in your images bucket.`
                );
            }

            state.items = newImages;
        },
    },
});

export const { addToImages, removeFromImages } = imagesSlice.actions;

export const selectItems = (state: any) => state.images.items;

const imagesReducer = imagesSlice.reducer;

export default imagesReducer;
