import { create } from "zustand";

export const useRightClickModal = create((set) => ({
  isOpenModelRightClick: false,
  OpenModelRightClickChange: (value) => set({ isOpenModelRightClick: value }),
}));