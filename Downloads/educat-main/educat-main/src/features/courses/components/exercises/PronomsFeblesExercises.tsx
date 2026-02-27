import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ChevronRight, RefreshCw, Book, CheckCircle, XCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { OrthographyExercise } from '@/features/courses/components/orthography/OrthographyExercise';
import { allPronomsFeblesExercises } from '@/utils/pronomsFebles';
import { insertPronomsFeblesExercises } from '@/utils/exerciseGeneration';

export const PronomsFeblesExercises = () => {
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [completedExercises, setCompletedExercises] = useState<Set<string>>(new Set());
  const [correctAnswers, setCorrectAnswers] = useState<Set<string>>(new Set());
  const [selectedLevel, setSelectedLevel] = useState<'B1' | 'B2' | 'C1'>('B1');
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  // Filter exercises by level
  const levelExercises = allPronomsFeblesExercises.filter(
    exercise => exercise.level === selectedLevel
  );

  const currentExercise = levelExercises[currentExerciseIndex];

  // Convert exercise to OrthographyExercise format
  const convertedExercise = currentExercise ? {
    ...currentExercise,
    difficulty: selectedLevel === 'B1' ? 3 : selectedLevel === 'B2' ? 4 : 5 as 3 | 4 | 5
  } : null;

  const handleExerciseComplete = (exerciseId: string, isCorrect: boolean) => {
    setCompletedExercises(prev => new Set(prev).add(exerciseId));
    if (isCorrect) {
      setCorrectAnswers(prev => new Set(prev).add(exerciseId));
      saveProgress(exerciseId, isCorrect);
    }
  };

  const saveProgress = async (exerciseId: string, isCorrect: boolean) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      // Store progress locally for now (you can create a proper table later)
      const progressKey = `pronoms_progress_${user.id}_${exerciseId}`;
      localStorage.setItem(progressKey, JSON.stringify({
        completed: true,
        correct: isCorrect,
        timestamp: new Date().toISOString()
      }));

    } catch (error) {
      console.error('Error saving progress:', error);
    }
  };

  const handleNextExercise = () => {
    if (currentExerciseIndex < levelExercises.length - 1) {
      setCurrentExerciseIndex(currentExerciseIndex + 1);
    } else {
      toast({
        title: "Nivell completat!",
        description: `Has completat tots els exercicis del nivell ${selectedLevel}`,
        duration: 3000,
      });
    }
  };

  const handlePreviousExercise = () => {
    if (currentExerciseIndex > 0) {
      setCurrentExerciseIndex(currentExerciseIndex - 1);
    }
  };

  const handleLevelChange = (level: 'B1' | 'B2' | 'C1') => {
    setSelectedLevel(level);
    setCurrentExerciseIndex(0);
    setCompletedExercises(new Set());
    setCorrectAnswers(new Set());
  };

  const handleLoadExercises = async () => {
    setLoading(true);
    try {
      await insertPronomsFeblesExercises();
      toast({
        title: "Exercicis carregats!",
        description: "Els exercicis de pronoms febles s'han afegit a la base de dades",
        duration: 3000,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "No s'han pogut carregar els exercicis",
        variant: "destructive",
        duration: 3000,
      });
    } finally {
      setLoading(false);
    }
  };

  const getProgressPercentage = () => {
    return Math.round((completedExercises.size / levelExercises.length) * 100);
  };

  const getScorePercentage = () => {
    if (completedExercises.size === 0) return 0;
    return Math.round((correctAnswers.size / completedExercises.size) * 100);
  };

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <Card className="mb-6">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl flex items-center gap-2">
                <Book className="h-6 w-6" />
                Els Pronoms Febles
              </CardTitle>
              <CardDescription>
                Practica la combinació i ús dels pronoms febles en català
              </CardDescription>
            </div>
            <Button 
              onClick={handleLoadExercises} 
              disabled={loading}
              variant="outline"
              className="flex items-center gap-2"
            >
              <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
              Carregar a BD
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="text-center">
              <p className="text-sm text-muted-foreground">Progrés</p>
              <p className="text-2xl font-bold">{getProgressPercentage()}%</p>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                <div 
                  className="bg-primary h-2 rounded-full transition-all"
                  style={{ width: `${getProgressPercentage()}%` }}
                />
              </div>
            </div>
            <div className="text-center">
              <p className="text-sm text-muted-foreground">Encerts</p>
              <p className="text-2xl font-bold">{getScorePercentage()}%</p>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                <div 
                  className="bg-green-500 h-2 rounded-full transition-all"
                  style={{ width: `${getScorePercentage()}%` }}
                />
              </div>
            </div>
            <div className="text-center">
              <p className="text-sm text-muted-foreground">Completats</p>
              <p className="text-2xl font-bold">
                {completedExercises.size}/{levelExercises.length}
              </p>
            </div>
          </div>

          <Tabs value={selectedLevel} onValueChange={(value) => handleLevelChange(value as 'B1' | 'B2' | 'C1')}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="B1">Nivell B1</TabsTrigger>
              <TabsTrigger value="B2">Nivell B2</TabsTrigger>
              <TabsTrigger value="C1">Nivell C1</TabsTrigger>
            </TabsList>

            <TabsContent value={selectedLevel} className="mt-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between mb-4">
                  <Badge variant="outline" className="text-sm">
                    Exercici {currentExerciseIndex + 1} de {levelExercises.length}
                  </Badge>
                  <div className="flex items-center gap-2">
                    <Button
                      onClick={handlePreviousExercise}
                      disabled={currentExerciseIndex === 0}
                      variant="outline"
                      size="sm"
                    >
                      Anterior
                    </Button>
                    <Button
                      onClick={handleNextExercise}
                      disabled={currentExerciseIndex >= levelExercises.length - 1}
                      size="sm"
                      className="flex items-center gap-1"
                    >
                      Següent
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {convertedExercise && (
                  <OrthographyExercise
                    exercise={convertedExercise}
                    onComplete={handleExerciseComplete}
                    showFeedback={true}
                  />
                )}

                {/* Exercise type legend */}
                <Card className="mt-6 bg-muted/50">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm">Tipus d'exercicis</CardTitle>
                  </CardHeader>
                  <CardContent className="grid grid-cols-2 gap-2 text-sm">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="w-fit">Opció múltiple</Badge>
                      <span className="text-muted-foreground">Tria la resposta correcta</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="w-fit">Omplir buits</Badge>
                      <span className="text-muted-foreground">Completa amb la forma correcta</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="w-fit">Transformació</Badge>
                      <span className="text-muted-foreground">Transforma l'oració</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="w-fit">Substitució</Badge>
                      <span className="text-muted-foreground">Substitueix per pronoms</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};