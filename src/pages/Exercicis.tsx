import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
<<<<<<< HEAD
import { CATALAN_GRAMMAR_SECTIONS, type GrammarSection } from "@/features/courses/data/catalanGrammarCategories";
import { ExerciseModal } from "@/features/courses/components/exercises/ExerciseModal";
=======
import { CATALAN_GRAMMAR_SECTIONS, type GrammarSection } from "@/utils/catalanGrammarCategories";
import { ExerciseModal } from "@/components/exercises/ExerciseModal";
>>>>>>> 281e5f277d1a22fe983bb2f49ab903edb50397dc
import { useRouter } from "next/router";

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
    <div className="min-h-screen bg-background">
      <Header onNavigateToAuth={() => router.push('/auth')} />

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-4">Exercicis de Català</h1>
          <p className="text-lg text-muted-foreground">
            Tria una categoria per començar a practicar
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => {
            const sections = getCategorySections(category.id);
            const totalExercises = sections.reduce((acc, section) => acc + section.exercises.length, 0);

            return (
              <Card key={category.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-xl">{category.name}</CardTitle>
                  <CardDescription>{category.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <p className="text-sm text-muted-foreground">
                      {sections.length} seccions • {totalExercises} exercicis
                    </p>

                    {sections.length > 0 ? (
                      <div className="space-y-2">
                        {sections.map((section) => (
                          <Button
                            key={section.id}
                            variant="outline"
                            size="sm"
                            className="w-full justify-start text-left h-auto py-2"
                            onClick={() => setSelectedSection(section)}
                          >
                            <div>
                              <div className="font-medium">{section.title}</div>
                              <div className="text-xs text-muted-foreground">
                                {section.exercises.length} exercicis
                              </div>
                            </div>
                          </Button>
                        ))}
                      </div>
                    ) : (
                      <p className="text-sm text-muted-foreground italic">
                        Exercicis en desenvolupament
                      </p>
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