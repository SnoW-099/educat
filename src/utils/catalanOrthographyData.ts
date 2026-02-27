// Comprehensive Catalan Orthography Exercise System
// Based on official Catalan language curriculum

export interface OrthographyExercise {
  id: string;
  type: 'fill_blank' | 'multiple_choice' | 'dictation' | 'ordering' | 'matching' | 'classification' | 'text_completion' | 'transformation' | 'true_false' | 'text_correction';
  question: string;
  options?: string[];
  correctAnswer: string | string[];
  explanation: string;
  difficulty: 1 | 2 | 3 | 4 | 5;
}

export interface OrthographySection {
  id: string;
  title: string;
  description: string;
  category: 'ortografia' | 'morfosintaxi' | 'lexic';
  subsections?: OrthographySubsection[];
  exercises: OrthographyExercise[];
}

export interface OrthographySubsection {
  id: string;
  title: string;
  content: string;
  exercises: OrthographyExercise[];
}

// Import book exercises and additional exercises
import { CATALAN_ORTHOGRAPHY_BOOK_SECTIONS, BookOrthographyExercise } from './catalanOrthographyBookData';
import { ADDITIONAL_ORTHOGRAPHY_SECTIONS } from './additionalOrthographyExercises';
import { ALPHABET_EXERCISES } from './alphabetExercises';

// Convert book exercises to standard format
const convertBookExerciseToStandard = (bookExercise: BookOrthographyExercise): OrthographyExercise => ({
  id: bookExercise.id,
  type: bookExercise.type,
  question: bookExercise.question,
  options: bookExercise.options,
  correctAnswer: bookExercise.correctAnswer,
  explanation: bookExercise.explanation,
  difficulty: bookExercise.difficulty
});

// Export sections with proper naming - FIRST DECLARATION
const TEMP_ORTHOGRAPHY_SECTIONS: OrthographySection[] = [
  // ADD BOOK SECTIONS FIRST
  ...CATALAN_ORTHOGRAPHY_BOOK_SECTIONS.map(section => ({
    id: section.id,
    title: section.title,
    description: section.description,
    category: 'ortografia' as const,
    exercises: section.exercises.map(convertBookExerciseToStandard)
  })),

  // ADD ADDITIONAL ORTHOGRAPHY SECTIONS
  ...ADDITIONAL_ORTHOGRAPHY_SECTIONS,

  // ADD ALPHABET AND SYLLABLE EXERCISES
  {
    id: 'alfabet_sillaba',
    title: 'L\'Alfabet i la Síl·laba',
    description: 'Exercicis sobre l\'alfabet català i la divisió sil·làbica',
    category: 'ortografia' as const,
    exercises: ALPHABET_EXERCISES
  },
  {
    id: 'accentuacio_c1',
    title: 'Accentuació C1',
    description: 'Separació de síl·labes i classificació segons la síl·laba tònica',
    category: 'ortografia' as const,
    exercises: [
      {
        id: 'c1_sillaba_tonica',
        type: 'classification',
        question: 'Separeu en síl·labes les paraules següents i classifiqueu-les segons la posició de la síl·laba tònica: panet, remei, crèdit, futbol, Himàlaia, desmai, atmosfera, déu, almoina, queixal, ciutats, ràdio, runa, gràssius, delinqüent, seqüència, ús, safareig.',
        options: [
          "Mots amb la síl·laba tònica a l'última síl·laba",
          "Mots amb la síl·laba tònica a la penúltima síl·laba",
          "Mots amb la síl·laba tònica a l'antepenúltima síl·laba"
        ],
        correctAnswer: [
          "panet, remei, desmai, déu, queixal, ciutats, delinqüent, ús, safareig",
          "crèdit, futbol, almoina, runa",
          "Himàlaia, atmosfera, ràdio, gràssius, seqüència"
        ],
        explanation: 'Classificació segons la síl·laba tònica: agudes (última), planes (penúltima) i esdrúixoles (antepenúltima).',
        difficulty: 3
      },
      {
        id: 'c1_monosillabs',
        type: 'classification',
        question: 'A continuació teniu mots monosíl·labs. Classifiqueu-los segons que siguin àtons o tònics: em, hem, que, què, les, quan, pa, jo, de, es, pels.',
        options: [
          'Monosíl·labs àtons',
          'Monosíl·labs tònics'
        ],
        correctAnswer: [
          'em, hem, que, les, quan, de, es, pels',
          'què, pa, jo'
        ],
        explanation: 'Els monosíl·labs tònics són els que porten accent d’intensitat i poden dur accent diacrític.',
        difficulty: 2
      }
    ]
  },

  // CONSELLS PRÀCTICS - ORTOGRAFIA
  {
    id: 'consells_ortografia',
    title: 'Consells Pràctics d\'Ortografia',
    description: 'Exercicis basats en els consells pràctics més importants d\'ortografia catalana',
    category: 'ortografia',
    exercises: [
      {
        id: 'consells_ort_1',
        type: 'multiple_choice',
        question: 'Identifiqueu l\'ús incorrecte del pronom en el següent fragment: "La solució que li vam proposar no li semblà gens adequada, però la hi acceptà amb resignació."',
        options: ['li vam proposar', 'no li semblà', 'la hi acceptà', 'amb resignació'],
        correctAnswer: 'la hi acceptà',
        explanation: 'La forma correcta seria "l\'hi acceptà". Quan combinem pronoms febles de 3a persona (la/el/les/els) amb "hi", el pronom de CD s\'apostrofa: l\'hi, els hi, les hi.',
        difficulty: 4
      },
      {
        id: 'consells_ort_2',
        type: 'fill_blank',
        question: 'Completeu la frase amb els pronoms febles adequats: "Aquell llibre tan interessant que em vas recomanar, ja _____ _____ vaig llegir fa dos mesos."',
        correctAnswer: 'me\'l',
        explanation: 'La combinació correcta és "me\'l" (CI + CD). El pronom de complement indirecte "em" s\'apostrofa davant "el" (CD masculí singular): me\'l = em + el.',
        difficulty: 5
      },
      {
        id: 'consells_ort_3',
        type: 'multiple_choice',
        question: 'Escolliu la variant que conté tots els accents diacrítics correctes: "El meu _____ canta cada matí, i el _____ és tan melodiós que em desperta amb un _____."',
        options: ['gall, so, be', 'gall, só, bé', 'gal, so, be', 'gall, són, bé'],
        correctAnswer: 'gall, só, bé',
        explanation: 'Gall (sense accent), só (amb accent diacrític per distingir-lo de "so" reflex), bé (amb accent per distingir-lo de "be" l\'animal).',
        difficulty: 4
      },
      {
        id: 'consells_ort_4',
        type: 'text_completion',
        question: 'Completeu el text amb les grafies correctes (g/j, c/qu, s/ss): "El ___uadre que penja a la paret de l\'e___lésia representa una e___cena histori___a on els personatges lluiten amb espa___es i bro___ers."',
        correctAnswer: 'quadre, església, escena, històrica, espases, broquers',
        explanation: 'Quadre (qu abans e/i), església (sg+vocal), escena (sc), històrica (c final àton), espases (s intervocàlica), broquers (qu abans e).',
        difficulty: 5
      },
      {
        id: 'consells_ort_5',
        type: 'multiple_choice',
        question: 'Quin pronom cal per completar la frase: "No vull aquests llibres; porta_____ uns altres"?',
        options: ['\'ls', '\'n', 'hi', 'els'],
        correctAnswer: '\'n',
        explanation: 'Usem "porta\'n" perquè "en" substitueix "uns altres [llibres]", indicant partitiu',
        difficulty: 2
      },
      {
        id: 'consells_ort_6',
        type: 'fill_blank',
        question: 'El meu germà _____ va dir que vindria tard (dir a mi).',
        correctAnswer: 'm\'ho',
        explanation: 'La combinació correcta és m\'ho: em (CI) + ho (CD - "que vindria tard")',
        difficulty: 3
      },
      {
        id: 'consells_ort_7',
        type: 'multiple_choice',
        question: 'Trieu la forma verbal correcta: "Malgrat que _____ molt, no vam abandonar."',
        options: ['plovés', 'plogués', 'plovera', 'plouria'],
        correctAnswer: 'plogués',
        explanation: 'Després de "malgrat que" cal subjuntiu. El verb ploure és irregular: plogués (pretèrit imperfet de subjuntiu)',
        difficulty: 3
      },
      {
        id: 'consells_ort_8',
        type: 'multiple_choice',
        question: 'Segons la regla "De bojos i lletjos, n\'hi ha a tots els despatxos", com s\'escriu el masculí de "boja"?',
        options: ['boig', 'boitx', 'bojg', 'botx'],
        correctAnswer: 'boig',
        explanation: 'Quan trobem tx a final de mot, busquem un derivat. Boja → boig (amb ig)',
        difficulty: 3
      },
      {
        id: 'consells_ort_9',
        type: 'multiple_choice',
        question: 'Quin és el masculí de "lletja"?',
        options: ['lletx', 'lleig', 'lletg', 'lletj'],
        correctAnswer: 'lleig',
        explanation: 'Lletja → lleig. Els grups g, j, tg, tj representen un so sonor i s\'escriuen amb ig a final de mot',
        difficulty: 3
      },
      {
        id: 'consells_ort_10',
        type: 'multiple_choice',
        question: 'Com s\'escriu el verb derivat de "despatx"?',
        options: ['despaig', 'despatxar', 'despatgar', 'despatjar'],
        correctAnswer: 'despatxar',
        explanation: 'Despatx → despatxar. Els mots acabats en tx mantenen tx quan deriven',
        difficulty: 3
      },
      {
        id: 'consells_ort_11',
        type: 'fill_blank',
        question: 'Escriu la forma correcta davant "e": platg______',
        correctAnswer: 'platgeta',
        explanation: 'Davant e/i escrivim tg: platgeta',
        difficulty: 4
      },
      {
        id: 'consells_ort_12',
        type: 'fill_blank',
        question: 'Escriu la forma correcta davant "o": ______ja',
        correctAnswer: 'llotja',
        explanation: 'Davant a/o/u escrivim tj: llotja',
        difficulty: 4
      }
    ]
  },

  // CONSELLS PRÀCTICS - MORFOSINTAXI
  {
    id: 'consells_morfosintaxi',
    title: 'Consells Pràctics de Morfosintaxi',
    description: 'Exercicis sobre articles, pronoms, verbs i construccions sintàctiques',
    category: 'morfosintaxi',
    exercises: [
      {
        id: 'consells_morfo_1',
        type: 'multiple_choice',
        question: 'Quina forma és correcta?',
        options: ['Lo que més m\'agrada són les vacances', 'El que més m\'agrada són les vacances', 'Lu que més m\'agrada són les vacances', 'La que més m\'agrada són les vacances'],
        correctAnswer: 'El que més m\'agrada són les vacances',
        explanation: 'En general la forma correcta de l\'article és "el". També podríem dir "Allò que més m\'agrada..."',
        difficulty: 2
      },
      {
        id: 'consells_morfo_2',
        type: 'multiple_choice',
        question: 'Com s\'ha de dir correctament?',
        options: ['No suporto lo brut', 'No suporto les coses brutes', 'No suporto lu brut', 'No suporto la brut'],
        correctAnswer: 'No suporto les coses brutes',
        explanation: 'En lloc de "lo brut" cal buscar alternatives com "les coses brutes" o "la brutícia"',
        difficulty: 3
      },
      {
        id: 'consells_morfo_3',
        type: 'multiple_choice',
        question: 'Quin pronom feble és correcte? No vols revisar l\'examen? → No vols revisar-_____?',
        options: ['lo', 'el', 'la', 'li'],
        correctAnswer: 'lo',
        explanation: 'Quan el pronom feble "el" va darrere el verb, es converteix en "-lo" (amb guionet)',
        difficulty: 2
      },
      {
        id: 'consells_morfo_4',
        type: 'multiple_choice',
        question: 'Com s\'ha de dir correctament?',
        options: ['Vaig anar a la meva casa', 'Vaig anar a casa meva', 'Vaig anar en casa meva', 'Vaig anar per casa meva'],
        correctAnswer: 'Vaig anar a casa meva',
        explanation: 'L\'expressió correcta és "a casa meva" (no "a la meva casa")',
        difficulty: 2
      },
      {
        id: 'consells_morfo_5',
        type: 'multiple_choice',
        question: 'Completeu amb el quantificador correcte: No em queda _____ material d\'oficina.',
        options: ['cap', 'gens de', 'res de', 'massa'],
        correctAnswer: 'gens de',
        explanation: 'Gens s\'usa per a coses que no es poden comptar (material, aigua, sal...)',
        difficulty: 2
      },
      {
        id: 'consells_morfo_6',
        type: 'multiple_choice',
        question: 'Completeu amb el quantificador correcte: No em queda _____ clip.',
        options: ['gens de', 'cap', 'res de', 'massa de'],
        correctAnswer: 'cap',
        explanation: 'Cap s\'usa per a coses que es poden comptar (clips, llapis...)',
        difficulty: 2
      },
      {
        id: 'consells_morfo_7',
        type: 'multiple_choice',
        question: 'Completeu: No em queda _____ a la nevera.',
        options: ['cap', 'gens', 'res', 'massa'],
        correctAnswer: 'res',
        explanation: 'Res equival a "cap cosa"',
        difficulty: 2
      },
      {
        id: 'consells_morfo_8',
        type: 'multiple_choice',
        question: 'En registres formals, com s\'escriu "massa"?',
        options: ['masses', 'massa', 'massas', 'mases'],
        correctAnswer: 'massa',
        explanation: 'Massa és un adjectiu invariable en registres formals: "Tinc massa maldecaps"',
        difficulty: 2
      },
      {
        id: 'consells_morfo_9',
        type: 'multiple_choice',
        question: 'En expressi??ns afirmatives, quin adverbi és correcte? M\'agrada _____.',
        options: ['gaire', 'massa', 'molt', 'prou'],
        correctAnswer: 'molt',
        explanation: 'En expressions afirmatives utilitzem "molt" o "força"',
        difficulty: 2
      },
      {
        id: 'consells_morfo_10',
        type: 'multiple_choice',
        question: 'En expressions negatives, quin és correcte? No m\'agrada _____.',
        options: ['molt', 'força', 'gaire', 'massa força'],
        correctAnswer: 'gaire',
        explanation: 'En expressions negatives utilitzem "gaire" o "massa"',
        difficulty: 2
      },
      {
        id: 'consells_morfo_11',
        type: 'multiple_choice',
        question: 'Tens _____ fred? (expressió interrogativa)',
        options: ['molt', 'força', 'gaire', 'massa molt'],
        correctAnswer: 'gaire',
        explanation: 'En expressions interrogatives, condicionals i de dubte fem servir "gaire"',
        difficulty: 2
      },
      {
        id: 'consells_morfo_12',
        type: 'multiple_choice',
        question: 'Quina forma té plural? No tinc _____ ganes de venir.',
        options: ['molt', 'força', 'gaires', 'massa'],
        correctAnswer: 'gaires',
        explanation: 'Gaire té forma plural: gaires ganes, gaires casos...',
        difficulty: 2
      },
      {
        id: 'consells_morfo_13',
        type: 'multiple_choice',
        question: 'Completeu: Aquell hivern va fer _____ de fred que es van glaçar les canonades.',
        options: ['tan', 'tant', 'massa', 'molt'],
        correctAnswer: 'tant',
        explanation: 'Tant pot ser adjectiu, pronom o adverbi. Aquí funciona com a adverbi de quantitat',
        difficulty: 3
      },
      {
        id: 'consells_morfo_14',
        type: 'multiple_choice',
        question: 'Completeu: De _____ primmirat que és no troba feina.',
        options: ['tant', 'tan', 'massa', 'molt'],
        correctAnswer: 'tan',
        explanation: 'Tan és sempre un adverbi i va amb adjectius: tan primmirat',
        difficulty: 3
      },
      {
        id: 'consells_morfo_15',
        type: 'multiple_choice',
        question: '_____ temps fa que treballes? (quantitat)',
        options: ['Quan', 'Quant', 'Quin', 'Quina'],
        correctAnswer: 'Quant',
        explanation: 'Quant fa referència a quantitat i té formes quanta, quants, quantes',
        difficulty: 2
      },
      {
        id: 'consells_morfo_16',
        type: 'multiple_choice',
        question: '_____ rebrem l\'exhort? (temps)',
        options: ['Quant', 'Quan', 'Quina', 'Quin'],
        correctAnswer: 'Quan',
        explanation: 'Quan indica temps i és invariable',
        difficulty: 2
      },
      {
        id: 'consells_morfo_17',
        type: 'multiple_choice',
        question: 'Substituïu "algo": Vols _____?',
        options: ['algo', 'res', 'una cosa', 'alguna'],
        correctAnswer: 'res',
        explanation: 'En preguntes, "algo" es substitueix per "res": Vols res?',
        difficulty: 2
      },
      {
        id: 'consells_morfo_18',
        type: 'multiple_choice',
        question: 'Substituïu "algo": És _____ poca-solta.',
        options: ['algo', 'una mica', 'massa', 'molt'],
        correctAnswer: 'una mica',
        explanation: 'Per expressar grau lleu, "algo" es substitueix per "una mica"',
        difficulty: 2
      },
      {
        id: 'consells_morfo_19',
        type: 'multiple_choice',
        question: 'Forma correcta d\'expressar obligació:',
        options: ['Tens que fer bondat', 'Has de fer bondat', 'Tindràs que fer bondat', 'Tingues que fer bondat'],
        correctAnswer: 'Has de fer bondat',
        explanation: 'Per expressar obligació fem servir "haver de" o "caldre", no "tenir que"',
        difficulty: 2
      },
      {
        id: 'consells_morfo_20',
        type: 'multiple_choice',
        question: 'Forma correcta:',
        options: ['Tinc que anar-me\'n d\'hora', 'Haig d\'anar-me\'n d\'hora', 'Tindré que anar-me\'n d\'hora', 'Tingui que anar-me\'n d\'hora'],
        correctAnswer: 'Haig d\'anar-me\'n d\'hora',
        explanation: 'La forma correcta és "haver de": Haig d\'anar-me\'n d\'hora',
        difficulty: 2
      },
      {
        id: 'consells_morfo_21',
        type: 'multiple_choice',
        question: 'Substituïu per una forma adequada: "Hi ha que trucar als pares"',
        options: ['Hi ha que trucar', 'S\'ha de trucar', 'Hi haurà que trucar', 'Hiha que trucar'],
        correctAnswer: 'S\'ha de trucar',
        explanation: 'L\'expressió "hi ha que" s\'ha de substituir per "s\'ha de" o "cal que"',
        difficulty: 3
      },
      {
        id: 'consells_morfo_22',
        type: 'multiple_choice',
        question: 'Per expressar probabilitat, quin és correcte?',
        options: ['Serà la Mariona qui truca', 'Deu ser la Mariona qui truca', 'Seria la Mariona qui truca', 'Seran la Mariona qui truca'],
        correctAnswer: 'Deu ser la Mariona qui truca',
        explanation: 'Per expressar probabilitat fem servir "deure + infinitiu", no el futur',
        difficulty: 3
      },
      {
        id: 'consells_morfo_23',
        type: 'multiple_choice',
        question: 'Quin gerundi és correcte?',
        options: ['correguent', 'corrent', 'correguint', 'corint'],
        correctAnswer: 'corrent',
        explanation: 'Tots els gerundis acaben en -nt. Les formes en -guent o -quent no són adequades en registres formals',
        difficulty: 2
      },
      {
        id: 'consells_morfo_24',
        type: 'multiple_choice',
        question: 'Gerundi correcte de "viure":',
        options: ['visquent', 'vivint', 'vivent', 'vivinguent'],
        correctAnswer: 'vivint',
        explanation: 'El gerundi correcte és "vivint", no "visquent"',
        difficulty: 2
      },
      {
        id: 'consells_morfo_25',
        type: 'multiple_choice',
        question: 'Per a manaments negatius, quin temps verbal fem servir?',
        options: ['Imperatiu', 'Present de subjuntiu', 'Futur', 'Condicional'],
        correctAnswer: 'Present de subjuntiu',
        explanation: 'L\'imperatiu només s\'usa en oracions afirmatives. Per a manaments negatius: present de subjuntiu',
        difficulty: 3
      },
      {
        id: 'consells_morfo_26',
        type: 'multiple_choice',
        question: 'Quina forma és correcta?',
        options: ['M\'he caigut de l\'escala', 'He caigut de l\'escala', 'M\'he caigut-me de l\'escala', 'He caigut-me de l\'escala'],
        correctAnswer: 'He caigut de l\'escala',
        explanation: 'El verb "caure" no és pronominal. La forma correcta és "He caigut"',
        difficulty: 3
      },
      {
        id: 'consells_morfo_27',
        type: 'multiple_choice',
        question: 'Forma correcta:',
        options: ['Per què no et calles?', 'Per què no calles?', 'Per què no et calles-te?', 'Per què no calles-te?'],
        correctAnswer: 'Per què no calles?',
        explanation: 'El verb "callar" no és pronominal. La forma correcta és "calles"',
        difficulty: 3
      },
      {
        id: 'consells_morfo_28',
        type: 'multiple_choice',
        question: 'Diferència entre "hem" i "em":',
        options: ['Hem de marxar / Em va dir', 'Em de marxar / Hem va dir', 'Hem de marxar / Hem va dir', 'Em de marxar / Em va dir'],
        correctAnswer: 'Hem de marxar / Em va dir',
        explanation: '"Hem" és 1a persona plural del verb haver. "Em" és pronom feble de 1a persona singular',
        difficulty: 2
      },
      {
        id: 'consells_morfo_29',
        type: 'multiple_choice',
        question: 'Preposició adequada per indicar causa:',
        options: ['Es van escapar per a la porta', 'Es van escapar per la porta', 'Es van escapar de per la porta', 'Es van escapar amb la porta'],
        correctAnswer: 'Es van escapar per la porta',
        explanation: 'La preposició "per" indica causa o motiu',
        difficulty: 2
      },
      {
        id: 'consells_morfo_30',
        type: 'multiple_choice',
        question: 'Preposició adequada per indicar finalitat:',
        options: ['Hi ha un termini per cada pas', 'Hi ha un termini per a cada pas', 'Hi ha un termini de cada pas', 'Hi ha un termini amb cada pas'],
        correctAnswer: 'Hi ha un termini per a cada pas',
        explanation: 'La preposició "per a" indica finalitat o destinació',
        difficulty: 2
      },
      {
        id: 'consells_morfo_31',
        type: 'multiple_choice',
        question: 'Expressió temporal correcta en registres formals:',
        options: ['Pel matí', 'Al matí', 'En el matí', 'Del matí'],
        correctAnswer: 'Al matí',
        explanation: 'En registres formals cal dir "al matí", "a la tarda", "al vespre" i "a la nit"',
        difficulty: 2
      },
      {
        id: 'consells_morfo_32',
        type: 'multiple_choice',
        question: 'El complement directe de persones porta preposició?',
        options: ['Hem vist a l\'acusada', 'Hem vist l\'acusada', 'Hem vist per l\'acusada', 'Hem vist amb l\'acusada'],
        correctAnswer: 'Hem vist l\'acusada',
        explanation: 'En català, el complement directe no porta preposició, ni per a persones ni per a coses',
        difficulty: 2
      },
      {
        id: 'consells_morfo_33',
        type: 'multiple_choice',
        question: 'Pronom feble correcte per al complement indirecte singular:',
        options: ['El metge li lliura l\'informe', 'El metge el lliura l\'informe', 'El metge lis lliura l\'informe', 'El metge los lliura l\'informe'],
        correctAnswer: 'El metge li lliura l\'informe',
        explanation: 'Li és el pronom feble per al complement indirecte singular (masculí i femení)',
        difficulty: 2
      },
      {
        id: 'consells_morfo_34',
        type: 'multiple_choice',
        question: 'Pronom feble correcte per al complement indirecte plural:',
        options: ['Vaig portar-lis carquinyolis', 'Vaig portar-los carquinyolis', 'Vaig portar-les carquinyolis', 'Vaig portar-li carquinyolis'],
        correctAnswer: 'Vaig portar-los carquinyolis',
        explanation: 'Els (variants -los, \'ls) és el pronom per al complement indirecte plural. "Lis" no existeix',
        difficulty: 3
      },
      {
        id: 'consells_morfo_35',
        type: 'multiple_choice',
        question: 'Puntuació correcta:',
        options: ['Les causes del canvi, són complexes', 'Les causes del canvi són complexes', 'Les causes, del canvi són complexes', 'Les causes del canvi són, complexes'],
        correctAnswer: 'Les causes del canvi són complexes',
        explanation: 'Entre el subjecte i el verb no hi pot haver coma',
        difficulty: 2
      },
      {
        id: 'consells_morfo_36',
        type: 'multiple_choice',
        question: 'Puntuació correcta:',
        options: ['Exposo, que estic interessada', 'Exposo que, estic interessada', 'Exposo que estic interessada', 'Exposo que estic, interessada'],
        correctAnswer: 'Exposo que estic interessada',
        explanation: 'Entre el verb i el complement directe no hi pot haver coma',
        difficulty: 2
      }
    ]
  },

  // CONSELLS PRÀCTICS - LÈXIC
  {
    id: 'consells_lexic',
    title: 'Consells Pràctics de Lèxic',
    description: 'Exercicis sobre distinc??ons lèxiques i paraules que es confonen sovint',
    category: 'lexic',
    exercises: [
      {
        id: 'consells_lex_1',
        type: 'multiple_choice',
        question: 'Quan "darrere" és adverbi, com acaba?',
        options: ['darrera', 'darrere', 'darrer', 'derrera'],
        correctAnswer: 'darrere',
        explanation: 'Quan és adverbi, substantiu o preposició, "darrere" acaba amb e',
        difficulty: 2
      },
      {
        id: 'consells_lex_2',
        type: 'multiple_choice',
        question: 'Completeu: La _____ resolució el condemnava.',
        options: ['darrere', 'darrera', 'darrer', 'derrera'],
        correctAnswer: 'darrera',
        explanation: '"Darrera" amb a és l\'adjectiu femení que concorda amb "resolució"',
        difficulty: 2
      },
      {
        id: 'consells_lex_3',
        type: 'multiple_choice',
        question: 'Completeu: El _____ capítol ens va decebre.',
        options: ['darrere', 'darrera', 'darrer', 'derrer'],
        correctAnswer: 'darrer',
        explanation: '"Darrer" és l\'adjectiu masculí que concorda amb "capítol"',
        difficulty: 2
      },
      {
        id: 'consells_lex_4',
        type: 'multiple_choice',
        question: 'Forma correcta per dir "la resta":',
        options: ['Els demés se\'n van anar', 'Els altres se\'n van anar', 'Els demàs se\'n van anar', 'Els démès se\'n van anar'],
        correctAnswer: 'Els altres se\'n van anar',
        explanation: 'El mot "demés" és un barbarisme. Cal dir "els altres" o "la resta"',
        difficulty: 2
      },
      {
        id: 'consells_lex_5',
        type: 'multiple_choice',
        question: 'Distinció correcta: "comte", "conte", "compte"',
        options: ['comte=rondalla, conte=títol, compte=càlcul', 'comte=títol, conte=rondalla, compte=càlcul', 'comte=càlcul, conte=títol, compte=rondalla', 'comte=compte, conte=comte, compte=conte'],
        correctAnswer: 'comte=títol, conte=rondalla, compte=càlcul',
        explanation: 'Comte = títol nobiliari, conte = rondalla, compte = atenció/càlcul/compte corrent',
        difficulty: 2
      },
      {
        id: 'consells_lex_6',
        type: 'multiple_choice',
        question: '"Pertot arreu" s\'escriu:',
        options: ['per tot arreu', 'pertot arreu', 'per-tot arreu', 'per tot-arreu'],
        correctAnswer: 'pertot arreu',
        explanation: 'El "pertot" de "pertot arreu" s\'escriu junt',
        difficulty: 2
      },
      {
        id: 'consells_lex_7',
        type: 'multiple_choice',
        question: 'Diferència: "Ha viatjat _____ el món" vs "Ha viatjat _____ arreu"',
        options: ['per tot / pertot', 'pertot / per tot', 'per-tot / per tot', 'per tot / per-tot'],
        correctAnswer: 'per tot / pertot',
        explanation: '"Per tot el món" (separat), "pertot arreu" (junt)',
        difficulty: 3
      },
      {
        id: 'consells_lex_8',
        type: 'multiple_choice',
        question: 'Quan "sobretot" s\'escriu junt?',
        options: ['Quan vol dir "damunt de"', 'Quan és sinònim de "especialment"', 'Quan va amb article', 'Quan és plural'],
        correctAnswer: 'Quan és sinònim de "especialment"',
        explanation: '"Sobretot" junt = especialment. "Sobre tot" separat = damunt de',
        difficulty: 2
      },
      {
        id: 'consells_lex_9',
        type: 'multiple_choice',
        question: 'Completeu: _____ no te\'n descuidis.',
        options: ['Sobre tot', 'Sobretot', 'Sobre-tot', 'Sobretot'],
        correctAnswer: 'Sobretot',
        explanation: '"Sobretot" s\'escriu junt quan significa "especialment"',
        difficulty: 2
      },
      {
        id: 'consells_lex_10',
        type: 'multiple_choice',
        question: 'Completeu: Va nevar _____ el Baix Llobregat.',
        options: ['sobretot', 'sobre tot', 'sobre-tot', 'sobretot'],
        correctAnswer: 'sobre tot',
        explanation: '"Sobre tot" separat quan vol dir "damunt de tot"',
        difficulty: 2
      },
      {
        id: 'consells_lex_11',
        type: 'multiple_choice',
        question: 'La conjunció "perquè" s\'usa quan?',
        options: ['Per preguntar la causa', 'Com a sinònim de "ja que"', 'Per expressar dubte', 'Per negar'],
        correctAnswer: 'Com a sinònim de "ja que"',
        explanation: 'La conjunció "perquè" (junt) s\'usa com a sinònim de "ja que" o "a fi que"',
        difficulty: 2
      },
      {
        id: 'consells_lex_12',
        type: 'multiple_choice',
        question: 'Quan s\'escriu "per què" separat?',
        options: ['Per expressar causa', 'Per expressar finalitat', 'Per preguntar la causa', 'Per afirmar'],
        correctAnswer: 'Per preguntar la causa',
        explanation: 'S\'escriu separat quan "què" equival a "quina causa" o "quin motiu"',
        difficulty: 2
      },
      {
        id: 'consells_lex_13',
        type: 'multiple_choice',
        question: 'Completeu: No entenc _____ t\'enfades.',
        options: ['perquè', 'per què', 'per-què', 'perque'],
        correctAnswer: 'per què',
        explanation: 'Separat quan preguntem la causa: "per què" = per quina causa',
        difficulty: 2
      },
      {
        id: 'consells_lex_14',
        type: 'multiple_choice',
        question: 'Completeu: M\'enfado _____ és una injustícia.',
        options: ['per què', 'perquè', 'per-què', 'perque'],
        correctAnswer: 'perquè',
        explanation: 'Junt quan donem la causa: "perquè" = ja que',
        difficulty: 2
      },
      {
        id: 'consells_lex_15',
        type: 'multiple_choice',
        question: 'Quan "gairebé" s\'escriu junt?',
        options: ['Sempre', 'Quan vol dir "molt bé"', 'Quan és sinònim de "quasi"', 'Quan va amb verb'],
        correctAnswer: 'Quan és sinònim de "quasi"',
        explanation: '"Gairebé" junt = quasi. "Gaire bé" separat en contextos com "no em trobo gaire bé"',
        difficulty: 2
      },
      {
        id: 'consells_lex_16',
        type: 'multiple_choice',
        question: 'Completeu: _____ són les cinc.',
        options: ['Gaire bé', 'Gairebé', 'Gaire-bé', 'Gairé bé'],
        correctAnswer: 'Gairebé',
        explanation: '"Gairebé" junt quan vol dir "quasi"',
        difficulty: 2
      },
      {
        id: 'consells_lex_17',
        type: 'multiple_choice',
        question: 'Completeu: No hi sent _____.',
        options: ['gairebé', 'gaire bé', 'gaire-bé', 'gairé bé'],
        correctAnswer: 'gaire bé',
        explanation: '"Gaire bé" separat en aquest context (no sent gaire bé = sent malament)',
        difficulty: 2
      },
      {
        id: 'consells_lex_18',
        type: 'multiple_choice',
        question: 'Quan "almenys" s\'escriu junt?',
        options: ['Sempre', 'Quan és adverbi', 'Quan és adjectiu', 'Quan és substantiu'],
        correctAnswer: 'Quan és adverbi',
        explanation: '"Almenys" junt quan és adverbi (= com a mínim). "Al menys" separat en "al menys conflictiu"',
        difficulty: 3
      },
      {
        id: 'consells_lex_19',
        type: 'multiple_choice',
        question: 'Completeu: _____ val dotze euros.',
        options: ['Al menys', 'Almenys', 'Al-menys', 'Almenys'],
        correctAnswer: 'Almenys',
        explanation: '"Almenys" junt quan vol dir "com a mínim"',
        difficulty: 2
      },
      {
        id: 'consells_lex_20',
        type: 'multiple_choice',
        question: 'Quines formes són correctes per dir "només"?',
        options: ['Sols i solament', 'Sol i solament', 'Sols i solmente', 'Sol i sols'],
        correctAnswer: 'Sols i solament',
        explanation: '"Sols" (amb s) i "solament" (sense s entremig) equivalen a "només"',
        difficulty: 2
      },
      {
        id: 'consells_lex_21',
        type: 'multiple_choice',
        question: '"Potser" és:',
        options: ['Un verb conjugat', 'Un adverbi invariable', 'Un adjectiu variable', 'Una conjunció'],
        correctAnswer: 'Un adverbi invariable',
        explanation: '"Potser" és un adverbi invariable que equival al castellà "quizás"',
        difficulty: 2
      },
      {
        id: 'consells_lex_22',
        type: 'multiple_choice',
        question: 'Diferència entre "potser" i "pot ser":',
        options: ['No hi ha diferència', 'Potser=adverbi, pot ser=verb', 'Potser=verb, pot ser=adverbi', 'Són sinònims exactes'],
        correctAnswer: 'Potser=adverbi, pot ser=verb',
        explanation: '"Potser" és adverbi invariable. "Pot ser" és el verb poder + infinitiu ser',
        difficulty: 2
      },
      {
        id: 'consells_lex_23',
        type: 'multiple_choice',
        question: 'Completeu: _____ el culpable és ell.',
        options: ['Pot ser', 'Potser', 'Pot-ser', 'Potésser'],
        correctAnswer: 'Potser',
        explanation: '"Potser" adverbi invariable de possibilitat',
        difficulty: 2
      },
      {
        id: 'consells_lex_24',
        type: 'multiple_choice',
        question: 'Completeu: _____ ell el culpable?',
        options: ['Potser', 'Pot ser', 'Pot-ser', 'Potésser'],
        correctAnswer: 'Pot ser',
        explanation: '"Pot ser" és verb conjugat + infinitiu en pregunta',
        difficulty: 2
      },
      {
        id: 'consells_lex_25',
        type: 'multiple_choice',
        question: 'En català es fan o es donen crits?',
        options: ['Es donen crits', 'Es fan crits', 'Es posen crits', 'Es tenen crits'],
        correctAnswer: 'Es fan crits',
        explanation: 'En català es fan crits, petons, abraçades... (no es donen)',
        difficulty: 2
      },
      {
        id: 'consells_lex_26',
        type: 'multiple_choice',
        question: 'Alguna cosa ens fa o ens dona vergonya?',
        options: ['Ens dona vergonya', 'Ens fa vergonya', 'Ens posa vergonya', 'Ens té vergonya'],
        correctAnswer: 'Ens fa vergonya',
        explanation: 'En català alguna cosa ens fa vergonya, fàstic o ràbia (no ens dona)',
        difficulty: 2
      },
      {
        id: 'consells_lex_27',
        type: 'multiple_choice',
        question: 'Diferència entre "ficar" i "posar":',
        options: ['Són sinònims exactes', 'Ficar=posar a dins, posar=més general', 'Posar=posar a dins, ficar=més general', 'No hi ha diferència'],
        correctAnswer: 'Ficar=posar a dins, posar=més general',
        explanation: 'Ficar vol dir "posar a dins" o "entrar". Posar no té aquest matís',
        difficulty: 2
      },
      {
        id: 'consells_lex_28',
        type: 'multiple_choice',
        question: 'Completeu: He _____ els oficis al calaix.',
        options: ['posat', 'ficat', 'posat o ficat', 'deixat'],
        correctAnswer: 'ficat',
        explanation: 'Ficar és més adequat quan es posa alguna cosa dins d\'un contenidor',
        difficulty: 2
      },
      {
        id: 'consells_lex_29',
        type: 'multiple_choice',
        question: '"Alhora" junt vol dir:',
        options: ['A una hora determinada', 'Al mateix temps', 'Més tard', 'Abans'],
        correctAnswer: 'Al mateix temps',
        explanation: '"Alhora" junt = conjuntament, a la vegada, al mateix temps',
        difficulty: 2
      },
      {
        id: 'consells_lex_30',
        type: 'multiple_choice',
        question: 'Completeu: Sempre parlen tots _____.',
        options: ['a l\'hora', 'alhora', 'a-l\'hora', 'al hora'],
        correctAnswer: 'alhora',
        explanation: '"Alhora" junt quan vol dir "al mateix temps"',
        difficulty: 2
      },
      {
        id: 'consells_lex_31',
        type: 'multiple_choice',
        question: 'Completeu: _____ de pagar es fa el despistat.',
        options: ['Alhora', 'A l\'hora', 'A-l\'hora', 'Al hora'],
        correctAnswer: 'A l\'hora',
        explanation: '"A l\'hora" separat té significat literal (en el moment de)',
        difficulty: 2
      },
      {
        id: 'consells_lex_32',
        type: 'multiple_choice',
        question: 'Com s\'escriuen les locucions adverbials "de pressa" i "a poc a poc"?',
        options: ['Juntes', 'Separades', 'Amb guionet', 'Amb apostròfol'],
        correctAnswer: 'Separades',
        explanation: 'En català aquestes locucions adverbials s\'escriuen separades',
        difficulty: 2
      }
    ]
  },

  // COMPRENSIÓ ORAL
  {
    id: 'comprensio_oral',
    title: 'Comprensió Oral - Hàbits Saludables i Esport',
    description: 'Exercicis de comprensió oral basats en textos sobre salut, esport i medi ambient',
    category: 'morfosintaxi',
    exercises: [
      {
        id: 'oral_1',
        type: 'multiple_choice',
        question: 'Què recomanen els experts a les persones que practiquen de manera regular l\'esport de resistència continuat?',
        options: ['Abstenir-se de fer-ne', 'Fer-se controls periòdics', 'Dosificar molt els esforços'],
        correctAnswer: 'Fer-se controls periòdics',
        explanation: 'Els experts recomanen controls periòdics per prevenir problemes cardiovasculars en esportistes de resistència',
        difficulty: 3
      },
      {
        id: 'oral_2',
        type: 'multiple_choice',
        question: 'Són obligatòries les revisions preventives en esportistes professionals?',
        options: ['Sí, la nova llei de l\'esport ho preveu', 'Sí, consisteixen en un electrocardiograma, un ecocardiograma i una prova d\'esforç', 'No, però la nova llei de l\'esport ho podria regular'],
        correctAnswer: 'No, però la nova llei de l\'esport ho podria regular',
        explanation: 'Actualment no són obligatòries, però la legislació podria canviar en el futur',
        difficulty: 3
      },
      {
        id: 'oral_3',
        type: 'multiple_choice',
        question: 'Què aconsella el cardiòleg Josep Brugada a les persones que vulguin fer esport?',
        options: ['Per evitar el sobreesforç del cor recomana fer-se unes proves prèvies', 'Com més esport facin més acostumats estaran a l\'esforç físic', 'Recomana a tots els nens que es facin un ecocardiograma abans de fer esport'],
        correctAnswer: 'Per evitar el sobreesforç del cor recomana fer-se unes proves prèvies',
        explanation: 'El Dr. Brugada recomana proves prèvies per evitar riscos cardiovasculars',
        difficulty: 3
      },
      {
        id: 'oral_4',
        type: 'multiple_choice',
        question: 'Què demostra l\'estudi realitzat per un equip multidisciplinari de l\'Hospital Clínic?',
        options: ['La pràctica continuada d\'exercici físic de resistència pot tenir conseqüències negatives per a la circulació sanguínia', 'L\'exercici continuat pot comportar un substrat per patir arrítmies', 'L\'excés d\'exercici físic provoca la degeneració de les artèries'],
        correctAnswer: 'L\'exercici continuat pot comportar un substrat per patir arrítmies',
        explanation: 'L\'estudi demostra que l\'exercici continuat pot crear condicions que afavoreixin les arrítmies cardíaques',
        difficulty: 4
      },
      {
        id: 'oral_5',
        type: 'multiple_choice',
        question: 'A quina conclusió va arribar l\'equip del Clínic en l\'experiment amb les rates?',
        options: ['Com més exercici feien més adaptat tenien el cor', 'Les rates sedentàries tenien les mateixes possibilitats de patir una arrítmia cardíaca que les que feien exercici continuat', 'Les rates que feien exercici continuat tenien més possibilitats de patir una arrítmia cardíaca'],
        correctAnswer: 'Les rates que feien exercici continuat tenien més possibilitats de patir una arrítmia cardíaca',
        explanation: 'L\'experiment va demostrar que l\'exercici continuat augmenta el risc d\'arrítmies en rates',
        difficulty: 4
      }
    ]
  },

  // EXPRESSIÓ ESCRITA - CONSELLS DE REDACCIÓ
  {
    id: 'expressio_escrita_consells',
    title: 'Expressió Escrita - Consells de Redacció',
    description: 'Exercicis sobre les etapes de redacció, estructura i llenguatge adequat',
    category: 'morfosintaxi',
    exercises: [
      {
        id: 'escrita_1',
        type: 'multiple_choice',
        question: 'Quines són les tres etapes principals de la redacció d\'un text?',
        options: ['Introducció, desenvolupament i conclusió', 'Planificació, redacció i revisió', 'Lectura, comprensió i escriptura', 'Anàlisi, síntesi i avaluació'],
        correctAnswer: 'Planificació, redacció i revisió',
        explanation: 'Les tres etapes són: planificació (organitzar idees), redacció (escriure l\'esborrany) i revisió (corregir i millorar)',
        difficulty: 2
      },
      {
        id: 'escrita_2',
        type: 'multiple_choice',
        question: 'Quin tractament es fa servir en textos informals?',
        options: ['vostè (3a persona del singular)', 'tu (2a persona del singular)', 'vós (2a persona del plural)', 'vostès (3a persona del plural)'],
        correctAnswer: 'tu (2a persona del singular)',
        explanation: 'En textos informals s\'usa el tractament de tu/vosaltres (2a persona)',
        difficulty: 2
      },
      {
        id: 'escrita_3',
        type: 'multiple_choice',
        question: 'Quin tractament correspon als textos formals?',
        options: ['tu i vosaltres', 'vostè, vostès i vós', 'només vostè', 'només tu'],
        correctAnswer: 'vostè, vostès i vós',
        explanation: 'En textos formals s\'usa vostè (3a persona singular), vostès (3a persona plural) o vós (2a persona plural formal)',
        difficulty: 2
      },
      {
        id: 'escrita_4',
        type: 'multiple_choice',
        question: 'Quants mots aproximadament han de tenir els documents curts?',
        options: ['25 paraules', '50 paraules', '100 paraules', '150 paraules'],
        correctAnswer: '50 paraules',
        explanation: 'Els documents curts han de tenir aproximadament 50 paraules, i els llargs 150',
        difficulty: 2
      },
      {
        id: 'escrita_5',
        type: 'multiple_choice',
        question: 'Cada paràgraf ha de contenir:',
        options: ['Diverses idees relacionades', 'Una idea principal', 'Només exemples', 'Conclusions generals'],
        correctAnswer: 'Una idea principal',
        explanation: 'Cada paràgraf ha de desenvolupar una sola idea principal de manera clara i coherent',
        difficulty: 2
      },
      {
        id: 'escrita_6',
        type: 'multiple_choice',
        question: 'On s\'ha de situar la informació clau dins un paràgraf?',
        options: ['Al final', 'Al mig', 'Al principi', 'Repartida per tot el paràgraf'],
        correctAnswer: 'Al principi',
        explanation: 'La informació clau s\'ha de situar al principi del paràgraf per facilitar la comprensió',
        difficulty: 2
      },
      {
        id: 'escrita_7',
        type: 'multiple_choice',
        question: 'Quins connectors marquen l\'ordre de les idees al començament?',
        options: ['finalment, en definitiva', 'd\'entrada, per començar, en primer lloc', 'a més, així mateix', 'en canvi, mentre que'],
        correctAnswer: 'd\'entrada, per començar, en primer lloc',
        explanation: 'Aquests connectors indiquen el començament d\'una seqüència d\'idees ordenades',
        difficulty: 3
      },
      {
        id: 'escrita_8',
        type: 'multiple_choice',
        question: 'Quins connectors indiquen conseqüència?',
        options: ['ja que, perquè, com que', 'doncs, en conseqüència, per tant', 'si, sempre que, en cas de', 'per a, a fi de, amb la finalitat de'],
        correctAnswer: 'doncs, en conseqüència, per tant',
        explanation: 'Aquests connectors expressen que una idea és conseqüència d\'una altra',
        difficulty: 3
      },
      {
        id: 'escrita_9',
        type: 'multiple_choice',
        question: 'Com han d\'acabar les salutacions en cartes i correus electrònics?',
        options: ['Amb punt', 'Amb coma', 'Amb punt i coma', 'Sense puntuació'],
        correctAnswer: 'Amb coma',
        explanation: 'Les salutacions sempre han de portar una coma al final: "Estimat Joan,"',
        difficulty: 2
      },
      {
        id: 'escrita_10',
        type: 'multiple_choice',
        question: 'Com s\'han de separar els elements d\'una enumeració?',
        options: ['Sempre amb comes', 'Amb comes quan no van units per conjunció', 'Només amb conjuncions', 'Amb punts i comes'],
        correctAnswer: 'Amb comes quan no van units per conjunció',
        explanation: 'S\'usen comes per separar elements quan no van units per conjuncions com i, o, ni',
        difficulty: 3
      }
    ]
  },

  // TIPUS DE DOCUMENTS
  {
    id: 'tipus_documents',
    title: 'Tipus de Documents - Estructura i Característiques',
    description: 'Exercicis sobre l\'estructura i les característiques dels diferents tipus de documents',
    category: 'morfosintaxi',
    exercises: [
      {
        id: 'docs_1',
        type: 'multiple_choice',
        question: 'Quins elements obligatoris ha de tenir un avís?',
        options: ['Salutació i comiat', 'Data i autor', 'Introducció i conclusió', 'Destinatari i remitent'],
        correctAnswer: 'Data i autor',
        explanation: 'L\'avís ha de contenir la data i l\'autor, però no té ni salutació ni comiat',
        difficulty: 2
      },
      {
        id: 'docs_2',
        type: 'multiple_choice',
        question: 'La paraula "avís" en un avís ha d\'estar:',
        options: ['Al final del document', 'Destacada tipogràficament', 'En lletra petita', 'Dins del text'],
        correctAnswer: 'Destacada tipogràficament',
        explanation: 'La paraula "avís" ha d\'estar destacada perquè el lector sàpiga que és informació important',
        difficulty: 2
      },
      {
        id: 'docs_3',
        type: 'multiple_choice',
        question: 'Quin tipus de document és més espontani i breu?',
        options: ['Carta formal', 'Correu electrònic', 'Postal', 'Avís'],
        correctAnswer: 'Postal',
        explanation: 'La postal és un document breu i espontani que s\'envia a amics o parents',
        difficulty: 1
      },
      {
        id: 'docs_4',
        type: 'multiple_choice',
        question: 'En una nota, què pot ser bo que hi porti segons les circumstàncies?',
        options: ['Segell', 'Data i/o hora', 'Destinatari complet', 'Signatura oficial'],
        correctAnswer: 'Data i/o hora',
        explanation: 'En algunes ocasions és bo que la nota porti data i/o hora si la informació ho requereix',
        difficulty: 2
      },
      {
        id: 'docs_5',
        type: 'multiple_choice',
        question: 'Què diferencia el missatge electrònic breu (SMS/WhatsApp) de la nota?',
        options: ['La longitud', 'La formalitat', 'La immediatesa', 'El contingut'],
        correctAnswer: 'La immediatesa',
        explanation: 'El missatge electrònic es diferencia per la immediatesa en l\'enviament i recepció',
        difficulty: 2
      },
      {
        id: 'docs_6',
        type: 'multiple_choice',
        question: 'En els missatges electrònics breus, què no cal escriure?',
        options: ['El contingut', 'L\'emissor', 'La correcció lingüística', 'El grau de formalitat'],
        correctAnswer: 'L\'emissor',
        explanation: 'No cal escriure l\'emissor, la data ni l\'hora perquè ja surten automàticament',
        difficulty: 2
      },
      {
        id: 'docs_7',
        type: 'multiple_choice',
        question: 'Què diferencia el correu electrònic del correu postal?',
        options: ['La longitud del text', 'La immediatesa i la possibilitat de múltiples destinataris', 'El grau de formalitat', 'La necessitat de signatura'],
        correctAnswer: 'La immediatesa i la possibilitat de múltiples destinataris',
        explanation: 'El correu electrònic és immediat i permet enviar-lo a diversos destinataris sense fer còpies',
        difficulty: 2
      },
      {
        id: 'docs_8',
        type: 'multiple_choice',
        question: 'Quines parts té sempre el correu electrònic?',
        options: ['Només cos', 'Encapçalament i cos', 'Salutació i comiat', 'Data i signatura'],
        correctAnswer: 'Encapçalament i cos',
        explanation: 'El correu electrònic té encapçalament (informació sobre emissor i assumpte) i cos (contingut)',
        difficulty: 2
      },
      {
        id: 'docs_9',
        type: 'multiple_choice',
        question: 'En la carta informal, quin tractament es fa servir per al receptor?',
        options: ['vostè/vostès', 'tu/vosaltres', 'vós', 'senyor/senyora'],
        correctAnswer: 'tu/vosaltres',
        explanation: 'En cartes informals s\'usa el tractament de confiança: tu/vosaltres',
        difficulty: 2
      },
      {
        id: 'docs_10',
        type: 'multiple_choice',
        question: 'Com s\'ha d\'escriure la data en una carta?',
        options: ['Sabadell, 3 de Gener de 2.011.', 'Sabadell, 3 de gener de 2011', 'A Sabadell, 3 de gener de 2011.', 'Sabadell, a 3 de gener de 2011'],
        correctAnswer: 'Sabadell, 3 de gener de 2011',
        explanation: 'Format correcte: localitat, coma, data (mes en minúscula, any sense punt, sense punt final)',
        difficulty: 3
      },
      {
        id: 'docs_11',
        type: 'multiple_choice',
        question: 'Quantes parts té el contingut d\'una carta?',
        options: ['Dues: introducció i conclusió', 'Tres: introducció, exposició i conclusió', 'Quatre: salutació, introducció, exposició i comiat', 'Una sola part'],
        correctAnswer: 'Tres: introducció, exposició i conclusió',
        explanation: 'El contingut consta de: introducció (propòsit), exposició (desenvolupament) i conclusió (resum)',
        difficulty: 2
      },
      {
        id: 'docs_12',
        type: 'multiple_choice',
        question: 'En cartes formals, quin tractament NO és adequat?',
        options: ['vostè', 'vostès', 'tu', 'vós'],
        correctAnswer: 'tu',
        explanation: 'El tractament "tu" és col·loquial i no és adequat per a cartes formals',
        difficulty: 2
      },
      {
        id: 'docs_13',
        type: 'multiple_choice',
        question: 'Quin error cal evitar quan es barregen pronoms?',
        options: ['Us escric per demanar-li que canviï', 'Li escric per demanar-li que canviï', 'Els escric per demanar-los que canviïn', 'Us escric per demanar-vos que canvieu'],
        correctAnswer: 'Us escric per demanar-li que canviï',
        explanation: 'No es poden barrejar tractaments: si uses "us" (2a plural), cal "demanar-vos" (no "demanar-li")',
        difficulty: 3
      },
      {
        id: 'docs_14',
        type: 'multiple_choice',
        question: 'On va la signatura en una carta formal?',
        options: ['Abans del comiat', 'Després de la data', 'Després del comiat i abans de la data', 'Al començament'],
        correctAnswer: 'Després del comiat i abans de la data',
        explanation: 'L\'ordre és: comiat, signatura (a mà + nom i cognoms + càrrec si cal), data',
        difficulty: 2
      },
      {
        id: 'docs_15',
        type: 'multiple_choice',
        question: 'Com s\'abrevien les adreces en cartes formals?',
        options: ['c./carr., pl./plç., av./avg.', 'c. o c/, pl., av.', 'car., plç., aven.', 'carre, plaç, aven'],
        correctAnswer: 'c. o c/, pl., av.',
        explanation: 'Abreviacions correctes: c. o c/ (carrer), pl. (plaça), av. (avinguda)',
        difficulty: 2
      }
    ]
  },

  // EXPRESSIÓ ORAL
  {
    id: 'expressio_oral',
    title: 'Expressió Oral - Pronúncia i Dicció',
    description: 'Exercicis sobre pronúncia, entonació i normes de l\'estàndard oral català',
    category: 'ortografia',
    exercises: [
      {
        id: 'oral_pronun_1',
        type: 'multiple_choice',
        question: 'Com han de pronunciar la "e" àtona els parlants del bloc oriental?',
        options: ['[e]', '[ε]', '[ə]', '[i]'],
        correctAnswer: '[ə]',
        explanation: 'Els parlants del bloc oriental han de fer la neutralització [ə] de la a i la e àtones',
        difficulty: 3
      },
      {
        id: 'oral_pronun_2',
        type: 'multiple_choice',
        question: 'Com s\'ha de pronunciar la "o" àtona en el bloc oriental?',
        options: ['[o]', '[ɔ]', '[u]', '[ə]'],
        correctAnswer: '[u]',
        explanation: 'Els parlants del bloc oriental converteixen en [u] la o en posició àtona',
        difficulty: 3
      },
      {
        id: 'oral_pronun_3',
        type: 'multiple_choice',
        question: 'Què cal fer amb l\'article "el" davant de vocal?',
        options: ['Pronunciar "el home"', 'Fer elisió: "l\'home"', 'Dir "ell home"', 'Suprimir-lo completament'],
        correctAnswer: 'Fer elisió: "l\'home"',
        explanation: 'Cal fer l\'elisió de l\'article "el" davant de vocal o h: l\'home, l\'armari',
        difficulty: 2
      },
      {
        id: 'oral_pronun_4',
        type: 'multiple_choice',
        question: 'Com s\'ha de pronunciar "d\'universitat"?',
        options: ['de universitat', 'd\'universitat', 'dell universitat', 'de la universitat'],
        correctAnswer: 'd\'universitat',
        explanation: 'Cal fer elisió de la preposició "de" davant de vocal: d\'universitat',
        difficulty: 2
      },
      {
        id: 'oral_pronun_5',
        type: 'multiple_choice',
        question: 'Quina pronunciació és correcta per "anuncia"?',
        options: ['anúncia', 'anuncia', 'anuncía', 'anùncia'],
        correctAnswer: 'anuncia',
        explanation: 'No hem de desplaçar l\'accent en verbs acabats en -iar: anuncia (no anúncia)',
        difficulty: 3
      },
      {
        id: 'oral_pronun_6',
        type: 'multiple_choice',
        question: 'Com s\'ha de pronunciar "casa"?',
        options: ['ca[s]a', 'ca[z]a', 'ca[ç]a', 'ca[š]a'],
        correctAnswer: 'ca[z]a',
        explanation: 'La "s" intervocàlica es pronuncia sonora [z]: casa = ca[z]a',
        difficulty: 3
      },
      {
        id: 'oral_pronun_7',
        type: 'multiple_choice',
        question: 'Com s\'ha de pronunciar "les cançons"?',
        options: ['le[z] cançons', 'le[s] cançons', 'le[ç] cançons', 'le[š] cançons'],
        correctAnswer: 'le[s] cançons',
        explanation: 'Les esses finals es pronuncien sordes davant de pausa o consonant sorda',
        difficulty: 3
      },
      {
        id: 'oral_pronun_8',
        type: 'multiple_choice',
        question: 'Com s\'ha de pronunciar "les hores"?',
        options: ['le[s] hores', 'le[z] hores', 'le[ç] hores', 'le[š] hores'],
        correctAnswer: 'le[z] hores',
        explanation: 'Les esses se sonoritzen davant de vocal o consonant sonora: le[z] hores',
        difficulty: 3
      },
      {
        id: 'oral_pronun_9',
        type: 'multiple_choice',
        question: 'Quina pronunciació és incorrecta?',
        options: ['ma[ʒ]úscula', 'ma[j]úscula', 'Ma[ʒ]úscula', 'Majúscu[lə]'],
        correctAnswer: 'ma[j]úscula',
        explanation: 'És incorrecte pronunciar ma[j]úscula; la pronunciació correcta és ma[ʒ]úscula',
        difficulty: 4
      },
      {
        id: 'oral_pronun_10',
        type: 'multiple_choice',
        question: 'Com s\'ha de pronunciar "jutge"?',
        options: ['[j]utge', '[ʒ]utge', 'jut[g]e', 'jut[k]e'],
        correctAnswer: '[ʒ]utge',
        explanation: 'És incorrecte pronunciar [j]utge; la pronunciació correcta és [ʒ]utge',
        difficulty: 4
      },
      {
        id: 'oral_pronun_11',
        type: 'multiple_choice',
        question: 'La -t final dels gerundis és:',
        options: ['Sempre sonora', 'Sempre muda', 'Muda excepte quan se sensibilitza', 'Sempre aspirada'],
        correctAnswer: 'Muda excepte quan se sensibilitza',
        explanation: 'La -t dels gerundis és muda (sabenØ) excepte quan se sensibilitza (sabent-ho)',
        difficulty: 3
      },
      {
        id: 'oral_pronun_12',
        type: 'multiple_choice',
        question: 'Com s\'ha de pronunciar la -r dels infinitius?',
        options: ['Sempre sonora', 'Muda: cantaØ', 'Sempre vibrant', 'Depèn del dialecte'],
        correctAnswer: 'Muda: cantaØ',
        explanation: 'La -r dels infinitius és muda: cantaØ, témeØ, sortiØ',
        difficulty: 3
      },
      {
        id: 'oral_pronun_13',
        type: 'multiple_choice',
        question: 'En quines paraules SÍ es pronuncia la -r final?',
        options: ['fuste, bestia, po', 'amor, tenor, mar', 'canta, teme, sorti', 'casa, taula, porta'],
        correctAnswer: 'amor, tenor, mar',
        explanation: 'En algunes paraules com amor, tenor, mar la -r final sí que es pronuncia',
        difficulty: 3
      },
      {
        id: 'oral_pronun_14',
        type: 'multiple_choice',
        question: 'Com s\'ha de pronunciar "amb ell"?',
        options: ['am ell', 'ambell', 'am[b] ell', 'amm ell'],
        correctAnswer: 'am[b] ell',
        explanation: 'No s\'ha d\'ometre la -b de "amb" davant de vocal: am[b] ell',
        difficulty: 2
      },
      {
        id: 'oral_pronun_15',
        type: 'multiple_choice',
        question: 'Com s\'ha de pronunciar "sant Antoni"?',
        options: ['san Antoni', 'sant Antoni', 'san[t] Antoni', 'santantoni'],
        correctAnswer: 'san[t] Antoni',
        explanation: 'No s\'ha d\'ometre la -t final davant de vocal: san[t] Antoni',
        difficulty: 2
      },
      {
        id: 'oral_pronun_16',
        type: 'multiple_choice',
        question: 'Quin pronom és incorrecte en llengua oral?',
        options: ['els', 'los', 'lis', '\'ls'],
        correctAnswer: 'lis',
        explanation: 'No hem de fer servir la forma *lis pel pronom els',
        difficulty: 2
      },
      {
        id: 'oral_pronun_17',
        type: 'multiple_choice',
        question: 'Quins barbarismes cal evitar en l\'expressió oral?',
        options: ['doncs, aleshores', 'pues, bueno, vale', 'però, tanmateix', 'ara, després'],
        correctAnswer: 'pues, bueno, vale',
        explanation: 'Cal evitar barbarismes com *pues, *bueno, *vale i construccions com *tenir que',
        difficulty: 2
      }
    ]
  },

  {
    id: 'alfabet',
    title: 'L\'Alfabet',
    description: 'Aprèn les lletres, noms i sons de l\'alfabet català',
    category: 'ortografia',
    exercises: [
      {
        id: 'alfabet_1',
        type: 'multiple_choice',
        question: 'Com es pronuncia la lletra "j" en català?',
        options: ['jota', 'ge', 'i grega', 'ca'],
        correctAnswer: 'jota',
        explanation: 'La lletra j es pronuncia "jota" en català',
        difficulty: 1
      }
    ]
  },

  {
    id: 'determinants',
    title: 'Els Determinants: Articles, Demostratius, Possessius i Interrogatius',
    description: 'Aprèn l\'ús correcte dels determinants en català',
    category: 'morfosintaxi',
    exercises: [
      {
        id: 'determinants_1',
        type: 'fill_blank',
        question: 'Completeu amb l\'article adequat: _____ aval',
        correctAnswer: 'l\'',
        explanation: 'Abans de vocal, l\'article es contreu: l\'aval',
        difficulty: 2
      },
      {
        id: 'determinants_2',
        type: 'fill_blank',
        question: 'Feu el singular: els homenatges → _____',
        correctAnswer: 'l\'homenatge',
        explanation: 'El singular de "els homenatges" és "l\'homenatge"',
        difficulty: 2
      },
      {
        id: 'determinants_3',
        type: 'fill_blank',
        question: 'Completeu amb de o d\': jersei _____ ratlles',
        correctAnswer: 'de',
        explanation: 'Abans de consonant s\'usa "de"',
        difficulty: 2
      },
      {
        id: 'determinants_4',
        type: 'fill_blank',
        question: 'Va caure quan sortia _____ edifici.',
        correctAnswer: 'de l\'',
        explanation: 'La preposició "de" + article "l\'" fan la contracció "de l\'"',
        difficulty: 3
      },
      {
        id: 'determinants_5',
        type: 'fill_blank',
        question: 'Completeu amb un possessiu: Necessito que em digueu l\'adreça de _____ empresa.',
        correctAnswer: 'la vostra',
        explanation: 'El possessiu adequat és "la vostra" quan ens dirigim a vosaltres',
        difficulty: 3
      },
      {
        id: 'determinants_6',
        type: 'multiple_choice',
        question: 'Quin interrogatiu és correcte: Segons _____ dia vinguis...',
        options: ['qui', 'quin', 'què', 'quines'],
        correctAnswer: 'quin',
        explanation: 'Amb "dia" (masculí singular) s\'usa "quin"',
        difficulty: 3
      },
      {
        id: 'determinants_7',
        type: 'fill_blank',
        question: 'Completeu la sèrie possessiva: La seva exposició → _____ expedients',
        correctAnswer: 'els seus',
        explanation: 'La forma plural masculina del possessiu "seu" és "els seus"',
        difficulty: 4
      },
      {
        id: 'determinants_8',
        type: 'multiple_choice',
        question: 'Quin interrogatiu cal usar: _____ eines he de fer servir?',
        options: ['Què', 'Quines', 'Qui', 'Quin'],
        correctAnswer: 'Quines',
        explanation: '"Eines" és femení plural, per això cal "Quines"',
        difficulty: 3
      }
    ]
  },

  {
    id: 'quantificadors',
    title: 'Els Quantificadors: Numerals, Quantitatius i Indefinits',
    description: 'Aprèn l\'ús correcte dels quantificadors en català',
    category: 'morfosintaxi',
    exercises: [
      {
        id: 'quantificadors_1a',
        type: 'fill_blank',
        question: 'Escriviu amb lletres: 45 anys → _____',
        correctAnswer: 'quaranta-cinc anys',
        explanation: 'Els numerals entre 21 i 99 porten guionet entre desenes i unitats',
        difficulty: 2
      },
      {
        id: 'quantificadors_1b',
        type: 'fill_blank',
        question: 'Escriviu amb lletres: 163 dies → _____',
        correctAnswer: 'cent seixanta-tres dies',
        explanation: 'Cent + nombre compost amb guionet',
        difficulty: 2
      },
      {
        id: 'quantificadors_1c',
        type: 'fill_blank',
        question: 'Escriviu amb lletres: 1.816 expedients → _____',
        correctAnswer: 'mil vuit-cents setze expedients',
        explanation: 'Mil + centena + desena i unitat amb guionet',
        difficulty: 3
      },
      {
        id: 'quantificadors_2a',
        type: 'fill_blank',
        question: 'Completeu amb "gens" o "res": No hi ha _____ de cafè al rebost.',
        correctAnswer: 'gens',
        explanation: 'Gens s\'usa per productes que no es poden comptar (cafè, sal...)',
        difficulty: 2
      },
      {
        id: 'quantificadors_2b',
        type: 'fill_blank',
        question: 'Completeu amb "gens" o "res": En aquell curs no vaig aprendre _____ de nou.',
        correctAnswer: 'res',
        explanation: 'Res és un pronom indefinit que significa cap cosa',
        difficulty: 2
      },
      {
        id: 'quantificadors_3a',
        type: 'fill_blank',
        question: 'Completeu amb "cap" o "res": No fan _____ activitat cultural.',
        correctAnswer: 'cap',
        explanation: 'Cap s\'usa per productes que es poden comptar (activitats)',
        difficulty: 2
      },
      {
        id: 'quantificadors_3b',
        type: 'fill_blank',
        question: 'Completeu amb "cap" o "res": Avui no aconsegueixo fer _____ de bo.',
        correctAnswer: 'res',
        explanation: 'Res com a pronom indefinit',
        difficulty: 2
      },
      {
        id: 'quantificadors_4a',
        type: 'multiple_choice',
        question: '_____ l\'un com l\'altre van reconèixer l\'error.',
        options: ['Tan', 'Tant'],
        correctAnswer: 'Tant',
        explanation: 'Tant és un adjectiu quan acompanya un nom',
        difficulty: 3
      },
      {
        id: 'quantificadors_4b',
        type: 'multiple_choice',
        question: 'L\'Oriol era _____ ros com la seva germana.',
        options: ['tan', 'tant'],
        correctAnswer: 'tan',
        explanation: 'Tan és un adverbi que va amb adjectius',
        difficulty: 3
      },
      {
        id: 'quantificadors_5a',
        type: 'multiple_choice',
        question: 'Volia saber _____ trigaria a enllestir la feina.',
        options: ['quan', 'quant'],
        correctAnswer: 'quant',
        explanation: 'Quant significa "quina quantitat de temps"',
        difficulty: 3
      },
      {
        id: 'quantificadors_5b',
        type: 'multiple_choice',
        question: '_____ hagi de començar el judici, truqueu-nos.',
        options: ['Quan', 'Quant'],
        correctAnswer: 'Quan',
        explanation: 'Quan indica temps (en el moment que)',
        difficulty: 3
      },
      {
        id: 'quantificadors_6a',
        type: 'fill_blank',
        question: 'Quantitatiu adequat: Necessitava _____ paper per a la impressora.',
        correctAnswer: 'bastant',
        explanation: 'Bastant és adequat per expressar una quantitat suficient',
        difficulty: 2
      },
      {
        id: 'quantificadors_6b',
        type: 'fill_blank',
        question: 'Quantitatiu adequat: No tenia _____ fotocòpies per a tothom.',
        correctAnswer: 'prou',
        explanation: 'Prou expressa una quantitat suficient en context negatiu',
        difficulty: 2
      },
      {
        id: 'quantificadors_7',
        type: 'multiple_choice',
        question: '_____ no és culpable fins que no es demostra el contrari.',
        options: ['Cap', 'Ningú', 'Tot'],
        correctAnswer: 'Ningú',
        explanation: 'Ningú és el pronom indefinit adequat per a persones',
        difficulty: 3
      }
    ]
  },

  {
    id: 'verbs_irregulars_perifrasis',
    title: 'Els Verbs Irregulars i les Perífrasis Verbals',
    description: 'Aprèn l\'ús correcte dels verbs irregulars i les perífrasis verbals d\'obligació i probabilitat',
    category: 'morfosintaxi',
    exercises: [
      // Exercici 1: Subjuntius amb verbs irregulars
      {
        id: 'perifrasis_1a',
        type: 'fill_blank',
        question: 'Demanarem al personal de manteniment que _______ (netejar) el garatge.',
        correctAnswer: 'netegi',
        explanation: 'El present de subjuntiu de "netejar" en tercera persona singular és "netegi"',
        difficulty: 3
      },
      {
        id: 'perifrasis_1b',
        type: 'fill_blank',
        question: 'La policia no sap a què es _______ (dedicar, present) els sospitosos.',
        correctAnswer: 'dediquen',
        explanation: 'El present d\'indicatiu de "dedicar-se" en tercera persona plural és "es dediquen"',
        difficulty: 3
      },
      {
        id: 'perifrasis_1c',
        type: 'fill_blank',
        question: 'Si no voleu que us _______ (trencar) els vidres, amagueu-los la pilota.',
        correctAnswer: 'trenquin',
        explanation: 'El present de subjuntiu de "trencar" en tercera persona plural és "trenquin"',
        difficulty: 3
      },
      {
        id: 'perifrasis_1d',
        type: 'fill_blank',
        question: 'Sobretot, no _______ (trepitjar, vosaltres) els cables.',
        correctAnswer: 'trepitgeu',
        explanation: 'El present de subjuntiu de "trepitjar" en segona persona plural és "trepitgeu"',
        difficulty: 3
      },
      {
        id: 'perifrasis_1e',
        type: 'fill_blank',
        question: 'M\'ha demanat que _______ (tancar, jo) la finestra.',
        correctAnswer: 'tanqui',
        explanation: 'El present de subjuntiu de "tancar" en primera persona singular és "tanqui"',
        difficulty: 3
      },

      // Exercici 2: Conjugacions irregulars completes
      {
        id: 'perifrasis_2a',
        type: 'fill_blank',
        question: 'Completeu la sèrie de "caure" - Indicatiu present: _______ (1a persona singular)',
        correctAnswer: 'caic',
        explanation: 'La primera persona singular del present d\'indicatiu de "caure" és "caic"',
        difficulty: 4
      },
      {
        id: 'perifrasis_2b',
        type: 'fill_blank',
        question: 'Completeu la sèrie de "estar" - Subjuntiu present: _______ (1a persona singular)',
        correctAnswer: 'estigui',
        explanation: 'La primera persona singular del present de subjuntiu de "estar" és "estigui"',
        difficulty: 4
      },
      {
        id: 'perifrasis_2c',
        type: 'fill_blank',
        question: 'Completeu la sèrie de "estendre" - Participi: _______',
        correctAnswer: 'estès',
        explanation: 'El participi del verb "estendre" és "estès"',
        difficulty: 4
      },
      {
        id: 'perifrasis_2d',
        type: 'fill_blank',
        question: 'Completeu la sèrie de "beure" - Subjuntiu imperfet: _______ (1a persona singular)',
        correctAnswer: 'begués',
        explanation: 'La primera persona singular del subjuntiu imperfet de "beure" és "begués"',
        difficulty: 4
      },

      // Exercici 3: Presents irregulars (1a persona singular)
      {
        id: 'perifrasis_3a',
        type: 'fill_blank',
        question: '_______ (venir) amb cotxe.',
        correctAnswer: 'Vinc',
        explanation: 'La primera persona singular del present d\'indicatiu de "venir" és "vinc"',
        difficulty: 3
      },
      {
        id: 'perifrasis_3b',
        type: 'fill_blank',
        question: '_______ (tenir) molta sort.',
        correctAnswer: 'Tinc',
        explanation: 'La primera persona singular del present d\'indicatiu de "tenir" és "tinc"',
        difficulty: 2
      },
      {
        id: 'perifrasis_3c',
        type: 'fill_blank',
        question: '_______ (ser) d\'Olot.',
        correctAnswer: 'Soc',
        explanation: 'La primera persona singular del present d\'indicatiu de "ser" és "soc"',
        difficulty: 2
      },
      {
        id: 'perifrasis_3d',
        type: 'fill_blank',
        question: '_______ (poder) recordar-ho.',
        correctAnswer: 'Puc',
        explanation: 'La primera persona singular del present d\'indicatiu de "poder" és "puc"',
        difficulty: 3
      },
      {
        id: 'perifrasis_3e',
        type: 'fill_blank',
        question: '_______ (saber) la veritat.',
        correctAnswer: 'Sé',
        explanation: 'La primera persona singular del present d\'indicatiu de "saber" és "sé"',
        difficulty: 2
      },

      // Exercici 4: Mantenint el temps verbal
      {
        id: 'perifrasis_4a',
        type: 'fill_blank',
        question: 'Jo prendria → Vosaltres _______',
        correctAnswer: 'prendríeu',
        explanation: 'El condicional de "prendre" en segona persona plural és "prendríeu"',
        difficulty: 3
      },
      {
        id: 'perifrasis_4b',
        type: 'fill_blank',
        question: 'Jo volia → Nosaltres _______',
        correctAnswer: 'volíem',
        explanation: 'L\'imperfet de "voler" en primera persona plural és "volíem"',
        difficulty: 3
      },
      {
        id: 'perifrasis_4c',
        type: 'fill_blank',
        question: 'Ella deia → Nosaltres _______',
        correctAnswer: 'dèiem',
        explanation: 'L\'imperfet de "dir" en primera persona plural és "dèiem"',
        difficulty: 3
      },
      {
        id: 'perifrasis_4d',
        type: 'fill_blank',
        question: 'Tu et mous → Nosaltres ens _______',
        correctAnswer: 'movem',
        explanation: 'El present de "moure\'s" en primera persona plural és "ens movem"',
        difficulty: 3
      },

      // Exercici 5: Presents d'indicatiu
      {
        id: 'perifrasis_5a',
        type: 'fill_blank',
        question: 'No _______ (saber, tu) quina és la resposta correcta.',
        correctAnswer: 'saps',
        explanation: 'El present d\'indicatiu de "saber" en segona persona singular és "saps"',
        difficulty: 2
      },
      {
        id: 'perifrasis_5b',
        type: 'fill_blank',
        question: 'Quan _______ (tenir, jo) fred, tanco la finestra.',
        correctAnswer: 'tinc',
        explanation: 'El present d\'indicatiu de "tenir" en primera persona singular és "tinc"',
        difficulty: 2
      },
      {
        id: 'perifrasis_5c',
        type: 'fill_blank',
        question: 'Nosaltres _______ (beure) un got d\'aigua en dejú cada matí.',
        correctAnswer: 'bevem',
        explanation: 'El present d\'indicatiu de "beure" en primera persona plural és "bevem"',
        difficulty: 3
      },
      {
        id: 'perifrasis_5d',
        type: 'fill_blank',
        question: 'Aquest dissabte _______ (anar, jo) de casament.',
        correctAnswer: 'vaig',
        explanation: 'El present d\'indicatiu de "anar" en primera persona singular és "vaig"',
        difficulty: 2
      },

      // Exercici 6: Formes adequades diverses
      {
        id: 'perifrasis_6a',
        type: 'fill_blank',
        question: 'Qui ens _______ (voler) ajudar només ens ho ha de dir.',
        correctAnswer: 'vulgui',
        explanation: 'En aquesta construcció relativa cal el present de subjuntiu: "vulgui"',
        difficulty: 4
      },
      {
        id: 'perifrasis_6b',
        type: 'fill_blank',
        question: 'Va sortir de la sala de vistes amb la cara _______ (bullir).',
        correctAnswer: 'bullida',
        explanation: 'El participi de "bullir" és "bullida" quan concorda amb "cara"',
        difficulty: 4
      },
      {
        id: 'perifrasis_6c',
        type: 'fill_blank',
        question: 'El mes vinent _______ (prendre, ell) una decisió respecte a l\'imputat.',
        correctAnswer: 'prendrà',
        explanation: 'El futur d\'indicatiu de "prendre" en tercera persona singular és "prendrà"',
        difficulty: 3
      },
      {
        id: 'perifrasis_6d',
        type: 'fill_blank',
        question: 'T\'imposaran una sanció perquè has _______ (desobeir) l\'ordre d\'allunyament.',
        correctAnswer: 'desobeït',
        explanation: 'El participi del verb "desobeir" és "desobeït"',
        difficulty: 4
      },

      // Exercici 9: Transformació caldre → haver de
      {
        id: 'perifrasis_9a',
        type: 'fill_blank',
        question: 'Transformeu: "Cal que presentin la feina avui" → "_______ la feina avui"',
        correctAnswer: 'Han de presentar',
        explanation: 'La perífrasi "cal que + subjuntiu" es transforma en "haver de + infinitiu"',
        difficulty: 3
      },
      {
        id: 'perifrasis_9b',
        type: 'fill_blank',
        question: 'Transformeu: "Cal que sigueu puntuals" → "_______ puntuals"',
        correctAnswer: 'Heu de ser',
        explanation: 'La construcció amb "caldre" es transforma amb "haver de" seguida d\'infinitiu',
        difficulty: 3
      },
      {
        id: 'perifrasis_9c',
        type: 'fill_blank',
        question: 'Transformeu: "Caldrà que arreglem la nevera" → "_______ la nevera"',
        correctAnswer: 'Haurem d\'arreglar',
        explanation: 'El futur de "caldre" es transforma en futur de "haver de"',
        difficulty: 3
      },
      {
        id: 'perifrasis_9d',
        type: 'fill_blank',
        question: 'Transformeu: "No cal que triïs la plaça" → "_______ la plaça"',
        correctAnswer: 'No has de triar',
        explanation: 'La negació de "caldre" es transforma en negació de "haver de"',
        difficulty: 3
      },

      // Exercicis sobre l'ús correcte de les perífrasis
      {
        id: 'perifrasis_teoria_1',
        type: 'multiple_choice',
        question: 'Quina és la construcció correcta?',
        options: [
          'Tens que ensenyar el document',
          'Has d\'ensenyar el document',
          'Calga ensenyar el document'
        ],
        correctAnswer: 'Has d\'ensenyar el document',
        explanation: 'La construcció correcta d\'obligació és "haver de + infinitiu". "Tenir que" és incorrecta en català.',
        difficulty: 2
      },
      {
        id: 'perifrasis_teoria_2',
        type: 'multiple_choice',
        question: 'Quina perífrasi expressa probabilitat?',
        options: [
          'Ha de ser fora',
          'Deu ser fora',
          'Cal que sigui fora'
        ],
        correctAnswer: 'Deu ser fora',
        explanation: 'La perífrasi "deure + infinitiu" expressa probabilitat, mai obligació.',
        difficulty: 3
      },
      {
        id: 'perifrasis_teoria_3',
        type: 'multiple_choice',
        question: 'Com s\'expressa obligació amb "caldre"?',
        options: [
          'Cal tenir divuit anys',
          'Cal que tinguis divuit anys',
          'Ambdues són correctes'
        ],
        correctAnswer: 'Ambdues són correctes',
        explanation: 'Es pot usar "caldre + infinitiu" o "caldre + que + subjuntiu" per expressar obligació.',
        difficulty: 3
      },
      {
        id: 'perifrasis_teoria_4',
        type: 'fill_blank',
        question: 'Corregiu la frase: "Seran fora, perquè no contesta ningú" → "_______"',
        correctAnswer: 'Deuen ser fora, perquè no contesta ningú',
        explanation: 'El futur català no pot expressar probabilitat. Cal usar "deure + infinitiu".',
        difficulty: 4
      }
    ]
  },

  {
    id: 'funcions_sintactiques',
    title: 'Les Funcions Sintàctiques',
    description: 'Aprèn a identificar els complements directe, indirecte, circumstancial, preposicional, atribut i predicatiu',
    category: 'morfosintaxi',
    exercises: [
      // Exercici 4: Completar frases amb complements
      {
        id: 'sintaxi_4a',
        type: 'fill_blank',
        question: 'Completeu amb un complement directe: Menjarem _______ per sopar.',
        correctAnswer: 'pizza',
        explanation: 'Es tracta d\'un complement directe (CD) perquè rep directament l\'acció del verb "menjar"',
        difficulty: 2
      },
      {
        id: 'sintaxi_4b',
        type: 'fill_blank',
        question: 'Completeu amb un complement directe: Vam escoltar _______ tot el matí.',
        correctAnswer: 'música',
        explanation: 'És un complement directe (CD) - allò que s\'escolta',
        difficulty: 2
      },
      {
        id: 'sintaxi_4c',
        type: 'fill_blank',
        question: 'Completeu amb un complement indirecte: De tant en tant demanem ajuda _______.',
        correctAnswer: 'als companys',
        explanation: 'És un complement indirecte (CI) perquè indica a qui es demana ajuda',
        difficulty: 2
      },
      {
        id: 'sintaxi_4d',
        type: 'fill_blank',
        question: 'Completeu amb un complement directe: El mes vinent compraran _______ per a l\'oficina.',
        correctAnswer: 'ordinadors',
        explanation: 'És un complement directe (CD) - allò que es compra',
        difficulty: 2
      },

      // Exercici 5: Identificar tipus de complements
      {
        id: 'sintaxi_5a',
        type: 'multiple_choice',
        question: 'Identifiqueu el tipus de complement subratllat: "Llegia un llibre de contes molt interessant"',
        options: ['Complement directe', 'Complement indirecte', 'Complement preposicional'],
        correctAnswer: 'Complement directe',
        explanation: 'El complement "un llibre de contes" és directe perquè rep directament l\'acció del verb "llegir"',
        difficulty: 3
      },
      {
        id: 'sintaxi_5b',
        type: 'multiple_choice',
        question: 'Identifiqueu el tipus de complement: "Es dedicava a interrompre el professor"',
        options: ['Complement directe', 'Complement indirecte', 'Complement preposicional'],
        correctAnswer: 'Complement preposicional',
        explanation: 'El verb "dedicar-se" regeix la preposició "a", per tant és un complement preposicional',
        difficulty: 3
      },
      {
        id: 'sintaxi_5c',
        type: 'multiple_choice',
        question: 'Identifiqueu el tipus de complement: "Estem d\'acord amb la teva proposta"',
        options: ['Complement directe', 'Complement indirecte', 'Complement preposicional'],
        correctAnswer: 'Complement preposicional',
        explanation: 'El verb "estar d\'acord" regeix la preposició "amb", formant un complement preposicional',
        difficulty: 3
      },

      // Exercici 6: Complements circumstancials
      {
        id: 'sintaxi_6a',
        type: 'multiple_choice',
        question: 'Identifiqueu el tipus de complement circumstancial: "El Jofre ha estudiat molt"',
        options: ['Temps', 'Lloc', 'Manera', 'Quantitat'],
        correctAnswer: 'Quantitat',
        explanation: '"Molt" expressa la quantitat amb què s\'ha estudiat',
        difficulty: 2
      },
      {
        id: 'sintaxi_6b',
        type: 'multiple_choice',
        question: 'Identifiqueu el tipus de complement circumstancial: "Volem anar a Jordània l\'any vinent"',
        options: ['Temps', 'Lloc', 'Manera', 'Companyia'],
        correctAnswer: 'Lloc',
        explanation: '"A Jordània" indica el lloc on es vol anar',
        difficulty: 2
      },
      {
        id: 'sintaxi_6c',
        type: 'multiple_choice',
        question: 'Identifiqueu el tipus de complement circumstancial: "Caminava lentament pels passadissos"',
        options: ['Temps', 'Lloc', 'Manera', 'Quantitat'],
        correctAnswer: 'Manera',
        explanation: '"Lentament" expressa la manera com caminava',
        difficulty: 2
      },
      {
        id: 'sintaxi_6d',
        type: 'multiple_choice',
        question: 'Identifiqueu el tipus de complement circumstancial: "El meu gendre treballa amb el Nil"',
        options: ['Temps', 'Lloc', 'Manera', 'Companyia'],
        correctAnswer: 'Companyia',
        explanation: '"Amb el Nil" indica amb qui treballa',
        difficulty: 2
      },

      // Exercici 7: Identificar funcions sintàctiques diverses
      {
        id: 'sintaxi_7a',
        type: 'multiple_choice',
        question: 'Identifiqueu la funció del complement: "La Cinta és tortosina"',
        options: ['CD', 'CI', 'CP', 'CC', 'Atribut'],
        correctAnswer: 'Atribut',
        explanation: '"Tortosina" és l\'atribut del verb copulatiu "ser"',
        difficulty: 3
      },
      {
        id: 'sintaxi_7b',
        type: 'multiple_choice',
        question: 'Identifiqueu la funció del complement: "Ens hem de comprar un cotxe nou"',
        options: ['CD', 'CI', 'CP', 'CC', 'Atribut'],
        correctAnswer: 'CD',
        explanation: '"Un cotxe nou" és el complement directe del verb "comprar"',
        difficulty: 3
      },
      {
        id: 'sintaxi_7c',
        type: 'multiple_choice',
        question: 'Identifiqueu la funció del complement: "Confia en la resolució del conflicte"',
        options: ['CD', 'CI', 'CP', 'CC', 'Atribut'],
        correctAnswer: 'CP',
        explanation: 'El verb "confiar" regeix la preposició "en", formant un complement preposicional',
        difficulty: 3
      },

      // Exercici 9: Funcions sintàctiques amb predicatiu
      {
        id: 'sintaxi_9a',
        type: 'multiple_choice',
        question: 'Identifiqueu la funció: "El succés el va impactar tant que es va quedar mut"',
        options: ['CD', 'CI', 'CP', 'CC', 'Predicatiu', 'Atribut'],
        correctAnswer: 'Predicatiu',
        explanation: '"Mut" és un complement predicatiu que complementa alhora el verb i el subjecte',
        difficulty: 4
      },
      {
        id: 'sintaxi_9b',
        type: 'multiple_choice',
        question: 'Identifiqueu la funció: "El Fèlix sembla el millor candidat"',
        options: ['CD', 'CI', 'CP', 'CC', 'Predicatiu', 'Atribut'],
        correctAnswer: 'Atribut',
        explanation: '"El millor candidat" és l\'atribut del verb copulatiu "semblar"',
        difficulty: 3
      },
      {
        id: 'sintaxi_9c',
        type: 'multiple_choice',
        question: 'Identifiqueu la funció: "Elles es consideren bones en la seva professió"',
        options: ['CD', 'CI', 'CP', 'CC', 'Predicatiu', 'Atribut'],
        correctAnswer: 'Predicatiu',
        explanation: '"Bones" és un complement predicatiu que complementa el verb i el subjecte',
        difficulty: 4
      }
    ]
  },

  {
    id: 'pronoms_febles',
    title: 'Els Pronoms Febles',
    description: 'Aprèn l\'ús correcte dels pronoms àtons: formes, posició i substitució de complements',
    category: 'morfosintaxi',
    exercises: [
      // Exercici 1: Completar amb pronoms
      {
        id: 'pronoms_1',
        type: 'fill_blank',
        question: 'Et vaig veure. _______ agrada força.',
        correctAnswer: 'T\'',
        explanation: 'El pronom de segona persona singular davant de verb que comença per vocal s\'apostrofa: "T\'"',
        difficulty: 2
      },

      // Exercici 2: Substitució de complements directes
      {
        id: 'pronoms_2',
        type: 'fill_blank',
        question: 'Substituïu pel pronom adequat: L\'actriu explica la història → L\'actriu _______ explica.',
        correctAnswer: 'l\'',
        explanation: 'El complement directe femení "la història" es substitueix per "l\'" davant de verb amb vocal',
        difficulty: 3
      },

      // Exercici 4: Davant i darrere del verb
      {
        id: 'pronoms_4',
        type: 'fill_blank',
        question: 'Davant del verb: He de redactar la interlocutòria → _______ he de redactar.',
        correctAnswer: 'L\'',
        explanation: 'El complement directe femení es col·loca davant com "l\'" quan el verb auxiliar comença per vocal',
        difficulty: 3
      },

      // Exercici 6: Complements circumstancials
      {
        id: 'pronoms_6',
        type: 'fill_blank',
        question: 'Substituïu: Sempre arriben tard → Sempre _______ arriben.',
        correctAnswer: 'hi',
        explanation: 'El complement circumstancial de temps "tard" es substitueix pel pronom "hi"',
        difficulty: 3
      },

      // Exercici 8: Substitució d'atributs
      {
        id: 'pronoms_8',
        type: 'fill_blank',
        question: 'Substituïu l\'atribut: La teva família paterna és italiana → La teva família paterna _______ és.',
        correctAnswer: 'ho',
        explanation: 'L\'atribut "italiana" es substitueix habitualment pel pronom "ho"',
        difficulty: 3
      },

      // Exercicis d'elecció múltiple
      {
        id: 'pronoms_11',
        type: 'multiple_choice',
        question: 'Les tisores, deixa _______ damunt la taula.',
        options: ['-la', '-les', '\'ls', '\'n'],
        correctAnswer: '-les',
        explanation: '"Les tisores" és femení plural, per tant el pronom és "-les"',
        difficulty: 3
      },

      // Més exercicis d'elecció múltiple
      {
        id: 'pronoms_12',
        type: 'multiple_choice',
        question: 'De calor, _______ té molta.',
        options: ['en', 'hi', 'ho', 'la'],
        correctAnswer: 'en',
        explanation: 'El complement amb "de" (de calor) es substitueix pel pronom "en"',
        difficulty: 3
      },

      // Exercicis avançats
      {
        id: 'pronoms_13',
        type: 'multiple_choice',
        question: 'De set, _______ tinc força aquest matí.',
        options: ['ho', 'el', 'en', 'li'],
        correctAnswer: 'en',
        explanation: 'El complement amb "de" (de set) es substitueix pel pronom "en"',
        difficulty: 4
      }
    ]
  }
];

// Dictation exercises - Extended and more challenging
export const DICTATION_EXERCISES: OrthographySection = {
  id: 'dictats',
  title: 'Dictats',
  description: 'Practica l\'ortografia amb dictats llargs i desafiants de diferents nivells',
  category: 'ortografia',
  exercises: [
    {
      id: 'dictat_1',
      type: 'dictation',
      question: 'Escolta i escriu el text següent amb atenció als accents i grafies:',
      correctAnswer: 'Aquest matí m\'he aixecat d\'hora perquè havia de preparar l\'esmorzar. He fet un cafè amb llet i he torrat dues llesques de pa amb tomàquet. Mentrestant, escoltava les notícies a la ràdio i pensava en totes les coses que havia de fer durant el dia. La llista era llarga: anar al mercat, portar el cotxe al taller i visitar la biblioteca municipal.',
      explanation: 'Dictat de nivell fàcil amb vocabulari quotidià, apostrofs i accents bàsics',
      difficulty: 1
    },
    {
      id: 'dictat_2',
      type: 'dictation',
      question: 'Escolta atentament i transcriu el text complet:',
      correctAnswer: 'La biblioteca municipal del barri és un lloc tranquil on la gent va a llegir, estudiar o simplement a consultar informació. Té una col·lecció molt àmplia de llibres, revistes i diaris que abasten tots els àmbits del coneixement. També ofereix tallers de lectura per a nens i adults cada dimecres i dissabte. Els usuaris poden prendre en préstec fins a cinc llibres durant dues setmanes, sempre que presentin el carnet de soci actualitzat.',
      explanation: 'Dictat de nivell normal amb vocabulari institucional, apostrofs i grafies complexes',
      difficulty: 2
    },
    {
      id: 'dictat_3',
      type: 'dictation',
      question: 'Reprodueix amb precisió el text següent, amb especial atenció a la puntuació i els accents:',
      correctAnswer: 'Catalunya té una història mil·lenària que s\'enriqueix amb tradicions úniques i costums ancestrals. Des dels castells humans fins a la sardana, passant per la celebració de Sant Jordi, cada tradició reflecteix la identitat cultural del poble català. Els gegants i capgrossos que desfilen per les festes majors són testimoni d\'un patrimoni immaterial que es transmet de generació en generació amb orgull i devoció. Aquestes manifestacions culturals han estat reconegudes internacionalment per la seva singularitat i valor antropològic.',
      explanation: 'Dictat difícil amb lèxic cultural específic, accents diacrítics i estructures sintàctiques elaborades',
      difficulty: 3
    },
    {
      id: 'dictat_4',
      type: 'dictation',
      question: 'Transcriu íntegrament el text següent, demostrant domini ortogràfic i gramatical:',
      correctAnswer: 'L\'impacte del canvi climàtic s\'ha manifestat de manera inequívoca en les últimes dècades mitjançant fenòmens meteorològics extrems cada vegada més freqüents. Els científics adverteixen que cal prendre mesures urgents per mitigar les seves conseqüències devastadores sobre els ecosistemes i les comunitats humanes. La reducció d\'emissions de gasos d\'efecte hivernacle, la preservació dels hàbitats naturals i la transició cap a energies renovables són imperatius ineludibles. Tanmateix, la inèrcia política i els interessos econòmics contraposats dificulten l\'adopció de polítiques ambientals efectives que garanteixin un futur sostenible per a les generacions vinents. És imprescindible que la ciutadania exigeixi als governants la implementació de mesures contundents i coherents.',
      explanation: 'Dictat master de nivell avançat amb terminologia científica, connectors discursius complexos i estructures subordinades elaborades',
      difficulty: 4
    }
  ]
};

// Reading comprehension exercises
export const READING_COMPREHENSION: OrthographySection = {
  id: 'comprensio_escrita',
  title: 'Comprensió Escrita',
  description: 'Exercicis de lectura i comprensió de textos catalans',
  category: 'ortografia',
  exercises: [
    {
      id: 'comp_1',
      type: 'multiple_choice',
      question: 'Text: "El director va anunciar que l\'empresa obrirà noves oficines a Barcelona i Girona el proper any." Què farà l\'empresa?',
      options: ['Tancar oficines', 'Obrir noves oficines', 'Traslladar oficines', 'Renovar oficines'],
      correctAnswer: 'Obrir noves oficines',
      explanation: 'El text indica clarament que s\'obriran noves oficines',
      difficulty: 2
    },
    {
      id: 'comp_2',
      type: 'multiple_choice',
      question: 'Text: "Malgrat les adversitats meteorològiques, els excursionistes van arribar al cim de la muntanya abans del migdia." Com va ser el temps?',
      options: ['Excel·lent', 'Dolent', 'Variable', 'No se\'n parla'],
      correctAnswer: 'Dolent',
      explanation: '"Adversitats meteorològiques" indica mal temps',
      difficulty: 3
    },
    {
      id: 'comp_3',
      type: 'multiple_choice',
      question: 'Text: "L\'estudi revela que el consum de verdures i fruita ha augmentat un 15% en l\'última dècada entre la població juvenil." Què ha passat amb el consum?',
      options: ['Ha disminuït', 'S\'ha mantingut igual', 'Ha augmentat', 'Ha desaparegut'],
      correctAnswer: 'Ha augmentat',
      explanation: 'El text indica un augment del 15%',
      difficulty: 2
    },
    {
      id: 'comp_4',
      type: 'fill_blank',
      question: 'Text: "La nova llei estableix que totes les empreses hauran de complir amb els estàndards mediambientals abans del 2025." Completa: Les empreses hauran de complir abans de ____',
      correctAnswer: '2025',
      explanation: 'El text especifica l\'any 2025 com a data límit',
      difficulty: 2
    }
  ]
};

// Essay writing exercises
export const ESSAY_EXERCISES: OrthographySection = {
  id: 'redaccio',
  title: 'Redaccions',
  description: 'Exercicis d\'escriptura i composició de textos',
  category: 'ortografia',
  exercises: [
    {
      id: 'essay_1',
      type: 'fill_blank',
      question: 'Escriu un text breu (mínim 100 paraules) sobre: "La importància de l\'educació en la societat actual"',
      correctAnswer: 'Text lliure sobre educació',
      explanation: 'Valora coherència, ortografia i estructura',
      difficulty: 3
    },
    {
      id: 'essay_2',
      type: 'fill_blank',
      question: 'Escriu un text argumentatiu (mínim 150 paraules) sobre: "Avantatges i desavantatges de la tecnologia"',
      correctAnswer: 'Text argumentatiu sobre tecnologia',
      explanation: 'Ha d\'incloure arguments a favor i en contra',
      difficulty: 4
    },
    {
      id: 'essay_3',
      type: 'fill_blank',
      question: 'Redacta una carta formal (mínim 120 paraules) sol·licitant informació sobre un curs de català',
      correctAnswer: 'Carta formal sobre curs',
      explanation: 'Ha de seguir l\'estructura d\'una carta formal',
      difficulty: 4
    },
    {
      id: 'essay_4',
      type: 'fill_blank',
      question: 'Escriu un text narratiu (mínim 200 paraules) sobre: "Un dia inoblidable de la meva vida"',
      correctAnswer: 'Text narratiu personal',
      explanation: 'Ha de tenir introducció, desenvolupament i conclusió',
      difficulty: 3
    }
  ]
};

// Final combined export
export const ALL_ORTHOGRAPHY_SECTIONS: OrthographySection[] = [
  ...TEMP_ORTHOGRAPHY_SECTIONS,
  DICTATION_EXERCISES,
  READING_COMPREHENSION,
  ESSAY_EXERCISES
];

// Debug: log the export
console.log('ALL_ORTHOGRAPHY_SECTIONS exported:', ALL_ORTHOGRAPHY_SECTIONS.length, 'sections');
console.log('Book sections:', CATALAN_ORTHOGRAPHY_BOOK_SECTIONS.length);
console.log('Section details:', ALL_ORTHOGRAPHY_SECTIONS.map(s => ({ id: s.id, category: s.category, exerciseCount: s.exercises.length })));

// Export backward compatibility
export const ORTHOGRAPHY_SECTIONS = ALL_ORTHOGRAPHY_SECTIONS;

// Export function to get exercises by category
export const getExercisesByCategory = (category: 'ortografia' | 'morfosintaxi' | 'lexic') => {
  return ALL_ORTHOGRAPHY_SECTIONS.filter(section => section.category === category);
};

// Export function for exercise generation
export const generateBookOrthographyExercises = () => {
  const exercises = [];

  for (const section of CATALAN_ORTHOGRAPHY_BOOK_SECTIONS) {
    for (const exercise of section.exercises) {
      exercises.push({
        title: `${section.title} - ${exercise.id}`,
        description: exercise.question,
        type: 'orthography',
        level: 'A1',
        category: exercise.section,
        content: [{
          id: exercise.id,
          type: exercise.type,
          question: exercise.question,
          correctAnswer: exercise.correctAnswer,
          explanation: exercise.explanation,
          ...(exercise.options && { options: exercise.options })
        }],
        answers: Array.isArray(exercise.correctAnswer)
          ? exercise.correctAnswer
          : [exercise.correctAnswer],
        difficulty_score: exercise.difficulty,
        estimated_duration: 5,
        tags: ['ortografia', exercise.section, 'llibre'],
        is_exam: false,
        max_attempts: 3,
        time_limit: null
      });
    }
  }

  return exercises;
};
