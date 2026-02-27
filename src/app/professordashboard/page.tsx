"use client";

import { useAuth } from "@/hooks/useAuth";
import { Header } from "@/components/layout/Header";
import { ProfessorDashboard as ProfessorDashboardComponent } from "@/components/dashboard/ProfessorDashboard";
import { BookLoader } from "@/components/ui/book-loader";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function ProfessorDashboardPage() {
    const { user, profile, loading, signOut } = useAuth();
    const router = useRouter();
    const [minTimeElapsed, setMinTimeElapsed] = useState(false);

    // Minimum loading time of 1.5 seconds to show book animation
    useEffect(() => {
        const timer = setTimeout(() => {
            setMinTimeElapsed(true);
        }, 1500);
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
            } else if (profile.role === 'professor_pending') {
                router.replace("/professorpending");
            } else if (profile.role !== 'professor' && profile.role !== 'admin') {
                router.replace("/studentdashboard");
            }
        }
    }, [user, profile, loading, router, minTimeElapsed]);

    // Show loader if still loading OR minimum time hasn't elapsed OR not a professor (while redirecting)
    if (loading || !minTimeElapsed || !user || !profile || profile.role !== 'professor') {
        return (
            <div className="min-h-screen flex items-center justify-center relative">
                <div className="relative z-10">
                    <BookLoader text="Carregant tauler de professor..." size="lg" />
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen relative">
            <div className="relative" style={{ zIndex: 10 }}>
                <Header
                    user={profile}
                    onLogout={signOut}
                />
                <main className="container mx-auto px-4 py-8 space-y-8">
                    <ProfessorDashboardComponent user={profile} />
                </main>
            </div>
        </div>
    );
}
