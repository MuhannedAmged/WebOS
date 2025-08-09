import { create } from "zustand";

export const useOptionsMenu = create((set, get) => ({
  isOpenOptionsMenu: false,

  OpenModelOptionsMenuChange: (value) => {
    set({ isOpenOptionsMenu: value });
  },
}));
