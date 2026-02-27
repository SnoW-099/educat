export interface Exercise {
  id: string;
  type: 'multiple_choice' | 'fill_blank' | 'true_false' | 'dictation' | 'text_correction' | 'matching';
  question: string;
  options?: string[];
  correctAnswer: string;
  explanation: string;
  difficulty: 1 | 2 | 3 | 4;
  referenceText?: string;
  textReference?: string;
  incorrectText?: string; // For text correction exercises
}

export interface GrammarSection {
  id: string;
  title: string;
  description: string;
  category: 'teoria' | 'ortografia' | 'fonetica' | 'noms' | 'verbs' | 'adjectius' | 'articles' | 'pronoms' | 'preposicions' | 'adverbis' | 'derivacio' | 'frases_fetes' | 'confusions';
  exercises: Exercise[];
}

export const CATALAN_GRAMMAR_SECTIONS: GrammarSection[] = [
  // TEORIA
  {
    id: 'teoria_vocals',
    title: 'Teoria: Les Vocals',
    description: 'Comprensió del sistema vocàlic català',
    category: 'teoria',
    exercises: [
      {
        id: 'teoria_v1',
        type: 'multiple_choice',
        question: 'Quantes vocals té el sistema vocàlic del català?',
        options: ['5 vocals', '7 vocals tòniques i 3 àtones', '8 vocals', '10 vocals'],
        correctAnswer: '7 vocals tòniques i 3 àtones',
        explanation: 'El català té 7 vocals tòniques [i, e, ɛ, a, ɔ, o, u] i 3 àtones [i, ə, u]',
        difficulty: 3
      },
      {
        id: 'teoria_v2',
        type: 'multiple_choice',
        question: 'Què és la vocal neutra en català?',
        options: ['La "a"', 'La "e" àtona [ə]', 'La "i"', 'La "o"'],
        correctAnswer: 'La "e" àtona [ə]',
        explanation: 'La vocal neutra és el so [ə] que apareix en síl·labes àtones, escrit com "a" o "e"',
        difficulty: 3
      }
    ]
  },
  {
    id: 'teoria_accentuacio',
    title: 'Teoria: Accentuació',
    description: 'Regles fonamentals de l\'accentuació',
    category: 'teoria',
    exercises: [
      {
        id: 'teoria_a1',
        type: 'multiple_choice',
        question: 'Les paraules esdrúixoles en català...',
        options: ['Mai porten accent', 'Sempre porten accent', 'Porten accent segons la vocal', 'Només en plural'],
        correctAnswer: 'Sempre porten accent',
        explanation: 'Totes les paraules esdrúixoles (accent en antepenúltima síl·laba) porten accent gràfic',
        difficulty: 2
      }
    ]
  },
  // ORTOGRAFIA
  {
    id: 'accentuacio',
    title: 'Accentuació',
    description: 'Regles d\'accentuació catalana',
    category: 'ortografia',
    exercises: [
      {
        id: 'acc_1',
        type: 'multiple_choice',
        question: 'Quina paraula està ben accentuada?',
        options: ['medic', 'mèdic', 'médic', 'medíc'],
        correctAnswer: 'mèdic',
        explanation: 'Les paraules esdrúixoles sempre porten accent',
        difficulty: 3
      },
      {
        id: 'acc_2',
        type: 'fill_blank',
        question: 'Completa: El meu germ_____ estudia medicina',
        correctAnswer: 'à',
        explanation: 'La tercera persona del singular de estar porta accent: està',
        difficulty: 3
      }
    ]
  },
  {
    id: 'accent_diacritic',
    title: 'Accent Diacrític',
    description: 'Accents per distingir paraules homòfones',
    category: 'ortografia',
    exercises: [
      {
        id: 'dia_1',
        type: 'multiple_choice',
        question: 'Quina forma és correcta?',
        options: ['mes germà', 'més germà', 'mès germà', 'mês germà'],
        correctAnswer: 'més germà',
        explanation: 'L\'adverbi "més" porta accent per distingir-se de "mes" (mesos)',
        difficulty: 2
      }
    ]
  },
  {
    id: 'diftongs',
    title: 'Els Diftongs',
    description: 'Combinacions de vocals en una mateixa síl·laba',
    category: 'ortografia',
    exercises: [
      {
        id: 'dif_1',
        type: 'multiple_choice',
        question: 'Quina paraula conté un diftong?',
        options: ['poeta', 'teatre', 'quatre', 'idea'],
        correctAnswer: 'quatre',
        explanation: 'En "quatre" les vocals "ua" formen un diftong',
        difficulty: 2
      }
    ]
  },
  {
    id: 'dieresi',
    title: 'La Dièresi',
    description: 'Signe que indica separació de vocals',
    category: 'ortografia',
    exercises: [
      {
        id: 'die_1',
        type: 'multiple_choice',
        question: 'Quina paraula necessita dièresi?',
        options: ['pingui', 'pingüi', 'pingui', 'pinguí'],
        correctAnswer: 'pingüi',
        explanation: 'Cal dièresi per pronunciar la "u" després de "g" davant "i"',
        difficulty: 3
      }
    ]
  },
  {
    id: 'guionet',
    title: 'El Guionet',
    description: 'Ús del guionet en català',
    category: 'ortografia',
    exercises: [
      {
        id: 'gui_1',
        type: 'multiple_choice',
        question: 'Com s\'escriu correctament?',
        options: ['vint-i-un', 'vint i un', 'vintiu', 'vint-i-u'],
        correctAnswer: 'vint-i-un',
        explanation: 'Els nombres compostos s\'escriuen amb guionets',
        difficulty: 2
      }
    ]
  },

  // FONÈTICA
  {
    id: 'vocal_neutra',
    title: 'La Vocal Neutra',
    description: 'Pronunciació de la vocal neutra en català',
    category: 'fonetica',
    exercises: [
      {
        id: 'neu_1',
        type: 'multiple_choice',
        question: 'Quina vocal es pronuncia com vocal neutra?',
        options: ['La "a" de "casa"', 'La "e" de "pare"', 'La "i" de "llibre"', 'La "o" de "porta"'],
        correctAnswer: 'La "e" de "pare"',
        explanation: 'La "e" àtona es pronuncia com vocal neutra [ə]',
        difficulty: 2
      }
    ]
  },
  {
    id: 'vocals_ou',
    title: 'Les Vocals O/U',
    description: 'Distinció entre o i u àtones',
    category: 'fonetica',
    exercises: [
      {
        id: 'ou_1',
        type: 'multiple_choice',
        question: 'Com s\'escriu correctament?',
        options: ['cutxara', 'cuchara', 'cullera', 'colera'],
        correctAnswer: 'cullera',
        explanation: 'S\'escriu "cullera" amb "u"',
        difficulty: 2
      }
    ]
  },
  {
    id: 'grafies_bv',
    title: 'Les Grafies B/V',
    description: 'Distinció entre b i v',
    category: 'fonetica',
    exercises: [
      {
        id: 'bv_1',
        type: 'multiple_choice',
        question: 'Quina grafia és correcta?',
        options: ['bebre', 'vebre', 'beure', 'veure'],
        correctAnswer: 'beure',
        explanation: 'El verb és "beure" amb "b"',
        difficulty: 2
      }
    ]
  },

  // NOMS
  {
    id: 'masculi_femeni',
    title: 'Masculí - Femení',
    description: 'Formació del femení dels noms',
    category: 'noms',
    exercises: [
      {
        id: 'mf_1',
        type: 'fill_blank',
        question: 'El femení de "gat" és ______',
        correctAnswer: 'gata',
        explanation: 'El femení de "gat" és "gata"',
        difficulty: 1
      }
    ]
  },
  {
    id: 'singular_plural',
    title: 'Singular - Plural',
    description: 'Formació del plural dels noms',
    category: 'noms',
    exercises: [
      {
        id: 'sp_1',
        type: 'fill_blank',
        question: 'El plural de "casa" és ______',
        correctAnswer: 'cases',
        explanation: 'El plural de "casa" és "cases"',
        difficulty: 1
      }
    ]
  },

  // VERBS
  {
    id: 'verbs_regulars',
    title: 'Verbs',
    description: 'Conjugació verbal catalana',
    category: 'verbs',
    exercises: [
      {
        id: 'vreg_1',
        type: 'fill_blank',
        question: 'Jo ______ (cantar, present)',
        correctAnswer: 'canto',
        explanation: 'La primera persona del present de "cantar" és "canto"',
        difficulty: 1
      }
    ]
  },
  {
    id: 'verbs_irregulars',
    title: 'Verbs Irregulars',
    description: 'Verbs amb conjugació irregular',
    category: 'verbs',
    exercises: [
      {
        id: 'virr_1',
        type: 'multiple_choice',
        question: 'Primera persona present de "ser":',
        options: ['so', 'soc', 'som', 'su'],
        correctAnswer: 'soc',
        explanation: 'La primera persona del present de "ser" és "soc"',
        difficulty: 2
      }
    ]
  },
  {
    id: 'gerundi_participi',
    title: 'Gerundi i Participi',
    description: 'Formes no personals del verb',
    category: 'verbs',
    exercises: [
      {
        id: 'gp_1',
        type: 'fill_blank',
        question: 'El gerundi de "menjar" és ______',
        correctAnswer: 'menjant',
        explanation: 'El gerundi de "menjar" és "menjant"',
        difficulty: 2
      }
    ]
  },

  // ARTICLES
  {
    id: 'article_definit',
    title: 'L\'Article Definit',
    description: 'Ús de l\'article definit',
    category: 'articles',
    exercises: [
      {
        id: 'def_1',
        type: 'multiple_choice',
        question: 'Quin article va amb "casa"?',
        options: ['el', 'la', 'els', 'les'],
        correctAnswer: 'la',
        explanation: '"Casa" és femení singular, per tant "la casa"',
        difficulty: 1
      }
    ]
  },

  // PRONOMS
  {
    id: 'pronoms_febles',
    title: 'Pronoms Febles',
    description: 'Ús dels pronoms febles',
    category: 'pronoms',
    exercises: [
      {
        id: 'pf_1',
        type: 'multiple_choice',
        question: 'Quin pronom feble correspon a "a mi"?',
        options: ['me', 'em', 'mi', 'mo'],
        correctAnswer: 'em',
        explanation: 'El pronom feble de "a mi" és "em"',
        difficulty: 2
      }
    ]
  },

  // FRASES FETES
  {
    id: 'frases_fetes_121',
    title: 'Frases Fetes',
    description: 'Aparella aquestes frases amb el seu significat',
    category: 'frases_fetes',
    exercises: [
      {
        id: 'ff_1',
        type: 'multiple_choice',
        question: 'Què significa "Anar lluny d\'osques"?',
        options: ['Ser molt intel·ligent', 'Anar molt lluny', 'Ser molt astut i precavingut', 'Estar molt ocupat'],
        correctAnswer: 'Ser molt astut i precavingut',
        explanation: '"Anar lluny d\'osques" significa ser molt astut i precavingut per evitar problemes',
        difficulty: 3
      },
      {
        id: 'ff_2',
        type: 'multiple_choice',
        question: 'Què significa "Ficar la banya"?',
        options: ['Intervenir en assumptes aliens', 'Fer mal a algú', 'Estar molt enfadat', 'Ser molt tossut'],
        correctAnswer: 'Intervenir en assumptes aliens',
        explanation: '"Ficar la banya" significa intervenir en assumptes que no ens concerneixen',
        difficulty: 3
      },
      {
        id: 'ff_3',
        type: 'multiple_choice',
        question: 'Què significa "Ser foc d\'encenalls"?',
        options: ['Estar molt calent', 'Ser molt impulsiu i fer-se enfadar ràpidament', 'Tenir molta energia', 'Ser molt lluminós'],
        correctAnswer: 'Ser molt impulsiu i fer-se enfadar ràpidament',
        explanation: '"Ser foc d\'encenalls" significa ser impulsiu i enfadar-se amb facilitat',
        difficulty: 3
      },
      {
        id: 'ff_4',
        type: 'multiple_choice',
        question: 'Què significa "No tenir de què fer estelles"?',
        options: ['No tenir fusta', 'Ser molt pobre', 'No tenir res a perdre', 'Estar molt ocupat'],
        correctAnswer: 'Ser molt pobre',
        explanation: '"No tenir de què fer estelles" significa ser molt pobre, no tenir res',
        difficulty: 3
      },
      {
        id: 'ff_5',
        type: 'multiple_choice',
        question: 'Què significa "Tirar-s\'ho a l\'esquena"?',
        options: ['Fer exercici', 'Oblidar-se dels problemes', 'Carregar algo pesant', 'Estar relaxat'],
        correctAnswer: 'Oblidar-se dels problemes',
        explanation: '"Tirar-s\'ho a l\'esquena" significa oblidar-se dels problemes o preocupacions',
        difficulty: 3
      },
      {
        id: 'ff_6',
        type: 'multiple_choice',
        question: 'Què significa "Ja la ballem"?',
        options: ['Anem a ballar', 'Ja hem començat els problemes', 'Estem contents', 'Hem acabat la feina'],
        correctAnswer: 'Ja hem començat els problemes',
        explanation: '"Ja la ballem" significa que ja hem començat els problemes o dificultats',
        difficulty: 3
      },
      {
        id: 'ff_7',
        type: 'multiple_choice',
        question: 'Què significa "Mirar prim"?',
        options: ['Mirar algú prim', 'Ser molt observador i detallista', 'Tenir mala vista', 'Mirar amb enuig'],
        correctAnswer: 'Ser molt observador i detallista',
        explanation: '"Mirar prim" significa ser molt observador i fixa\'t en els detalls',
        difficulty: 3
      },
      {
        id: 'ff_8',
        type: 'multiple_choice',
        question: 'Què significa "Venir de l\'hort"?',
        options: ['Venir del camp', 'Ser molt innocent o ingenu', 'Estar molt cansat', 'Portar verdures'],
        correctAnswer: 'Ser molt innocent o ingenu',
        explanation: '"Venir de l\'hort" significa ser molt innocent, ingenu o poc espabilat',
        difficulty: 3
      }
    ]
  },

  // CONFUSIONS
  {
    id: 'confusions_comunes',
    title: 'Confusions',
    description: 'Errors comuns en català',
    category: 'confusions',
    exercises: [
      {
        id: 'conf_1',
        type: 'multiple_choice',
        question: 'Quina forma és correcta?',
        options: ['a veure', 'haver', 'a ver', 'aveure'],
        correctAnswer: 'a veure',
        explanation: 'Per expressar intenció s\'usa "a veure"',
        difficulty: 2
      },
      {
        id: 'conf_2',
        type: 'text_correction',
        question: 'Corregeix el text següent:',
        incorrectText: 'El cotxe s\'ha sortit de la pista',
        correctAnswer: 'El cotxe ha sortit de la pista',
        explanation: 'S\'usa "sortir" sense el pronom reflexiu "se" quan significa "sortir de"',
        difficulty: 3
      },
      {
        id: 'conf_3',
        type: 'multiple_choice',
        question: 'Com es diu correctament?',
        options: ['promig de gols', 'mitjana de gols', 'media de gols', 'promedio de gols'],
        correctAnswer: 'mitjana de gols',
        explanation: 'En català s\'usa "mitjana", no "promig"',
        difficulty: 2
      },
      {
        id: 'conf_4',
        type: 'text_correction',
        question: 'Corregeix aquesta frase:',
        incorrectText: 'Li han disparat al lladre',
        correctAnswer: 'Han disparat al lladre',
        explanation: 'Amb el verb "disparar" no s\'usa el pronom feble "li"',
        difficulty: 3
      },
      {
        id: 'conf_5',
        type: 'multiple_choice',
        question: 'Quina forma és correcta?',
        options: ['transplantament', 'trasplantament', 'traNsplantament', 'transplatament'],
        correctAnswer: 'transplantament',
        explanation: 'La forma correcta és "transplantament" sense "n"',
        difficulty: 2
      }
    ]
  },

  // ORTOGRAFIA AVANÇADA
  {
    id: 'apostrofes',
    title: 'Apostrofació',
    description: 'Regles d\'apostrofació del català',
    category: 'ortografia',
    exercises: [
      {
        id: 'apo_1',
        type: 'multiple_choice',
        question: 'Quina forma és correcta?',
        options: ['la aigua', 'l\'aigua', 'lagua', 'la\'gua'],
        correctAnswer: 'l\'aigua',
        explanation: 'L\'article "la" s\'apostrofa davant vocal: l\'aigua',
        difficulty: 2
      },
      {
        id: 'apo_2',
        type: 'fill_blank',
        question: 'Completa: ______ home (l\'article)',
        correctAnswer: 'l\'',
        explanation: 'L\'article "el" s\'apostrofa davant vocal: l\'home',
        difficulty: 1
      },
      {
        id: 'apo_3',
        type: 'multiple_choice',
        question: 'Com s\'escriu correctament?',
        options: ['de altra manera', 'd\'altra manera', 'daltra manera', 'de\'ltra manera'],
        correctAnswer: 'd\'altra manera',
        explanation: 'La preposició "de" s\'apostrofa davant vocal: d\'altra',
        difficulty: 2
      }
    ]
  },

  // MÉS VERBS
  {
    id: 'temps_verbals',
    title: 'Temps Verbals',
    description: 'Diferents temps verbals catalans',
    category: 'verbs',
    exercises: [
      {
        id: 'tv_1',
        type: 'fill_blank',
        question: 'Jo ______ (anar, passat simple)',
        correctAnswer: 'vaig',
        explanation: 'El passat simple de "anar" en primera persona és "vaig"',
        difficulty: 2
      },
      {
        id: 'tv_2',
        type: 'multiple_choice',
        question: 'Quin és el futur de "veure" en tercera persona?',
        options: ['veurà', 'veurà', 'veura', 'vedrà'],
        correctAnswer: 'veurà',
        explanation: 'El futur de "veure" és "veurà"',
        difficulty: 3
      },
      {
        id: 'tv_3',
        type: 'fill_blank',
        question: 'Ells ______ (estar, imperfet)',
        correctAnswer: 'estaven',
        explanation: 'L\'imperfet de "estar" en tercera persona plural és "estaven"',
        difficulty: 2
      }
    ]
  },

  // ADJECTIUS
  {
    id: 'adjectius_concordanca',
    title: 'Adjectius',
    description: 'Concordança dels adjectius',
    category: 'adjectius',
    exercises: [
      {
        id: 'adj_1',
        type: 'fill_blank',
        question: 'Les cases ______ (bonic)',
        correctAnswer: 'boniques',
        explanation: 'L\'adjectiu ha de concordar en gènere i nombre: boniques',
        difficulty: 1
      },
      {
        id: 'adj_2',
        type: 'multiple_choice',
        question: 'Quina concordança és correcta?',
        options: ['Els cotxes blau', 'Els cotxes blaus', 'Els cotxes blaves', 'Els cotxes blavs'],
        correctAnswer: 'Els cotxes blaus',
        explanation: 'L\'adjectiu "blau" fa el plural "blaus"',
        difficulty: 2
      }
    ]
  },

  // PREPOSICIONS
  {
    id: 'preposicions_us',
    title: 'Preposicions',
    description: 'Ús correcte de les preposicions',
    category: 'preposicions',
    exercises: [
      {
        id: 'prep_1',
        type: 'multiple_choice',
        question: 'Quina preposició és correcta?',
        options: ['Vaig a casa', 'Vaig en casa', 'Vaig per casa', 'Vaig de casa'],
        correctAnswer: 'Vaig a casa',
        explanation: 'Per indicar direcció s\'usa la preposició "a"',
        difficulty: 2
      },
      {
        id: 'prep_2',
        type: 'fill_blank',
        question: 'Estic ______ Barcelona (preposició de lloc)',
        correctAnswer: 'a',
        explanation: 'Amb noms de ciutat s\'usa la preposició "a"',
        difficulty: 1
      }
    ]
  },

  // ADVERBIS
  {
    id: 'adverbis_us',
    title: 'Adverbis',
    description: 'Tipus i ús dels adverbis',
    category: 'adverbis',
    exercises: [
      {
        id: 'adv_1',
        type: 'multiple_choice',
        question: 'Quin adverbi indica temps?',
        options: ['aquí', 'avui', 'molt', 'bé'],
        correctAnswer: 'avui',
        explanation: '"Avui" és un adverbi de temps',
        difficulty: 1
      },
      {
        id: 'adv_2',
        type: 'fill_blank',
        question: 'Corre molt ______ (adverbi de manera)',
        correctAnswer: 'ràpidament',
        explanation: '"Ràpidament" és un adverbi de manera',
        difficulty: 2
      }
    ]
  }
];

export const getCategoryExercises = (category: string) => {
  return CATALAN_GRAMMAR_SECTIONS.filter(section => section.category === category);
};

export const getAllExercises = () => {
  return CATALAN_GRAMMAR_SECTIONS.reduce((acc, section) => {
    return [...acc, ...section.exercises];
  }, [] as Exercise[]);
};