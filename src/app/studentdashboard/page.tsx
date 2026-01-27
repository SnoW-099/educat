"use client";

import { useAuth } from "@/hooks/useAuth";
import { Header } from "@/components/layout/Header";
import { StudentDashboard as StudentDashboardComponent } from "@/components/dashboard/StudentDashboard";
import { LiquidBackground } from "@/components/ui/LiquidBackground";
import { BookLoader } from "@/components/ui/book-loader";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";


export default function StudentDashboard() {
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

    // Redirect if not authenticated
    useEffect(() => {
        if (!loading && minTimeElapsed) {
            if (!user || !profile) {
                router.replace("/auth");
            }
        }
    }, [user, profile, loading, router, minTimeElapsed]);

    // Show loader if still loading OR minimum time hasn't elapsed
    if (loading || !minTimeElapsed || !user || !profile) {
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
                <main className="container mx-auto px-4 py-8 space-y-8">
                    <StudentDashboardComponent user={profile} />
                </main>
            </div>
        </div>
    );
}
