import { create } from "zustand";

export const useZIndexApps = create((set, get) => ({
  zIndexApp: "",

  zIndexAppChange: (value) => {
    set({ zIndexApp: value });
  },
}));
