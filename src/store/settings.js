import { create } from "zustand";

export const useChangeBg = create((set) => ({
  bg: typeof window !== "undefined" ? localStorage.getItem("bg") || 1 : 1,
  setBg: (value) => {
    if (typeof window !== "undefined") {
      localStorage.setItem("bg", value);
    }
    set({ bg: value });
  },
}));
