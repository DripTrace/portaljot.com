import { configureStore } from "@reduxjs/toolkit";
import convoReducer from "../reducers/convoReducer";

const convoStore = configureStore({
  reducer: {
    convo: convoReducer,
  },
});

export type ConvoAppDispatch = typeof convoStore.dispatch;
export type ConvoRootState = ReturnType<typeof convoStore.getState>;

export default convoStore;

