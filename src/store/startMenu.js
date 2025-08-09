import { create } from "zustand";

export const useStartMenu = create((set, get) => ({
  isOpenStartMenu: false,

  OpenModelStartMenuChange: (value) => {
    set({ isOpenStartMenu: value });
  },
}));
