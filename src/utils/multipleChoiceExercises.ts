// EXERCICIS TIPUS TEST (MÚLTIPLE OPCIÓ) - Més dinàmics i interactius
// Exercicis A/B/C/D per a tots els cursos

import { CourseExercise, CourseSection } from './courseExercises';

// =====================================================
// CURS 4A - NIVELL AVANÇAT (COMBINAT C1)
// =====================================================

export const COURSE_4A_MULTIPLE_CHOICE: CourseSection[] = [
  {
    id: '4a_test_sil·labes',
    title: 'TEST - Separació de síl·labes (C1)',
    description: 'Test ràpid de separació de síl·labes',
    category: 'ortografia',
    course: '4A',
    exercises: []
  },
  {
    id: '4a_test_diftongs',
    title: 'TEST - Diftongs (C1)',
    description: 'Test ràpid de diftongs',
    category: 'ortografia',
    course: '4A',
    exercises: []
  },
  {
    id: '4a_test_accentuacio',
    title: 'TEST - Accentuació (C1)',
    description: 'Test ràpid d\'accentuació',
    category: 'ortografia',
    course: '4A',
    exercises: []
  }
];

// =====================================================
// CURS 4B - BUIT (Merged into 4A)
// =====================================================

export const COURSE_4B_MULTIPLE_CHOICE: CourseSection[] = [];

// =====================================================
// CURS 4C - NIVELL MITJÀ (COMBINAT B2)
// =====================================================

export const COURSE_4C_MULTIPLE_CHOICE: CourseSection[] = [
  {
    id: '4c_test_sil·labes',
    title: 'TEST - Separació de síl·labes (B2)',
    description: 'Test ràpid de separació de síl·labes',
    category: 'ortografia',
    course: '4C',
    exercises: []
  },
  {
    id: '4c_test_accentuacio',
    title: 'TEST - Accentuació (B2)',
    description: 'Test ràpid d\'accentuació',
    category: 'ortografia',
    course: '4C',
    exercises: []
  }
];

// =====================================================
// CURS 4D - BUIT (Merged into 4C)
// =====================================================

export const COURSE_4D_MULTIPLE_CHOICE: CourseSection[] = [];

// =====================================================
// CURS 4E - BUIT (Merged into 4C)
// =====================================================

export const COURSE_4E_MULTIPLE_CHOICE: CourseSection[] = [];

// =====================================================
// FUNCIONS AUXILIARS
// =====================================================

export const getMultipleChoiceExercisesByCourse = (course: '4A' | '4B' | '4C' | '4D' | '4E' | 'B2' | 'C1' | string): CourseSection[] => {
  switch (course) {
    case '4A':
    case 'C1':
      return COURSE_4A_MULTIPLE_CHOICE;
    case '4B':
      return COURSE_4B_MULTIPLE_CHOICE;
    case '4C':
    case 'B2':
      return COURSE_4C_MULTIPLE_CHOICE;
    case '4D':
      return COURSE_4D_MULTIPLE_CHOICE;
    case '4E':
      return COURSE_4E_MULTIPLE_CHOICE;
    default:
      return [];
  }
};

export const getAllMultipleChoiceExercises = (): CourseSection[] => {
  return [
    ...COURSE_4A_MULTIPLE_CHOICE,
    ...COURSE_4B_MULTIPLE_CHOICE,
    ...COURSE_4C_MULTIPLE_CHOICE,
    ...COURSE_4D_MULTIPLE_CHOICE,
    ...COURSE_4E_MULTIPLE_CHOICE
  ];
};
