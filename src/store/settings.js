import { create } from "zustand";

export const useChangeBg = create((set) => ({
  bg: 1,
  setBg: (value) => {
    if (typeof window !== "undefined") {
      localStorage.setItem("bg", value);
    }
    set({ bg: value });
  },
  hydrate: () => {
    if (typeof window !== "undefined") {
      const storedBg = localStorage.getItem("bg");
      if (storedBg) {
        set({ bg: Number(storedBg) });
      }
    }
  },
}));
