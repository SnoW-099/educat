"use client";

import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CATALAN_GRAMMAR_SECTIONS, type GrammarSection } from "@/features/courses/data/catalanGrammarCategories";
import { ExerciseModal } from "@/features/courses/components/exercises/ExerciseModal";
import { useRouter } from "next/navigation";

const Exercicis = () => {
  const router = useRouter();
  const [selectedSection, setSelectedSection] = useState<GrammarSection | null>(null);

  const categories = [
    { id: 'teoria', name: 'Teoria', description: 'Conceptes i explicacions teòriques' },
    { id: 'ortografia', name: 'Ortografia', description: 'Accentuació, dièresi, guionets...' },
    { id: 'fonetica', name: 'Fonètica', description: 'Vocal neutra, grafies b/v, r/rr...' },
    { id: 'noms', name: 'Noms', description: 'Masculí/femení, singular/plural' },
    { id: 'verbs', name: 'Verbs', description: 'Conjugacions, irregulars, subjuntiu...' },
    { id: 'adjectius', name: 'Adjectius', description: 'Concordança, plurals' },
    { id: 'articles', name: 'Articles', description: 'Definits i indefinits' },
    { id: 'pronoms', name: 'Pronoms', description: 'Febles, combinacions' },
    { id: 'preposicions', name: 'Preposicions', description: 'Ús correcte de preposicions' },
    { id: 'adverbis', name: 'Adverbis', description: 'Formació i ús d\'adverbis' },
    { id: 'derivacio', name: 'Derivació', description: 'Formació de paraules' },
    { id: 'frases_fetes', name: 'Frases Fetes', description: 'Expressions populars' },
    { id: 'confusions', name: 'Confusions', description: 'Errors comuns' },
  ];

  const getCategorySections = (categoryId: string) => {
    return CATALAN_GRAMMAR_SECTIONS.filter(section => section.category === categoryId);
  };

  return (
    <div className="min-h-screen bg-background bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-50/50 via-background to-background dark:from-blue-950/20">
      <Header onNavigateToAuth={() => router.push('/auth')} />

      <main className="container mx-auto px-4 lg:px-8 py-12 max-w-7xl">
        <div className="mb-12 max-w-2xl text-center mx-auto space-y-4">
          <h1 className="text-4xl lg:text-5xl font-extrabold tracking-tight text-foreground bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-600">
            Domina el Català
          </h1>
          <p className="text-lg text-muted-foreground font-medium">
            Tria una categoria i comença a posar a prova els teus coneixements.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 auto-rows-max">
          {categories.map((category) => {
            const sections = getCategorySections(category.id);
            const totalExercises = sections.reduce((acc, section) => acc + section.exercises.length, 0);

            return (
              <Card 
                key={category.id} 
                className="group relative overflow-hidden flex flex-col hover:-translate-y-1 hover:shadow-lg dark:hover:shadow-[0_8px_30px_rgba(59,130,246,0.1)] transition-all duration-300 bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:border-blue-400 dark:hover:border-blue-500/50"
              >
                <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-blue-500/20 to-transparent group-hover:via-blue-500/50 transition-colors duration-500" />
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <CardHeader className="pb-4 shrink-0 relative z-10">
                  <div className="flex items-start justify-between mb-2">
                    <CardTitle className="text-xl font-bold text-slate-800 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors leading-tight">
                      {category.name}
                    </CardTitle>
                    <span className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-xs font-bold border border-blue-100 dark:border-blue-800/30">
                      {sections.length}
                    </span>
                  </div>
                  <CardDescription className="text-sm line-clamp-2 min-h-[40px] leading-relaxed text-slate-500 dark:text-slate-400">
                    {category.description}
                  </CardDescription>
                  <div className="pt-3 flex items-center gap-2 text-xs font-medium text-slate-500 dark:text-slate-400">
                    <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-50 dark:bg-slate-700/30 border border-slate-100 dark:border-slate-600/30">
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-slate-400"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/></svg>
                      {totalExercises} exercicis
                    </span>
                  </div>
                </CardHeader>
                
                <CardContent className="flex-1 flex flex-col pt-0 relative z-10">
                  <div className="relative mt-auto border-t border-slate-100 dark:border-slate-700/50 pt-4">
                    {sections.length > 0 ? (
                      <div className="space-y-2 max-h-[220px] overflow-y-auto pr-2 -mr-2 scrollbar-thin scrollbar-thumb-slate-200 dark:scrollbar-thumb-slate-700 scrollbar-track-transparent">
                        {sections.map((section) => (
                          <Button
                            key={section.id}
                            variant="secondary"
                            className="w-full justify-start text-left h-auto py-3 px-4 shadow-sm bg-slate-50 dark:bg-slate-700/30 hover:bg-white dark:hover:bg-slate-700 border border-slate-100 dark:border-slate-600/50 hover:border-blue-200 dark:hover:border-blue-500/30 transition-all group/btn rounded-xl"
                            onClick={() => setSelectedSection(section)}
                          >
                            <div className="w-full">
                              <div className="font-bold text-[13px] leading-snug tracking-tight text-slate-700 dark:text-slate-200 group-hover/btn:text-blue-600 dark:group-hover/btn:text-blue-400 mb-1.5 line-clamp-1 transition-colors">
                                {section.title}
                              </div>
                              <div className="flex items-center justify-between text-[11px] font-medium text-slate-500 dark:text-slate-400 w-full">
                                <span>{section.exercises.length} pràctiques</span>
                                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-0 -translate-x-2 transition-all group-hover/btn:opacity-100 group-hover/btn:translate-x-0 text-blue-500"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                              </div>
                            </div>
                          </Button>
                        ))}
                      </div>
                    ) : (
                      <div className="py-8 text-center bg-slate-50/50 dark:bg-slate-800/50 border border-slate-200/50 dark:border-slate-700/50 border-dashed rounded-xl">
                        <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">Molt prompte...</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </main>

      {selectedSection && (
        <ExerciseModal
          section={selectedSection}
          onClose={() => setSelectedSection(null)}
        />
      )}
    </div>
  );
};

export default Exercicis;