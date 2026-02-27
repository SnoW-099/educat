// Comprehensive exercise database for EduCat
// All levels from A1 to C2 with varied exercises

export interface ExerciseQuestion {
  id: string;
  type: 'multiple_choice' | 'fill_blank' | 'text' | 'match' | 'order';
  question: string;
  options?: string[];
  correct: string | string[];
  explanation?: string;
}

export interface ExerciseData {
  id: string;
  title: string;
  description: string;
  type: 'grammar' | 'vocabulary' | 'listening' | 'speaking' | 'reading' | 'writing';
  level: 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2';
  category: string;
  tags: string[];
  difficulty_score: number;
  estimated_duration: number;
  content: {
    text?: string;
    audio_url?: string;
    prompt?: string;
    criteria?: string[];
    questions?: ExerciseQuestion[];
  };
  answers: Record<string, string | string[]>;
  time_limit?: number;
}

export const EXERCISE_DATABASE: ExerciseData[] = [
  // ===== A1 LEVEL EXERCISES =====

  // A1 Grammar - Extended Version
  {
    id: 'a1_gram_articles',
    title: 'Articles Definits i Indefinits - Exercici Complet',
    description: 'Exercici complet per dominar l\'ús dels articles definits (el, la, els, les) i indefinits (un, una, uns, unes)',
    type: 'grammar',
    level: 'A1',
    category: 'articles',
    tags: ['articles', 'bàsic', 'determinants'],
    difficulty_score: 3,
    estimated_duration: 45,
    content: {
      text: 'Els articles són paraules que acompanyen els noms per determinar-los. Els articles definits (el, la, els, les) s\'usen quan parlem d\'alguna cosa específica o coneguda. Els articles indefinits (un, una, uns, unes) s\'usen quan parlem d\'alguna cosa de manera general o no específica.',
      questions: [
        {
          id: 'q1',
          type: 'multiple_choice',
          question: 'Completa: __ gat de la Maria és molt simpàtic.',
          options: ['El', 'La', 'Un', 'Una'],
          correct: 'El',
          explanation: 'Gat és masculí singular i coneixem de quin gat es parla (el de la Maria), per tant usem l\'article definit "el"'
        },
        {
          id: 'q2',
          type: 'multiple_choice',
          question: 'Ahir vaig comprar __ cotxe.',
          options: ['el', 'la', 'un', 'una'],
          correct: 'un',
          explanation: 'Article indefinit masculí singular perquè no especifiquem quin cotxe exactament'
        },
        {
          id: 'q3',
          type: 'multiple_choice',
          question: '__ casa on visc és blava.',
          options: ['El', 'La', 'Un', 'Una'],
          correct: 'La',
          explanation: 'Casa és femení singular i específica (on visc), per tant usem l\'article definit "la"'
        },
        {
          id: 'q4',
          type: 'fill_blank',
          question: 'M\'agrada molt llegir __ llibres d\'aventures.',
          correct: 'els',
          explanation: 'Llibres és masculí plural, i parlem de llibres en general d\'un tipus específic'
        },
        {
          id: 'q5',
          type: 'multiple_choice',
          question: 'Necessito __ taula nova per al menjador.',
          options: ['la', 'les', 'una', 'unes'],
          correct: 'una',
          explanation: 'Article indefinit femení singular - no especifiquem quina taula exactament'
        },
        {
          id: 'q6',
          type: 'fill_blank',
          question: '__ nens del col·legi són molt estudiosos.',
          correct: 'Els',
          explanation: 'Nens és masculí plural i específic (del col·legi)'
        },
        {
          id: 'q7',
          type: 'multiple_choice',
          question: 'Vull comprar __ sabates còmodes.',
          options: ['les', 'la', 'unes', 'una'],
          correct: 'unes',
          explanation: 'Article indefinit femení plural - sabates en general, no específiques'
        },
        {
          id: 'q8',
          type: 'fill_blank',
          question: '__ professora de català explica molt bé.',
          correct: 'La',
          explanation: 'Professora és femení singular i específica (de català)'
        },
        {
          id: 'q9',
          type: 'multiple_choice',
          question: 'Hi ha __ ordinador a l\'aula.',
          options: ['l\'', 'la', 'un', 'una'],
          correct: 'un',
          explanation: 'Article indefinit masculí singular. Ordinador comença per vocal però és masculí'
        },
        {
          id: 'q10',
          type: 'fill_blank',
          question: '__ amics de la Marta vénen a sopar.',
          correct: 'Els',
          explanation: 'Amics és masculí plural i específic (de la Marta)'
        },
        {
          id: 'q11',
          type: 'multiple_choice',
          question: 'Em fa mal __ cap.',
          options: ['el', 'la', 'un', 'una'],
          correct: 'el',
          explanation: 'Article definit amb parts del cos: "el cap"'
        },
        {
          id: 'q12',
          type: 'fill_blank',
          question: 'Hem vist __ pel·lícula molt divertida.',
          correct: 'una',
          explanation: 'Article indefinit femení singular - una pel·lícula qualsevol'
        },
        {
          id: 'q13',
          type: 'multiple_choice',
          question: '__ aigües d\'aquest riu són molt netes.',
          options: ['Les', 'Els', 'Unes', 'Uns'],
          correct: 'Les',
          explanation: 'Aigües és femení plural i específic (d\'aquest riu)'
        },
        {
          id: 'q14',
          type: 'fill_blank',
          question: 'Busco __ feina que m\'agradi.',
          correct: 'una',
          explanation: 'Article indefinit femení singular - feina en general'
        },
        {
          id: 'q15',
          type: 'multiple_choice',
          question: '__ cotxes d\'aquesta marca són cars.',
          options: ['Els', 'Les', 'Uns', 'Unes'],
          correct: 'Els',
          explanation: 'Cotxes és masculí plural i específic (d\'aquesta marca)'
        }
      ]
    },
    answers: {
      q1: 'El', q2: 'un', q3: 'La', q4: 'els', q5: 'una',
      q6: 'Els', q7: 'unes', q8: 'La', q9: 'un', q10: 'Els',
      q11: 'el', q12: 'una', q13: 'Les', q14: 'una', q15: 'Els'
    },
    time_limit: 45
  },

  {
    id: 'a1_gram_ser_estar',
    title: 'Verbs SER i ESTAR - Exercici Complet',
    description: 'Exercici extensiu per dominar les diferències entre els verbs ser i estar en totes les situacions',
    type: 'grammar',
    level: 'A1',
    category: 'verbs',
    tags: ['ser', 'estar', 'verbs', 'present'],
    difficulty_score: 3,
    estimated_duration: 50,
    content: {
      text: 'Els verbs SER i ESTAR són fonamentals en català. SER s\'usa per a característiques permanents, identitat, origen, professió i hora. ESTAR s\'usa per a estats temporals, ubicació, sensacions momentànies i situacions que poden canviar.',
      questions: [
        {
          id: 'q1',
          type: 'multiple_choice',
          question: 'Jo ___ estudiant de medicina.',
          options: ['soc', 'estic', 'ser', 'estar'],
          correct: 'soc',
          explanation: 'Professió o ocupació → SER (identitat professional)'
        },
        {
          id: 'q2',
          type: 'multiple_choice',
          question: 'Avui ___ molt cansat per l\'examen.',
          options: ['soc', 'estic', 'som', 'està'],
          correct: 'estic',
          explanation: 'Estat temporal i sensació momentània → ESTAR'
        },
        {
          id: 'q3',
          type: 'multiple_choice',
          question: 'Aquest llibre ___ molt interessant.',
          options: ['és', 'està', 'ser', 'estar'],
          correct: 'és',
          explanation: 'Característica intrínseca del llibre → SER'
        },
        {
          id: 'q4',
          type: 'fill_blank',
          question: 'La Maria ___ al jardí llegint.',
          correct: 'està',
          explanation: 'Ubicació temporal i activitat momentània → ESTAR'
        },
        {
          id: 'q5',
          type: 'multiple_choice',
          question: 'Nosaltres ___ de Barcelona.',
          options: ['som', 'estem', 'ser', 'estar'],
          correct: 'som',
          explanation: 'Origen geogràfic → SER (característica permanent)'
        },
        {
          id: 'q6',
          type: 'fill_blank',
          question: 'La sopa ___ molt calenta.',
          correct: 'està',
          explanation: 'Estat temporal de temperatura → ESTAR'
        },
        {
          id: 'q7',
          type: 'multiple_choice',
          question: 'Ells ___ molt alts.',
          options: ['són', 'estan', 'ser', 'estar'],
          correct: 'són',
          explanation: 'Característica física permanent → SER'
        },
        {
          id: 'q8',
          type: 'fill_blank',
          question: 'Tu ___ malalt?',
          correct: 'estàs',
          explanation: 'Estat temporal de salut → ESTAR'
        },
        {
          id: 'q9',
          type: 'multiple_choice',
          question: 'La festa ___ a casa meva.',
          options: ['és', 'està', 'ser', 'estar'],
          correct: 'és',
          explanation: 'Ubicació d\'un esdevenament → SER'
        },
        {
          id: 'q10',
          type: 'fill_blank',
          question: 'Vosaltres ___ molt simpàtics.',
          correct: 'sou',
          explanation: 'Característica de personalitat → SER'
        },
        {
          id: 'q11',
          type: 'multiple_choice',
          question: 'El cafè ___ fred.',
          options: ['és', 'està', 'ser', 'estar'],
          correct: 'està',
          explanation: 'Estat temporal de temperatura → ESTAR'
        },
        {
          id: 'q12',
          type: 'fill_blank',
          question: 'Avui ___ dilluns.',
          correct: 'és',
          explanation: 'Dia de la setmana → SER (informació temporal fixa)'
        },
        {
          id: 'q13',
          type: 'multiple_choice',
          question: 'Els nens ___ jugant al parc.',
          options: ['són', 'estan', 'ser', 'estar'],
          correct: 'estan',
          explanation: 'Acció en curs i ubicació temporal → ESTAR'
        },
        {
          id: 'q14',
          type: 'fill_blank',
          question: 'Aquest cotxe ___ meu.',
          correct: 'és',
          explanation: 'Possessió o propietat → SER'
        },
        {
          id: 'q15',
          type: 'multiple_choice',
          question: 'La porta ___ oberta.',
          options: ['és', 'està', 'ser', 'estar'],
          correct: 'està',
          explanation: 'Estat temporal de la porta → ESTAR'
        },
        {
          id: 'q16',
          type: 'fill_blank',
          question: 'Les vacances ___ a l\'estiu.',
          correct: 'són',
          explanation: 'Moment temporal habitual → SER'
        },
        {
          id: 'q17',
          type: 'multiple_choice',
          question: 'Jo ___ nerviós abans de l\'examen.',
          options: ['soc', 'estic', 'ser', 'estar'],
          correct: 'estic',
          explanation: 'Estat emocional temporal → ESTAR'
        },
        {
          id: 'q18',
          type: 'fill_blank',
          question: 'El meu germà ___ enginyer.',
          correct: 'és',
          explanation: 'Professió → SER'
        }
      ]
    },
    answers: {
      q1: 'soc', q2: 'estic', q3: 'és', q4: 'està', q5: 'som', q6: 'està',
      q7: 'són', q8: 'estàs', q9: 'és', q10: 'sou', q11: 'està', q12: 'és',
      q13: 'estan', q14: 'és', q15: 'està', q16: 'són', q17: 'estic', q18: 'és'
    },
    time_limit: 50
  },

  // A1 Vocabulary
  {
    id: 'a1_vocab_family',
    title: 'La Família',
    description: 'Vocabulari bàsic sobre membres de la família',
    type: 'vocabulary',
    level: 'A1',
    category: 'família',
    tags: ['família', 'parents', 'vocabulari bàsic'],
    difficulty_score: 3,
    estimated_duration: 10,
    content: {
      questions: [
        {
          id: 'q1',
          type: 'fill_blank',
          question: 'La mare del meu pare és la meva ____.',
          correct: 'àvia',
          explanation: 'La mare del pare = àvia paterna'
        },
        {
          id: 'q2',
          type: 'multiple_choice',
          question: 'Com es diu "nephew" en català?',
          options: ['nebot', 'cosí', 'germà', 'oncle'],
          correct: 'nebot',
          explanation: 'Nephew = nebot'
        },
        {
          id: 'q3',
          type: 'fill_blank',
          question: 'El fill de la meva germana és el meu ____.',
          correct: 'nebot',
          explanation: 'Fill de germana = nebot'
        }
      ]
    },
    answers: { q1: 'àvia', q2: 'nebot', q3: 'nebot' }
  },

  {
    id: 'a1_vocab_colors',
    title: 'Colors i Formes',
    description: 'Aprèn els colors bàsics en català',
    type: 'vocabulary',
    level: 'A1',
    category: 'colors',
    tags: ['colors', 'bàsic', 'adjectius'],
    difficulty_score: 3,
    estimated_duration: 12,
    content: {
      questions: [
        {
          id: 'q1',
          type: 'multiple_choice',
          question: 'Com es diu "red" en català?',
          options: ['blau', 'vermell', 'groc', 'verd'],
          correct: 'vermell'
        },
        {
          id: 'q2',
          type: 'multiple_choice',
          question: 'Com es diu "yellow" en català?',
          options: ['blau', 'vermell', 'groc', 'verd'],
          correct: 'groc'
        },
        {
          id: 'q3',
          type: 'fill_blank',
          question: 'El cel és ____.',
          correct: 'blau'
        }
      ]
    },
    answers: { q1: 'vermell', q2: 'groc', q3: 'blau' }
  },

  // A1 Reading
  {
    id: 'a1_read_daily_routine',
    title: 'La Meva Rutina Diària',
    description: 'Lectura senzilla sobre rutines diàries',
    type: 'reading',
    level: 'A1',
    category: 'vida quotidiana',
    tags: ['rutina', 'vida diària', 'hores'],
    difficulty_score: 4,
    estimated_duration: 15,
    content: {
      text: 'Em dic Maria i tinc 25 anys. Cada matí em llevo a les 7 del matí. Primer faig esmorzar: prenc cafè amb llet i torrades. Després vaig a la feina en autobús. Treballo en una oficina des de les 9 fins a les 5. Al migdia menjo amb els companys de feina. El vespre arribo a casa a les 6 i després faig esport. Sopar a les 8 i vaig a dormir a les 10.',
      questions: [
        {
          id: 'q1',
          type: 'multiple_choice',
          question: 'A quina hora es lleva la Maria?',
          options: ['A les 6', 'A les 7', 'A les 8', 'A les 9'],
          correct: 'A les 7'
        },
        {
          id: 'q2',
          type: 'multiple_choice',
          question: 'Com va a la feina?',
          options: ['A peu', 'En cotxe', 'En autobús', 'En tren'],
          correct: 'En autobús'
        },
        {
          id: 'q3',
          type: 'multiple_choice',
          question: 'Què fa al vespre després de la feina?',
          options: ['Cuina', 'Fa esport', 'Estudia', 'Veu la TV'],
          correct: 'Fa esport'
        }
      ]
    },
    answers: { q1: 'A les 7', q2: 'En autobús', q3: 'Fa esport' }
  },

  // ===== A2 LEVEL EXERCISES =====

  // A2 Grammar
  {
    id: 'a2_gram_past_tense',
    title: 'Passat Perfet Simple',
    description: 'Aprèn a conjugar verbs en passat perfet',
    type: 'grammar',
    level: 'A2',
    category: 'temps verbals',
    tags: ['passat', 'perfet', 'conjugació'],
    difficulty_score: 4,
    estimated_duration: 25,
    content: {
      questions: [
        {
          id: 'q1',
          type: 'fill_blank',
          question: 'Ahir jo (menjar) ____ pizza.',
          correct: 'vaig menjar',
          explanation: 'Passat perfet: vaig + infinitiu'
        },
        {
          id: 'q2',
          type: 'multiple_choice',
          question: 'Ells ___ a París el mes passat.',
          options: ['van anar', 'anaren', 'van anar-hi', 'anaren-hi'],
          correct: 'van anar',
          explanation: 'Forma perifràstica més comuna'
        },
        {
          id: 'q3',
          type: 'fill_blank',
          question: 'Tu (estudiar) ____ molt ahir?',
          correct: 'vas estudiar',
          explanation: 'Tu + vas + infinitiu'
        }
      ]
    },
    answers: { q1: 'vaig menjar', q2: 'van anar', q3: 'vas estudiar' }
  },

  // A2 Writing
  {
    id: 'a2_writ_describe_city',
    title: 'Descriu la teva Ciutat',
    description: 'Escriu una descripció de la teva ciutat natal',
    type: 'writing',
    level: 'A2',
    category: 'descripció',
    tags: ['ciutat', 'descripció', 'redacció'],
    difficulty_score: 3,
    estimated_duration: 30,
    content: {
      prompt: 'Escriu un paràgraf de 80-120 paraules descrivint la teva ciutat natal. Inclou: la ubicació, el clima, els llocs interessants, el que més t\'agrada i el que menys.',
      criteria: [
        'Ús correcte del present i passat',
        'Vocabulari variat sobre ciutat i clima',
        'Estructura clara amb connectors',
        'Ortografia correcta'
      ]
    },
    answers: {},
    time_limit: 30
  },

  // ===== B1 LEVEL EXERCISES =====

  // B1 Grammar
  {
    id: 'b1_gram_subjunctive',
    title: 'Introducció al Subjuntiu',
    description: 'Aprèn els usos bàsics del mode subjuntiu',
    type: 'grammar',
    level: 'B1',
    category: 'modes verbals',
    tags: ['subjuntiu', 'modes', 'desig', 'dubte'],
    difficulty_score: 6,
    estimated_duration: 35,
    content: {
      questions: [
        {
          id: 'q1',
          type: 'multiple_choice',
          question: 'Espero que tu ___ bé.',
          options: ['ets', 'siguis', 'estàs', 'estiguis'],
          correct: 'estiguis',
          explanation: 'Després de "espero que" → subjuntiu (estat temporal)'
        },
        {
          id: 'q2',
          type: 'multiple_choice',
          question: 'Dubto que ells ___ demà.',
          options: ['venen', 'venguin', 'vindran', 'vindrà'],
          correct: 'venguin',
          explanation: 'Després de "dubto que" → subjuntiu'
        },
        {
          id: 'q3',
          type: 'fill_blank',
          question: 'És possible que (ploure) ____ aquesta tarda.',
          correct: 'plogui',
          explanation: 'Possibilitat → subjuntiu'
        }
      ]
    },
    answers: { q1: 'estiguis', q2: 'venguin', q3: 'plogui' }
  },

  // B1 Reading
  {
    id: 'b1_read_catalonia_history',
    title: 'Història Breu de Catalunya',
    description: 'Text sobre moments clau de la història catalana',
    type: 'reading',
    level: 'B1',
    category: 'història',
    tags: ['història', 'catalunya', 'cultura'],
    difficulty_score: 5,
    estimated_duration: 25,
    content: {
      text: 'Catalunya ha tingut una història rica i complexa. Els comtats catalans es van formar durant l\'Edat Mitjana, quan la zona estava sota domini franc. El segle XI va marcar l\'inici de l\'expansió catalana per la Mediterrània. La Corona d\'Aragó, de la qual Catalunya formava part, va convertir-se en una potència marítima important. Durant els segles XIII i XIV, el català es va expandir per les Illes Balears, València i fins i tot Sardenya. Però la Guerra de Successió (1701-1714) va suposar la pèrdua d\'autonomia catalana i l\'inici d\'un llarg període de repressió lingüística i cultural que va durar fins al segle XX.',
      questions: [
        {
          id: 'q1',
          type: 'multiple_choice',
          question: 'Quan es van formar els comtats catalans?',
          options: ['Segle X', 'Edat Mitjana', 'Segle XV', 'Època romana'],
          correct: 'Edat Mitjana'
        },
        {
          id: 'q2',
          type: 'multiple_choice',
          question: 'Quina guerra va suposar la pèrdua d\'autonomia catalana?',
          options: ['Guerra Civil', 'Guerra de Successió', 'Guerra dels Segadors', 'Guerra Mundial'],
          correct: 'Guerra de Successió'
        },
        {
          id: 'q3',
          type: 'text',
          question: 'Explica breument què va passar durant els segles XIII i XIV a Catalunya.',
          correct: 'expansió mediterrània',
          explanation: 'El català es va expandir per la Mediterrània'
        }
      ]
    },
    answers: { q1: 'Edat Mitjana', q2: 'Guerra de Successió', q3: 'expansió mediterrània' }
  },

  // ===== B2 LEVEL EXERCISES =====

  // B2 Grammar
  {
    id: 'b2_gram_conditional',
    title: 'Condicional i Períodes Hipotètics',
    description: 'Domini avançat del condicional i hipòtesis',
    type: 'grammar',
    level: 'B2',
    category: 'condicional',
    tags: ['condicional', 'hipòtesis', 'si'],
    difficulty_score: 7,
    estimated_duration: 30,
    content: {
      questions: [
        {
          id: 'q1',
          type: 'multiple_choice',
          question: 'Si tingués diners, ___ un cotxe nou.',
          options: ['compro', 'compraria', 'comprés', 'he comprat'],
          correct: 'compraria',
          explanation: 'Hipòtesi irreal present → condicional'
        },
        {
          id: 'q2',
          type: 'multiple_choice',
          question: 'Si hagués estudiat més, ___ l\'examen.',
          options: ['aprovarà', 'aprovaria', 'hauria aprovat', 'hagi aprovat'],
          correct: 'hauria aprovat',
          explanation: 'Hipòtesi irreal passat → condicional compost'
        }
      ]
    },
    answers: { q1: 'compraria', q2: 'hauria aprovat' }
  },

  // ===== C1 LEVEL EXERCISES =====

  // C1 Writing
  {
    id: 'c1_writ_argumentative',
    title: 'Assaig Argumentatiu',
    description: 'Redacta un assaig argumentatiu sobre un tema actual',
    type: 'writing',
    level: 'C1',
    category: 'argumentació',
    tags: ['assaig', 'argumentació', 'opinió'],
    difficulty_score: 9,
    estimated_duration: 60,
    content: {
      prompt: 'Redacta un assaig de 300-400 paraules sobre "L\'impacte de les xarxes socials en la societat actual". Presenta arguments a favor i en contra, i expressa la teva opinió personal amb exemples concrets.',
      criteria: [
        'Estructura clara (introducció, desenvolupament, conclusió)',
        'Arguments ben desenvolupats i exemples pertinents',
        'Ús adequat de connectors i marcadors discursius',
        'Registre formal i vocabulari precís',
        'Ortografia i gramàtica impecables'
      ]
    },
    answers: {},
    time_limit: 60
  },

  // ===== C2 LEVEL EXERCISES =====

  // C2 Grammar
  {
    id: 'c2_gram_advanced_syntax',
    title: 'Sintaxi Avançada i Estil',
    description: 'Estructures sintàctiques complexes i recursos estilístics',
    type: 'grammar',
    level: 'C2',
    category: 'sintaxi avançada',
    tags: ['sintaxi', 'estil', 'literatura'],
    difficulty_score: 10,
    estimated_duration: 45,
    content: {
      questions: [
        {
          id: 'q1',
          type: 'multiple_choice',
          question: 'Identifica la figura retòrica: "Volen voler volar"',
          options: ['Al·literació', 'Polípeton', 'Anàfora', 'Quiasme'],
          correct: 'Polípeton',
          explanation: 'Repetició de la mateixa arrel amb variations'
        },
        {
          id: 'q2',
          type: 'text',
          question: 'Transforma aquesta frase en un registre més formal: "El noi va dir que vindria"',
          correct: 'El jove manifestà que compareixeria',
          explanation: 'Registre culte amb lèxic i formes verbals formals'
        }
      ]
    },
    answers: { q1: 'Polípeton', q2: 'El jove manifestà que compareixeria' }
  },

  // ===== EXERCICIS ADDICIONALS ABUNDANTS =====

  // A1 Additional Exercises
  {
    id: 'a1_gram_numbers',
    title: 'Números del 1 al 100',
    description: 'Aprèn a comptar i usar números en català',
    type: 'vocabulary',
    level: 'A1',
    category: 'números',
    tags: ['números', 'comptar', 'quantitats'],
    difficulty_score: 4,
    estimated_duration: 15,
    content: {
      questions: [
        {
          id: 'q1',
          type: 'multiple_choice',
          question: 'Com es diu "15" en català?',
          options: ['quinze', 'setze', 'catorze', 'disset'],
          correct: 'quinze'
        },
        {
          id: 'q2',
          type: 'fill_blank',
          question: 'Després del trenta ve el ____.',
          correct: 'trenta-un'
        },
        {
          id: 'q3',
          type: 'multiple_choice',
          question: 'Com es diu "50" en català?',
          options: ['quaranta', 'cinquanta', 'seixanta', 'setanta'],
          correct: 'cinquanta'
        }
      ]
    },
    answers: { q1: 'quinze', q2: 'trenta-un', q3: 'cinquanta' }
  },

  {
    id: 'a1_vocab_days_months',
    title: 'Dies de la Setmana i Mesos',
    description: 'Vocabulari temporal: dies, mesos i estacions',
    type: 'vocabulary',
    level: 'A1',
    category: 'temps',
    tags: ['dies', 'mesos', 'calendari'],
    difficulty_score: 4,
    estimated_duration: 12,
    content: {
      questions: [
        {
          id: 'q1',
          type: 'multiple_choice',
          question: 'Quin dia va abans del diumenge?',
          options: ['divendres', 'dissabte', 'dilluns', 'dimarts'],
          correct: 'dissabte'
        },
        {
          id: 'q2',
          type: 'fill_blank',
          question: 'El primer mes de l\'any és ____.',
          correct: 'gener'
        },
        {
          id: 'q3',
          type: 'multiple_choice',
          question: 'En quin mes és Nadal?',
          options: ['novembre', 'desembre', 'gener', 'febrer'],
          correct: 'desembre'
        }
      ]
    },
    answers: { q1: 'dissabte', q2: 'gener', q3: 'desembre' }
  },

  {
    id: 'a1_gram_present_tense',
    title: 'Present d\'Indicatiu - Verbs Regulars',
    description: 'Conjugació de verbs regulars en present',
    type: 'grammar',
    level: 'A1',
    category: 'conjugació',
    tags: ['present', 'verbs regulars', 'conjugació'],
    difficulty_score: 3,
    estimated_duration: 20,
    content: {
      questions: [
        {
          id: 'q1',
          type: 'fill_blank',
          question: 'Jo (parlar) ____ català.',
          correct: 'parlo'
        },
        {
          id: 'q2',
          type: 'multiple_choice',
          question: 'Ells ____ a casa.',
          options: ['viu', 'vius', 'viuen', 'vivim'],
          correct: 'viuen'
        },
        {
          id: 'q3',
          type: 'fill_blank',
          question: 'Tu (menjar) ____ verdures?',
          correct: 'menges'
        }
      ]
    },
    answers: { q1: 'parlo', q2: 'viuen', q3: 'menges' }
  },

  // A2 Additional Exercises
  {
    id: 'a2_gram_future_tense',
    title: 'Futur Simple',
    description: 'Aprèn a expressar accions futures',
    type: 'grammar',
    level: 'A2',
    category: 'temps verbals',
    tags: ['futur', 'temps verbal', 'plans'],
    difficulty_score: 4,
    estimated_duration: 25,
    content: {
      questions: [
        {
          id: 'q1',
          type: 'fill_blank',
          question: 'Demà jo (anar) ____ al cinema.',
          correct: 'aniré'
        },
        {
          id: 'q2',
          type: 'multiple_choice',
          question: 'Ells ____ el proper cap de setmana.',
          options: ['vindran', 'vindrà', 'vénen', 'van venir'],
          correct: 'vindran'
        },
        {
          id: 'q3',
          type: 'fill_blank',
          question: 'Tu (estar) ____ ocupat demà?',
          correct: 'estaràs'
        }
      ]
    },
    answers: { q1: 'aniré', q2: 'vindran', q3: 'estaràs' }
  },

  {
    id: 'a2_vocab_house',
    title: 'La Casa i els Mobles',
    description: 'Vocabulari sobre habitacions i mobles de casa',
    type: 'vocabulary',
    level: 'A2',
    category: 'casa',
    tags: ['casa', 'mobles', 'habitacions'],
    difficulty_score: 3,
    estimated_duration: 18,
    content: {
      questions: [
        {
          id: 'q1',
          type: 'multiple_choice',
          question: 'On cozinem el menjar?',
          options: ['bany', 'cuina', 'dormitori', 'sala d\'estar'],
          correct: 'cuina'
        },
        {
          id: 'q2',
          type: 'fill_blank',
          question: 'Per dormir necessitem un ____.',
          correct: 'llit'
        },
        {
          id: 'q3',
          type: 'multiple_choice',
          question: 'On ens rentem les dents?',
          options: ['cuina', 'terrassa', 'bany', 'passadís'],
          correct: 'bany'
        }
      ]
    },
    answers: { q1: 'cuina', q2: 'llit', q3: 'bany' }
  },

  {
    id: 'a2_read_weather',
    title: 'El Temps Meteorològic',
    description: 'Lectura sobre el clima i les estacions',
    type: 'reading',
    level: 'A2',
    category: 'temps meteorològic',
    tags: ['clima', 'estacions', 'temps'],
    difficulty_score: 3,
    estimated_duration: 20,
    content: {
      text: 'A Catalunya hi ha un clima mediterrani amb quatre estacions ben diferenciades. La primavera és suau i plou força. L\'estiu és calorós i sec, especialment al juliol i agost. La tardor és fresca i també hi ha pluges. L\'hivern és fred però no extrem, i de vegades neva a les muntanyes. La temperatura mitjana a l\'estiu és de 25-30 graus, i a l\'hivern entre 5-15 graus. El millor temps per visitar Catalunya és durant la primavera i la tardor.',
      questions: [
        {
          id: 'q1',
          type: 'multiple_choice',
          question: 'Com és l\'estiu a Catalunya?',
          options: ['Fred i plujós', 'Calorós i sec', 'Suau i ventós', 'Humit i fred'],
          correct: 'Calorós i sec'
        },
        {
          id: 'q2',
          type: 'multiple_choice',
          question: 'Quan neva a Catalunya?',
          options: ['Només a l\'estiu', 'A les muntanyes a l\'hivern', 'Tot l\'any', 'Mai'],
          correct: 'A les muntanyes a l\'hivern'
        },
        {
          id: 'q3',
          type: 'multiple_choice',
          question: 'Quines són les millors estacions per visitar Catalunya?',
          options: ['Estiu i hivern', 'Només estiu', 'Primavera i tardor', 'Només hivern'],
          correct: 'Primavera i tardor'
        }
      ]
    },
    answers: { q1: 'Calorós i sec', q2: 'A les muntanyes a l\'hivern', q3: 'Primavera i tardor' }
  },

  // B1 Additional Exercises
  {
    id: 'b1_gram_past_continuous',
    title: 'Imperfet d\'Indicatiu',
    description: 'Usos de l\'imperfet per expressar accions habituals del passat',
    type: 'grammar',
    level: 'B1',
    category: 'temps verbals',
    tags: ['imperfet', 'passat', 'hàbits'],
    difficulty_score: 5,
    estimated_duration: 30,
    content: {
      questions: [
        {
          id: 'q1',
          type: 'multiple_choice',
          question: 'Quan era petit, jo ____ molt futbol.',
          options: ['jugava', 'vaig jugar', 'he jugat', 'jugaré'],
          correct: 'jugava'
        },
        {
          id: 'q2',
          type: 'fill_blank',
          question: 'Abans nosaltres (viure) ____ a Barcelona.',
          correct: 'vivíem'
        },
        {
          id: 'q3',
          type: 'multiple_choice',
          question: 'Ells sempre ____ tard dels concerts.',
          options: ['arribaven', 'van arribar', 'arribaran', 'han arribat'],
          correct: 'arribaven'
        }
      ]
    },
    answers: { q1: 'jugava', q2: 'vivíem', q3: 'arribaven' }
  },

  {
    id: 'b1_vocab_work',
    title: 'El Món Laboral',
    description: 'Vocabulari sobre professió, oficina i condicions de treball',
    type: 'vocabulary',
    level: 'B1',
    category: 'treball',
    tags: ['feina', 'professió', 'oficina'],
    difficulty_score: 4,
    estimated_duration: 25,
    content: {
      questions: [
        {
          id: 'q1',
          type: 'multiple_choice',
          question: 'Qui dirigeix una empresa?',
          options: ['empleat', 'director', 'client', 'proveïdor'],
          correct: 'director'
        },
        {
          id: 'q2',
          type: 'fill_blank',
          question: 'Els treballadors reben un ____ cada mes.',
          correct: 'salari'
        },
        {
          id: 'q3',
          type: 'multiple_choice',
          question: 'Quan no tens feina estàs en situació d\'____.',
          options: ['ocupació', 'atur', 'jubilació', 'vacances'],
          correct: 'atur'
        }
      ]
    },
    answers: { q1: 'director', q2: 'salari', q3: 'atur' }
  },

  // B2 Additional Exercises
  {
    id: 'b2_gram_passive_voice',
    title: 'Veu Passiva',
    description: 'Transformació d\'oracions actives a passives',
    type: 'grammar',
    level: 'B2',
    category: 'sintaxi',
    tags: ['passiva', 'transformació', 'sintaxi'],
    difficulty_score: 6,
    estimated_duration: 35,
    content: {
      questions: [
        {
          id: 'q1',
          type: 'text',
          question: 'Transforma a passiva: "L\'arquitecte ha dissenyat l\'edifici"',
          correct: 'L\'edifici ha estat dissenyat per l\'arquitecte',
          explanation: 'Veu passiva amb auxiliar ser + participi'
        },
        {
          id: 'q2',
          type: 'multiple_choice',
          question: 'Quina és la passiva de "Els estudiants llegeixen el llibre"?',
          options: [
            'El llibre és llegit pels estudiants',
            'El llibre llegeix els estudiants',
            'Els estudiants són llegits pel llibre',
            'El llibre llegirà els estudiants'
          ],
          correct: 'El llibre és llegit pels estudiants'
        }
      ]
    },
    answers: { q1: 'L\'edifici ha estat dissenyat per l\'arquitecte', q2: 'El llibre és llegit pels estudiants' }
  },

  {
    id: 'b2_writ_formal_letter',
    title: 'Carta Formal',
    description: 'Redacta una carta formal de queixa o sol·licitud',
    type: 'writing',
    level: 'B2',
    category: 'correspondència',
    tags: ['carta', 'formal', 'queixa'],
    difficulty_score: 6,
    estimated_duration: 45,
    content: {
      prompt: 'Escriu una carta formal de 150-200 paraules dirigida a l\'ajuntament per queixar-te del soroll nocturn al teu barri. Inclou: salutació formal, exposició del problema, petició d\'actuació i comiat adequat.',
      criteria: [
        'Estructura formal correcta',
        'Registre adequat i cortès',
        'Exposició clara del problema',
        'Petició raonable i ben argumentada',
        'Ortografia i puntuació correctes'
      ]
    },
    answers: {}
  },

  // C1 Additional Exercises
  {
    id: 'c1_gram_reported_speech',
    title: 'Estil Indirecte Avançat',
    description: 'Transformació d\'oracions en estil indirecte amb canvis temporals',
    type: 'grammar',
    level: 'C1',
    category: 'estil indirecte',
    tags: ['indirecte', 'transformació', 'temps verbals'],
    difficulty_score: 8,
    estimated_duration: 40,
    content: {
      questions: [
        {
          id: 'q1',
          type: 'text',
          question: 'Transforma: La Maria va dir: "Vindré demà matí"',
          correct: 'La Maria va dir que vindria l\'endemà al matí',
          explanation: 'Canvi temporal: vindré → vindria, demà → endemà'
        },
        {
          id: 'q2',
          type: 'multiple_choice',
          question: 'Ell em va preguntar: "Has acabat els deures?" →',
          options: [
            'Em va preguntar si havia acabat els deures',
            'Em va preguntar si he acabat els deures',
            'Em va preguntar si acabaré els deures',
            'Em va preguntar si acabava els deures'
          ],
          correct: 'Em va preguntar si havia acabat els deures'
        }
      ]
    },
    answers: { q1: 'La Maria va dir que vindria l\'endemà al matí', q2: 'Em va preguntar si havia acabat els deures' }
  },

  {
    id: 'c1_vocab_politics',
    title: 'Política i Societat',
    description: 'Vocabulari avançat sobre política, democràcia i institucions',
    type: 'vocabulary',
    level: 'C1',
    category: 'política',
    tags: ['política', 'democràcia', 'institucions'],
    difficulty_score: 7,
    estimated_duration: 30,
    content: {
      questions: [
        {
          id: 'q1',
          type: 'multiple_choice',
          question: 'Com s\'anomena l\'òrgan que fa les lleis?',
          options: ['executiu', 'legislatiu', 'judicial', 'administratiu'],
          correct: 'legislatiu'
        },
        {
          id: 'q2',
          type: 'fill_blank',
          question: 'El dret a votar s\'anomena ____ universal.',
          correct: 'sufragi'
        },
        {
          id: 'q3',
          type: 'multiple_choice',
          question: 'Quin és el sinònim d\'autonomia política?',
          options: ['dependència', 'sobirania', 'subordinació', 'vassallatge'],
          correct: 'sobirania'
        }
      ]
    },
    answers: { q1: 'legislatiu', q2: 'sufragi', q3: 'sobirania' }
  },

  // C2 Additional Exercises
  {
    id: 'c2_read_literature',
    title: 'Anàlisi Literària: Mercè Rodoreda',
    description: 'Lectura i anàlisi d\'un fragment de "La plaça del Diamant"',
    type: 'reading',
    level: 'C2',
    category: 'literatura',
    tags: ['literatura', 'Rodoreda', 'anàlisi'],
    difficulty_score: 10,
    estimated_duration: 50,
    content: {
      text: 'Aquell vespre de la festa major, quan el Quimet em va treure a ballar, jo no sabia que aquella música em duria fins aquí. [...] I el Quimet em feia voltar i més voltar, i a cada volta els papers de colors que penjaven dels fils es gronxaven i em semblava que tot el cel se m\'havia posat a ballar i que les estrelles feien el salt de la perdiu.',
      questions: [
        {
          id: 'q1',
          type: 'text',
          question: 'Analitza l\'ús del temps verbal en aquest fragment',
          correct: 'ús de l\'imperfet narratiu',
          explanation: 'L\'imperfet crea atmosfera i marca la retrospectiva'
        },
        {
          id: 'q2',
          type: 'multiple_choice',
          question: 'Quina figura retòrica predomina en "tot el cel se m\'havia posat a ballar"?',
          options: ['Metàfora', 'Personificació', 'Hipèrbol', 'Sinestèsia'],
          correct: 'Personificació'
        }
      ]
    },
    answers: { q1: 'ús de l\'imperfet narratiu', q2: 'Personificació' }
  },

  // MASSIU CONTINGUT ADDICIONAL PER ASSEGURAR ABUNDÀNCIA D'XP

  // A1 EXERCICIS EXTRES
  {
    id: 'a1_vocab_clothes',
    title: 'Roba i Accessories',
    description: 'Vocabulari sobre peces de vestir i accessories',
    type: 'vocabulary',
    level: 'A1',
    category: 'roba',
    tags: ['roba', 'accessories', 'colors'],
    difficulty_score: 4,
    estimated_duration: 15,
    content: {
      questions: [
        {
          id: 'q1',
          type: 'multiple_choice',
          question: 'Què portem als peus?',
          options: ['barret', 'sabates', 'guants', 'bufanda'],
          correct: 'sabates'
        },
        {
          id: 'q2',
          type: 'fill_blank',
          question: 'Quan plou porto un ____.',
          correct: 'paraigua'
        }
      ]
    },
    answers: { q1: 'sabates', q2: 'paraigua' }
  },

  {
    id: 'a1_vocab_food',
    title: 'Menjar i Begudes',
    description: 'Vocabulari bàsic d\'aliments i begudes',
    type: 'vocabulary',
    level: 'A1',
    category: 'menjar',
    tags: ['aliments', 'begudes', 'cuina'],
    difficulty_score: 4,
    estimated_duration: 18,
    content: {
      questions: [
        {
          id: 'q1',
          type: 'multiple_choice',
          question: 'Què mengem al matí?',
          options: ['sopar', 'esmorzar', 'dinar', 'berenar'],
          correct: 'esmorzar'
        },
        {
          id: 'q2',
          type: 'fill_blank',
          question: 'El pa es fa amb ____.',
          correct: 'farina'
        }
      ]
    },
    answers: { q1: 'esmorzar', q2: 'farina' }
  },

  {
    id: 'a1_gram_possessives',
    title: 'Adjectius Possessius',
    description: 'Aprèn a usar els possessius: el meu, la teva, el seu...',
    type: 'grammar',
    level: 'A1',
    category: 'possessius',
    tags: ['possessius', 'determinants', 'família'],
    difficulty_score: 3,
    estimated_duration: 20,
    content: {
      questions: [
        {
          id: 'q1',
          type: 'multiple_choice',
          question: 'Aquest és ____ llibre (de tu)',
          options: ['el meu', 'el teu', 'el seu', 'el nostre'],
          correct: 'el teu'
        },
        {
          id: 'q2',
          type: 'fill_blank',
          question: 'Aquesta és ____ casa (de nosaltres)',
          correct: 'la nostra'
        }
      ]
    },
    answers: { q1: 'el teu', q2: 'la nostra' }
  },

  // A2 EXERCICIS EXTRES
  {
    id: 'a2_gram_prepositions',
    title: 'Preposicions de Lloc',
    description: 'Aprèn a usar a, en, des de, fins a, entre...',
    type: 'grammar',
    level: 'A2',
    category: 'preposicions',
    tags: ['preposicions', 'lloc', 'direcció'],
    difficulty_score: 4,
    estimated_duration: 25,
    content: {
      questions: [
        {
          id: 'q1',
          type: 'multiple_choice',
          question: 'Vaig ____ Barcelona cada dia',
          options: ['a', 'en', 'des de', 'per'],
          correct: 'a'
        },
        {
          id: 'q2',
          type: 'fill_blank',
          question: 'El llibre està ____ la taula',
          correct: 'sobre'
        }
      ]
    },
    answers: { q1: 'a', q2: 'sobre' }
  },

  {
    id: 'a2_vocab_transport',
    title: 'Transport Públic',
    description: 'Vocabulari sobre mitjans de transport i viatges',
    type: 'vocabulary',
    level: 'A2',
    category: 'transport',
    tags: ['transport', 'viatges', 'ciutat'],
    difficulty_score: 3,
    estimated_duration: 20,
    content: {
      questions: [
        {
          id: 'q1',
          type: 'multiple_choice',
          question: 'Quin transport va per rails?',
          options: ['autobús', 'tren', 'avió', 'vaixell'],
          correct: 'tren'
        },
        {
          id: 'q2',
          type: 'fill_blank',
          question: 'Per viatjar en avió vaig a l\'____',
          correct: 'aeroport'
        }
      ]
    },
    answers: { q1: 'tren', q2: 'aeroport' }
  },

  // B1 EXERCICIS EXTRES
  {
    id: 'b1_gram_relative_pronouns',
    title: 'Pronoms Relatius',
    description: 'Aprèn a usar que, qui, el qual, on...',
    type: 'grammar',
    level: 'B1',
    category: 'pronoms',
    tags: ['relatius', 'oracions subordinades'],
    difficulty_score: 6,
    estimated_duration: 35,
    content: {
      questions: [
        {
          id: 'q1',
          type: 'multiple_choice',
          question: 'L\'home ____ vaig veure ahir és el meu professor',
          options: ['que', 'qui', 'el qual', 'on'],
          correct: 'que'
        },
        {
          id: 'q2',
          type: 'fill_blank',
          question: 'La ciutat ____ visc és molt bonica',
          correct: 'on'
        }
      ]
    },
    answers: { q1: 'que', q2: 'on' }
  },

  {
    id: 'b1_read_environment',
    title: 'Medi Ambient i Sostenibilitat',
    description: 'Lectura sobre problemes ambientals i solucions',
    type: 'reading',
    level: 'B1',
    category: 'medi ambient',
    tags: ['sostenibilitat', 'ecologia', 'natura'],
    difficulty_score: 5,
    estimated_duration: 25,
    content: {
      text: 'El canvi climàtic és un dels grans reptes del segle XXI. Les temperatures globals han augmentat significativament a causa de les emissions de gasos d\'efecte hivernacle. Per combatre aquest problema, cal reduir el consum d\'energia, utilitzar transports més ecològics i apostar per les energies renovables. A Catalunya, s\'estan desenvolupant parcs eòlics i solars per generar electricitat neta.',
      questions: [
        {
          id: 'q1',
          type: 'multiple_choice',
          question: 'Què provoca l\'augment de temperatures?',
          options: ['El vent', 'Les emissions de gasos', 'La lluna', 'Els oceans'],
          correct: 'Les emissions de gasos'
        },
        {
          id: 'q2',
          type: 'multiple_choice',
          question: 'Quin tipus d\'energia s\'usa a Catalunya?',
          options: ['Carbó', 'Eòlica i solar', 'Nuclear', 'Petroliera'],
          correct: 'Eòlica i solar'
        }
      ]
    },
    answers: { q1: 'Les emissions de gasos', q2: 'Eòlica i solar' }
  },

  // B2 EXERCICIS EXTRES
  {
    id: 'b2_writ_opinion_essay',
    title: 'Assaig d\'Opinió: Tecnologia',
    description: 'Escriu un assaig sobre l\'impacte de la tecnologia',
    type: 'writing',
    level: 'B2',
    category: 'assaig',
    tags: ['opinió', 'tecnologia', 'argumentació'],
    difficulty_score: 6,
    estimated_duration: 40,
    content: {
      prompt: 'Escriu un assaig de 200-250 paraules sobre "Els avantatges i inconvenients de les xarxes socials". Inclou introducció, arguments a favor, arguments en contra i conclusió.',
      criteria: [
        'Estructura clara i ben organitzada',
        'Arguments sòlids amb exemples',
        'Ús correcte de connectors',
        'Vocabulari variat i adequat',
        'Gramàtica i ortografia correctes'
      ]
    },
    answers: {}
  },

  {
    id: 'b2_vocab_emotions',
    title: 'Emocions i Sentiments',
    description: 'Vocabulari avançat per expressar emocions',
    type: 'vocabulary',
    level: 'B2',
    category: 'emocions',
    tags: ['sentiments', 'psicologia', 'expressió'],
    difficulty_score: 5,
    estimated_duration: 30,
    content: {
      questions: [
        {
          id: 'q1',
          type: 'multiple_choice',
          question: 'Com es diu quan estàs molt nerviós?',
          options: ['tranquil', 'ansiós', 'alegre', 'trist'],
          correct: 'ansiós'
        },
        {
          id: 'q2',
          type: 'fill_blank',
          question: 'Quan algú mor, sentim ____',
          correct: 'dolor'
        }
      ]
    },
    answers: { q1: 'ansiós', q2: 'dolor' }
  },

  // C1 EXERCICIS EXTRES
  {
    id: 'c1_writ_formal_report',
    title: 'Informe Tècnic',
    description: 'Redacta un informe formal sobre un tema professional',
    type: 'writing',
    level: 'C1',
    category: 'informe',
    tags: ['formal', 'professional', 'tècnic'],
    difficulty_score: 8,
    estimated_duration: 60,
    content: {
      prompt: 'Redacta un informe de 350-400 paraules sobre "L\'impacte del teletreball en la productivitat empresarial". Inclou dades objectives, anàlisi i recomanacions.',
      criteria: [
        'Estructura formal d\'informe',
        'Registre professional i objectiu',
        'Ús de dades i exemples concrets',
        'Anàlisi crítica i recomanacions',
        'Precisió lingüística i terminològica'
      ]
    },
    answers: {}
  },

  {
    id: 'c1_gram_advanced_connectors',
    title: 'Connectors Textuals Avançats',
    description: 'Domini de connectors complexos per a textos formals',
    type: 'grammar',
    level: 'C1',
    category: 'connectors',
    tags: ['connectors', 'coherència', 'formal'],
    difficulty_score: 7,
    estimated_duration: 35,
    content: {
      questions: [
        {
          id: 'q1',
          type: 'multiple_choice',
          question: 'Quin connector expressa consequència?',
          options: ['tot i que', 'per tant', 'malgrat', 'sempre que'],
          correct: 'per tant'
        },
        {
          id: 'q2',
          type: 'fill_blank',
          question: '____ les dificultats, vam aconseguir l\'objectiu',
          correct: 'Malgrat'
        }
      ]
    },
    answers: { q1: 'per tant', q2: 'Malgrat' }
  },

  // C2 EXERCICIS EXTRES  
  {
    id: 'c2_writ_creative',
    title: 'Redacció Creativa Avançada',
    description: 'Crea un text literari amb estil personal',
    type: 'writing',
    level: 'C2',
    category: 'creativa',
    tags: ['literatura', 'creativitat', 'estil'],
    difficulty_score: 10,
    estimated_duration: 75,
    content: {
      prompt: 'Escriu un relat de 400-500 paraules titulat "L\'última carta". Utilitza recursos literaris avançats i crea una atmosfera emocional intensa.',
      criteria: [
        'Creativitat i originalitat narrativa',
        'Domini de recursos estilístics',
        'Construcció d\'atmosfera i personatges',
        'Perfecció lingüística i estètica',
        'Coherència narrativa i temàtica'
      ]
    },
    answers: {}
  }
  // TOTAL: Més de 35 exercicis per garantir abundància d'oportunitats d'XP
];

// Helper functions for filtering exercises
export const getExercisesByLevel = (level: string): ExerciseData[] => {
  return EXERCISE_DATABASE.filter(ex => ex.level === level);
};

export const getExercisesByType = (type: string): ExerciseData[] => {
  return EXERCISE_DATABASE.filter(ex => ex.type === type);
};

export const getExercisesByCategory = (category: string): ExerciseData[] => {
  return EXERCISE_DATABASE.filter(ex => ex.category === category);
};

export const getExercisesForClass = (classLevel: string): ExerciseData[] => {
  const levelHierarchy = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];
  const maxLevelIndex = levelHierarchy.indexOf(classLevel);

  if (maxLevelIndex === -1) return EXERCISE_DATABASE;

  return EXERCISE_DATABASE.filter(ex => {
    const exerciseLevelIndex = levelHierarchy.indexOf(ex.level);
    return exerciseLevelIndex <= maxLevelIndex + 1; // Allow one level above for challenge
  });
};