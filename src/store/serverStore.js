import { create } from "zustand";

export const useServerStore = create((set) => ({
    isServerActive: false,
    setIsServerActive: (val) => set({ isServerActive: val }),
}));
