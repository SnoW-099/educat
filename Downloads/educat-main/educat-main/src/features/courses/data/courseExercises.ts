import { ALL_NEW_EXERCISES } from './newExercises';

export interface CourseExercise {
  id: string;
  type: 'multiple_choice' | 'fill_blank' | 'dictation' | 'matching' | 'transformation' | 'classification';
  question: string;
  options?: string[];
  correctAnswer: string | string[];
  explanation: string;
  difficulty: 1 | 2 | 3 | 4 | 5;
  course: '4A' | '4B' | '4C' | '4D' | '4E';
}

export interface CourseSection {
  id: string;
  title: string;
  description: string;
  category: 'ortografia' | 'gramàtica' | 'lectura' | 'escriptura' | 'vocabulari';
  course: '4A' | '4B' | '4C' | '4D' | '4E';
  exercises: CourseExercise[];
}

import * as B2 from './b2';
import * as C1 from './c1';

// Re-export old globals for backwards compatibility
export const COURSE_4A_EXERCISES = C1.COURSE_4A_EXERCISES;
export const COURSE_4B_EXERCISES = C1.COURSE_4B_EXERCISES;
export const COURSE_4C_EXERCISES = B2.COURSE_4C_EXERCISES;
export const COURSE_4D_EXERCISES = B2.COURSE_4D_EXERCISES;
export const COURSE_4E_EXERCISES = B2.COURSE_4E_EXERCISES;

export const ALL_COURSE_EXERCISES = [
  ...COURSE_4A_EXERCISES,
  ...COURSE_4B_EXERCISES,
  ...COURSE_4C_EXERCISES,
  ...COURSE_4D_EXERCISES,
  ...COURSE_4E_EXERCISES
];

export const getExercisesByCourse = (courseId: string): CourseSection[] => {
  switch (courseId) {
    case '4A': return COURSE_4A_EXERCISES;
    case '4B': return COURSE_4B_EXERCISES;
    case '4C': return COURSE_4C_EXERCISES;
    case '4D': return COURSE_4D_EXERCISES;
    case '4E': return COURSE_4E_EXERCISES;
    default: return [];
  }
};
