"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { cn } from "@/lib/utils"

import { Button } from "@/components/ui/button"

export function ModeToggle() {
    const { setTheme, resolvedTheme } = useTheme()
    const [mounted, setMounted] = React.useState(false)

    React.useEffect(() => {
        setMounted(true)
    }, [])

    const toggleTheme = () => {
        setTheme(resolvedTheme === "dark" ? "light" : "dark")
    }

    if (!mounted) {
        return (
            <Button variant="ghost" size="icon" className="h-9 w-9 rounded-lg">
                <div className="h-4 w-4 animate-pulse rounded-full bg-muted" />
            </Button>
        )
    }

    const isDark = resolvedTheme === "dark"

    return (
        <button
            onClick={toggleTheme}
            className="relative h-9 w-9 flex items-center justify-center transition-all"
        >
            <Sun className={cn(
                "h-5 w-5 text-amber-500 transition-all duration-300 drop-shadow-[0_0_8px_rgba(251,191,36,0.6)]",
                isDark ? "rotate-90 scale-0 opacity-0" : "rotate-0 scale-100 opacity-100"
            )} />
            <Moon className={cn(
                "absolute h-5 w-5 text-blue-300 transition-all duration-300 drop-shadow-[0_0_8px_rgba(147,197,253,0.6)]",
                isDark ? "rotate-0 scale-100 opacity-100" : "-rotate-90 scale-0 opacity-0"
            )} />
            <span className="sr-only">Canvia el tema</span>
        </button>
    )
}
