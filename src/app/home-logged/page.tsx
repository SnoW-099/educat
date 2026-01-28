"use client";

import { useAuth } from "@/hooks/useAuth";
import { Header } from "@/components/layout/Header";
import { HeroSection } from "@/components/home/HeroSection";
import { FeaturesSection } from "@/components/home/FeaturesSection";
import { CTASectionLogged } from "@/components/home/CTASectionLogged";
import { FooterSection } from "@/components/home/FooterSection";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function HomeLogged() {
    const { user, profile, loading, signOut } = useAuth();
    const router = useRouter();

    // Scroll to top when component mounts
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    // Si no está logueado, redirigir a la página normal
    useEffect(() => {
        if (!loading && (!user || !profile)) {
            router.push('/home');
        }
    }, [user, profile, loading, router]);

    if (loading || !user || !profile) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-accent mx-auto mb-4"></div>
                    <p className="text-lg text-muted-foreground">Carregant...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen relative overflow-hidden font-sans text-slate-900">

            <div className="relative z-10">
                <Header
                    user={profile}
                    onLogout={signOut}
                    onNavigateToAuth={() => router.push('/auth')}
                />

                <main>
                    <HeroSection />
                    <FeaturesSection />
                    <CTASectionLogged />
                    <FooterSection />
                </main>
            </div>
        </div>
    );
}
