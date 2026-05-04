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

const DEFAULT_SETTINGS = {
  language: "en" as Language,
  darkMode: false,
  fontSize: 0,
  highContrast: false,
};

function sanitizePersistedSettings(input: unknown) {
  const state = typeof input === "object" && input !== null ? input as Record<string, unknown> : {};
  const language = state.language === "fil" ? "fil" : "en";
  const darkMode = typeof state.darkMode === "boolean" ? state.darkMode : false;
  const fontSizeRaw = typeof state.fontSize === "number" ? state.fontSize : 0;
  const fontSize = Math.max(0, Math.min(2, Math.round(fontSizeRaw)));
  const highContrast = typeof state.highContrast === "boolean" ? state.highContrast : false;

  return {
    language,
    darkMode,
    fontSize,
    highContrast,
  };
}

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      ...DEFAULT_SETTINGS,
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
    {
      name: "mmda-settings",
      version: 1,
      migrate: (persistedState) => ({
        ...DEFAULT_SETTINGS,
        ...sanitizePersistedSettings(persistedState),
      }),
    }
  )
);
