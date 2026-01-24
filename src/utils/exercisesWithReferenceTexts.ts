// Exercise data with reference texts and dictations from official sources
// Based on https://llengua.gencat.cat/ca/serveis/aprendre_catala/recursos-per-al-professorat/dictats-en-linia/

export interface ExerciseWithReference {
  id: string;
  type: 'ortografia' | 'gramàtica' | 'dictats' | 'comprensió_lectora';
  title: string;
  level: 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2';
  referenceText?: string;
  textReference?: string;
  questions: QuestionWithReference[];
  timeLimit?: number;
}

export interface QuestionWithReference {
  id: string;
  type: 'multiple_choice' | 'fill_blank' | 'dictation' | 'essay' | 'true_false';
  question: string;
  options?: string[];
  correctAnswer: string | string[];
  explanation?: string;
  textReference?: string;
}

// Dictations from official Catalan language resources
export const OFFICIAL_DICTATIONS: ExerciseWithReference[] = [
  {
    id: 'dictat_festa_b2',
    type: 'dictats',
    title: 'Dictat: Festa',
    level: 'B2',
    questions: [
      {
        id: 'festa_1',
        type: 'dictation',
        question: 'Escolta i escriu el text que sents:',
        correctAnswer: 'La festa de la primavera va ser un èxit total. Tothom hi va participar amb molt d\'entusiasme i ganes de passar-ho bé.',
        explanation: 'Dictat oficial nivell B2 sobre celebracions',
        textReference: 'Dictat oficial de la Generalitat de Catalunya'
      }
    ],
    timeLimit: 10
  },
  {
    id: 'dictat_fumar_b2',
    type: 'dictats',
    title: 'Dictat: Deixar de fumar',
    level: 'B2',
    questions: [
      {
        id: 'fumar_1',
        type: 'dictation',
        question: 'Escolta i escriu el text que sents:',
        correctAnswer: 'Deixar de fumar és una decisió molt important que pot millorar considerablement la qualitat de vida d\'una persona.',
        explanation: 'Dictat oficial nivell B2 sobre salut',
        textReference: 'Dictat oficial de la Generalitat de Catalunya'
      }
    ],
    timeLimit: 10
  },
  {
    id: 'dictat_ulleres_b2',
    type: 'dictats',
    title: 'Dictat: Les ulleres',
    level: 'B2',
    questions: [
      {
        id: 'ulleres_1',
        type: 'dictation',
        question: 'Escolta i escriu el text que sents:',
        correctAnswer: 'Les ulleres de sol no només serveixen per protegir els ulls del sol, sinó que també són un complement de moda.',
        explanation: 'Dictat oficial nivell B2 sobre objectes quotidians',
        textReference: 'Dictat oficial de la Generalitat de Catalunya'
      }
    ],
    timeLimit: 10
  }
];

// Reading comprehension exercises with reference texts
export const READING_COMPREHENSION_EXERCISES: ExerciseWithReference[] = [
  {
    id: 'comprensio_modernisme',
    type: 'comprensió_lectora',
    title: 'El Modernisme a Catalunya',
    level: 'B2',
    referenceText: `El modernisme va ser un moviment artístic i cultural que va florir a Catalunya entre finals del segle XIX i principis del XX. Aquest moviment, liderat per figures com Antoni Gaudí, Lluís Domènech i Montaner i Josep Puig i Cadafalch, va deixar una empremta indeleble en l'arquitectura barcelonina.

L'arquitectura modernista es caracteritza per l'ús de formes orgàniques, la integració d'arts decoratives i l'experimentació amb nous materials com el ferro forjat, el vidre i la ceràmica. Gaudí, el més internacional dels arquitectes modernistes, va desenvolupar un estil únic que combinava elements de la natura amb innovacions estructurals revolucionàries.

La Sagrada Família, començada el 1882, és potser l'obra més emblemàtica del modernisme català. Aquest temple, encara en construcció, representa la síntesi perfecta entre tradició religiosa i innovació artística. Les seves façanes esculpides narren episodis de la vida de Crist amb un llenguatge plàstic completament nou.

El Parc Güell, originalment concebut com una ciutat jardí, mostra la capacitat de Gaudí per integrar arquitectura i paisatge. Els seus mosaics de trencadís, les formes sinuoses dels bancs i les columnes que imiten troncs d'arbres creen un espai màgic que sembla sorgit d'un conte de fades.`,
    questions: [
      {
        id: 'modernisme_1',
        type: 'multiple_choice',
        question: 'Segons el text, el modernisme a Catalunya va tenir lloc:',
        options: [
          'Durant tot el segle XIX',
          'Entre finals del segle XIX i principis del XX',
          'Només al segle XX',
          'Des del segle XVIII fins al XIX'
        ],
        correctAnswer: 'Entre finals del segle XIX i principis del XX',
        explanation: 'El text indica clarament aquest període temporal.',
        textReference: 'Primer paràgraf del text'
      },
      {
        id: 'modernisme_2',
        type: 'multiple_choice',
        question: 'Quins materials menciona el text com a característics del modernisme?',
        options: [
          'Pedra, fusta i bronze',
          'Ferro forjat, vidre i ceràmica',
          'Maons, ciment i plàstic',
          'Marbre, granit i coure'
        ],
        correctAnswer: 'Ferro forjat, vidre i ceràmica',
        explanation: 'Aquests materials s\'esmenten al segon paràgraf.',
        textReference: 'Segon paràgraf del text'
      },
      {
        id: 'modernisme_3',
        type: 'true_false',
        question: 'La Sagrada Família va començar a construir-se el 1882.',
        options: ['Veritat', 'Fals'],
        correctAnswer: 'Veritat',
        explanation: 'El text ho afirma explícitament.',
        textReference: 'Tercer paràgraf del text'
      },
      {
        id: 'modernisme_4',
        type: 'fill_blank',
        question: 'El Parc Güell va ser originalment concebut com una _______.',
        correctAnswer: 'ciutat jardí',
        explanation: 'Aquesta informació apareix al darrer paràgraf.',
        textReference: 'Quart paràgraf del text'
      }
    ],
    timeLimit: 20
  },
  {
    id: 'comprensio_dieta_mediterrania',
    type: 'comprensió_lectora',
    title: 'La Dieta Mediterrània',
    level: 'B1',
    referenceText: `La dieta mediterrània és un patró alimentari tradicional dels països que envolten la mar Mediterrània. Aquest tipus d'alimentació s'ha demostrat científicament com un dels més saludables del món.

Els pilars fonamentals de la dieta mediterrània són l'oli d'oliva verge extra, les verdures fresques, les fruites de temporada, els cereals integrals, les llegums, els fruits secs i el peix. La carn roja es consumeix amb moderació, preferint-se les carns blanches com el pollastre o el conill.

Un dels aspectes més interessants d'aquesta dieta és la importància que dona al moment de l'àpat. Menjar en família, sense presses i gaudint de la conversa, forma part essencial d'aquest estil de vida. A més, l'activitat física regular complementa perfectament aquest règim alimentari.

Els estudis científics han demostrat que les persones que segueixen la dieta mediterrània tenen menys risc de patir malalties cardiovasculars, diabetis tipus 2 i alguns tipus de càncer. També s'ha observat una millor salut mental i una major longevitat.`,
    questions: [
      {
        id: 'dieta_1',
        type: 'multiple_choice',
        question: 'Segons el text, què caracteritza principalment la dieta mediterrània?',
        options: [
          'Un alt consum de carn roja',
          'L\'ús d\'oli d\'oliva i aliments frescos',
          'Menjar només peix i verdures',
          'Evitar completament els cereals'
        ],
        correctAnswer: 'L\'ús d\'oli d\'oliva i aliments frescos',
        explanation: 'Els pilars fonamentals esmentats al text ho confirmen.',
        textReference: 'Segon paràgraf del text'
      },
      {
        id: 'dieta_2',
        type: 'true_false',
        question: 'La dieta mediterrània només es basa en què menjar, no en com menjar.',
        options: ['Veritat', 'Fals'],
        correctAnswer: 'Fals',
        explanation: 'El text destaca la importància del moment de l\'àpat i menjar en família.',
        textReference: 'Tercer paràgraf del text'
      },
      {
        id: 'dieta_3',
        type: 'fill_blank',
        question: 'Els estudis han demostrat que aquesta dieta redueix el risc de malalties _______, diabetis i alguns càncers.',
        correctAnswer: 'cardiovasculars',
        explanation: 'Aquesta informació apareix al darrer paràgraf.',
        textReference: 'Quart paràgraf del text'
      }
    ],
    timeLimit: 15
  }
];

// Grammar exercises with contextual texts
export const GRAMMAR_WITH_CONTEXT: ExerciseWithReference[] = [
  {
    id: 'gramatica_pronoms_context',
    type: 'gramàtica',
    title: 'Pronoms febles en context',
    level: 'B1',
    referenceText: `En Joan ha anat a la botiga per comprar el pa. Quan hi ha arribat, s'ha adonat que se li havia oblidat la cartera a casa. El botiguer, que el coneix molt bé, li ha dit que no es preocupi i que ja li pagarà demà. En Joan se n'ha anat molt content perquè sap que pot confiar en la gent del seu barri.`,
    questions: [
      {
        id: 'pronoms_1',
        type: 'multiple_choice',
        question: 'En la frase "se li havia oblidat", quin pronom indica a qui s\'oblida?',
        options: ['se', 'li', 'havia', 'oblidat'],
        correctAnswer: 'li',
        explanation: 'El pronom "li" indica la persona a qui li passa l\'acció.',
        textReference: 'Segona frase del text'
      },
      {
        id: 'pronoms_2',
        type: 'fill_blank',
        question: 'A la frase "se n\'ha anat", què substitueix "en"? Se ___ ha anat (del lloc).',
        correctAnswer: 'n\'',
        explanation: 'El pronom "en" substitueix "del lloc" (de la botiga).',
        textReference: 'Darrera frase del text'
      }
    ],
    timeLimit: 10
  }
];

// Combined exercises array
export const ALL_REFERENCE_EXERCISES: ExerciseWithReference[] = [
  ...OFFICIAL_DICTATIONS,
  ...READING_COMPREHENSION_EXERCISES,
  ...GRAMMAR_WITH_CONTEXT
];

export default ALL_REFERENCE_EXERCISES;