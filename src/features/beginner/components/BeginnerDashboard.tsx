"use client"

import { useState } from "react";
import { ArrowLeft, ChevronRight, Type, Music, Quote, MessageSquare, Mic, Hash, PenTool, Tags, Users, Clock, Book, Link, Puzzle, Sparkles, Mountain, Trophy, Flag, Zap, Award, Star } from "lucide-react";
import { Card, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { BeginnerExerciseRunner } from "@/features/beginner/components/BeginnerExerciseRunner";
import { MODULE_1_EXERCISES } from "@/features/beginner/data/module1Data";
import { MODULE_2_EXERCISES } from "@/features/beginner/data/module2Data";
import { MODULE_3_EXERCISES } from "@/features/beginner/data/module3Data";
import { MODULE_4_EXERCISES } from "@/features/beginner/data/module4Data";
import { MODULE_5_EXERCISES } from "@/features/beginner/data/module5Data";
import { MODULE_6_EXERCISES } from "@/features/beginner/data/module6Data";
import { MODULE_7_EXERCISES } from "@/features/beginner/data/module7Data";
import { MODULE_8_EXERCISES } from "@/features/beginner/data/module8Data";
import { MODULE_9_EXERCISES } from "@/features/beginner/data/module9Data";
import { MODULE_10_EXERCISES } from "@/features/beginner/data/module10Data";
import { MODULE_11_EXERCISES } from "@/features/beginner/data/module11Data";
import { MODULE_12_EXERCISES } from "@/features/beginner/data/module12Data";
import { MODULE_13_EXERCISES } from "@/features/beginner/data/module13Data";

import { useModuleProgress } from "@/hooks/useModuleProgress";

export const BeginnerDashboard = () => {
    const [selectedZone, setSelectedZone] = useState<string | null>(null);
    const [activeModule, setActiveModule] = useState<string | null>(null);
    const { updateProgress, getModuleProgress } = useModuleProgress();

    const zones = [
        {
            id: "z1",
            title: "Zona 01: Fonètica i Ortografia Bàsica",
            description: "El nucli del llibre. Com sonen i s'escriuen les paraules.",
            color: "bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-900 text-blue-700 dark:text-blue-300",
            iconColor: "text-blue-600 dark:text-blue-400",
            modules: [
                { id: "m1", title: "Mòdul 1: L'alfabet i l'ordenació", icon: Type },
                { id: "m2", title: "Mòdul 2: La síl·laba", icon: Music },
                { id: "m3", title: "Mòdul 3: Accentuació i Dièresi", icon: Quote },
                { id: "m4", title: "Mòdul 4: El sistema vocàlic", icon: MessageSquare },
                { id: "m5", title: "Mòdul 5: El sistema consonàntic", icon: Mic },
                { id: "m6", title: "Mòdul 6: Grafies finals", icon: Hash },
                { id: "m7", title: "Mòdul 7: Signes de puntuació", icon: PenTool },
            ]
        },
        {
            id: "z2",
            title: "Zona 02: Morfosintaxi i Gramàtica",
            description: "La funció de les paraules dins de la frase.",
            color: "bg-emerald-50 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-900 text-emerald-700 dark:text-emerald-300",
            iconColor: "text-emerald-600 dark:text-emerald-400",
            modules: [
                { id: "m8", title: "Mòdul 8: Categories gramaticals", icon: Tags },
                { id: "m9", title: "Mòdul 9: Flexió de gènere i nombre", icon: Users },
                { id: "m10", title: "Mòdul 10: El Sistema Verbal", icon: Clock },
            ]
        },
        {
            id: "z3",
            title: "Zona 03: Lèxic i Semàntica",
            description: "Riquesa del vocabulari i ús d'eines.",
            color: "bg-amber-50 dark:bg-amber-950/20 border-amber-200 dark:border-amber-900 text-amber-700 dark:text-amber-300",
            iconColor: "text-amber-600 dark:text-amber-400",
            modules: [
                { id: "m11", title: "Mòdul 11: El Diccionari", icon: Book },
                { id: "m12", title: "Mòdul 12: Relacions semàntiques", icon: Link },
                { id: "m13", title: "Mòdul 13: Formació de paraules", icon: Puzzle },
            ]
        }
    ];

    const currentZone = zones.find(z => z.id === selectedZone);

    const handleModuleClick = (moduleId: string) => {
        if (moduleId === 'm1' || moduleId === 'm2' || moduleId === 'm3' || moduleId === 'm4' || moduleId === 'm5' || moduleId === 'm6' || moduleId === 'm7' || moduleId === 'm8' || moduleId === 'm9' || moduleId === 'm10' || moduleId === 'm11' || moduleId === 'm12' || moduleId === 'm13') {
            setActiveModule(moduleId);
        } else {
            // Placeholder for unavailable modules
        }
    };

    // If a module is active, show the runner
    if (activeModule === 'm1') {
        return (
            <BeginnerExerciseRunner
                exercises={MODULE_1_EXERCISES}
                onExit={() => setActiveModule(null)}
                currentModuleId="m1"
                onUpdateProgress={updateProgress}
                initialIndex={getModuleProgress('m1').lastIndex}
            />
        );
    }

    if (activeModule === 'm2') {
        return (
            <BeginnerExerciseRunner
                exercises={MODULE_2_EXERCISES}
                onExit={() => setActiveModule(null)}
                currentModuleId="m2"
                onUpdateProgress={updateProgress}
                initialIndex={getModuleProgress('m2').lastIndex}
            />
        );
    }

    if (activeModule === 'm3') {
        return (
            <BeginnerExerciseRunner
                exercises={MODULE_3_EXERCISES}
                onExit={() => setActiveModule(null)}
                currentModuleId="m3"
                onUpdateProgress={updateProgress}
                initialIndex={getModuleProgress('m3').lastIndex}
            />
        );
    }

    if (activeModule === 'm4') {
        return (
            <BeginnerExerciseRunner
                exercises={MODULE_4_EXERCISES}
                onExit={() => setActiveModule(null)}
                currentModuleId="m4"
                onUpdateProgress={updateProgress}
                initialIndex={getModuleProgress('m4').lastIndex}
            />
        );
    }

    if (activeModule === 'm5') {
        return (
            <BeginnerExerciseRunner
                exercises={MODULE_5_EXERCISES}
                onExit={() => setActiveModule(null)}
                currentModuleId="m5"
                onUpdateProgress={updateProgress}
                initialIndex={getModuleProgress('m5').lastIndex}
            />
        );
    }

    if (activeModule === 'm6') {
        return (
            <BeginnerExerciseRunner
                exercises={MODULE_6_EXERCISES}
                onExit={() => setActiveModule(null)}
                currentModuleId="m6"
                onUpdateProgress={updateProgress}
                initialIndex={getModuleProgress('m6').lastIndex}
            />
        );
    }

    if (activeModule === 'm7') {
        return (
            <BeginnerExerciseRunner
                exercises={MODULE_7_EXERCISES}
                onExit={() => setActiveModule(null)}
                currentModuleId="m7"
                onUpdateProgress={updateProgress}
                initialIndex={getModuleProgress('m7').lastIndex}
            />
        );
    }

    if (activeModule === 'm8') {
        return (
            <BeginnerExerciseRunner
                exercises={MODULE_8_EXERCISES}
                onExit={() => setActiveModule(null)}
                currentModuleId="m8"
                onUpdateProgress={updateProgress}
                initialIndex={getModuleProgress('m8').lastIndex}
            />
        );
    }

    if (activeModule === 'm9') {
        return (
            <BeginnerExerciseRunner
                exercises={MODULE_9_EXERCISES}
                onExit={() => setActiveModule(null)}
                currentModuleId="m9"
                onUpdateProgress={updateProgress}
                initialIndex={getModuleProgress('m9').lastIndex}
            />
        );
    }

    if (activeModule === 'm10') {
        return (
            <BeginnerExerciseRunner
                exercises={MODULE_10_EXERCISES}
                onExit={() => setActiveModule(null)}
                currentModuleId="m10"
                onUpdateProgress={updateProgress}
                initialIndex={getModuleProgress('m10').lastIndex}
            />
        );
    }

    if (activeModule === 'm11') {
        return (
            <BeginnerExerciseRunner
                exercises={MODULE_11_EXERCISES}
                onExit={() => setActiveModule(null)}
                currentModuleId="m11"
                onUpdateProgress={updateProgress}
                initialIndex={getModuleProgress('m11').lastIndex}
            />
        );
    }

    if (activeModule === 'm12') {
        return (
            <BeginnerExerciseRunner
                exercises={MODULE_12_EXERCISES}
                onExit={() => setActiveModule(null)}
                currentModuleId="m12"
                onUpdateProgress={updateProgress}
                initialIndex={getModuleProgress('m12').lastIndex}
            />
        );
    }

    if (activeModule === 'm13') {
        return (
            <BeginnerExerciseRunner
                exercises={MODULE_13_EXERCISES}
                onExit={() => setActiveModule(null)}
                currentModuleId="m13"
                onUpdateProgress={updateProgress}
                initialIndex={getModuleProgress('m13').lastIndex}
            />
        );
    }

    if (selectedZone && currentZone) {
        return (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300 pb-10">
                <div className="flex items-center justify-between">
                    <Button
                        variant="ghost"
                        onClick={() => setSelectedZone(null)}
                        className="group pl-0 hover:bg-transparent hover:text-blue-500 transition-colors font-bold text-slate-600 dark:text-slate-400"
                    >
                        <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
                        Tornar a les Zones
                    </Button>
                    
                    <div className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/5 border border-blue-500/20 text-blue-600 dark:text-blue-400 font-bold text-sm">
                        <Star className="w-4 h-4 fill-current" />
                        <span>Mòduls Disponibles</span>
                    </div>
                </div>

                <div className={`relative overflow-hidden p-8 rounded-[2rem] border isolate bg-slate-950 shadow-2xl`}>
                    {/* Background Glows for Zone Detail Header */}
                    <div className="absolute top-0 right-0 -mr-20 -mt-20 w-72 h-72 rounded-full bg-blue-500/10 blur-[80px] pointer-events-none"></div>
                    <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-72 h-72 rounded-full bg-sky-500/10 blur-[80px] pointer-events-none"></div>
                    
                    <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                        <div className="space-y-3">
                            <h2 className="text-3xl font-black text-white tracking-tight">{currentZone.title}</h2>
                            <p className="text-slate-400 leading-relaxed font-medium max-w-xl text-lg">{currentZone.description}</p>
                        </div>
                        <div className="shrink-0 flex items-center justify-center w-20 h-20 rounded-[1.5rem] bg-white/5 border border-white/10 backdrop-blur-xl">
                             {selectedZone === 'z1' ? <Flag className="w-10 h-10 text-blue-400" /> : selectedZone === 'z2' ? <Zap className="w-10 h-10 text-emerald-400" /> : <Trophy className="w-10 h-10 text-amber-400" />}
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 stagger-build">
                    {currentZone.modules.map((module) => {
                        const moduleProgress = getModuleProgress(module.id).progress;
                        const isAvailable = (module.id === 'm1' || module.id === 'm2' || module.id === 'm3' || module.id === 'm4' || module.id === 'm5' || module.id === 'm6' || module.id === 'm7' || module.id === 'm8' || module.id === 'm9' || module.id === 'm10' || module.id === 'm11' || module.id === 'm12' || module.id === 'm13');
                        
                        return (
                            <div
                                key={module.id}
                                onClick={() => isAvailable && handleModuleClick(module.id)}
                                className={`
                                    flex flex-col h-full bg-white dark:bg-slate-900/40 rounded-3xl p-6 border border-slate-200 dark:border-slate-800/60 transition-all duration-300 relative overflow-hidden isolate
                                    ${isAvailable 
                                        ? "cursor-pointer group hover:border-blue-300 dark:hover:border-blue-500/50 hover:shadow-[0_8px_30px_rgba(59,130,246,0.12)] hover:-translate-y-1" 
                                        : "opacity-60 grayscale-[0.3] cursor-not-allowed"}
                                `}
                            >
                                {/* Hover Gradient */}
                                {isAvailable && <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 to-sky-500/0 group-hover:from-blue-500/5 group-hover:to-sky-500/5 transition-colors duration-500 -z-10"></div>}
                                
                                <div className="flex justify-between items-start mb-5">
                                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-300 shadow-sm border
                                        ${isAvailable ? 'bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700 group-hover:bg-blue-600 group-hover:border-blue-400 group-hover:scale-110' : 'bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700'}
                                    `}>
                                        <module.icon className={`w-6 h-6 transition-colors duration-300 ${isAvailable ? 'text-slate-700 dark:text-slate-300 group-hover:text-white' : 'text-slate-400 dark:text-slate-500'}`} />
                                    </div>
                                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300
                                        ${isAvailable ? 'bg-slate-50 dark:bg-slate-800/50 text-slate-400 group-hover:text-blue-500 group-hover:bg-blue-50 dark:group-hover:bg-blue-500/20' : 'text-slate-400'}
                                    `}>
                                        {isAvailable ? <ArrowLeft className="w-5 h-5 rotate-180" /> : <Clock className="w-5 h-5" />}
                                    </div>
                                </div>
                                
                                <div className="flex-1">
                                    <h4 className="text-lg font-black text-slate-900 dark:text-slate-100 mb-2 leading-tight group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                        {module.title}
                                    </h4>
                                    <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-4">
                                        {isAvailable ? '10 exercicis disponibles' : 'Pròximament'}
                                    </p>
                                </div>

                                {isAvailable && moduleProgress > 0 && (
                                    <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800/50">
                                        <div className="flex justify-between items-center mb-2">
                                            <span className="text-[10px] uppercase font-black tracking-widest text-slate-400 dark:text-slate-500">COMPLETAT</span>
                                            <span className="text-xs font-black text-slate-900 dark:text-slate-100">{Math.round(moduleProgress)}%</span>
                                        </div>
                                        <div className="h-1.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                                            <div 
                                                className="h-full bg-gradient-to-r from-blue-500 to-sky-400 transition-all duration-500"
                                                style={{ width: `${moduleProgress}%` }}
                                            ></div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-8 pb-10">
            {/* Minimalist Hero Section for Beginners */}
            <div className="relative overflow-hidden rounded-3xl bg-slate-950 p-6 shadow-xl isolate">
                {/* Glow Effects - Pure Blue/Sky */}
                <div className="absolute top-0 right-0 -mr-20 -mt-20 w-72 h-72 rounded-full bg-blue-500/10 blur-[80px] pointer-events-none"></div>
                <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-72 h-72 rounded-full bg-sky-500/10 blur-[80px] pointer-events-none"></div>
                
                {/* Dot pattern */}
                <div className="absolute inset-0 bg-[radial-gradient(#ffffff22_1px,transparent_1px)] [background-size:16px_16px] opacity-10"></div>
                
                <div className="relative z-10 flex flex-col sm:flex-row items-center sm:items-start gap-5 text-center sm:text-left">
                    <div className="inline-flex items-center justify-center p-3.5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md shrink-0">
                        <Mountain className="h-7 w-7 text-blue-400" />
                    </div>
                    <div className="flex-1 space-y-2">
                        <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight flex items-center justify-center sm:justify-start gap-2">
                            Pla d'estudis <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-sky-400">Iniciació</span>
                        </h2>
                        <p className="text-slate-400 text-sm sm:text-base font-medium max-w-2xl leading-relaxed">
                            Continguts fonamentals adaptats per a alumnes de 1r d'ESO i nivells inicials.
                        </p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 stagger-build">
                {zones.map((zone, idx) => {
                    // Calculate total progress for the zone
                    const totalProgress = zone.modules.reduce((acc, m) => acc + getModuleProgress(m.id).progress, 0) / zone.modules.length;
                    
                    return (
                        <div
                            key={zone.id}
                            onClick={() => setSelectedZone(zone.id)}
                            className={`
                                cursor-pointer transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 group 
                                rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/40
                                relative overflow-hidden flex flex-col h-full
                            `}
                        >
                             {/* Hover Gradient */}
                            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 to-sky-500/0 group-hover:from-blue-500/5 group-hover:to-sky-500/5 transition-colors duration-500 -z-10"></div>
                            
                            <div className="p-8 flex flex-col flex-1 relative z-10">
                                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-all duration-300 shadow-sm border
                                    ${idx === 0 ? 'bg-blue-600 border-blue-400/50' : idx === 1 ? 'bg-emerald-600 border-emerald-400/50' : 'bg-amber-600 border-amber-400/50'}
                                    group-hover:scale-110 group-hover:shadow-lg
                                `}>
                                    {idx === 0 ? <Flag className="w-7 h-7 text-white" /> : idx === 1 ? <Zap className="w-7 h-7 text-white" /> : <Trophy className="w-7 h-7 text-white" />}
                                </div>

                                <div className="space-y-4 flex-1">
                                    <h3 className="text-xl font-black text-slate-900 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors tracking-tight">
                                        {zone.title}
                                    </h3>
                                    <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
                                        {zone.description}
                                    </p>
                                </div>

                                <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800/50">
                                    <div className="flex justify-between items-end mb-3">
                                        <div className="space-y-1">
                                            <p className="text-[10px] uppercase tracking-wider font-extrabold text-slate-400 dark:text-slate-500">PROGRÉS DEL BLOC</p>
                                            <p className="text-xl font-black text-slate-900 dark:text-slate-100">{Math.round(totalProgress)}%</p>
                                        </div>
                                        <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-400 group-hover:text-blue-500 group-hover:bg-blue-50 dark:group-hover:bg-blue-500/20 transition-all duration-300">
                                            <ChevronRight className="w-5 h-5 flex-shrink-0" />
                                        </div>
                                    </div>
                                    <div className="h-2 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                                        <div 
                                            className={`h-full transition-all duration-1000 ease-out rounded-full bg-gradient-to-r 
                                                ${idx === 0 ? 'from-blue-500 to-sky-400' : idx === 1 ? 'from-emerald-500 to-teal-400' : 'from-amber-500 to-orange-400'}
                                            `}
                                            style={{ width: `${totalProgress}%` }}
                                        ></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Simple Tip */}
            <div className="bg-transparent border-dashed border-2 border-blue-200 dark:border-blue-500/30 rounded-3xl overflow-hidden relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-sky-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="p-6">
                    <div className="flex items-start gap-4">
                        <div className="rounded-2xl bg-blue-500/10 dark:bg-blue-500/20 p-3.5 shrink-0 flex items-center justify-center border border-blue-200/50 dark:border-blue-500/30">
                            <Star className="h-7 w-7 text-blue-500" />
                        </div>
                        <div>
                            <p className="font-bold text-slate-900 dark:text-slate-100 mb-1.5 text-lg">Recorda</p>
                            <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
                                Pots repetir els mòduls tantes vegades com vulguis per reforçar el que has après. L'objectiu és assolir una base sòlida.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
