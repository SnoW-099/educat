import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Providers } from "@/components/providers";
import { AnimatedBackground } from "@/components/ui/AnimatedBackground";
<<<<<<< HEAD
import { CommandPalette } from "@/components/layout/CommandPalette";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Metadata } from "next";
import "../index.css";

export const metadata: Metadata = {
=======
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "../index.css";

export const metadata = {
>>>>>>> 281e5f277d1a22fe983bb2f49ab903edb50397dc
    title: "EduCat",
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
