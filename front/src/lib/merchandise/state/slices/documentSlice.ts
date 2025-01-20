import { createSlice } from '@reduxjs/toolkit';

export const documentSlice = createSlice({
  name: 'document',
  initialState: {
    documentFile: null,
  },
  reducers: {
    setDocumentFile: (state, action) => {
      state.documentFile = action.payload;
    },
    resetDocumentFile: (state) => {
      state.documentFile = null;
    },
  },
});

export const { setDocumentFile, resetDocumentFile } = documentSlice.actions;

export const selectDocumentFile = (state: any) => state.document.documentFile;

export default documentSlice.reducer;
