// Exercicis d'Accentuació i Dièresi - Nivell C
// NOTA: Els textos contenen errors intencionats (falten accents i dièresis) perquè els alumnes practiquin

export interface ExerciciAccentuacio {
  id: number;
  titol?: string;
  instruccio: string;
  tipus: 'llista' | 'text' | 'test' | 'classificacio' | 'frases';
  contingut: LlistaContingut | TextContingut | TestContingut | ClassificacioContingut | FrasesContingut;
  referencia?: string;
  novetat?: boolean;        // Indica si és un exercici nou
  nivell: 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2';
  categoria: 'accentuacio' | 'dieresi' | 'diacritic' | 'mixte';
}

interface LlistaContingut {
  paraules: string[];
}

interface TextContingut {
  text: string;
}

interface TestContingut {
  opcions: string[];
  frases: { numero: number; frase: string }[];
}

interface ClassificacioContingut {
  paraules: string[];
  categories: string[];
}

interface FrasesContingut {
  frases: { numero: number; frase: string }[];
}

export const exercicisAccentuacioNivellC: ExerciciAccentuacio[] = [
  // ==========================================
  // EXERCICIS D'ACCENTUACIÓ BÀSICA
  // ==========================================
  {
    id: 304,
    titol: "Paraules agudes",
    instruccio: "Classifiqueu-les en els grups de més avall i accentueu-les, si cal.",
    tipus: "classificacio",
    nivell: "C1",
    categoria: "accentuacio",
    novetat: true,
    contingut: {
      paraules: [
        "cami", "pingüi", "algun", "canteu", "vostes", "enrenous", "tindran",
        "Berlin", "hivern", "relleu", "sabo", "xassis", "sabons", "xamfra", "senyal"
      ],
      categories: [
        "Agudes acabades en vocal/vocal+s/en/in",
        "Agudes amb altres terminacions"
      ]
    }
  },
  {
    id: 305,
    titol: "Paraules planes",
    instruccio: "Classifiqueu-les en els grups de més avall i accentueu-les, si cal.",
    tipus: "classificacio",
    nivell: "C1",
    categoria: "accentuacio",
    novetat: true,
    contingut: {
      paraules: [
        "album", "timid", "fenomen", "via", "cantaries", "trolei", "unic",
        "antropoleg", "semafor", "beure", "motxilla", "claxon", "correr", "vertigen", "castig"
      ],
      categories: [
        "Planes acabades en vocal/vocal+s/en/in",
        "Planes amb altres terminacions"
      ]
    }
  },
  {
    id: 306,
    titol: "Paraules esdrúixoles",
    instruccio: "Les paraules que trobareu a continuació són esdrúixoles; accentueu-les.",
    tipus: "llista",
    nivell: "C1",
    categoria: "accentuacio",
    novetat: true,
    contingut: {
      paraules: [
        "farmacia", "republica", "gimnastica", "quimica", "secretaria", "arbitre",
        "bustia", "constancia", "peninsula", "memoria", "esglesia", "bruixola"
      ]
    }
  },
  {
    id: 313,
    titol: "Classificació mixta",
    instruccio: "Classifiqueu els mots següents segons que siguin aguts, plans o esdrúixols i accentueu-los si cal.",
    tipus: "classificacio",
    nivell: "C1",
    categoria: "accentuacio",
    novetat: true,
    contingut: {
      paraules: [
        "germa", "creixer", "ciencia", "desmai", "escrivieu", "vidua", "telefon",
        "cami", "camions", "examen", "llepol", "espremer", "espes", "examens",
        "talos", "Julia", "aeria", "Maria"
      ],
      categories: [
        "Aguts",
        "Plans",
        "Esdrúixols"
      ]
    }
  },

  // ==========================================
  // EXERCICIS DE CONTEXT / FRASES
  // ==========================================
  {
    id: 317,
    titol: "Accents en frases",
    instruccio: "Escriviu els accents als mots de les frases següents que n'hagin de dur.",
    tipus: "frases",
    nivell: "C1",
    categoria: "accentuacio",
    novetat: true,
    contingut: {
      frases: [
        { numero: 1, frase: "Fora d'interes general fer pagares si hom preten fer-ho be." },
        { numero: 2, frase: "Per fi ha compres que ha de correr mes agilment si te la intencio de jugar a futbol professional." },
        { numero: 3, frase: "Se n'ha despres espontaniament i despres nomes tenia la deria d'anar a l'esglesia." },
        { numero: 4, frase: "Si ell compres els pressecs, l'arros i el xeres, jo aniria fent el pure de carbasso." },
        { numero: 5, frase: "A traves d'aquesta formula faran una polvora que fara historia." },
        { numero: 6, frase: "Deiem que l'haviem inclos en el proleg perque estiguessiu tranquils." }
      ]
    }
  },
  {
    id: 320,
    titol: "Accent diacrític - Opció múltiple",
    instruccio: "Trieu l'opció correcta.",
    tipus: "test",
    nivell: "C1",
    categoria: "diacritic",
    novetat: true,
    contingut: {
      opcions: ["dóna/dona", "és/es", "féu/feu", "móres/mores", "sé/se", "fóra/fora", "ús/us", "vós/vos", "què/que"],
      frases: [
        { numero: 1, frase: "Aquesta _______ sempre _______ propina." },
        { numero: 2, frase: "_______ millor que _______ pentini sol." },
        { numero: 3, frase: "El pare ho _______ sempre; ara, vosaltres, també _______ bo que ho _______." },
        { numero: 4, frase: "Aquestes _______ venen _______ a mercat." },
        { numero: 5, frase: "No _______ si ja _______ sap." },
        { numero: 6, frase: "_______ millor que anéssiu _______." },
        { numero: 7, frase: "_______ ho vull explicar perquè en feu un bon _______." },
        { numero: 8, frase: "_______, hauríeu de recordar-_______ del que va passar." },
        { numero: 9, frase: "Vols _______ sigui una sorpresa o t'estimes més dir-me _______ vols que et compri?" }
      ]
    }
  },
  {
    id: 321,
    titol: "Accent diacrític en text literari",
    instruccio: "Poseu l'accent diacrític en els cinc mots del text que l'han de dur.",
    tipus: "text",
    nivell: "C1",
    categoria: "diacritic",
    novetat: true,
    contingut: {
      text: "Les dotze hores son tocades, comte l'Arnau, les dotze hores son tocades, valga'm Deu, val! Vos dic que no em feu l'oferta, muller lleial, que com mes me feu l'oferta, mes pena em dau."
    },
    referencia: "Joan Maragall, El comte Arnau"
  },
  {
    id: 322,
    titol: "Separació de síl·labes i síl·laba tònica",
    instruccio: "Separeu en síl·labes les paraules que teniu a continuació i classifiqueu-les segons quina sigui la posició de la síl·laba tònica.",
    tipus: "classificacio",
    nivell: "C1",
    categoria: "accentuacio",
    novetat: true,
    contingut: {
      paraules: [
        "panet", "remei", "crèdit", "futbol", "Himàlaia", "desmai", "atmosfera",
        "déu", "almoina", "queixal", "ciutats", "ràdio", "runa", "gràssius",
        "delinqüent", "seqüència", "ús", "safareig"
      ],
      categories: [
        "Mots que tenen la síl·laba tònica en l'última síl·laba",
        "Mots que tenen la síl·laba tònica en la penúltima síl·laba",
        "Mots que tenen la síl·laba tònica en l'antepenúltima síl·laba"
      ]
    }
  },
  {
    id: 323,
    titol: "Monosíl·labs",
    instruccio: "A continuació teniu mots monosíl·labs. Classifiqueu-los segons que siguin àtons o tònics.",
    tipus: "classificacio",
    nivell: "C1",
    categoria: "diacritic",
    novetat: true,
    contingut: {
      paraules: [
        "em", "hem", "que", "què", "les", "quan", "pa", "jo", "de", "es", "pels"
      ],
      categories: [
        "Monosíl·labs àtons",
        "Monosíl·labs tònics"
      ]
    }
  },

  // ==========================================
  // EXERCICIS DE TEXTOS LLARGS - NIVELL C
  // ==========================================
  {
    id: 327,
    titol: "Escriure",
    instruccio: "Poseu els accents que falten en el text següent.",
    tipus: "text",
    nivell: "C2",
    categoria: "accentuacio",
    novetat: true,
    contingut: {
      text: "Generalment se sent dir que, quan un es posa a escriure, les blanques quartilles perden la virginitat. La virginitat de les quartilles, pero, no te cap importancia. La virginitat de les «quartel·les» —aquesta es la paraula que Josep Carner proposa per anomenar aquesta classe de papers— encara menys. El que en posar-nos a escriure perd notoriament la virginitat es el pensament que hipoteticament ens pensavem tenir i els mitjans d'expressio de que il·lusoriament pensavem disposar. Aquestes son perdues de virginitat irreparables. No hi ha ningu que no es pensi esser un gran escriptor abans de posar-se a escriure. Tema literari: dibuixar, en una ratlla i mitja, el vol d'un ocell."
    }
  },
  {
    id: 333,
    titol: "El foc de Barcelona",
    instruccio: "Poseu els accents que falten en aquest article d'opinió.",
    tipus: "text",
    nivell: "C2",
    categoria: "accentuacio",
    novetat: true,
    contingut: {
      text: "Un principi constant es que les noticies perden importancia a mesura que augmenta la distancia. Un mort d'accident al poble del costat es mes noticia que cent morts a Belgica, i aquests, al seu torn, ho son mes que mil morts per una onada gegant a la costa de Papua. Aixo explica que els mitjans informatius locals de Barcelona reaccionin de seguida i facin un gran desplegament quan es cremen deu hectarees de bosc a la serra de Collserola, pero en canvi esperin fins que s'arriba a les vint mil hectarees per concedir honors de primera pagina a un incendi forestal al Bages i al Solsones, que per a aquests mitjans nomes ha començat a existir de veres quan ja feia dos dies i mig que devorava pins a cor que vols. Insisteixo que aquesta percepcio en funcio de la distancia es del tot normal i obeeix a les lleis naturals de la perspectiva. El problema, pero, es que alguns dels mitjans (premsa, radio, televisio) que miren les coses d'aquesta manera no es defineixen ells mateixos com a mitjans locals de Barcelona, sino com a mitjans nacionals de Catalunya. I en alguns casos son serveis publics que participen de pressupostos institucionals. Pero aquesta vegada la seva mirada no ha estat nacional, sino metropolitana. I no es la primera vegada. Tant de bo, almenys, que fos l'ultima!"
    },
    referencia: "Xavier Domènech, Regió 7"
  },
  {
    id: 355,
    titol: "L'aplicacio efectiva de la Reforma",
    instruccio: "Llegiu el text amb atenció i poseu-hi els accents i les dièresis que hi falten.",
    tipus: "text",
    nivell: "C2",
    categoria: "mixte",
    novetat: true,
    contingut: {
      text: "L'aplicacio efectiva s'ha anat fent amb comptagotes. Els successius ajornaments de la implantacio han anat refredant mes d'un acerrim defensor del nou sistema i han «tranquil·litzat» una bona colla de detractors. A hores d'ara, fixats uns terminis d'implantacio progressiva, sembla que no hi ha gaires possibilitats que el projecte es deturi. De tota manera, la pretesa bondat del nou sistema educatiu trigara encara uns quants anys a ser constatada. El temps ho dira ja que no ho poden fer les experiencies pilot que fins ara s'han dut a terme. La manca de planificacio i la precipitacio amb que s'han iniciat aquestes experiencies nomes han donat un resultat falsejat que no serveix per avaluar la validesa i l'eficacia d'aquest intent primicer. No es pot assajar cap experiencia nova —i innovadora— amb eines velles i oscades. Si es tractava de fer l'assaig general, calia penjar abans els decorats. A Barcelona ciutat un nombre reduit de centres experimentadors de la reforma han hagut de conviure amb un gran nombre de centres que encara imparteixen BUP. Els alumnes de primaria han anat massivament a cursar BUP i han fugit d'una reforma que, a hores d'ara, te un mal predicament. Als centres de la reforma, per contra, s'hi han abocat alumnes sense opcio a fer BUP per raons de titulacio academica."
    },
    referencia: "Butlletí del Col·legi Oficial de Doctors i Llicenciats, núm. 90, 10/94 (text adaptat)"
  },
  {
    id: 357,
    titol: "Assassins nats? (II)",
    instruccio: "Llegiu el text amb atenció i poseu-hi els accents i les dièresis que hi falten.",
    tipus: "text",
    nivell: "C2",
    categoria: "mixte",
    novetat: true,
    contingut: {
      text: "—I es clar que no! Pero no es el mateix! —Des de quin punt de vista no es el mateix? Primera: l'opcio islamista havia concorregut a les eleccions seguint les pautes democratiques instituides pel govern. Segona: havia guanyat clarament en la segona volta. Tercera: per evitar una victoria abassegadora dels islamistes, el govern desconvoca la segona volta, decreta la llei marcial i rep els copets a l'esquena d'Occident que s'ha tret del damunt la perspectiva d'un regim incomode, cridaner i presumptament incontrolat que hauria posat en perill el subministrament del gas per a les llars confortables com la teva i la meva. Tu no n'estaries, d'emprenyat? —Plantejat aixi, evidentment. Pero si aquesta gent no respecta res! Ves a saber que haurien fet en cas d'arribar al poder. —Aixo no ho sabem. Pero potser hauria estat mes prudent aplicar allo tan bonic dels «afers interns» i haver-los deixat manar, a veure que passava. —Tot el que vulguis, pero son uns criminals. —Exacte: els fets han portat uns quants d'ells a ser uns criminals fora de tota rao i disculpa. Pero et confesso que em sap un greu terrible haver respirat tranquil·lament quan els militars van prendre el poder per impedir-los aconseguir el poder. Ells son uns carnissers, pero nosaltres els vam esmolar les eines."
    },
    referencia: "Jordi Ferrerons, Avui, 3/2/95"
  },

  // ==========================================
  // EXERCICIS DE DIÈRESI
  // ==========================================
  {
    id: 334,
    titol: "Dièresi - Classificació",
    instruccio: "Poseu les dièresis que calguin a les paraules següents i classifiqueu les que portin dièresi.",
    tipus: "classificacio",
    nivell: "C1",
    categoria: "dieresi",
    novetat: true,
    contingut: {
      paraules: [
        "paisatge", "paisos", "cofoisme", "suicidar", "obliquitat", "agrair",
        "Marius", "frequencia", "agraeixin", "simultaneitat", "coissor", "feia",
        "obeint", "semiindiferencia", "conduire", "coincidir"
      ],
      categories: [
        "Perquè soni la u",
        "Per indicar que no formen diftong"
      ]
    }
  },
  {
    id: 336,
    titol: "Dièresi en paraules",
    instruccio: "Escriviu la dièresi en els mots que calgui.",
    tipus: "llista",
    nivell: "C1",
    categoria: "dieresi",
    novetat: true,
    contingut: {
      paraules: [
        "raim", "aigua", "altruista", "reunio", "bilingue", "traidor",
        "idoneitat", "contraindicacio", "heroi", "unguent", "proisme", "altruista"
      ]
    }
  },
  {
    id: 348,
    titol: "Dièresi en fragment literari",
    instruccio: "Poseu les dièresis que calguin en el fragment que teniu a continuació.",
    tipus: "text",
    nivell: "C1",
    categoria: "dieresi",
    novetat: true,
    contingut: {
      text: "He conegut el Pasteur aquell. En sap un niu. M'ho ha ensenyat. És capaç de distingir els ous malalts dels sans. No els saps guarir, és cert. Però pot aillar els sans. I diu que probablement un trenta per cent dels que produim ho són."
    },
    referencia: "Alessandro Baricco, Seda"
  }
];

// Funció per obtenir un exercici per ID
export const getExerciciById = (id: number): ExerciciAccentuacio | undefined => {
  return exercicisAccentuacioNivellC.find(ex => ex.id === id);
};

// Funció per obtenir exercicis per tipus
export const getExercicisByTipus = (tipus: ExerciciAccentuacio['tipus']): ExerciciAccentuacio[] => {
  return exercicisAccentuacioNivellC.filter(ex => ex.tipus === tipus);
};

// Funció per obtenir tots els exercicis de dièresi
export const getExercicisDieresi = (): ExerciciAccentuacio[] => {
  return exercicisAccentuacioNivellC.filter(ex =>
    ex.id === 334 || ex.id === 336 || ex.id === 348 ||
    ex.instruccio.toLowerCase().includes('dièresi') ||
    ex.instruccio.toLowerCase().includes('dieresi')
  );
};

// Funció per obtenir exercicis de textos llargs
export const getExercicisTextos = (): ExerciciAccentuacio[] => {
  return exercicisAccentuacioNivellC.filter(ex => ex.tipus === 'text');
};

// Funció per obtenir exercicis nous (novetat)
export const getExercicisNovetats = (): ExerciciAccentuacio[] => {
  return exercicisAccentuacioNivellC.filter(ex => ex.novetat === true);
};

// Funció per obtenir exercicis per nivell
export const getExercicisByNivell = (nivell: ExerciciAccentuacio['nivell']): ExerciciAccentuacio[] => {
  return exercicisAccentuacioNivellC.filter(ex => ex.nivell === nivell);
};

// Funció per obtenir exercicis per categoria
export const getExercicisByCategoria = (categoria: ExerciciAccentuacio['categoria']): ExerciciAccentuacio[] => {
  return exercicisAccentuacioNivellC.filter(ex => ex.categoria === categoria);
};

// Resum estadístic dels exercicis
export const getExercicisStats = () => {
  return {
    total: exercicisAccentuacioNivellC.length,
    novetats: exercicisAccentuacioNivellC.filter(ex => ex.novetat).length,
    perNivell: {
      C1: exercicisAccentuacioNivellC.filter(ex => ex.nivell === 'C1').length,
      C2: exercicisAccentuacioNivellC.filter(ex => ex.nivell === 'C2').length,
    },
    perCategoria: {
      accentuacio: exercicisAccentuacioNivellC.filter(ex => ex.categoria === 'accentuacio').length,
      dieresi: exercicisAccentuacioNivellC.filter(ex => ex.categoria === 'dieresi').length,
      diacritic: exercicisAccentuacioNivellC.filter(ex => ex.categoria === 'diacritic').length,
      mixte: exercicisAccentuacioNivellC.filter(ex => ex.categoria === 'mixte').length,
    },
    perTipus: {
      llista: exercicisAccentuacioNivellC.filter(ex => ex.tipus === 'llista').length,
      text: exercicisAccentuacioNivellC.filter(ex => ex.tipus === 'text').length,
      test: exercicisAccentuacioNivellC.filter(ex => ex.tipus === 'test').length,
      classificacio: exercicisAccentuacioNivellC.filter(ex => ex.tipus === 'classificacio').length,
      frases: exercicisAccentuacioNivellC.filter(ex => ex.tipus === 'frases').length,
    }
  };
};

export default exercicisAccentuacioNivellC;
