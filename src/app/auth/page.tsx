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
import { ModeToggle } from "@/components/mode-toggle";

export default function Auth() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [role, setRole] = useState<'professor' | 'student'>('student');
    const [classCode, setClassCode] = useState("");
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

        // Codi de classe ara és opcional per a estudiants

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
                        class_code: classCode || undefined,
                    }
                }
            });

            if (error) throw error;

            // Si hay class_code, verificar que la clase existe antes de mostrar éxito
            if (classCode) {
                const { data: classData, error: classError } = await supabase
                    .from('classes')
                    .select('id')
                    .eq('code', classCode)
                    .eq('is_active', true)
                    .maybeSingle();

                if (classError || !classData) {
                    toast({
                        title: "Codi de classe incorrecte",
                        description: "El codi de classe no existeix o no està actiu. Pots registrar-te sense codi i afegir-te a una classe més tard.",
                        variant: "destructive",
                        duration: 5000,
                    });
                    return;
                }
            }

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
        <div className="min-h-screen flex items-center justify-center p-4 bg-slate-50 relative overflow-hidden">
            <ModeToggle className="fixed top-4 right-4 z-[9999]" />
            {/* Background Ambience - Blue Tones */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-0 left-0 w-full h-full bg-slate-50"></div>
                <div className="absolute -top-[10%] -left-[10%] w-[50%] h-[50%] bg-blue-400/20 rounded-full blur-[120px] animate-blob"></div>
                <div className="absolute top-[20%] -right-[10%] w-[40%] h-[60%] bg-indigo-400/20 rounded-full blur-[120px] animate-blob animation-delay-2000"></div>
                <div className="absolute -bottom-[10%] left-[20%] w-[60%] h-[40%] bg-sky-400/20 rounded-full blur-[120px] animate-blob animation-delay-4000"></div>
            </div>

            {/* Main Card Container - Centered & Larger */}
            <div className="w-full max-w-5xl bg-white rounded-[2rem] shadow-2xl overflow-hidden grid lg:grid-cols-5 relative z-10 min-h-[600px] border border-slate-100">

                {/* Visual Side (Left - 2cols) - Pure Blue/Indigo Theme */}
                <div className="hidden lg:flex lg:col-span-2 bg-gradient-to-br from-indigo-600 to-blue-700 text-white flex-col justify-between p-12 relative overflow-hidden">
                    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150"></div>

                    {/* Decorative Circles */}
                    <div className="absolute top-10 right-10 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
                    <div className="absolute bottom-10 left-10 w-40 h-40 bg-blue-400/20 rounded-full blur-3xl"></div>

                    <div className="relative z-10">
                        <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center mb-8 border border-white/30 shadow-lg">
                            <span className="text-3xl font-bold tracking-tighter">Ec</span>
                        </div>
                        <h2 className="text-4xl font-bold leading-tight mb-4 text-white">
                            Benvingut a la nova era educativa.
                        </h2>
                        <p className="text-blue-100 text-lg leading-relaxed font-light">
                            EduCat transforma la manera d'aprendre català amb tecnologia adaptativa i disseny premium.
                        </p>
                    </div>

                    <div className="relative z-10 space-y-4">
                        <div className="flex items-center gap-4 text-sm font-medium text-blue-100 bg-white/10 p-3 rounded-xl border border-white/10 backdrop-blur-sm">
                            <div className="p-2 bg-white/20 rounded-lg">
                                <GraduationCap className="w-5 h-5 text-white" />
                            </div>
                            <span>Aprenentatge 100% Personalitzat</span>
                        </div>
                    </div>
                </div>

                {/* Form Side (Right - 3cols) */}
                <div className="lg:col-span-3 p-8 lg:p-12 flex flex-col justify-center bg-white">
                    <div className="max-w-md mx-auto w-full space-y-8">

                        <div className="text-center lg:text-left space-y-2">
                            <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Començar l'aventura</h1>
                            <p className="text-slate-500">Accedeix al teu espai personal en segons.</p>
                        </div>

                        {!isResetMode ? (
                            <Tabs defaultValue="signin" className="w-full">
                                <TabsList className="grid w-full grid-cols-2 mb-8 bg-slate-50 p-1 rounded-xl border border-slate-100">
                                    <TabsTrigger value="signin" className="rounded-lg font-medium text-sm data-[state=active]:bg-white data-[state=active]:text-blue-600 data-[state=active]:shadow-sm transition-all py-2.5">
                                        Iniciar sessió
                                    </TabsTrigger>
                                    <TabsTrigger value="signup" className="rounded-lg font-medium text-sm data-[state=active]:bg-white data-[state=active]:text-blue-600 data-[state=active]:shadow-sm transition-all py-2.5">
                                        Registrar-se
                                    </TabsTrigger>
                                </TabsList>

                                {/* Sign In Form */}
                                <TabsContent value="signin" className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                                    <form onSubmit={(e) => { e.preventDefault(); handleEmailSignIn(); }} className="space-y-5">
                                        <div className="space-y-2">
                                            <Label className="text-slate-700 font-semibold text-sm">Correu electrònic</Label>
                                            <div className="relative">
                                                <Input
                                                    type="email"
                                                    value={email}
                                                    onChange={(e) => setEmail(e.target.value)}
                                                    className="h-12 pl-4 bg-slate-50 border-slate-200 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all rounded-xl"
                                                    placeholder="hola@exemple.com"
                                                />
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <div className="flex justify-between items-center">
                                                <Label className="text-slate-700 font-semibold text-sm">Contrasenya</Label>
                                                <span
                                                    onClick={() => setIsResetMode(true)}
                                                    className="text-xs text-blue-600 font-semibold hover:underline cursor-pointer"
                                                >
                                                    Has oblidat?
                                                </span>
                                            </div>
                                            <Input
                                                type="password"
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                                className="h-12 pl-4 bg-slate-50 border-slate-200 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all rounded-xl"
                                                placeholder="••••••••"
                                            />
                                        </div>
                                        <Button
                                            type="submit"
                                            className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white shadow-xl shadow-blue-200 font-bold text-base transition-all rounded-xl active:scale-[0.98] mt-2"
                                            disabled={loading}
                                        >
                                            {loading ? <span className="animate-pulse">Autenticant...</span> : "Accedir al compte"}
                                        </Button>
                                    </form>
                                </TabsContent>

                                {/* Sign Up Form */}
                                <TabsContent value="signup" className="space-y-5 animate-in fade-in slide-in-from-right-4 duration-300">
                                    <form onSubmit={(e) => { e.preventDefault(); handleEmailSignUp(); }} className="space-y-4">
                                        <div className="space-y-2">
                                            <Label className="text-slate-700 font-semibold text-sm">Nom complet</Label>
                                            <Input
                                                value={name}
                                                onChange={(e) => setName(e.target.value)}
                                                className="h-12 bg-slate-50 border-slate-200 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all rounded-xl"
                                                placeholder="El teu nom"
                                            />
                                        </div>
                                        <div className="grid grid-cols-2 gap-3">
                                            <div
                                                onClick={() => setRole('student')}
                                                className={`cursor-pointer border-2 rounded-xl p-3 flex flex-col items-center justify-center gap-2 transition-all duration-200 ${role === 'student' ? 'bg-blue-50 border-blue-500 text-blue-700' : 'bg-white border-slate-100 hover:border-slate-200 text-slate-500'}`}
                                            >
                                                <User className={`h-6 w-6 ${role === 'student' ? 'text-blue-600' : 'text-slate-400'}`} />
                                                <span className="text-sm font-bold">Estudiant</span>
                                            </div>
                                            <div
                                                onClick={() => setRole('professor')}
                                                className={`cursor-pointer border-2 rounded-xl p-3 flex flex-col items-center justify-center gap-2 transition-all duration-200 ${role === 'professor' ? 'bg-blue-50 border-blue-500 text-blue-700' : 'bg-white border-slate-100 hover:border-slate-200 text-slate-500'}`}
                                            >
                                                <GraduationCap className={`h-6 w-6 ${role === 'professor' ? 'text-blue-600' : 'text-slate-400'}`} />
                                                <span className="text-sm font-bold">Professor</span>
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <Label className="text-slate-700 font-semibold text-sm">Correu electrònic</Label>
                                            <Input
                                                type="email"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                className="h-12 bg-slate-50 border-slate-200 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all rounded-xl"
                                                placeholder="hola@exemple.com"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label className="text-slate-700 font-semibold text-sm">Contrasenya</Label>
                                            <Input
                                                type="password"
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                                className="h-12 bg-slate-50 border-slate-200 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all rounded-xl"
                                                placeholder="Crear contrasenya"
                                            />
                                        </div>
                                        {role === 'student' && (
                                            <div className="space-y-2">
                                                <Label className="text-slate-700 font-semibold text-xs uppercase tracking-wide">Codi de classe (Opcional)</Label>
                                                <Input
                                                    value={classCode}
                                                    onChange={(e) => setClassCode(e.target.value.toUpperCase())}
                                                    className="h-12 font-mono text-center bg-slate-50 border-slate-200 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all rounded-xl"
                                                    placeholder="ABC-123"
                                                />
                                            </div>
                                        )}
                                        <Button
                                            type="submit"
                                            className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white shadow-xl shadow-blue-200 font-bold text-base transition-all rounded-xl active:scale-[0.98]"
                                            disabled={loading}
                                        >
                                            {loading ? "Creant compte..." : "Registrar-se"}
                                        </Button>
                                    </form>
                                </TabsContent>
                            </Tabs>
                        ) : (
                            <div className="animate-in fade-in slide-in-from-right-4 duration-300">
                                <div className="text-center mb-8">
                                    <h3 className="text-2xl font-bold text-slate-900 mb-2">Recuperar Contrasenya</h3>
                                    <p className="text-slate-500 text-sm">Introdueix el teu correu i t'enviarem les instruccions.</p>
                                </div>

                                <div className="space-y-6">
                                    <div className="space-y-2">
                                        <Label className="text-slate-700 font-semibold text-sm">Correu electrònic</Label>
                                        <Input
                                            type="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            className="h-12 pl-4 bg-slate-50 border-slate-200 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all rounded-xl"
                                            placeholder="hola@exemple.com"
                                        />
                                    </div>

                                    <Button
                                        onClick={handlePasswordReset}
                                        disabled={loading}
                                        className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white shadow-xl shadow-blue-200 font-bold text-base transition-all rounded-xl active:scale-[0.98]"
                                    >
                                        {loading ? "Enviant..." : "Enviar enllaç de recuperació"}
                                    </Button>

                                    <div className="text-xs text-center text-slate-500 bg-blue-50 p-3 rounded-lg">
                                        <p className="font-semibold text-blue-700 mb-1">⚠️ Important:</p>
                                        <p>Revisa la carpeta de <span className="font-bold">Spam</span> si no reps el correu en pocs minuts.</p>
                                    </div>

                                    <Button
                                        variant="ghost"
                                        onClick={() => setIsResetMode(false)}
                                        className="w-full text-slate-500 hover:text-slate-800"
                                    >
                                        Tornar enrere
                                    </Button>
                                </div>
                            </div>
                        )}

                        <div className="text-center">
                            <Button variant="link" size="sm" onClick={() => router.push('/')} className="text-slate-400 hover:text-slate-600 font-normal">
                                ← Tornar a l'inici
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

