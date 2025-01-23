import {
	ConvoAppDispatch,
	ConvoRootState,
} from "@/lib/clinicviews/llpmg/redux/stores/convoStore";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

export const useConvoAppDispatch = () => useDispatch<ConvoAppDispatch>();
export const useConvoAppSelector: TypedUseSelectorHook<ConvoRootState> =
	useSelector;
