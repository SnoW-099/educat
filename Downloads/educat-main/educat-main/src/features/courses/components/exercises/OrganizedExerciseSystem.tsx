import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  BookOpen, 
  PenTool, 
  Volume2, 
  FileText,
  Edit3,
  Mic,
  Search,
  Filter,
  CheckCircle,
  XCircle,
  Clock,
  Award,
  Star
} from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useEasterEgg } from '@/hooks/useEasterEgg';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { playDictationAudio, calculateExerciseScore } from '@/utils/exercises';

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

interface OrganizedExerciseSystemProps {
  classId?: string;
}

export const OrganizedExerciseSystem = ({ classId }: OrganizedExerciseSystemProps) => {
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [currentExercise, setCurrentExercise] = useState<Exercise | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<string, string>>({});
  const [timeRemaining, setTimeRemaining] = useState<number | null>(null);
  const [showResults, setShowResults] = useState(false);
  const [loading, setLoading] = useState(true);
  
  // Filters
  const [selectedLevel, setSelectedLevel] = useState<string>('all');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  
  const { profile } = useAuth();
  const { showAnswers, generateAlternativeAnswers } = useEasterEgg(profile?.role || 'student');
  const { toast } = useToast();

  useEffect(() => {
    fetchExercises();
  }, [classId]);

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
      setLoading(true);

      // Fetch ALL exercises (both general and class-specific)
      let exercisesQuery = supabase
        .from('exercises')
        .select('*');

      // If user has a specific class, include both general and class exercises
      if (classId) {
        exercisesQuery = exercisesQuery
          .or(`class_id.is.null,class_id.eq.${classId}`);
      }

      const { data: exercisesData, error } = await exercisesQuery
        .order('level', { ascending: true })
        .order('category', { ascending: true })
        .order('created_at', { ascending: false });

      if (error) throw error;

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

  const getExerciseIcon = (type: string, category: string) => {
    if (category === 'ortografia') return <PenTool className="h-5 w-5" />;
    if (category === 'gramàtica') return <BookOpen className="h-5 w-5" />;
    if (category === 'dictats') return <Volume2 className="h-5 w-5" />;
    if (category === 'comprensió escrita') return <FileText className="h-5 w-5" />;
    if (category === 'vocabulari') return <Edit3 className="h-5 w-5" />;
    if (category === 'expressions') return <Mic className="h-5 w-5" />;
    
    switch (type) {
      case 'grammar': return <BookOpen className="h-5 w-5" />;
      case 'vocabulary': return <Edit3 className="h-5 w-5" />;
      case 'listening': return <Volume2 className="h-5 w-5" />;
      case 'reading': return <FileText className="h-5 w-5" />;
      case 'writing': return <PenTool className="h-5 w-5" />;
      default: return <BookOpen className="h-5 w-5" />;
    }
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

  const getCategoryLabel = (category: string) => {
    const labels: Record<string, string> = {
      'ortografia': 'Ortografia',
      'gramàtica': 'Gramàtica',
      'dictats': 'Dictats',
      'comprensió escrita': 'Comprensió Escrita',
      'vocabulari': 'Vocabulari',
      'expressions': 'Expressions',
      'conjugació': 'Conjugació',
      'grammar': 'Gramàtica',
      'vocabulary': 'Vocabulari',
      'listening': 'Comprensió Oral',
      'reading': 'Lectura',
      'writing': 'Escriptura'
    };
    return labels[category] || category;
  };

  const filterExercises = () => {
    return exercises.filter(exercise => {
      const matchesLevel = selectedLevel === 'all' || exercise.level === selectedLevel;
      const matchesType = selectedType === 'all' || exercise.type === selectedType;
      const matchesCategory = selectedCategory === 'all' || exercise.category === selectedCategory;
      const matchesSearch = searchTerm === '' ||
        exercise.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        exercise.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        getCategoryLabel(exercise.category).toLowerCase().includes(searchTerm.toLowerCase());

      return matchesLevel && matchesType && matchesCategory && matchesSearch;
    });
  };

  const groupExercisesByLevelAndCategory = () => {
    const filtered = filterExercises();
    const grouped: Record<string, Record<string, Exercise[]>> = {};

    filtered.forEach(exercise => {
      if (!grouped[exercise.level]) {
        grouped[exercise.level] = {};
      }
      if (!grouped[exercise.level][exercise.category]) {
        grouped[exercise.level][exercise.category] = [];
      }
      grouped[exercise.level][exercise.category].push(exercise);
    });

    return grouped;
  };

  const startExercise = (exercise: Exercise) => {
    setCurrentExercise(exercise);
    setCurrentQuestionIndex(0);
    setUserAnswers({});
    setShowResults(false);
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
      // Safely get user answers and correct answers
      const userAnswersList = currentExercise.content.map(q => userAnswers[q.id] || '');
      const correctAnswersList = currentExercise.answers || [];
      
      // Calculate score and XP
      const score = Math.round(calculateExerciseScore(userAnswersList, correctAnswersList, currentExercise.category));
      
      // Calculate XP based on level and score
      const levelMultiplier = {
        'A1': 1.2,
        'A2': 1.4,
        'B1': 1.6,
        'B2': 1.8,
        'C1': 2.0,
        'C2': 2.4
      }[currentExercise.level] || 1.2;
      
      const xpEarned = Math.round(score * levelMultiplier);
      
      // Save to database
      const { error } = await supabase
        .from('exercise_attempts')
        .insert({
          exercise_id: currentExercise.id,
          student_id: profile.user_id,
          answers: userAnswers,
          score: score,
          time_taken: currentExercise.time_limit ? 
            (currentExercise.time_limit * 60 - (timeRemaining || 0)) : null,
          attempt_number: 1
        });

      // Update XP in rankings if no error
      if (!error || error.code === '23505') { // 23505 is duplicate key error, which is ok
        await updateStudentXP(profile.user_id, classId, xpEarned);
        
        toast({
          title: "Exercici completat!",
          description: `Has guanyat ${xpEarned} XP (${score}%)`,
        });
      } else {
        console.error('Error saving exercise attempt:', error);
        toast({
          title: "Error",
          description: "No s'ha pogut guardar l'exercici",
          variant: "destructive"
        });
      }

      // Update local state
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

  // Function to update student XP
  const updateStudentXP = async (studentId: string, classId: string | undefined, xpToAdd: number) => {
    if (!classId) return;
    
    const currentMonth = new Date().toISOString().slice(0, 7); // YYYY-MM format
    
    try {
      // First, try to get existing record
      const { data: existingRecord, error: fetchError } = await supabase
        .from('student_xp_rankings')
        .select('*')
        .eq('student_id', studentId)
        .eq('class_id', classId)
        .eq('month_year', currentMonth)
        .maybeSingle();

      if (fetchError) {
        console.error('Error fetching XP record:', fetchError);
        return;
      }

      if (existingRecord) {
        // Update existing record
        const { error: updateError } = await supabase
          .from('student_xp_rankings')
          .update({ 
            xp_points: existingRecord.xp_points + xpToAdd,
            updated_at: new Date().toISOString()
          })
          .eq('id', existingRecord.id);

        if (updateError) {
          console.error('Error updating XP:', updateError);
        }
      } else {
        // Create new record
        const { error: insertError } = await supabase
          .from('student_xp_rankings')
          .insert({
            student_id: studentId,
            class_id: classId,
            month_year: currentMonth,
            xp_points: xpToAdd
          });

        if (insertError) {
          console.error('Error inserting XP:', insertError);
        }
      }
    } catch (error) {
      console.error('Error in updateStudentXP:', error);
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
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Carregant exercicis...</p>
          </div>
        </div>
      </div>
    );
  }

  // Exercise execution view
  if (currentExercise && !showResults) {
    const currentQuestion = currentExercise.content[currentQuestionIndex];
    const progress = ((currentQuestionIndex + 1) / currentExercise.content.length) * 100;

    return (
      <div className="max-w-4xl mx-auto space-y-6">
        <Card className="border-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                {getExerciseIcon(currentExercise.type, currentExercise.category)}
                <div>
                  <CardTitle className="text-xl">{currentExercise.title}</CardTitle>
                  <div className="flex items-center space-x-2 mt-1">
                    <Badge variant="outline">
                      {getCategoryLabel(currentExercise.category)}
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
                <Input
                  type="text"
                  autoComplete="off"
                  autoCorrect="off"
                  spellCheck={false}
                  className="w-full text-lg"
                  placeholder="Escriu la teva resposta..."
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
                <Button 
                  variant="outline" 
                  className="mb-4"
                  onClick={() => playDictationAudio(currentQuestion.correctAnswer as string)}
                >
                  <Volume2 className="h-4 w-4 mr-2" />
                  Reproduir àudio
                </Button>
                <textarea
                  autoComplete="off"
                  autoCorrect="off"
                  spellCheck={false}
                  className="w-full p-4 border-2 rounded-xl focus:ring-2 focus:ring-accent focus:border-accent transition-all duration-200 bg-background resize-none"
                  rows={4}
                  placeholder="Escriu el que has escoltat..."
                  value={userAnswers[currentQuestion.id] || ''}
                  onChange={(e) => answerQuestion(currentQuestion.id, e.target.value)}
                />
                {showAnswers && (
                  <div className="text-sm text-success bg-success/10 p-3 rounded-xl border border-success/20">
                    <div className="font-medium mb-2">Text correcte:</div>
                    <div>{currentQuestion.correctAnswer}</div>
                  </div>
                )}
              </div>
            )}

            <div className="flex justify-between pt-4">
              <Button
                variant="outline"
                onClick={() => setCurrentExercise(null)}
              >
                Sortir
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

  // Results view
  if (showResults && currentExercise) {
    return (
      <div className="max-w-4xl mx-auto">
        <Card>
          <CardHeader>
            <div className="text-center space-y-4">
              <Award className="h-16 w-16 mx-auto text-accent" />
              <CardTitle className="text-2xl">Exercici completat!</CardTitle>
              <div className="text-4xl font-bold text-accent">{currentExercise.score}%</div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-center">
              <Button onClick={() => setCurrentExercise(null)}>
                Tornar als exercicis
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Main exercises list view
  const groupedExercises = groupExercisesByLevelAndCategory();
  const levels = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];
  const categories = [...new Set(exercises.map(ex => ex.category))];
  const types = [...new Set(exercises.map(ex => ex.type))];

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filtres d'Exercicis
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Cerca</label>
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Cerca exercicis..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Nivell</label>
              <Select value={selectedLevel} onValueChange={setSelectedLevel}>
                <SelectTrigger>
                  <SelectValue placeholder="Tots els nivells" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tots els nivells</SelectItem>
                  {levels.map(level => (
                    <SelectItem key={level} value={level}>{level}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Categoria</label>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="Totes les categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Totes les categories</SelectItem>
                  {categories.map(category => (
                    <SelectItem key={category} value={category}>
                      {getCategoryLabel(category)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

          </div>
        </CardContent>
      </Card>

      {/* Exercises organized by level and category */}
      <div className="space-y-6">
        {levels.map(level => {
          if (!groupedExercises[level]) return null;
          
          return (
            <div key={level} className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="h-px bg-border flex-1" />
              </div>
              
              <div className="grid gap-4">
                {Object.entries(groupedExercises[level]).map(([category, categoryExercises]) => (
                  <Card key={category} className="border-l-4 border-l-primary">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-lg">
                        {getExerciseIcon('', category)}
                        {getCategoryLabel(category)}
                        <Badge variant="outline">
                          {categoryExercises.length} exercicis
                        </Badge>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
                        {categoryExercises.map(exercise => (
                          <Card 
                            key={exercise.id} 
                            className="cursor-pointer hover:shadow-md transition-shadow border"
                            onClick={() => startExercise(exercise)}
                          >
                            <CardContent className="p-4">
                              <div className="space-y-2">
                                <h4 className="font-medium text-sm line-clamp-2">
                                  {exercise.title}
                                </h4>
                                <div className="flex items-center justify-between text-xs text-muted-foreground">
                                  {exercise.estimated_duration && (
                                    <span className="flex items-center gap-1">
                                      <Clock className="h-3 w-3" />
                                      {exercise.estimated_duration}min
                                    </span>
                                  )}
                                  {exercise.completed && (
                                    <Badge variant="outline" className="text-xs">
                                      <CheckCircle className="h-3 w-3 mr-1" />
                                      Fet
                                    </Badge>
                                  )}
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {Object.keys(groupedExercises).length === 0 && (
        <Card>
          <CardContent className="text-center py-8">
            <BookOpen className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p className="text-muted-foreground">No s'han trobat exercicis amb aquests filtres</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};