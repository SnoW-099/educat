import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Zap, Award, CheckCircle2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { SkillsRadarChart } from '@/components/analysis/SkillsRadarChart';
import { LoadingSpinner } from '@/components/ui/loading-spinner';

interface AnalysisDashboardProps {
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

export const AdvancedAnalysisDashboard = ({ 
  progress, 
  exercises, 
  xpPoints, 
  classLevel,
  studentId,
  classId,
  orthographyProgress
}: AnalysisDashboardProps) => {
  const [realTimeData, setRealTimeData] = useState<any>(null);
  const [dailyXP, setDailyXP] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (studentId && classId) {
      fetchRealData();
      calculateDailyXP();
    } else {
      setLoading(false);
    }

    // Set up real-time listener
    const channel = supabase
      .channel('analysis-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'exercise_attempts',
          filter: `student_id=eq.${studentId}`
        },
        () => {
          if (studentId && classId) {
            fetchRealData();
            calculateDailyXP();
          }
        }
      )
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'student_xp_rankings',
          filter: `student_id=eq.${studentId}`
        },
        () => {
          if (studentId && classId) {
            fetchRealData();
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [studentId, classId]);

  const calculateDailyXP = async () => {
    if (!studentId) return;

    try {
      const today = new Date();
      const todayStart = new Date(today.getFullYear(), today.getMonth(), today.getDate()).toISOString();
      const todayEnd = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1).toISOString();

      const { data: todayAttempts, error } = await supabase
        .from('exercise_attempts')
        .select('score, exercises!inner(level)')
        .eq('student_id', studentId)
        .gte('completed_at', todayStart)
        .lt('completed_at', todayEnd);

      if (error) {
        console.error('Error fetching daily XP:', error);
        return;
      }

      let dailyXPCalculated = 0;
      todayAttempts?.forEach(attempt => {
        const level = attempt.exercises?.level;
        let multiplier = 1.5; // Default for A1
        
        switch (level) {
          case 'A2': multiplier = 1.7; break;
          case 'B1': multiplier = 2.0; break;
          case 'B2': multiplier = 2.2; break;
          case 'C1': multiplier = 2.4; break;
          case 'C2': multiplier = 2.5; break;
        }
        
        dailyXPCalculated += Math.round(attempt.score * multiplier);
      });

      setDailyXP(dailyXPCalculated);
    } catch (error) {
      console.error('Error calculating daily XP:', error);
    }
  };

  const fetchRealData = async () => {
    if (!studentId || !classId) return;
    
    try {
      setLoading(true);
      
      // Get current month XP
      const currentMonth = new Date().toISOString().slice(0, 7);
      const { data: currentMonthData, error: monthError } = await supabase
        .from('student_xp_rankings')
        .select('xp_points')
        .eq('student_id', studentId)
        .eq('class_id', classId)
        .eq('month_year', currentMonth)
        .single();

      if (monthError && monthError.code !== 'PGRST116') {
        console.error('Error fetching current month XP:', monthError);
      }

      // Calculate skill scores from recent attempts
      const { data: skillAttempts, error: skillError } = await supabase
        .from('exercise_attempts')
        .select(`
          score,
          exercises!inner(type)
        `)
        .eq('student_id', studentId)
        .gte('score', 50)
        .order('completed_at', { ascending: false })
        .limit(50);

      if (skillError) {
        console.error('Error fetching skill attempts:', skillError);
      }

      const skillScores = {
        grammar_score: 0,
        vocabulary_score: 0,
        listening_score: 0,
        speaking_score: 0,
        reading_score: 0,
        writing_score: 0,
        overall_score: 0
      };

      if (skillAttempts && skillAttempts.length > 0) {
        const skillGroups = skillAttempts.reduce((acc, attempt) => {
          const type = attempt.exercises?.type;
          if (!acc[type]) acc[type] = [];
          acc[type].push(attempt.score);
          return acc;
        }, {} as Record<string, number[]>);

        Object.keys(skillGroups).forEach(type => {
          const scores = skillGroups[type];
          const average = scores.reduce((sum, score) => sum + score, 0) / scores.length;
          
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

        const allScores = [
          skillScores.grammar_score,
          skillScores.vocabulary_score,
          skillScores.listening_score,
          skillScores.speaking_score,
          skillScores.reading_score,
          skillScores.writing_score
        ].filter(score => score > 0);

        skillScores.overall_score = allScores.length > 0 
          ? Math.round(allScores.reduce((sum, score) => sum + score, 0) / allScores.length)
          : 0;
      }
      
      setRealTimeData({ 
        currentMonthXp: currentMonthData?.xp_points || 0,
        skillBalance: skillScores
      });
      
    } catch (error) {
      console.error('Error fetching real data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <LoadingSpinner size="lg" className="mb-4" />
          <p className="text-muted-foreground">Carregant anàlisi...</p>
        </div>
      </div>
    );
  }

  const actualProgress = realTimeData?.skillBalance || progress || {
    grammar_score: 0,
    vocabulary_score: 0,
    listening_score: 0,
    speaking_score: 0,
    reading_score: 0,
    writing_score: 0,
    overall_score: 0
  };

  const currentMonthXP = realTimeData?.currentMonthXp || 0;

  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">XP del Mes</CardTitle>
            <Zap className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{currentMonthXP}</div>
            <div className="text-xs text-muted-foreground">
              punts aquest mes
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">XP d'Avui</CardTitle>
            <Award className="h-4 w-4 text-accent" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-accent">{dailyXP}</div>
            <div className="text-xs text-muted-foreground">
              punts guanyats avui
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Exercicis</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">
              {orthographyProgress ? `${orthographyProgress.completed}/${orthographyProgress.total}` : '0/0'}
            </div>
            <div className="text-xs text-muted-foreground">
              completats
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Analysis Charts */}
      <div className="space-y-6">
        <SkillsRadarChart
          data={actualProgress}
          currentLevel={classLevel || 'B1'}
          targetLevel="C1"
          studentId={studentId}
          classId={classId}
        />
      </div>
    </div>
  );
};