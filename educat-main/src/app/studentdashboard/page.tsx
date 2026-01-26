"use client";

import { useAuth } from "@/hooks/useAuth";
import { Header } from "@/components/layout/Header";
import { StudentDashboard as StudentDashboardComponent } from "@/components/dashboard/StudentDashboard";
import { LiquidBackground } from "@/components/ui/LiquidBackground";
import { useRouter } from "next/navigation";
import { useEffect } from "react";


export default function StudentDashboard() {
    const { user, profile, loading, signOut } = useAuth();
    const router = useRouter();

    // Scroll to top when component mounts
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    // Redirect if not authenticated or not a student
    useEffect(() => {
        if (!loading) {
            if (!user || !profile) {
                router.replace("/auth");
            } else if (profile.role !== 'student') {
                router.replace("/teacherdashboard");
            }
        }
    }, [user, profile, loading, router]);

    if (loading || !user || !profile || profile.role !== 'student') {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center relative">
                <LiquidBackground />
                <div className="text-center space-y-4 relative z-10">
                    <div className="animate-spin h-8 w-8 border-2 border-muted-foreground/20 border-t-primary mx-auto rounded-full"></div>
                    <p className="text-sm text-muted-foreground font-mono">Carregant...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen relative">
            <LiquidBackground />
            <div className="relative" style={{ zIndex: 10 }}>
                <Header
                    user={profile}
                    onLogout={signOut}
                />
                <main className="container mx-auto px-4 py-8 space-y-8">
                    <StudentDashboardComponent user={profile} />
                </main>
            </div>
        </div>
    );
}
