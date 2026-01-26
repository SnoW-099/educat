// Exercicis de Repàs - Morfosintaxi i Lèxic
// Review exercises for Catalan morphosyntax and lexicon

export interface ReviewExercise {
  id: string;
  title: string;
  description: string;
  type: 'morphosyntax' | 'lexicon';
  level: 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2';
  category: string;
  tags: string[];
  difficulty_score: number;
  estimated_duration: number;
  content: ReviewExerciseContent;
  answers: Record<string, string | string[]>;
}

export interface ReviewExerciseContent {
  text?: string;
  questions: ReviewQuestion[];
}

export interface ReviewQuestion {
  id: string;
  type: 'multiple_choice' | 'fill_blank' | 'classification' | 'correction' | 'time_writing' | 'antonym';
  question: string;
  options?: string[];
  correctAnswer: string | string[];
  explanation?: string;
}

export const REVIEW_EXERCISES: ReviewExercise[] = [
  // ===== MORFOSINTAXI EXERCISES =====
  {
    id: 'morfo_repas_10',
    title: 'Exercici de Repàs 10 - El Priorat',
    description: 'Text sobre el Priorat amb espais per completar',
    type: 'morphosyntax',
    level: 'B2',
    category: 'text_completion',
    tags: ['pronoms', 'articles', 'preposicions', 'text'],
    difficulty_score: 7,
    estimated_duration: 25,
    content: {
      text: 'El Priorat és paisatge. Un paisatge complex, que ___(1)___ explica la força ___(2)___ entorn natural singular i la petjada ___(3)___ acció humana al llarg de segles successius de grandesa i d\'abandó. És una fusió entre el territori i la seva gent en una simbiosi sovint no ___(4)___ fàcil, però sempre autèntica. Dinou habitants per quilòmetre quadrat vivim als vint-i-quatre pobles escampats per turons i valls, ___(5)___ d\'una roca o ___(6)___ arrecerats. Les giragonses del paisatge ens acosten i ens allunyen del món de fora i del món de dins. ___(7)___ si és en un sentit com en un altre, ens cal seguir el relleu, que imposa un ritme tranquil, amb sorpreses a cada revolt i mirandes a cada coll. Al Priorat hi ha ___(8)___ la presència silenciosa de serres carregades ___(9)___ història i de llegendes, que fan de límit i contrafort al circ de costers i bancals que ___(10)___ configuren. Muntanyes i reductes inexpugnables. Roques i cingles, terra i cel d\'àguiles. Un cel blau que es torna vermell a la posta. I és un escampall d\'ermites suspeses ___(11)___ cel, de randes de marges de pedra seca, coves, avencs i balmes hospitalàries. És bosc, garriga i pedregar. El Priorat és l\'oliver ___(12)___ la vinya, la figuera a tocar de la caseta de tros, el codonyer ___(13)___ camí. És la ginestera vincladissa de Corpus, i el lledoner per fer forques i gaiates. I l\'aljub o la cisterna ___(14)___ aigua escassa. I la font que refresca i cura de tots els mals, ___(15)___ regala l\'aigua a raig fet.',
      questions: [
        {
          id: 'q1',
          type: 'multiple_choice',
          question: '(1)',
          options: ['ens', 'li', 's\'', 's\'ho'],
          correctAnswer: 's\'',
          explanation: 'S\'explica - verb pronominal'
        },
        {
          id: 'q2',
          type: 'multiple_choice',
          question: '(2)',
          options: ['del', 'de el', 'd\'un', 'de un'],
          correctAnswer: 'del',
          explanation: 'Del = de + el'
        },
        {
          id: 'q3',
          type: 'multiple_choice',
          question: '(3)',
          options: ['de', 'del', 'de l\'', 'de la'],
          correctAnswer: 'de la',
          explanation: 'La petjada de la acció'
        },
        {
          id: 'q4',
          type: 'multiple_choice',
          question: '(4)',
          options: ['gaire', 'gens', 'de', 'massa'],
          correctAnswer: 'gaire',
          explanation: 'No gaire fàcil'
        },
        {
          id: 'q5',
          type: 'multiple_choice',
          question: '(5)',
          options: ['alt', 'd\'alt', 'damunt', 'en'],
          correctAnswer: 'alt',
          explanation: 'Alt d\'una roca'
        },
        {
          id: 'q6',
          type: 'multiple_choice',
          question: '(6)',
          options: ['bé', 'ben', 'gaires', 'gens'],
          correctAnswer: 'ben',
          explanation: 'Ben arrecerats'
        },
        {
          id: 'q7',
          type: 'multiple_choice',
          question: '(7)',
          options: ['Tal', 'Tan', 'Tant', 'Tants'],
          correctAnswer: 'Tant',
          explanation: 'Tant si és...'
        },
        {
          id: 'q8',
          type: 'multiple_choice',
          question: '(8)',
          options: ['sobre tot', 'sobre tots', 'sobretot', 'sobretots'],
          correctAnswer: 'sobretot',
          explanation: 'Sobretot la presència'
        },
        {
          id: 'q9',
          type: 'multiple_choice',
          question: '(9)',
          options: ['d\'', 'de', 'de l\'', 'del'],
          correctAnswer: 'd\'',
          explanation: 'Carregades d\'història'
        },
        {
          id: 'q10',
          type: 'multiple_choice',
          question: '(10)',
          options: ['el', 'en', 'li', 'lo'],
          correctAnswer: 'el',
          explanation: 'Que el configuren'
        },
        {
          id: 'q11',
          type: 'multiple_choice',
          question: '(11)',
          options: ['a', 'al', 'en', 'en el'],
          correctAnswer: 'en el',
          explanation: 'Suspeses en el cel'
        },
        {
          id: 'q12',
          type: 'multiple_choice',
          question: '(12)',
          options: ['almig', 'en el mig', 'en mig', 'a enmig de'],
          correctAnswer: 'en mig de',
          explanation: 'L\'oliver en mig de la vinya'
        },
        {
          id: 'q13',
          type: 'multiple_choice',
          question: '(13)',
          options: ['arran de', 'arrel de', 'rel de', 'en'],
          correctAnswer: 'arran de',
          explanation: 'Arran de camí'
        },
        {
          id: 'q14',
          type: 'multiple_choice',
          question: '(14)',
          options: ['pel', 'per l\'', 'per a l\'', 'per al'],
          correctAnswer: 'per a l\'',
          explanation: 'Per a l\'aigua escassa'
        },
        {
          id: 'q15',
          type: 'multiple_choice',
          question: '(15)',
          options: ['qual', 'quan', 'quant', 'quanta'],
          correctAnswer: 'que',
          explanation: 'Que regala l\'aigua'
        }
      ]
    },
    answers: {
      q1: 's\'',
      q2: 'del',
      q3: 'de la',
      q4: 'gaire',
      q5: 'alt',
      q6: 'ben',
      q7: 'Tant',
      q8: 'sobretot',
      q9: 'd\'',
      q10: 'el',
      q11: 'en el',
      q12: 'en mig de',
      q13: 'arran de',
      q14: 'per a l\'',
      q15: 'que'
    }
  },

  {
    id: 'morfo_repas_11',
    title: 'Exercici de Repàs 11 - Sant Nicolau',
    description: 'Text sobre la llegenda de Sant Nicolau amb espais per completar',
    type: 'morphosyntax',
    level: 'B2',
    category: 'text_completion',
    tags: ['pronoms', 'articles', 'preposicions', 'text'],
    difficulty_score: 7,
    estimated_duration: 25,
    content: {
      text: 'La llegenda ___(1)___ explica moltes històries: miracles i ajuts als desposseïts i, sobretot, als nens. Asseguren que tot resant va curar uns nens que havien estat apunyalats. També que va salvar uns mariners d\'una tempesta. Però, sobretot, va resoldre el difícil cas d\'un pare que no tenia ___(2)___ diners per donar el dot a les seves tres filles i casar ___(3)___. Davant la decisió de vendre ___(4)___ una, el bisbe va passar de nit per casa, va obrir la finestra i va deixar tres bosses d\'or dins les mitges de les noies, que penjaven de la xemeneia per eixugar-se. Tot i que no es té ___(5)___ documentació històrica sobre aquesta figura, sembla que per ordre d\'un decret ___(6)___ emperador Licini contra els cristians va ser empresonat i torturat, però l\'emperador Constantí va alliberar ___(7)___. En totes les disputes eclesials, es guanyava ___(8)___ adversari amb una suavitat extrema. Aconseguia moltes conversions ___(9)___ defensava sempre els dèbils. La seva generositat ___(10)___ va fer llegendari. Nicolau de Mira va morir el 6 de desembre ___(11)___ any 345, una data que aviat es va celebrar: la gent de Mira deixava menjar ___(12)___ sant a la porta de casa. L\'endemà, els nens ___(13)___ trobaven regals i joguines, ___(14)___ costum que es va anar estenent més enllà de la ciutat. Protector dels mariners, es va convertir en patró de Grècia, Turquia i Rússia. La fama del bisbe que ajudava els desvalguts es va estendre per tot el món medieval. De fet, va ser una de les figures populars més estimades i, ___(15)___ segle XIII, el dia de Sant Nicolau l\'hàbit de fer regals als nens es va anar estenent.',
      questions: [
        {
          id: 'q1',
          type: 'multiple_choice',
          question: '(1)',
          options: ['el', 'ho', 'n\'', 'se'],
          correctAnswer: 'ho',
          explanation: 'La llegenda ho explica'
        },
        {
          id: 'q2',
          type: 'multiple_choice',
          question: '(2)',
          options: ['gaire', 'de', 'gens', 'gens de'],
          correctAnswer: 'gens',
          explanation: 'No tenia gens de diners'
        },
        {
          id: 'q3',
          type: 'multiple_choice',
          question: '(3)',
          options: ['-ho', '-les', '-li', '-ne'],
          correctAnswer: '-les',
          explanation: 'Casar-les (les filles)'
        },
        {
          id: 'q4',
          type: 'multiple_choice',
          question: '(4)',
          options: ['-hi', '-ho', '\'n', '\'s'],
          correctAnswer: '\'n',
          explanation: 'Vendre\'n una'
        },
        {
          id: 'q5',
          type: 'multiple_choice',
          question: '(5)',
          options: ['força', 'gaire', 'gens', 'res'],
          correctAnswer: 'gens',
          explanation: 'No es té gens de documentació'
        },
        {
          id: 'q6',
          type: 'multiple_choice',
          question: '(6)',
          options: ['de', 'de el', 'de l\'', 'del'],
          correctAnswer: 'de l\'',
          explanation: 'Decret de l\'emperador'
        },
        {
          id: 'q7',
          type: 'multiple_choice',
          question: '(7)',
          options: ['-el', '-hi', '-lo', '-ne'],
          correctAnswer: '-lo',
          explanation: 'Va alliberar-lo'
        },
        {
          id: 'q8',
          type: 'multiple_choice',
          question: '(8)',
          options: ['a el', 'a l\'', 'al', 'l\''],
          correctAnswer: 'l\'',
          explanation: 'Es guanyava l\'adversari'
        },
        {
          id: 'q9',
          type: 'multiple_choice',
          question: '(9)',
          options: ['doncs', 'per què', 'perquè', 'per tal que'],
          correctAnswer: 'perquè',
          explanation: 'Aconseguia conversions perquè defensava'
        },
        {
          id: 'q10',
          type: 'multiple_choice',
          question: '(10)',
          options: ['el', 'en', 'li', 'lo'],
          correctAnswer: 'el',
          explanation: 'La generositat el va fer llegendari'
        },
        {
          id: 'q11',
          type: 'multiple_choice',
          question: '(11)',
          options: ['d\'', 'de l\'', 'del', 'de el'],
          correctAnswer: 'de l\'',
          explanation: 'De l\'any 345'
        },
        {
          id: 'q12',
          type: 'multiple_choice',
          question: '(12)',
          options: ['pel', 'per', 'per el', 'al'],
          correctAnswer: 'al',
          explanation: 'Menjar al sant'
        },
        {
          id: 'q13',
          type: 'multiple_choice',
          question: '(13)',
          options: ['els', 'hi', 'ho', 'la'],
          correctAnswer: 'hi',
          explanation: 'Els nens hi trobaven'
        },
        {
          id: 'q14',
          type: 'multiple_choice',
          question: '(14)',
          options: ['la', 'tal', 'tant', 'un'],
          correctAnswer: 'un',
          explanation: 'Un costum'
        },
        {
          id: 'q15',
          type: 'multiple_choice',
          question: '(15)',
          options: ['des', 'd\'el', 'des del', 'desde', 'desde el'],
          correctAnswer: 'des del',
          explanation: 'Des del segle XIII'
        }
      ]
    },
    answers: {
      q1: 'ho',
      q2: 'gens',
      q3: '-les',
      q4: '\'n',
      q5: 'gens',
      q6: 'de l\'',
      q7: '-lo',
      q8: 'l\'',
      q9: 'perquè',
      q10: 'el',
      q11: 'de l\'',
      q12: 'al',
      q13: 'hi',
      q14: 'un',
      q15: 'des del'
    }
  },

  {
    id: 'morfo_repas_12',
    title: 'Exercici de Repàs 12 - Ruta per Miravet',
    description: 'Text sobre una ruta turística amb espais per completar',
    type: 'morphosyntax',
    level: 'B2',
    category: 'text_completion',
    tags: ['pronoms', 'articles', 'preposicions', 'text'],
    difficulty_score: 7,
    estimated_duration: 25,
    content: {
      text: 'Des de la carretera C-12 arribarem a Miravet travessant el riu Ebre pel "pas de barca": un transbordador, format per dos llaguts units per una plataforma, aprofita ___(1)___ corrent del riu per travessar ___(2)___. D\'aquesta manera ancestral ens plantarem a Miravet, pintoresca localitat situada a la riba del riu i defensada pel castell templer. Per la T-324 i la N-230 ens dirigirem cap ___(3)___ Pinell de Brai, població que posseeix un dels cellers més interessants de Catalunya. D\'estil modernista i obra ___(4)___ arquitecte Cèsar Martinell, se ___(5)___ coneix també com la "catedral del vi" per la disposició de les columnes ___(6)___ interior de la nau. Però si la part interior és esplèndida, encara ___(7)___ són més les ceràmiques que ___(8)___ decoren la façana. Les carreteres T-330 i la T-334 ens duran fins a Horta de Sant Joan, que conserva un nucli antic ___(9)___ cuidat, en el qual Picasso va passar alguns anys de la seva joventut. A aquest artista se ___(10)___ dedica un museu i al Parc Natural dels Ports, un centre ___(11)___ interpretació. A la zona de l\'església, ___(12)___ troba també un conjunt arquitectònic ___(13)___ interessant, amb el temple gòtic de Sant Joan Baptista i l\'edifici renaixentista de l\'ajuntament. De camí cap a la capital de la comarca, passarem per Bot, a la riba del riu Canaletes. Gandesa, capital de la Terra Alta, té un emotiu museu dedicat a la batalla ___(14)___ Ebre i un celler cooperatiu, actualment en procés de rehabilitació, que és també obra de Martinell. Per acabar la ruta, ja a la N-420, arribarem a Corbera d\'Ebre, localitat ___(15)___ castigada durant la Guerra Civil.',
      questions: [
        {
          id: 'q1',
          type: 'multiple_choice',
          question: '(1)',
          options: ['a la', 'al', 'el', 'la'],
          correctAnswer: 'el',
          explanation: 'Aprofita el corrent'
        },
        {
          id: 'q2',
          type: 'multiple_choice',
          question: '(2)',
          options: ['el', '-hi', '-ho', '-lo'],
          correctAnswer: '-lo',
          explanation: 'Per travessar-lo (el riu)'
        },
        {
          id: 'q3',
          type: 'multiple_choice',
          question: '(3)',
          options: ['a', 'a el', 'a El', 'al'],
          correctAnswer: 'al',
          explanation: 'Cap al Pinell de Brai'
        },
        {
          id: 'q4',
          type: 'multiple_choice',
          question: '(4)',
          options: ['de el', 'de\'l', 'de l\'', 'del'],
          correctAnswer: 'de l\'',
          explanation: 'Obra de l\'arquitecte'
        },
        {
          id: 'q5',
          type: 'multiple_choice',
          question: '(5)',
          options: ['\'l', '-la', 'li', '\'n'],
          correctAnswer: '\'l',
          explanation: 'Se\'l coneix'
        },
        {
          id: 'q6',
          type: 'multiple_choice',
          question: '(6)',
          options: ['a l\'', 'al', 'en el', 'per el'],
          correctAnswer: 'de l\'',
          explanation: 'De l\'interior de la nau'
        },
        {
          id: 'q7',
          type: 'multiple_choice',
          question: '(7)',
          options: ['hi', 'ho', 'el', 'en'],
          correctAnswer: 'ho',
          explanation: 'Encara ho són més'
        },
        {
          id: 'q8',
          type: 'multiple_choice',
          question: '(8)',
          options: ['hi', 'ho', 'el', 'en'],
          correctAnswer: 'la',
          explanation: 'Que la decoren (la façana)'
        },
        {
          id: 'q9',
          type: 'multiple_choice',
          question: '(9)',
          options: ['be', 'bé', 'ben', 'béns'],
          correctAnswer: 'ben',
          explanation: 'Ben cuidat'
        },
        {
          id: 'q10',
          type: 'multiple_choice',
          question: '(10)',
          options: ['\'l', 'li', 'lo', '\'n'],
          correctAnswer: 'li',
          explanation: 'Se li dedica'
        },
        {
          id: 'q11',
          type: 'multiple_choice',
          question: '(11)',
          options: ['d\'', 'de', 'de l\'', 'del'],
          correctAnswer: 'd\'',
          explanation: 'Centre d\'interpretació'
        },
        {
          id: 'q12',
          type: 'multiple_choice',
          question: '(12)',
          options: ['es', 'hi', 'li', 'n\'hi', 's\'hi'],
          correctAnswer: 's\'hi',
          explanation: 'S\'hi troba'
        },
        {
          id: 'q13',
          type: 'multiple_choice',
          question: '(13)',
          options: ['força', 'gaire', 'gens', 'res'],
          correctAnswer: 'força',
          explanation: 'Força interessant'
        },
        {
          id: 'q14',
          type: 'multiple_choice',
          question: '(14)',
          options: ['d\'el', 'de el', 'de l\'', 'del'],
          correctAnswer: 'de l\'',
          explanation: 'Batalla de l\'Ebre'
        },
        {
          id: 'q15',
          type: 'multiple_choice',
          question: '(15)',
          options: ['bastant', 'bastanta', 'gaire', 'prouta'],
          correctAnswer: 'força',
          explanation: 'Força castigada'
        }
      ]
    },
    answers: {
      q1: 'el',
      q2: '-lo',
      q3: 'al',
      q4: 'de l\'',
      q5: '\'l',
      q6: 'de l\'',
      q7: 'ho',
      q8: 'la',
      q9: 'ben',
      q10: 'li',
      q11: 'd\'',
      q12: 's\'hi',
      q13: 'força',
      q14: 'de l\'',
      q15: 'força'
    }
  },

  {
    id: 'morfo_repas_13',
    title: 'Exercici de Repàs 13 - Llei de Jurisdicció Social',
    description: 'Text legal amb espais per completar',
    type: 'morphosyntax',
    level: 'C1',
    category: 'text_completion',
    tags: ['pronoms', 'articles', 'preposicions', 'text legal'],
    difficulty_score: 8,
    estimated_duration: 30,
    content: {
      text: 'Article 90. Admissibilitat dels mitjans de prova. 1. Les parts, prèvia justificació ___(1)___ utilitat i pertinència de les diligències proposades, es poden servir de tants mitjans de prova com estiguin regulats a la Llei per acreditar els fets controvertits o necessitats de prova [...]. Article 91. Interrogatori de les parts. 1. Les preguntes ___(2)___ la prova ___(3)___ interrogatori de part s\'han de proposar verbalment, sense admissió de plecs. 2. Si el cridat ___(4)___ interrogatori no compareix sense causa justa a la primera citació, refusa declarar o persisteix a no respondre [...] es poden considerar reconeguts com a certs en la sentència els fets a què es refereixin les preguntes, sempre que ___(5)___ interrogat hi hagi intervingut personalment i la seva fixació com a certs ___(6)___ resulti perjudicial en tot o en part. 3. L\'interrogatori de les persones jurídiques privades s\'ha de practicar amb qui legalment ___(7)___ representi [...]. Article 92. Interrogatori de testimonis. [...] Quan el nombre de testimonis sigui excessiu i, a criteri ___(8)___ òrgan judicial, les seves manifestacions puguin constituir inútil reiteració del testimoni sobre fets suficientment aclarits, aquell ___(9)___ pot limitar discrecionalment. [...] Article 93. Prova pericial. 1. La pràctica de la prova pericial s\'ha de portar a terme ___(10)___ acte del judici, i els pèrits han de presentar el seu informe i ratificar ___(11)___. [...] Article 94. Prova documental. 1. La prova documental aportada, que ha d\'estar adequadament presentada, ordenada i numerada, s\'ha de traslladar a les parts a l\'acte del judici, ___(12)___ sigui examinada. [...] ___(13)___ es presenten sense causa justificada, es poden estimar provades les al·legacions fetes per la contrària en relació amb la prova acordada. Article 95. Informes d\'experts. [...] 4. En processos derivats d\'accident de treball i malaltia professional, l\'òrgan judicial, si ___(14)___ estima procedent, pot sol·licitar informe ___(15)___ Inspecció de Treball [...]',
      questions: [
        {
          id: 'q1',
          type: 'multiple_choice',
          question: '(1)',
          options: ['a la', 'amb l\'', 'de l\'', 'de la'],
          correctAnswer: 'de la',
          explanation: 'Justificació de la utilitat'
        },
        {
          id: 'q2',
          type: 'multiple_choice',
          question: '(2)',
          options: ['amb', 'com a', 'per', 'per a'],
          correctAnswer: 'per a',
          explanation: 'Preguntes per a la prova'
        },
        {
          id: 'q3',
          type: 'multiple_choice',
          question: '(3)',
          options: ['a', 'd\'', 'de', 'del'],
          correctAnswer: 'd\'',
          explanation: 'Prova d\'interrogatori'
        },
        {
          id: 'q4',
          type: 'multiple_choice',
          question: '(4)',
          options: ['al', 'a l\'', 'en el', 'pel'],
          correctAnswer: 'a l\'',
          explanation: 'Cridat a l\'interrogatori'
        },
        {
          id: 'q5',
          type: 'multiple_choice',
          question: '(5)',
          options: ['a l\'', 'el', 'per a l\'', 'l\''],
          correctAnswer: 'l\'',
          explanation: 'L\'interrogat'
        },
        {
          id: 'q6',
          type: 'multiple_choice',
          question: '(6)',
          options: ['el', 'ho', 'la', 'li'],
          correctAnswer: 'li',
          explanation: 'Li resulti perjudicial'
        },
        {
          id: 'q7',
          type: 'multiple_choice',
          question: '(7)',
          options: ['hi', 'ho', 'les', 'lis'],
          correctAnswer: 'les',
          explanation: 'Qui les representi'
        },
        {
          id: 'q8',
          type: 'multiple_choice',
          question: '(8)',
          options: ['de el', 'de l\'', 'de un', 'del'],
          correctAnswer: 'de l\'',
          explanation: 'Criteri de l\'òrgan judicial'
        },
        {
          id: 'q9',
          type: 'multiple_choice',
          question: '(9)',
          options: ['els', 'en', 'hi', 'li'],
          correctAnswer: 'els',
          explanation: 'Els pot limitar'
        },
        {
          id: 'q10',
          type: 'multiple_choice',
          question: '(10)',
          options: ['a l\'', 'al', 'en el', 'pel'],
          correctAnswer: 'a l\'',
          explanation: 'A l\'acte del judici'
        },
        {
          id: 'q11',
          type: 'multiple_choice',
          question: '(11)',
          options: ['-hi', '-ho', '-li', '-lo'],
          correctAnswer: '-lo',
          explanation: 'Ratificar-lo (l\'informe)'
        },
        {
          id: 'q12',
          type: 'multiple_choice',
          question: '(12)',
          options: ['ja que', 'per a què', 'per què', 'perquè'],
          correctAnswer: 'perquè',
          explanation: 'Perquè sigui examinada'
        },
        {
          id: 'q13',
          type: 'multiple_choice',
          question: '(13)',
          options: ['Doncs sinó', 'Si no', 'Sino', 'Sinó'],
          correctAnswer: 'Si no',
          explanation: 'Si no es presenten'
        },
        {
          id: 'q14',
          type: 'multiple_choice',
          question: '(14)',
          options: ['hi', 'ho', 'li', 'lo'],
          correctAnswer: 'ho',
          explanation: 'Si ho estima procedent'
        },
        {
          id: 'q15',
          type: 'multiple_choice',
          question: '(15)',
          options: ['a l\'', 'de', 'de l\'', 'de la'],
          correctAnswer: 'a la',
          explanation: 'Informe a la Inspecció de Treball'
        }
      ]
    },
    answers: {
      q1: 'de la',
      q2: 'per a',
      q3: 'd\'',
      q4: 'a l\'',
      q5: 'l\'',
      q6: 'li',
      q7: 'les',
      q8: 'de l\'',
      q9: 'els',
      q10: 'a l\'',
      q11: '-lo',
      q12: 'perquè',
      q13: 'Si no',
      q14: 'ho',
      q15: 'a la'
    }
  },

  // ===== LÈXIC EXERCISES =====
  {
    id: 'lexic_repas_1',
    title: 'Parts del Cos - Distribució per Localització',
    description: 'Classifica les parts del cos segons la seva ubicació',
    type: 'lexicon',
    level: 'A2',
    category: 'body_parts',
    tags: ['cos', 'anatomia', 'classificació'],
    difficulty_score: 3,
    estimated_duration: 15,
    content: {
      questions: [
        {
          id: 'q1',
          type: 'classification',
          question: 'Classifica aquestes parts del cos: melic, llengua, barbeta, índex, colze, genoll, pòmul, galta, espatlla, esquena, maluc, polze, pit, gola, bessons, cuixa, front, mugró',
          correctAnswer: 'Cap: llengua, barbeta, pòmul, galta, gola, front; Tronc: melic, espatlla, esquena, pit, bessons, mugró; Extremitats: índex, colze, genoll, maluc, polze, cuixa',
          explanation: 'Distribució anatòmica correcta'
        }
      ]
    },
    answers: {
      q1: 'Cap: llengua, barbeta, pòmul, galta, gola, front; Tronc: melic, espatlla, esquena, pit, bessons, mugró; Extremitats: índex, colze, genoll, maluc, polze, cuixa'
    }
  },

  {
    id: 'lexic_repas_2',
    title: 'Hores - Escriptura amb Lletres',
    description: 'Escriu les hores amb lletres',
    type: 'lexicon',
    level: 'A2',
    category: 'time',
    tags: ['hores', 'temps', 'escriptura'],
    difficulty_score: 4,
    estimated_duration: 20,
    content: {
      questions: [
        {
          id: 'q1',
          type: 'time_writing',
          question: 'Escriu amb lletres: 15.15 h',
          correctAnswer: 'un quart de quatre',
          explanation: 'Les tres i quart també és correcte'
        },
        {
          id: 'q2',
          type: 'time_writing',
          question: 'Escriu amb lletres: 21.20 h',
          correctAnswer: 'dos quarts de deu de la nit',
          explanation: 'Les nou i vint de la nit'
        },
        {
          id: 'q3',
          type: 'time_writing',
          question: 'Escriu amb lletres: 01.05 h',
          correctAnswer: 'la una i cinc de la nit',
          explanation: 'Hora nocturna'
        },
        {
          id: 'q4',
          type: 'time_writing',
          question: 'Escriu amb lletres: 06.45 h',
          correctAnswer: 'tres quarts de set del matí',
          explanation: 'Hora matinal'
        },
        {
          id: 'q5',
          type: 'time_writing',
          question: 'Escriu amb lletres: 18.40 h',
          correctAnswer: 'les set menys vint de la tarda',
          explanation: 'Vint minuts per a les set'
        }
      ]
    },
    answers: {
      q1: 'un quart de quatre',
      q2: 'dos quarts de deu de la nit',
      q3: 'la una i cinc de la nit',
      q4: 'tres quarts de set del matí',
      q5: 'les set menys vint de la tarda'
    }
  },

  {
    id: 'lexic_repas_5',
    title: 'Correcció de Barbarismes',
    description: 'Corregeix els barbarismes en cursiva',
    type: 'lexicon',
    level: 'B1',
    category: 'barbarisms',
    tags: ['barbarismes', 'correcció', 'vocabulari'],
    difficulty_score: 5,
    estimated_duration: 25,
    content: {
      questions: [
        {
          id: 'q1',
          type: 'correction',
          question: 'Corregeix: Agafa el traje de bany, que després anirem a la piscina que hi ha al casc antic del poble.',
          correctAnswer: 'banyador, nucli',
          explanation: 'Traje → banyador; casc → nucli'
        },
        {
          id: 'q2',
          type: 'correction',
          question: 'Corregeix: Has d\'abonar els rosers perquè l\'any vinent tornin a florir.',
          correctAnswer: 'adobs',
          explanation: 'Abonar → adobs (fertilitzar)'
        },
        {
          id: 'q3',
          type: 'correction',
          question: 'Corregeix: Posa el teu nom i els teus apellidos en aquest requadre.',
          correctAnswer: 'cognoms',
          explanation: 'Apellidos → cognoms'
        },
        {
          id: 'q4',
          type: 'correction',
          question: 'Corregeix: Si fas un creuer per aquesta zona veuràs ballenes i delfins.',
          correctAnswer: 'balenes',
          explanation: 'Ballenes → balenes'
        },
        {
          id: 'q5',
          type: 'correction',
          question: 'Corregeix: Aquesta feina provoca un gran cansanci a la gent gran.',
          correctAnswer: 'cansament',
          explanation: 'Cansanci → cansament'
        }
      ]
    },
    answers: {
      q1: 'banyador, nucli',
      q2: 'adobs',
      q3: 'cognoms',
      q4: 'balenes',
      q5: 'cansament'
    }
  },

  {
    id: 'lexic_repas_12',
    title: 'Antònims',
    description: 'Escriu el contrari de les paraules indicades',
    type: 'lexicon',
    level: 'B1',
    category: 'antonyms',
    tags: ['antònims', 'vocabulari', 'oposició'],
    difficulty_score: 5,
    estimated_duration: 20,
    content: {
      questions: [
        {
          id: 'q1',
          type: 'antonym',
          question: 'Contrari de "tard" (Els testimonis sempre arriben molt tard)',
          correctAnswer: 'aviat',
          explanation: 'Tard ↔ aviat'
        },
        {
          id: 'q2',
          type: 'antonym',
          question: 'Contrari de "animem" (Cal que animem l\'equip)',
          correctAnswer: 'desanimem',
          explanation: 'Animar ↔ desanimar'
        },
        {
          id: 'q3',
          type: 'antonym',
          question: 'Contrari de "baix" (Al calaix de baix)',
          correctAnswer: 'alt',
          explanation: 'Baix ↔ alt'
        },
        {
          id: 'q4',
          type: 'antonym',
          question: 'Contrari de "sobre" (Sobre la taula)',
          correctAnswer: 'sota',
          explanation: 'Sobre ↔ sota'
        },
        {
          id: 'q5',
          type: 'antonym',
          question: 'Contrari de "de pressa" (Corren molt de pressa)',
          correctAnswer: 'a poc a poc',
          explanation: 'De pressa ↔ a poc a poc'
        },
        {
          id: 'q6',
          type: 'antonym',
          question: 'Contrari de "lluny" (Molt lluny d\'aquí)',
          correctAnswer: 'a prop',
          explanation: 'Lluny ↔ a prop'
        },
        {
          id: 'q7',
          type: 'antonym',
          question: 'Contrari de "prim" (Està massa prim)',
          correctAnswer: 'gras',
          explanation: 'Prim ↔ gras'
        },
        {
          id: 'q8',
          type: 'antonym',
          question: 'Contrari de "estret" (Pel carrer estret)',
          correctAnswer: 'ample',
          explanation: 'Estret ↔ ample'
        },
        {
          id: 'q9',
          type: 'antonym',
          question: 'Contrari de "dur" (Material més dur)',
          correctAnswer: 'tou',
          explanation: 'Dur ↔ tou'
        },
        {
          id: 'q10',
          type: 'antonym',
          question: 'Contrari de "més" (Té més punts)',
          correctAnswer: 'menys',
          explanation: 'Més ↔ menys'
        }
      ]
    },
    answers: {
      q1: 'aviat',
      q2: 'desanimem',
      q3: 'alt',
      q4: 'sota',
      q5: 'a poc a poc',
      q6: 'a prop',
      q7: 'gras',
      q8: 'ample',
      q9: 'tou',
      q10: 'menys'
    }
  },

  {
    id: 'lexic_repas_13',
    title: 'Antònims - Unir Paraules',
    description: 'Uneix cada mot amb el seu contrari',
    type: 'lexicon',
    level: 'B1',
    category: 'antonyms',
    tags: ['antònims', 'vocabulari', 'parelles'],
    difficulty_score: 5,
    estimated_duration: 15,
    content: {
      questions: [
        {
          id: 'q1',
          type: 'multiple_choice',
          question: 'Antònim d\'apassionat',
          options: ['decidida', 'primmirat', 'mullat', 'indiferent'],
          correctAnswer: 'indiferent',
          explanation: 'Apassionat ↔ indiferent'
        },
        {
          id: 'q2',
          type: 'multiple_choice',
          question: 'Antònim de barroer',
          options: ['decidida', 'primmirat', 'mullat', 'indiferent'],
          correctAnswer: 'primmirat',
          explanation: 'Barroer ↔ primmirat'
        },
        {
          id: 'q3',
          type: 'multiple_choice',
          question: 'Antònim de deixat',
          options: ['decidida', 'primmirat', 'mullat', 'polit'],
          correctAnswer: 'polit',
          explanation: 'Deixat ↔ polit'
        },
        {
          id: 'q4',
          type: 'multiple_choice',
          question: 'Antònim de bleda',
          options: ['decidida', 'primmirat', 'mullat', 'indiferent'],
          correctAnswer: 'decidida',
          explanation: 'Bleda ↔ decidida'
        },
        {
          id: 'q5',
          type: 'multiple_choice',
          question: 'Antònim d\'eixut',
          options: ['decidida', 'primmirat', 'mullat', 'indiferent'],
          correctAnswer: 'mullat',
          explanation: 'Eixut ↔ mullat'
        }
      ]
    },
    answers: {
      q1: 'indiferent',
      q2: 'primmirat', 
      q3: 'polit',
      q4: 'decidida',
      q5: 'mullat'
    }
  },

  {
    id: 'lexic_repas_14',
    title: 'Formes Correctes o Més Precises',
    description: 'Escull la forma correcta o més precisa',
    type: 'lexicon',
    level: 'B1',
    category: 'precision',
    tags: ['formes', 'precisió', 'vocabulari'],
    difficulty_score: 5,
    estimated_duration: 20,
    content: {
      questions: [
        {
          id: 'q1',
          type: 'multiple_choice',
          question: '__________________ el timbre perquè t\'obrin el Jutjat.',
          options: ['Apreta', 'Prem'],
          correctAnswer: 'Prem',
          explanation: 'Prem és més precís en català'
        },
        {
          id: 'q2',
          type: 'multiple_choice',
          question: 'Per avisar tothom cal __________________ un avís a la paret.',
          options: ['enganxar', 'pegar'],
          correctAnswer: 'enganxar',
          explanation: 'Enganxar és la forma correcta en català'
        },
        {
          id: 'q3',
          type: 'multiple_choice',
          question: 'Es va trencar __________________ quan esquiava.',
          options: ['el canell', 'la munyeca'],
          correctAnswer: 'el canell',
          explanation: 'Canell és la forma catalana correcta'
        },
        {
          id: 'q4',
          type: 'multiple_choice',
          question: '__________________ postres d\'aquest restaurant són molt especials.',
          options: ['Els', 'Les'],
          correctAnswer: 'Les',
          explanation: 'Postres és femení en català'
        },
        {
          id: 'q5',
          type: 'multiple_choice',
          question: 'M\'encanten els entrepans __________________.',
          options: ['d\'atun', 'de tonyina'],
          correctAnswer: 'de tonyina',
          explanation: 'Tonyina és la forma catalana'
        },
        {
          id: 'q6',
          type: 'multiple_choice',
          question: 'Si estudiem, __________________ aprovar enguany.',
          options: ['aconseguirem', 'conseguirem'],
          correctAnswer: 'aconseguirem',
          explanation: 'Aconseguir amb a inicial'
        },
        {
          id: 'q7',
          type: 'multiple_choice',
          question: 'Hem d\'anar a la __________________ a comprar les entrades per al concert.',
          options: ['guixeta', 'taquilla'],
          correctAnswer: 'taquilla',
          explanation: 'Taquilla és correcte per a venda d\'entrades'
        },
        {
          id: 'q8',
          type: 'multiple_choice',
          question: 'La carn de porc té massa __________________ per al meu gust.',
          options: ['grassa', 'greix'],
          correctAnswer: 'greix',
          explanation: 'Greix és el substantiu correcte'
        },
        {
          id: 'q9',
          type: 'multiple_choice',
          question: 'Aquell home està massa __________________.',
          options: ['gordo', 'gras'],
          correctAnswer: 'gras',
          explanation: 'Gras és l\'adjectiu català'
        },
        {
          id: 'q10',
          type: 'multiple_choice',
          question: 'Caldria __________________ més davanters a l\'equip.',
          options: ['incloure', 'incluir'],
          correctAnswer: 'incloure',
          explanation: 'Incloure és la forma verbal catalana'
        }
      ]
    },
    answers: {
      q1: 'Prem',
      q2: 'enganxar',
      q3: 'el canell',
      q4: 'Les',
      q5: 'de tonyina',
      q6: 'aconseguirem',
      q7: 'taquilla',
      q8: 'greix',
      q9: 'gras',
      q10: 'incloure'
    }
  },

  {
    id: 'lexic_repas_15',
    title: 'Expressions i Vocabulari Català',
    description: 'Comprensió d\'expressions catalanes i vocabulari específic',
    type: 'lexicon',
    level: 'B2',
    category: 'expressions',
    tags: ['expressions', 'frases fetes', 'vocabulari'],
    difficulty_score: 6,
    estimated_duration: 25,
    content: {
      questions: [
        {
          id: 'q1',
          type: 'multiple_choice',
          question: 'Quan algú fa una becaina...',
          options: ['exerceix un càrrec transitori', 'trenca el son', 'té tendència a rebre molts diners', 'du a terme una bona acció'],
          correctAnswer: 'trenca el son',
          explanation: 'Fer una becaina significa dormitar'
        },
        {
          id: 'q2',
          type: 'multiple_choice',
          question: 'Quan una persona fa salat...',
          options: ['arriba tard', 'té molta set', 'li agrada molt el mar', 'és molt desconfiada'],
          correctAnswer: 'arriba tard',
          explanation: 'Fer salat significa arribar tard'
        },
        {
          id: 'q3',
          type: 'multiple_choice',
          question: 'Un somiatruites és una persona...',
          options: ['que sempre té gana', 'a qui agrada molt cuinar', 'que s\'il·lusiona fàcilment amb coses impossibles', 'que té molta creativitat'],
          correctAnswer: 'que s\'il·lusiona fàcilment amb coses impossibles',
          explanation: 'Somiatruites és una persona visionària'
        },
        {
          id: 'q4',
          type: 'multiple_choice',
          question: 'Com s\'escriu 2.352?',
          options: ['Dos-mil trescents cinquanta-dos', 'Dos mil tres-cents cinquanta-dos', 'Dos-mil trescents-cinquanta-dos', 'Dos-mil-tres-cents cinquanta-dos'],
          correctAnswer: 'Dos mil tres-cents cinquanta-dos',
          explanation: 'Sense guionet entre mil i centenes'
        },
        {
          id: 'q5',
          type: 'multiple_choice',
          question: 'Quina hora és les 7.20 h?',
          options: ['Un quart i cinc de set', 'Falten cinc minuts per a dos quarts de vuit', 'Un quart i cinc de vuit', 'Són dos quarts i mig de set'],
          correctAnswer: 'Un quart i cinc de vuit',
          explanation: 'Sistema del campanar: es fa referència a l\'hora següent'
        },
        {
          id: 'q6',
          type: 'multiple_choice',
          question: 'Només una d\'aquestes frases és correcta:',
          options: ['M\'he baixat del bus i he caigut', 'He baixat del bus i he caigut', 'He baixat del bus i m\'he caigut', 'M\'he baixat del bus i m\'he caigut'],
          correctAnswer: 'He baixat del bus i m\'he caigut',
          explanation: 'Baixar no és pronominal, caure sí'
        },
        {
          id: 'q7',
          type: 'multiple_choice',
          question: 'Què vol dir "tants caps tants barrets"?',
          options: ['Que hi ha gent molt ben vestida', 'Que la gent és molt tradicional', 'Que hi ha un lloc per a cada cosa', 'Que hi ha tantes opinions com persones'],
          correctAnswer: 'Que hi ha tantes opinions com persones',
          explanation: 'Expressió que indica diversitat d\'opinions'
        },
        {
          id: 'q8',
          type: 'multiple_choice',
          question: 'Si algú ens fa la guitza...',
          options: ['ens convida a sortir d\'un local', 'ens importuna, ens molesta', 'ens vol fer fora de la feina', 'ens riu totes les gràcies'],
          correctAnswer: 'ens importuna, ens molesta',
          explanation: 'Fer la guitza significa molestar'
        },
        {
          id: 'q9',
          type: 'multiple_choice',
          question: 'Quan feu dentetes?',
          options: ['Quan feu riure', 'Quan teniu una indigestió', 'Quan provoqueu enveja', 'Quan aneu al dentista'],
          correctAnswer: 'Quan provoqueu enveja',
          explanation: 'Fer dentetes significa provocar enveja'
        },
        {
          id: 'q10',
          type: 'multiple_choice',
          question: 'La gallina...',
          options: ['quiriqueja', 'fa la crida gallinera', 'renilla', 'escataina'],
          correctAnswer: 'escataina',
          explanation: 'Les gallines escatainen'
        }
      ]
    },
    answers: {
      q1: 'trenca el son',
      q2: 'arriba tard',
      q3: 'que s\'il·lusiona fàcilment amb coses impossibles',
      q4: 'Dos mil tres-cents cinquanta-dos',
      q5: 'Un quart i cinc de vuit',
      q6: 'He baixat del bus i m\'he caigut',
      q7: 'Que hi ha tantes opinions com persones',
      q8: 'ens importuna, ens molesta',
      q9: 'Quan provoqueu enveja',
      q10: 'escataina'
    }
  },

  {
    id: 'lexic_repas_16',
    title: 'Substitució de Paraules',
    description: 'Substitueix la paraula en cursiva sense canviar el sentit',
    type: 'lexicon',
    level: 'B1',
    category: 'synonyms',
    tags: ['sinònims', 'substitució', 'vocabulari'],
    difficulty_score: 5,
    estimated_duration: 15,
    content: {
      questions: [
        {
          id: 'q1',
          type: 'multiple_choice',
          question: 'Condueix d\'esma. Substitueix "d\'esma":',
          options: ['maquinalment', 'ràpidament', 'agressivament'],
          correctAnswer: 'maquinalment',
          explanation: 'D\'esma significa automàticament'
        },
        {
          id: 'q2',
          type: 'multiple_choice',
          question: 'Va ser llavors quan ho vaig veure clar. Substitueix "llavors":',
          options: ['llavonses', 'a les hores', 'aleshores'],
          correctAnswer: 'aleshores',
          explanation: 'Aleshores és la forma correcta'
        },
        {
          id: 'q3',
          type: 'multiple_choice',
          question: 'Els seus dubtes no es poden escatir. Substitueix "escatir":',
          options: ['aclarir', 'aigualir', 'esbandir'],
          correctAnswer: 'aclarir',
          explanation: 'Escatir significa aclarir'
        },
        {
          id: 'q4',
          type: 'multiple_choice',
          question: 'L\'avió va davallar bruscament. Substitueix "davallar":',
          options: ['ascendir', 'caure', 'baixar'],
          correctAnswer: 'baixar',
          explanation: 'Davallar significa baixar'
        },
        {
          id: 'q5',
          type: 'multiple_choice',
          question: 'Sempre em fixo en la manera d\'enraonar de la gent. Substitueix "enraonar":',
          options: ['parlar', 'caminar', 'esmolar'],
          correctAnswer: 'parlar',
          explanation: 'Enraonar significa parlar'
        }
      ]
    },
    answers: {
      q1: 'maquinalment',
      q2: 'aleshores',
      q3: 'aclarir',
      q4: 'baixar',
      q5: 'parlar'
    }
  },

  {
    id: 'lexic_repas_17',
    title: 'Correcció de Barbarismes 2',
    description: 'Corregeix els barbarismes en el text sobre Tereseta',
    type: 'lexicon',
    level: 'B1',
    category: 'barbarisms',
    tags: ['barbarismes', 'correcció', 'text'],
    difficulty_score: 5,
    estimated_duration: 20,
    content: {
      questions: [
        {
          id: 'q1',
          type: 'correction',
          question: 'Corregeix: Tereseta, m\'he enterat que es casa el teu tio.',
          correctAnswer: 'oncle',
          explanation: 'Tio → oncle'
        },
        {
          id: 'q2',
          type: 'correction',
          question: 'Corregeix: Li has de dir que canviï làmpares i alfombres.',
          correctAnswer: 'llums, catifes',
          explanation: 'Làmpares → llums; alfombres → catifes'
        },
        {
          id: 'q3',
          type: 'correction',
          question: 'Corregeix: vam demanar berberetxos, però com que no tenien palillos.',
          correctAnswer: 'escopinya, escuradents',
          explanation: 'Berberetxos → escopinya; palillos → escuradents'
        },
        {
          id: 'q4',
          type: 'correction',
          question: 'Corregeix: vam demanar la conta i vam marxar.',
          correctAnswer: 'compte',
          explanation: 'Conta → compte'
        },
        {
          id: 'q5',
          type: 'correction',
          question: 'Corregeix: va pujar a l\'acera i va col·lidir amb una moto que no tenia seguro.',
          correctAnswer: 'vorera, assegurança',
          explanation: 'Acera → vorera; seguro → assegurança'
        }
      ]
    },
    answers: {
      q1: 'oncle',
      q2: 'llums, catifes',
      q3: 'escopinya, escuradents',
      q4: 'compte',
      q5: 'vorera, assegurança'
    }
  },

  {
    id: 'lexic_repas_20',
    title: 'Significat d\'Expressions Catalanes',
    description: 'Identifica el significat correcte de les expressions',
    type: 'lexicon',
    level: 'C1',
    category: 'idioms',
    tags: ['frases fetes', 'expressions', 'significat'],
    difficulty_score: 8,
    estimated_duration: 30,
    content: {
      questions: [
        {
          id: 'q1',
          type: 'multiple_choice',
          question: 'Picar ferro fred significa:',
          options: ['Esforçar-se inútilment', 'Enganyar sistemàticament', 'Interposar-se en una baralla'],
          correctAnswer: 'Esforçar-se inútilment',
          explanation: 'Picar ferro fred = esforç inútil'
        },
        {
          id: 'q2',
          type: 'multiple_choice',
          question: 'Tirar pel dret significa:',
          options: ['Fer una cosa legalment', 'Fer una cosa amb moltes dificultats', 'Fer una cosa directament'],
          correctAnswer: 'Fer una cosa directament',
          explanation: 'Tirar pel dret = anar directament'
        },
        {
          id: 'q3',
          type: 'multiple_choice',
          question: 'Estar dat i beneït significa:',
          options: ['Ser una cosa molt cristiana', 'Quedar resolta una situació', 'Exercir regularment la generositat'],
          correctAnswer: 'Quedar resolta una situació',
          explanation: 'Dat i beneït = resolt definitivament'
        },
        {
          id: 'q4',
          type: 'multiple_choice',
          question: 'Fer la gara-gara a algú significa:',
          options: ['Tenir dificultats per parlar bé', 'Afalagar algú desmesuradament', 'Tenir molta tendència a l\'enveja'],
          correctAnswer: 'Afalagar algú desmesuradament',
          explanation: 'Fer la gara-gara = adular excessivament'
        },
        {
          id: 'q5',
          type: 'multiple_choice',
          question: 'El més calent és a l\'aigüera significa:',
          options: ['Ser una situació molt delicada', 'Donar més arguments del compte', 'Tenir una situació pendent sense resoldre'],
          correctAnswer: 'Tenir una situació pendent sense resoldre',
          explanation: 'El més difícil encara està per fer'
        },
        {
          id: 'q6',
          type: 'multiple_choice',
          question: 'Fer mans i mànigues significa:',
          options: ['Esforçar-se amb tots els mitjans possibles', 'Ajuntar esforços de procedència diversa', 'Tenir facilitat per perdonar els enemics'],
          correctAnswer: 'Esforçar-se amb tots els mitjans possibles',
          explanation: 'Fer mans i mànigues = esforçar-se molt'
        },
        {
          id: 'q7',
          type: 'multiple_choice',
          question: 'Arribar i moldre significa:',
          options: ['Tenir molta determinació', 'Ser una persona molt impetuosa', 'Enllestir una feina ràpidament'],
          correctAnswer: 'Enllestir una feina ràpidament',
          explanation: 'Arribar i moldre = fer algo muy ràpidament'
        },
        {
          id: 'q8',
          type: 'multiple_choice',
          question: 'Saber-la llarga significa:',
          options: ['Ser una persona molt pesada', 'Tenir tendència a alliçonar els altres', 'Ser molt astut'],
          correctAnswer: 'Ser molt astut',
          explanation: 'Saber-la llarga = ser molt astut'
        },
        {
          id: 'q9',
          type: 'multiple_choice',
          question: 'Embolicar la troca significa:',
          options: ['Tenir poca paciència', 'Complicar les coses', 'Ser molt gandul'],
          correctAnswer: 'Complicar les coses',
          explanation: 'Embolicar la troca = complicar innecessàriament'
        },
        {
          id: 'q10',
          type: 'multiple_choice',
          question: 'Haver-n\'hi per llogar-hi cadires significa:',
          options: ['Ho diem quan una cosa és curiosa, increïble o inaudita', 'Ho diem quan fem un negoci desastrós', 'Ho diem quan algú és molt mandrós'],
          correctAnswer: 'Ho diem quan una cosa és curiosa, increïble o inaudita',
          explanation: 'Expressa que algo és molt estrany o increïble'
        }
      ]
    },
    answers: {
      q1: 'Esforçar-se inútilment',
      q2: 'Fer una cosa directament',
      q3: 'Quedar resolta una situació',
      q4: 'Afalagar algú desmesuradament',
      q5: 'Tenir una situació pendent sense resoldre',
      q6: 'Esforçar-se amb tots els mitjans possibles',
      q7: 'Enllestir una feina ràpidament',
      q8: 'Ser molt astut',
      q9: 'Complicar les coses',
      q10: 'Ho diem quan una cosa és curiosa, increïble o inaudita'
    }
  },

  {
    id: 'lexic_repas_25',
    title: 'Vocabulari Específic Català',
    description: 'Comprensió de vocabulari específic i expressions catalanes',
    type: 'lexicon',
    level: 'B2',
    category: 'specific_vocabulary',
    tags: ['vocabulari', 'expressions', 'català específic'],
    difficulty_score: 6,
    estimated_duration: 25,
    content: {
      questions: [
        {
          id: 'q1',
          type: 'multiple_choice',
          question: 'Quan algú us amanyaga...',
          options: ['us observa atentament', 'us fa carícies', 'us fa un elogi', 'us arregla una cosa'],
          correctAnswer: 'us fa carícies',
          explanation: 'Amanyagar significa fer carícies'
        },
        {
          id: 'q2',
          type: 'multiple_choice',
          question: 'Quan un nen creu vol dir que...',
          options: ['obeeix', 'té molta imaginació', 'té molta fe', 'té molta autoestima'],
          correctAnswer: 'obeeix',
          explanation: 'Un nen creu = un nen obedient'
        },
        {
          id: 'q3',
          type: 'multiple_choice',
          question: 'Què vol dir rajar?',
          options: ['Un líquid, sortir d\'un orifici formant raig o doll', 'Parlar malament d\'algú o d\'alguna cosa', 'Tallar amb una arma blanca', 'Espargir líquid sobre una superfície'],
          correctAnswer: 'Parlar malament d\'algú o d\'alguna cosa',
          explanation: 'Rajar significa criticar o parlar malament'
        },
        {
          id: 'q4',
          type: 'multiple_choice',
          question: 'Els arquitectes fan...',
          options: ['planells', 'planos', 'plànols', 'planiols'],
          correctAnswer: 'plànols',
          explanation: 'Plànols és la forma catalana correcta'
        },
        {
          id: 'q5',
          type: 'multiple_choice',
          question: 'Ser el cul d\'en Jaumet vol dir...',
          options: ['brut', 'groller', 'arrogant', 'inquiet'],
          correctAnswer: 'inquiet',
          explanation: 'El cul d\'en Jaumet = persona molt inquieta'
        },
        {
          id: 'q6',
          type: 'multiple_choice',
          question: 'Quan no entenem una cosa tenim...',
          options: ['una dubte', 'un dubte', 'una dubta', 'un dudte'],
          correctAnswer: 'un dubte',
          explanation: 'Dubte és masculí en català'
        },
        {
          id: 'q7',
          type: 'multiple_choice',
          question: 'Un bocí de pa és...',
          options: ['un tros petit de pa', 'la molla', 'el crostó', 'un llonguet'],
          correctAnswer: 'un tros petit de pa',
          explanation: 'Bocí = tros petit'
        },
        {
          id: 'q8',
          type: 'multiple_choice',
          question: 'Quan una persona repapieja...',
          options: ['li agrada molt cantar', 'té afeblides les facultats mentals a causa de l\'edat', 'li agrada provocar els altres', 'té molta gana'],
          correctAnswer: 'té afeblides les facultats mentals a causa de l\'edat',
          explanation: 'Repapiejar = perdre facultats per l\'edat'
        },
        {
          id: 'q9',
          type: 'multiple_choice',
          question: 'Si una persona és un enze...',
          options: ['és molt espavilada', 'té tendència a la depressió', 'és poc desperta, aturada', 'és poc apta per fer activitats físiques'],
          correctAnswer: 'és poc desperta, aturada',
          explanation: 'Enze = persona poc esperta'
        },
        {
          id: 'q10',
          type: 'multiple_choice',
          question: 'El marrà és el mascle de...',
          options: ['l\'ovella', 'la truja', 'l\'euga', 'la cabra'],
          correctAnswer: 'l\'ovella',
          explanation: 'Marrà = mascle de l\'ovella'
        }
      ]
    },
    answers: {
      q1: 'us fa carícies',
      q2: 'obeeix',
      q3: 'Parlar malament d\'algú o d\'alguna cosa',
      q4: 'plànols',
      q5: 'inquiet',
      q6: 'un dubte',
      q7: 'un tros petit de pa',
      q8: 'té afeblides les facultats mentals a causa de l\'edat',
      q9: 'és poc desperta, aturada',
      q10: 'l\'ovella'
    }
  }
];

export default REVIEW_EXERCISES;