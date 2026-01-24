"use client";

import { useAuth } from "@/hooks/useAuth";
import { Header } from "@/components/layout/Header";
import { HeroSection } from "@/components/home/HeroSection";
import { FeaturesSection } from "@/components/home/FeaturesSection";
import { CTASection } from "@/components/home/CTASection";
import { FooterSection } from "@/components/home/FooterSection";
import { AnimatedBackground } from "@/components/ui/AnimatedBackground";
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
        <div className="min-h-screen relative bg-slate-50 overflow-hidden font-sans text-slate-900">
            {/* Global Background Ambience - Softer Blue */}
            <div className="fixed inset-0 pointer-events-none">
                <div className="absolute top-0 left-0 w-full h-full bg-slate-50"></div>
                {/* Softer blue blobs */}
                <div className="absolute -top-[20%] -left-[10%] w-[70%] h-[70%] bg-blue-400/15 rounded-full blur-[100px] animate-blob mix-blend-multiply"></div>
                <div className="absolute top-[30%] -right-[20%] w-[60%] h-[60%] bg-indigo-400/15 rounded-full blur-[100px] animate-blob animation-delay-2000 mix-blend-multiply"></div>
                <div className="absolute -bottom-[20%] left-[10%] w-[80%] h-[60%] bg-sky-400/15 rounded-full blur-[100px] animate-blob animation-delay-4000 mix-blend-multiply"></div>
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 mix-blend-overlay"></div>
            </div>

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
