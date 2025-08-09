import { create } from "zustand";

export const useDateMenu = create((set, get) => ({
  isOpenDateMenu: false,

  OpenModelDateMenuChange: (value) => {
    set({ isOpenDateMenu: value });
  },
}));
