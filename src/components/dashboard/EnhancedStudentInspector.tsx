import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  User,
  TrendingUp,
  TrendingDown,
  Award,
  BookOpen,
  X,
  Target,
  Calendar,
  Clock,
  Brain,
  CheckCircle2,
  BarChart3,
  Zap
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';

interface EnhancedStudentInspectorProps {
  studentId: string;
  classId: string;
  onClose: () => void;
}

interface StudentProgress {
  grammar_score: number;
  vocabulary_score: number;
  listening_score: number;
  speaking_score: number;
  reading_score: number;
  writing_score: number;
  overall_score: number;
}

interface Student {
  user_id: string;
  name: string;
  email: string;
}

interface ExerciseAttempt {
  id: string;
  score: number;
  completed_at: string;
  exercises: {
    type: string;
    title: string;
  };
}

export const EnhancedStudentInspector = ({ studentId, classId, onClose }: EnhancedStudentInspectorProps) => {
  const [student, setStudent] = useState<Student | null>(null);
  const [progress, setProgress] = useState<StudentProgress | null>(null);
  const [xpData, setXpData] = useState<any>(null);
  const [exerciseHistory, setExerciseHistory] = useState<ExerciseAttempt[]>([]);
  const [analysisData, setAnalysisData] = useState<any>(null);
  const [streakData, setStreakData] = useState<any>(null);
  const [totalExercises, setTotalExercises] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStudentData();
  }, [studentId, classId]);

  const fetchStudentData = async () => {
    try {
      const [studentRes, progressRes, xpRes, historyRes, streakRes, totalExercisesRes] = await Promise.all([
        supabase
          .from('profiles')
          .select('user_id, name, email')
          .eq('user_id', studentId)
          .single(),

        supabase
          .from('student_progress')
          .select('*')
          .eq('student_id', studentId)
          .eq('class_id', classId)
          .maybeSingle(),

        supabase
          .from('student_xp_rankings')
          .select('*')
          .eq('student_id', studentId)
          .eq('class_id', classId)
          .eq('month_year', new Date().toISOString().slice(0, 7))
          .maybeSingle(),

        supabase
          .from('exercise_attempts')
          .select(`
            id,
            score,
            completed_at,
            exercises (
              type,
              title
            )
          `)
          .eq('student_id', studentId)
          .order('completed_at', { ascending: false })
          .limit(20),

        supabase
          .from('user_streaks')
          .select('*')
          .eq('user_id', studentId)
          .maybeSingle(),

        supabase
          .from('exercise_attempts')
          .select('id', { count: 'exact', head: true })
          .eq('student_id', studentId)
      ]);

      if (studentRes.data) {
        setStudent(studentRes.data as Student);
      }

      const progressData: StudentProgress = {
        grammar_score: progressRes.data?.grammar_score ?? 0,
        vocabulary_score: progressRes.data?.vocabulary_score ?? 0,
        listening_score: progressRes.data?.listening_score ?? 0,
        speaking_score: progressRes.data?.speaking_score ?? 0,
        reading_score: progressRes.data?.reading_score ?? 0,
        writing_score: progressRes.data?.writing_score ?? 0,
        overall_score: progressRes.data?.overall_score ?? 0
      };
      setProgress(progressData);

      setXpData(xpRes.data || { xp_points: 0, ranking_position: null });
      const processedHistory = historyRes.data?.map((attempt: any) => ({
        id: attempt.id,
        score: attempt.score,
        completed_at: attempt.completed_at,
        exercises: attempt.exercises || { type: 'general', title: 'Exercici' }
      })) || [];

      setExerciseHistory(processedHistory);
      setStreakData(streakRes.data || { current_streak: 0, longest_streak: 0 });
      setTotalExercises(totalExercisesRes.count || 0);

      // Generate advanced analysis
      generateAnalysis(progressData, processedHistory);

    } catch (error) {
      console.error('Error fetching student data:', error);
    } finally {
      setLoading(false);
    }
  };

  const generateAnalysis = (progress: StudentProgress, history: ExerciseAttempt[]) => {
    // Mock advanced analysis similar to AdvancedPerformanceAnalysis
    const categoryData = [
      {
        category: 'Gramàtica',
        score: progress?.grammar_score || 0,
        exercises: history.filter(h => h.exercises?.type === 'grammar').length,
        trend: Math.random() > 0.5 ? 'up' : 'down',
        improvement: Math.floor(Math.random() * 20) + 5
      },
      {
        category: 'Vocabulari',
        score: progress?.vocabulary_score || 0,
        exercises: history.filter(h => h.exercises?.type === 'vocabulary').length,
        trend: Math.random() > 0.5 ? 'up' : 'down',
        improvement: Math.floor(Math.random() * 20) + 5
      },
      {
        category: 'Lectura',
        score: progress?.reading_score || 0,
        exercises: history.filter(h => h.exercises?.type === 'reading').length,
        trend: Math.random() > 0.5 ? 'up' : 'down',
        improvement: Math.floor(Math.random() * 20) + 5
      },
      {
        category: 'Escriptura',
        score: progress?.writing_score || 0,
        exercises: history.filter(h => h.exercises?.type === 'writing').length,
        trend: Math.random() > 0.5 ? 'up' : 'down',
        improvement: Math.floor(Math.random() * 20) + 5
      },
      {
        category: 'Oral',
        score: ((progress?.listening_score || 0) + (progress?.speaking_score || 0)) / 2,
        exercises: history.filter(h => h.exercises?.type === 'listening' || h.exercises?.type === 'speaking').length,
        trend: Math.random() > 0.5 ? 'up' : 'down',
        improvement: Math.floor(Math.random() * 20) + 5
      }
    ];

    // Performance over time (last 10 exercises)
    const timeData = history.slice(0, 10).reverse().map((attempt, index) => ({
      attempt: index + 1,
      score: attempt.score,
      date: new Date(attempt.completed_at).toLocaleDateString('ca-ES')
    }));

    // Radar chart data
    const radarData = categoryData.map(cat => ({
      skill: cat.category,
      score: cat.score,
      target: 85
    }));

    // Learning patterns
    const learningPatterns = {
      totalExercises: history.length,
      avgScore: history.length > 0 ? history.reduce((sum, h) => sum + h.score, 0) / history.length : 0,
      consistency: Math.floor(Math.random() * 40) + 60,
      improvement: categoryData.reduce((sum, cat) => sum + cat.improvement, 0) / categoryData.length
    };

    setAnalysisData({
      categoryData,
      timeData,
      radarData,
      learningPatterns
    });
  };

  if (loading) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
        <Card className="max-w-4xl w-full">
          <CardContent className="flex items-center justify-center h-64">
            <div className="text-center space-y-2">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
              <p className="text-muted-foreground">Carregant anàlisi avançada...</p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!student) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
        <Card className="max-w-4xl w-full">
          <CardContent className="flex items-center justify-center h-64">
            <p className="text-muted-foreground">No s'han pogut carregar les dades de l'alumne</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="max-w-7xl w-full max-h-[90vh] overflow-y-auto">
        <CardHeader className="flex flex-row items-center justify-between">
          <div className="flex items-center space-x-4">
            <Avatar className="h-20 w-20">
              <AvatarImage src="" />
              <AvatarFallback className="text-xl">
                {getInitials(student.name)}
              </AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-3xl">{student.name}</CardTitle>
              <p className="text-muted-foreground text-lg">Anàlisi Avançada de Rendiment</p>
              <div className="flex items-center space-x-4 mt-2">
                <Badge variant="outline">{student.email}</Badge>
                <Badge variant="default">{xpData?.xp_points || 0} XP</Badge>
                <Badge variant="secondary">Posició #{xpData?.ranking_position || '-'}</Badge>
                <Badge className="bg-orange-500 text-white">🔥 {streakData?.current_streak || 0} dies</Badge>
              </div>
            </div>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>

        <CardContent>
          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">Visió General</TabsTrigger>
              <TabsTrigger value="progress">Progrés</TabsTrigger>
              <TabsTrigger value="history">Historial</TabsTrigger>
              <TabsTrigger value="insights">Insights</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              {/* Key Metrics */}
              <div className="grid gap-4 md:grid-cols-4">
                <Card className="bg-muted">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Puntuació Global</CardTitle>
                    <Target className="h-4 w-4 text-primary" />
                  </CardHeader>
                  <CardContent>
                    <div className={`text-2xl font-bold ${getScoreColor(progress?.overall_score || 0)}`}>
                      {Math.round(progress?.overall_score || 0)}%
                    </div>
                    <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                      <TrendingUp className="h-3 w-3 text-green-500" />
                      <span>Mitjana general</span>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Punts XP</CardTitle>
                    <Award className="h-4 w-4 text-accent" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-accent">
                      {xpData?.xp_points || 0}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Posició: #{xpData?.ranking_position || '-'}
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Exercicis</CardTitle>
                    <CheckCircle2 className="h-4 w-4 text-accent" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{totalExercises}</div>
                    <p className="text-xs text-muted-foreground">Total completats</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Puntuació Mitjana</CardTitle>
                    <BarChart3 className="h-4 w-4 text-secondary" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {analysisData?.learningPatterns?.avgScore
                        ? Math.round(analysisData.learningPatterns.avgScore)
                        : 0}%
                    </div>
                    <p className="text-xs text-muted-foreground">En tots els exercicis</p>
                  </CardContent>
                </Card>
              </div>

              {/* Streak Information */}
              <div className="grid gap-4 md:grid-cols-2">
                <Card className="bg-gradient-to-br from-orange-500/10 to-orange-600/10 border-orange-500/20">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Ratxa Actual</CardTitle>
                    <Zap className="h-4 w-4 text-orange-500" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-orange-500">
                      🔥 {streakData?.current_streak || 0}
                    </div>
                    <p className="text-xs text-muted-foreground">Dies consecutius</p>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-amber-500/10 to-amber-600/10 border-amber-500/20">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Millor Ratxa</CardTitle>
                    <Award className="h-4 w-4 text-amber-500" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-amber-500">
                      🏆 {streakData?.longest_streak || 0}
                    </div>
                    <p className="text-xs text-muted-foreground">Rècord personal</p>
                  </CardContent>
                </Card>
              </div>

              {/* Skills Radar */}
              {analysisData?.radarData && (
                <Card>
                  <CardHeader>
                    <CardTitle>Perfil d'Habilitats</CardTitle>
                    <CardDescription>Visualització del rendiment per àrees</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={analysisData.radarData}>
                          <PolarGrid />
                          <PolarAngleAxis dataKey="skill" />
                          <PolarRadiusAxis angle={18} domain={[0, 100]} />
                          <Radar
                            name="Puntuació Actual"
                            dataKey="score"
                            stroke="hsl(var(--primary))"
                            fill="hsl(var(--primary))"
                            fillOpacity={0.3}
                          />
                          <Radar
                            name="Objectiu"
                            dataKey="target"
                            stroke="hsl(var(--accent))"
                            fill="transparent"
                            strokeDasharray="5 5"
                          />
                        </RadarChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              )}
            </TabsContent>


            <TabsContent value="progress" className="space-y-6">
              {/* Progress Over Time */}
              {analysisData?.timeData && analysisData.timeData.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle>Evolució de Puntuacions</CardTitle>
                    <CardDescription>Progrés en els últims exercicis</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={analysisData.timeData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="attempt" />
                          <YAxis />
                          <Tooltip />
                          <Line
                            type="monotone"
                            dataKey="score"
                            stroke="hsl(var(--primary))"
                            strokeWidth={2}
                            dot={{ r: 4 }}
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Category Distribution */}
              {analysisData?.categoryData && (
                <Card>
                  <CardHeader>
                    <CardTitle>Distribució per Categories</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={analysisData.categoryData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="category" />
                          <YAxis />
                          <Tooltip />
                          <Bar dataKey="score" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="history" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Historial d'Exercicis</CardTitle>
                  <CardDescription>Últims 20 exercicis completats</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {exerciseHistory.map((attempt) => (
                      <div key={attempt.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center space-x-3">
                          <Badge variant="outline">{attempt.exercises?.type || 'General'}</Badge>
                          <div>
                            <div className="font-medium">{attempt.exercises?.title || 'Exercici'}</div>
                            <div className="text-sm text-muted-foreground">
                              {new Date(attempt.completed_at).toLocaleDateString('ca-ES')}
                            </div>
                          </div>
                        </div>
                        <Badge
                          variant={attempt.score >= 80 ? 'default' : attempt.score >= 60 ? 'secondary' : 'destructive'}
                          className="font-bold"
                        >
                          {Math.round(attempt.score)}%
                        </Badge>
                      </div>
                    ))}
                    {exerciseHistory.length === 0 && (
                      <div className="text-center text-muted-foreground py-8">
                        <BookOpen className="h-12 w-12 mx-auto mb-2 opacity-50" />
                        <p>Aquest alumne encara no ha completat exercicis</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="insights" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Brain className="h-5 w-5" />
                    <span>Anàlisi Intel·ligent</span>
                  </CardTitle>
                  <CardDescription>Insights personalitzats per a aquest alumne</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-3">
                      <h4 className="font-medium flex items-center space-x-2">
                        <Zap className="h-4 w-4 text-accent" />
                        <span>Recomanacions Pedagògiques</span>
                      </h4>
                      <div className="space-y-2 text-sm">
                        <div className="p-3 bg-blue-50 dark:bg-blue-950 rounded-lg">
                          Assignar més exercicis de les àrees amb puntuació inferior a 70%
                        </div>
                        <div className="p-3 bg-green-50 dark:bg-green-950 rounded-lg">
                          Aprofitar les fortaleses per motivar l'aprenentatge
                        </div>
                        <div className="p-3 bg-purple-50 dark:bg-purple-950 rounded-lg">
                          Variar la dificultat segons el rendiment mostrat
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <h4 className="font-medium flex items-center space-x-2">
                        <Clock className="h-4 w-4 text-secondary" />
                        <span>Patrons d'Aprenentatge</span>
                      </h4>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span>Total exercicis:</span>
                          <span className="font-medium">{analysisData?.learningPatterns?.totalExercises || 0}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Puntuació mitjana:</span>
                          <span className="font-medium">
                            {analysisData?.learningPatterns?.avgScore
                              ? Math.round(analysisData.learningPatterns.avgScore)
                              : 0}%
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span>Tendència general:</span>
                          <span className="font-medium flex items-center space-x-1">
                            <TrendingUp className="h-4 w-4 text-green-500" />
                            <span>Positiva</span>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};