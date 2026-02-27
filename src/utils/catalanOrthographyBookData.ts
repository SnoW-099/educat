// Comprehensive Catalan Orthography Exercises from Official Book
// Based on "Ortografia" textbook content

export interface BookOrthographyExercise {
  id: string;
  type: 'fill_blank' | 'multiple_choice' | 'dictation' | 'ordering' | 'classification' | 'text_completion';
  question: string;
  options?: string[];
  correctAnswer: string | string[];
  explanation: string;
  difficulty: 1 | 2 | 3 | 4 | 5;
  category: string;
  section: string;
}

export interface BookOrthographySection {
  id: string;
  title: string;
  description: string;
  exercises: BookOrthographyExercise[];
}

// ===== S SORDA I S SONORA =====
export const S_SORDA_SONORA_EXERCISES: BookOrthographyExercise[] = [
  {
    id: 's_sorda_1',
    type: 'classification',
    question: 'Classifica els mots segons si tenen un so de essa sorda o essa sonora: tresor, tossut, rosa, quinze, salamandra, desànim, rossa, posar, passar, pesar, pagesa, bronze',
    correctAnswer: ['S sorda: tossut, quinze, passar, rossa, pesar|S sonora: tresor, rosa, salamandra, desànim, posar, pagesa, bronze'],
    explanation: 'S sorda sona més forta, s sonora més suau',
    difficulty: 3,
    category: 'ortografia',
    section: 's_sorda_sonora'
  },
  {
    id: 's_sorda_2a',
    type: 'fill_blank',
    question: 'Completa amb s/ss/c/ç: pe__ic',
    correctAnswer: 's',
    explanation: 'Pesic amb s simple',
    difficulty: 2,
    category: 'ortografia',
    section: 's_sorda_sonora'
  },
  {
    id: 's_sorda_2b',
    type: 'fill_blank',
    question: 'Completa amb s/ss/c/ç: ma__a',
    correctAnswer: 'ss',
    explanation: 'Massa amb ss (s sorda)',
    difficulty: 2,
    category: 'ortografia',
    section: 's_sorda_sonora'
  },
  {
    id: 's_sorda_2c',
    type: 'fill_blank',
    question: 'Completa amb s/ss/c/ç: ca__era',
    correctAnswer: 'ss',
    explanation: 'Cassera amb ss',
    difficulty: 2,
    category: 'ortografia',
    section: 's_sorda_sonora'
  },
  {
    id: 's_sorda_2d',
    type: 'fill_blank',
    question: 'Completa amb s/ss/c/ç: pin__a',
    correctAnswer: 'ç',
    explanation: 'Pinça amb ç',
    difficulty: 2,
    category: 'ortografia',
    section: 's_sorda_sonora'
  },
  {
    id: 's_sorda_3a',
    type: 'fill_blank',
    question: 'Completa la forma verbal: Si tingué__im més temps...',
    correctAnswer: 's',
    explanation: 'Tinguéssim amb s',
    difficulty: 3,
    category: 'ortografia',
    section: 's_sorda_sonora'
  },
  {
    id: 's_sorda_3b',
    type: 'fill_blank',
    question: 'Completa: hauríem de comen__ar',
    correctAnswer: 'ç',
    explanation: 'Començar amb ç',
    difficulty: 3,
    category: 'ortografia',
    section: 's_sorda_sonora'
  },
  {
    id: 's_sorda_4a',
    type: 'fill_blank',
    question: 'Afegeix el sufix: boca + assa = ____',
    correctAnswer: 'bocassa',
    explanation: 'Sufix -assa per indicar grandària',
    difficulty: 2,
    category: 'ortografia',
    section: 's_sorda_sonora'
  },
  {
    id: 's_sorda_4b',
    type: 'fill_blank',
    question: 'Afegeix el sufix: enyorar + dissa = ____',
    correctAnswer: 'enyoradissa',
    explanation: 'Sufix -dissa',
    difficulty: 2,
    category: 'ortografia',
    section: 's_sorda_sonora'
  },
  {
    id: 's_sorda_5a',
    type: 'text_completion',
    question: 'Completa el text: Les creen__es que transmeten els tapi__os de la __ala prin__ipal són ben a__enyades.',
    correctAnswer: 'Les creences que transmeten els tapissos de la sala principal són ben assenyades.',
    explanation: 'Creences (c), tapis(s)os (ss), sala (s), principal (c), assenyades (ss)',
    difficulty: 4,
    category: 'ortografia',
    section: 's_sorda_sonora'
  },
  {
    id: 's_sorda_6a',
    type: 'fill_blank',
    question: 'Completa amb s o z: ben__inera',
    correctAnswer: 'z',
    explanation: 'Benzinera amb z',
    difficulty: 3,
    category: 'ortografia',
    section: 's_sorda_sonora'
  },
  {
    id: 's_sorda_6b',
    type: 'fill_blank',
    question: 'Completa amb s o z: tuni__ià',
    correctAnswer: 's',
    explanation: 'Tunisià amb s',
    difficulty: 3,
    category: 'ortografia',
    section: 's_sorda_sonora'
  },
  {
    id: 's_sorda_7a',
    type: 'fill_blank',
    question: 'Escriu el plural de: balanç → ____',
    correctAnswer: 'balanços',
    explanation: 'Balanç → balanços',
    difficulty: 2,
    category: 'ortografia',
    section: 's_sorda_sonora'
  },
  {
    id: 's_sorda_7b',
    type: 'fill_blank',
    question: 'Escriu el plural de: llaç → ____',
    correctAnswer: 'llaços',
    explanation: 'Llaç → llaços',
    difficulty: 2,
    category: 'ortografia',
    section: 's_sorda_sonora'
  }
];

// ===== G/J (TG/TJ), IG/TX, X/IX =====
export const GJ_TX_X_EXERCISES: BookOrthographyExercise[] = [
  {
    id: 'gj_1',
    type: 'classification',
    question: 'Classifica segons el so: baixar, coixí, ratxa, enveja, juny, platja, mitjó, viatge, estiueig, totxana, passejar, àgil, xifra, raig, xarop, llangardaix, bogeria, assetjament, lletja, estoig',
    correctAnswer: ['sonen com xoc: baixar, coixí, ratxa, xifra, xarop|sonen com joc: enveja, juny, passejar, àgil, bogeria, assetjament|sonen com metxa: platja, viatge, totxana, lletja|sonen com metge: mitjó, estiueig, raig, llangardaix, estoig'],
    explanation: 'Diferents sons palatals i les seves grafies',
    difficulty: 4,
    category: 'ortografia',
    section: 'gj_tx_x'
  },
  {
    id: 'gj_2a',
    type: 'fill_blank',
    question: 'Completa amb j o g: in__ecció',
    correctAnswer: 'j',
    explanation: 'Injecció amb j (excepció)',
    difficulty: 3,
    category: 'ortografia',
    section: 'gj_tx_x'
  },
  {
    id: 'gj_2b',
    type: 'fill_blank',
    question: 'Completa amb j o g: __irafa',
    correctAnswer: 'g',
    explanation: 'Girafa amb g (davant i)',
    difficulty: 2,
    category: 'ortografia',
    section: 'gj_tx_x'
  },
  {
    id: 'gj_2c',
    type: 'fill_blank',
    question: 'Completa amb j o g: tra__ecte',
    correctAnswer: 'j',
    explanation: 'Trajecte amb j (família de projecte)',
    difficulty: 3,
    category: 'ortografia',
    section: 'gj_tx_x'
  },
  {
    id: 'gj_3',
    type: 'text_completion',
    question: 'Completa l\'embarbussament: Setze ju__es d\'un ju__at men__en fe__e d\'un pen__at',
    correctAnswer: 'Setze jutges d\'un jutjat mengen fetge d\'un penjat',
    explanation: 'Alternança j/g i tj/tg segons la vocal següent',
    difficulty: 4,
    category: 'ortografia',
    section: 'gj_tx_x'
  },
  {
    id: 'gj_4a',
    type: 'fill_blank',
    question: 'Escriu un verb derivat de desig amb tx o ig: ____',
    correctAnswer: 'desitjar',
    explanation: 'Desig → desitjar (canvia a tj)',
    difficulty: 3,
    category: 'ortografia',
    section: 'gj_tx_x'
  },
  {
    id: 'gj_5a',
    type: 'fill_blank',
    question: 'Escriu el plural de: El boig → Els ____',
    correctAnswer: 'bojos',
    explanation: 'Boig → bojos (ig canvia a j)',
    difficulty: 3,
    category: 'ortografia',
    section: 'gj_tx_x'
  },
  {
    id: 'gj_6a',
    type: 'fill_blank',
    question: 'Completa amb ix o x: __àfec',
    correctAnswer: 'x',
    explanation: 'Xàfec amb x (inici de paraula)',
    difficulty: 2,
    category: 'ortografia',
    section: 'gj_tx_x'
  },
  {
    id: 'gj_6b',
    type: 'fill_blank',
    question: 'Completa amb ix o x: madu__ot',
    correctAnswer: 'ix',
    explanation: 'Maduixot amb ix (després de vocal)',
    difficulty: 2,
    category: 'ortografia',
    section: 'gj_tx_x'
  }
];

// ===== M/N =====
export const MN_EXERCISES: BookOrthographyExercise[] = [
  {
    id: 'mn_1',
    type: 'classification',
    question: 'Classifica amb m o n: minvar, convivència, amfibi, commutar, combinació, ampliar, circumferència, primmirat, rebombori, envà, complidor, embús, commoció, acampada, paranimf',
    correctAnswer: ['mb: amfibi, combinació, rebombori, embús, acampada|mp: ampliar, complidor, commoció|mm: commutar, primmirat|mf: paranimf, circumferència|nv: minvar, convivència, envà'],
    explanation: 'M davant b, p, m, f. N davant v.',
    difficulty: 3,
    category: 'ortografia',
    section: 'mn'
  },
  {
    id: 'mn_2a',
    type: 'fill_blank',
    question: 'Completa amb m o n: i__fermera',
    correctAnswer: 'n',
    explanation: 'Infermera amb n (prefix in-)',
    difficulty: 2,
    category: 'ortografia',
    section: 'mn'
  },
  {
    id: 'mn_2b',
    type: 'fill_blank',
    question: 'Completa amb m o n: e__mig',
    correctAnswer: 'n',
    explanation: 'Enmig amb n (excepció)',
    difficulty: 3,
    category: 'ortografia',
    section: 'mn'
  },
  {
    id: 'mn_3a',
    type: 'fill_blank',
    question: 'Completa amb im o in: ___batut',
    correctAnswer: 'im',
    explanation: 'Imbatut amb im- (davant b)',
    difficulty: 2,
    category: 'ortografia',
    section: 'mn'
  },
  {
    id: 'mn_3b',
    type: 'fill_blank',
    question: 'Completa amb im o in: ___finit',
    correctAnswer: 'in',
    explanation: 'Infinit amb in- (davant f, excepció)',
    difficulty: 3,
    category: 'ortografia',
    section: 'mn'
  },
  {
    id: 'mn_4a',
    type: 'fill_blank',
    question: 'Verb derivat de petit: ___petitir',
    correctAnswer: 'em',
    explanation: 'Empetitir amb em- (davant p)',
    difficulty: 2,
    category: 'ortografia',
    section: 'mn'
  },
  {
    id: 'mn_5a',
    type: 'multiple_choice',
    question: 'Completa: Cal anar amb ____.',
    options: ['compte', 'conte', 'comte'],
    correctAnswer: 'compte',
    explanation: 'Account/care = compte',
    difficulty: 2,
    category: 'ortografia',
    section: 'mn'
  }
];

// ===== R/RR =====
export const RR_EXERCISES: BookOrthographyExercise[] = [
  {
    id: 'rr_1a',
    type: 'multiple_choice',
    question: 'El so de la r en "aclarir" és:',
    options: ['simple', 'múltiple', 'mut'],
    correctAnswer: 'simple',
    explanation: 'R final senzilla',
    difficulty: 2,
    category: 'ortografia',
    section: 'rr'
  },
  {
    id: 'rr_1b',
    type: 'multiple_choice',
    question: 'El so de la r en "querella" és:',
    options: ['simple', 'múltiple', 'mut'],
    correctAnswer: 'múltiple',
    explanation: 'RR entre vocals',
    difficulty: 2,
    category: 'ortografia',
    section: 'rr'
  },
  {
    id: 'rr_2a',
    type: 'fill_blank',
    question: 'Infinitiu de "dúieu": ____',
    correctAnswer: 'dur',
    explanation: 'Dur (infinitiu amb r)',
    difficulty: 2,
    category: 'ortografia',
    section: 'rr'
  },
  {
    id: 'rr_3a',
    type: 'fill_blank',
    question: 'Primitiu de "poruc": ____',
    correctAnswer: 'por',
    explanation: 'Por → poruc',
    difficulty: 2,
    category: 'ortografia',
    section: 'rr'
  },
  {
    id: 'rr_4a',
    type: 'fill_blank',
    question: 'Substantiu de "fosc": ____',
    correctAnswer: 'foscor',
    explanation: 'Fosc → foscor (sufix -or)',
    difficulty: 2,
    category: 'ortografia',
    section: 'rr'
  }
];

// ===== L/L·L/LL =====
export const LLL_EXERCISES: BookOrthographyExercise[] = [
  {
    id: 'lll_1a',
    type: 'fill_blank',
    question: 'Contrari de "legal": i____',
    correctAnswer: 'il·legal',
    explanation: 'Il·legal amb ela geminada',
    difficulty: 3,
    category: 'ortografia',
    section: 'lll'
  },
  {
    id: 'lll_2a',
    type: 'fill_blank',
    question: 'Infinitiu: ape__ar + substantiu derivat',
    correctAnswer: 'apel·lar - apel·lació',
    explanation: 'Apel·lar amb ela geminada',
    difficulty: 3,
    category: 'ortografia',
    section: 'lll'
  },
  {
    id: 'lll_3',
    type: 'multiple_choice',
    question: 'Quina paraula té error ortogràfic?',
    options: ['satèl·lit', 'gorila', 'col·lega', 'il·lusió'],
    correctAnswer: 'gorila',
    explanation: 'Correcte: goril·la',
    difficulty: 3,
    category: 'ortografia',
    section: 'lll'
  },
  {
    id: 'lll_4',
    type: 'classification',
    question: 'Classifica les paraules: novel·la, sentinella, motxilla, excel·lent, pel·lícula, trasllada, nul·litat, lleganya',
    correctAnswer: ['l: sentinella, lleganya|l·l: novel·la, excel·lent, pel·lícula, nul·litat|ll: motxilla, trasllada'],
    explanation: 'Diferents tipus d\'ela',
    difficulty: 4,
    category: 'ortografia',
    section: 'lll'
  }
];

// ===== H =====
export const H_EXERCISES: BookOrthographyExercise[] = [
  {
    id: 'h_1a',
    type: 'multiple_choice',
    question: 'Quina paraula s\'escriu amb h?',
    options: ['arbre', 'herba', 'escola', 'ordinador'],
    correctAnswer: 'herba',
    explanation: 'Herba s\'escriu amb h inicial',
    difficulty: 2,
    category: 'ortografia',
    section: 'h'
  },
  {
    id: 'h_2a',
    type: 'multiple_choice',
    question: 'Diferencia: "ha" vs "a"',
    options: ['ha (verb), a (preposició)', 'ha (preposició), a (verb)', 'són iguals'],
    correctAnswer: 'ha (verb), a (preposició)',
    explanation: 'Ha = verb haver, a = preposició',
    difficulty: 2,
    category: 'ortografia',
    section: 'h'
  },
  {
    id: 'h_3a',
    type: 'fill_blank',
    question: 'Completa: A_ir vaig anar al cinema',
    correctAnswer: 'h',
    explanation: 'Ahir amb h',
    difficulty: 1,
    category: 'ortografia',
    section: 'h'
  }
];

// ===== ELS VERBS REGULARS =====
export const ELS_VERBS_REGULARS_EXERCISES: BookOrthographyExercise[] = [
  {
    id: 'verbs_regulars_1',
    type: 'fill_blank',
    question: 'Ompliu amb perfet d\'indicatiu o passat perifràstic: Avui el tribunal _____ (confirmar) la sentència d\'instància.',
    correctAnswer: 'ha confirmat',
    explanation: 'Avui indica temps proper, per això usem perfet d\'indicatiu',
    difficulty: 3,
    category: 'morfosintaxi',
    section: 'verbs_regulars'
  },
  {
    id: 'verbs_regulars_2',
    type: 'fill_blank',
    question: 'Ompliu amb la forma corresponent: Demà _____ (signar, jo) el contracte de compravenda.',
    correctAnswer: 'signaré',
    explanation: 'Demà indica futur, per això usem futur simple',
    difficulty: 2,
    category: 'morfosintaxi',
    section: 'verbs_regulars'
  },
  {
    id: 'verbs_regulars_3',
    type: 'fill_blank',
    question: 'Ompliu amb la forma corresponent: L\'han enxampat _____ (guixar) les parets de l\'edifici.',
    correctAnswer: 'guixant',
    explanation: 'Després de verbs de percepció cal el gerundi',
    difficulty: 3,
    category: 'morfosintaxi',
    section: 'verbs_regulars'
  }
];

// ===== EL SUBSTANTIU I L'ADJECTIU: GÈNERE =====
export const SUBSTANTIU_ADJECTIU_GENERE_EXERCISES: BookOrthographyExercise[] = [
  {
    id: 'substantiu_genere_1',
    type: 'fill_blank',
    question: 'Canvieu el gènere: funcionari → ____',
    correctAnswer: 'funcionària',
    explanation: 'Funcionari (masculí) → funcionària (femení)',
    difficulty: 2,
    category: 'ortografia',
    section: 'substantiu_adjectiu_genere'
  },
  {
    id: 'substantiu_genere_2',
    type: 'multiple_choice',
    question: 'Completeu amb l\'article correcte: _____ pols de les obres',
    options: ['el', 'la'],
    correctAnswer: 'la',
    explanation: 'La pols (femení)',
    difficulty: 2,
    category: 'ortografia',
    section: 'substantiu_adjectiu_genere'
  },
  {
    id: 'substantiu_genere_3',
    type: 'fill_blank',
    question: 'Completeu l\'adjectiu: terreny agrícol__ → maquinària ____',
    correctAnswer: 'agrícola',
    explanation: 'Agrícol (masculí) → agrícola (femení)',
    difficulty: 2,
    category: 'ortografia',
    section: 'substantiu_adjectiu_genere'
  },
  {
    id: 'substantiu_genere_4',
    type: 'fill_blank',
    question: 'Escriviu en femení: La ____ (mestre) de l\'Helena és de Lleida.',
    correctAnswer: 'mestra',
    explanation: 'Mestre → mestra',
    difficulty: 2,
    category: 'ortografia',
    section: 'substantiu_adjectiu_genere'
  },
  {
    id: 'substantiu_genere_5',
    type: 'fill_blank',
    question: 'Feu els canvis necessaris: matí tranquil → tarda ____',
    correctAnswer: 'tranquil·la',
    explanation: 'Tranquil → tranquil·la (femení)',
    difficulty: 3,
    category: 'ortografia',
    section: 'substantiu_adjectiu_genere'
  },
  {
    id: 'substantiu_genere_6',
    type: 'fill_blank',
    question: 'Escriviu correctament: L\' ____ (heroïna) d\'aquell conte era noruec.',
    correctAnswer: 'heroi',
    explanation: 'En aquest context, heroi (masculí)',
    difficulty: 3,
    category: 'ortografia',
    section: 'substantiu_adjectiu_genere'
  },
  {
    id: 'substantiu_genere_7',
    type: 'fill_blank',
    question: 'Completeu: La meva neboda és ____ (vidu).',
    correctAnswer: 'vídua',
    explanation: 'Vidu → vídua (femení)',
    difficulty: 2,
    category: 'ortografia',
    section: 'substantiu_adjectiu_genere'
  },
  {
    id: 'substantiu_genere_8',
    type: 'fill_blank',
    question: 'Completeu: La meva mare treballa d\' ____ (educador) social.',
    correctAnswer: 'educadora',
    explanation: 'Educador → educadora (femení)',
    difficulty: 2,
    category: 'ortografia',
    section: 'substantiu_adjectiu_genere'
  },
  {
    id: 'substantiu_genere_9',
    type: 'fill_blank',
    question: 'Completeu: Necessitem una carpeta ____ (blau).',
    correctAnswer: 'blava',
    explanation: 'Blau → blava (femení)',
    difficulty: 2,
    category: 'ortografia',
    section: 'substantiu_adjectiu_genere'
  }
];

// ===== EXERCICIS DE REPÀS =====
export const REVIEW_EXERCISES: BookOrthographyExercise[] = [
  {
    id: 'review_1',
    type: 'text_completion',
    question: 'Posa els accents que calguin: Els patrons de bellesa son ben volatils. Anys enrere, els cossos turgents plens de corbes es preferien a les figures pal·lides i languides tan de moda avui dia.',
    correctAnswer: 'Els patrons de bellesa són ben volàtils. Anys enrere, els cossos túrgents plens de corbes es preferien a les figures pàl·lides i làngüides tan de moda avui dia.',
    explanation: 'Accents en són, volàtils, túrgents, pàl·lides, làngüides',
    difficulty: 4,
    category: 'ortografia',
    section: 'review'
  },
  {
    id: 'review_2',
    type: 'text_completion',
    question: 'Completa amb les lletres adients: Després de les sardanes hi va ha__er jocs infantils i la seva germana i la meva van pro__ar d\'af__itar glob__s',
    correctAnswer: 'Després de les sardanes hi va haver jocs infantils i la seva germana i la meva van provar d\'afitar globus',
    explanation: 'haver, provar, afitar, globus',
    difficulty: 3,
    category: 'ortografia',
    section: 'review'
  },
  {
    id: 'review_3',
    type: 'text_completion',
    question: 'Completa: De__ia ca__tar que el que deia no em feia ni fre__ ni calor',
    correctAnswer: 'Devia cantar que el que deia no em feia ni fred ni calor',
    explanation: 'Devia, cantar, fred',
    difficulty: 3,
    category: 'ortografia',
    section: 'review'
  }
];

// ===== COMBINED SECTIONS =====
export const CATALAN_ORTHOGRAPHY_BOOK_SECTIONS: BookOrthographySection[] = [
  {
    id: 's_sorda_sonora',
    title: 'S Sorda i S Sonora',
    description: 'Diferenciació entre s sorda (ss/c/ç) i s sonora',
    exercises: S_SORDA_SONORA_EXERCISES
  },
  {
    id: 'gj_tx_x',
    title: 'G/J (TG/TJ), IG/TX, X/IX',
    description: 'Sons palatals i les seves grafies',
    exercises: GJ_TX_X_EXERCISES
  },
  {
    id: 'mn',
    title: 'M/N',
    description: 'Ús correcte de m i n davant consonants',
    exercises: MN_EXERCISES
  },
  {
    id: 'rr',
    title: 'R/RR',
    description: 'R simple i r múltiple',
    exercises: RR_EXERCISES
  },
  {
    id: 'lll',
    title: 'L/L·L/LL',
    description: 'Ela simple, geminada i dígraf ll',
    exercises: LLL_EXERCISES
  },
  {
    id: 'h',
    title: 'H',
    description: 'Ús de la hac muda',
    exercises: H_EXERCISES
  },
  {
    id: 'substantiu_adjectiu_genere',
    title: 'El Substantiu i l\'Adjectiu: Gènere',
    description: 'Concordança de gènere en substantius i adjectius catalans',
    exercises: SUBSTANTIU_ADJECTIU_GENERE_EXERCISES
  },
  {
    id: 'verbs_regulars',
    title: 'Els Verbs Regulars',
    description: 'Conjugació dels verbs regulars catalans i ús dels temps verbals',
    exercises: ELS_VERBS_REGULARS_EXERCISES
  },
  {
    id: 'review',
    title: 'Exercicis de Repàs',
    description: 'Repàs integral d\'ortografia catalana',
    exercises: REVIEW_EXERCISES
  }
];

// Export all exercises combined
export const ALL_BOOK_EXERCISES = [
  ...S_SORDA_SONORA_EXERCISES,
  ...GJ_TX_X_EXERCISES,
  ...MN_EXERCISES,
  ...RR_EXERCISES,
  ...LLL_EXERCISES,
  ...H_EXERCISES,
  ...SUBSTANTIU_ADJECTIU_GENERE_EXERCISES,
  ...ELS_VERBS_REGULARS_EXERCISES,
  ...REVIEW_EXERCISES
];