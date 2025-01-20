import { create } from "zustand";

// Define the types for the store's state
interface ProgressState {
    isAnimating: boolean;
    setIsAnimating: (isAnimating: boolean) => void;
}

// Create the store with explicit types
const useProgressStore = create<ProgressState>((set) => ({
    isAnimating: false,
    setIsAnimating: (isAnimating) => set({ isAnimating }),
}));

export default useProgressStore;
