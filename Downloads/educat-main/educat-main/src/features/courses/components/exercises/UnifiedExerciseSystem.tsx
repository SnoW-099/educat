import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
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
  Zap
} from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useEasterEgg } from '@/hooks/useEasterEgg';
import { supabase } from '@/integrations/supabase/client';
import { calculateExerciseScore, playDictationAudio } from '@/utils/exercises';
import { useToast } from '@/hooks/use-toast';

interface Exercise {
  id: string;
  type: 'grammar' | 'vocabulary' | 'listening' | 'reading' | 'writing';
  category: string;
  title: string;
  level: 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2';
  questions: Question[];
  timeLimit?: number;
  completed: boolean;
  score?: number;
}

interface Question {
  id: string;
  type: 'multiple_choice' | 'fill_blank' | 'dictation' | 'essay';
  question: string;
  options?: string[];
  correctAnswer: string | string[];
  explanation?: string;
}

interface UnifiedExerciseSystemProps {
  classId?: string;
}

export const UnifiedExerciseSystem = ({ classId }: UnifiedExerciseSystemProps) => {
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [currentExercise, setCurrentExercise] = useState<Exercise | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<string, string>>({});
  const [timeRemaining, setTimeRemaining] = useState<number | null>(null);
  const [showResults, setShowResults] = useState(false);
  const [loading, setLoading] = useState(true);
  const { profile } = useAuth();
  const { toast } = useToast();
  const { showAnswers } = useEasterEgg(profile?.role || 'student');

  useEffect(() => {
    fetchExercises();
  }, [classId]);

  useEffect(() => {
    if (currentExercise?.timeLimit && timeRemaining === null) {
      setTimeRemaining(currentExercise.timeLimit * 60);
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

  const fetchExercises = async () => {
    try {
      setLoading(true);

      // Get user's enrolled class info
      const { data: enrollment } = await supabase
        .from('enrollments')
        .select('class_id, classes(level, allow_all_levels)')
        .eq('student_id', profile?.user_id)
        .eq('is_active', true)
        .single();

      const userClassLevel = enrollment?.classes?.level;
      const allowAllLevels = enrollment?.classes?.allow_all_levels;

      let query = supabase
        .from('exercises')
        .select('*')
        .or(`class_id.is.null,class_id.eq.${classId || enrollment?.class_id}`);

      // Filter by level if class doesn't allow all levels
      if (!allowAllLevels && userClassLevel) {
        query = query.eq('level', userClassLevel);
      }

      const { data: exercisesData, error } = await query.order('created_at', { ascending: true });

      if (error) throw error;

      // Transform to match Exercise interface
      const transformedExercises: Exercise[] = (exercisesData || []).map(ex => ({
        id: ex.id,
        type: ex.type as Exercise['type'],
        category: ex.category || 'general',
        title: ex.title,
        level: ex.level as Exercise['level'],
        questions: (ex.content as any) as Question[],
        timeLimit: ex.time_limit || undefined,
        completed: false,
        score: undefined
      }));

      setExercises(transformedExercises);
    } catch (error) {
      console.error('Error fetching exercises:', error);
      toast({
        title: "Error",
        description: "No s'han pogut carregar els exercicis",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const getExerciseIcon = (type: Exercise['type']) => {
    switch (type) {
      case 'grammar':
        return <BookOpen className="h-5 w-5" />;
      case 'vocabulary':
        return <PenTool className="h-5 w-5" />;
      case 'listening':
        return <Volume2 className="h-5 w-5" />;
      case 'reading':
        return <BookOpen className="h-5 w-5" />;
      case 'writing':
        return <PenTool className="h-5 w-5" />;
      default:
        return <MoreHorizontal className="h-5 w-5" />;
    }
  };

  const getExercisesByType = (type: Exercise['type']) => {
    return exercises.filter(ex => ex.type === type);
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

  const startExercise = (exercise: Exercise) => {
    setCurrentExercise(exercise);
    setCurrentQuestionIndex(0);
    setUserAnswers({});
    setShowResults(false);
    setTimeRemaining(exercise.timeLimit ? exercise.timeLimit * 60 : null);
  };

  const answerQuestion = (questionId: string, answer: string) => {
    setUserAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }));
  };

  const nextQuestion = () => {
    if (currentExercise && currentQuestionIndex < currentExercise.questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      finishExercise();
    }
  };

  const finishExercise = async () => {
    if (!currentExercise || !profile?.user_id) return;

    try {
      // Calculate score using existing utility
      const userAnswersList = currentExercise.questions.map(q => userAnswers[q.id] || '');
      const correctAnswersList = currentExercise.questions.map(q =>
        Array.isArray(q.correctAnswer) ? q.correctAnswer[0] : q.correctAnswer
      );

      const rawScore = calculateExerciseScore(userAnswersList, correctAnswersList, currentExercise.category);
      // Cap score to prevent numeric overflow (max 999.99)
      const score = Math.min(999.99, Math.max(0, rawScore));

      // Save to Supabase - XP will be calculated automatically via triggers
      const { error } = await supabase
        .from('exercise_attempts')
        .insert({
          exercise_id: currentExercise.id,
          student_id: profile.user_id,
          answers: userAnswers,
          score: score,
          time_taken: currentExercise.timeLimit ? (currentExercise.timeLimit * 60) - (timeRemaining || 0) : null,
          attempt_number: 1
        });

      if (error) {
        console.error('Error saving exercise attempt:', error);
        toast({
          title: "Error",
          description: "No s'ha pogut guardar l'exercici",
          variant: "destructive"
        });
      } else {
        toast({
          title: "Exercici completat!",
          description: "Has completat l'exercici correctament",
          variant: "default"
        });
      }

      // Update exercise completion locally
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
        description: "Ha ocorregut un error inesperat",
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
      <div className="space-y-4">
        <div className="h-8 bg-muted rounded animate-pulse" />
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map(i => (
            <div key={i} className="h-32 bg-muted rounded animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  if (currentExercise && !showResults) {
    const currentQuestion = currentExercise.questions[currentQuestionIndex];
    const progress = ((currentQuestionIndex + 1) / currentExercise.questions.length) * 100;

    return (
      <div className="max-w-4xl mx-auto space-y-6">
        <Card className="glass-card">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                {getExerciseIcon(currentExercise.type)}
                <div>
                  <CardTitle className="text-xl">{currentExercise.title}</CardTitle>
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
              Pregunta {currentQuestionIndex + 1} de {currentExercise.questions.length}
            </p>
          </CardHeader>

          <CardContent className="space-y-6">
            <div className="text-lg font-medium">
              {currentQuestion.question}
            </div>

            {currentQuestion.type === 'multiple_choice' && currentQuestion.options && (
              <div className="space-y-3">
                {currentQuestion.options.map((option, index) => {
                  const correctAnswer = Array.isArray(currentQuestion.correctAnswer)
                    ? currentQuestion.correctAnswer[0]
                    : currentQuestion.correctAnswer;
                  const isCorrect = showAnswers && option === correctAnswer;

                  return (
                    <Button
                      key={index}
                      variant={userAnswers[currentQuestion.id] === option ? 'default' : 'outline'}
                      className={`w-full justify-start text-left h-auto py-3 ${isCorrect ? 'border-2 border-success bg-success/10' : ''
                        }`}
                      onClick={() => answerQuestion(currentQuestion.id, option)}
                    >
                      <span className="font-medium mr-3">{String.fromCharCode(65 + index)}.</span>
                      {option}
                      {isCorrect && <CheckCircle className="h-4 w-4 ml-auto text-success" />}
                    </Button>
                  );
                })}
              </div>
            )}

            {currentQuestion.type === 'fill_blank' && (
              <div className="space-y-3">
                <Input
                  type="text"
                  className="w-full"
                  placeholder="Escriu la teva resposta..."
                  value={userAnswers[currentQuestion.id] || ''}
                  onChange={(e) => answerQuestion(currentQuestion.id, e.target.value)}
                  autoComplete="off"
                  spellCheck="false"
                />
                {showAnswers && (
                  <div className="p-2 bg-success/10 border border-success/20 rounded">
                    <p className="text-sm text-success">
                      <strong>Resposta correcta:</strong> {Array.isArray(currentQuestion.correctAnswer) ? currentQuestion.correctAnswer.join(' o ') : currentQuestion.correctAnswer}
                    </p>
                  </div>
                )}
              </div>
            )}

            {currentQuestion.type === 'dictation' && (
              <div className="space-y-3">
                <Button
                  variant="outline"
                  className="mb-4"
                  onClick={() => playDictationAudio(
                    Array.isArray(currentQuestion.correctAnswer)
                      ? currentQuestion.correctAnswer[0]
                      : currentQuestion.correctAnswer as string
                  )}
                >
                  <Volume2 className="h-4 w-4 mr-2" />
                  Reproduir àudio
                </Button>
                <textarea
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-accent focus:border-accent resize-none"
                  rows={3}
                  placeholder="Escriu el que has escoltat..."
                  value={userAnswers[currentQuestion.id] || ''}
                  onChange={(e) => answerQuestion(currentQuestion.id, e.target.value)}
                  autoComplete="off"
                  spellCheck="false"
                />
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
                {currentQuestionIndex < currentExercise.questions.length - 1 ? 'Següent' : 'Finalitzar'}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (showResults && currentExercise) {
    const score = currentExercise.score || 0;
    const correctAnswers = currentExercise.questions.filter(q => {
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
              <CheckCircle className="h-16 w-16 mx-auto text-success" />
              <CardTitle className="text-2xl">Exercici completat!</CardTitle>
              <div className="text-4xl font-bold text-success">{score.toFixed(0)}%</div>
              <p className="text-muted-foreground">
                {correctAnswers} de {currentExercise.questions.length} respostes correctes
              </p>
            </div>
          </CardHeader>

          <CardContent className="space-y-6">
            <div className="space-y-4">
              {currentExercise.questions.map((question, index) => {
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
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="flex justify-center">
              <Button onClick={() => setCurrentExercise(null)}>
                Tornar als exercicis
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const exerciseTypes = [
    { type: 'grammar' as const, label: 'Gramàtica', icon: BookOpen },
    { type: 'vocabulary' as const, label: 'Vocabulari', icon: PenTool },
    { type: 'listening' as const, label: 'Comprensió Oral', icon: Volume2 },
    { type: 'reading' as const, label: 'Comprensió Escrita', icon: BookOpen },
    { type: 'writing' as const, label: 'Expressió Escrita', icon: PenTool }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Exercicis Disponibles</h2>
        <Badge variant="outline" className="text-sm">
          {exercises.length} exercicis
        </Badge>
      </div>

      <Tabs defaultValue="grammar" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          {exerciseTypes.map(({ type, label, icon: Icon }) => (
            <TabsTrigger key={type} value={type} className="flex items-center space-x-2">
              <Icon className="h-4 w-4" />
              <span className="hidden sm:inline">{label}</span>
            </TabsTrigger>
          ))}
        </TabsList>

        {exerciseTypes.map(({ type, label }) => (
          <TabsContent key={type} value={type} className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {getExercisesByType(type).map((exercise) => (
                <Card
                  key={exercise.id}
                  className="hover:shadow-lg transition-shadow cursor-pointer"
                  onClick={() => startExercise(exercise)}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        {getExerciseIcon(exercise.type)}
                      </div>
                      {exercise.completed && (
                        <CheckCircle className="h-5 w-5 text-success" />
                      )}
                    </div>
                    <CardTitle className="text-lg">{exercise.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <span>{exercise.questions.length} preguntes</span>
                      {exercise.timeLimit && (
                        <span>{exercise.timeLimit} min</span>
                      )}
                    </div>
                    <Button
                      className="w-full mt-3"
                      variant={exercise.completed ? "outline" : "default"}
                    >
                      <Play className="h-4 w-4 mr-2" />
                      {exercise.completed ? 'Repetir' : 'Començar'}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            {getExercisesByType(type).length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                <BookOpen className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>No hi ha exercicis de {label.toLowerCase()} disponibles</p>
              </div>
            )}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};