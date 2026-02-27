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
  Search
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { useEasterEgg } from '@/hooks/useEasterEgg';
import { useToast } from '@/hooks/use-toast';

interface Exercise {
  id: string;
  title: string;
  description: string;
  type: 'grammar' | 'vocabulary' | 'listening' | 'speaking' | 'reading' | 'writing';
  level: 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2';
  content: any;
  answers: any;
  time_limit?: number;
  max_attempts?: number;
  class_id?: string;
  created_at: string;
  completed: boolean;
  score?: number;
  attempts: number;
}

interface AdvancedExerciseSystemProps {
  classId?: string;
  classLevel?: string;
  onExerciseComplete?: () => void;
}

export const AdvancedExerciseSystem = ({ classId, classLevel, onExerciseComplete }: AdvancedExerciseSystemProps) => {
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [currentExercise, setCurrentExercise] = useState<Exercise | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<string, string>>({});
  const [timeRemaining, setTimeRemaining] = useState<number | null>(null);
  const [showResults, setShowResults] = useState(false);
  const [filteredType, setFilteredType] = useState<string>('all');
  const [filteredLevel, setFilteredLevel] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
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
    try {
      const { data, error } = await supabase
        .from('exercises')
        .select(`
          id,
          title,
          description,
          type,
          level,
          content,
          answers,
          time_limit,
          max_attempts,
          class_id,
          created_at
        `)
        .or(`class_id.is.null,class_id.eq.${classId || 'null'}`)
        .order('created_at', { ascending: true });

      if (error) throw error;

      // Map database exercises to local format
      const mappedExercises: Exercise[] = data?.map(ex => ({
        ...ex,
        description: ex.description || '',
        type: ex.type as 'grammar' | 'vocabulary' | 'listening' | 'speaking' | 'reading' | 'writing',
        level: ex.level as 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2',
        time_limit: ex.time_limit ?? undefined,
        max_attempts: ex.max_attempts ?? undefined,
        class_id: ex.class_id || undefined,
        completed: false, // TODO: Check user attempts
        attempts: 0, // TODO: Count user attempts
        score: undefined // TODO: Get best score
      })) || [];

      // Add some default exercises for demonstration
      const defaultExercises = await generateDefaultExercises(classLevel);

      setExercises([...mappedExercises, ...defaultExercises]);
    } catch (error) {
      console.error('Error fetching exercises:', error);
      // Fallback to default exercises
      const fallbackExercises = await generateDefaultExercises(classLevel);
      setExercises(fallbackExercises);
    }
  };

  const generateDefaultExercises = async (level?: string): Promise<Exercise[]> => {
    // Import comprehensive exercise database
    const { EXERCISE_DATABASE, getExercisesForClass } = await import('@/utils/exerciseData');

    let exercisesToUse = EXERCISE_DATABASE;

    // Filter by class level if provided - only exercises for that level or one below
    if (level) {
      exercisesToUse = getExercisesForClass(level);
    }

    // Generate UUIDs for exercises to avoid database errors
    const generateUUID = () => {
      return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        const r = Math.random() * 16 | 0;
        const v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
      });
    };

    // Map to local Exercise format and ensure they have class_id to enable XP
    return exercisesToUse.map((ex: any) => ({
      id: `demo_${generateUUID()}`,
      title: ex.title,
      description: ex.description,
      type: ex.type,
      level: ex.level,
      content: ex.content,
      answers: ex.answers,
      time_limit: ex.time_limit,
      max_attempts: ex.max_attempts,
      class_id: classId || 'default', // Ensure all exercises have class_id for XP calculation
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
    return colors[level as keyof typeof colors] || 'bg-gray-100 text-gray-800';
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
    setTimeRemaining(exercise.time_limit ? exercise.time_limit * 60 : null);
  };

  const finishExercise = async () => {
    if (!currentExercise || !profile?.user_id) return;

    // Calculate score based on exercise type
    let score = 0;

    if (currentExercise.content.questions) {
      let correctAnswers = 0;
      currentExercise.content.questions.forEach((q: any) => {
        const userAnswer = userAnswers[q.id];
        if (userAnswer?.toLowerCase().trim() === q.correct.toLowerCase().trim()) {
          correctAnswers++;
        }
      });
      score = Math.round((correctAnswers / currentExercise.content.questions.length) * 100);
    } else if (currentExercise.type === 'writing') {
      // For writing, give partial score based on content length and basic criteria
      const writingContent = userAnswers['writing'] || '';
      if (writingContent.length >= 100) score = 85;
      else if (writingContent.length >= 50) score = 70;
      else if (writingContent.length >= 20) score = 55;
    }

    try {
      // Only save to database if this is a real database exercise (has valid UUID)
      const isRealExercise = currentExercise.id && currentExercise.id.match(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i);

      if (isRealExercise) {
        const { error } = await supabase
          .from('exercise_attempts')
          .insert({
            student_id: profile.user_id,
            exercise_id: currentExercise.id,
            score: score,
            answers: userAnswers,
            time_taken: currentExercise.time_limit ? (currentExercise.time_limit * 60 - (timeRemaining || 0)) : null,
            completed_at: new Date().toISOString()
          });

        if (error) {
          console.error('Error saving exercise attempt:', error);
          toast({
            title: 'Atenció',
            description: 'L\'exercici s\'ha completat però pot no haver-se guardat correctament',
            variant: 'destructive'
          });
        }
      }

      // Always show completion message
      toast({
        title: 'Exercici completat!',
        description: `Has obtingut ${score}%`,
      });
    } catch (error) {
      console.error('Error saving exercise:', error);
      toast({
        title: 'Error',
        description: 'Hi ha hagut un problema guardant l\'exercici',
        variant: 'destructive'
      });
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

    // Call the completion callback to refresh parent data
    if (onExerciseComplete) {
      onExerciseComplete();
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Exercise interface during completion
  if (currentExercise && !showResults) {
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
                    <Badge variant="outline">{getTypeLabel(currentExercise.type)}</Badge>
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
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Exercise content based on type */}
            {currentExercise.type === 'writing' && (
              <div className="space-y-4">
                <div className="bg-muted p-4 rounded-lg">
                  <h3 className="font-medium mb-2">Instruccions:</h3>
                  <p>{currentExercise.content.prompt}</p>
                  <div className="mt-3">
                    <p className="text-sm font-medium">Criteris d'avaluació:</p>
                    <ul className="text-sm text-muted-foreground mt-1">
                      {currentExercise.content.criteria.map((criterion: string, index: number) => (
                        <li key={index}>• {criterion}</li>
                      ))}
                    </ul>
                  </div>
                </div>
                <Textarea
                  placeholder="Escriu la teva redacció aquí..."
                  className="min-h-[300px]"
                  value={userAnswers['writing'] || ''}
                  onChange={(e) => setUserAnswers(prev => ({ ...prev, writing: e.target.value }))}
                />
                <div className="text-sm text-muted-foreground text-right">
                  Paraules: {userAnswers['writing']?.split(' ').filter(w => w.length > 0).length || 0}
                </div>
              </div>
            )}

            {currentExercise.type === 'reading' && (
              <div className="space-y-4">
                <div className="bg-muted p-4 rounded-lg">
                  <h3 className="font-medium mb-2">Text:</h3>
                  <p className="leading-relaxed">{currentExercise.content.text}</p>
                </div>
                {/* Render questions */}
                {currentExercise.content.questions && currentExercise.content.questions[currentQuestionIndex] && (
                  <div className="space-y-3">
                    <h3 className="font-medium">
                      Pregunta {currentQuestionIndex + 1}: {currentExercise.content.questions[currentQuestionIndex].question}
                    </h3>
                    {currentExercise.content.questions[currentQuestionIndex].options?.map((option: string, index: number) => (
                      <Button
                        key={index}
                        variant={userAnswers[currentExercise.content.questions[currentQuestionIndex].id] === option ? 'default' : 'outline'}
                        className={`w-full justify-start text-left h-auto py-3 ${showAnswers && option === currentExercise.content.questions[currentQuestionIndex].correct
                          ? 'border-2 border-green-500 bg-green-50 dark:bg-green-950'
                          : ''
                          }`}
                        onClick={() => setUserAnswers(prev => ({
                          ...prev,
                          [currentExercise.content.questions[currentQuestionIndex].id]: option
                        }))}
                      >
                        <span className="font-medium mr-3">{String.fromCharCode(65 + index)}.</span>
                        {option}
                        {showAnswers && option === currentExercise.content.questions[currentQuestionIndex].correct && (
                          <span className="ml-auto text-green-600">✓</span>
                        )}
                      </Button>
                    ))}

                    {/* Easter Egg Hint */}
                    {showAnswers && currentExercise.content.questions[currentQuestionIndex].explanation && (
                      <div className="mt-2 p-3 bg-amber-50 dark:bg-amber-950 border border-amber-200 dark:border-amber-800 rounded-lg">
                        <p className="text-sm text-amber-700 dark:text-amber-300">
                          <strong>Explicació:</strong> {currentExercise.content.questions[currentQuestionIndex].explanation}
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* Standard question-answer interface for other types */}
            {(currentExercise.type === 'grammar' || currentExercise.type === 'vocabulary') &&
              currentExercise.content.questions && currentExercise.content.questions[currentQuestionIndex] && (
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">
                    {currentExercise.content.questions[currentQuestionIndex].question}
                  </h3>

                  {currentExercise.content.questions[currentQuestionIndex].type === 'multiple_choice' && (
                    <div className="space-y-3">
                      {currentExercise.content.questions[currentQuestionIndex].options?.map((option: string, index: number) => (
                        <Button
                          key={index}
                          variant={userAnswers[currentExercise.content.questions[currentQuestionIndex].id] === option ? 'default' : 'outline'}
                          className={`w-full justify-start text-left h-auto py-3 ${showAnswers && option === currentExercise.content.questions[currentQuestionIndex].correct
                            ? 'border-2 border-green-500 bg-green-50 dark:bg-green-950'
                            : ''
                            }`}
                          onClick={() => setUserAnswers(prev => ({
                            ...prev,
                            [currentExercise.content.questions[currentQuestionIndex].id]: option
                          }))}
                        >
                          <span className="font-medium mr-3">{String.fromCharCode(65 + index)}.</span>
                          {option}
                          {showAnswers && option === currentExercise.content.questions[currentQuestionIndex].correct && (
                            <span className="ml-auto text-green-600">✓</span>
                          )}
                        </Button>
                      ))}
                    </div>
                  )}

                  {currentExercise.content.questions[currentQuestionIndex].type === 'fill_blank' && (
                    <div className="space-y-2">
                      <Input
                        type="text"
                        placeholder="Escriu la teva resposta..."
                        value={userAnswers[currentExercise.content.questions[currentQuestionIndex].id] || ''}
                        onChange={(e) => setUserAnswers(prev => ({
                          ...prev,
                          [currentExercise.content.questions[currentQuestionIndex].id]: e.target.value
                        }))}
                      />
                      {showAnswers && (
                        <div className="p-2 bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 rounded">
                          <p className="text-sm text-green-700 dark:text-green-300">
                            <strong>Resposta correcta:</strong> {currentExercise.content.questions[currentQuestionIndex].correct}
                          </p>
                        </div>
                      )}
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

              <div className="space-x-2">
                {currentExercise.content.questions && currentQuestionIndex < (currentExercise.content.questions.length - 1) && (
                  <Button
                    onClick={() => setCurrentQuestionIndex(prev => prev + 1)}
                    disabled={currentExercise.content.questions && !userAnswers[currentExercise.content.questions[currentQuestionIndex].id]}
                  >
                    Següent
                  </Button>
                )}

                {(!currentExercise.content.questions || currentQuestionIndex === (currentExercise.content.questions.length - 1)) && (
                  <Button onClick={finishExercise}>
                    Finalitzar
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Results display
  if (showResults && currentExercise) {
    // Get the actual calculated score from the exercise's updated score
    const actualScore = exercises.find(ex => ex.id === currentExercise.id)?.score || 0;

    return (
      <div className="max-w-4xl mx-auto">
        <Card className="shadow-card">
          <CardHeader>
            <div className="text-center space-y-4">
              <Award className="h-16 w-16 mx-auto text-accent" />
              <CardTitle className="text-2xl">Exercici completat!</CardTitle>
              <div className="text-4xl font-bold text-accent">{actualScore}%</div>
              <p className="text-muted-foreground">{currentExercise.title}</p>
            </div>
          </CardHeader>

          <CardContent className="space-y-6">
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

  // Main exercise list interface
  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="space-y-4">
        <div>
          <h2 className="text-3xl font-bold mb-2">Exercicis de Català</h2>
          <p className="text-muted-foreground">
            Exercicis classificats per tipus i nivell per millorar el teu català
          </p>
        </div>

        {/* Filters */}
        <Card>
          <CardContent className="pt-6">
            <div className="grid gap-4 md:grid-cols-4">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Cercar exercicis..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9"
                />
              </div>

              <div>
                <select
                  value={filteredType}
                  onChange={(e) => setFilteredType(e.target.value)}
                  className="w-full p-2 border rounded-md"
                >
                  <option value="all">Tots els tipus</option>
                  <option value="grammar">Gramàtica</option>
                  <option value="vocabulary">Vocabulari</option>
                  <option value="listening">Comprensió Oral</option>
                  <option value="speaking">Expressió Oral</option>
                  <option value="reading">Lectura</option>
                  <option value="writing">Escriptura</option>
                </select>
              </div>

              <div>
                <select
                  value={filteredLevel}
                  onChange={(e) => setFilteredLevel(e.target.value)}
                  className="w-full p-2 border rounded-md"
                >
                  <option value="all">Tots els nivells</option>
                  <option value="A1">A1 - Bàsic</option>
                  <option value="A2">A2 - Elemental</option>
                  <option value="B1">B1 - Intermedi</option>
                  <option value="B2">B2 - Intermedi Alt</option>
                  <option value="C1">C1 - Avançat</option>
                  <option value="C2">C2 - Proficient</option>
                </select>
              </div>

              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Filter className="h-4 w-4" />
                <span>{filterExercises().length} exercicis</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Exercise Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filterExercises().map((exercise) => (
          <Card key={exercise.id} className="shadow-card hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-2">
                  {getExerciseIcon(exercise.type)}
                  <CardTitle className="text-lg line-clamp-2">{exercise.title}</CardTitle>
                </div>
                {exercise.completed && (
                  <CheckCircle className="h-5 w-5 text-success flex-shrink-0" />
                )}
              </div>
              <p className="text-sm text-muted-foreground line-clamp-2">
                {exercise.description}
              </p>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Badge variant="outline">
                    {getTypeLabel(exercise.type)}
                  </Badge>
                </div>
                {exercise.time_limit && (
                  <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    <span>{exercise.time_limit}min</span>
                  </div>
                )}
              </div>
            </CardHeader>

            <CardContent>
              <div className="space-y-3">
                {exercise.completed && exercise.score !== undefined && (
                  <div className="text-center">
                    <div className="text-2xl font-bold text-accent">{exercise.score}%</div>
                    <div className="text-xs text-muted-foreground">Millor puntuació</div>
                  </div>
                )}

                <Button
                  className="w-full"
                  onClick={() => startExercise(exercise)}
                >
                  <Play className="w-4 h-4 mr-2" />
                  {exercise.completed ? 'Repetir' : 'Començar'}
                </Button>

                {exercise.attempts > 0 && (
                  <div className="text-xs text-muted-foreground text-center">
                    Intents: {exercise.attempts}
                    {exercise.max_attempts && ` / ${exercise.max_attempts}`}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filterExercises().length === 0 && (
        <Card>
          <CardContent className="text-center py-16">
            <BookOpen className="h-16 w-16 mx-auto mb-4 text-muted-foreground opacity-50" />
            <h3 className="text-xl font-semibold mb-2">Cap exercici trobat</h3>
            <p className="text-muted-foreground">
              Prova de canviar els filtres o cercar un terme diferent
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};