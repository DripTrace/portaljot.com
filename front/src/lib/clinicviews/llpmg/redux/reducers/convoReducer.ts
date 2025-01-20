
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ConvoState {
  transcribedText: string;
  conversation: string;
}

const initialState: ConvoState = {
  transcribedText: "",
  conversation: "",
};

const convoSlice = createSlice({
  name: "convo",
  initialState,
  reducers: {
    updateTranscribedText(state, action: PayloadAction<string>) {
      state.transcribedText = action.payload;
    },
    addSystemMessage(state, action: PayloadAction<string>) {
      state.conversation += `System: ${action.payload}\n`;
    },
    addPatientMessage(state, action: PayloadAction<string>) {
      state.conversation += `Patient: ${action.payload}\n`;
    },
    updateConversation(state, action: PayloadAction<string>) {
      state.conversation = action.payload;
    },
  },
});

export const {
  updateTranscribedText,
  addSystemMessage,
  addPatientMessage,
  updateConversation,
} = convoSlice.actions;

// Export the 
export default convoSlice.reducer;
