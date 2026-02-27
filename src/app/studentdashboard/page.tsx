"use client";

import { useAuth } from "@/hooks/useAuth";
import { Header } from "@/components/layout/Header";
import { StudentDashboard as StudentDashboardComponent } from "@/components/dashboard/StudentDashboard";

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
<<<<<<< HEAD
            } else if (profile.role === 'professor') {
                router.replace("/professordashboard");
            } else if (profile.role === 'professor_pending') {
                router.replace("/professorpending");
=======
>>>>>>> 281e5f277d1a22fe983bb2f49ab903edb50397dc
            }
        }
    }, [user, profile, loading, router, minTimeElapsed]);

    // Show loader if still loading OR minimum time hasn't elapsed
    if (loading || !minTimeElapsed || !user || !profile) {
        return (
            <div className="min-h-screen flex items-center justify-center relative">
                {/* LiquidBackground removed to use global AnimatedBackground */}
                <div className="relative z-10">
                    <BookLoader text="Carregant EduCat..." size="lg" />
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen relative">
            {/* LiquidBackground removed to use global AnimatedBackground */}
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
