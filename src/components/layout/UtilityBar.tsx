"use client";

import { useSettingsStore } from "@/stores/useSettingsStore";
import { t } from "@/lib/translations";
import {
  Globe,
  Moon,
  Sun,
  TextAa,
  Plus,
  Minus,
  EyeSlash,
  Phone,
} from "@phosphor-icons/react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

export function UtilityBar() {
  const {
    language,
    darkMode,
    fontSize,
    highContrast,
    setLanguage,
    toggleDarkMode,
    increaseFontSize,
    decreaseFontSize,
    toggleHighContrast,
  } = useSettingsStore();

  return (
    <div className="border-b border-white/10 bg-[#06122c] text-white">
      <div className="mx-auto flex min-h-11 max-w-7xl flex-wrap items-center justify-between gap-2 px-4 py-2 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3 text-[0.7rem] uppercase tracking-[0.2em] text-white/60">
          <span>
            {language === "en"
              ? "Official Metro Manila public service portal"
              : "Opisyal na public service portal ng Metro Manila"}
          </span>
          <span className="hidden h-3 w-px bg-white/15 md:block" />
          <a
            href="tel:136"
            className="hidden items-center gap-1.5 text-white/74 transition-colors hover:text-white md:inline-flex focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            <Phone className="size-3.5" weight="bold" />
            Metrobase 136
          </a>
        </div>

        <div className="flex items-center gap-1.5">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setLanguage(language === "en" ? "fil" : "en")}
          className="h-8 gap-1.5 rounded-full border border-white/10 px-3 text-xs text-white/72 hover:bg-white/10 hover:text-white"
          aria-label={`Switch language to ${language === "en" ? "Filipino" : "English"}`}
        >
          <Globe className="size-3.5" weight="bold" />
          <span>{language === "en" ? "EN" : "FIL"}</span>
        </Button>

        <Button
          variant="ghost"
          size="sm"
          onClick={toggleDarkMode}
          className="h-8 rounded-full border border-white/10 px-3 text-xs text-white/72 hover:bg-white/10 hover:text-white"
          aria-label={darkMode ? t("util.lightMode", language) : t("util.darkMode", language)}
        >
          {darkMode ? (
            <Sun className="size-3.5" weight="bold" />
          ) : (
            <Moon className="size-3.5" weight="bold" />
          )}
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              className="h-8 rounded-full border border-white/10 px-3 text-xs text-white/72 hover:bg-white/10 hover:text-white"
              aria-label={t("util.accessibility", language)}
            >
              <TextAa className="size-3.5" weight="bold" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuItem
              onClick={increaseFontSize}
              disabled={fontSize >= 2}
            >
              <Plus className="mr-2 size-4" weight="bold" />
              {t("util.increase", language)} {t("util.fontSize", language)}
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={decreaseFontSize}
              disabled={fontSize <= 0}
            >
              <Minus className="mr-2 size-4" weight="bold" />
              {t("util.decrease", language)} {t("util.fontSize", language)}
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={toggleHighContrast}>
              <EyeSlash className="mr-2 size-4" weight="bold" />
              {t("util.highContrast", language)}
              {highContrast && " ✓"}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>


      </div>
      </div>
    </div>
  );
}
