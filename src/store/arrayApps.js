import { create } from "zustand";

export const useArrayApps = create((set) => ({
  arrayApps: [],

  addApp: (app) =>
    set((state) =>
      Array.isArray(state.arrayApps)
        ? { arrayApps: [...state.arrayApps, app] }
        : { arrayApps: [app] }
    ),

  removeApp: (name) =>
    set((state) => ({
      arrayApps: (state.arrayApps || []).filter((a) => a.name !== name),
    })),
}));
