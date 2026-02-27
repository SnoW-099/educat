"use client";

import { useAuth } from "@/hooks/useAuth";
import { Header } from "@/components/layout/Header";
import { AdminDashboard } from "@/components/dashboard/AdminDashboard";
import { BookLoader } from "@/components/ui/book-loader";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function AdminPage() {
    const { user, profile, loading, signOut } = useAuth();
    const router = useRouter();
    const [minTimeElapsed, setMinTimeElapsed] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setMinTimeElapsed(true);
        }, 1200);
        return () => clearTimeout(timer);
    }, []);

    // Scroll to top
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        if (!loading && minTimeElapsed) {
            if (!user || !profile) {
                router.replace("/auth");
            } else if (profile.role !== 'admin') {
                router.replace("/studentdashboard");
            }
        }
    }, [user, profile, loading, router, minTimeElapsed]);

    if (loading || !minTimeElapsed || !user || !profile || profile.role !== 'admin') {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <BookLoader text="Entrant al panell de control..." size="lg" />
            </div>
        );
    }

    return (
        <div className="min-h-screen relative">
            <div className="relative" style={{ zIndex: 10 }}>
                <Header user={profile} onLogout={signOut} />
                <main className="container mx-auto px-4 py-8 space-y-8">
                    <AdminDashboard />
                </main>
            </div>
        </div>
    );
}
