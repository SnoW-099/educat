"use client"

import { useState } from "react";
import { ArrowLeft, ChevronRight, Type, Music, Quote, MessageSquare, Mic, Hash, PenTool, Tags, Users, Clock, Book, Link, Puzzle } from "lucide-react";
import { Card, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { BeginnerExerciseRunner } from "@/components/beginner/BeginnerExerciseRunner";
import { MODULE_1_EXERCISES } from "@/utils/beginner/module1Data";
import { MODULE_2_EXERCISES } from "@/utils/beginner/module2Data";
import { MODULE_3_EXERCISES } from "@/utils/beginner/module3Data";
import { MODULE_4_EXERCISES } from "@/utils/beginner/module4Data";
import { MODULE_5_EXERCISES } from "@/utils/beginner/module5Data";
import { MODULE_6_EXERCISES } from "@/utils/beginner/module6Data";
import { MODULE_7_EXERCISES } from "@/utils/beginner/module7Data";
import { MODULE_8_EXERCISES } from "@/utils/beginner/module8Data";

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
        if (moduleId === 'm1' || moduleId === 'm2' || moduleId === 'm3' || moduleId === 'm4' || moduleId === 'm5' || moduleId === 'm6' || moduleId === 'm7' || moduleId === 'm8') {
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



    if (selectedZone && currentZone) {
        return (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                <Button
                    variant="ghost"
                    onClick={() => setSelectedZone(null)}
                    className="group pl-0 hover:bg-transparent hover:text-primary transition-colors"
                >
                    <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                    Tornar a les Zones
                </Button>

                <div className={`p-6 rounded-xl border-2 ${currentZone.color}`}>
                    <h2 className="text-2xl font-bold mb-2">{currentZone.title}</h2>
                    <p className="opacity-90 leading-relaxed font-medium">{currentZone.description}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {currentZone.modules.map((module) => (
                        <Card
                            key={module.id}
                            onClick={() => handleModuleClick(module.id)}
                            className={`
                                bg-white dark:bg-slate-900 
                                hover:bg-slate-50 dark:hover:bg-slate-800/50 
                                transition-all duration-200 cursor-pointer group 
                                border-slate-200 dark:border-slate-800 
                                hover:shadow-md hover:border-primary/20
                                ${(module.id === 'm1' || module.id === 'm2' || module.id === 'm3' || module.id === 'm4' || module.id === 'm5' || module.id === 'm6' || module.id === 'm7' || module.id === 'm8') ? "opacity-100" : "opacity-60 grayscale-[0.5] hover:grayscale-0"}
                            `}
                        >
                            <div className="flex flex-row items-center gap-4 p-5">
                                <div className={`p-3 rounded-xl bg-slate-50 dark:bg-slate-800 shadow-sm ${currentZone.iconColor} group-hover:scale-110 group-hover:bg-white dark:group-hover:bg-slate-700 transition-all duration-300`}>
                                    <module.icon className="w-6 h-6" />
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-base font-bold leading-tight group-hover:text-primary transition-colors flex items-center gap-2">
                                        {module.title}
                                    </h3>
                                    <div className="flex items-center gap-2 mt-1.5">
                                        <CardDescription className="text-xs font-medium">
                                            {(module.id === 'm1' || module.id === 'm2' || module.id === 'm3' || module.id === 'm4' || module.id === 'm5' || module.id === 'm6' || module.id === 'm7' || module.id === 'm8') ? '10 exercicis disponibles' : 'Pròximament'}
                                        </CardDescription>
                                        {(module.id === 'm1' || module.id === 'm2' || module.id === 'm3' || module.id === 'm4' || module.id === 'm5' || module.id === 'm6' || module.id === 'm7' || module.id === 'm8') && (
                                            <span className="relative flex h-2 w-2">
                                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                                            </span>
                                        )}
                                    </div>

                                    {getModuleProgress(module.id).progress > 0 && (
                                        <div className="mt-3">
                                            <div className="flex justify-between items-center mb-1">
                                                <span className="text-xs font-semibold text-muted-foreground">{Math.round(getModuleProgress(module.id).progress)}% completat</span>
                                            </div>
                                            <Progress value={getModuleProgress(module.id).progress} className="h-1.5" />
                                        </div>
                                    )}
                                </div>
                                <div className="flex items-center justify-center">
                                    <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-primary group-hover:translate-x-1 transition-all" />
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold tracking-tight mb-4 hidden md:block">Seccions d'Aprenentage</h2>
            <div className="grid grid-cols-1 gap-4">
                {zones.map((zone) => (
                    <div
                        key={zone.id}
                        onClick={() => setSelectedZone(zone.id)}
                        className={`
                            cursor-pointer transition-all duration-300 hover:shadow-lg group 
                            rounded-xl border-2 border-transparent bg-white dark:bg-slate-900 
                            relative overflow-hidden
                        `}
                    >
                        <div className={`p-6 rounded-lg border-2 ${zone.color} h-full flex flex-col md:flex-row md:items-center gap-4 relative z-10`}>
                            <div className="flex-1">
                                <h3 className="text-xl font-bold mb-1 group-hover:text-primary transition-colors">{zone.title}</h3>
                                <p className="text-sm opacity-90 leading-relaxed">{zone.description}</p>
                            </div>
                            <div className="hidden md:flex items-center justify-center p-2 rounded-full bg-white/50 dark:bg-black/10 group-hover:bg-white dark:group-hover:bg-black/20 transition-colors">
                                <ChevronRight className={`w-6 h-6 ${zone.iconColor}`} />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
