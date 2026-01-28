"use client";

import { useAuth } from "@/hooks/useAuth";
import { Header } from "@/components/layout/Header";
import { HeroSection } from "@/components/home/HeroSection";
import { FeaturesSection } from "@/components/home/FeaturesSection";
import { CTASection } from "@/components/home/CTASection";
import { FooterSection } from "@/components/home/FooterSection";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
    const { user, profile, loading, signOut } = useAuth();
    const router = useRouter();

    // Scroll to top when component mounts
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="min-h-screen relative overflow-hidden font-sans text-foreground">
            {/* Same LiquidBackground as StudentDashboard for consistent dark mode */}
            {/* LiquidBackground removed to use global AnimatedBackground */}

            <div className="relative z-10">
                <Header
                    user={profile}
                    onLogout={signOut}
                    onNavigateToAuth={() => router.push('/auth')}
                />

                <main>
                    <HeroSection />
                    <FeaturesSection />
                    <CTASection />
                    <FooterSection />
                </main>
            </div>
        </div>
    );
}
