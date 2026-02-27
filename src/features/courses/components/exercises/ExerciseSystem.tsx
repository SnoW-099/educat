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
  Award
} from 'lucide-react';
import { useEasterEgg } from '@/hooks/useEasterEgg';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { calculateExerciseScore, playDictationAudio } from '@/utils/exercises';
import { useToast } from '@/hooks/use-toast';
import { ALL_REFERENCE_EXERCISES } from '@/utils/exercisesWithReferenceTexts';


interface Question {
  id: string;
  type: 'multiple_choice' | 'fill_blank' | 'dictation' | 'essay' | 'true_false';
  question: string;
  options?: string[];
  correctAnswer: string | string[];
  explanation?: string;
  textReference?: string;
}

interface Exercise {
  id: string;
  type: 'ortografia' | 'gramàtica' | 'dictats' | 'altres' | 'comprensió_lectora';
  title: string;
  level: 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2';
  questions: Question[];
  timeLimit?: number;
  completed: boolean;
  score?: number;
  xpEarned?: number;
  referenceText?: string;
  textReference?: string;
}

interface ExerciseSystemProps {
  classId?: string;
}

export const ExerciseSystem = ({ classId }: ExerciseSystemProps) => {
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [currentExercise, setCurrentExercise] = useState<Exercise | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<string, string>>({});
  const [timeRemaining, setTimeRemaining] = useState<number | null>(null);
  const [showResults, setShowResults] = useState(false);
  const [earnedXP, setEarnedXP] = useState<number>(0);
  const [loading, setLoading] = useState(true);
  const [allowAnswerChecking, setAllowAnswerChecking] = useState(false);
  const { profile } = useAuth();
  const { showAnswers } = useEasterEgg(profile?.role || 'student');
  const { toast } = useToast();

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
        .select('class_id, classes(level, allow_all_levels, allow_answer_checking)')
        .eq('student_id', profile?.user_id)
        .eq('is_active', true)
        .single();

      const userClassLevel = enrollment?.classes?.level;
      const allowAllLevels = enrollment?.classes?.allow_all_levels;
      const classAllowsAnswerChecking = enrollment?.classes?.allow_answer_checking || false;
      
      setAllowAnswerChecking(classAllowsAnswerChecking);

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
        type: ex.category as Exercise['type'],
        title: ex.title,
        level: ex.level as Exercise['level'],
        questions: (ex.content as any) as Question[],
        timeLimit: ex.time_limit || undefined,
        completed: false,
        score: undefined,
        referenceText: undefined,
        textReference: undefined
      }));

      // Add reference exercises from static data
      const referenceExercises: Exercise[] = ALL_REFERENCE_EXERCISES.map(refEx => ({
        id: refEx.id,
        type: refEx.type,
        title: refEx.title,
        level: refEx.level,
        questions: refEx.questions,
        timeLimit: refEx.timeLimit,
        completed: false,
        score: undefined,
        referenceText: refEx.referenceText,
        textReference: refEx.textReference
      }));

      setExercises([...transformedExercises, ...referenceExercises]);
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
      case 'ortografia':
        return <PenTool className="h-5 w-5" />;
      case 'gramàtica':
        return <BookOpen className="h-5 w-5" />;
      case 'dictats':
        return <Volume2 className="h-5 w-5" />;
      case 'comprensió_lectora':
        return <BookOpen className="h-5 w-5" />;
      case 'altres':
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
      
      const rawScore = calculateExerciseScore(userAnswersList, correctAnswersList, currentExercise.type);
      // Cap score to prevent numeric overflow (max 999.99)
      const score = Math.min(999.99, Math.max(0, rawScore));
      
      // Get level multiplier for XP visualization
      const levelMultiplier = {
        'A1': 1.5,
        'A2': 1.7,
        'B1': 2.0,
        'B2': 2.2,
        'C1': 2.4,
        'C2': 2.5
      }[currentExercise.level] || 1.5;
      
      const xpEarned = Math.round(score * levelMultiplier);
      
      // Save to Supabase
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
          description: "No s'ha pogut guardar l'exercici, però pots veure els resultats",
          variant: "destructive"
        });
      } else {
        toast({
          title: "Exercici completat!",
          description: `Has guanyat ${xpEarned} XP (${score}%)`,
          variant: "default"
        });
      }
      
      // Update exercise completion locally
      setExercises(prev =>
        prev.map(ex =>
          ex.id === currentExercise.id
            ? { ...ex, completed: true, score, xpEarned }
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

  if (currentExercise && !showResults) {
    const currentQuestion = currentExercise.questions[currentQuestionIndex];
    const progress = ((currentQuestionIndex + 1) / currentExercise.questions.length) * 100;

    return (
      <div className="max-w-4xl mx-auto space-y-6">
        <Card className="shadow-card">
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
            {/* Reference text display */}
            {currentExercise.referenceText && (
              <div className="bg-muted/50 p-4 rounded-lg border-l-4 border-accent">
                <h4 className="font-semibold mb-2 text-accent">Text de referència:</h4>
                <div className="text-sm leading-relaxed whitespace-pre-line">
                  {currentExercise.referenceText}
                </div>
              </div>
            )}

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
                    {showAnswers && allowAnswerChecking && option === currentQuestion.correctAnswer && (
                      <CheckCircle className="h-4 w-4 ml-auto text-success" />
                    )}
                  </Button>
                ))}
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
                {showAnswers && allowAnswerChecking && (
                  <div className="text-sm text-success bg-success/10 p-2 rounded">
                    Respostes possibles: {Array.isArray(currentQuestion.correctAnswer) 
                      ? currentQuestion.correctAnswer.join(', ') 
                      : currentQuestion.correctAnswer}
                  </div>
                )}
                {!allowAnswerChecking && showAnswers && (
                  <div className="text-sm text-muted-foreground bg-muted/50 p-2 rounded">
                    El professor ha desactivat la visualització de respostes durant l'exercici
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
                {showAnswers && allowAnswerChecking && (
                  <div className="text-sm text-success bg-success/10 p-2 rounded">
                    Respostes possibles: {Array.isArray(currentQuestion.correctAnswer) 
                      ? currentQuestion.correctAnswer.join(', ') 
                      : currentQuestion.correctAnswer}
                  </div>
                )}
                {!allowAnswerChecking && showAnswers && (
                  <div className="text-sm text-muted-foreground bg-muted/50 p-2 rounded">
                    El professor ha desactivat la visualització de respostes durant l'exercici
                  </div>
                )}
              </div>
            )}

            {currentQuestion.type === 'true_false' && currentQuestion.options && (
              <div className="space-y-3">
                {currentQuestion.options.map((option, index) => (
                  <Button
                    key={index}
                    variant={userAnswers[currentQuestion.id] === option ? 'default' : 'outline'}
                    className="w-full justify-start text-left h-auto py-3"
                    onClick={() => answerQuestion(currentQuestion.id, option)}
                  >
                    <span className="font-medium mr-3">{option === 'Veritat' ? '✓' : '✗'}</span>
                    {option}
                    {showAnswers && allowAnswerChecking && option === currentQuestion.correctAnswer && (
                      <CheckCircle className="h-4 w-4 ml-auto text-success" />
                    )}
                  </Button>
                ))}
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
              <Award className="h-16 w-16 mx-auto text-accent" />
              <CardTitle className="text-2xl">Exercici completat!</CardTitle>
              <div className="text-4xl font-bold text-accent">{score}%</div>
              <p className="text-muted-foreground">
                {correctAnswers} de {currentExercise.questions.length} respostes correctes
              </p>
              {currentExercise.xpEarned && (
                <div className="bg-gradient-to-r from-accent/10 to-accent/5 rounded-lg p-4 mt-4">
                  <div className="flex items-center justify-center space-x-2">
                    <Award className="h-5 w-5 text-accent" />
                    <span className="text-lg font-semibold text-accent">
                      +{currentExercise.xpEarned} XP
                    </span>
                  </div>
                </div>
              )}
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
                        {question.explanation && (
                          <p className="text-sm text-muted-foreground mt-2">
                            <span className="font-medium">Explicació:</span> {question.explanation}
                          </p>
                        )}
                        {question.textReference && (
                          <p className="text-xs text-muted-foreground mt-1 italic">
                            <span className="font-medium">Font:</span> {question.textReference}
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

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto">
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-accent mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Carregant exercicis...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h2 className="text-3xl font-bold mb-2">Exercicis Dinàmics</h2>
        <p className="text-muted-foreground">
          Practica català amb exercicis adaptats al teu nivell. 
          {showAnswers && (
            <span className="text-accent font-medium ml-2">
              Mode resposta actiu
            </span>
          )}
        </p>
      </div>

      <Tabs defaultValue="ortografia" className="space-y-8">
        <TabsList className="grid w-full grid-cols-5 p-1 bg-secondary/50 backdrop-blur-md border border-white/20 rounded-xl h-auto">
          <TabsTrigger value="ortografia" className="flex items-center space-x-2 py-3 px-4 data-[state=active]:bg-white data-[state=active]:shadow-card transition-all rounded-lg">
            <PenTool className="h-4 w-4" />
            <span className="font-medium">Ortografia</span>
          </TabsTrigger>
          <TabsTrigger value="gramàtica" className="flex items-center space-x-2 py-3 px-4 data-[state=active]:bg-white data-[state=active]:shadow-card transition-all rounded-lg">
            <BookOpen className="h-4 w-4" />
            <span className="font-medium">Gramàtica</span>
          </TabsTrigger>
          <TabsTrigger value="dictats" className="flex items-center space-x-2 py-3 px-4 data-[state=active]:bg-white data-[state=active]:shadow-card transition-all rounded-lg">
            <Volume2 className="h-4 w-4" />
            <span className="font-medium">Dictats</span>
          </TabsTrigger>
          <TabsTrigger value="comprensió_lectora" className="flex items-center space-x-2 py-3 px-4 data-[state=active]:bg-white data-[state=active]:shadow-card transition-all rounded-lg">
            <BookOpen className="h-4 w-4" />
            <span className="font-medium">Lectura</span>
          </TabsTrigger>
          <TabsTrigger value="altres" className="flex items-center space-y-2 lg:flex-row lg:space-y-0 lg:space-x-2 py-3 px-4 data-[state=active]:bg-white data-[state=active]:shadow-card transition-all rounded-lg">
            <MoreHorizontal className="h-4 w-4" />
            <span className="font-medium">Altres</span>
          </TabsTrigger>
        </TabsList>

        {(['ortografia', 'gramàtica', 'dictats', 'comprensió_lectora', 'altres'] as const).map(type => (
          <TabsContent key={type} value={type} className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {getExercisesByType(type).length === 0 ? (
                <div className="col-span-full text-center py-20 bg-secondary/20 rounded-3xl border border-dashed border-border">
                  <div className="text-muted-foreground max-w-xs mx-auto">
                    <div className="bg-secondary/50 p-4 rounded-full w-fit mx-auto mb-6">
                      <BookOpen className="h-10 w-10 opacity-30" />
                    </div>
                    <p className="text-xl font-bold text-foreground mb-2">Pròximament</p>
                    <p className="text-sm">Estem preparant nous exercicis de {type} per a tu.</p>
                  </div>
                </div>
              ) : (
                getExercisesByType(type).map((exercise, index) => (
                  <Card 
                    key={exercise.id} 
                    className="group relative overflow-hidden transition-all duration-500 hover:-translate-y-1 hover:shadow-lg dark:hover:shadow-[0_8px_30px_rgba(59,130,246,0.1)] bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:border-blue-400 dark:hover:border-blue-500/50"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-blue-500/20 to-transparent group-hover:via-blue-500/50 transition-colors duration-500" />
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl" />
                    
                    <CardHeader className="relative z-10 pb-4">
                      <div className="flex items-start justify-between">
                        <div className="space-y-3">
                          <div className="p-2.5 rounded-xl bg-blue-50 dark:bg-blue-900/30 border border-blue-100 dark:border-blue-800/30 text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform duration-500 shadow-sm w-fit">
                            {getExerciseIcon(exercise.type)}
                          </div>
                          <div>
                            <CardTitle className="text-lg font-bold group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300 text-slate-800 dark:text-white leading-tight">
                              {exercise.title}
                            </CardTitle>
                             <div className="flex items-center mt-2 space-x-2">
                               <Badge variant="secondary" className={`${getLevelColor(exercise.level)} text-[10px] uppercase font-bold tracking-wider px-2`}>
                                {exercise.level}
                              </Badge>
                            </div>
                          </div>
                        </div>
                        {exercise.completed && (
                          <Badge variant="default" className="bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-200 dark:border-emerald-500/20 font-bold px-2 py-0.5 mt-2 md:mt-0 h-fit self-start md:self-auto">
                            <CheckCircle className="h-3.5 w-3.5 mr-1" />
                            {exercise.score}%
                          </Badge>
                        )}
                      </div>
                    </CardHeader>

                    <CardContent className="relative z-10 pt-0 mt-auto">
                      <div className="pt-4 border-t border-slate-100 dark:border-slate-700/50 space-y-5">
                        <div className="flex items-center space-x-4 text-xs font-medium text-slate-500 dark:text-slate-400">
                          <div className="flex items-center space-x-1.5 px-2 py-1 rounded-md bg-slate-50 dark:bg-slate-700/30 border border-slate-100 dark:border-slate-600/30">
                            <PenTool className="h-3.5 w-3.5 text-slate-400" />
                            <span>{exercise.questions.length} preg.</span>
                          </div>
                          {exercise.timeLimit && (
                            <div className="flex items-center space-x-1.5 px-2 py-1 rounded-md bg-slate-50 dark:bg-slate-700/30 border border-slate-100 dark:border-slate-600/30">
                              <Clock className="h-3.5 w-3.5 text-slate-400" />
                              <span>{exercise.timeLimit} min</span>
                            </div>
                          )}
                        </div>
                        
                        <Button 
                          onClick={() => startExercise(exercise)}
                          className={`
                            w-full transition-all duration-300 h-11 font-bold rounded-xl shadow-sm
                            ${exercise.completed 
                              ? 'bg-slate-100 dark:bg-slate-700/50 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 border-none' 
                              : 'bg-blue-600 hover:bg-blue-700 text-white shadow-blue-500/20 hover:shadow-[0_8px_20px_rgba(37,99,235,0.2)] dark:hover:shadow-[0_8px_20px_rgba(37,99,235,0.4)]'
                            }
                          `}
                          variant={exercise.completed ? 'secondary' : 'default'}
                        >
                          <Play className={`h-4 w-4 mr-2 ${exercise.completed ? 'text-slate-500' : 'fill-current'}`} />
                          {exercise.completed ? 'Repetir intent' : 'Començar ara'}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};