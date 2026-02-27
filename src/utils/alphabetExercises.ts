import { OrthographyExercise } from '@/features/courses/data/catalanOrthographyData';

// Exercises for L'ALFABET and LA SÍL·LABA sections
export const ALPHABET_EXERCISES: OrthographyExercise[] = [
  // L'ALFABET - Exercises based on the provided content
  {
    id: 'alfabet_1',
    type: 'multiple_choice',
    question: 'Quin és el nom correcte de la lletra "h"?',
    options: ['hac', 'ha', 'hache', 'hatx'],
    correctAnswer: 'hac',
    explanation: 'El nom de la lletra "h" en català és "hac"',
    difficulty: 1
  },
  {
    id: 'alfabet_2',
    type: 'multiple_choice',
    question: 'Quin so fa la lletra "g" a la paraula "gestió"?',
    options: ['so dur com a "gat"', 'so suau com a "gent"', 'so com a "guerra"', 'no es pronuncia'],
    correctAnswer: 'so suau com a "gent"',
    explanation: 'A "gestió", la g seguida de "e" o "i" fa un so suau',
    difficulty: 2
  },
  {
    id: 'alfabet_3',
    type: 'fill_blank',
    question: 'Escriu el nom de la lletra "ç":',
    correctAnswer: ['ce trencada', 'ce trencada'],
    explanation: 'La lletra ç es diu "ce trencada" en català',
    difficulty: 1
  },
  {
    id: 'alfabet_4',
    type: 'multiple_choice',
    question: 'En quines paraules la lletra "c" té sons diferents?',
    options: [
      'camí, congrés, pòrtic',
      'casa, coca, cuc',
      'col·legi, color, cop',
      'cant, cant, cant'
    ],
    correctAnswer: 'camí, congrés, pòrtic',
    explanation: 'En "camí" sona /k/, en "congrés" sona /k/ i en "pòrtic" sona /k/ final',
    difficulty: 2
  },
  {
    id: 'alfabet_5',
    type: 'multiple_choice',
    question: 'Ordena alfabèticament: brut, zebra, home',
    options: [
      'brut, home, zebra',
      'home, brut, zebra',
      'zebra, home, brut',
      'brut, zebra, home'
    ],
    correctAnswer: 'brut, home, zebra',
    explanation: 'L\'ordre alfabètic és: b (brut), h (home), z (zebra)',
    difficulty: 1
  },
  {
    id: 'alfabet_6',
    type: 'multiple_choice',
    question: 'Ordena alfabèticament: jutge, jutjat, jutgessa',
    options: [
      'jutge, jutgessa, jutjat',
      'jutgessa, jutge, jutjat',
      'jutge, jutjat, jutgessa',
      'jutjat, jutge, jutgessa'
    ],
    correctAnswer: 'jutge, jutgessa, jutjat',
    explanation: 'Quan les primeres lletres són iguals, mirem les següents: g abans de j',
    difficulty: 2
  },
  {
    id: 'alfabet_7',
    type: 'fill_blank',
    question: 'Escriu l\'abreviatura de "Tribunal Superior de Justícia":',
    correctAnswer: ['TSJ', 'tsj'],
    explanation: 'TSJ són les inicials de Tribunal Superior de Justícia',
    difficulty: 1
  },
  {
    id: 'alfabet_8',
    type: 'multiple_choice',
    question: 'Quina d\'aquestes lletres gairebé sempre és muda?',
    options: ['g', 'h', 'j', 'k'],
    correctAnswer: 'h',
    explanation: 'La lletra "h" gairebé sempre és muda en català: hàbil, adhesió, hereu',
    difficulty: 1
  },
  {
    id: 'alfabet_9',
    type: 'multiple_choice',
    question: 'Ordena alfabèticament: loció, laberint, llop',
    options: [
      'laberint, loció, llop',
      'laberint, llop, loció',
      'llop, laberint, loció',
      'loció, llop, laberint'
    ],
    correctAnswer: 'laberint, llop, loció',
    explanation: 'L\'ordre alfabètic és: la (laberint), ll (llop), lo (loció). La "ll" va després de "l"',
    difficulty: 2
  },
  {
    id: 'alfabet_10',
    type: 'multiple_choice',
    question: 'Quina d\'aquestes NO és un aliment vegetal?',
    options: ['julivert', 'lluç', 'síndria', 'tomàquet'],
    correctAnswer: 'lluç',
    explanation: 'El lluç és un peix, per tant no és un aliment vegetal',
    difficulty: 1
  },

  // LA SÍL·LABA - Exercises based on the provided content
  {
    id: 'sillaba_1',
    type: 'fill_blank',
    question: 'Separa en síl·labes: ordinador',
    correctAnswer: ['or-di-na-dor', 'or di na dor'],
    explanation: 'La paraula "ordinador" es divideix en: or-di-na-dor (4 síl·labes)',
    difficulty: 1
  },
  {
    id: 'sillaba_2',
    type: 'multiple_choice',
    question: 'Quantes síl·labes té la paraula "estomacar"?',
    options: ['3', '4', '5', '6'],
    correctAnswer: '4',
    explanation: 'es-to-ma-car té 4 síl·labes',
    difficulty: 1
  },
  {
    id: 'sillaba_3',
    type: 'multiple_choice',
    question: 'Quina és la síl·laba tònica de "camisa"?',
    options: ['ca', 'mi', 'sa', 'cap'],
    correctAnswer: 'mi',
    explanation: 'A "camisa" (ca-MI-sa), la síl·laba tònica és "mi"',
    difficulty: 2
  },
  {
    id: 'sillaba_4',
    type: 'multiple_choice',
    question: 'Quina d\'aquestes paraules conté un diftong?',
    options: ['teatre', 'reina', 'Maria', 'Joan'],
    correctAnswer: 'reina',
    explanation: '"reina" (rei-na) té un diftong "ei". Les altres no en tenen',
    difficulty: 2
  },
  {
    id: 'sillaba_5',
    type: 'fill_blank',
    question: 'Separa en síl·labes: Eulàlia',
    correctAnswer: ['Eu-là-li-a', 'Eu là li a'],
    explanation: 'Eulàlia es divideix en: Eu-là-li-a (4 síl·labes)',
    difficulty: 2
  },
  {
    id: 'sillaba_6',
    type: 'multiple_choice',
    question: 'Quina combinació forma un diftong decreixent?',
    options: ['ua', 'ai', 'ie', 'io'],
    correctAnswer: 'ai',
    explanation: 'Els diftongs decreixents són: ai, ei, oi, ui, au, eu, iu, ou',
    difficulty: 2
  },
  {
    id: 'sillaba_7',
    type: 'multiple_choice',
    question: 'Com separem la paraula "interurbà"?',
    options: ['in-te-rur-bà', 'in-ter-ur-bà', 'inte-rur-bà', 'inter-urbà'],
    correctAnswer: 'in-ter-ur-bà',
    explanation: 'En mots compostos, hem de destriar els elements: in-ter-ur-bà',
    difficulty: 3
  },
  {
    id: 'sillaba_8',
    type: 'multiple_choice',
    question: 'Separa correctament "carro":',
    options: ['ca-rro', 'car-ro', 'carr-o', 'c-arro'],
    correctAnswer: 'car-ro',
    explanation: 'El dígraf "rr" es separa: car-ro',
    difficulty: 2
  },
  {
    id: 'sillaba_9',
    type: 'multiple_choice',
    question: 'Com NO podem separar al final de línia?',
    options: ['or-di-nador', 'farmàci-a', 'ele-fant', 'vaca-nces'],
    correctAnswer: 'farmàci-a',
    explanation: 'No podem deixar una sola lletra al final de línia: farmàci-a és incorrecte',
    difficulty: 2
  },
  {
    id: 'sillaba_10',
    type: 'multiple_choice',
    question: 'Quantes síl·labes té "treure"?',
    options: ['1', '2', '3', '4'],
    correctAnswer: '2',
    explanation: 'treu-re té 2 síl·labes. La combinació "eu" forma diftong',
    difficulty: 2
  },
  {
    id: 'sillaba_11',
    type: 'fill_blank',
    question: 'Separa en síl·labes: quantitat',
    correctAnswer: ['quan-ti-tat', 'quan ti tat'],
    explanation: '"quantitat" es divideix en: quan-ti-tat (3 síl·labes)',
    difficulty: 2
  },
  {
    id: 'sillaba_12',
    type: 'multiple_choice',
    question: 'La paraula "ianqui" conté:',
    options: ['diftong', 'hiat', 'triftong', 'cap d\'aquestes'],
    correctAnswer: 'hiat',
    explanation: '"ianqui" (i-an-qui) conté un hiat perquè les vocals no es pronuncien juntes',
    difficulty: 3
  },
  {
    id: 'sillaba_13',
    type: 'multiple_choice',
    question: 'Quin dígraf NO podem separar?',
    options: ['rr', 'ss', 'll', 'tx'],
    correctAnswer: 'll',
    explanation: 'Els dígrafs que no podem separar són: gu, qu, ll, ig, ny. Els altres sí es separen',
    difficulty: 3
  },
  {
    id: 'sillaba_14',
    type: 'multiple_choice',
    question: 'Com separem "ascensor"?',
    options: ['as-cen-sor', 'asc-en-sor', 'as-ce-nsor', 'a-scen-sor'],
    correctAnswer: 'as-cen-sor',
    explanation: 'El dígraf "sc" es separa: as-cen-sor',
    difficulty: 3
  },
  {
    id: 'sillaba_15',
    type: 'multiple_choice',
    question: 'La paraula "boira" conté un diftong:',
    options: ['creixent', 'decreixent', 'no té diftong', 'triftong'],
    correctAnswer: 'decreixent',
    explanation: '"boira" (boi-ra) conté el diftong decreixent "oi"',
    difficulty: 2
  }
];
