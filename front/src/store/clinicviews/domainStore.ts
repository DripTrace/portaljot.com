import { configureStore, createSlice, PayloadAction } from "@reduxjs/toolkit";

interface DomainState {
    domainContext: string;
}

const getInitialDomainState = (): DomainState => {
    if (typeof window !== "undefined") {
        return {
            domainContext: (window as any).__DOMAIN_CONTEXT__ || "unknown",
        };
    }
    return { domainContext: "unknown" };
};

const domainSlice = createSlice({
    name: "domain",
    initialState: getInitialDomainState(),
    reducers: {
        setDomainContext: (state, action: PayloadAction<string>) => {
            state.domainContext = action.payload;
        },
    },
});

export const { setDomainContext } = domainSlice.actions;

export const domainStore = configureStore({
    reducer: {
        app: domainSlice.reducer,
    },
});

export type RootDomainState = ReturnType<typeof domainStore.getState>;
export type DomainDispatch = typeof domainStore.dispatch;
