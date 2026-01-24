import { CourseExercise, CourseSection } from './courseExercises';

// =========================================================================================
// CONSOLIDATED EXERCISES FOR B2 (4C, 4D, 4E) AND C1 (4A, 4B)
// ALL exercises are currently empty as requested, but sections are kept.
// =========================================================================================

// --- NIVELL 4E (Merged into 4C) ---
export const GUIONET_4E: CourseSection[] = [];
export const PRONOMS_4E: CourseSection[] = [];
export const VERBS_IRR_4E: CourseSection[] = [];
export const VERBS_REG_4E: CourseSection[] = [];
export const PRON_REL_4E: CourseSection[] = [];
export const PREP_4E: CourseSection[] = [];
export const APOS_4E: CourseSection[] = [];
export const CONJ_4E: CourseSection[] = [];

// --- NIVELL 4D (Merged into 4C) ---
export const GUIONET_4D: CourseSection[] = [];
export const PRONOMS_4D: CourseSection[] = [];
export const VERBS_IRR_4D: CourseSection[] = [];
export const VERBS_REG_4D: CourseSection[] = [];
export const PRON_REL_4D: CourseSection[] = [];
export const PREP_4D: CourseSection[] = [];
export const APOS_4D: CourseSection[] = [];
export const CONJ_4D: CourseSection[] = [];

// --- NIVELL 4C - CONSOLIDATED B2 ---
export const GUIONET_4C: CourseSection[] = [{ id: 'guionet_4c', title: 'Guionet (B2)', description: 'Exercicis de guionet consolidated.', category: 'ortografia', course: '4C', exercises: [] }];
export const PRONOMS_4C: CourseSection[] = [{ id: 'pronoms_4c', title: 'Pronoms Febles (B2)', description: 'Exercicis de pronoms febles consolidated.', category: 'gramàtica', course: '4C', exercises: [] }];
export const VERBS_IRR_4C: CourseSection[] = [{ id: 'verbs_irr_4c', title: 'Verbs Irregulars (B2)', description: 'Exercicis de verbs irregulars consolidated.', category: 'gramàtica', course: '4C', exercises: [] }];
export const VERBS_REG_4C: CourseSection[] = [{ id: 'verbs_reg_4c', title: 'Verbs Regulars (B2)', description: 'Exercicis de verbs regulars consolidated.', category: 'gramàtica', course: '4C', exercises: [] }];
export const PRON_REL_4C: CourseSection[] = [{ id: 'prel_4c', title: 'Pronoms Relatius (B2)', description: 'Exercicis de pronoms relatius consolidated.', category: 'gramàtica', course: '4C', exercises: [] }];
export const PREP_4C: CourseSection[] = [{ id: 'prep_4c', title: 'Preposicions (B2)', description: 'Exercicis de preposicions consolidated.', category: 'gramàtica', course: '4C', exercises: [] }];
export const APOS_4C: CourseSection[] = []; // Moved to courseExercises.ts as Apostrofació
export const CONJ_4C: CourseSection[] = []; // Moved to courseExercises.ts as Conjuncions (B2)

// --- NIVELL 4B (Merged into 4A) ---
export const GUIONET_4B: CourseSection[] = [];
export const PRONOMS_4B: CourseSection[] = [];
export const VERBS_IRR_4B: CourseSection[] = [];
export const VERBS_REG_4B: CourseSection[] = [];
export const PRON_REL_4B: CourseSection[] = [];
export const PREP_4B: CourseSection[] = [];
export const APOS_4B: CourseSection[] = [];
export const CONJ_4B: CourseSection[] = [];
export const FONETICA_4B: CourseSection[] = [];

// --- NIVELL 4A - CONSOLIDATED C1 ---
export const GUIONET_4A: CourseSection[] = [{ id: 'guionet_4a', title: 'Guionet (C1)', description: 'Exercicis de guionet consolidated.', category: 'ortografia', course: '4A', exercises: [] }];
export const PRONOMS_4A: CourseSection[] = [{ id: 'pronoms_4a', title: 'Pronoms Febles (C1)', description: 'Exercicis de pronoms febles consolidated.', category: 'gramàtica', course: '4A', exercises: [] }];
export const VERBS_IRR_4A: CourseSection[] = [{ id: 'verbs_irr_4a', title: 'Verbs Irregulars (C1)', description: 'Exercicis de verbs irregulars consolidated.', category: 'gramàtica', course: '4A', exercises: [] }];
export const VERBS_REG_4A: CourseSection[] = [{ id: 'verbs_reg_4a', title: 'Verbs Regulars (C1)', description: 'Exercicis de verbs regulars consolidated.', category: 'gramàtica', course: '4A', exercises: [] }];
export const PRON_REL_4A: CourseSection[] = [{ id: 'prel_4a', title: 'Pronoms Relatius (C1)', description: 'Exercicis de pronoms relatius consolidated.', category: 'gramàtica', course: '4A', exercises: [] }];
export const PREP_4A: CourseSection[] = [{ id: 'prep_4a', title: 'Preposicions (C1)', description: 'Exercicis de preposicions consolidated.', category: 'gramàtica', course: '4A', exercises: [] }];
export const APOS_4A: CourseSection[] = [{ id: 'apos_4a', title: 'Apostròf (C1)', description: 'Exercicis d\'apòstrof consolidated.', category: 'ortografia', course: '4A', exercises: [] }];
export const CONJ_4A: CourseSection[] = [{ id: 'conj_4a', title: 'Conjuncions (C1)', description: 'Exercicis de conjuncions consolidated.', category: 'gramàtica', course: '4A', exercises: [] }];
export const FONETICA_4A: CourseSection[] = [{ id: 'fon_4a', title: 'Fonètica (C1)', description: 'Exercicis de fonètica consolidated.', category: 'ortografia', course: '4A', exercises: [] }];
export const DIER_4A: CourseSection[] = [{ id: 'dier_4a', title: 'Dièresi (C1)', description: 'Exercicis de dièresi consolidated.', category: 'ortografia', course: '4A', exercises: [] }];

export const ALL_NEW_EXERCISES: CourseSection[] = [
  ...GUIONET_4C,
  ...PRONOMS_4C,
  ...VERBS_IRR_4C,
  ...VERBS_REG_4C,
  ...PRON_REL_4C,
  ...PREP_4C,


  ...GUIONET_4A,
  ...PRONOMS_4A,
  ...VERBS_IRR_4A,
  ...VERBS_REG_4A,
  ...PRON_REL_4A,
  ...PREP_4A,
  ...APOS_4A,
  ...CONJ_4A,
  ...FONETICA_4A,
  ...DIER_4A
];