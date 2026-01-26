"use client";

import { useAuth } from "@/hooks/useAuth";
import { Header } from "@/components/layout/Header";
import { ProfessorDashboard } from "@/components/dashboard/ProfessorDashboard";
import { LiquidBackground } from "@/components/ui/LiquidBackground";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function TeacherDashboard() {
    const { user, profile, loading, signOut } = useAuth();
    const router = useRouter();

    // Scroll to top when component mounts
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    // Redirect if not authenticated or not a professor
    useEffect(() => {
        if (!loading) {
            if (!user || !profile) {
                router.replace("/auth");
            } else if (profile.role !== 'professor') {
                router.replace("/studentdashboard");
            }
        }
    }, [user, profile, loading, router]);

    if (loading || !user || !profile || profile.role !== 'professor') {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center relative">
                <LiquidBackground />
                <div className="text-center relative z-10">
                    <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto mb-4"></div>
                    <p className="text-lg text-muted-foreground">Carregant EduCat...</p>
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
                <main className="container mx-auto px-4 py-8">
                    <ProfessorDashboard user={profile} />
                </main>
            </div>
        </div>
    );
}
