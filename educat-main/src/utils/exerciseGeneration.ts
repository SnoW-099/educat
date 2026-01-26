// Generate massive amounts of exercises for each level
import { supabase } from '@/integrations/supabase/client';
import { allPronomsFeblesExercises } from './pronomsFebles';

interface ExerciseTemplate {
  id: string;
  type: 'fill_blank' | 'multiple_choice' | 'dictation' | 'essay' | 'transformation';
  question: string;
  options?: string[];
  correctAnswer: string | string[];
  explanation: string;
}

// Extensive exercise templates for each level
export const exerciseTemplates = {
  'A1': {
    'ortografia': [
      {
        id: 'a1_ort_1',
        type: 'fill_blank' as const,
        question: 'Completa: El g_t dorm',
        correctAnswer: 'a',
        explanation: 'Gat s\'escriu amb "a"'
      },
      {
        id: 'a1_ort_2',
        type: 'multiple_choice' as const,
        question: 'Com s\'escriu correctament?',
        options: ['casa', 'cassa', 'kasa'],
        correctAnswer: 'casa',
        explanation: 'Casa s\'escriu amb una sola "s"'
      },
      {
        id: 'a1_ort_3',
        type: 'fill_blank' as const,
        question: 'El cava__ és gros',
        correctAnswer: 'll',
        explanation: 'Cavall s\'escriu amb "ll"'
      },
      {
        id: 'a1_ort_4',
        type: 'multiple_choice' as const,
        question: 'Tria la forma correcta:',
        options: ['beure', 'veure', 'bevre'],
        correctAnswer: 'beure',
        explanation: 'Beure amb "b"'
      },
      {
        id: 'a1_ort_5',
        type: 'fill_blank' as const,
        question: 'La _ent és amable',
        correctAnswer: 'g',
        explanation: 'Gent s\'escriu amb "g"'
      }
      // Add 45 more variations programmatically
    ],
    'gramàtica': [
      {
        id: 'a1_gram_1',
        type: 'multiple_choice' as const,
        question: 'Escull l\'article: ___ casa',
        options: ['la', 'el', 'els'],
        correctAnswer: 'la',
        explanation: 'Casa és femení, per tant usem "la"'
      },
      {
        id: 'a1_gram_2',
        type: 'fill_blank' as const,
        question: 'Jo ___ estudiant',
        correctAnswer: 'soc',
        explanation: 'Usem "soc" per primera persona del verb ser'
      },
      {
        id: 'a1_gram_3',
        type: 'multiple_choice' as const,
        question: 'Plural de "gat":',
        options: ['gats', 'gates', 'gatsos'],
        correctAnswer: 'gats',
        explanation: 'El plural masculí afegeix "s"'
      },
      {
        id: 'a1_gram_4',
        type: 'fill_blank' as const,
        question: 'Tu ___ alt',
        correctAnswer: 'ets',
        explanation: 'Ets és segona persona del verb ser'
      },
      {
        id: 'a1_gram_5',
        type: 'multiple_choice' as const,
        question: 'Article per "aigua":',
        options: ['l\'', 'la', 'el'],
        correctAnswer: 'l\'',
        explanation: 'Amb vocal inicial usem l\''
      }
    ],
    'dictats': [
      {
        id: 'a1_dict_1',
        type: 'dictation' as const,
        question: 'Escolta i escriu el que sents:',
        correctAnswer: 'El gat dorm',
        explanation: 'Frase simple sobre animals'
      },
      {
        id: 'a1_dict_2',
        type: 'dictation' as const,
        question: 'Escriu la frase:',
        correctAnswer: 'La casa és gran',
        explanation: 'Descripció simple'
      },
      {
        id: 'a1_dict_3',
        type: 'dictation' as const,
        question: 'Dictat:',
        correctAnswer: 'Jo tinc un gat',
        explanation: 'Possessió simple'
      },
      {
        id: 'a1_dict_4',
        type: 'dictation' as const,
        question: 'Escriu:',
        correctAnswer: 'El cel és blau',
        explanation: 'Colors bàsics'
      },
      {
        id: 'a1_dict_5',
        type: 'dictation' as const,
        question: 'Frase dictada:',
        correctAnswer: 'La mare cuina',
        explanation: 'Família i accions'
      }
    ]
  }
  // Add A2, B1, B2, C1, C2 levels with similar extensive templates
};

// Function to generate variations of base templates
export const generateExerciseVariations = (baseTemplate: any, variations: number = 50): any[] => {
  const generated = [baseTemplate];
  
  for (let i = 1; i < variations; i++) {
    const variation = { ...baseTemplate };
    variation.id = `${baseTemplate.id}_var_${i}`;
    
    // Add variations to questions
    if (baseTemplate.type === 'fill_blank') {
      const blanks = ['_', '__', '___'];
      const randomBlank = blanks[i % blanks.length];
      variation.question = baseTemplate.question.replace('_', randomBlank);
    }
    
    if (baseTemplate.type === 'multiple_choice' && baseTemplate.options) {
      // Shuffle options occasionally
      if (i % 3 === 0) {
        variation.options = [...baseTemplate.options].sort(() => Math.random() - 0.5);
      }
    }
    
    generated.push(variation);
  }
  
  return generated;
};

// Generate massive exercise database
export const generateMassiveExerciseDatabase = async () => {
  const allExercises = [];
  const levels = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];
  const categories = ['ortografia', 'gramàtica', 'dictats', 'pronoms_febles'];
  
  // Get system professor
  const { data: professors } = await supabase
    .from('profiles')
    .select('user_id')
    .eq('role', 'professor')
    .limit(1);
    
  const professorId = professors?.[0]?.user_id;
  if (!professorId) {
    throw new Error('No professor found');
  }

  for (const level of levels) {
    for (const category of categories) {
      const templates = exerciseTemplates[level as keyof typeof exerciseTemplates]?.[category as keyof typeof exerciseTemplates['A1']] || [];
      
      for (const template of templates) {
        // Generate 50 variations of each template
        const variations = generateExerciseVariations(template, 50);
        
        for (let i = 0; i < variations.length; i++) {
          const exercise = {
            title: `${level} ${category.charAt(0).toUpperCase() + category.slice(1)} ${i + 1}`,
            description: `Exercici de ${category} nivell ${level}`,
            type: 'practice',
            level,
            category,
            content: [variations[i]],
            answers: Array.isArray(variations[i].correctAnswer) 
              ? variations[i].correctAnswer 
              : [variations[i].correctAnswer],
            professor_id: professorId,
            difficulty_score: getDifficultyScore(level),
            estimated_duration: category === 'dictats' ? 8 : 5,
            tags: [level, category, 'generated'],
            is_exam: false,
            max_attempts: 3,
            time_limit: null
          };
          
          allExercises.push(exercise);
        }
      }
    }
  }
  
  return allExercises;
};

export const getDifficultyScore = (level: string): number => {
  const scores = { 'A1': 1, 'A2': 2, 'B1': 3, 'B2': 4, 'C1': 5, 'C2': 6 };
  return scores[level as keyof typeof scores] || 1;
};

// Batch insert exercises to avoid deadlocks
export const insertExercisesInBatches = async (exercises: any[], batchSize: number = 50) => {
  const results = [];
  
  for (let i = 0; i < exercises.length; i += batchSize) {
    const batch = exercises.slice(i, i + batchSize);
    
    try {
      const { data, error } = await supabase
        .from('exercises')
        .insert(batch)
        .select('id');
        
      if (error) {
        console.error(`Error inserting batch ${i / batchSize + 1}:`, error);
        // Continue with next batch even if current fails
        continue;
      }
      
      results.push(...(data || []));
      
      // Small delay to prevent overwhelming the database
      await new Promise(resolve => setTimeout(resolve, 100));
    } catch (error) {
      console.error(`Batch ${i / batchSize + 1} failed:`, error);
    }
  }
  
  return results;
};

// Clean up old exercises to prevent accumulation
export const cleanupOldExercises = async () => {
  try {
    const { error } = await supabase
      .from('exercises')
      .delete()
      .contains('tags', ['generated'])
      .lt('created_at', new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString());
      
    if (error) {
      console.error('Error cleaning up old exercises:', error);
    }
  } catch (error) {
    console.error('Cleanup failed:', error);
  }
};

// Function to add pronoms febles exercises to database
export const insertPronomsFeblesExercises = async () => {
  try {
    // Get system professor
    const { data: professors } = await supabase
      .from('profiles')
      .select('user_id')
      .eq('role', 'professor')
      .limit(1);
      
    const professorId = professors?.[0]?.user_id;
    if (!professorId) {
      throw new Error('No professor found');
    }

    // Convert pronoms febles exercises to database format
    const dbExercises = allPronomsFeblesExercises.map((exercise, index) => ({
      title: `Pronoms Febles - ${exercise.level} - ${index + 1}`,
      description: exercise.question,
      type: 'practice',
      level: exercise.level,
      category: exercise.category,
      content: [{
        id: exercise.id,
        type: exercise.type,
        question: exercise.question,
        options: exercise.options,
        correctAnswer: exercise.correctAnswer,
        explanation: exercise.explanation
      }],
      answers: Array.isArray(exercise.correctAnswer) 
        ? exercise.correctAnswer 
        : [exercise.correctAnswer],
      professor_id: professorId,
      difficulty_score: getDifficultyScore(exercise.level),
      estimated_duration: 5,
      tags: [exercise.level, 'pronoms_febles', 'morfosintaxi'],
      is_exam: false,
      max_attempts: 3,
      time_limit: null
    }));

    // Insert in batches
    const results = await insertExercisesInBatches(dbExercises, 20);
    console.log(`Successfully inserted ${results.length} pronoms febles exercises`);
    return results;
  } catch (error) {
    console.error('Error inserting pronoms febles exercises:', error);
    throw error;
  }
};