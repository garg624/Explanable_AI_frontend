import { create } from "zustand";

export const useFooterStore = create((set) => ({
    footerNote: "",
    footerNoteColor: "",
    setFooterNote: (note, color) => set({ footerNote: note, footerNoteColor: color }),
}));
