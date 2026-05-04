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

type PersistedSettings = Pick<
  SettingsState,
  "language" | "darkMode" | "fontSize" | "highContrast"
>;

function normalizePersistedSettings(value: unknown): PersistedSettings {
  const source =
    value && typeof value === "object" && "state" in value
      ? (value as { state?: unknown }).state
      : value;

  const state = (source && typeof source === "object" ? source : {}) as Partial<PersistedSettings>;

  return {
    language: state.language === "fil" ? "fil" : "en",
    darkMode: Boolean(state.darkMode),
    fontSize:
      typeof state.fontSize === "number"
        ? Math.min(Math.max(Math.trunc(state.fontSize), 0), 2)
        : 0,
    highContrast: Boolean(state.highContrast),
  };
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
    {
      name: "mmda-settings",
      version: 1,
      partialize: (state): PersistedSettings => ({
        language: state.language,
        darkMode: state.darkMode,
        fontSize: state.fontSize,
        highContrast: state.highContrast,
      }),
      migrate: (persistedState) => normalizePersistedSettings(persistedState),
    }
  )
);
