import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  TrendingUp,
  Target,
  Brain,
  BarChart3,
  Calendar,
  RefreshCw,
  Download,
  Settings
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { EnhancedSkillsRadar } from './EnhancedSkillsRadar';
import { AdvancedMetricsGrid } from './AdvancedMetricsGrid';
import { AdvancedXPChart } from './AdvancedXPChart';
import { LearningInsights } from './LearningInsights';

interface ProfessionalAnalysisDashboardProps {
  progress: any;
  exercises: any[];
  xpPoints: number;
  classLevel?: string;
  studentId?: string;
  classId?: string;
  orthographyProgress?: {
    completed: number;
    total: number;
    byDifficulty: { [key: number]: number };
    xpFromOrthography: number;
  };
}

interface AnalysisData {
  skillBalance: any;
  exerciseStreak: number;
  totalXpAllTime: number;
  currentMonthXp: number;
  completedExercises: number;
  totalExercises: number;
  attempts: any[];
  learningPatterns: {
    preferredTime: string;
    avgSessionTime: number;
    consistency: number;
    difficulty: string;
    weeklyGoal: number;
    achievementRate: number;
  };
  predictions: {
    nextLevelProgress: number;
    estimatedTimeToLevel: string;
    recommendedFocus: string[];
  };
}

export const ProfessionalAnalysisDashboard = ({
  progress,
  exercises,
  xpPoints,
  classLevel,
  studentId,
  classId,
  orthographyProgress
}: ProfessionalAnalysisDashboardProps) => {
  const [analysisData, setAnalysisData] = useState<AnalysisData | null>(null);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());
  const [activeTab, setActiveTab] = useState('overview');
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    if (studentId && classId) {
      fetchAnalysisData();
      setupRealTimeListeners();
    } else {
      generateMockData();
    }
  }, [studentId, classId]);

  const setupRealTimeListeners = () => {
    if (!studentId) return;

    const channels = [
      supabase
        .channel(`analysis-attempts-${studentId}`)
        .on(
          'postgres_changes',
          { event: '*', schema: 'public', table: 'exercise_attempts', filter: `student_id=eq.${studentId}` },
          () => handleRealtimeUpdate()
        ),
      supabase
        .channel(`analysis-progress-${studentId}`)
        .on(
          'postgres_changes',
          { event: '*', schema: 'public', table: 'student_progress', filter: `student_id=eq.${studentId}` },
          () => handleRealtimeUpdate()
        ),
      supabase
        .channel(`analysis-xp-${studentId}`)
        .on(
          'postgres_changes',
          { event: '*', schema: 'public', table: 'student_xp_rankings', filter: `student_id=eq.${studentId}` },
          () => handleRealtimeUpdate()
        )
    ];

    channels.forEach(channel => channel.subscribe());

    return () => {
      channels.forEach(channel => supabase.removeChannel(channel));
    };
  };

  const handleRealtimeUpdate = async () => {
    console.log('[ProfessionalAnalysis] Real-time update detected');
    await new Promise(resolve => setTimeout(resolve, 1000)); // Debounce
    await fetchAnalysisData();
  };

  const fetchAnalysisData = async () => {
    if (!studentId || !classId) return;

    try {
      setLoading(true);

      const [
        attemptsResult,
        progressResult,
        xpResult,
        exercisesResult,
        completedResult
      ] = await Promise.all([
        fetchExerciseAttempts(),
        fetchStudentProgress(),
        fetchXPData(),
        fetchAllExercises(),
        fetchCompletedExercises()
      ]);

      const skillBalance = calculateSkillBalance(attemptsResult.data || []);
      const exerciseStreak = calculateExerciseStreak(attemptsResult.data || []);
      const learningPatterns = analyzeLearningPatterns(attemptsResult.data || []);
      const predictions = generatePredictions(skillBalance, learningPatterns, exerciseStreak);

      const analysisData: AnalysisData = {
        skillBalance,
        exerciseStreak,
        totalXpAllTime: xpResult.totalXp,
        currentMonthXp: xpResult.currentMonthXp,
        completedExercises: completedResult.count,
        totalExercises: exercisesResult.total,
        attempts: attemptsResult.data || [],
        learningPatterns,
        predictions
      };

      setAnalysisData(analysisData);
      setLastUpdated(new Date());

      console.log('[ProfessionalAnalysis] Analysis data updated:', analysisData);
    } catch (error) {
      console.error('[ProfessionalAnalysis] Error fetching data:', error);
      generateMockData();
    } finally {
      setLoading(false);
    }
  };

  const fetchExerciseAttempts = async () => {
    const ninetyDaysAgo = new Date();
    ninetyDaysAgo.setDate(ninetyDaysAgo.getDate() - 90);

    return await supabase
      .from('exercise_attempts')
      .select(`
        *,
        exercises!inner(
          id,
          type,
          level,
          class_id
        )
      `)
      .eq('student_id', studentId || '')
      .gte('completed_at', ninetyDaysAgo.toISOString())
      .order('completed_at', { ascending: false });
  };

  const fetchStudentProgress = async () => {
    return await supabase
      .from('student_progress')
      .select('*')
      .eq('student_id', studentId || '')
      .eq('class_id', classId || '')
      .single();
  };

  const fetchXPData = async () => {
    const allTimeData = await supabase
      .from('student_xp_rankings')
      .select('xp_points, month_year')
      .eq('student_id', studentId || '')
      .eq('class_id', classId || '');

    const currentMonth = new Date().toISOString().slice(0, 7);
    const totalXp = allTimeData.data?.reduce((sum, record) => sum + record.xp_points, 0) || 0;
    const currentMonthXp = allTimeData.data?.find(record => record.month_year === currentMonth)?.xp_points || 0;

    return { totalXp, currentMonthXp };
  };

  const fetchAllExercises = async () => {
    const result = await supabase
      .from('exercises')
      .select('id, level, type, class_id')
      .or(`class_id.eq.${classId || ''},class_id.is.null`);

    return { total: result.data?.length || 0 };
  };

  const fetchCompletedExercises = async () => {
    const result = await supabase
      .from('exercise_attempts')
      .select('exercise_id')
      .eq('student_id', studentId || '')
      .gte('score', 80);

    const uniqueCompleted = new Set(result.data?.map(ex => ex.exercise_id) || []);
    return { count: uniqueCompleted.size };
  };

  const calculateSkillBalance = (attempts: any[]) => {
    if (!attempts.length) return {
      grammar_score: 0,
      vocabulary_score: 0,
      listening_score: 0,
      speaking_score: 0,
      reading_score: 0,
      writing_score: 0,
      overall_score: 0
    };

    const skillGroups = attempts.reduce((acc, attempt) => {
      const type = attempt.exercises?.type;
      if (!acc[type]) acc[type] = [];
      acc[type].push(attempt.score);
      return acc;
    }, {} as Record<string, number[]>);

    const skillScores = {
      grammar_score: 0,
      vocabulary_score: 0,
      listening_score: 0,
      speaking_score: 0,
      reading_score: 0,
      writing_score: 0,
      overall_score: 0
    };

    Object.keys(skillGroups).forEach(type => {
      const scores = skillGroups[type];
      const average = scores.reduce((sum: number, score: number) => sum + score, 0) / scores.length;

      switch (type) {
        case 'grammar':
          skillScores.grammar_score = Math.round(average);
          break;
        case 'vocabulary':
          skillScores.vocabulary_score = Math.round(average);
          break;
        case 'listening':
          skillScores.listening_score = Math.round(average);
          break;
        case 'speaking':
          skillScores.speaking_score = Math.round(average);
          break;
        case 'reading':
          skillScores.reading_score = Math.round(average);
          break;
        case 'writing':
          skillScores.writing_score = Math.round(average);
          break;
      }
    });

    const allScores = Object.values(skillScores).slice(0, -1).filter(score => score > 0);
    skillScores.overall_score = allScores.length > 0
      ? Math.round(allScores.reduce((sum: number, score: number) => sum + score, 0) / allScores.length)
      : 0;

    return skillScores;
  };

  const calculateExerciseStreak = (attempts: any[]) => {
    if (!attempts.length) return 0;

    const today = new Date();
    const attemptsByDate = new Map<string, boolean>();

    attempts.forEach(attempt => {
      if (attempt.completed_at) {
        const dateStr = attempt.completed_at.split('T')[0];
        attemptsByDate.set(dateStr, true);
      }
    });

    let streak = 0;
    for (let i = 0; i < 90; i++) {
      const checkDate = new Date(today);
      checkDate.setDate(checkDate.getDate() - i);
      const dateStr = checkDate.toISOString().split('T')[0];

      if (attemptsByDate.has(dateStr)) {
        streak++;
      } else if (i === 0) {
        streak = 0;
        break;
      } else {
        break;
      }
    }

    return streak;
  };

  const analyzeLearningPatterns = (attempts: any[]) => {
    if (!attempts.length) return {
      preferredTime: 'Matí',
      avgSessionTime: 15,
      consistency: 0,
      difficulty: classLevel || 'B1',
      weeklyGoal: 100,
      achievementRate: 0
    };

    // Analyze preferred time based on attempts
    const timePatterns = attempts.reduce((acc, attempt) => {
      const hour = new Date(attempt.completed_at).getHours();
      const period = hour < 12 ? 'Matí' : hour < 18 ? 'Tarda' : 'Nit';
      acc[period] = (acc[period] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const preferredTime = Object.keys(timePatterns).reduce((a, b) =>
      timePatterns[a] > timePatterns[b] ? a : b
    );

    // Calculate consistency (days with exercises / total days)
    const uniqueDates = new Set(attempts.map(a => a.completed_at.split('T')[0]));
    const daysSinceFirst = attempts.length > 0
      ? Math.ceil((Date.now() - new Date(attempts[attempts.length - 1].completed_at).getTime()) / (1000 * 60 * 60 * 24))
      : 1;

    const consistency = Math.min(100, Math.round((uniqueDates.size / daysSinceFirst) * 100));

    // Calculate average session time (estimated)
    const avgSessionTime = Math.max(10, Math.min(45, Math.round(attempts.length / uniqueDates.size * 3)));

    // Calculate achievement rate
    const goodScores = attempts.filter(a => a.score >= 70).length;
    const achievementRate = Math.round((goodScores / attempts.length) * 100);

    return {
      preferredTime,
      avgSessionTime,
      consistency,
      difficulty: classLevel || 'B1',
      weeklyGoal: 150,
      achievementRate
    };
  };

  const generatePredictions = (skillBalance: any, learningPatterns: any, streak: number) => {
    const overallScore = skillBalance.overall_score || 0;

    // Calculate progress to next level
    const levelThresholds = { A1: 20, A2: 40, B1: 60, B2: 75, C1: 85, C2: 95 };
    const currentLevel = classLevel || 'B1';
    const currentThreshold = levelThresholds[currentLevel as keyof typeof levelThresholds] || 60;
    const nextLevelProgress = Math.min(100, Math.round((overallScore / currentThreshold) * 100));

    // Estimate time to next level
    const progressRate = learningPatterns.consistency * 0.01 * learningPatterns.achievementRate * 0.01;
    const daysToLevel = progressRate > 0 ? Math.ceil((currentThreshold - overallScore) / (progressRate * 2)) : 999;
    const estimatedTimeToLevel = daysToLevel > 365 ? '+1 any' : daysToLevel > 30 ? `${Math.ceil(daysToLevel / 30)} mesos` : `${daysToLevel} dies`;

    // Recommend focus areas
    const skills = [
      { name: 'Gramàtica', score: skillBalance.grammar_score },
      { name: 'Vocabulari', score: skillBalance.vocabulary_score },
      { name: 'Lectura', score: skillBalance.reading_score },
      { name: 'Escriptura', score: skillBalance.writing_score },
      { name: 'Oral', score: (skillBalance.listening_score + skillBalance.speaking_score) / 2 }
    ];

    const recommendedFocus = skills
      .sort((a, b) => a.score - b.score)
      .slice(0, 2)
      .map(skill => skill.name);

    return {
      nextLevelProgress,
      estimatedTimeToLevel,
      recommendedFocus
    };
  };

  const generateMockData = () => {
    const mockData: AnalysisData = {
      skillBalance: progress || {
        grammar_score: 0,
        vocabulary_score: 0,
        listening_score: 0,
        speaking_score: 0,
        reading_score: 0,
        writing_score: 0,
        overall_score: 0
      },
      exerciseStreak: 0,
      totalXpAllTime: xpPoints || 0,
      currentMonthXp: 0,
      completedExercises: 0,
      totalExercises: exercises.length,
      attempts: [],
      learningPatterns: {
        preferredTime: 'Matí',
        avgSessionTime: 15,
        consistency: 0,
        difficulty: classLevel || 'B1',
        weeklyGoal: 100,
        achievementRate: 0
      },
      predictions: {
        nextLevelProgress: 0,
        estimatedTimeToLevel: 'Sense dades',
        recommendedFocus: ['Gramàtica', 'Vocabulari']
      }
    };

    setAnalysisData(mockData);
    setLoading(false);
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await fetchAnalysisData();
    setRefreshing(false);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <LoadingSpinner size="lg" className="mb-4" />
          <p className="text-muted-foreground">Carregant anàlisi avançat...</p>
        </div>
      </div>
    );
  }

  if (!analysisData) {
    return (
      <Card>
        <CardContent className="p-6 text-center">
          <p className="text-muted-foreground">No s'han pogut carregar les dades d'anàlisi.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Anàlisi Professional</h2>
          <p className="text-muted-foreground">
            Dashboard complet del teu rendiment acadèmic
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Badge variant="outline" className="text-xs">
            <Calendar className="h-3 w-3 mr-1" />
            {lastUpdated.toLocaleTimeString('ca-ES', {
              hour: '2-digit',
              minute: '2-digit'
            })}
          </Badge>
          <Button
            variant="outline"
            size="sm"
            onClick={handleRefresh}
            disabled={refreshing}
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${refreshing ? 'animate-spin' : ''}`} />
            Actualitzar
          </Button>
        </div>
      </div>

      {/* Metrics Grid */}
      <AdvancedMetricsGrid
        analysisData={analysisData}
        orthographyProgress={orthographyProgress}
      />

      {/* Main Analytics */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview" className="flex items-center space-x-2">
            <BarChart3 className="h-4 w-4" />
            <span>Resum</span>
          </TabsTrigger>
          <TabsTrigger value="skills" className="flex items-center space-x-2">
            <Target className="h-4 w-4" />
            <span>Competències</span>
          </TabsTrigger>
          <TabsTrigger value="progress" className="flex items-center space-x-2">
            <TrendingUp className="h-4 w-4" />
            <span>Progrés</span>
          </TabsTrigger>
          <TabsTrigger value="insights" className="flex items-center space-x-2">
            <Brain className="h-4 w-4" />
            <span>Insights</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <EnhancedSkillsRadar
              data={analysisData.skillBalance}
              currentLevel={classLevel || 'B1'}
              targetLevel="C1"
            />
            <AdvancedXPChart
              studentId={studentId}
              classId={classId}
              analysisData={analysisData}
            />
          </div>
        </TabsContent>

        <TabsContent value="skills" className="space-y-6">
          <EnhancedSkillsRadar
            data={analysisData.skillBalance}
            currentLevel={classLevel || 'B1'}
            targetLevel="C1"
            detailed={true}
          />
        </TabsContent>

        <TabsContent value="progress" className="space-y-6">
          <AdvancedXPChart
            studentId={studentId}
            classId={classId}
            analysisData={analysisData}
            detailed={true}
          />
        </TabsContent>

        <TabsContent value="insights" className="space-y-6">
          <LearningInsights
            analysisData={analysisData}
            classLevel={classLevel}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};