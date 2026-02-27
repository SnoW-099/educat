"use client";

import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { ShieldCheck, Lock } from "lucide-react";

export default function SecretAdminSetup() {
    const { profile, user } = useAuth();
    const [secretCode, setSecretCode] = useState("");
    const [loading, setLoading] = useState(false);
    const { toast } = useToast();

    const MASTER_KEY = "EDU_CAT_ADMIN_SETUP_2026"; // El teu codi secret

    const handlePromote = async () => {
        if (secretCode !== MASTER_KEY) {
            toast({
                title: "Codi incorrecte",
                description: "Vostè no té autorització per realitzar aquesta acció.",
                variant: "destructive"
            });
            return;
        }

        if (!user || !profile) {
            toast({
                title: "No autenticat",
                description: "Has d'haver iniciat sessió primer.",
                variant: "destructive"
            });
            return;
        }

        setLoading(true);
        try {
            // Primer intentem insertar a user_roles
            const { error: roleError } = await supabase
                .from('user_roles')
                .insert({ 
                    user_id: user.id, 
                    role: 'admin' 
                });

            // Si ja existeix (error 23505), l'actualitzem
            if (roleError && roleError.code === '23505') {
                const { error: updateError } = await supabase
                    .from('user_roles')
                    .update({ role: 'admin' })
                    .eq('user_id', user.id);
                if (updateError) throw updateError;
            } else if (roleError) {
                throw roleError;
            }

            toast({
                title: "Èxit!",
                description: "Ara ets administrador. Recarrega la pàgina.",
            });
            
            setTimeout(() => {
                window.location.href = '/admin';
            }, 2000);
        } catch (error: any) {
            toast({
                title: "Error",
                description: error.message,
                variant: "destructive"
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950 p-4">
            <Card className="w-full max-w-md shadow-2xl border-none bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl">
                <CardHeader className="text-center space-y-2">
                    <div className="mx-auto w-12 h-12 bg-indigo-100 dark:bg-indigo-900/30 rounded-full flex items-center justify-center mb-2">
                        <Lock className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
                    </div>
                    <CardTitle className="text-2xl font-bold">Configuració d'Administrador</CardTitle>
                    <CardDescription>
                        Introdueix la clau mestra per convertir el teu compte en Administrador.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    {!user ? (
                        <div className="p-4 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl text-amber-700 dark:text-amber-400 text-sm text-center font-medium">
                            Has d'iniciar sessió abans de poder promocionar el teu compte.
                        </div>
                    ) : (
                        <div className="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl">
                            <p className="text-xs text-blue-600 dark:text-blue-400 font-bold uppercase mb-1">Compte detectat</p>
                            <p className="text-sm font-bold text-slate-700 dark:text-slate-200">{profile?.name || user.email}</p>
                            <p className="text-xs text-slate-500">Rol actual: {profile?.role}</p>
                        </div>
                    )}

                    <div className="space-y-4">
                        <Input
                            type="password"
                            placeholder="Clau Mestra"
                            value={secretCode}
                            onChange={(e) => setSecretCode(e.target.value)}
                            className="h-12 rounded-xl text-center font-mono tracking-widest"
                        />
                        <Button 
                            onClick={handlePromote} 
                            disabled={loading || !user} 
                            className="w-full h-12 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-lg shadow-indigo-500/20 transition-all active:scale-[0.98]"
                        >
                            {loading ? "Processant..." : "Concedir Accés Admin"}
                        </Button>
                    </div>

                    <div className="flex items-center gap-2 justify-center text-slate-400 text-xs font-medium">
                        <ShieldCheck className="h-3 w-3" />
                        Accés restringit per a desenvolupadors
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
