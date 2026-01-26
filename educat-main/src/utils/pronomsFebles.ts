// Exercicis dels pronoms febles en català
export interface PronomsExercise {
  id: string;
  type: 'multiple_choice' | 'fill_blank' | 'transformation';
  question: string;
  options?: string[];
  correctAnswer: string | string[];
  explanation: string;
  level: string;
  category: string;
}

export const pronomsFeblesExercises: PronomsExercise[] = [
  // EXERCICI 1: Combinació de pronoms febles
  {
    id: 'pf_comb_1',
    type: 'multiple_choice',
    question: "T'has compromès a obrir diligències. Marca la combinació correcta:",
    options: ["T'hi has compromès", "Te hi has compromès"],
    correctAnswer: "T'hi has compromès",
    explanation: "El pronom 'et' s'apostrofa davant 'hi'",
    level: 'B1',
    category: 'pronoms_febles'
  },
  {
    id: 'pf_comb_2',
    type: 'multiple_choice',
    question: "M'abstindré d'opinar. Marca la combinació correcta:",
    options: ["Me n'abstindré", "M'en abstindré"],
    correctAnswer: "M'en abstindré",
    explanation: "El pronom 'em' s'apostrofa davant 'en'",
    level: 'B1',
    category: 'pronoms_febles'
  },
  {
    id: 'pf_comb_3',
    type: 'multiple_choice',
    question: "Em vaig negar a acceptar la sentència. Marca la combinació correcta:",
    options: ["Em hi vaig negar", "M'hi vaig negar"],
    correctAnswer: "M'hi vaig negar",
    explanation: "El pronom 'em' s'apostrofa davant 'hi'",
    level: 'B1',
    category: 'pronoms_febles'
  },
  {
    id: 'pf_comb_4',
    type: 'multiple_choice',
    question: "El Carles no s'ha recordat de dir-te allò. Marca la combinació correcta:",
    options: ["El Carles no s'en ha recordat", "El Carles no se n'ha recordat"],
    correctAnswer: "El Carles no se n'ha recordat",
    explanation: "Davant un verb començat per vocal, 'es' esdevé 'se' i 'en' s'apostrofa",
    level: 'B1',
    category: 'pronoms_febles'
  },
  {
    id: 'pf_comb_5',
    type: 'multiple_choice',
    question: "No em crec el que m'heu explicat. Marca la combinació correcta:",
    options: ["No me ho crec", "No m'ho crec"],
    correctAnswer: "No m'ho crec",
    explanation: "El pronom 'em' s'apostrofa davant 'ho'",
    level: 'B1',
    category: 'pronoms_febles'
  },
  {
    id: 'pf_comb_6',
    type: 'multiple_choice',
    question: "Et capfiques massa en aquest tema. Marca la combinació correcta:",
    options: ["Et hi capfiques massa", "T'hi capfiques massa"],
    correctAnswer: "T'hi capfiques massa",
    explanation: "El pronom 'et' s'apostrofa davant 'hi'",
    level: 'B1',
    category: 'pronoms_febles'
  },
  {
    id: 'pf_comb_7',
    type: 'multiple_choice',
    question: "De tant en tant es burla dels seus companys. Marca la combinació correcta:",
    options: ["De tant en tant se'n burla", "De tant en tant s'en burla"],
    correctAnswer: "De tant en tant se'n burla",
    explanation: "Quan 'es' es combina amb 'en', esdevé 'se' i 'en' s'apostrofa",
    level: 'B1',
    category: 'pronoms_febles'
  },
  {
    id: 'pf_comb_8',
    type: 'multiple_choice',
    question: "Va deixar-me llegir l'esborrany del missatge. Marca la combinació correcta:",
    options: ["Va deixar-m'el llegir", "Va deixar-me'l llegir"],
    correctAnswer: "Va deixar-me'l llegir",
    explanation: "Darrere el verb, el pronom 'me' en forma plena i 'el' apostrofat",
    level: 'B1',
    category: 'pronoms_febles'
  },
  {
    id: 'pf_comb_9',
    type: 'multiple_choice',
    question: "T'han portat els tòners? Marca la combinació correcta:",
    options: ["Te'ls han portat?", "Et els han portat?"],
    correctAnswer: "Te'ls han portat?",
    explanation: "El pronom 'et' esdevé 'te' i 'els' s'apostrofa",
    level: 'B1',
    category: 'pronoms_febles'
  },
  {
    id: 'pf_comb_10',
    type: 'multiple_choice',
    question: "Em dedico a restaurar mobles antics. Marca la combinació correcta:",
    options: ["Em hi dedico", "M'hi dedico"],
    correctAnswer: "M'hi dedico",
    explanation: "El pronom 'em' s'apostrofa davant 'hi'",
    level: 'B1',
    category: 'pronoms_febles'
  },

  // EXERCICI 2: Més combinacions
  {
    id: 'pf_comb_11',
    type: 'multiple_choice',
    question: "S'ha acostumat a fer bricolatge els dissabtes. Marca la combinació correcta:",
    options: ["S'hi ha acostumat", "Es hi ha acostumat"],
    correctAnswer: "S'hi ha acostumat",
    explanation: "El pronom reflexiu 'es' s'apostrofa davant 'hi'",
    level: 'B1',
    category: 'pronoms_febles'
  },
  {
    id: 'pf_comb_12',
    type: 'multiple_choice',
    question: "El Jesús es pensava que no ho sabíem. Marca la combinació correcta:",
    options: ["El Jesús es ho pensava", "El Jesús s'ho pensava"],
    correctAnswer: "El Jesús s'ho pensava",
    explanation: "El pronom 'es' s'apostrofa davant 'ho'",
    level: 'B1',
    category: 'pronoms_febles'
  },
  {
    id: 'pf_comb_13',
    type: 'multiple_choice',
    question: "Es va trobar el procurador al Deganat. Marca la combinació correcta:",
    options: ["Se'l va trobar al Deganat", "S'el va trobar al Deganat"],
    correctAnswer: "Se'l va trobar al Deganat",
    explanation: "El pronom 'es' esdevé 'se' i 'el' s'apostrofa",
    level: 'B1',
    category: 'pronoms_febles'
  },
  {
    id: 'pf_comb_14',
    type: 'multiple_choice',
    question: "Em menjaré els macarrons per sopar. Marca la combinació correcta:",
    options: ["Em els menjaré per sopar", "Me'ls menjaré per sopar"],
    correctAnswer: "Me'ls menjaré per sopar",
    explanation: "El pronom 'em' esdevé 'me' i 'els' s'apostrofa",
    level: 'B1',
    category: 'pronoms_febles'
  },
  {
    id: 'pf_comb_15',
    type: 'multiple_choice',
    question: "No et direm això cap més vegada. Marca la combinació correcta:",
    options: ["No et ho direm cap més vegada", "No t'ho direm cap més vegada"],
    correctAnswer: "No t'ho direm cap més vegada",
    explanation: "El pronom 'et' s'apostrofa davant 'ho'",
    level: 'B1',
    category: 'pronoms_febles'
  },
  {
    id: 'pf_comb_16',
    type: 'multiple_choice',
    question: "Vaig menjar-me la poma per esmorzar. Marca la combinació correcta:",
    options: ["Vaig menjar-me la per esmorzar", "Vaig menjar-me-la per esmorzar"],
    correctAnswer: "Vaig menjar-me-la per esmorzar",
    explanation: "Darrere el verb, els pronoms es separen amb guionets",
    level: 'B1',
    category: 'pronoms_febles'
  },
  {
    id: 'pf_comb_17',
    type: 'multiple_choice',
    question: "Es va penedir de la seva declaració. Marca la combinació correcta:",
    options: ["Se'n va penedir", "S'en va penedir"],
    correctAnswer: "Se'n va penedir",
    explanation: "El pronom 'es' esdevé 'se' i 'en' s'apostrofa",
    level: 'B1',
    category: 'pronoms_febles'
  },
  {
    id: 'pf_comb_18',
    type: 'multiple_choice',
    question: "Ahir vaig oblidar-me de fer l'encàrrec. Marca la combinació correcta:",
    options: ["Ahir vaig oblidar-m'en", "Ahir vaig oblidar-me'n"],
    correctAnswer: "Ahir vaig oblidar-me'n",
    explanation: "Darrere el verb, 'me' en forma plena i 'en' apostrofat",
    level: 'B1',
    category: 'pronoms_febles'
  },
  {
    id: 'pf_comb_19',
    type: 'multiple_choice',
    question: "Aquesta decisió no em sembla correcta. Marca la combinació correcta:",
    options: ["Aquesta decisió no em ho sembla", "Aquesta decisió no m'ho sembla"],
    correctAnswer: "Aquesta decisió no m'ho sembla",
    explanation: "El pronom 'em' s'apostrofa davant 'ho'",
    level: 'B1',
    category: 'pronoms_febles'
  },
  {
    id: 'pf_comb_20',
    type: 'multiple_choice',
    question: "Va tornar-nos a dir que arribaríem tard. Marca la combinació correcta:",
    options: ["Va tornar-nos-ho a dir", "Va tornar-ens-ho a dir"],
    correctAnswer: "Va tornar-nos-ho a dir",
    explanation: "Darrere el verb, 'ens' esdevé 'nos' i es separa amb guionets",
    level: 'B1',
    category: 'pronoms_febles'
  },

  // EXERCICI 3: Substitució pronominal (fill_blank)
  {
    id: 'pf_sub_1',
    type: 'fill_blank',
    question: "S'ha tornat molt exigent. → ___ ha tornat.",
    correctAnswer: "S'hi",
    explanation: "Substituïm 'molt exigent' pel pronom 'hi'",
    level: 'B2',
    category: 'pronoms_febles'
  },
  {
    id: 'pf_sub_2',
    type: 'fill_blank',
    question: "Ens hem fet membres d'un col·legi d'advocats. → ___ hem fet.",
    correctAnswer: "Ens n'",
    explanation: "Substituïm 'membres d'un col·legi d'advocats' pel pronom 'en'",
    level: 'B2',
    category: 'pronoms_febles'
  },
  {
    id: 'pf_sub_3',
    type: 'fill_blank',
    question: "T'hauràs d'adaptar a la humitat de la cel·la. → ___ hauràs d'adaptar.",
    correctAnswer: "T'hi",
    explanation: "Substituïm 'a la humitat de la cel·la' pel pronom 'hi'",
    level: 'B2',
    category: 'pronoms_febles'
  },
  {
    id: 'pf_sub_4',
    type: 'fill_blank',
    question: "El Samuel sempre es lleva content. → El Samuel sempre ___ lleva.",
    correctAnswer: "s'hi",
    explanation: "Substituïm 'content' pel pronom 'hi'",
    level: 'B2',
    category: 'pronoms_febles'
  },
  {
    id: 'pf_sub_5',
    type: 'fill_blank',
    question: "No us oblideu de fer les citacions! → No ___ oblideu!",
    correctAnswer: "us en",
    explanation: "Substituïm 'de fer les citacions' pel pronom 'en'",
    level: 'B2',
    category: 'pronoms_febles'
  },
  {
    id: 'pf_sub_6',
    type: 'fill_blank',
    question: "Van acompanyar-nos a l'aeroport. → Van acompanyar-___.",
    correctAnswer: "nos-hi",
    explanation: "Substituïm 'a l'aeroport' pel pronom 'hi' i el col·loquem darrere el verb",
    level: 'B2',
    category: 'pronoms_febles'
  },
  {
    id: 'pf_sub_7',
    type: 'fill_blank',
    question: "Ens oferim a fer de testimonis. → ___ oferim.",
    correctAnswer: "Ens hi",
    explanation: "Substituïm 'a fer de testimonis' pel pronom 'hi'",
    level: 'B2',
    category: 'pronoms_febles'
  },
  {
    id: 'pf_sub_8',
    type: 'fill_blank',
    question: "Em vaig trobar en un bon embolic. → ___ vaig trobar.",
    correctAnswer: "M'hi",
    explanation: "Substituïm 'en un bon embolic' pel pronom 'hi'",
    level: 'B2',
    category: 'pronoms_febles'
  },
  {
    id: 'pf_sub_9',
    type: 'fill_blank',
    question: "Ens hem de pensar una mica més això. → ___ hem de pensar una mica més.",
    correctAnswer: "Ens ho",
    explanation: "Substituïm 'això' pel pronom 'ho'",
    level: 'B2',
    category: 'pronoms_febles'
  },
  {
    id: 'pf_sub_10',
    type: 'fill_blank',
    question: "Abans-d'ahir es va instal·lar al nou despatx. → Abans-d'ahir ___ va instal·lar.",
    correctAnswer: "s'hi",
    explanation: "Substituïm 'al nou despatx' pel pronom 'hi'",
    level: 'B2',
    category: 'pronoms_febles'
  },

  // Exercicis addicionals amb transformacions
  {
    id: 'pf_trans_1',
    type: 'transformation',
    question: "Transforma: Em vaig menjar la taronja → Vaig menjar-___",
    correctAnswer: "me-la",
    explanation: "En posició enclítica (darrere el verb), els pronoms es separen amb guionet",
    level: 'B2',
    category: 'pronoms_febles'
  },
  {
    id: 'pf_trans_2',
    type: 'transformation',
    question: "Transforma: T'has de beure el te → Has de beure-___",
    correctAnswer: "te'l",
    explanation: "En posició enclítica, 'et' esdevé 'te' i 'el' s'apostrofa",
    level: 'B2',
    category: 'pronoms_febles'
  },
  {
    id: 'pf_trans_3',
    type: 'transformation',
    question: "Transforma: No em recordo de la cita → No ___ recordo",
    correctAnswer: "me'n",
    explanation: "'em' esdevé 'me' i 'en' s'apostrofa",
    level: 'B2',
    category: 'pronoms_febles'
  },
  {
    id: 'pf_trans_4',
    type: 'transformation',
    question: "Transforma: Es va llegir tots els llibres → ___ va llegir",
    correctAnswer: "Se'ls",
    explanation: "'es' esdevé 'se' i 'els' s'apostrofa",
    level: 'B2',
    category: 'pronoms_febles'
  },
  {
    id: 'pf_trans_5',
    type: 'transformation',
    question: "Transforma: Ens vam adaptar al canvi → ___ vam adaptar",
    correctAnswer: "Ens hi",
    explanation: "'al canvi' es substitueix per 'hi'",
    level: 'B2',
    category: 'pronoms_febles'
  },

  // Exercicis nivell C1 - combinacions complexes
  {
    id: 'pf_c1_1',
    type: 'multiple_choice',
    question: "No te'n vaig dir res del que sabia. És correcte?",
    options: ["Sí, és correcte", "No, hauria de ser: No te n'vaig dir res"],
    correctAnswer: "Sí, és correcte",
    explanation: "L'apòstrof ha d'anar sempre com més a la dreta millor quan el verb comença per consonant",
    level: 'C1',
    category: 'pronoms_febles'
  },
  {
    id: 'pf_c1_2',
    type: 'multiple_choice',
    question: "No te n'he dit res del que sabia. És correcte?",
    options: ["Sí, és correcte", "No, hauria de ser: No te'n he dit res"],
    correctAnswer: "Sí, és correcte",
    explanation: "Quan el verb comença per vocal o h, l'apòstrof va amb el segon pronom",
    level: 'C1',
    category: 'pronoms_febles'
  },
  {
    id: 'pf_c1_3',
    type: 'fill_blank',
    question: "Penseu-vos tot el que heu de dir → Penseu-___",
    correctAnswer: "vos-ho",
    explanation: "En posició enclítica, 'us' esdevé 'vos' i els pronoms es separen amb guionet",
    level: 'C1',
    category: 'pronoms_febles'
  },
  {
    id: 'pf_c1_4',
    type: 'fill_blank',
    question: "Recorda'ns que hem de passar per la Fiscalia → Recorda-___",
    correctAnswer: "nos-ho",
    explanation: "En posició enclítica, 'ens' esdevé 'nos' quan el verb acaba en vocal diferent de -u",
    level: 'C1',
    category: 'pronoms_febles'
  },
  {
    id: 'pf_c1_5',
    type: 'transformation',
    question: "Beu-te el te a poc a poc → Beu-___ a poc a poc",
    correctAnswer: "te'l",
    explanation: "En posició enclítica, 'te' manté la forma plena i 'el' s'apostrofa",
    level: 'C1',
    category: 'pronoms_febles'
  }
];

// Funció per generar variacions dels exercicis
export const generatePronomsVariations = (baseExercises: PronomsExercise[]): PronomsExercise[] => {
  const variations: PronomsExercise[] = [];
  
  // Més exemples de combinacions comunes
  const combinationPatterns = [
    { pattern: "em + ho", result: "m'ho", example: "Em penso que sí → M'ho penso" },
    { pattern: "et + hi", result: "t'hi", example: "Et trobes bé → T'hi trobes" },
    { pattern: "es + en", result: "se'n", example: "Es recorda → Se'n recorda" },
    { pattern: "ens + el", result: "ens el", example: "Ens porta el llibre → Ens el porta" },
    { pattern: "us + la", result: "us la", example: "Us dono la clau → Us la dono" },
    { pattern: "me + els", result: "me'ls", example: "Em dones els papers → Me'ls dones" },
    { pattern: "te + les", result: "te les", example: "Et porto les flors → Te les porto" },
    { pattern: "se + la", result: "se la", example: "Es menja la poma → Se la menja" }
  ];

  // Generar exercicis basats en els patrons
  combinationPatterns.forEach((pattern, index) => {
    variations.push({
      id: `pf_var_${index + 1}`,
      type: 'multiple_choice',
      question: `Quina és la combinació correcta de ${pattern.pattern}?`,
      options: [pattern.result, pattern.pattern.replace(' + ', ' ')],
      correctAnswer: pattern.result,
      explanation: `Exemple: ${pattern.example}`,
      level: 'B1',
      category: 'pronoms_febles'
    });
  });

  return [...baseExercises, ...variations];
};

// Exportar tots els exercicis amb variacions
export const allPronomsFeblesExercises = generatePronomsVariations(pronomsFeblesExercises);