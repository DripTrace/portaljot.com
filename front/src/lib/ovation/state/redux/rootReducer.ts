import { combineReducers } from "redux";
import mainSliceReducer from "./slices/mainSliceReducer";

const rootReducer = combineReducers({
    cards: mainSliceReducer,
});

export default rootReducer;
