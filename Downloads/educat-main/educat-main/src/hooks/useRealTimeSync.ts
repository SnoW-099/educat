import { useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export const useRealTimeSync = (
  studentId?: string, 
  classId?: string, 
  onDataChange?: () => void
) => {
  useEffect(() => {
    if (!studentId || !classId) return;

    console.log(`[RealTimeSync] Setting up sync for student ${studentId} in class ${classId}`);

    // Subscribe to exercise attempts changes
    const exerciseAttemptsChannel = supabase
      .channel(`exercise-attempts-${studentId}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'exercise_attempts',
          filter: `student_id=eq.${studentId}`
        },
        (payload) => {
          console.log('[RealTimeSync] Exercise attempts changed:', payload);
          onDataChange?.();
        }
      )
      .subscribe();

    // Subscribe to student progress changes
    const progressChannel = supabase
      .channel(`student-progress-${studentId}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'student_progress',
          filter: `student_id=eq.${studentId}`
        },
        (payload) => {
          console.log('[RealTimeSync] Student progress changed:', payload);
          onDataChange?.();
        }
      )
      .subscribe();

    // Subscribe to XP rankings changes
    const xpRankingsChannel = supabase
      .channel(`xp-rankings-${studentId}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'student_xp_rankings',
          filter: `student_id=eq.${studentId}`
        },
        (payload) => {
          console.log('[RealTimeSync] XP rankings changed:', payload);
          onDataChange?.();
        }
      )
      .subscribe();

    // Subscribe to class enrollment changes
    const enrollmentChannel = supabase
      .channel(`enrollments-${classId}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'enrollments',
          filter: `class_id=eq.${classId}`
        },
        (payload) => {
          console.log('[RealTimeSync] Enrollments changed:', payload);
          onDataChange?.();
        }
      )
      .subscribe();

    return () => {
      console.log('[RealTimeSync] Cleaning up subscriptions');
      supabase.removeChannel(exerciseAttemptsChannel);
      supabase.removeChannel(progressChannel);
      supabase.removeChannel(xpRankingsChannel);
      supabase.removeChannel(enrollmentChannel);
    };
  }, [studentId, classId, onDataChange]);
};