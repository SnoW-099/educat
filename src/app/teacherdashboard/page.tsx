"use client";

import { useAuth } from "@/hooks/useAuth";
import { Header } from "@/components/layout/Header";
import { ProfessorDashboard } from "@/components/dashboard/ProfessorDashboard";
import { LiquidBackground } from "@/components/ui/LiquidBackground";
import { BookLoader } from "@/components/ui/book-loader";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function TeacherDashboard() {
    const { user, profile, loading, signOut } = useAuth();
    const router = useRouter();
    const [minTimeElapsed, setMinTimeElapsed] = useState(false);

    // Minimum loading time of 2.3 seconds to show book animation
    useEffect(() => {
        const timer = setTimeout(() => {
            setMinTimeElapsed(true);
        }, 2300);
        return () => clearTimeout(timer);
    }, []);

    // Scroll to top when component mounts
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    // Redirect if not authenticated or not a professor
    useEffect(() => {
        if (!loading && minTimeElapsed) {
            if (!user || !profile) {
                router.replace("/auth");
            } else if (profile.role !== 'professor') {
                router.replace("/studentdashboard");
            }
        }
    }, [user, profile, loading, router, minTimeElapsed]);

    // Show loader if still loading OR minimum time hasn't elapsed
    if (loading || !minTimeElapsed || !user || !profile || profile.role !== 'professor') {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center relative">
                <LiquidBackground />
                <div className="relative z-10">
                    <BookLoader text="Carregant EduCat..." size="lg" />
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
