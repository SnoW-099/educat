import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  TrendingUp, 
  TrendingDown, 
  Target, 
  Award, 
  BarChart3, 
  Calendar,
  Clock,
  Brain,
  Zap,
  CheckCircle2
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, PieChart, Pie, Cell } from 'recharts';

interface PerformanceAnalysisProps {
  progress: any;
  exercises: any[];
  xpPoints: number;
  classLevel?: string;
  studentId?: string;
  classId?: string;
}

export const AdvancedPerformanceAnalysis = ({ 
  progress, 
  exercises, 
  xpPoints, 
  classLevel,
  studentId,
  classId
}: PerformanceAnalysisProps) => {
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | '90d'>('30d');
  const [analysisData, setAnalysisData] = useState<any>(null);
  const [realTimeData, setRealTimeData] = useState<any>(null);
  const [exerciseStreak, setExerciseStreak] = useState(0);

  useEffect(() => {
    if (studentId && classId) {
      fetchRealData();
    } else {
      generateAdvancedAnalysis();
    }

    // Set up real-time listeners for updates
    const exerciseAttemptsChannel = supabase
      .channel('exercise-attempts-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'exercise_attempts',
          filter: `student_id=eq.${studentId}`
        },
        () => {
          // Refetch data when exercise attempts change
          if (studentId && classId) {
            fetchRealData();
          }
        }
      )
      .subscribe();

    const xpRankingsChannel = supabase
      .channel('xp-rankings-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'student_xp_rankings',
          filter: `student_id=eq.${studentId}`
        },
        () => {
          // Refetch data when XP changes
          if (studentId && classId) {
            fetchRealData();
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(exerciseAttemptsChannel);
      supabase.removeChannel(xpRankingsChannel);
    };
  }, [progress, exercises, timeRange, studentId, classId]);

  const fetchRealData = async () => {
    if (!studentId || !classId) return;
    
    try {
      // Fetch real exercise attempts for the last 30 days
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
      
      const { data: attempts } = await supabase
        .from('exercise_attempts')
        .select(`
          *,
          exercises!inner(
            type,
            level,
            class_id
          )
        `)
        .eq('student_id', studentId)
        .eq('exercises.class_id', classId)
        .gte('completed_at', thirtyDaysAgo.toISOString())
        .order('completed_at', { ascending: true });

      // Fetch current progress (skill balance) - starts from zero
      const { data: currentProgress } = await supabase
        .from('student_progress')
        .select('*')
        .eq('student_id', studentId)
        .eq('class_id', classId)
        .single();

      // Fetch current month XP data
      const currentMonth = new Date().toISOString().slice(0, 7);
      const { data: currentXpData } = await supabase
        .from('student_xp_rankings')
        .select('*')
        .eq('student_id', studentId)
        .eq('class_id', classId)
        .eq('month_year', currentMonth)
        .single();

      // Fetch all-time XP (global score)
      const { data: allTimeXpData } = await supabase
        .from('student_xp_rankings')
        .select('xp_points')
        .eq('student_id', studentId)
        .eq('class_id', classId);

      // Fetch all exercises for completion tracking
      const { data: allExercises } = await supabase
        .from('exercises')
        .select('id, level, type')
        .eq('class_id', classId);

      // Get completed exercises (100% score only)
      const { data: completedExercises } = await supabase
        .from('exercise_attempts')
        .select('exercise_id, score')
        .eq('student_id', studentId)
        .eq('score', 100);

      const completedExerciseIds = new Set(completedExercises?.map(ex => ex.exercise_id) || []);
      const completedCount = allExercises?.filter(ex => completedExerciseIds.has(ex.id)).length || 0;

      // Calculate exercise streak
      const today = new Date();
      let streak = 0;
      for (let i = 0; i < 30; i++) {
        const checkDate = new Date(today);
        checkDate.setDate(checkDate.getDate() - i);
        const dateStr = checkDate.toISOString().split('T')[0];
        
        const hasExerciseOnDate = attempts?.some(attempt => 
          attempt.completed_at.startsWith(dateStr)
        );
        
        if (hasExerciseOnDate) {
          streak++;
        } else if (i === 0) {
          // If no exercise today, streak is broken
          break;
        } else if (streak === 0) {
          // Continue checking backwards
          continue;
        } else {
          // Streak broken
          break;
        }
      }
      
      setExerciseStreak(streak);
      
      const totalXpAllTime = allTimeXpData?.reduce((sum, record) => sum + record.xp_points, 0) || 0;
      const currentMonthXp = currentXpData?.xp_points || 0;
      
      setRealTimeData({ 
        attempts: attempts || [], 
        currentMonthXp,
        totalXpAllTime,
        completedCount,
        totalExercises: allExercises?.length || 0,
        skillBalance: currentProgress || {
          grammar_score: 0,
          vocabulary_score: 0,
          listening_score: 0,
          speaking_score: 0,
          reading_score: 0,
          writing_score: 0,
          overall_score: 0
        }
      });
      generateAdvancedAnalysis(attempts || [], currentMonthXp, totalXpAllTime, completedCount, allExercises?.length || 0, currentProgress);
    } catch (error) {
      console.error('Error fetching real data:', error);
      generateAdvancedAnalysis();
    }
  };

  const generateAdvancedAnalysis = (
    realAttempts?: any[], 
    currentMonthXp?: number, 
    totalXpAllTime?: number, 
    completedCount?: number, 
    totalCount?: number,
    skillBalance?: any
  ) => {
    const timeData = Array.from({ length: 30 }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - (29 - i));
      const dateStr = date.toISOString().split('T')[0];
      
      // Use real data if available
      let dayScore = 0;
      let exerciseCount = 0;
      let dayXp = 0;
      
      if (realAttempts) {
        const dayAttempts = realAttempts.filter(attempt => 
          attempt.completed_at.startsWith(dateStr)
        );
        
        if (dayAttempts.length > 0) {
          dayScore = dayAttempts.reduce((sum, attempt) => sum + attempt.score, 0) / dayAttempts.length;
          exerciseCount = dayAttempts.length;
        }
      } else {
        // Fallback to simulated data
        const baseScore = progress?.overall_score || 0;
        const variationRange = 10;
        const trendFactor = i * 0.3;
        dayScore = Math.max(0, Math.min(100, 
          baseScore + (Math.random() - 0.5) * variationRange + trendFactor
        ));
        exerciseCount = exercises.length > 0 ? Math.min(exercises.length, Math.floor(dayScore / 25) + 1) : 0;
      }
      
      // Calculate XP based on real data or simulation
      if (currentMonthXp !== undefined) {
        dayXp = Math.round(currentMonthXp / 30); // Distribute monthly XP across 30 days
      } else {
        dayXp = Math.round(dayScore * 2 + Math.random() * 50);
      }
      
      return {
        day: i + 1,
        date: dateStr,
        score: Math.round(dayScore),
        exercises: exerciseCount,
        xp: Math.round(dayXp / 30) // Distribute XP across days
      };
    });

    // Calculate category strengths and weaknesses based on real skill balance (starting from zero)
    const actualProgress = skillBalance || progress || {
      grammar_score: 0,
      vocabulary_score: 0,
      listening_score: 0,
      speaking_score: 0,
      reading_score: 0,
      writing_score: 0,
      overall_score: 0
    };

    // Count attempts by category to determine trend
    const categoryAttempts = realAttempts ? {
      grammar: realAttempts.filter(a => a.exercises?.type === 'grammar').length,
      vocabulary: realAttempts.filter(a => a.exercises?.type === 'vocabulary').length,
      reading: realAttempts.filter(a => a.exercises?.type === 'reading').length,
      writing: realAttempts.filter(a => a.exercises?.type === 'writing').length,
      listening: realAttempts.filter(a => a.exercises?.type === 'listening').length,
      speaking: realAttempts.filter(a => a.exercises?.type === 'speaking').length,
    } : { grammar: 0, vocabulary: 0, reading: 0, writing: 0, listening: 0, speaking: 0 };

    const categoryData = [
      { 
        category: 'Gramàtica', 
        score: actualProgress.grammar_score || 0,
        exercises: categoryAttempts.grammar,
        trend: (actualProgress.grammar_score || 0) > 60 ? 'up' : 'down',
        improvement: Math.max(0, (actualProgress.grammar_score || 0) - 30)
      },
      { 
        category: 'Vocabulari', 
        score: actualProgress.vocabulary_score || 0,
        exercises: categoryAttempts.vocabulary,
        trend: (actualProgress.vocabulary_score || 0) > 60 ? 'up' : 'down',
        improvement: Math.max(0, (actualProgress.vocabulary_score || 0) - 30)
      },
      { 
        category: 'Lectura', 
        score: actualProgress.reading_score || 0,
        exercises: categoryAttempts.reading,
        trend: (actualProgress.reading_score || 0) > 60 ? 'up' : 'down',
        improvement: Math.max(0, (actualProgress.reading_score || 0) - 30)
      },
      { 
        category: 'Escriptura', 
        score: actualProgress.writing_score || 0,
        exercises: categoryAttempts.writing,
        trend: (actualProgress.writing_score || 0) > 60 ? 'up' : 'down',
        improvement: Math.max(0, (actualProgress.writing_score || 0) - 30)
      },
      { 
        category: 'Oral', 
        score: Math.round(((actualProgress.listening_score || 0) + (actualProgress.speaking_score || 0)) / 2),
        exercises: categoryAttempts.listening + categoryAttempts.speaking,
        trend: (((actualProgress.listening_score || 0) + (actualProgress.speaking_score || 0)) / 2) > 60 ? 'up' : 'down',
        improvement: Math.max(0, (((actualProgress.listening_score || 0) + (actualProgress.speaking_score || 0)) / 2) - 30)
      }
    ];

    // Radar chart data for skill balance
    const radarData = categoryData.map(cat => ({
      skill: cat.category,
      score: cat.score,
      target: 85 // Target score
    }));

    // Learning patterns analysis based on actual data
    const totalScore = categoryData.reduce((sum, cat) => sum + cat.score, 0) / categoryData.length;
    const learningPatterns = {
      preferredTime: 'Matí', // Could be determined by usage analytics
      avgSessionTime: Math.max(10, Math.min(60, Math.round(totalScore / 2) + 15)),
      consistency: Math.min(100, Math.max(0, Math.round(totalScore * 0.8 + 20))),
      difficulty: classLevel || 'B1'
    };

    // Use real data when available
    const actualGlobalScore = totalXpAllTime || 0;
    const actualCompletedExercises = completedCount || 0;
    const actualTotalExercises = totalCount || exercises.length;
    const actualCurrentMonthXp = currentMonthXp || 0;

    setAnalysisData({
      timeData,
      categoryData,
      radarData,
      learningPatterns,
      globalScore: actualGlobalScore,
      currentMonthXp: actualCurrentMonthXp,
      completedExercises: actualCompletedExercises,
      totalExercises: actualTotalExercises
    });
  };

  if (!analysisData) {
    return <div>Carregant anàlisi...</div>;
  }

  const COLORS = ['hsl(var(--primary))', 'hsl(var(--secondary))', 'hsl(var(--accent))', 'hsl(var(--muted))'];

  return (
    <div className="space-y-6">
      {/* Header with key metrics */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="bg-gradient-subtle">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Puntuació Global</CardTitle>
            <Target className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{analysisData.globalScore.toLocaleString()}</div>
            <div className="flex items-center space-x-1 text-xs text-muted-foreground">
              {analysisData.globalScore > 1000 ? (
                <>
                  <TrendingUp className="h-3 w-3 text-green-500" />
                  <span>XP acumulada total</span>
                </>
              ) : (
                <>
                  <TrendingDown className="h-3 w-3 text-orange-500" />
                  <span>Continua practicant</span>
                </>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">XP (30 dies)</CardTitle>
            <Award className="h-4 w-4 text-accent" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-accent">{analysisData.currentMonthXp.toLocaleString()}</div>
            <div className="text-xs text-muted-foreground">
              Aquest mes
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Exercicis</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-accent" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analysisData.completedExercises}/{analysisData.totalExercises}</div>
            <Progress 
              value={(analysisData.completedExercises / analysisData.totalExercises) * 100} 
              className="mt-2 h-2" 
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Ratxa d'Estudi</CardTitle>
            <Zap className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-500">{exerciseStreak}</div>
            <div className="text-xs text-muted-foreground">
              {exerciseStreak === 1 ? 'dia consecutiu' : 'dies consecutius'}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-6">
        {/* Performance Radar */}
        <Card>
          <CardHeader>
            <CardTitle>Equilibri d'Habilitats</CardTitle>
            <CardDescription>Visualització del teu perfil d'aprenentatge</CardDescription>
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

        {/* Progress Over Time */}
        <Card>
          <CardHeader>
            <CardTitle>Evolució de Puntuacions</CardTitle>
            <CardDescription>El teu progrés durant els darrers 30 dies</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={analysisData.timeData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
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

        {/* XP Progress */}
        <Card>
          <CardHeader>
            <CardTitle>Guanys d'XP Diaris</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={analysisData.timeData.slice(-7)}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="day" 
                    tickFormatter={(value) => `Dia ${value}`}
                  />
                  <YAxis />
                  <Tooltip 
                    labelFormatter={(value) => `Dia ${value}`}
                    formatter={(value) => [`${value} XP`, 'Punts XP']}
                  />
                  <Bar dataKey="xp" fill="hsl(var(--accent))" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};