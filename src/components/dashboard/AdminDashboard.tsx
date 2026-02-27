"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { UserCheck, UserX, Mail, Calendar, ShieldCheck } from "lucide-react";

export const AdminDashboard = () => {
    const [pendingProfessors, setPendingProfessors] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const { toast } = useToast();

    const fetchPendingProfessors = async () => {
        setLoading(true);
        const { data, error } = await supabase
            .from('profiles')
            .select('*')
            .eq('role', 'professor_pending')
            .order('created_at', { ascending: false });

        if (error) {
            toast({
                title: "Error",
                description: "No s'han pogut carregar els professors pendents",
                variant: "destructive"
            });
        } else {
            setPendingProfessors(data || []);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchPendingProfessors();
    }, []);

    const handleApprove = async (userId: string, name: string) => {
        // Actualitzem a la taula de seguretat
        const { error: roleError } = await supabase
            .from('user_roles')
            .upsert({ user_id: userId, role: 'professor' });

        if (roleError) {
            toast({
                title: "Error",
                description: "No s'ha pogut assignar el rol de professor",
                variant: "destructive"
            });
            return;
        }

        // També actualitzem el perfil per coherència visual
        const { error: profileError } = await supabase
            .from('profiles')
            .update({ role: 'professor' })
            .eq('user_id', userId);

        if (profileError) {
            console.error("Error sincronitzant perfil, però el rol s'ha canviat.");
        }

        toast({
            title: "Aprovat!",
            description: `El professor ${name} ja té accés.`
        });
        fetchPendingProfessors();
    };

    const handleReject = async (userId: string, name: string) => {
        // Marquem com a student a user_roles
        const { error: roleError } = await supabase
            .from('user_roles')
            .upsert({ user_id: userId, role: 'student' });

        if (roleError) {
            toast({
                title: "Error",
                description: "No s'ha pogut rebutjar el professor",
                variant: "destructive"
            });
            return;
        }

        // Actualitzem perfil
        await supabase
            .from('profiles')
            .update({ role: 'student' })
            .eq('user_id', userId);

        toast({
            title: "Rebutjat",
            description: `El professor ${name} ha estat marcat com a estudiant.`,
            variant: "destructive"
        });
        fetchPendingProfessors();
    };

    if (loading) return (
        <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
    );

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">Panell d'Administració</h2>
                    <p className="text-muted-foreground font-medium">Gestiona les sol·licituds de nous professors.</p>
                </div>
                <Badge variant="outline" className="px-4 py-1 text-sm bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 border-blue-200/50">
                    {pendingProfessors.length} Sol·licituds pendents
                </Badge>
            </div>

            {pendingProfessors.length === 0 ? (
                <Card className="glass-card flex flex-col items-center justify-center p-20 border-dashed">
                    <ShieldCheck className="h-16 w-16 text-slate-300 mb-4" />
                    <h3 className="text-xl font-bold text-slate-500">No hi ha professors pendents</h3>
                    <p className="text-slate-400">Tot està sota control!</p>
                </Card>
            ) : (
                <div className="grid gap-6">
                    {pendingProfessors.map((prof) => (
                        <Card key={prof.id} className="glass-card hover-lift border-slate-200/50 dark:border-slate-800/50 overflow-hidden shadow-xl">
                            <CardContent className="p-0">
                                <div className="flex flex-col md:flex-row items-stretch">
                                    <div className="bg-gradient-to-br from-blue-500/10 to-indigo-500/10 p-8 flex flex-col justify-center border-r border-slate-200/50 dark:border-slate-800/50 w-full md:w-1/3">
                                        <div className="flex items-center gap-4 mb-4">
                                            <div className="w-12 h-12 bg-white dark:bg-slate-800 rounded-full flex items-center justify-center text-xl font-bold text-blue-600 shadow-lg border border-blue-100 dark:border-blue-900/50">
                                                {prof.name[0].toUpperCase()}
                                            </div>
                                            <div>
                                                <h3 className="font-bold text-xl">{prof.name}</h3>
                                                <div className="flex items-center gap-1.5 text-xs font-bold text-blue-600/70 uppercase tracking-wider">
                                                    <Badge variant="secondary" className="text-[10px] py-0 px-1.5">Pendent</Badge>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="p-8 flex-1 flex flex-col md:flex-row justify-between items-center gap-6">
                                        <div className="space-y-4 w-full">
                                            <div className="flex items-center gap-3 text-slate-600 dark:text-slate-400 bg-white/50 dark:bg-slate-900/40 p-3 rounded-xl border border-slate-100 dark:border-slate-800/50">
                                                <Mail className="h-5 w-5 text-blue-500" />
                                                <span className="font-medium">{prof.email}</span>
                                            </div>
                                            <div className="flex items-center gap-3 text-slate-600 dark:text-slate-400 bg-white/50 dark:bg-slate-900/40 p-3 rounded-xl border border-slate-100 dark:border-slate-800/50">
                                                <Calendar className="h-5 w-5 text-indigo-500" />
                                                <span className="font-medium text-sm">Registrat el {new Date(prof.created_at).toLocaleDateString()}</span>
                                            </div>
                                        </div>
                                        <div className="flex gap-3 w-full md:w-auto">
                                            <Button 
                                                onClick={() => handleReject(prof.user_id, prof.name)} 
                                                variant="outline" 
                                                className="flex-1 md:w-32 h-12 rounded-full border-red-200 hover:bg-red-50 hover:text-red-600 text-red-500 font-bold"
                                            >
                                                <UserX className="h-5 w-5 mr-2" />
                                                Rebutjar
                                            </Button>
                                            <Button 
                                                onClick={() => handleApprove(prof.user_id, prof.name)} 
                                                className="flex-1 md:w-32 h-12 rounded-full bg-green-600 hover:bg-green-700 text-white font-bold shadow-lg shadow-green-500/20"
                                            >
                                                <UserCheck className="h-5 w-5 mr-2" />
                                                Aaprovar
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
};
