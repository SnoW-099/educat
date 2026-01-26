"use client";

import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { Button } from '@/components/ui/button';
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
// Ah, checking Header.tsx it doesn't use cn. page.tsx doesn't either.
// package.json has "clsx" and "tailwind-merge". commonly `lib/utils` or `utils/cn`.
// I will check if `lib/utils` exists or just use a safe implementation.
// Wait, I saw components/ui/button.tsx usually imports cn from somewhere.
// Let's just use template literals and tailwind-merge if possible, or just string concatenation if simple.
// Given I don't want to break if path is wrong, I will use a simple logical OR or template literal for now, but `cn` is better.
// Let's assume standard shadcn structure: `import { cn } from "@/lib/utils"` usually.
// But I haven't seen that file.
// Let's just modify it to use the className prop passed in.

interface ThemeToggleProps {
  className?: string;
}

export function ThemeToggle({ className }: ThemeToggleProps) {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <Button
        variant="ghost"
        size="sm"
        className={`z-[9999] h-12 w-12 p-0 rounded-lg bg-transparent shadow-none hover:bg-transparent border-0 ${className || "fixed top-4 right-4"}`}
      >
        <div className="h-5 w-5 animate-pulse bg-gray-300 rounded" />
      </Button>
    );
  }

  const toggleTheme = () => {
    setTheme(resolvedTheme === 'dark' ? 'light' : 'dark');
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggleTheme}
      className={`z-[9999] h-12 w-12 p-0 rounded-lg bg-transparent shadow-none hover:bg-transparent border-0 ${className || "fixed top-4 right-4"}`}
      aria-label="Toggle theme"
    >
      {resolvedTheme === 'light' ? (
        <Moon
          className="h-5 w-5 text-yellow-500"
          stroke="rgb(234 179 8)"
          strokeWidth={2.5}
          style={{
            filter: 'drop-shadow(0 0 10px rgba(234,179,8,1)) drop-shadow(0 0 22px rgba(234,179,8,0.85)) drop-shadow(0 0 34px rgba(234,179,8,0.6))'
          }}
        />
      ) : (
        <Sun
          className="h-5 w-5 text-orange-500"
          stroke="rgb(249 115 22)"
          strokeWidth={2.5}
          style={{
            filter: 'drop-shadow(0 0 10px rgba(249,115,22,1)) drop-shadow(0 0 22px rgba(249,115,22,0.85)) drop-shadow(0 0 34px rgba(249,115,22,0.6))'
          }}
        />
      )}
    </Button>
  );
}
