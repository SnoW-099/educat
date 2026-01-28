"use client";


import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { BookOpen, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { BookLoader } from "@/components/ui/book-loader";

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
                router.replace("/studentdashboard");
            } else {
                router.replace("/home");
            }
        }
    }, [user, profile, loading, router]);

    return (
        <div className="min-h-screen relative flex items-center justify-center bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-slate-950 dark:via-slate-900 dark:to-indigo-950">
            {/* LiquidBackground removed to use global AnimatedBackground */}


            {/* Ambient background effects */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-[20%] -left-[10%] w-[60%] h-[60%] bg-blue-400/20 dark:bg-blue-500/10 rounded-full blur-[120px] animate-blob" />
                <div className="absolute top-[30%] -right-[15%] w-[50%] h-[50%] bg-purple-400/20 dark:bg-purple-500/10 rounded-full blur-[120px] animate-blob animation-delay-2000" />
                <div className="absolute -bottom-[20%] left-[20%] w-[60%] h-[50%] bg-indigo-400/20 dark:bg-indigo-500/10 rounded-full blur-[120px] animate-blob animation-delay-4000" />
            </div>

            <div className="relative z-10 text-center scale-110">
                <BookLoader
                    text="EduCat"
                    size="lg"
                />
                <p className="text-muted-foreground text-sm animate-pulse mt-4 font-medium tracking-wide">
                    Carregant la teva experiència...
                </p>
            </div>
        </div>
    );
}
