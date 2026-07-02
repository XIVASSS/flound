"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return (
      <button className="h-8 w-8 rounded-full flex items-center justify-center cursor-pointer border-0 bg-transparent text-muted-foreground">
        <Sun className="h-3.5 w-3.5" />
      </button>
    );
  }

  return (
    <button
      className="h-8 w-8 rounded-full flex items-center justify-center cursor-pointer border-0 bg-transparent text-muted-foreground hover:text-foreground transition-colors"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
    >
      {resolvedTheme === "dark" ? (
        <Sun className="h-3.5 w-3.5" />
      ) : (
        <Moon className="h-3.5 w-3.5" />
      )}
      <span className="sr-only">Toggle theme</span>
    </button>
  );
}
