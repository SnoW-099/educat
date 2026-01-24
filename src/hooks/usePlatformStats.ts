import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface PlatformStats {
  totalStudents: number;
  totalProfessors: number;
  totalExercises: number;
  totalAttempts: number;
  activeClasses: number;
  totalXP: number;
  averageScore: number;
  dailyActiveUsers: number;
  completionRate: number;
  topPerformers: Array<{
    name: string;
    xp: number;
    level: string;
  }>;
}

export const usePlatformStats = () => {
  const [stats, setStats] = useState<PlatformStats>({
    totalStudents: 0,
    totalProfessors: 0,
    totalExercises: 0,
    totalAttempts: 0,
    activeClasses: 0,
    totalXP: 0,
    averageScore: 0,
    dailyActiveUsers: 0,
    completionRate: 0,
    topPerformers: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPlatformStats();
    
    // Set up real-time subscription for key metrics
    const channel = supabase
      .channel('platform-stats')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'exercise_attempts'
        },
        () => {
          console.log('[PlatformStats] Exercise attempt detected, refreshing stats');
          fetchPlatformStats();
        }
      )
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'enrollments'
        },
        () => {
          console.log('[PlatformStats] Enrollment change detected, refreshing stats');
          fetchPlatformStats();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const fetchPlatformStats = async () => {
    try {
      setLoading(true);

      // Get total students and professors
      const { data: students } = await supabase
        .from('profiles')
        .select('id')
        .eq('role', 'student');

      const { data: professors } = await supabase
        .from('profiles')
        .select('id')
        .eq('role', 'professor');

      // Get total exercises
      const { data: exercises } = await supabase
        .from('exercises')
        .select('id');

      // Get total exercise attempts
      const { data: attempts } = await supabase
        .from('exercise_attempts')
        .select('id, score, completed_at');

      // Get active classes
      const { data: classes } = await supabase
        .from('classes')
        .select('id')
        .eq('is_active', true);

      // Get total XP from all rankings
      const { data: xpData } = await supabase
        .from('student_xp_rankings')
        .select('xp_points');

      // Calculate daily active users (users who completed exercises in last 24h)
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      
      const { data: recentAttempts } = await supabase
        .from('exercise_attempts')
        .select('student_id')
        .gte('completed_at', yesterday.toISOString());

      const uniqueActiveUsers = new Set(recentAttempts?.map(a => a.student_id) || []).size;

      // Calculate average score
      const validScores = attempts?.filter(a => a.score !== null).map(a => a.score) || [];
      const averageScore = validScores.length > 0 
        ? validScores.reduce((sum, score) => sum + score, 0) / validScores.length 
        : 0;

      // Calculate completion rate (exercises with score >= 70)
      const completedExercises = attempts?.filter(a => a.score >= 70).length || 0;
      const completionRate = attempts?.length > 0 
        ? (completedExercises / attempts.length) * 100 
        : 0;

      // Get top performers (top 5 by XP)
      const { data: topPerformersData } = await supabase
        .from('student_xp_rankings')
        .select(`
          xp_points,
          student_id,
          profiles!inner(name, role),
          classes!inner(level)
        `)
        .order('xp_points', { ascending: false })
        .limit(5);

      const topPerformers = topPerformersData?.map(tp => ({
        name: (tp.profiles as any)?.name || 'Usuari anònim',
        xp: tp.xp_points,
        level: (tp.classes as any)?.level || 'N/A'
      })) || [];

      const totalXP = xpData?.reduce((sum, record) => sum + record.xp_points, 0) || 0;

      setStats({
        totalStudents: students?.length || 0,
        totalProfessors: professors?.length || 0,
        totalExercises: exercises?.length || 0,
        totalAttempts: attempts?.length || 0,
        activeClasses: classes?.length || 0,
        totalXP,
        averageScore: Math.round(averageScore),
        dailyActiveUsers: uniqueActiveUsers,
        completionRate: Math.round(completionRate),
        topPerformers
      });

      console.log('[PlatformStats] Stats updated:', {
        totalStudents: students?.length || 0,
        totalProfessors: professors?.length || 0,
        totalExercises: exercises?.length || 0,
        totalAttempts: attempts?.length || 0,
        activeClasses: classes?.length || 0,
        totalXP,
        dailyActiveUsers: uniqueActiveUsers
      });

    } catch (error) {
      console.error('[PlatformStats] Error fetching stats:', error);
    } finally {
      setLoading(false);
    }
  };

  return { stats, loading, refetch: fetchPlatformStats };
};