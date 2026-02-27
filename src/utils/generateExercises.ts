import { supabase } from '@/integrations/supabase/client';
<<<<<<< HEAD
import { generateBookOrthographyExercises } from '@/features/courses/data/catalanOrthographyData';
=======
import { generateBookOrthographyExercises } from './catalanOrthographyData';
>>>>>>> 281e5f277d1a22fe983bb2f49ab903edb50397dc
import { REVIEW_EXERCISES } from './reviewExercises';

// Function to generate tons of exercises for all levels
export const generateMassiveExercises = async () => {
  console.log('Starting massive exercise generation...');
  
  try {
    // First get or create system professor
    let { data: professors } = await supabase
      .from('profiles')
      .select('user_id')
      .eq('role', 'professor')
      .limit(1);

    let professorId;
    if (!professors || professors.length === 0) {
      // Create system professor
      const systemUserId = crypto.randomUUID();
      await supabase
        .from('profiles')
        .insert({
          user_id: systemUserId,
          email: 'sistema@educat.cat',
          name: 'Sistema EduCat',
          role: 'professor'
        });
      professorId = systemUserId;
    } else {
      professorId = professors[0].user_id;
    }

    // Delete existing generated exercises to avoid duplicates
    await supabase
      .from('exercises')
      .delete()
      .contains('tags', ['generated']);

    const allExercises = [];
    const levels = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];
    const categories = ['ortografia', 'gramàtica', 'dictats'];

    // A1 Base templates
    const a1Templates = {
      ortografia: [
        { question: 'Completa: El g_t dorm', correctAnswer: 'a', explanation: 'Gat amb a' },
        { question: 'Com s\'escriu: ca_a', correctAnswer: 's', explanation: 'Casa amb s' },
        { question: 'Completa: _au', correctAnswer: 'g', explanation: 'Gos amb g' },
        { question: 'Escriu: ca_all', correctAnswer: 'v', explanation: 'Cavall amb v' },
        { question: 'Completa: lli_re', correctAnswer: 'b', explanation: 'Llibre amb b' },
        { question: 'Com es diu: _ent', correctAnswer: 'g', explanation: 'Gent amb g' },
        { question: 'Escriu: ai_ua', correctAnswer: 'g', explanation: 'Aigua amb g' },
        { question: 'Completa: _oc', correctAnswer: 'gr', explanation: 'Groc amb gr' },
        { question: 'Com s\'escriu: ne_', correctAnswer: 'u', explanation: 'Neu amb u' },
        { question: 'Completa: pa_er', correctAnswer: 'p', explanation: 'Paper amb p' }
      ],
      gramàtica: [
        { question: 'Jo ___ estudiant', correctAnswer: 'soc', explanation: 'Verb ser 1a persona' },
        { question: 'Tu ___ alt', correctAnswer: 'ets', explanation: 'Verb ser 2a persona' },
        { question: 'Ell ___ mestre', correctAnswer: 'és', explanation: 'Verb ser 3a persona' },
        { question: 'Article per casa: ___ casa', correctAnswer: 'la', explanation: 'Femení singular' },
        { question: 'Article per gat: ___ gat', correctAnswer: 'el', explanation: 'Masculí singular' },
        { question: 'Plural de gat: ___', correctAnswer: 'gats', explanation: 'Afegir s' },
        { question: 'Plural de casa: ___', correctAnswer: 'cases', explanation: 'Afegir s' },
        { question: 'Jo ___ menja', correctAnswer: 'menjo', explanation: 'Present 1a persona' },
        { question: 'Tu ___ beu', correctAnswer: 'beus', explanation: 'Present 2a persona' },
        { question: 'Nosaltres ___ amics', correctAnswer: 'som', explanation: 'Verb ser plural' }
      ],
      dictats: [
        { question: 'Escriu: El gat dorm', correctAnswer: 'El gat dorm', explanation: 'Frase simple' },
        { question: 'Escriu: La casa és gran', correctAnswer: 'La casa és gran', explanation: 'Descripció' },
        { question: 'Escriu: Jo tinc un gos', correctAnswer: 'Jo tinc un gos', explanation: 'Possessió' },
        { question: 'Escriu: El cel és blau', correctAnswer: 'El cel és blau', explanation: 'Colors' },
        { question: 'Escriu: La mare cuina', correctAnswer: 'La mare cuina', explanation: 'Accions' },
        { question: 'Escriu: Anem a escola', correctAnswer: 'Anem a escola', explanation: 'Moviment' },
        { question: 'Escriu: Fa sol avui', correctAnswer: 'Fa sol avui', explanation: 'Temps' },
        { question: 'Escriu: Em dic Joan', correctAnswer: 'Em dic Joan', explanation: 'Presentació' },
        { question: 'Escriu: Tinc vuit anys', correctAnswer: 'Tinc vuit anys', explanation: 'Edat' },
        { question: 'Escriu: M\'agrada llegir', correctAnswer: 'M\'agrada llegir', explanation: 'Gustos' }
      ]
    };

    // Generate exercises for each level
    for (const level of levels) {
      for (const category of categories) {
        const templates = level === 'A1' ? a1Templates[category as keyof typeof a1Templates] : 
          generateTemplatesForLevel(level, category);
        
        // Create 100 variations per category per level
        for (let i = 0; i < 100; i++) {
          const template = templates[i % templates.length];
          const exercise = {
            title: `${level} ${category.charAt(0).toUpperCase() + category.slice(1)} ${i + 1}`,
            description: `Exercici de ${category} nivell ${level}`,
            type: 'practice',
            level,
            category,
            content: [{
              id: `q${i}`,
              type: category === 'dictats' ? 'dictation' : 
                    i % 2 === 0 ? 'fill_blank' : 'multiple_choice',
              question: template.question,
              correctAnswer: template.correctAnswer,
              explanation: template.explanation,
              ...(i % 2 === 1 && category !== 'dictats' && {
                options: generateOptions(template.correctAnswer, category)
              })
            }],
            answers: [template.correctAnswer],
            professor_id: professorId,
            difficulty_score: getDifficultyScore(level),
            estimated_duration: category === 'dictats' ? 8 : 5,
            tags: [level, category, 'generated', 'massive'],
            is_exam: false,
            max_attempts: 5,
            time_limit: null
          };
          
          allExercises.push(exercise);
        }
      }
    }

    // Add book orthography exercises
    const bookExercises = generateBookOrthographyExercises();
    allExercises.push(...bookExercises);

    // Add review exercises (EXERCICIS DE REPÀS)
    const reviewExercises = REVIEW_EXERCISES.map(reviewEx => ({
      title: reviewEx.title,
      description: reviewEx.description,
      type: 'practice',
      level: reviewEx.level,
      category: reviewEx.type === 'morphosyntax' ? 'morfosintaxi' : 'lexic',
      content: reviewEx.content.questions.map(q => ({
        id: q.id,
        type: q.type === 'classification' ? 'fill_blank' : 
              q.type === 'correction' ? 'fill_blank' :
              q.type === 'time_writing' ? 'fill_blank' :
              q.type === 'antonym' ? 'fill_blank' :
              q.type,
        question: q.question,
        correctAnswer: q.correctAnswer,
        explanation: q.explanation,
        options: q.options
      })),
      answers: Object.values(reviewEx.answers),
      professor_id: professorId,
      difficulty_score: reviewEx.difficulty_score,
      estimated_duration: reviewEx.estimated_duration,
      tags: [...reviewEx.tags, 'exercicis_repas', 'generated'],
      is_exam: false,
      max_attempts: 5,
      time_limit: null
    }));
    allExercises.push(...reviewExercises);

    console.log(`Generated ${allExercises.length} exercises (including ${bookExercises.length} book exercises and ${reviewExercises.length} review exercises). Inserting in batches...`);

    // Insert in smaller batches to avoid deadlocks
    const batchSize = 20;
    let inserted = 0;
    
    for (let i = 0; i < allExercises.length; i += batchSize) {
      const batch = allExercises.slice(i, i + batchSize);
      
      try {
        const { data, error } = await supabase
          .from('exercises')
          .insert(batch);
          
        if (error) {
          console.error(`Batch ${Math.floor(i/batchSize) + 1} error:`, error);
          continue;
        }
        
        inserted += batch.length;
        console.log(`Inserted batch ${Math.floor(i/batchSize) + 1}: ${inserted}/${allExercises.length}`);
        
        // Small delay to prevent overwhelming the database
        await new Promise(resolve => setTimeout(resolve, 200));
      } catch (error) {
        console.error(`Batch ${Math.floor(i/batchSize) + 1} failed:`, error);
      }
    }

    console.log(`Successfully inserted ${inserted} exercises!`);
    return inserted;
    
  } catch (error) {
    console.error('Error generating massive exercises:', error);
    throw error;
  }
};

const generateTemplatesForLevel = (level: string, category: string) => {
  const difficulty = getDifficultyScore(level);
  
  if (category === 'ortografia') {
    return [
      { question: `Completa la paraula (${level}): pa_aula`, correctAnswer: 'r', explanation: 'Paraula amb r' },
      { question: `Escriu correctament (${level}): dif_cil`, correctAnswer: 'í', explanation: 'Accent diacrític' },
      { question: `Com s'escriu (${level}): compr_nsió`, correctAnswer: 'e', explanation: 'Vocal e' },
      { question: `Completa (${level}): gram_tica`, correctAnswer: 'à', explanation: 'Accent greu' },
      { question: `Ortografia (${level}): exerc_ci`, correctAnswer: 'i', explanation: 'Vocal i' }
    ];
  } else if (category === 'gramàtica') {
    return [
      { question: `Temps verbal (${level}): Ahir ___ menjar`, correctAnswer: 'vaig', explanation: 'Passat perifràstic' },
      { question: `Subjuntiu (${level}): Espero que ___`, correctAnswer: 'vinguis', explanation: 'Present subjuntiu' },
      { question: `Condicional (${level}): Si pogués, ___`, correctAnswer: 'vindria', explanation: 'Condicional simple' },
      { question: `Participi (${level}): He ___ estudiar`, correctAnswer: 'estat', explanation: 'Participi irregular' },
      { question: `Gerundi (${level}): Estic ___`, correctAnswer: 'estudiant', explanation: 'Gerundi regular' }
    ];
  } else { // dictats
    return [
      { question: `Dictat ${level}:`, correctAnswer: `Text de nivell ${level} per practicar`, explanation: `Dictat adaptat a ${level}` },
      { question: `Escriu la frase ${level}:`, correctAnswer: `Aquesta és una frase de nivell ${level}`, explanation: `Complexitat ${level}` },
      { question: `Text ${level}:`, correctAnswer: `Pràctica d'escriptura de nivell ${level}`, explanation: `Exercici ${level}` }
    ];
  }
};

const generateOptions = (correctAnswer: string, category: string): string[] => {
  const options = [correctAnswer];
  
  if (category === 'ortografia') {
    const alternatives = ['a', 'e', 'i', 'o', 'u', 'b', 'v', 'g', 'j', 's', 'z'];
    while (options.length < 4) {
      const alt = alternatives[Math.floor(Math.random() * alternatives.length)];
      if (!options.includes(alt)) options.push(alt);
    }
  } else {
    // Grammar alternatives
    const alternatives = ['és', 'està', 'era', 'serà', 'sigui', 'fos', 'seria'];
    while (options.length < 4) {
      const alt = alternatives[Math.floor(Math.random() * alternatives.length)];
      if (!options.includes(alt)) options.push(alt);
    }
  }
  
  return options.sort(() => Math.random() - 0.5);
};

const getDifficultyScore = (level: string): number => {
  const scores = { 'A1': 1, 'A2': 2, 'B1': 3, 'B2': 4, 'C1': 5, 'C2': 6 };
  return scores[level as keyof typeof scores] || 1;
};