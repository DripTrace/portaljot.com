import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import type { RootDomainState, DomainDispatch } from "./domainStore";

export const useDomainDispatch = () => useDispatch<DomainDispatch>();
export const useDomainSelector: TypedUseSelectorHook<RootDomainState> =
    useSelector;
