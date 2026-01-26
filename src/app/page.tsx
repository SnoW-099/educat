"use client";

import { LiquidBackground } from "@/components/ui/LiquidBackground";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { ModeToggle } from "@/components/mode-toggle";


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
        <div className="min-h-screen relative flex items-center justify-center">
            <LiquidBackground />
            <ModeToggle className="fixed top-4 right-4 z-[9999]" />
            <div className="relative z-10 text-center">
                <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-accent mx-auto mb-4"></div>
                <p className="text-lg text-muted-foreground">Carregant EduCat...</p>
            </div>
        </div>
    );
}
