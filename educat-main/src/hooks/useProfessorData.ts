import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useRealTimeSync } from './useRealTimeSync';

interface Class {
  id: string;
  code: string;
  name: string;
  description: string;
  level: string;
  chat_permissions: 'all' | 'professor_only';
  max_students: number;
  allow_late_enrollment: boolean;
  allow_all_levels: boolean;
  allow_answer_checking: boolean;
  is_active: boolean;
  created_at: string;
  student_count: number;
}

interface Student {
  id: string;
  name: string;
  email: string;
  enrolled_at: string;
}

export const useProfessorData = (userId: string) => {
  const [classes, setClasses] = useState<Class[]>([]);
  const [selectedClass, setSelectedClass] = useState<Class | null>(null);
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProfessorClasses = useCallback(async () => {
    if (!userId) return;

    try {
      console.log(`[useProfessorData] Fetching classes for professor ${userId}`);

      const { data, error } = await supabase
        .from('classes')
        .select(`
          *,
          enrollments (
            id,
            is_active
          )
        `)
        .eq('professor_id', userId)
        .eq('is_active', true);

      if (error) throw error;

      const classesWithCounts: Class[] = data?.map(cls => ({
        id: cls.id,
        code: cls.code,
        name: cls.name,
        description: cls.description || '',
        level: cls.level,
        chat_permissions: cls.chat_permissions as 'all' | 'professor_only',
        max_students: cls.max_students || 50,
        allow_late_enrollment: cls.allow_late_enrollment || true,
        allow_all_levels: cls.allow_all_levels || false,
        allow_answer_checking: cls.allow_answer_checking || false,
        is_active: cls.is_active,
        created_at: cls.created_at,
        student_count: (cls.enrollments as any[])?.filter(e => e.is_active).length || 0
      })) || [];

      setClasses(classesWithCounts);
      console.log(`[useProfessorData] Loaded ${classesWithCounts.length} classes`);
    } catch (error) {
      console.error('[useProfessorData] Error fetching classes:', error);
      setError('No s\'han pogut carregar les classes');
    }
  }, [userId]);

  const fetchClassStudents = useCallback(async (classId: string) => {
    try {
      console.log(`[useProfessorData] Fetching students for class ${classId}`);

      // First get all enrollments for this class
      const { data: enrollments, error: enrollError } = await supabase
        .from('enrollments')
        .select('student_id, enrolled_at, is_active')
        .eq('class_id', classId)
        .eq('is_active', true);

      if (enrollError) throw enrollError;

      if (!enrollments || enrollments.length === 0) {
        setStudents([]);
        return;
      }

      // Then get profiles for all enrolled students
      const studentIds = enrollments.map(e => e.student_id);
      const { data: profiles, error: profileError } = await supabase
        .from('profiles')
        .select('user_id, name, email, role')
        .in('user_id', studentIds)
        .eq('role', 'student');

      if (profileError) throw profileError;

      // Combine enrollment and profile data
      const studentsData: Student[] = enrollments
        .map(enrollment => {
          const profile = profiles?.find(p => p.user_id === enrollment.student_id);
          return profile ? {
            id: enrollment.student_id,
            name: profile.name || 'Usuari desconegut',
            email: profile.email || 'Sense email',
            enrolled_at: enrollment.enrolled_at
          } : null;
        })
        .filter(Boolean) as Student[];

      setStudents(studentsData);
      console.log(`[useProfessorData] Loaded ${studentsData.length} students`);
    } catch (error) {
      console.error('[useProfessorData] Error fetching students:', error);
      setError('No s\'han pogut carregar els alumnes');
    }
  }, []);

  // Set up real-time sync for the selected class
  useRealTimeSync(undefined, selectedClass?.id, () => {
    fetchProfessorClasses();
    if (selectedClass) {
      fetchClassStudents(selectedClass.id);
    }
  });

  useEffect(() => {
    if (userId) {
      setLoading(true);
      fetchProfessorClasses().finally(() => setLoading(false));
    }
  }, [userId, fetchProfessorClasses]);

  useEffect(() => {
    if (selectedClass) {
      fetchClassStudents(selectedClass.id);
    }
  }, [selectedClass, fetchClassStudents]);

  const selectClass = useCallback((classItem: Class) => {
    setSelectedClass(classItem);
  }, []);

  const createClass = useCallback(async (classData: {
    name: string;
    description: string;
    level: string;
    chat_permissions: 'all' | 'professor_only';
    max_students: number;
    allow_late_enrollment: boolean;
    allow_all_levels: boolean;
    allow_answer_checking: boolean;
  }) => {
    try {
      const { data, error } = await supabase
        .from('classes')
        .insert({
          professor_id: userId,
          name: classData.name,
          description: classData.description,
          level: classData.level,
          code: '',
          chat_permissions: classData.chat_permissions,
          max_students: Math.min(classData.max_students, 50),
          allow_late_enrollment: classData.allow_late_enrollment,
          allow_all_levels: classData.allow_all_levels,
          allow_answer_checking: classData.allow_answer_checking
        })
        .select()
        .single();

      if (error) throw error;

      const newClass: Class = {
        ...data,
        chat_permissions: data.chat_permissions as 'all' | 'professor_only',
        student_count: 0
      };

      setClasses(prev => [...prev, newClass]);
      return newClass;
    } catch (error) {
      console.error('[useProfessorData] Error creating class:', error);
      throw error;
    }
  }, [userId]);

  const updateClass = useCallback(async (classId: string, updates: Partial<Class>) => {
    try {
      const { error } = await supabase
        .from('classes')
        .update(updates)
        .eq('id', classId);

      if (error) throw error;

      setClasses(prev =>
        prev.map(cls =>
          cls.id === classId
            ? { ...cls, ...updates }
            : cls
        )
      );

      if (selectedClass?.id === classId) {
        setSelectedClass(prev => prev ? { ...prev, ...updates } : null);
      }
    } catch (error) {
      console.error('[useProfessorData] Error updating class:', error);
      throw error;
    }
  }, [selectedClass]);

  const deleteClass = useCallback(async (classId: string) => {
    try {
      const { error } = await supabase
        .from('classes')
        .update({ is_active: false })
        .eq('id', classId);

      if (error) throw error;

      setClasses(prev => prev.filter(cls => cls.id !== classId));
      if (selectedClass?.id === classId) {
        setSelectedClass(null);
      }
    } catch (error) {
      console.error('[useProfessorData] Error deleting class:', error);
      throw error;
    }
  }, [selectedClass]);

  const removeStudent = useCallback(async (studentId: string) => {
    if (!selectedClass) return;

    try {
      const { error } = await supabase
        .from('enrollments')
        .delete()
        .eq('class_id', selectedClass.id)
        .eq('student_id', studentId);

      if (error) throw error;

      // Update students list locally
      setStudents(prev => prev.filter(s => s.id !== studentId));
      
      // Update class student count
      setClasses(prev =>
        prev.map(cls =>
          cls.id === selectedClass.id
            ? { ...cls, student_count: cls.student_count - 1 }
            : cls
        )
      );
    } catch (error) {
      console.error('[useProfessorData] Error removing student:', error);
      throw error;
    }
  }, [selectedClass]);

  return {
    classes,
    selectedClass,
    students,
    loading,
    error,
    selectClass,
    createClass,
    updateClass,
    deleteClass,
    removeStudent,
    refetch: fetchProfessorClasses
  };
};