"use client";

import { LiquidBackground } from "@/components/ui/LiquidBackground";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { BookOpen, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

export default function Index() {
    const { user, profile, loading } = useAuth();
    const router = useRouter();

    // Scroll to top when component mounts
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        if (!loading) {
            if (user && profile) {
                if (profile.role === 'professor') {
                    router.replace("/teacherdashboard");
                } else if (profile.role === 'student') {
                    router.replace("/studentdashboard");
                }
            } else {
                router.replace("/home");
            }
        }
    }, [user, profile, loading, router]);

    return (
        <div className="min-h-screen relative flex items-center justify-center bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-slate-950 dark:via-slate-900 dark:to-indigo-950">
            <LiquidBackground />

            {/* Ambient background effects */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-[20%] -left-[10%] w-[60%] h-[60%] bg-blue-400/20 dark:bg-blue-500/10 rounded-full blur-[120px] animate-blob" />
                <div className="absolute top-[30%] -right-[15%] w-[50%] h-[50%] bg-purple-400/20 dark:bg-purple-500/10 rounded-full blur-[120px] animate-blob animation-delay-2000" />
                <div className="absolute -bottom-[20%] left-[20%] w-[60%] h-[50%] bg-indigo-400/20 dark:bg-indigo-500/10 rounded-full blur-[120px] animate-blob animation-delay-4000" />
            </div>

            <div className="relative z-10 text-center">
                {/* Animated logo */}
                <div className={cn(
                    "relative w-24 h-24 mx-auto mb-8",
                    "bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500",
                    "rounded-3xl shadow-2xl shadow-purple-500/30",
                    "flex items-center justify-center",
                    "animate-pulse"
                )}>
                    {/* Inner glow */}
                    <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/30 to-transparent" />
                    <BookOpen className="h-12 w-12 text-white relative z-10" />

                    {/* Sparkle decorations */}
                    <Sparkles className="absolute -top-2 -right-2 h-5 w-5 text-yellow-300 animate-ping" />
                    <Sparkles className="absolute -bottom-1 -left-1 h-4 w-4 text-pink-300 animate-ping animation-delay-2000" />

                    {/* Rotating ring */}
                    <div className="absolute inset-[-4px] rounded-[28px] border-2 border-dashed border-purple-300/50 animate-spin" style={{ animationDuration: '8s' }} />
                </div>

                {/* Loading text with gradient */}
                <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-blue-600 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                    EduCat
                </h1>
                <p className="text-muted-foreground text-lg animate-pulse">
                    Carregant la teva experiència...
                </p>

                {/* Loading dots */}
                <div className="flex items-center justify-center gap-2 mt-6">
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <div className="w-2 h-2 bg-pink-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
            </div>
        </div>
    );
}
