"use client";

import { useAuth } from "@/hooks/useAuth";
import { Header } from "@/components/layout/Header";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookLoader } from "@/components/ui/book-loader";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ShieldAlert, Mail, Clock } from "lucide-react";

export default function ProfessorPendingPage() {
    const { user, profile, loading, signOut } = useAuth();
    const router = useRouter();
    const [minTimeElapsed, setMinTimeElapsed] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setMinTimeElapsed(true);
        }, 1000);
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        if (!loading && minTimeElapsed) {
            if (!user || !profile) {
                router.replace("/auth");
            } else if (profile.role === 'professor') {
                router.replace("/professordashboard");
            } else if (profile.role === 'admin') {
                router.replace("/admin");
            } else if (profile.role === 'student') {
                router.replace("/studentdashboard");
            }
        }
    }, [user, profile, loading, router, minTimeElapsed]);

    if (loading || !minTimeElapsed || !user || !profile || profile.role !== 'professor_pending') {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <BookLoader text="Verificant estat del compte..." size="lg" />
            </div>
        );
    }

    return (
        <div className="min-h-screen relative">
            <div className="relative" style={{ zIndex: 10 }}>
                <Header user={profile} onLogout={signOut} />
                <main className="container mx-auto px-4 py-20 flex flex-col items-center">
                    <Card className="max-w-2xl w-full glass-card border-amber-200/50 shadow-2xl overflow-hidden">
                        <div className="h-2 bg-gradient-to-r from-amber-400 to-orange-500" />
                        <CardHeader className="text-center pb-2">
                            <div className="mx-auto w-16 h-16 bg-amber-100 dark:bg-amber-900/30 rounded-full flex items-center justify-center mb-4">
                                <ShieldAlert className="h-8 w-8 text-amber-600 dark:text-amber-400" />
                            </div>
                            <CardTitle className="text-3xl font-bold text-foreground">Compte en Revisió</CardTitle>
                            <CardDescription className="text-lg">
                                Per motius de seguretat, les comptes de professor han de ser verificades.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6 pt-6 text-center">
                            <div className="bg-amber-50 dark:bg-amber-900/10 p-6 rounded-2xl border border-amber-100 dark:border-amber-900/20 space-y-4">
                                <div className="flex items-center justify-center gap-3 text-amber-800 dark:text-amber-300 font-medium">
                                    <Clock className="h-5 w-5" />
                                    <span>Estat: Pendent d'aprovació</span>
                                </div>
                                <p className="text-slate-600 dark:text-slate-400">
                                    Els desenvolupadors d'EduCat estan revisant la teva sol·licitud. Un cop aprovada, tindràs accés complet a les eines de gestió de classes.
                                </p>
                            </div>

                            <div className="space-y-4 pt-4">
                                <p className="text-sm text-slate-500 uppercase tracking-widest font-bold">Propers passos</p>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="p-4 bg-white/50 dark:bg-slate-800/50 rounded-xl border border-slate-200/50 flex flex-col items-center gap-2">
                                        <Mail className="h-5 w-5 text-blue-500" />
                                        <span className="text-sm font-bold">Revisa el teu email</span>
                                        <span className="text-xs text-slate-500">T'avisarem quan s'activi</span>
                                    </div>
                                    <div className="p-4 bg-white/50 dark:bg-slate-800/50 rounded-xl border border-slate-200/50 flex flex-col items-center gap-2">
                                        <BookLoader size="sm" />
                                        <span className="text-sm font-bold">Espera activa</span>
                                        <span className="text-xs text-slate-500">Sol trigar 24-48h</span>
                                    </div>
                                </div>
                            </div>

                            <div className="pt-8 flex flex-col gap-3">
                                <Button onClick={() => window.location.reload()} variant="default" className="w-full h-12 rounded-full font-bold">
                                    Actualitzar estat
                                </Button>
                                <Button onClick={signOut} variant="outline" className="w-full h-12 rounded-full font-bold">
                                    Tancar sessió
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                    
                    <p className="mt-8 text-slate-400 text-sm font-medium">
                        Si tens qualsevol dubte, contacta amb <a href="mailto:admin@educat.cat" className="text-blue-500 hover:underline">suport@educat.cat</a>
                    </p>
                </main>
            </div>
        </div>
    );
}
