// Exercicis de conjuncions i adverbis en català
export interface ConjuncionsAdverbisExercise {
  id: string;
  type: 'multiple_choice' | 'fill_blank' | 'formation';
  question: string;
  options?: string[];
  correctAnswer: string | string[];
  explanation: string;
  level: string;
  category: string;
  subcategory?: string;
}

export const conjuncionsAdverbisExercises: ConjuncionsAdverbisExercise[] = [
  // EXERCICI 2: Doncs / Perquè
  {
    id: 'conj_doncs_1',
    type: 'multiple_choice',
    question: "Heu guanyat el concurs? ___ aquí teniu el premi.",
    options: ["Doncs", "Perquè"],
    correctAnswer: "Doncs",
    explanation: "Doncs introdueix una conseqüència (per tant)",
    level: 'B1',
    category: 'conjuncions',
    subcategory: 'doncs_perque'
  },
  {
    id: 'conj_doncs_2',
    type: 'multiple_choice',
    question: "Van agafar un taxi ___ era molt tard.",
    options: ["doncs", "perquè"],
    correctAnswer: "perquè",
    explanation: "Perquè introdueix una causa (ja que)",
    level: 'B1',
    category: 'conjuncions',
    subcategory: 'doncs_perque'
  },
  {
    id: 'conj_doncs_3',
    type: 'multiple_choice',
    question: "És molt tard; caldrà, ___, que agafeu un taxi.",
    options: ["doncs", "perquè"],
    correctAnswer: "doncs",
    explanation: "Doncs introdueix una conseqüència (per tant)",
    level: 'B1',
    category: 'conjuncions',
    subcategory: 'doncs_perque'
  },
  {
    id: 'conj_doncs_4',
    type: 'multiple_choice',
    question: "Escolteu-la amb atenció, ___ explica coses molt interessants.",
    options: ["doncs", "perquè"],
    correctAnswer: "perquè",
    explanation: "Perquè introdueix una causa",
    level: 'B1',
    category: 'conjuncions',
    subcategory: 'doncs_perque'
  },
  {
    id: 'conj_doncs_5',
    type: 'multiple_choice',
    question: "Aquest any potser guanyarem la lliga, ___ tenim un bon equip.",
    options: ["doncs", "perquè"],
    correctAnswer: "perquè",
    explanation: "Perquè introdueix la causa de la possibilitat de guanyar",
    level: 'B1',
    category: 'conjuncions',
    subcategory: 'doncs_perque'
  },

  // EXERCICI 3: Per què / Perquè
  {
    id: 'conj_perque_1',
    type: 'multiple_choice',
    question: "A la roda de premsa van explicar el ___ de la vaga.",
    options: ["per què", "perquè"],
    correctAnswer: "perquè",
    explanation: "El perquè com a nom (= el motiu)",
    level: 'B1',
    category: 'conjuncions',
    subcategory: 'per_que'
  },
  {
    id: 'conj_perque_2',
    type: 'multiple_choice',
    question: "Van convocar una roda de premsa ___ volien explicar els motius de la vaga.",
    options: ["per què", "perquè"],
    correctAnswer: "perquè",
    explanation: "Perquè com a conjunció causal",
    level: 'B1',
    category: 'conjuncions',
    subcategory: 'per_que'
  },
  {
    id: 'conj_perque_3',
    type: 'multiple_choice',
    question: "Ningú no sabia ___ havien convocat la roda de premsa.",
    options: ["per què", "perquè"],
    correctAnswer: "per què",
    explanation: "Per què en interrogativa indirecta (= per quin motiu)",
    level: 'B1',
    category: 'conjuncions',
    subcategory: 'per_que'
  },
  {
    id: 'conj_perque_4',
    type: 'multiple_choice',
    question: "No vindrà a la reunió ___ té judicis assenyalats.",
    options: ["per què", "perquè"],
    correctAnswer: "perquè",
    explanation: "Perquè com a conjunció causal",
    level: 'B1',
    category: 'conjuncions',
    subcategory: 'per_que'
  },
  {
    id: 'conj_perque_5',
    type: 'multiple_choice',
    question: "No ha dit el ___ de la seva absència a la roda de reconeixement.",
    options: ["per què", "perquè"],
    correctAnswer: "perquè",
    explanation: "El perquè com a nom (= el motiu)",
    level: 'B1',
    category: 'conjuncions',
    subcategory: 'per_que'
  },
  {
    id: 'conj_perque_6',
    type: 'multiple_choice',
    question: "M'agradaria saber ___ no fem el treball junts.",
    options: ["per què", "perquè"],
    correctAnswer: "per què",
    explanation: "Per què en interrogativa indirecta",
    level: 'B1',
    category: 'conjuncions',
    subcategory: 'per_que'
  },
  {
    id: 'conj_perque_7',
    type: 'multiple_choice',
    question: "Desconeixia el ___ de la seva actitud.",
    options: ["per què", "perquè"],
    correctAnswer: "perquè",
    explanation: "El perquè com a nom (= el motiu)",
    level: 'B1',
    category: 'conjuncions',
    subcategory: 'per_que'
  },
  {
    id: 'conj_perque_8',
    type: 'multiple_choice',
    question: "Vaig arribar tard a la feina ___ se'm va espatllar el cotxe.",
    options: ["per què", "perquè"],
    correctAnswer: "perquè",
    explanation: "Perquè com a conjunció causal",
    level: 'B1',
    category: 'conjuncions',
    subcategory: 'per_que'
  },
  {
    id: 'conj_perque_9',
    type: 'multiple_choice',
    question: "No recorda ___ ho necessitava.",
    options: ["per què", "perquè"],
    correctAnswer: "per què",
    explanation: "Per què en interrogativa indirecta",
    level: 'B1',
    category: 'conjuncions',
    subcategory: 'per_que'
  },
  {
    id: 'conj_perque_10',
    type: 'multiple_choice',
    question: "___ voleu saber el resultat tan aviat?",
    options: ["Per què", "Perquè"],
    correctAnswer: "Per què",
    explanation: "Per què en interrogativa directa",
    level: 'B1',
    category: 'conjuncions',
    subcategory: 'per_que'
  },

  // EXERCICI 4: Si no / Sinó
  {
    id: 'conj_sino_1',
    type: 'multiple_choice',
    question: "La reunió la dirigirà la directora i, ___ pot, el subdirector.",
    options: ["si no", "sinó"],
    correctAnswer: "si no",
    explanation: "Si no = conjunció condicional + negació",
    level: 'B1',
    category: 'conjuncions',
    subcategory: 'si_no_sino'
  },
  {
    id: 'conj_sino_2',
    type: 'multiple_choice',
    question: "La reunió no la dirigirà la directora ___ el subdirector.",
    options: ["si no", "sinó"],
    correctAnswer: "sinó",
    explanation: "Sinó = conjunció adversativa (mostra oposició)",
    level: 'B1',
    category: 'conjuncions',
    subcategory: 'si_no_sino'
  },
  {
    id: 'conj_sino_3',
    type: 'multiple_choice',
    question: "No has de parlar amb aquella advocada ___ que has de parlar amb l'altra.",
    options: ["si no", "sinó"],
    correctAnswer: "sinó",
    explanation: "Sinó que = conjunció adversativa amb reforç",
    level: 'B1',
    category: 'conjuncions',
    subcategory: 'si_no_sino'
  },
  {
    id: 'conj_sino_4',
    type: 'multiple_choice',
    question: "Has de parlar amb aquella advocada i, ___ hi és, amb l'altra.",
    options: ["si no", "sinó"],
    correctAnswer: "si no",
    explanation: "Si no = conjunció condicional + negació",
    level: 'B1',
    category: 'conjuncions',
    subcategory: 'si_no_sino'
  },
  {
    id: 'conj_sino_5',
    type: 'multiple_choice',
    question: "___ ho podeu fer avui, aviseu-nos.",
    options: ["Si no", "Sinó"],
    correctAnswer: "Si no",
    explanation: "Si no = conjunció condicional + negació",
    level: 'B1',
    category: 'conjuncions',
    subcategory: 'si_no_sino'
  },
  {
    id: 'conj_sino_6',
    type: 'multiple_choice',
    question: "El regal no era un rellotge ___ una cartera.",
    options: ["si no", "sinó"],
    correctAnswer: "sinó",
    explanation: "Sinó = conjunció adversativa (mostra oposició)",
    level: 'B1',
    category: 'conjuncions',
    subcategory: 'si_no_sino'
  },
  {
    id: 'conj_sino_7',
    type: 'multiple_choice',
    question: "D'avellanes, no te'n mengis més ___ t'agraden.",
    options: ["si no", "sinó"],
    correctAnswer: "si no",
    explanation: "Si no = conjunció condicional + negació",
    level: 'B1',
    category: 'conjuncions',
    subcategory: 'si_no_sino'
  },
  {
    id: 'conj_sino_8',
    type: 'multiple_choice',
    question: "La descripció no era acurada ___ matussera.",
    options: ["si no", "sinó"],
    correctAnswer: "sinó",
    explanation: "Sinó = conjunció adversativa",
    level: 'B1',
    category: 'conjuncions',
    subcategory: 'si_no_sino'
  },
  {
    id: 'conj_sino_9',
    type: 'multiple_choice',
    question: "No ho podré acabar aquest migdia ___ m'ajudeu.",
    options: ["si no", "sinó"],
    correctAnswer: "si no",
    explanation: "Si no = conjunció condicional + negació",
    level: 'B1',
    category: 'conjuncions',
    subcategory: 'si_no_sino'
  },
  {
    id: 'conj_sino_10',
    type: 'multiple_choice',
    question: "No et volia dir això ___ exactament el contrari.",
    options: ["si no", "sinó"],
    correctAnswer: "sinó",
    explanation: "Sinó = conjunció adversativa",
    level: 'B1',
    category: 'conjuncions',
    subcategory: 'si_no_sino'
  },

  // EXERCICI 5: Mixtos
  {
    id: 'conj_mix_1',
    type: 'multiple_choice',
    question: "Vaig assistir a la jornada ___ era molt interessant.",
    options: ["per què", "perquè"],
    correctAnswer: "perquè",
    explanation: "Perquè com a conjunció causal",
    level: 'B2',
    category: 'conjuncions',
    subcategory: 'mixtos'
  },
  {
    id: 'conj_mix_2',
    type: 'multiple_choice',
    question: "___ vens aviat, començarem la reunió sense tu.",
    options: ["Si no", "Sinó"],
    correctAnswer: "Si no",
    explanation: "Si no = conjunció condicional + negació",
    level: 'B2',
    category: 'conjuncions',
    subcategory: 'mixtos'
  },
  {
    id: 'conj_mix_3',
    type: 'multiple_choice',
    question: "No sé ___ sempre repeteix el mateix.",
    options: ["per què", "perquè"],
    correctAnswer: "per què",
    explanation: "Per què en interrogativa indirecta",
    level: 'B2',
    category: 'conjuncions',
    subcategory: 'mixtos'
  },
  {
    id: 'conj_mix_4',
    type: 'multiple_choice',
    question: "L'avaria no era als telèfons ___ als ordinadors.",
    options: ["si no", "sinó"],
    correctAnswer: "sinó",
    explanation: "Sinó = conjunció adversativa",
    level: 'B2',
    category: 'conjuncions',
    subcategory: 'mixtos'
  },
  {
    id: 'conj_mix_5',
    type: 'multiple_choice',
    question: "Ens va preguntar el ___ de la situació.",
    options: ["per què", "perquè"],
    correctAnswer: "perquè",
    explanation: "El perquè com a nom",
    level: 'B2',
    category: 'conjuncions',
    subcategory: 'mixtos'
  },
  {
    id: 'conj_mix_6',
    type: 'multiple_choice',
    question: "No tan sols presentaran una queixa ___ que també volen una indemnització.",
    options: ["si no", "sinó"],
    correctAnswer: "sinó",
    explanation: "Sinó que = conjunció adversativa que mostra insuficiència",
    level: 'B2',
    category: 'conjuncions',
    subcategory: 'mixtos'
  },
  {
    id: 'conj_mix_7',
    type: 'multiple_choice',
    question: "Van veure el documental ___ el tema els interessava.",
    options: ["per què", "perquè"],
    correctAnswer: "perquè",
    explanation: "Perquè com a conjunció causal",
    level: 'B2',
    category: 'conjuncions',
    subcategory: 'mixtos'
  },

  // ADVERBIS - EXERCICI 1: Formació d'adverbis en -ment
  {
    id: 'adv_form_1',
    type: 'formation',
    question: "Forma l'adverbi en -ment de: dolç",
    correctAnswer: "dolçament",
    explanation: "dolç → dolça → dolçament",
    level: 'A2',
    category: 'adverbis',
    subcategory: 'formacio'
  },
  {
    id: 'adv_form_2',
    type: 'formation',
    question: "Forma l'adverbi en -ment de: fràgil",
    correctAnswer: "fràgilment",
    explanation: "fràgil → fràgil → fràgilment (manté l'accent)",
    level: 'A2',
    category: 'adverbis',
    subcategory: 'formacio'
  },
  {
    id: 'adv_form_3',
    type: 'formation',
    question: "Forma l'adverbi en -ment de: còmode",
    correctAnswer: "còmodament",
    explanation: "còmode → còmoda → còmodament (manté l'accent)",
    level: 'A2',
    category: 'adverbis',
    subcategory: 'formacio'
  },
  {
    id: 'adv_form_4',
    type: 'formation',
    question: "Forma l'adverbi en -ment de: ampli",
    correctAnswer: "àmpliament",
    explanation: "ampli → àmplia → àmpliament",
    level: 'A2',
    category: 'adverbis',
    subcategory: 'formacio'
  },
  {
    id: 'adv_form_5',
    type: 'formation',
    question: "Forma l'adverbi en -ment de: noble",
    correctAnswer: "noblement",
    explanation: "noble → noble → noblement",
    level: 'A2',
    category: 'adverbis',
    subcategory: 'formacio'
  },
  {
    id: 'adv_form_6',
    type: 'formation',
    question: "Forma l'adverbi en -ment de: trist",
    correctAnswer: "tristament",
    explanation: "trist → trista → tristament",
    level: 'A2',
    category: 'adverbis',
    subcategory: 'formacio'
  },
  {
    id: 'adv_form_7',
    type: 'formation',
    question: "Forma l'adverbi en -ment de: feliç",
    correctAnswer: "feliçment",
    explanation: "feliç → feliç → feliçment",
    level: 'A2',
    category: 'adverbis',
    subcategory: 'formacio'
  },
  {
    id: 'adv_form_8',
    type: 'formation',
    question: "Forma l'adverbi en -ment de: comú",
    correctAnswer: "comunament",
    explanation: "comú → comuna → comunament",
    level: 'A2',
    category: 'adverbis',
    subcategory: 'formacio'
  },
  {
    id: 'adv_form_9',
    type: 'formation',
    question: "Forma l'adverbi en -ment de: ingenu",
    correctAnswer: "ingènuament",
    explanation: "ingenu → ingènua → ingènuament",
    level: 'A2',
    category: 'adverbis',
    subcategory: 'formacio'
  },
  {
    id: 'adv_form_10',
    type: 'formation',
    question: "Forma l'adverbi en -ment de: nou",
    correctAnswer: "novament",
    explanation: "nou → nova → novament",
    level: 'A2',
    category: 'adverbis',
    subcategory: 'formacio'
  },

  // EXERCICI 2: Completar amb adverbis en -ment
  {
    id: 'adv_comp_1',
    type: 'fill_blank',
    question: "Eren milionaris, però vivien ___ (auster).",
    correctAnswer: "austerament",
    explanation: "auster → austera → austerament",
    level: 'B1',
    category: 'adverbis',
    subcategory: 'completar'
  },
  {
    id: 'adv_comp_2',
    type: 'fill_blank',
    question: "Com que va coix, camina molt ___ (lent).",
    correctAnswer: "lentament",
    explanation: "lent → lenta → lentament",
    level: 'B1',
    category: 'adverbis',
    subcategory: 'completar'
  },
  {
    id: 'adv_comp_3',
    type: 'fill_blank',
    question: "Sovint conduïen ___ (boig) per aquells camins.",
    correctAnswer: "bojament",
    explanation: "boig → boja → bojament",
    level: 'B1',
    category: 'adverbis',
    subcategory: 'completar'
  },
  {
    id: 'adv_comp_4',
    type: 'fill_blank',
    question: "Us vau abraçar ___ (tendre).",
    correctAnswer: "tendrament",
    explanation: "tendre → tendra → tendrament",
    level: 'B1',
    category: 'adverbis',
    subcategory: 'completar'
  },
  {
    id: 'adv_comp_5',
    type: 'fill_blank',
    question: "Ells poden entrar i sortir ___ (lliure).",
    correctAnswer: "lliurement",
    explanation: "lliure → lliure → lliurement",
    level: 'B1',
    category: 'adverbis',
    subcategory: 'completar'
  },
  {
    id: 'adv_comp_6',
    type: 'fill_blank',
    question: "Sempre ens responia ___ (educat).",
    correctAnswer: "educadament",
    explanation: "educat → educada → educadament",
    level: 'B1',
    category: 'adverbis',
    subcategory: 'completar'
  },
  {
    id: 'adv_comp_7',
    type: 'fill_blank',
    question: "Va contestar-nos ___ (violent).",
    correctAnswer: "violentament",
    explanation: "violent → violenta → violentament",
    level: 'B1',
    category: 'adverbis',
    subcategory: 'completar'
  },
  {
    id: 'adv_comp_8',
    type: 'fill_blank',
    question: "Els agradava viure ___ (alegre).",
    correctAnswer: "alegrament",
    explanation: "alegre → alegre → alegrament",
    level: 'B1',
    category: 'adverbis',
    subcategory: 'completar'
  },
  {
    id: 'adv_comp_9',
    type: 'fill_blank',
    question: "___ (franc), no sé què dir-te.",
    correctAnswer: "Francament",
    explanation: "franc → franca → francament",
    level: 'B1',
    category: 'adverbis',
    subcategory: 'completar'
  },
  {
    id: 'adv_comp_10',
    type: 'fill_blank',
    question: "Van comunicar l'avaria de telèfons ___ (ràpid).",
    correctAnswer: "ràpidament",
    explanation: "ràpid → ràpida → ràpidament (manté l'accent)",
    level: 'B1',
    category: 'adverbis',
    subcategory: 'completar'
  },

  // EXERCICI 3: Bé/Ben/Mal/Malament
  {
    id: 'adv_be_1',
    type: 'multiple_choice',
    question: "Avui em trobo ___ malament.",
    options: ["bé", "ben"],
    correctAnswer: "ben",
    explanation: "Ben davant d'adverbi o adjectiu",
    level: 'B1',
    category: 'adverbis',
    subcategory: 'be_mal'
  },
  {
    id: 'adv_be_2',
    type: 'multiple_choice',
    question: "La finestra estava ___ tancada.",
    options: ["mal", "malament"],
    correctAnswer: "mal",
    explanation: "Mal davant de participi",
    level: 'B1',
    category: 'adverbis',
    subcategory: 'be_mal'
  },
  {
    id: 'adv_be_3',
    type: 'multiple_choice',
    question: "És ___ fàcil trobar-hi la solució.",
    options: ["bé", "ben"],
    correctAnswer: "ben",
    explanation: "Ben davant d'adjectiu",
    level: 'B1',
    category: 'adverbis',
    subcategory: 'be_mal'
  },
  {
    id: 'adv_be_4',
    type: 'multiple_choice',
    question: "Ha entès ___ les meves paraules.",
    options: ["mal", "malament"],
    correctAnswer: "malament",
    explanation: "Malament darrere del verb",
    level: 'B1',
    category: 'adverbis',
    subcategory: 'be_mal'
  },
  {
    id: 'adv_be_5',
    type: 'multiple_choice',
    question: "El que has fet no està gaire ___.",
    options: ["bé", "ben"],
    correctAnswer: "bé",
    explanation: "Bé al final de l'oració",
    level: 'B1',
    category: 'adverbis',
    subcategory: 'be_mal'
  },
  {
    id: 'adv_be_6',
    type: 'multiple_choice',
    question: "El judici ens ha anat ___.",
    options: ["mal", "malament"],
    correctAnswer: "malament",
    explanation: "Malament darrere del verb",
    level: 'B1',
    category: 'adverbis',
    subcategory: 'be_mal'
  },
  {
    id: 'adv_be_7',
    type: 'multiple_choice',
    question: "Ho has sentit ___, el que t'he dit?",
    options: ["bé", "ben"],
    correctAnswer: "bé",
    explanation: "Bé darrere del verb",
    level: 'B1',
    category: 'adverbis',
    subcategory: 'be_mal'
  },
  {
    id: 'adv_be_8',
    type: 'multiple_choice',
    question: "La construcció de l'edifici està ___ feta.",
    options: ["mal", "malament"],
    correctAnswer: "mal",
    explanation: "Mal davant de participi",
    level: 'B1',
    category: 'adverbis',
    subcategory: 'be_mal'
  },
  {
    id: 'adv_be_9',
    type: 'multiple_choice',
    question: "L'últim dia de la guàrdia estic ___ cansat.",
    options: ["bé", "ben"],
    correctAnswer: "ben",
    explanation: "Ben davant d'adjectiu",
    level: 'B1',
    category: 'adverbis',
    subcategory: 'be_mal'
  },
  {
    id: 'adv_be_10',
    type: 'multiple_choice',
    question: "S'ha comportat molt ___ amb vosaltres.",
    options: ["mal", "malament"],
    correctAnswer: "malament",
    explanation: "Malament darrere del verb",
    level: 'B1',
    category: 'adverbis',
    subcategory: 'be_mal'
  }
];

// Funció per generar més variacions
export const generateConjuncionsAdverbisVariations = (baseExercises: ConjuncionsAdverbisExercise[]): ConjuncionsAdverbisExercise[] => {
  const variations: ConjuncionsAdverbisExercise[] = [];
  
  // Afegir més exemples de doncs/perquè
  const doncsPatternsExtended = [
    { question: "Plou molt fort? ___ agafa el paraigua.", correct: "Doncs" },
    { question: "Agafa el paraigua ___ plou molt fort.", correct: "perquè" },
    { question: "Tens fred? ___ posa't la jaqueta.", correct: "Doncs" },
    { question: "Em poso la jaqueta ___ tinc fred.", correct: "perquè" },
    { question: "És tard; ___, haurem de marxar.", correct: "doncs" }
  ];

  doncsPatternsExtended.forEach((pattern, index) => {
    variations.push({
      id: `conj_var_doncs_${index + 1}`,
      type: 'multiple_choice',
      question: pattern.question,
      options: ["doncs", "perquè", "Doncs", "Perquè"].filter(o => 
        o.toLowerCase() === pattern.correct.toLowerCase() || 
        o.toLowerCase() !== pattern.correct.toLowerCase()
      ).slice(0, 2),
      correctAnswer: pattern.correct,
      explanation: pattern.correct === "Doncs" || pattern.correct === "doncs" 
        ? "Doncs introdueix conseqüència" 
        : "Perquè introdueix causa",
      level: 'B1',
      category: 'conjuncions',
      subcategory: 'doncs_perque_extended'
    });
  });

  // Més adverbis en -ment
  const adverbFormations = [
    { adj: "antic", adv: "antigament" },
    { adj: "audaç", adv: "audaçment" },
    { adj: "tranquil", adv: "tranquil·lament" },
    { adj: "injust", adv: "injustament" },
    { adj: "intel·ligent", adv: "intel·ligentment" },
    { adj: "tossut", adv: "tossudament" },
    { adj: "exquisit", adv: "exquisidament" },
    { adj: "covard", adv: "covardament" }
  ];

  adverbFormations.forEach((item, index) => {
    variations.push({
      id: `adv_var_form_${index + 1}`,
      type: 'formation',
      question: `Forma l'adverbi en -ment de: ${item.adj}`,
      correctAnswer: item.adv,
      explanation: `${item.adj} → ${item.adv}`,
      level: 'A2',
      category: 'adverbis',
      subcategory: 'formacio_extended'
    });
  });

  return [...baseExercises, ...variations];
};

// Exportar tots els exercicis amb variacions
export const allConjuncionsAdverbisExercises = generateConjuncionsAdverbisVariations(conjuncionsAdverbisExercises);