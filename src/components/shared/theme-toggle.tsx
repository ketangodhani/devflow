"use client";

import { Moon, Sun } from "lucide-react";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Prevent hydration mismatch
  if (!mounted) {
    return (
      <button className="rounded-xl p-2">
        <div className="h-5 w-5" />
      </button>
    )
  }

  return (
    <button
      onClick={() =>
        setTheme(theme === "dark" ? "light" : "dark")
      }
      className="rounded-xl border border-border p-2 transition hover:bg-muted-foreground"
    >
      {theme === "dark" ? (
        <Sun className="h-5 w-5 text-card-foreground" />
      ) : (
        <Moon className="h-5 w-5 text-card-foreground" />
      )}
    </button>
  );
}