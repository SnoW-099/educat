import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useRealTimeSync } from './useRealTimeSync';

interface StudentClass {
  id: string;
  name: string;
  code: string;
  level: string;
  chat_permissions: 'all' | 'professor_only';
  allow_all_levels: boolean;
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

export const useStudentData = (userId: string) => {
  const [studentClass, setStudentClass] = useState<StudentClass | null>(null);
  const [progress, setProgress] = useState<StudentProgress | null>(null);
  const [exercises, setExercises] = useState<any[]>([]);
  const [xpPoints, setXpPoints] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchStudentData = useCallback(async () => {
    if (!userId) return;

    try {
      setLoading(true);
      setError(null);

      console.log(`[useStudentData] Fetching data for user ${userId}`);

      // Fetch student's class enrollment
      const { data: enrollment, error: enrollmentError } = await supabase
        .from('enrollments')
        .select(`
          class_id,
          classes (
            id,
            name,
            code,
            level,
            chat_permissions,
            allow_all_levels
          )
        `)
        .eq('student_id', userId)
        .eq('is_active', true)
        .maybeSingle();

      if (enrollmentError && enrollmentError.code !== 'PGRST116') {
        throw enrollmentError;
      }

      let classData = null;
      if (enrollment?.classes) {
        const rawClassData = enrollment.classes as any;
        classData = {
          id: rawClassData.id,
          name: rawClassData.name,
          code: rawClassData.code,
          level: rawClassData.level,
          chat_permissions: rawClassData.chat_permissions,
          allow_all_levels: rawClassData.allow_all_levels
        };
        setStudentClass(classData);
      } else {
        // Clear class if no active enrollment
        setStudentClass(null);
      }

      // Fetch student progress
      const { data: progressData, error: progressError } = await supabase
        .from('student_progress')
        .select('*')
        .eq('student_id', userId)
        .maybeSingle();

      if (progressError && progressError.code !== 'PGRST116') {
        throw progressError;
      }

      const studentProgress = progressData || {
        grammar_score: 0,
        vocabulary_score: 0,
        listening_score: 0,
        speaking_score: 0,
        reading_score: 0,
        writing_score: 0,
        overall_score: 0
      };
      setProgress(studentProgress);

      // Fetch available exercises (filtered by class level if enrolled)
      let exercisesQuery = supabase
        .from('exercises')
        .select('*');

      if (enrollment?.class_id && classData) {
        const classLevel = classData.level;
        const allowAllLevels = classData.allow_all_levels;
        
        // Filter exercises based on class settings
        exercisesQuery = exercisesQuery
          .or(`class_id.is.null,class_id.eq.${enrollment.class_id}`);
          
        // Only filter by level if the class doesn't allow all levels
        if (!allowAllLevels) {
          exercisesQuery = exercisesQuery.eq('level', classLevel);
        }
      } else {
        exercisesQuery = exercisesQuery.is('class_id', null);
      }

      const { data: exercisesData, error: exercisesError } = await exercisesQuery
        .order('created_at', { ascending: true });

      if (exercisesError) throw exercisesError;

      setExercises(exercisesData || []);

      // Fetch XP data for current month
      if (enrollment?.class_id) {
        const currentMonth = new Date().toISOString().slice(0, 7); // YYYY-MM format
        
        const { data: xpData, error: xpError } = await supabase
          .from('student_xp_rankings')
          .select('xp_points')
          .eq('student_id', userId)
          .eq('class_id', enrollment.class_id)
          .eq('month_year', currentMonth)
          .maybeSingle();

        if (xpError && xpError.code !== 'PGRST116') {
          console.error('Error fetching XP:', xpError);
        } else {
          setXpPoints(xpData?.xp_points || 0);
        }
      } else {
        // Clear XP if no active enrollment
        setXpPoints(0);
      }

      console.log(`[useStudentData] Data fetched successfully`, {
        hasClass: !!classData,
        exerciseCount: exercisesData?.length || 0,
        xpPoints: xpPoints
      });

    } catch (error) {
      console.error('[useStudentData] Error fetching student data:', error);
      setError('No s\'han pogut carregar les dades');
    } finally {
      setLoading(false);
    }
  }, [userId]);

  // Listen for enrollment changes in real-time (always active)
  useEffect(() => {
    if (!userId) return;

    const channel = supabase
      .channel(`enrollment-changes-${userId}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'enrollments',
          filter: `student_id=eq.${userId}`
        },
        (payload) => {
          console.log('[useStudentData] Enrollment changed:', payload);
          fetchStudentData();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [userId, fetchStudentData]);

  // Set up real-time sync for class-specific data
  useRealTimeSync(userId, studentClass?.id, fetchStudentData);

  useEffect(() => {
    fetchStudentData();
  }, [fetchStudentData]);

  return {
    studentClass,
    progress,
    exercises,
    xpPoints,
    loading,
    error,
    refetch: fetchStudentData
  };
};