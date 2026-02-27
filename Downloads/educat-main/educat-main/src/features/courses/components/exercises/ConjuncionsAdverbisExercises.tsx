import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { ChevronRight, ChevronLeft, BookOpen, CheckCircle, XCircle, RefreshCw } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { allConjuncionsAdverbisExercises } from '@/utils/conjuncionsAdverbis';
import { supabase } from '@/integrations/supabase/client';
import { insertExercisesInBatches, getDifficultyScore } from '@/utils/exerciseGeneration';

interface ExerciseState {
  answer: string;
  submitted: boolean;
  correct: boolean;
}

export const ConjuncionsAdverbisExercises = () => {
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState<string>('conjuncions');
  const [exerciseStates, setExerciseStates] = useState<Record<string, ExerciseState>>({});
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  // Filter exercises by category
  const categoryExercises = allConjuncionsAdverbisExercises.filter(
    exercise => exercise.category === selectedCategory
  );

  const currentExercise = categoryExercises[currentExerciseIndex];
  const currentState = exerciseStates[currentExercise?.id] || { answer: '', submitted: false, correct: false };

  const handleAnswerChange = (value: string) => {
    setExerciseStates(prev => ({
      ...prev,
      [currentExercise.id]: {
        ...currentState,
        answer: value
      }
    }));
  };

  const handleSubmit = () => {
    if (!currentExercise || !currentState.answer) return;

    const correctAnswer = Array.isArray(currentExercise.correctAnswer) 
      ? currentExercise.correctAnswer[0] 
      : currentExercise.correctAnswer;
    const isCorrect = currentState.answer.toLowerCase() === correctAnswer.toLowerCase();
    
    setExerciseStates(prev => ({
      ...prev,
      [currentExercise.id]: {
        ...currentState,
        submitted: true,
        correct: isCorrect
      }
    }));

    toast({
      title: isCorrect ? "Correcte!" : "Incorrecte",
      description: isCorrect 
        ? currentExercise.explanation 
        : `Resposta correcta: ${currentExercise.correctAnswer}. ${currentExercise.explanation}`,
      duration: 3000,
    });
  };

  const handleReset = () => {
    setExerciseStates(prev => ({
      ...prev,
      [currentExercise.id]: {
        answer: '',
        submitted: false,
        correct: false
      }
    }));
  };

  const handleNext = () => {
    if (currentExerciseIndex < categoryExercises.length - 1) {
      setCurrentExerciseIndex(currentExerciseIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentExerciseIndex > 0) {
      setCurrentExerciseIndex(currentExerciseIndex - 1);
    }
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setCurrentExerciseIndex(0);
  };

  const handleLoadToDatabase = async () => {
    setLoading(true);
    try {
      // Get system professor
      const { data: professors } = await supabase
        .from('profiles')
        .select('user_id')
        .eq('role', 'professor')
        .limit(1);
        
      const professorId = professors?.[0]?.user_id;
      if (!professorId) {
        throw new Error('No professor found');
      }

      // Convert exercises to database format
      const dbExercises = allConjuncionsAdverbisExercises.map((exercise, index) => ({
        title: `${exercise.category === 'conjuncions' ? 'Conjuncions' : 'Adverbis'} - ${exercise.level} - ${index + 1}`,
        description: exercise.question,
        type: 'practice',
        level: exercise.level,
        category: exercise.category,
        content: [{
          id: exercise.id,
          type: exercise.type,
          question: exercise.question,
          options: exercise.options,
          correctAnswer: exercise.correctAnswer,
          explanation: exercise.explanation
        }],
        answers: Array.isArray(exercise.correctAnswer) 
          ? exercise.correctAnswer 
          : [exercise.correctAnswer],
        professor_id: professorId,
        difficulty_score: getDifficultyScore(exercise.level),
        estimated_duration: 5,
        tags: [exercise.level, exercise.category, 'morfosintaxi', exercise.subcategory || ''],
        is_exam: false,
        max_attempts: 3,
        time_limit: null
      }));

      // Insert in batches
      const results = await insertExercisesInBatches(dbExercises, 20);
      
      toast({
        title: "Exercicis carregats!",
        description: `S'han afegit ${results.length} exercicis de conjuncions i adverbis a la base de dades`,
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

  const getProgress = () => {
    const completed = Object.values(exerciseStates).filter(state => state.submitted).length;
    const correct = Object.values(exerciseStates).filter(state => state.correct).length;
    return { completed, correct, total: categoryExercises.length };
  };

  const progress = getProgress();

  if (!currentExercise) {
    return (
      <Card>
        <CardContent className="p-6">
          <p className="text-muted-foreground">No hi ha exercicis disponibles per aquesta categoria.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="container mx-auto p-6 max-w-5xl">
      <Card className="mb-6">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl flex items-center gap-2">
                <BookOpen className="h-6 w-6" />
                Conjuncions i Adverbis
              </CardTitle>
              <CardDescription>
                Practica l'ús de conjuncions (doncs/perquè, per què/perquè, si no/sinó) i la formació d'adverbis
              </CardDescription>
            </div>
            <Button 
              onClick={handleLoadToDatabase} 
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
          {/* Progress indicators */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="text-center">
              <p className="text-sm text-muted-foreground">Completats</p>
              <p className="text-2xl font-bold">{progress.completed}/{progress.total}</p>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                <div 
                  className="bg-primary h-2 rounded-full transition-all"
                  style={{ width: `${(progress.completed / progress.total) * 100}%` }}
                />
              </div>
            </div>
            <div className="text-center">
              <p className="text-sm text-muted-foreground">Correctes</p>
              <p className="text-2xl font-bold">{progress.correct}/{progress.completed || 1}</p>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                <div 
                  className="bg-green-500 h-2 rounded-full transition-all"
                  style={{ width: `${progress.completed ? (progress.correct / progress.completed) * 100 : 0}%` }}
                />
              </div>
            </div>
            <div className="text-center">
              <p className="text-sm text-muted-foreground">Nivell</p>
              <p className="text-2xl font-bold">{currentExercise.level}</p>
              <Badge className="mt-2" variant="outline">{currentExercise.subcategory}</Badge>
            </div>
          </div>

          <Tabs value={selectedCategory} onValueChange={handleCategoryChange}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="conjuncions">Conjuncions</TabsTrigger>
              <TabsTrigger value="adverbis">Adverbis</TabsTrigger>
            </TabsList>

            <TabsContent value={selectedCategory} className="mt-6">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">
                      Exercici {currentExerciseIndex + 1} de {categoryExercises.length}
                    </CardTitle>
                    <div className="flex items-center gap-2">
                      <Button
                        onClick={handlePrevious}
                        disabled={currentExerciseIndex === 0}
                        variant="outline"
                        size="sm"
                      >
                        <ChevronLeft className="h-4 w-4" />
                      </Button>
                      <Button
                        onClick={handleNext}
                        disabled={currentExerciseIndex >= categoryExercises.length - 1}
                        size="sm"
                      >
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-lg font-medium">{currentExercise.question}</div>

                  {/* Multiple Choice */}
                  {currentExercise.type === 'multiple_choice' && currentExercise.options && (
                    <RadioGroup 
                      value={currentState.answer} 
                      onValueChange={handleAnswerChange}
                      disabled={currentState.submitted}
                    >
                      {currentExercise.options.map((option, index) => (
                        <div 
                          key={index} 
                          className={`flex items-center space-x-2 p-3 rounded-md transition-colors ${
                            currentState.submitted ? (
                              option === currentExercise.correctAnswer ? 'bg-green-100 border border-green-300' :
                              option === currentState.answer && !currentState.correct ? 'bg-red-100 border border-red-300' :
                              'bg-gray-50'
                            ) : 'hover:bg-gray-50'
                          }`}
                        >
                          <RadioGroupItem value={option} id={`option-${index}`} />
                          <Label htmlFor={`option-${index}`} className="flex-1 cursor-pointer">
                            {option}
                          </Label>
                          {currentState.submitted && option === currentExercise.correctAnswer && (
                            <CheckCircle className="h-5 w-5 text-green-600" />
                          )}
                          {currentState.submitted && option === currentState.answer && !currentState.correct && (
                            <XCircle className="h-5 w-5 text-red-600" />
                          )}
                        </div>
                      ))}
                    </RadioGroup>
                  )}

                  {/* Fill Blank or Formation */}
                  {(currentExercise.type === 'fill_blank' || currentExercise.type === 'formation') && (
                    <div className="space-y-2">
                      <Input
                        value={currentState.answer}
                        onChange={(e) => handleAnswerChange(e.target.value)}
                        placeholder="Escriu la teva resposta..."
                        disabled={currentState.submitted}
                        className={currentState.submitted ? (currentState.correct ? 'border-green-500' : 'border-red-500') : ''}
                      />
                      {currentState.submitted && !currentState.correct && (
                        <p className="text-sm text-red-600">
                          Resposta correcta: <span className="font-medium">{currentExercise.correctAnswer}</span>
                        </p>
                      )}
                    </div>
                  )}

                  {/* Explanation */}
                  {currentState.submitted && (
                    <div className={`p-4 rounded-md ${currentState.correct ? 'bg-green-50 border border-green-200' : 'bg-yellow-50 border border-yellow-200'}`}>
                      <p className="text-sm font-medium mb-1">Explicació:</p>
                      <p className="text-sm">{currentExercise.explanation}</p>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="flex items-center gap-2 pt-4">
                    {!currentState.submitted ? (
                      <Button 
                        onClick={handleSubmit} 
                        disabled={!currentState.answer}
                        className="bg-primary hover:bg-primary/90"
                      >
                        Comprovar Resposta
                      </Button>
                    ) : (
                      <Button 
                        onClick={handleReset} 
                        variant="outline"
                      >
                        Tornar a Intentar
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Category info */}
              <Card className="mt-6 bg-muted/50">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm">Informació de la categoria</CardTitle>
                </CardHeader>
                <CardContent className="text-sm space-y-2">
                  {selectedCategory === 'conjuncions' ? (
                    <>
                      <p><strong>Doncs vs Perquè:</strong> Doncs introdueix conseqüència (= per tant), perquè introdueix causa (= ja que)</p>
                      <p><strong>Per què vs Perquè:</strong> Per què és interrogatiu, perquè és conjunció o nom</p>
                      <p><strong>Si no vs Sinó:</strong> Si no és condicional + negació, sinó és adversativa</p>
                    </>
                  ) : (
                    <>
                      <p><strong>Formació -ment:</strong> S'afegeix a la forma femenina de l'adjectiu</p>
                      <p><strong>Bé/Ben:</strong> Ben davant d'adjectiu/adverbi, bé darrere del verb</p>
                      <p><strong>Mal/Malament:</strong> Mal davant de participi/adjectiu, malament darrere del verb</p>
                    </>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};