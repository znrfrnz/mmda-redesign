import { create } from "zustand";
import { persist } from "zustand/middleware";

type Language = "en" | "fil";

interface SettingsState {
  language: Language;
  darkMode: boolean;
  fontSize: number; // 0 = default, 1 = large, 2 = x-large
  highContrast: boolean;
  setLanguage: (lang: Language) => void;
  toggleDarkMode: () => void;
  increaseFontSize: () => void;
  decreaseFontSize: () => void;
  toggleHighContrast: () => void;
}

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      language: "en",
      darkMode: false,
      fontSize: 0,
      highContrast: false,
      setLanguage: (language) => set({ language }),
      toggleDarkMode: () =>
        set((state) => ({ darkMode: !state.darkMode })),
      increaseFontSize: () =>
        set((state) => ({ fontSize: Math.min(state.fontSize + 1, 2) })),
      decreaseFontSize: () =>
        set((state) => ({ fontSize: Math.max(state.fontSize - 1, 0) })),
      toggleHighContrast: () =>
        set((state) => ({ highContrast: !state.highContrast })),
    }),
    { name: "mmda-settings" }
  )
);
