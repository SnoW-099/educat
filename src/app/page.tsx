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
<<<<<<< HEAD
                if (profile.role === 'admin') {
                    router.replace("/admin");
                } else if (profile.role === 'professor') {
                    router.replace("/professordashboard");
                } else if (profile.role === 'professor_pending') {
                    router.replace("/professorpending");
                } else {
                    router.replace("/studentdashboard");
                }
=======
                router.replace("/studentdashboard");
>>>>>>> 281e5f277d1a22fe983bb2f49ab903edb50397dc
            } else {
                router.replace("/home");
            }
        }
    }, [user, profile, loading, router]);

    return (
        <div className="min-h-screen relative flex items-center justify-center overflow-hidden">
            {/* LiquidBackground removed to use global AnimatedBackground */}




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
