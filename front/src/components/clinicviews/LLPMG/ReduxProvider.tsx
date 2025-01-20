"use client";

import { store } from "@/store/store";
import React from "react";
import { Provider } from "react-redux";
// import { wrapper } from "../../store/store"; // Adjust this import path as needed

export function ReduxProvider({ children }: { children: React.ReactNode }) {
	// const { store, props } = wrapper.useWrappedStore(children);

	return <Provider store={store}>{children}</Provider>;
}
