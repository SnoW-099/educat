"use client"

import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import { ThemeProvider } from "@/components/theme-provider";
<<<<<<< HEAD
import { AuthProvider } from "@/components/auth/AuthProvider";
=======
>>>>>>> 281e5f277d1a22fe983bb2f49ab903edb50397dc

export function Providers({ children }: { children: React.ReactNode }) {
    const [queryClient] = useState(() => new QueryClient());

    return (
        <QueryClientProvider client={queryClient}>
<<<<<<< HEAD
            <AuthProvider>
                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                    disableTransitionOnChange
                >
                    <TooltipProvider>{children}</TooltipProvider>
                </ThemeProvider>
            </AuthProvider>
=======
            <ThemeProvider
                attribute="class"
                defaultTheme="system"
                enableSystem
                disableTransitionOnChange
            >
                <TooltipProvider>{children}</TooltipProvider>
            </ThemeProvider>
>>>>>>> 281e5f277d1a22fe983bb2f49ab903edb50397dc
        </QueryClientProvider>
    );
}
