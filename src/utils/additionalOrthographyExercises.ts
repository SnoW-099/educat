import { OrthographySection } from './catalanOrthographyData';

// Additional orthography exercises following the established patterns
export const ADDITIONAL_ORTHOGRAPHY_SECTIONS: OrthographySection[] = [
  {
    id: 'accents_diacritics',
    title: 'Accents Diacrítics',
    description: 'Domini dels accents diacrítics i de les regles generals d\'accentuació',
    category: 'ortografia',
    exercises: [
      {
        id: 'acc_dia_1',
        type: 'multiple_choice',
        question: 'Quina forma és correcta?',
        options: ['més important', 'mes important', 'más important', 'màs important'],
        correctAnswer: 'més important',
        explanation: 'L\'adverbi "més" sempre porta accent per distingir-se de "mes" (mesos)',
        difficulty: 2
      },
      {
        id: 'acc_dia_2',
        type: 'multiple_choice',
        question: 'Com s\'escriu correctament?',
        options: ['sóc metge', 'soc metge', 'só metge', 'soch metge'],
        correctAnswer: 'soc metge',
        explanation: 'La primera persona del singular del verb ser s\'escriu "soc" sense accent',
        difficulty: 2
      },
      {
        id: 'acc_dia_3',
        type: 'fill_blank',
        question: 'Completeu: Això _____ va molt bé (a nosaltres)',
        correctAnswer: 'ens',
        explanation: 'El pronom feble "ens" no porta accent, a diferència del verb "éns" (som)',
        difficulty: 3
      },
      {
        id: 'acc_dia_4',
        type: 'multiple_choice',
        question: 'Quina forma interrogativa és correcta?',
        options: ['Com estas?', 'Com estàs?', 'Com estás?', 'Com estas?'],
        correctAnswer: 'Com estàs?',
        explanation: 'La segona persona del singular del verb estar porta accent: "estàs"',
        difficulty: 2
      },
      {
        id: 'acc_dia_5',
        type: 'multiple_choice',
        question: 'Com s\'escriu el verb en futur?',
        options: ['vindra', 'vindrà', 'vindra', 'viendra'],
        correctAnswer: 'vindrà',
        explanation: 'Les terceres persones del futur porten accent: vindrà, vindran',
        difficulty: 2
      },
      {
        id: 'acc_dia_6',
        type: 'fill_blank',
        question: 'L\'any que _____ seré majog d\'edat',
        correctAnswer: 've',
        explanation: 'El verb "venir" en present és "ve" sense accent, "vé" és l\'imperatiu',
        difficulty: 3
      },
      {
        id: 'acc_dia_7',
        type: 'multiple_choice',
        question: 'Quina forma del verb "poder" és correcta?',
        options: ['pot fer-ho', 'pót fer-ho', 'pot fer-ho', 'put fer-ho'],
        correctAnswer: 'pot fer-ho',
        explanation: 'La tercera persona del present de "poder" és "pot" sense accent',
        difficulty: 2
      },
      {
        id: 'acc_dia_8',
        type: 'multiple_choice',
        question: 'Com s\'escriu la primera persona del condicional?',
        options: ['faria', 'faría', 'faria', 'fariá'],
        correctAnswer: 'faria',
        explanation: 'La primera persona del condicional no porta accent: faria, faries, faria...',
        difficulty: 3
      }
    ]
  },
  {
    id: 'homophone_words',
    title: 'Paraules Homòfones',
    description: 'Distinció entre paraules que sonen igual però s\'escriuen diferent',
    category: 'ortografia',
    exercises: [
      {
        id: 'homo_1',
        type: 'multiple_choice',
        question: 'Va _____ el seu company de classe (verb anar)',
        options: ['a veure', 'haver', 'a ver', 'aveure'],
        correctAnswer: 'a veure',
        explanation: 'Per indicar la intenció d\'anar a veure algú, s\'escriu "a veure" (a + veure)',
        difficulty: 2
      },
      {
        id: 'homo_2',
        type: 'multiple_choice',
        question: 'No _____ estudiat prou (verb auxiliar)',
        options: ['a veure', 'haver', 'a ver', 'aveure'],
        correctAnswer: 'haver',
        explanation: 'El verb auxiliar per formar temps compostos és "haver": no haver estudiat',
        difficulty: 2
      },
      {
        id: 'homo_3',
        type: 'multiple_choice',
        question: 'Quina preposició és correcta? _____ anar a Barcelona',
        options: ['per a', 'para', 'per', 'pera'],
        correctAnswer: 'per',
        explanation: 'Per indicar destinació s\'usa "per": per anar a Barcelona',
        difficulty: 2
      },
      {
        id: 'homo_4',
        type: 'multiple_choice',
        question: 'Aquest llibre és _____ tu',
        options: ['per a', 'para', 'per', 'pera'],
        correctAnswer: 'per a',
        explanation: 'Per indicar destinatari s\'usa "per a": aquest llibre és per a tu',
        difficulty: 2
      },
      {
        id: 'homo_5',
        type: 'fill_blank',
        question: 'No _____ cap problema (hi ha)',
        correctAnswer: 'hi ha',
        explanation: 'L\'expressió existencial s\'escriu "hi ha" (no "ia")',
        difficulty: 1
      },
      {
        id: 'homo_6',
        type: 'fill_blank',
        question: '_____ alguna cosa que no entenc (Hi ha)',
        correctAnswer: 'Hi ha',
        explanation: 'Al començament de frase, "Hi ha" s\'escriu amb majúscula inicial',
        difficulty: 1
      },
      {
        id: 'homo_7',
        type: 'multiple_choice',
        question: 'Quina forma és correcta per dir "també"?',
        options: ['també', 'tan bé', 'tampoc', 'tambe'],
        correctAnswer: 'també',
        explanation: 'L\'adverbi afirmatiu s\'escriu "també" en una sola paraula',
        difficulty: 1
      },
      {
        id: 'homo_8',
        type: 'multiple_choice',
        question: 'Canta _____ bé que sembla professional',
        options: ['també', 'tan bé', 'tampoc', 'tambe'],
        correctAnswer: 'tan bé',
        explanation: 'Per expressar intensitat s\'escriu "tan bé" (tan + adverbi)',
        difficulty: 2
      }
    ]
  },
  {
    id: 'complex_verbs',
    title: 'Verbs Complexos',
    description: 'Conjugació correcta dels verbs irregulars i formes perifràstiques',
    category: 'morfosintaxi',
    exercises: [
      {
        id: 'verb_comp_1',
        type: 'multiple_choice',
        question: 'Primera persona del present de subjuntiu de "poder":',
        options: ['pugui', 'puga', 'pugue', 'pugi'],
        correctAnswer: 'pugui',
        explanation: 'La primera persona del present de subjuntiu de "poder" és "pugui"',
        difficulty: 3
      },
      {
        id: 'verb_comp_2',
        type: 'multiple_choice',
        question: 'Tercera persona del pretèrit perfet simple de "fer":',
        options: ['feu', 'va fer', 'féu', 'fé'],
        correctAnswer: 'féu',
        explanation: 'La tercera persona del singular del pretèrit perfet simple de "fer" és "féu"',
        difficulty: 4
      },
      {
        id: 'verb_comp_3',
        type: 'fill_blank',
        question: 'Si jo _____ temps, aniria al cinema (condicional de tenir)',
        correctAnswer: 'tingués',
        explanation: 'L\'imperfet de subjuntiu de "tenir" és "tingués, tinguessis, tingués..."',
        difficulty: 4
      },
      {
        id: 'verb_comp_4',
        type: 'multiple_choice',
        question: 'Participi passat de "escriure":',
        options: ['escrit', 'escrigut', 'escrivit', 'escriut'],
        correctAnswer: 'escrit',
        explanation: 'El participi de "escriure" és irregular: "escrit"',
        difficulty: 3
      },
      {
        id: 'verb_comp_5',
        type: 'multiple_choice',
        question: 'Gerundi de "riure":',
        options: ['rient', 'rint', 'rigue', 'riguen'],
        correctAnswer: 'rient',
        explanation: 'El gerundi de "riure" és "rient"',
        difficulty: 3
      },
      {
        id: 'verb_comp_6',
        type: 'fill_blank',
        question: 'Ells _____ molt contents ahir (pretèrit imperfet d\'estar)',
        correctAnswer: 'estaven',
        explanation: 'El pretèrit imperfet de "estar" és "estava, estaves, estava, estàvem, estàveu, estaven"',
        difficulty: 2
      },
      {
        id: 'verb_comp_7',
        type: 'multiple_choice',
        question: 'Futur de "saber" en tercera persona:',
        options: ['sabrà', 'saurà', 'sabra', 'sabera'],
        correctAnswer: 'sabrà',
        explanation: 'El futur de "saber" és "sabré, sabràs, sabrà, sabrem, sabreu, sabran"',
        difficulty: 3
      },
      {
        id: 'verb_comp_8',
        type: 'multiple_choice',
        question: 'Present de subjuntiu de "anar" en primera persona plural:',
        options: ['anem', 'anéssim', 'vagem', 'vadim'],
        correctAnswer: 'anem',
        explanation: 'El present de subjuntiu de "anar" coincideix amb l\'indicatiu: "vagi, vagis, vagi, anem, aneu, vagin"',
        difficulty: 4
      }
    ]
  },
  {
    id: 'advanced_syntax',
    title: 'Sintaxi Avançada',
    description: 'Construccions sintàctiques complexes i ordre dels elements',
    category: 'morfosintaxi',
    exercises: [
      {
        id: 'synt_1',
        type: 'multiple_choice',
        question: 'Ordre correcte dels pronoms febles:',
        options: ['Se\'l va menjar', 'Se\'l va menjar', 'El se va menjar', 'Va menjar-se\'l'],
        correctAnswer: 'Se\'l va menjar',
        explanation: 'L\'ordre és: es + el/la/els/les. "Se\'l va menjar" (se + el)',
        difficulty: 4
      },
      {
        id: 'synt_2',
        type: 'multiple_choice',
        question: 'Construcció correcta amb pronom feble:',
        options: ['Li\'n vaig donar tres', 'Li vaig donar-ne tres', 'Ne li vaig donar tres', 'Vaig donar-li\'n tres'],
        correctAnswer: 'Li\'n vaig donar tres',
        explanation: 'Amb temps compostos, els pronoms van davant: li (datiu) + en (partitiu)',
        difficulty: 4
      },
      {
        id: 'synt_3',
        type: 'fill_blank',
        question: 'Aquest llibre _____ ha regalat la Maria (a mi)',
        correctAnswer: 'm\'el',
        explanation: 'L\'ordre és: em (datiu) + el (acusatiu) = m\'el davant consonant',
        difficulty: 4
      },
      {
        id: 'synt_4',
        type: 'multiple_choice',
        question: 'Concordança correcta del participi:',
        options: ['Les cartes que he escrites', 'Les cartes que he escrit', 'Les cartes que has escrites', 'Les cartes que has escrit'],
        correctAnswer: 'Les cartes que he escrit',
        explanation: 'Amb "haver", el participi no concorda amb el complement directe en català estàndard',
        difficulty: 3
      },
      {
        id: 'synt_5',
        type: 'multiple_choice',
        question: 'Construcció passiva correcta:',
        options: ['Va ser construït per l\'arquitecte', 'Va ésser construït per l\'arquitecte', 'Fou construït per l\'arquitecte', 'Totes són correctes'],
        correctAnswer: 'Totes són correctes',
        explanation: 'Les tres construccions passives són correctes en català',
        difficulty: 3
      },
      {
        id: 'synt_6',
        type: 'fill_blank',
        question: 'No sé _____ pot venir (si ell)',
        correctAnswer: 's\'hi',
        explanation: 'La combinació "si hi" es contracta en "s\'hi" davant vocal',
        difficulty: 4
      },
      {
        id: 'synt_7',
        type: 'multiple_choice',
        question: 'Relatiu correcte: La casa _____ vivim',
        options: ['on', 'que', 'la qual', 'ahon'],
        correctAnswer: 'on',
        explanation: 'Per indicar lloc amb verbs com "viure", s\'usa el relatiu "on"',
        difficulty: 2
      },
      {
        id: 'synt_8',
        type: 'multiple_choice',
        question: 'Concordança amb subjecte col·lectiu: La gent _____ molt contenta',
        options: ['estava', 'estaven', 'eren', 'van estar'],
        correctAnswer: 'estava',
        explanation: 'Els noms col·lectius en singular concorden amb verb en singular',
        difficulty: 3
      }
    ]
  },
  {
    id: 'lexic_advanced',
    title: 'Lèxic Especialitzat',
    description: 'Vocabulari tècnic, cultismes i paraules d\'ús formal',
    category: 'lexic',
    exercises: [
      {
        id: 'lex_adv_1',
        type: 'multiple_choice',
        question: 'Què significa "diàfan"?',
        options: ['Transparent, clar', 'Diamant fals', 'Molt dur', 'Brillant'],
        correctAnswer: 'Transparent, clar',
        explanation: '"Diàfan" significa transparent, que es veu a través, clar',
        difficulty: 4
      },
      {
        id: 'lex_adv_2',
        type: 'multiple_choice',
        question: 'Un "magma" és:',
        options: ['Una malaltia', 'Una màquina', 'Roca fosa a l\'interior de la Terra', 'Un mineral'],
        correctAnswer: 'Roca fosa a l\'interior de la Terra',
        explanation: 'El magma és la roca fosa que es troba a l\'interior de la Terra',
        difficulty: 3
      },
      {
        id: 'lex_adv_3',
        type: 'fill_blank',
        question: 'La _____ d\'aquesta teoria és indiscutible (validesa)',
        correctAnswer: 'validesa',
        explanation: 'La qualitat de vàlid s\'expressa amb "validesa"',
        difficulty: 3
      },
      {
        id: 'lex_adv_4',
        type: 'multiple_choice',
        question: 'Què vol dir "efímer"?',
        options: ['Molt car', 'De poca durada', 'Molt lleuger', 'Invisible'],
        correctAnswer: 'De poca durada',
        explanation: '"Efímer" significa que dura poc temps, que és passatger',
        difficulty: 4
      },
      {
        id: 'lex_adv_5',
        type: 'multiple_choice',
        question: 'Una persona "àvida" és:',
        options: ['Que té molta gana de quelcom', 'Que viu molt temps', 'Que és molt alta', 'Que parla molt'],
        correctAnswer: 'Que té molta gana de quelcom',
        explanation: '"Àvid" significa que té un desig intens o gana de quelcom',
        difficulty: 3
      },
      {
        id: 'lex_adv_6',
        type: 'fill_blank',
        question: 'El seu discurs va ser molt _____ (que persuadeix)',
        correctAnswer: 'persuasiu',
        explanation: '"Persuasiu" significa que té capacitat de convèncer o persuadir',
        difficulty: 3
      },
      {
        id: 'lex_adv_7',
        type: 'multiple_choice',
        question: 'Què significa "ubic"?',
        options: ['Que està a tot arreu', 'Únic', 'Urbà', 'Últim'],
        correctAnswer: 'Que està a tot arreu',
        explanation: '"Ubic" significa omnipresent, que es troba a tot arreu',
        difficulty: 4
      },
      {
        id: 'lex_adv_8',
        type: 'multiple_choice',
        question: 'Una actitud "beligerant" és:',
        options: ['Pacífica', 'Combativa, agressiva', 'Elegant', 'Religiosa'],
        correctAnswer: 'Combativa, agressiva',
        explanation: '"Beligerant" significa que mostra una actitud combativa o agressiva',
        difficulty: 4
      }
    ]
  }
];

// Export function to get all orthography sections including additional ones
export const getAllOrthographySections = () => {
  // This will be imported and combined with the main sections
  return ADDITIONAL_ORTHOGRAPHY_SECTIONS;
};