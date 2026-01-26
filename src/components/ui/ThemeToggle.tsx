"use client";

import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { Button } from '@/components/ui/button';
import { useState, useEffect } from 'react';

export function ThemeToggle() {
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
        className="fixed top-4 right-4 z-50 h-12 w-12 p-0 rounded-lg bg-transparent shadow-none hover:bg-transparent border-0"
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
      className="fixed top-4 right-4 z-50 h-12 w-12 p-0 rounded-lg bg-transparent shadow-none hover:bg-transparent border-0"
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
