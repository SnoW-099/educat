import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  BookOpen, 
  PenTool, 
  Volume2, 
  MoreHorizontal,
  Play,
  CheckCircle,
  XCircle,
  Clock,
  Award,
  Star,
  Target
} from 'lucide-react';
import { useEasterEgg } from '@/hooks/useEasterEgg';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { playDictationAudio, calculateExerciseScore } from '@/utils/exercises';
import { AdvancedDictationControls } from '@/components/exercises/AdvancedDictationControls';
import { useToast } from '@/hooks/use-toast';
import { LoadingSpinner } from '@/components/ui/loading-spinner';

interface Question {
  id: string;
  type: 'multiple_choice' | 'fill_blank' | 'dictation' | 'essay';
  question: string;
  options?: string[];
  correctAnswer: string | string[];
  explanation?: string;
}

interface Exercise {
  id: string;
  title: string;
  description?: string;
  type: string;
  level: 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2';
  category: string;
  class_id?: string;
  content: Question[];
  answers: string[];
  time_limit?: number;
  difficulty_score?: number;
  estimated_duration?: number;
  completed?: boolean;
  score?: number;
}

interface SupabaseExerciseSystemProps {
  classId?: string;
}

export const SupabaseExerciseSystem = ({ classId }: SupabaseExerciseSystemProps) => {
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [currentExercise, setCurrentExercise] = useState<Exercise | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<string, string>>({});
  const [timeRemaining, setTimeRemaining] = useState<number | null>(null);
  const [showResults, setShowResults] = useState(false);
  const [earnedXP, setEarnedXP] = useState<number>(0);
  const [loading, setLoading] = useState(true);
  const [userClass, setUserClass] = useState<any>(null);
  
  const { profile } = useAuth();
  const { showAnswers, generateAlternativeAnswers } = useEasterEgg(profile?.role || 'student');
  const { toast } = useToast();

  useEffect(() => {
    fetchUserClassAndExercises();
  }, [profile]);

  useEffect(() => {
    if (currentExercise?.time_limit && timeRemaining === null) {
      setTimeRemaining(currentExercise.time_limit * 60);
    }
  }, [currentExercise]);

  useEffect(() => {
    if (timeRemaining !== null && timeRemaining > 0 && currentExercise && !showResults) {
      const timer = setInterval(() => {
        setTimeRemaining(prev => {
          if (prev !== null && prev <= 1) {
            finishExercise();
            return 0;
          }
          return prev !== null ? prev - 1 : null;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [timeRemaining, currentExercise, showResults]);

  const fetchUserClassAndExercises = async () => {
    if (!profile?.user_id) return;

    try {
      setLoading(true);

      // Get user's class with error handling
      const { data: enrollment, error: enrollmentError } = await supabase
        .from('enrollments')
        .select(`
          class_id,
          classes(id, name, code, level, allow_all_levels)
        `)
        .eq('student_id', profile.user_id)
        .eq('is_active', true)
        .maybeSingle(); // Use maybeSingle to avoid errors when no enrollment

      if (enrollmentError && enrollmentError.code !== 'PGRST116') {
        console.error('Error fetching enrollment:', enrollmentError);
      }

      if (enrollment?.classes) {
        setUserClass(enrollment.classes);
      }

      // Fetch exercises - including both class-specific and general exercises
      let exercisesQuery = supabase
        .from('exercises')
        .select('*');

      // Always show all exercises (both general and class-specific)
      // Don't filter by class - let users access all available exercises
      if (enrollment?.class_id) {
        exercisesQuery = exercisesQuery
          .or(`class_id.is.null,class_id.eq.${enrollment.class_id}`);
      } else {
        // Show all exercises including general ones and any class exercises
        exercisesQuery = exercisesQuery;
      }

      const { data: exercisesData, error } = await exercisesQuery
        .order('created_at', { ascending: false });

      console.log('🔍 Raw exercises query result:', {
        count: exercisesData?.length || 0,
        error: error,
        sampleTitles: exercisesData?.slice(0, 10).map(ex => ex.title)
      });

      if (error) {
        console.error('Error fetching exercises:', error);
        // Don't throw, just show empty state
        setExercises([]);
        return;
      }

      // Parse content and answers from JSON with error handling
      const parsedExercises: Exercise[] = exercisesData?.map(ex => {
        try {
          return {
            id: ex.id,
            title: ex.title,
            description: ex.description,
            type: ex.type,
            level: ex.level as Exercise['level'],
            category: ex.category || ex.type,
            class_id: ex.class_id,
            content: typeof ex.content === 'string' ? JSON.parse(ex.content) : ex.content,
            answers: typeof ex.answers === 'string' ? JSON.parse(ex.answers) : ex.answers,
            time_limit: ex.time_limit,
            difficulty_score: ex.difficulty_score,
            estimated_duration: ex.estimated_duration,
            completed: false,
            score: undefined
          };
        } catch (parseError) {
          console.error('Error parsing exercise:', ex.id, parseError);
          return null;
        }
      }).filter(Boolean) || [];

      setExercises(parsedExercises);
      
      console.log('📊 Parsed exercises breakdown:', {
        total: parsedExercises.length,
        daily: parsedExercises.filter(ex => ex.title.toLowerCase().includes('diari')).length,
        byLevel: parsedExercises.reduce((acc: any, ex) => {
          acc[ex.level] = (acc[ex.level] || 0) + 1;
          return acc;
        }, {}),
        byCategory: parsedExercises.reduce((acc: any, ex) => {
          acc[ex.category] = (acc[ex.category] || 0) + 1;
          return acc;
        }, {}),
        byType: parsedExercises.reduce((acc: any, ex) => {
          acc[ex.type] = (acc[ex.type] || 0) + 1;
          return acc;
        }, {})
      });
      
      // If no exercises found, show generation option
      if (parsedExercises.length === 0) {
        console.log('No exercises found. You might want to generate some.');
      }
      
    } catch (error) {
      console.error('Error fetching exercises:', error);
      toast({
        title: "Error",
        description: "No s'han pogut carregar els exercicis",
        variant: "destructive"
      });
      setExercises([]); // Set empty array instead of leaving undefined
    } finally {
      setLoading(false);
    }
  };

  const getExerciseIcon = (type: string) => {
    switch (type) {
      case 'grammar':
      case 'ortografia':
        return <PenTool className="h-5 w-5" />;
      case 'vocabulary':
      case 'gramàtica':
        return <BookOpen className="h-5 w-5" />;
      case 'listening':
      case 'dictats':
        return <Volume2 className="h-5 w-5" />;
      default:
        return <MoreHorizontal className="h-5 w-5" />;
    }
  };

  const getExercisesByCategory = (category: string) => {
    return exercises.filter(ex => ex.category === category || ex.type === category);
  };

  const getLevelColor = (level: string) => {
    const colors = {
      'A1': 'bg-green-100 text-green-800',
      'A2': 'bg-blue-100 text-blue-800',
      'B1': 'bg-yellow-100 text-yellow-800',
      'B2': 'bg-orange-100 text-orange-800',
      'C1': 'bg-red-100 text-red-800',
      'C2': 'bg-purple-100 text-purple-800'
    };
    return colors[level as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const getLevelMultiplier = (level: string) => {
    const multipliers = {
      'A1': 1.5,
      'A2': 1.7,
      'B1': 2.0,
      'B2': 2.2,
      'C1': 2.4,
      'C2': 2.5
    };
    return multipliers[level as keyof typeof multipliers] || 1.5;
  };

  const startExercise = (exercise: Exercise) => {
    setCurrentExercise(exercise);
    setCurrentQuestionIndex(0);
    setUserAnswers({});
    setShowResults(false);
    setEarnedXP(0);
    setTimeRemaining(exercise.time_limit ? exercise.time_limit * 60 : null);
  };

  const answerQuestion = (questionId: string, answer: string) => {
    setUserAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }));
  };

  const nextQuestion = () => {
    if (currentExercise && currentQuestionIndex < currentExercise.content.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      finishExercise();
    }
  };

  const finishExercise = async () => {
    if (!currentExercise || !profile?.user_id) return;

    try {
      // Calculate score using utils function
      const userAnswersList = currentExercise.content.map(q => userAnswers[q.id] || '');
      const correctAnswersList = currentExercise.answers;
      const score = calculateExerciseScore(userAnswersList, correctAnswersList, currentExercise.type);
      
      // Calculate XP with level multiplier
      const multiplier = getLevelMultiplier(currentExercise.level);
      const xpEarned = Math.round(score * multiplier);
      setEarnedXP(xpEarned);

      // Save exercise attempt to Supabase
      const { error: attemptError } = await supabase
        .from('exercise_attempts')
        .insert({
          exercise_id: currentExercise.id,
          student_id: profile.user_id,
          answers: userAnswers,
          score: score,
          time_taken: currentExercise.time_limit ? 
            (currentExercise.time_limit * 60 - (timeRemaining || 0)) : null,
          attempt_number: 1,
          cheating_detected: false
        });

      if (attemptError) {
        console.error('Error saving exercise attempt:', attemptError);
        
        // Check if already completed
        if (attemptError.code === '23505') { // Unique constraint violation
          toast({
            title: "Exercici ja completat!",
            description: "Ja has fet aquest exercici anteriorment",
            variant: "destructive"
          });
        }
        } else {
          // Only show completion toast, not XP gained
          toast({
            title: "Exercici completat!",
            description: "Molt bé! Continua practicant",
          });
        }

      // Update local exercise state
      setExercises(prev =>
        prev.map(ex =>
          ex.id === currentExercise.id
            ? { ...ex, completed: true, score }
            : ex
        )
      );

      setShowResults(true);
    } catch (error) {
      console.error('Error finishing exercise:', error);
      toast({
        title: "Error",
        description: "No s'ha pogut guardar el resultat",
        variant: "destructive"
      });
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-center py-8">
          <div className="text-center">
            <LoadingSpinner size="lg" className="mb-4" />
            <p className="text-muted-foreground">Carregant exercicis...</p>
          </div>
        </div>
      </div>
    );
  }

  if (currentExercise && !showResults) {
    const currentQuestion = currentExercise.content[currentQuestionIndex];
    const progress = ((currentQuestionIndex + 1) / currentExercise.content.length) * 100;

    return (
      <div className="max-w-4xl mx-auto space-y-6">
        <Card className="shadow-card">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                {getExerciseIcon(currentExercise.type)}
                <div>
                  <CardTitle className="text-xl">{currentExercise.title}</CardTitle>
                  <div className="flex items-center space-x-2 mt-1">
                    <Badge variant="outline">
                      <Star className="h-3 w-3 mr-1" />
                      {getLevelMultiplier(currentExercise.level)}x EXP
                    </Badge>
                  </div>
                </div>
              </div>
              {timeRemaining !== null && (
                <div className="flex items-center space-x-2 text-sm">
                  <Clock className="h-4 w-4" />
                  <span className={timeRemaining < 60 ? 'text-destructive font-bold' : ''}>
                    {formatTime(timeRemaining)}
                  </span>
                </div>
              )}
            </div>
            <Progress value={progress} className="mt-4" />
            <p className="text-sm text-muted-foreground">
              Pregunta {currentQuestionIndex + 1} de {currentExercise.content.length}
            </p>
          </CardHeader>

          <CardContent className="space-y-6">
            <div className="text-lg font-medium">
              {currentQuestion.question}
            </div>

            {currentQuestion.type === 'multiple_choice' && currentQuestion.options && (
              <div className="space-y-3">
                {currentQuestion.options.map((option, index) => (
                  <Button
                    key={index}
                    variant={userAnswers[currentQuestion.id] === option ? 'default' : 'outline'}
                    className="w-full justify-start text-left h-auto py-3"
                    onClick={() => answerQuestion(currentQuestion.id, option)}
                  >
                    <span className="font-medium mr-3">{String.fromCharCode(65 + index)}.</span>
                    {option}
                    {showAnswers && option === currentQuestion.correctAnswer && (
                      <CheckCircle className="h-4 w-4 ml-auto text-success" />
                    )}
                  </Button>
                ))}
              </div>
            )}

            {currentQuestion.type === 'fill_blank' && (
              <div className="space-y-3">
                <input
                  type="text"
                  autoComplete="off"
                  autoCorrect="off"
                  spellCheck="false"
                  className="w-full p-4 border-2 rounded-xl focus:ring-2 focus:ring-accent focus:border-accent transition-all duration-200 bg-background"
                  placeholder="Escriu la teva resposta aquí..."
                  value={userAnswers[currentQuestion.id] || ''}
                  onChange={(e) => answerQuestion(currentQuestion.id, e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter' && userAnswers[currentQuestion.id]) {
                      nextQuestion();
                    }
                  }}
                />
                {showAnswers && (
                  <div className="text-sm text-success bg-success/10 p-3 rounded-xl border border-success/20">
                    <div className="font-medium mb-2">Respostes vàlides:</div>
                    {generateAlternativeAnswers(currentQuestion.correctAnswer as string).map((answer, idx) => (
                      <div key={idx} className="mb-1">• {answer}</div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {currentQuestion.type === 'dictation' && (
              <div className="space-y-4">
                <AdvancedDictationControls
                  text={currentQuestion.correctAnswer as string}
                  className="mb-4"
                />
                <textarea
                  autoComplete="off"
                  autoCorrect="off"
                  spellCheck="false"
                  className="w-full p-4 border-2 rounded-xl focus:ring-2 focus:ring-accent focus:border-accent transition-all duration-200 bg-background resize-none"
                  rows={4}
                  placeholder="Escriu el que has escoltat aquí..."
                  value={userAnswers[currentQuestion.id] || ''}
                  onChange={(e) => answerQuestion(currentQuestion.id, e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey && userAnswers[currentQuestion.id]) {
                      e.preventDefault();
                      nextQuestion();
                    }
                  }}
                />
                {showAnswers && (
                  <div className="text-sm text-success bg-success/10 p-3 rounded-xl border border-success/20">
                    <div className="font-medium mb-2">Respostes vàlides:</div>
                    {generateAlternativeAnswers(currentQuestion.correctAnswer as string).map((answer, idx) => (
                      <div key={idx} className="mb-1">• {answer}</div>
                    ))}
                  </div>
                )}
              </div>
            )}

            <div className="flex justify-between pt-4">
              <Button
                variant="outline"
                onClick={() => setCurrentExercise(null)}
              >
                Abandonar
              </Button>
              <Button
                onClick={nextQuestion}
                disabled={!userAnswers[currentQuestion.id]}
              >
                {currentQuestionIndex < currentExercise.content.length - 1 ? 'Següent' : 'Finalitzar'}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (showResults && currentExercise) {
    const score = currentExercise.score || 0;
    const multiplier = getLevelMultiplier(currentExercise.level);
    const correctAnswers = currentExercise.content.filter(q => {
      const userAnswer = userAnswers[q.id];
      return Array.isArray(q.correctAnswer)
        ? q.correctAnswer.includes(userAnswer)
        : userAnswer?.toLowerCase().trim() === q.correctAnswer.toLowerCase().trim();
    }).length;

    return (
      <div className="max-w-4xl mx-auto">
        <Card className="shadow-card">
          <CardHeader>
            <div className="text-center space-y-4">
              <Award className="h-16 w-16 mx-auto text-accent" />
              <CardTitle className="text-2xl">Exercici completat!</CardTitle>
              <div className="text-4xl font-bold text-accent">{score}%</div>
              <div className="flex items-center justify-center space-x-4">
                <Badge variant="outline" className="bg-accent/10">
                  <Star className="h-3 w-3 mr-1" />
                  +{earnedXP} EXP ({multiplier}x)
                </Badge>
              </div>
              <p className="text-muted-foreground">
                {correctAnswers} de {currentExercise.content.length} respostes correctes
              </p>
            </div>
          </CardHeader>

          <CardContent className="space-y-6">
            <div className="space-y-4">
              {currentExercise.content.map((question, index) => {
                const userAnswer = userAnswers[question.id];
                const isCorrect = Array.isArray(question.correctAnswer)
                  ? question.correctAnswer.includes(userAnswer)
                  : userAnswer?.toLowerCase().trim() === question.correctAnswer.toLowerCase().trim();

                return (
                  <div key={question.id} className="border rounded-lg p-4">
                    <div className="flex items-start space-x-3">
                      {isCorrect ? (
                        <CheckCircle className="h-5 w-5 text-success mt-1" />
                      ) : (
                        <XCircle className="h-5 w-5 text-destructive mt-1" />
                      )}
                      <div className="flex-1">
                        <p className="font-medium mb-2">
                          {index + 1}. {question.question}
                        </p>
                        <p className="text-sm">
                          <span className="font-medium">La teva resposta:</span> {userAnswer || 'No contestada'}
                        </p>
                        {!isCorrect && (
                          <p className="text-sm text-success">
                            <span className="font-medium">Resposta correcta:</span> {
                              Array.isArray(question.correctAnswer) 
                                ? question.correctAnswer.join(' o ') 
                                : question.correctAnswer
                            }
                          </p>
                        )}
                        {question.explanation && (
                          <p className="text-sm text-muted-foreground mt-2">
                            {question.explanation}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="flex justify-center space-x-4">
              <Button variant="outline" onClick={() => setCurrentExercise(null)}>
                Tornar als exercicis
              </Button>
              <Button onClick={() => startExercise(currentExercise)}>
                Repetir exercici
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Show exercises with proper categorization
  const classExercises = exercises.filter(ex => {
    if (!userClass) return false;
    return ex.level === userClass.level || 
           (ex.class_id && ex.class_id === classId) ||
           (ex.title && ex.title.toLowerCase().includes('diari'));
  });
  
  const otherExercises = exercises.filter(ex => {
    if (!userClass) return true;
    return ex.level !== userClass.level && 
           (!ex.class_id || ex.class_id !== classId) &&
           !(ex.title && ex.title.toLowerCase().includes('diari'));
  });

  console.log('🏷️ Exercises overview:', {
    totalExercises: exercises.length,
    classExercises: classExercises.length,
    otherExercises: otherExercises.length,
    classLevel: userClass?.level,
    classId: classId
  });

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h2 className="text-3xl font-bold mb-2">Exercicis de Català</h2>
        <p className="text-muted-foreground">
          Total: {exercises.length} exercicis disponibles
          {showAnswers && (
            <span className="text-primary font-medium ml-2">
              Mode resposta actiu
            </span>
          )}
        </p>
      </div>

      {exercises.length === 0 ? (
        <div className="text-center py-12">
          <BookOpen className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-xl font-semibold mb-2">No hi ha exercicis disponibles</h3>
          <p className="text-muted-foreground">
            Encara no s'han creat exercicis.
          </p>
        </div>
      ) : (
        <div className="space-y-8">
          <Tabs defaultValue="class" className="space-y-6">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="class" className="flex items-center space-x-2">
                <Target className="h-4 w-4" />
                <span>Exercicis del teu nivell ({classExercises.length})</span>
              </TabsTrigger>
              <TabsTrigger value="other" className="flex items-center space-x-2">
                <BookOpen className="h-4 w-4" />
                <span>Altres exercicis ({otherExercises.length})</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="class" className="space-y-4">
              {classExercises.length === 0 ? (
                <div className="text-center py-8">
                  <Target className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No hi ha exercicis del teu nivell</h3>
                  <p className="text-muted-foreground">
                    {userClass ? `Exercicis per al nivell ${userClass.level} no disponibles` : 'Necessites estar inscrit a una classe'}
                  </p>
                </div>
              ) : (
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {classExercises.map(exercise => (
                    <Card key={exercise.id} className="hover:shadow-card hover-lift transition-all">
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            {getExerciseIcon(exercise.type)}
                            <div className="flex-1">
                              <CardTitle className="text-lg line-clamp-2">{exercise.title}</CardTitle>
                              <div className="flex items-center space-x-2 mt-1">
                                {exercise.title && exercise.title.toLowerCase().includes('diari') && (
                                  <Badge variant="secondary" className="text-xs bg-accent/10 text-accent">
                                    Diari
                                  </Badge>
                                )}
                              </div>
                            </div>
                          </div>
                          {exercise.completed && (
                            <Badge variant="default" className="bg-success text-success-foreground">
                              <CheckCircle className="h-3 w-3 mr-1" />
                              {exercise.score}%
                            </Badge>
                          )}
                        </div>
                      </CardHeader>

                      <CardContent>
                        <div className="space-y-3">
                          <p className="text-sm text-muted-foreground">
                            {exercise.content.length} preguntes
                            {exercise.estimated_duration && ` • ${exercise.estimated_duration} min`}
                          </p>
                          
                          <Button 
                            onClick={() => startExercise(exercise)}
                            className="w-full"
                            variant={exercise.completed ? 'outline' : 'default'}
                          >
                            <Play className="h-4 w-4 mr-2" />
                            {exercise.completed ? 'Repetir' : 'Començar'}
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>

            <TabsContent value="other" className="space-y-4">
              {otherExercises.length === 0 ? (
                <div className="text-center py-8">
                  <BookOpen className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No hi ha altres exercicis</h3>
                  <p className="text-muted-foreground">
                    No hi ha exercicis d'altres nivells disponibles
                  </p>
                </div>
              ) : (
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {otherExercises.map(exercise => (
                    <Card key={exercise.id} className="hover:shadow-card hover-lift transition-all">
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            {getExerciseIcon(exercise.type)}
                            <div className="flex-1">
                              <CardTitle className="text-lg line-clamp-2">{exercise.title}</CardTitle>
                              <div className="flex items-center space-x-2 mt-1">
                                <Badge variant="outline" className="text-xs">
                                  {getLevelMultiplier(exercise.level)}x XP
                                </Badge>
                              </div>
                            </div>
                          </div>
                          {exercise.completed && (
                            <Badge variant="default" className="bg-success text-success-foreground">
                              <CheckCircle className="h-3 w-3 mr-1" />
                              {exercise.score}%
                            </Badge>
                          )}
                        </div>
                      </CardHeader>

                      <CardContent>
                        <div className="space-y-3">
                          <p className="text-sm text-muted-foreground">
                            {exercise.content.length} preguntes
                            {exercise.estimated_duration && ` • ${exercise.estimated_duration} min`}
                          </p>
                          
                          <Button 
                            onClick={() => startExercise(exercise)}
                            className="w-full"
                            variant={exercise.completed ? 'outline' : 'default'}
                          >
                            <Play className="h-4 w-4 mr-2" />
                            {exercise.completed ? 'Repetir' : 'Començar'}
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      )}
    </div>
  );
};