"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { User, GraduationCap, LogIn, UserPlus } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Auth() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [role, setRole] = useState<'professor' | 'student'>('student');
    const [loading, setLoading] = useState(false);
    const { toast } = useToast();
    const router = useRouter();

    const [isResetMode, setIsResetMode] = useState(false);

    // Scroll to top when component mounts
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const cleanupAuthState = () => {
        if (typeof window !== 'undefined') {
            Object.keys(localStorage || {}).forEach((key) => {
                if (key.startsWith('supabase.auth.') || key.includes('sb-')) {
                    localStorage.removeItem(key);
                }
            });
            Object.keys(sessionStorage || {}).forEach((key) => {
                if (key.startsWith('supabase.auth.') || key.includes('sb-')) {
                    sessionStorage.removeItem(key);
                }
            });
        }
    };

    const handleGoogleSignIn = async () => {
        try {
            cleanupAuthState();
            await supabase.auth.signOut({ scope: 'global' });

            const { error } = await supabase.auth.signInWithOAuth({
                provider: 'google',
                options: {
                    redirectTo: `${window.location.origin}/auth/callback`,
                    skipBrowserRedirect: false,
                }
            });

            if (error) throw error;
        } catch (error: any) {
            toast({
                title: "Error d'autenticació",
                description: error.message,
                variant: "destructive",
            });
        }
    };

    const handleEmailSignUp = async () => {
        if (!email || !password || !name) {
            toast({
                title: "Camps obligatoris",
                description: "Si us plau, completa tots els camps",
                variant: "destructive",
            });
            return;
        }

        setLoading(true);
        try {
            cleanupAuthState();
            await supabase.auth.signOut({ scope: 'global' });

            const { data, error } = await supabase.auth.signUp({
                email,
                password,
                options: {
                    emailRedirectTo: `${window.location.origin}/auth/callback`,
                    data: {
                        name,
                        role,
                    }
                }
            });

            if (error) throw error;

            if (data.user && !data.user.email_confirmed_at) {
                toast({
                    title: "Comprova el teu correu",
                    description: "T'hem enviat un enllaç de verificació al teu correu electrònic",
                });
            } else {
                window.location.href = '/';
            }
        } catch (error: any) {
            toast({
                title: "Error de registre",
                description: error.message,
                variant: "destructive",
            });
        } finally {
            setLoading(false);
        }
    };

    const handleEmailSignIn = async () => {
        if (!email || !password) {
            toast({
                title: "Camps obligatoris",
                description: "Si us plau, introdueix email i contrasenya",
                variant: "destructive",
            });
            return;
        }

        setLoading(true);
        try {
            cleanupAuthState();
            await supabase.auth.signOut({ scope: 'global' });

            const { data, error } = await supabase.auth.signInWithPassword({
                email,
                password,
            });

            if (error) throw error;

            if (data.user) {
                window.location.href = '/';
            }
        } catch (error: any) {
            toast({
                title: "Error d'inici de sessió",
                description: error.message,
                variant: "destructive",
            });
        } finally {
            setLoading(false);
        }
    };

    const handlePasswordReset = async () => {
        if (!email) {
            toast({
                title: "Correu requerit",
                description: "Introdueix el teu correu electrònic per restablir la contrasenya",
                variant: "destructive",
            });
            return;
        }

        setLoading(true);
        try {
            const { error } = await supabase.auth.resetPasswordForEmail(email, {
                redirectTo: `${window.location.origin}/auth/callback`,
            });

            if (error) {
                console.error("Error resetting password:", error);
                throw error;
            }

            toast({
                title: "Sol·licitud enviada",
                description: "Si el correu està registrat, rebràs un enllaç en breu. Revisa la carpeta de correu brossa (Spam).",
                duration: 6000,
            });
            setIsResetMode(false);
        } catch (error: any) {
            console.error("Reset password error details:", error);
            toast({
                title: "Error en la sol·licitud",
                description: error.message || "No s'ha pogut enviar el correu. Torna-ho a provar més tard.",
                variant: "destructive",
            });
        } finally {
            setLoading(false);
        }
    };





    return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-background relative overflow-hidden selection:bg-blue-500/30">
            {/* Ultra-Premium Animated Background */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-0 left-0 w-full h-full bg-background dark:bg-slate-950"></div>

                {/* Moving Mesh Gradients */}
                <div className="absolute -top-[10%] -left-[10%] w-[70%] h-[70%] bg-blue-600/20 dark:bg-blue-600/15 rounded-full blur-[120px] animate-blob mix-blend-multiply dark:mix-blend-soft-light transition-all duration-1000"></div>
                <div className="absolute top-[20%] -right-[10%] w-[60%] h-[80%] bg-indigo-500/20 dark:bg-indigo-500/15 rounded-full blur-[120px] animate-blob animation-delay-2000 mix-blend-multiply dark:mix-blend-soft-light transition-all duration-1000"></div>
                <div className="absolute -bottom-[20%] left-[10%] w-[80%] h-[60%] bg-sky-400/20 dark:bg-sky-400/15 rounded-full blur-[120px] animate-blob animation-delay-4000 mix-blend-multiply dark:mix-blend-soft-light transition-all duration-1000"></div>

                {/* Accent blobs for more depth */}
                <div className="absolute top-[40%] left-[30%] w-[30%] h-[30%] bg-purple-500/10 dark:bg-purple-600/10 rounded-full blur-[100px] animate-pulse transition-all duration-1000"></div>
            </div>

            {/* Glassmorphism Main Container */}
            <div className="w-full max-w-5xl md:min-h-[700px] flex flex-col lg:flex-row relative z-10 transition-all duration-500 ease-in-out rounded-[3rem] overflow-hidden shadow-[0_30px_60px_-15px_rgba(0,0,0,0.3)] dark:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.6)]">

                {/* Left Side: Premium Brand Experience */}
                <div className="hidden lg:flex lg:w-2/5 bg-gradient-to-br from-indigo-700 via-blue-600 to-blue-800 text-white flex-col justify-between p-12 relative overflow-hidden rounded-l-[2.5rem] shadow-[-20px_0_50px_-15px_rgba(37,99,235,0.2)]">
                    {/* Interior Decorative Patterns */}
                    <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_2px_2px,white_1px,transparent_0)] bg-[length:24px_24px]"></div>
                    <div className="absolute -top-24 -right-24 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
                    <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-blue-400/20 rounded-full blur-3xl"></div>

                    <div className="relative z-10">
                        <div className="inline-flex items-center gap-3 px-5 py-2.5 bg-white/10 backdrop-blur-md rounded-full border border-white/20 shadow-xl mb-12 group hover:bg-white/15 transition-all">
                            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-inner group-hover:scale-105 transition-transform">
                                <span className="text-blue-700 font-bold text-xl tracking-tighter">E</span>
                            </div>
                            <span className="font-bold text-lg tracking-tight">EduCat</span>
                        </div>

                        <div className="space-y-6">
                            <h2 className="text-5xl font-extrabold leading-[1.1] tracking-tight text-white">
                                Allibera el teu <span className="text-blue-200">potencial</span> educatiu.
                            </h2>
                            <p className="text-blue-50/80 text-xl leading-relaxed font-medium">
                                Uneix-te a la plataforma líder per aprendre català amb IA i gamificació.
                            </p>
                        </div>
                    </div>

                    <div className="relative z-10 space-y-4 pt-12">
                        {[
                            { icon: GraduationCap, label: "IA Adaptativa", sub: "Aprendre al teu ritme" },
                            { icon: User, label: "Comunitat Viva", sub: "+5.000 estudiants" }
                        ].map((item, idx) => (
                            <div key={idx} className="flex items-center gap-4 bg-white/5 backdrop-blur-sm p-4 rounded-2xl border border-white/10 hover:bg-white/10 transition-all cursor-default group">
                                <div className="p-2.5 bg-blue-500/30 rounded-xl group-hover:scale-110 transition-transform">
                                    <item.icon className="w-5 h-5 text-white" />
                                </div>
                                <div>
                                    <div className="text-sm font-bold">{item.label}</div>
                                    <div className="text-xs text-blue-100/60 font-medium">{item.sub}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right Side: Interactive Form with True Glassmorphism */}
                <div className="flex-1 p-8 lg:p-14 flex flex-col justify-center bg-white/70 dark:bg-slate-900/80 backdrop-blur-2xl border-none">
                    <div className="max-w-md mx-auto w-full space-y-10">

                        <div className="text-center lg:text-left space-y-3">
                            <h1 className="text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                                {isResetMode ? "Recuperar" : "Hola de nou"}
                            </h1>
                            <p className="text-slate-500 dark:text-slate-400 font-medium">
                                {isResetMode ? "Escriu el teu correu per restablir-ho." : "Accedeix al teu centre d'aprenentatge."}
                            </p>
                        </div>

                        {!isResetMode ? (
                            <Tabs defaultValue="signin" className="w-full">
                                <div className="bg-slate-200/40 dark:bg-slate-800/60 p-1 rounded-full mb-10 flex backdrop-blur-md">
                                    <TabsList className="grid w-full grid-cols-2 bg-transparent border-none p-0 h-auto gap-0">
                                        <TabsTrigger
                                            value="signin"
                                            className="rounded-full font-bold text-sm border-none data-[state=active]:bg-white dark:data-[state=active]:bg-slate-700 data-[state=active]:text-blue-600 dark:data-[state=active]:text-blue-400 data-[state=active]:shadow-lg transition-all py-3 px-4 h-full m-0"
                                        >
                                            Entrar
                                        </TabsTrigger>
                                        <TabsTrigger
                                            value="signup"
                                            className="rounded-full font-bold text-sm border-none data-[state=active]:bg-white dark:data-[state=active]:bg-slate-700 data-[state=active]:text-blue-600 dark:data-[state=active]:text-blue-400 data-[state=active]:shadow-lg transition-all py-3 px-4 h-full m-0"
                                        >
                                            Crear compte
                                        </TabsTrigger>
                                    </TabsList>
                                </div>

                                {/* Sign In Form */}
                                <TabsContent value="signin" className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
                                    <form onSubmit={(e) => { e.preventDefault(); handleEmailSignIn(); }} className="space-y-6">
                                        <div className="space-y-3">
                                            <Label className="text-slate-700 dark:text-slate-300 font-bold text-sm ml-1">Email</Label>
                                            <Input
                                                type="email"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                className="h-14 px-6 bg-white/50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700/50 focus:ring-4 focus:ring-blue-500/10 transition-all rounded-full text-lg"
                                                placeholder="nom@correu.com"
                                            />
                                        </div>
                                        <div className="space-y-3">
                                            <div className="flex justify-between items-center px-1">
                                                <Label className="text-slate-700 dark:text-slate-300 font-bold text-sm">Contrasenya</Label>
                                                <button
                                                    type="button"
                                                    onClick={() => setIsResetMode(true)}
                                                    className="text-xs text-blue-600 dark:text-blue-400 font-bold hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
                                                >
                                                    M'he oblidat
                                                </button>
                                            </div>
                                            <Input
                                                type="password"
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                                className="h-14 px-6 bg-white/50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700/50 focus:ring-4 focus:ring-blue-500/10 transition-all rounded-full text-lg"
                                                placeholder="••••••••"
                                            />
                                        </div>
                                        <Button
                                            type="submit"
                                            className="w-full h-14 bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-500 text-white shadow-[0_10px_20px_-5px_rgba(37,99,235,0.4)] dark:shadow-[0_10px_20px_-5px_rgba(37,99,235,0.2)] font-extrabold text-lg transition-all rounded-full active:scale-[0.97]"
                                            disabled={loading}
                                        >
                                            {loading ? <span className="animate-pulse">Verificant...</span> : "Entrar ara"}
                                        </Button>
                                    </form>
                                </TabsContent>

                                {/* Sign Up Form */}
                                <TabsContent value="signup" className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-500">
                                    <form onSubmit={(e) => { e.preventDefault(); handleEmailSignUp(); }} className="space-y-5">
                                        <div className="space-y-3">
                                            <Label className="text-slate-700 dark:text-slate-300 font-bold text-sm ml-1">Nom complet</Label>
                                            <Input
                                                value={name}
                                                onChange={(e) => setName(e.target.value)}
                                                className="h-13 bg-white/50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-700/50 focus:ring-4 focus:ring-blue-500/10 transition-all rounded-2xl"
                                                placeholder="El teu nom"
                                            />
                                        </div>

                                        <div className="bg-slate-200/40 dark:bg-slate-800/60 p-1 rounded-full flex backdrop-blur-md">
                                            {[
                                                { id: 'student', label: 'Sóc Estudiant', icon: User },
                                                { id: 'professor', label: 'Sóc Professor', icon: GraduationCap }
                                            ].map((r) => (
                                                <button
                                                    key={r.id}
                                                    type="button"
                                                    onClick={() => setRole(r.id as any)}
                                                    className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-full font-bold text-sm transition-all duration-300 ${role === r.id ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-md' : 'text-slate-500 dark:text-slate-400 hover:bg-white/20 dark:hover:bg-slate-700/20'}`}
                                                >
                                                    <r.icon className={`h-4 w-4 ${role === r.id ? 'text-blue-600' : 'text-slate-500'}`} />
                                                    {r.label}
                                                </button>
                                            ))}
                                        </div>

                                        <div className="space-y-3">
                                            <Label className="text-slate-700 dark:text-slate-300 font-bold text-sm ml-1">Email</Label>
                                            <Input
                                                type="email"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                className="h-13 bg-white/50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700/50 focus:ring-4 focus:ring-blue-500/10 transition-all rounded-full px-6"
                                                placeholder="nom@correu.com"
                                            />
                                        </div>

                                        <div className="space-y-3">
                                            <Label className="text-slate-700 dark:text-slate-300 font-bold text-sm ml-1">Contrasenya</Label>
                                            <Input
                                                type="password"
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                                className="h-13 bg-white/50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700/50 focus:ring-4 focus:ring-blue-500/10 transition-all rounded-full px-6"
                                                placeholder="••••••••"
                                            />
                                        </div>

                                        <Button
                                            type="submit"
                                            className="w-full h-14 bg-blue-600 hover:bg-blue-700 text-white shadow-xl shadow-blue-500/20 font-extrabold text-lg transition-all rounded-full active:scale-[0.97] mt-3"
                                            disabled={loading}
                                        >
                                            {loading ? "Creant..." : "Començar Ara"}
                                        </Button>
                                    </form>
                                </TabsContent>
                            </Tabs>
                        ) : (
                            <div className="animate-in fade-in slide-in-from-bottom-2 duration-500 py-4">
                                <div className="space-y-8">
                                    <div className="space-y-3">
                                        <Label className="text-slate-700 dark:text-slate-300 font-bold text-sm ml-1">El teu correu</Label>
                                        <Input
                                            type="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            className="h-14 px-6 bg-white/50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700/50 focus:ring-4 focus:ring-blue-500/10 transition-all rounded-full"
                                            placeholder="hola@exemple.com"
                                        />
                                    </div>

                                    <Button
                                        onClick={handlePasswordReset}
                                        disabled={loading}
                                        className="w-full h-14 bg-indigo-600 hover:bg-indigo-700 text-white shadow-xl shadow-indigo-500/20 font-extrabold text-lg transition-all rounded-full active:scale-[0.97]"
                                    >
                                        {loading ? "Enviant..." : "Recuperar la Meva Clau"}
                                    </Button>

                                    <div className="bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-100 dark:border-indigo-800/30 p-5 rounded-[1.5rem] flex gap-3 items-start">
                                        <div className="w-1.5 h-full bg-indigo-400 rounded-full shrink-0"></div>
                                        <p className="text-sm text-indigo-700 dark:text-indigo-300 leading-relaxed font-medium">
                                            Rebràs un correu amb un enllaç especial. Recorda mirar a la carpeta de **correu brossa** si no el trobes.
                                        </p>
                                    </div>

                                    <button
                                        onClick={() => setIsResetMode(false)}
                                        className="w-full py-2 text-slate-500 dark:text-slate-400 font-bold hover:text-slate-700 dark:hover:text-slate-200 transition-colors text-sm"
                                    >
                                        ← Tornar a l'inici de sessió
                                    </button>
                                </div>
                            </div>
                        )}

                        <div className="pt-6 border-t border-slate-200/50 dark:border-slate-800/50 flex justify-center">
                            <button
                                onClick={() => router.push('/')}
                                className="inline-flex items-center gap-2 text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-all font-bold text-sm group"
                            >
                                <span className="group-hover:-translate-x-1 transition-transform">←</span>
                                Tornar a l'Inici
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
