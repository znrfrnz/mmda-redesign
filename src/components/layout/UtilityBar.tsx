"use client";

import { useSettingsStore } from "@/stores/useSettingsStore";
import { t } from "@/lib/translations";
import {
  Globe,
  Moon,
  Sun,
  MagnifyingGlass,
  TextAa,
  Plus,
  Minus,
  EyeSlash,
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
    <div className="border-b border-border bg-muted/50">
      <div className="mx-auto flex h-9 max-w-7xl items-center justify-end gap-1 px-4 sm:px-6 lg:px-8">
        {/* Language Toggle */}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setLanguage(language === "en" ? "fil" : "en")}
          className="h-7 gap-1.5 px-2 text-xs text-muted-foreground hover:text-foreground"
          aria-label={`Switch language to ${language === "en" ? "Filipino" : "English"}`}
        >
          <Globe className="size-3.5" weight="bold" />
          <span>{language === "en" ? "EN" : "FIL"}</span>
        </Button>

        <div className="h-4 w-px bg-border" role="separator" />

        {/* Dark Mode Toggle */}
        <Button
          variant="ghost"
          size="sm"
          onClick={toggleDarkMode}
          className="h-7 gap-1.5 px-2 text-xs text-muted-foreground hover:text-foreground"
          aria-label={darkMode ? t("util.lightMode", language) : t("util.darkMode", language)}
        >
          {darkMode ? (
            <Sun className="size-3.5" weight="bold" />
          ) : (
            <Moon className="size-3.5" weight="bold" />
          )}
        </Button>

        <div className="h-4 w-px bg-border" role="separator" />

        {/* Accessibility Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              className="h-7 gap-1.5 px-2 text-xs text-muted-foreground hover:text-foreground"
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

        <div className="h-4 w-px bg-border" role="separator" />

        {/* Search Shortcut */}
        <Button
          variant="ghost"
          size="sm"
          className="h-7 gap-1.5 px-2 text-xs text-muted-foreground hover:text-foreground"
          aria-label={t("util.search", language)}
          asChild
        >
          <a href="/search">
            <MagnifyingGlass className="size-3.5" weight="bold" />
          </a>
        </Button>
      </div>
    </div>
  );
}
