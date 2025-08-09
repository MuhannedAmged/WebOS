import { create } from "zustand";

export const useMinimizeThisPc = create((set, get) => ({
  isMinimizedThisPc: false,

  toggleMinimizeThisPc: () => {
    const current = get().isMinimizedThisPc;
    set({ isMinimizedThisPc: !current });
  },
}));

export const useMinimizeBrowser = create((set, get) => ({
  isMinimizedBrowser: false,

  toggleMinimizeBrowser: () => {
    const current = get().isMinimizedBrowser;
    set({ isMinimizedBrowser: !current });
  },
}));

export const useMinimizeNotepad = create((set, get) => ({
  isMinimizedNotepad: false,

  toggleMinimizeNotepad: () => {
    const current = get().isMinimizedNotepad;
    set({ isMinimizedNotepad: !current });
  },
}));

export const useMinimizeSettings = create((set, get) => ({
  isMinimizedSettings: false,

  toggleMinimizeSettings: () => {
    const current = get().isMinimizedSettings;
    set({ isMinimizedSettings: !current });
  },
}));
export const useMinimizeTerminal = create((set, get) => ({
  isMinimizedTerminal: false,

  toggleMinimizeTerminal: () => {
    const current = get().isMinimizedTerminal;
    set({ isMinimizedTerminal: !current });
  },
}));
