import { create } from "zustand";

interface UIState {
  isLangSwitching: boolean;
  setLangSwitching: (value: boolean) => void;
}

export const useUIStore = create<UIState>((set) => ({
  isLangSwitching: false,
  setLangSwitching: (value) => set({ isLangSwitching: value }),
}));
