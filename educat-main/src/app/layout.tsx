
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Providers } from "@/components/providers";
import { AnimatedBackground } from "@/components/ui/AnimatedBackground";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "../index.css";

export const metadata = {
    title: "Hola Connect",
    description: "Connect with teachers and students",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className="min-h-screen bg-background text-foreground antialiased">
                <Providers>
                    <AnimatedBackground />
                    <ThemeToggle />
                    <div className="relative z-0">
                        {children}
                    </div>
                    <Toaster />
                    <Sonner />
                    <Analytics />
                    <SpeedInsights />
                </Providers>
            </body>
        </html>
    );
}
