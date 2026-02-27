import { supabase } from '@/integrations/supabase/client';

// Exercise templates for dynamic generation
const exerciseTemplates = {
  'A1': {
    'ortografia': [
      {
        type: 'fill_blank',
        question: 'Completa amb la consonant correcta: El gat está a la ca_a',
        correctAnswer: ['s'],
        explanation: 'Casa s\'escriu amb "s"'
      },
      {
        type: 'multiple_choice',
        question: 'Quina és l\'ortografia correcta?',
        options: ['casa', 'cassa', 'kasa'],
        correctAnswer: 'casa',
        explanation: 'Casa s\'escriu amb una sola "s"'
      },
      {
        type: 'fill_blank',
        question: 'El _at dorm al llit',
        correctAnswer: ['g'],
        explanation: 'Gat s\'escriu amb "g"'
      },
      {
        type: 'multiple_choice',
        question: 'Com s\'escriu el número 8?',
        options: ['vuit', 'huit', 'buit'],
        correctAnswer: 'vuit',
        explanation: 'Vuit s\'escriu amb "v"'
      },
      {
        type: 'fill_blank',
        question: 'La ma_à és bona',
        correctAnswer: ['r'],
        explanation: 'Marà s\'escriu amb "r"'
      },
      {
        type: 'multiple_choice',
        question: 'Tria la forma correcta:',
        options: ['platja', 'plaja', 'platge'],
        correctAnswer: 'platja',
        explanation: 'Platja s\'escriu amb "tj"'
      },
      {
        type: 'fill_blank',
        question: 'El pa_er és blanc',
        correctAnswer: ['p'],
        explanation: 'Paper s\'escriu amb "p"'
      },
      {
        type: 'multiple_choice',
        question: 'Escull la grafia correcta:',
        options: ['llibre', 'libre', 'lliure'],
        correctAnswer: 'llibre',
        explanation: 'Llibre s\'escriu amb dues "l"'
      },
      {
        type: 'fill_blank',
        question: 'L\'a_ua està freda',
        correctAnswer: ['i'],
        explanation: 'Aigua s\'escriu amb "i"'
      },
      {
        type: 'multiple_choice',
        question: 'Com s\'escriu el color groc?',
        options: ['groch', 'groc', 'grok'],
        correctAnswer: 'groc',
        explanation: 'Groc s\'escriu amb "c"'
      },
      {
        type: 'fill_blank',
        question: 'El _aret és petit',
        correctAnswer: ['n'],
        explanation: 'Naret s\'escriu amb "n"'
      },
      {
        type: 'multiple_choice',
        question: 'Tria l\'ortografia correcta:',
        options: ['escola', 'escuela', 'scola'],
        correctAnswer: 'escola',
        explanation: 'Escola s\'escriu amb "sc"'
      },
      {
        type: 'fill_blank',
        question: 'La _ent camina',
        correctAnswer: ['g'],
        explanation: 'Gent s\'escriu amb "g"'
      },
      {
        type: 'multiple_choice',
        question: 'Com s\'escriu el número 2?',
        options: ['dos', 'dues', 'amds'],
        correctAnswer: 'dos',
        explanation: 'Dos (masculí) s\'escriu així'
      },
      {
        type: 'fill_blank',
        question: 'El so_ és fort',
        correctAnswer: ['l'],
        explanation: 'Sol s\'escriu amb "l"'
      },
      {
        type: 'multiple_choice',
        question: 'Escull la forma correcta:',
        options: ['neu', 'nev', 'ñeu'],
        correctAnswer: 'neu',
        explanation: 'Neu s\'escriu amb "eu"'
      }
    ],
    'gramàtica': [
      {
        type: 'fill_blank',
        question: 'El gat ___ negre',
        correctAnswer: ['és', 'es'],
        explanation: 'Usem "és" del verb ser per descriure'
      },
      {
        type: 'multiple_choice',
        question: 'Escull l\'article correcte: ___ casa',
        options: ['la', 'el', 'els'],
        correctAnswer: 'la',
        explanation: 'Casa és femení, per tant usem "la"'
      },
      {
        type: 'fill_blank',
        question: 'Jo ___ estudiant',
        correctAnswer: 'soc',
        explanation: 'Usem "soc" per primera persona'
      },
      {
        type: 'multiple_choice',
        question: 'Escull l\'article: ___ cotxe',
        options: ['el', 'la', 'els'],
        correctAnswer: 'el',
        explanation: 'Cotxe és masculí'
      },
      {
        type: 'fill_blank',
        question: 'Tu ___ alt',
        correctAnswer: ['ets'],
        explanation: 'Ets és segona persona del verb ser'
      },
      {
        type: 'multiple_choice',
        question: 'Plural de "noi":',
        options: ['nois', 'noies', 'noys'],
        correctAnswer: 'nois',
        explanation: 'El plural masculí afegeix "s"'
      },
      {
        type: 'fill_blank',
        question: 'Ella ___ mestra',
        correctAnswer: ['és', 'es'],
        explanation: 'Tercera persona del verb ser'
      },
      {
        type: 'multiple_choice',
        question: 'Article per "aigua":',
        options: ['l\'', 'la', 'el'],
        correctAnswer: 'l\'',
        explanation: 'Amb vocal inicial usem l\''
      },
      {
        type: 'fill_blank',
        question: 'Nosaltres ___ amics',
        correctAnswer: ['som'],
        explanation: 'Som és primera persona plural'
      },
      {
        type: 'multiple_choice',
        question: 'Femení de "gos":',
        options: ['gossa', 'gosa', 'goses'],
        correctAnswer: 'gossa',
        explanation: 'Gossa és el femení de gos'
      }
    ],
    'dictats': [
      {
        type: 'dictation',
        question: 'Escolta i escriu el que sents:',
        correctAnswer: ['El sol brilla', 'El sol brillava'],
        explanation: 'Frase simple sobre el sol'
      },
      {
        type: 'dictation',
        question: 'Escriu la frase:',
        correctAnswer: ['La casa és gran', 'Una casa gran'],
        explanation: 'Descripció simple'
      },
      {
        type: 'dictation',
        question: 'Dictat:',
        correctAnswer: ['Jo tinc un gat', 'Tinc un gat'],
        explanation: 'Possessió simple'
      },
      {
        type: 'dictation',
        question: 'Escriu:',
        correctAnswer: ['Ella és mestra', 'És mestra'],
        explanation: 'Professió'
      },
      {
        type: 'dictation',
        question: 'Frase dictada:',
        correctAnswer: ['Anem a l\'escola', 'Vaig a escola'],
        explanation: 'Moviment i lloc'
      }
    ]
  },
  'A2': {
    'ortografia': [
      {
        type: 'fill_blank',
        question: 'Completa: M\'agra_a molt llegir',
        correctAnswer: ['d'],
        explanation: 'Agrada s\'escriu amb "d"'
      },
      {
        type: 'multiple_choice',
        question: 'Com s\'escriu correctament?',
        options: ['també', 'tambe', 'també'],
        correctAnswer: 'també',
        explanation: 'També porta accent'
      },
      {
        type: 'fill_blank',
        question: 'La _otiga és verda',
        correctAnswer: ['ll'],
        explanation: 'Lletuga s\'escriu amb "ll"'
      },
      {
        type: 'multiple_choice',
        question: 'Ortografia correcta:',
        options: ['què', 'que', 'ke'],
        correctAnswer: 'què',
        explanation: 'Què interrogatiu porta accent'
      },
      {
        type: 'fill_blank',
        question: 'El rello_ fa soroll',
        correctAnswer: ['tg'],
        explanation: 'Rellotge s\'escriu amb "tg"'
      },
      {
        type: 'multiple_choice',
        question: 'Tria la forma correcta:',
        options: ['començar', 'comançar', 'començá'],
        correctAnswer: 'començar',
        explanation: 'Començar s\'escriu amb "ç"'
      },
      {
        type: 'fill_blank',
        question: 'La monta_a és alta',
        correctAnswer: ['ny'],
        explanation: 'Muntanya s\'escriu amb "ny"'
      },
      {
        type: 'multiple_choice',
        question: 'Com s\'escriu?',
        options: ['eixir', 'sortir', 'salir'],
        correctAnswer: 'sortir',
        explanation: 'Sortir és la forma estàndard'
      }
    ],
    'gramàtica': [
      {
        type: 'multiple_choice',
        question: 'Quin temps verbal és correcte: Ahir ___ a casa',
        options: ['vaig estar', 'estic', 'estaré'],
        correctAnswer: 'vaig estar',
        explanation: 'Per accions del passat usem passat perifràstic'
      },
      {
        type: 'fill_blank',
        question: 'Demà ___ al cinema',
        correctAnswer: ['aniré'],
        explanation: 'Futur simple del verb anar'
      },
      {
        type: 'multiple_choice',
        question: 'Passat de "menjar":',
        options: ['vaig menjar', 'menjava', 'he menjat'],
        correctAnswer: 'vaig menjar',
        explanation: 'Passat perifràstic per accions puntuals'
      },
      {
        type: 'fill_blank',
        question: 'Quan era petit ___ molt',
        correctAnswer: ['jugava'],
        explanation: 'Imperfet per accions habituals del passat'
      },
      {
        type: 'multiple_choice',
        question: 'Futur de "venir":',
        options: ['vindré', 'venir', 'vingué'],
        correctAnswer: 'vindré',
        explanation: 'Futur simple de venir'
      }
    ],
    'dictats': [
      {
        type: 'dictation',
        question: 'Escriu la frase:',
        correctAnswer: ['Ahir vaig comprar pa', 'Vaig comprar pa ahir'],
        explanation: 'Passat amb complement temporal'
      },
      {
        type: 'dictation',
        question: 'Dictat:',
        correctAnswer: ['Demà faré els deures', 'Faré els deures demà'],
        explanation: 'Futur amb complement'
      },
      {
        type: 'dictation',
        question: 'Escolta i escriu:',
        correctAnswer: ['M\'agrada molt llegir', 'Llegir m\'agrada molt'],
        explanation: 'Expressió de gust'
      }
    ]
  },
  'B1': {
    'ortografia': [
      {
        type: 'fill_blank',
        question: 'Completa amb "g" o "j": Viat_ar per Europa',
        correctAnswer: ['j'],
        explanation: 'Viatjar s\'escriu amb "j"'
      }
    ],
    'gramàtica': [
      {
        type: 'multiple_choice',
        question: 'Escull la preposició correcta: Vine ___ mi',
        options: ['amb', 'en', 'per'],
        correctAnswer: 'amb',
        explanation: 'Usem "amb" per companyia'
      }
    ],
    'dictats': [
      {
        type: 'dictation',
        question: 'Escolta i escriu:',
        correctAnswer: ['Viatjo sovint per Europa'],
        explanation: 'Frase de nivell intermedi'
      }
    ]
  },
  'B2': {
    'ortografia': [
      {
        type: 'fill_blank',
        question: 'Completa l\'accent: Esta molt cansat',
        correctAnswer: ['Està'],
        explanation: 'Està (verb) porta accent diacrític'
      }
    ],
    'gramàtica': [
      {
        type: 'multiple_choice',
        question: 'Subjuntiu o indicatiu: Espero que ___ aviat',
        options: ['véns', 'vinguis', 'venir'],
        correctAnswer: 'vinguis',
        explanation: 'Després d\'esperar que, usem subjuntiu'
      }
    ],
    'dictats': [
      {
        type: 'dictation',
        question: 'Escriu la frase complexa:',
        correctAnswer: ['Espero que vinguis aviat'],
        explanation: 'Subjuntiu en oració subordinada'
      }
    ]
  },
  'C1': {
    'ortografia': [
      {
        type: 'fill_blank',
        question: 'Completa: L\'ecsamen va ser dif_cil',
        correctAnswer: ['í'],
        explanation: 'Difícil porta accent a la "í"'
      }
    ],
    'gramàtica': [
      {
        type: 'multiple_choice',
        question: 'Escull la forma correcta del participi:',
        options: ['ha escrit', 'ha escrigut', 'ha escribit'],
        correctAnswer: 'ha escrit',
        explanation: 'El participi d\'escriure és escrit'
      }
    ],
    'dictats': [
      {
        type: 'dictation',
        question: 'Dictat avançat:',
        correctAnswer: ['L\'examen va ser molt difícil'],
        explanation: 'Text de nivell avançat'
      }
    ]
  },
  'C2': {
    'ortografia': [
      {
        type: 'fill_blank',
        question: 'Completa amb la forma culta: Es va ad_nar compte',
        correctAnswer: ['o'],
        explanation: 'Adonar-se és la forma culta d\'adonar-se compte'
      }
    ],
    'gramàtica': [
      {
        type: 'essay',
        question: 'Explica la diferència entre "haver-hi" i "ser-hi" en una oració complexa',
        correctAnswer: ['Haver-hi indica existència mentre que ser-hi indica localització'],
        explanation: 'Distinció semàntica important en català avançat'
      }
    ],
    'dictats': [
      {
        type: 'dictation',
        question: 'Dictat de domini:',
        correctAnswer: ['Es va adonar del problema immediatament'],
        explanation: 'Expressió culta i formal'
      }
    ]
  }
};

export const generateDailyExercises = async () => {
  const levels = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];
  const types = ['ortografia', 'gramàtica', 'dictats'];
  
  const exercises = [];
  
  for (const level of levels) {
    for (const type of types) {
      // Generate 50 exercises per type per level (MUCHISIMOS!)
      const numExercises = 50;
      
      for (let i = 0; i < numExercises; i++) {
        const templates = exerciseTemplates[level as keyof typeof exerciseTemplates]?.[type as keyof typeof exerciseTemplates['A1']] || [];
        if (templates.length === 0) continue;
        
        // Rotate through templates and add variations
        const baseTemplate = templates[i % templates.length];
        const variations = generateVariations(baseTemplate, i);
        
        const exercise = {
          title: `${type.charAt(0).toUpperCase() + type.slice(1)} ${level} - ${i + 1}`,
          level,
          category: type,
          type: 'practice',
          difficulty_score: getDifficultyScore(level),
          estimated_duration: 5,
          content: [variations],
          answers: [variations.correctAnswer],
          tags: [level, type, 'daily'],
          is_exam: false,
          professor_id: null, // System generated
          class_id: null, // Available to all
          max_attempts: 3,
          time_limit: null
        };
        
        exercises.push(exercise);
      }
    }
  }
  
  return exercises;
};

const generateVariations = (template: any, index: number) => {
  // Create variations based on the template and index
  const variations: Record<string, any> = {
    'fill_blank': (tmpl: any, idx: number) => ({
      ...tmpl,
      id: `daily_${Date.now()}_${idx}`,
      question: tmpl.question + ` (${idx + 1})`
    }),
    'multiple_choice': (tmpl: any, idx: number) => ({
      ...tmpl,
      id: `daily_${Date.now()}_${idx}`,
      question: tmpl.question + ` (${idx + 1})`
    }),
    'dictation': (tmpl: any, idx: number) => ({
      ...tmpl,
      id: `daily_${Date.now()}_${idx}`,
      question: tmpl.question
    }),
    'essay': (tmpl: any, idx: number) => ({
      ...tmpl,
      id: `daily_${Date.now()}_${idx}`,
      question: tmpl.question
    })
  };
  
  const variationFn = variations[template.type];
  return variationFn ? variationFn(template, index) : { ...template, id: `daily_${Date.now()}_${index}` };
};

const getDifficultyScore = (level: string) => {
  const scores = { 'A1': 1, 'A2': 2, 'B1': 3, 'B2': 4, 'C1': 5, 'C2': 6 };
  return scores[level as keyof typeof scores] || 1;
};

export const scheduleDailyExerciseUpdate = () => {
  // This would be called in an Edge Function scheduled for 2am UTC daily
  console.log('Daily exercise update scheduled for 2am UTC');
};

// Function to clean old exercises and insert new ones
export const updateDailyExercises = async () => {
  try {
    // Delete old daily exercises (older than 2 days)
    const twoDaysAgo = new Date();
    twoDaysAgo.setDate(twoDaysAgo.getDate() - 2);
    
    await supabase
      .from('exercises')
      .delete()
      .contains('tags', ['daily'])
      .lt('created_at', twoDaysAgo.toISOString());
    
    // Generate new exercises
    const newExercises = await generateDailyExercises();
    
    // Insert new exercises in batches
    const batchSize = 50;
    for (let i = 0; i < newExercises.length; i += batchSize) {
      const batch = newExercises.slice(i, i + batchSize);
      const { error } = await supabase
        .from('exercises')
        .insert(batch);
      
      if (error) {
        console.error('Error inserting daily exercises batch:', error);
      }
    }
    
    console.log(`Successfully updated ${newExercises.length} daily exercises`);
    return newExercises.length;
  } catch (error) {
    console.error('Error updating daily exercises:', error);
    throw error;
  }
};