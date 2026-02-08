import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  BookOpen,
  PenTool,
  Volume2,
  Mic,
  FileText,
  Edit3,
  Play,
  CheckCircle,
  XCircle,
  Clock,
  Award,
  Filter,
  Search,
  Timer,
  Zap
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { useEasterEgg } from '@/hooks/useEasterEgg';
import { useToast } from '@/hooks/use-toast';
import { playDictationAudio, calculateExerciseScore } from '@/utils/exercises';

interface Exercise {
  id: string;
  title: string;
  description: string;
  type: 'grammar' | 'vocabulary' | 'listening' | 'speaking' | 'reading' | 'writing';
  level: 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2';
  content: any;
  answers: any;
  time_limit: number; // Always have timeout - required for all exercises
  max_attempts?: number;
  class_id?: string;
  created_at: string;
  completed: boolean;
  score?: number;
  attempts: number;
}

interface EnhancedExerciseSystemProps {
  classId?: string;
  classLevel?: string;
  onExerciseComplete?: () => void;
}

export const EnhancedExerciseSystem = ({ classId, classLevel, onExerciseComplete }: EnhancedExerciseSystemProps) => {
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [currentExercise, setCurrentExercise] = useState<Exercise | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<string, string>>({});
  const [timeRemaining, setTimeRemaining] = useState<number | null>(null);
  const [showResults, setShowResults] = useState(false);
  const [filteredType, setFilteredType] = useState<string>('all');
  const [filteredLevel, setFiltereredLevel] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { profile } = useAuth();
  const { toast } = useToast();
  const { showAnswers } = useEasterEgg(profile?.role || 'student');

  useEffect(() => {
    fetchExercises();
  }, [classId, classLevel]);

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

  const fetchExercises = async () => {
    setIsLoading(true);
    try {
      // Generate comprehensive exercises with timeouts
      const generatedExercises = generateAdvancedExercises(classLevel);
      setExercises(generatedExercises);
    } catch (error) {
      console.error('Error loading exercises:', error);
      toast({
        title: 'Error',
        description: 'No s\'han pogut carregar els exercicis',
        variant: 'destructive'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const generateAdvancedExercises = (level?: string): Exercise[] => {
    const exerciseTemplates = [
      // Grammar exercises
      {
        type: 'grammar' as const,
        level: 'A1' as const,
        title: 'Articles Definits i Indefinits',
        description: 'Practica l\'ús dels articles en català',
        time_limit: 10,
        content: {
          questions: [
            {
              id: 'q1',
              question: 'Completa: ___ casa és molt gran.',
              type: 'multiple_choice',
              options: ['El', 'La', 'Els', 'Les'],
              correct: 'La'
            },
            {
              id: 'q2',
              question: 'Completa: Vull ___ llibre nou.',
              type: 'multiple_choice',
              options: ['un', 'una', 'uns', 'unes'],
              correct: 'un'
            }
          ]
        }
      },
      {
        type: 'vocabulary' as const,
        level: 'A2' as const,
        title: 'Colors i Formes',
        description: 'Aprèn el vocabulari bàsic de colors i formes',
        time_limit: 8,
        content: {
          questions: [
            {
              id: 'q3',
              question: 'Com es diu "blue" en català?',
              type: 'multiple_choice',
              options: ['blau', 'verd', 'groc', 'vermell'],
              correct: 'blau'
            },
            {
              id: 'q4',
              question: 'Quina forma té un cercle?',
              type: 'multiple_choice',
              options: ['quadrada', 'triangular', 'rodona', 'rectangular'],
              correct: 'rodona'
            }
          ]
        }
      },
      {
        type: 'reading' as const,
        level: 'B1' as const,
        title: 'Comprensió de Text: La Família',
        description: 'Llegeix el text i contesta les preguntes',
        time_limit: 15,
        content: {
          text: 'La Maria té una família molt gran. Ella viu amb els seus pares i dos germans a Barcelona. El seu germà gran, en Pau, estudia medicina a la universitat. La seva germana petita, la Laura, va a l\'institut. Els caps de setmana, tota la família es reuneix per dinar a casa dels avis.',
          questions: [
            {
              id: 'q5',
              question: 'On viu la Maria?',
              type: 'multiple_choice',
              options: ['Madrid', 'Barcelona', 'Valencia', 'Girona'],
              correct: 'Barcelona'
            },
            {
              id: 'q6',
              question: 'Què estudia en Pau?',
              type: 'multiple_choice',
              options: ['Medicina', 'Dret', 'Enginyeria', 'Història'],
              correct: 'Medicina'
            }
          ]
        }
      },
      {
        type: 'writing' as const,
        level: 'B2' as const,
        title: 'Redacció: La Meva Rutina Diària',
        description: 'Escriu sobre la teva rutina diària',
        time_limit: 20,
        content: {
          prompt: 'Escriu un text de 150-200 paraules sobre la teva rutina diària. Inclou activitats del matí, tarda i vespre.',
          criteria: [
            'Ús correcte dels temps verbals',
            'Varietat de vocabulari',
            'Coherència i cohesió',
            'Ortografia i gramàtica'
          ]
        }
      },
      {
        type: 'listening' as const,
        level: 'A2' as const,
        title: 'Dictat: Frases Simples',
        description: 'Escolta i escriu el que sents',
        time_limit: 12,
        content: {
          questions: [
            {
              id: 'q7',
              question: 'Escolta i escriu la frase:',
              type: 'dictation',
              audio_text: 'Avui fa molt bon temps i el sol brilla.',
              correct: 'Avui fa molt bon temps i el sol brilla.'
            }
          ]
        }
      },
      {
        type: 'speaking' as const,
        level: 'B1' as const,
        title: 'Expressió Oral: Presentació Personal',
        description: 'Grava\'t presentant-te en català',
        time_limit: 15,
        content: {
          prompt: 'Presenta\'t en català durant 2-3 minuts. Parla sobre el teu nom, edat, procedència, estudis o feina, i aficions.',
          criteria: [
            'Pronunciació clara',
            'Fluidesa en el discurs',
            'Ús de vocabulari adequat',
            'Estructura coherent'
          ]
        }
      }
    ];

    // Filter by level if specified
    let filteredExercises = exerciseTemplates;
    if (level) {
      const levelOrder = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];
      const currentLevelIndex = levelOrder.indexOf(level);
      filteredExercises = exerciseTemplates.filter(ex => {
        const exerciseLevelIndex = levelOrder.indexOf(ex.level);
        return exerciseLevelIndex <= currentLevelIndex + 1; // Current level + one above
      });
    }

    return filteredExercises.map((template, index) => ({
      id: `enhanced_${index + 1}`,
      title: template.title,
      description: template.description,
      type: template.type,
      level: template.level,
      content: template.content,
      answers: template.content.questions?.map(q => q.correct) || [],
      time_limit: template.time_limit,
      max_attempts: 3,
      class_id: classId || 'default',
      created_at: new Date().toISOString(),
      completed: false,
      attempts: 0,
      score: undefined
    }));
  };

  const getExerciseIcon = (type: string) => {
    switch (type) {
      case 'grammar': return <BookOpen className="h-5 w-5" />;
      case 'vocabulary': return <PenTool className="h-5 w-5" />;
      case 'listening': return <Volume2 className="h-5 w-5" />;
      case 'speaking': return <Mic className="h-5 w-5" />;
      case 'reading': return <FileText className="h-5 w-5" />;
      case 'writing': return <Edit3 className="h-5 w-5" />;
      default: return <BookOpen className="h-5 w-5" />;
    }
  };

  const getTypeLabel = (type: string) => {
    const labels = {
      grammar: 'Gramàtica',
      vocabulary: 'Vocabulari',
      listening: 'Comprensió Oral',
      speaking: 'Expressió Oral',
      reading: 'Lectura',
      writing: 'Escriptura'
    };
    return labels[type as keyof typeof labels] || type;
  };

  const getLevelColor = (level: string) => {
    const colors = {
      'A1': 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
      'A2': 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
      'B1': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
      'B2': 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200',
      'C1': 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
      'C2': 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200'
    };
    return colors[level as keyof typeof colors] || 'bg-secondary text-secondary-foreground';
  };

  const filterExercises = () => {
    return exercises.filter(exercise => {
      const matchesType = filteredType === 'all' || exercise.type === filteredType;
      const matchesLevel = filteredLevel === 'all' || exercise.level === filteredLevel;
      const matchesSearch = searchTerm === '' ||
        exercise.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        exercise.description.toLowerCase().includes(searchTerm.toLowerCase());

      return matchesType && matchesLevel && matchesSearch;
    });
  };

  const startExercise = (exercise: Exercise) => {
    setCurrentExercise(exercise);
    setCurrentQuestionIndex(0);
    setUserAnswers({});
    setShowResults(false);
    setTimeRemaining(exercise.time_limit * 60);
  };

  const finishExercise = async () => {
    if (!currentExercise || !profile?.user_id) return;

    // Calculate score using enhanced scoring system
    const userAnswersList = Object.values(userAnswers);
    const correctAnswersList = currentExercise.answers || [];
    const score = calculateExerciseScore(userAnswersList, correctAnswersList, currentExercise.type);

    try {
      // Update skill balance in database based on exercise type and score
      await updateSkillBalance(currentExercise.type, score);

      // Save exercise attempt (if real exercise)
      const isRealExercise = currentExercise.id && currentExercise.id.match(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i);

      if (isRealExercise && classId) {
        const { error } = await supabase
          .from('exercise_attempts')
          .insert({
            student_id: profile.user_id,
            exercise_id: currentExercise.id,
            score: score,
            answers: userAnswers,
            time_taken: currentExercise.time_limit * 60 - (timeRemaining || 0),
            completed_at: new Date().toISOString()
          });

        if (error) {
          console.error('Error saving exercise attempt:', error);
        }
      }

      toast({
        title: 'Exercici completat!',
        description: `Has obtingut ${score}%`,
        className: 'bg-card text-card-foreground border-border',
      });
    } catch (error) {
      console.error('Error saving exercise:', error);
    }

    // Update local exercise completion
    setExercises(prev =>
      prev.map(ex =>
        ex.id === currentExercise.id
          ? { ...ex, completed: true, score, attempts: ex.attempts + 1 }
          : ex
      )
    );

    setShowResults(true);

    if (onExerciseComplete) {
      onExerciseComplete();
    }
  };

  const updateSkillBalance = async (exerciseType: string, score: number) => {
    if (!profile?.user_id || !classId) return;

    try {
      // Map exercise types to progress fields
      const typeMapping: Record<string, string> = {
        grammar: 'grammar_score',
        vocabulary: 'vocabulary_score',
        listening: 'listening_score',
        speaking: 'speaking_score',
        reading: 'reading_score',
        writing: 'writing_score'
      };

      const progressField = typeMapping[exerciseType];
      if (!progressField) return;

      // Get current progress
      const { data: currentProgress } = await supabase
        .from('student_progress')
        .select('*')
        .eq('student_id', profile.user_id)
        .eq('class_id', classId)
        .single();

      let newProgress;
      if (currentProgress) {
        // Update existing progress with weighted average
        const currentScore = (currentProgress as any)[progressField] ?? 0;
        const newScore = currentScore === 0 ? score : Math.round((currentScore + score) / 2);

        newProgress = {
          ...currentProgress,
          [progressField]: newScore,
          overall_score: Math.round((
            (newScore +
              (currentProgress.grammar_score || 0) +
              (currentProgress.vocabulary_score || 0) +
              (currentProgress.listening_score || 0) +
              (currentProgress.speaking_score || 0) +
              (currentProgress.reading_score || 0) +
              (currentProgress.writing_score || 0)
            ) / 6
          ))
        };

        await supabase
          .from('student_progress')
          .update(newProgress)
          .eq('id', currentProgress.id);
      } else {
        // Create new progress record starting from zero
        newProgress = {
          student_id: profile.user_id,
          class_id: classId,
          grammar_score: exerciseType === 'grammar' ? score : 0,
          vocabulary_score: exerciseType === 'vocabulary' ? score : 0,
          listening_score: exerciseType === 'listening' ? score : 0,
          speaking_score: exerciseType === 'speaking' ? score : 0,
          reading_score: exerciseType === 'reading' ? score : 0,
          writing_score: exerciseType === 'writing' ? score : 0,
          overall_score: score,
          level_progress: 0
        };

        await supabase
          .from('student_progress')
          .insert(newProgress);
      }
    } catch (error) {
      console.error('Error updating skill balance:', error);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const playAudio = (text: string) => {
    playDictationAudio(text);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="loading-pulse">Carregant exercicis...</div>
      </div>
    );
  }

  // Exercise interface during completion
  if (currentExercise && !showResults) {
    return (
      <div className="max-w-4xl mx-auto space-y-6 animate-fade-in">
        <Card className="shadow-card glass-effect">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                {getExerciseIcon(currentExercise.type)}
                <div>
                  <CardTitle className="text-xl">{currentExercise.title}</CardTitle>
                  <div className="flex items-center space-x-2 mt-1">
                    <Badge variant="outline">{getTypeLabel(currentExercise.type)}</Badge>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2 text-sm">
                  <Timer className="h-4 w-4" />
                  <span className={timeRemaining && timeRemaining < 60 ? 'text-destructive font-bold animate-pulse' : 'text-accent font-medium'}>
                    {timeRemaining ? formatTime(timeRemaining) : '--:--'}
                  </span>
                </div>
                {timeRemaining && timeRemaining < 30 && (
                  <Badge variant="destructive" className="animate-pulse">
                    <Zap className="h-3 w-3 mr-1" />
                    Temps limitat!
                  </Badge>
                )}
              </div>
            </div>
            <Progress
              value={timeRemaining ? ((currentExercise.time_limit * 60 - timeRemaining) / (currentExercise.time_limit * 60)) * 100 : 0}
              className="mt-4"
            />
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Exercise content rendering */}
            {currentExercise.type === 'writing' && (
              <div className="space-y-4">
                <div className="bg-gradient-surface p-6 rounded-lg">
                  <h3 className="font-medium mb-2">Instruccions:</h3>
                  <p className="text-muted-foreground">{currentExercise.content.prompt}</p>
                  <div className="mt-4">
                    <p className="text-sm font-medium">Criteris d'avaluació:</p>
                    <ul className="text-sm text-muted-foreground mt-2 space-y-1">
                      {currentExercise.content.criteria.map((criterion: string, index: number) => (
                        <li key={index} className="flex items-center space-x-2">
                          <CheckCircle className="h-3 w-3 text-accent" />
                          <span>{criterion}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <Textarea
                  placeholder="Escriu la teva redacció aquí..."
                  className="min-h-[300px] text-base leading-relaxed"
                  value={userAnswers['writing'] || ''}
                  onChange={(e) => setUserAnswers(prev => ({ ...prev, writing: e.target.value }))}
                />
                <div className="text-sm text-muted-foreground text-right">
                  Paraules: {userAnswers['writing']?.split(' ').filter(w => w.length > 0).length || 0}
                </div>
              </div>
            )}

            {currentExercise.type === 'listening' && currentExercise.content.questions?.[0] && (
              <div className="space-y-4">
                <div className="bg-gradient-surface p-6 rounded-lg text-center">
                  <Button
                    onClick={() => playAudio(currentExercise.content.questions[0].audio_text)}
                    className="bg-gradient-accent hover:shadow-hover"
                    size="lg"
                  >
                    <Volume2 className="h-5 w-5 mr-2" />
                    Reproduir àudio
                  </Button>
                  <p className="text-sm text-muted-foreground mt-2">Pots reproduir l'àudio tantes vegades com vulguis</p>
                </div>
                <div>
                  <h3 className="font-medium mb-3">{currentExercise.content.questions[0].question}</h3>
                  <Input
                    type="text"
                    placeholder="Escriu el que has escoltat..."
                    className="text-base"
                    value={userAnswers[currentExercise.content.questions[0].id] || ''}
                    onChange={(e) => setUserAnswers(prev => ({
                      ...prev,
                      [currentExercise.content.questions[0].id]: e.target.value
                    }))}
                  />
                  {showAnswers && (
                    <div className="mt-3 p-3 bg-success/10 border border-success/20 rounded-lg">
                      <p className="text-sm text-success">
                        <strong>Resposta correcta:</strong> {currentExercise.content.questions[0].correct}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Standard question interface for other types */}
            {(currentExercise.type === 'grammar' || currentExercise.type === 'vocabulary' || currentExercise.type === 'reading') &&
              currentExercise.content.questions && currentExercise.content.questions[currentQuestionIndex] && (
                <div className="space-y-4">
                  {currentExercise.type === 'reading' && currentExercise.content.text && (
                    <div className="bg-gradient-surface p-6 rounded-lg">
                      <h3 className="font-medium mb-3">Text:</h3>
                      <p className="leading-relaxed text-muted-foreground">{currentExercise.content.text}</p>
                    </div>
                  )}

                  <div>
                    <h3 className="text-lg font-medium mb-4">
                      Pregunta {currentQuestionIndex + 1}: {currentExercise.content.questions[currentQuestionIndex].question}
                    </h3>

                    <div className="space-y-3">
                      {currentExercise.content.questions[currentQuestionIndex].options?.map((option: string, index: number) => (
                        <Button
                          key={index}
                          variant={userAnswers[currentExercise.content.questions[currentQuestionIndex].id] === option ? 'default' : 'outline'}
                          className={`w-full justify-start text-left h-auto py-4 px-6 hover-lift ${showAnswers && option === currentExercise.content.questions[currentQuestionIndex].correct
                              ? 'border-2 border-success bg-success/10'
                              : ''
                            }`}
                          onClick={() => setUserAnswers(prev => ({
                            ...prev,
                            [currentExercise.content.questions[currentQuestionIndex].id]: option
                          }))}
                        >
                          <span className="font-medium mr-3 text-accent">{String.fromCharCode(65 + index)}.</span>
                          <span className="flex-1">{option}</span>
                          {showAnswers && option === currentExercise.content.questions[currentQuestionIndex].correct && (
                            <CheckCircle className="h-4 w-4 text-success" />
                          )}
                        </Button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

            <div className="flex justify-between pt-6 border-t">
              <Button
                variant="outline"
                onClick={() => setCurrentExercise(null)}
                className="hover-lift"
              >
                Abandonar
              </Button>
              <div className="flex space-x-3">
                {currentExercise.content.questions && currentQuestionIndex > 0 && (
                  <Button
                    variant="outline"
                    onClick={() => setCurrentQuestionIndex(prev => prev - 1)}
                    className="hover-lift"
                  >
                    Anterior
                  </Button>
                )}
                <Button
                  onClick={() => {
                    if (currentExercise.content.questions && currentQuestionIndex < currentExercise.content.questions.length - 1) {
                      setCurrentQuestionIndex(prev => prev + 1);
                    } else {
                      finishExercise();
                    }
                  }}
                  disabled={!userAnswers[currentExercise.content.questions?.[currentQuestionIndex]?.id || 'writing']}
                  className="bg-gradient-accent hover:shadow-hover"
                >
                  {currentExercise.content.questions && currentQuestionIndex < currentExercise.content.questions.length - 1 ? 'Següent' : 'Finalitzar'}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Results screen
  if (showResults && currentExercise) {
    return (
      <div className="max-w-4xl mx-auto animate-slide-up">
        <Card className="shadow-elevation glass-effect">
          <CardHeader>
            <div className="text-center space-y-4">
              <Award className="h-16 w-16 mx-auto text-accent" />
              <CardTitle className="text-2xl">Exercici completat!</CardTitle>
              <div className="text-4xl font-bold text-accent">{currentExercise.score}%</div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex justify-center space-x-4">
              <Button variant="outline" onClick={() => setCurrentExercise(null)} className="hover-lift">
                Tornar als exercicis
              </Button>
              <Button onClick={() => startExercise(currentExercise)} className="bg-gradient-accent hover:shadow-hover">
                Repetir exercici
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Main exercise list
  return (
    <div className="max-w-6xl mx-auto space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <div>
          <h2 className="text-3xl font-bold mb-2">Sistema d'Exercicis Avançat</h2>
          <p className="text-muted-foreground">
            Tots els exercicis tenen temps límit per millorar la concentració i l'eficiència
            {showAnswers && (
              <span className="text-accent font-medium ml-2">
                Mode resposta actiu
              </span>
            )}
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2">
            <Search className="h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar exercicis..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-48"
            />
          </div>
          <select
            value={filteredType}
            onChange={(e) => setFilteredType(e.target.value)}
            className="px-3 py-2 border rounded-lg bg-background text-foreground"
          >
            <option value="all">Tots els tipus</option>
            <option value="grammar">Gramàtica</option>
            <option value="vocabulary">Vocabulari</option>
            <option value="reading">Lectura</option>
            <option value="writing">Escriptura</option>
            <option value="listening">Comprensió Oral</option>
            <option value="speaking">Expressió Oral</option>
          </select>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filterExercises().map(exercise => (
          <Card key={exercise.id} className="hover-lift card-hover transition-all duration-300 glass-effect">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  {getExerciseIcon(exercise.type)}
                  <div>
                    <CardTitle className="text-lg">{exercise.title}</CardTitle>
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
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {exercise.description}
                </p>

                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <div className="flex items-center space-x-1">
                    <Clock className="h-3 w-3" />
                    <span>{exercise.time_limit} min</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Badge variant="outline" className="text-xs">
                      {getTypeLabel(exercise.type)}
                    </Badge>
                  </div>
                </div>

                <Button
                  onClick={() => startExercise(exercise)}
                  className="w-full bg-gradient-accent hover:shadow-hover"
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

      {filterExercises().length === 0 && (
        <div className="text-center py-12">
          <BookOpen className="h-12 w-12 mx-auto mb-4 text-muted-foreground opacity-50" />
          <p className="text-muted-foreground">No s'han trobat exercicis amb els filtres seleccionats</p>
        </div>
      )}
    </div>
  );
};