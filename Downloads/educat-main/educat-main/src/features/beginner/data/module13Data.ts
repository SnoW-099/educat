import { BeginnerExercise } from "./module1Data";

export const MODULE_13_EXERCISES: BeginnerExercise[] = [
  {
    id: "m13-r1",
    title: "Reto 1: Plugins i Extensions",
    instruction: "Si afegim una peça DAVANT de la paraula (com 'Des-fer'), com se'n diu?",
    type: "binary",
    data: ["Prefix (Davant)", "Sufix (Darrere)"],
    correctAnswer: "Prefix (Davant)",
    explanation: "Un PREFIX (Pre-història, Sub-marí) es posa davant. Un SUFIX (Fust-er, Lleny-aire) es posa al darrere."
  },
  {
    id: "m13-r2",
    title: "Reto 2: Fusió de Sistemes (Compostes)",
    instruction: "Uneix aquestes dues paraules per crear un objecte nou.",
    type: "match",
    data: [],
    pairs: [
      { left: "Renta", right: "plats (Rentaplats)" },
      { left: "Espanta", right: "ocells (Espantaocells)" },
      { left: "Para", right: "caigudes (Paracaigudes)" },
      { left: "Trenca", right: "closques (Trencaclosques)" }
    ],
    explanation: "Això són Paraules Compostes. Sovint ajuntem una acció (Verb) amb un objecte (Nom)."
  },
  {
    id: "m13-r3",
    title: "Reto 3: L'Inversor (Prefixos)",
    instruction: "Afegeix el prefix negatiu per crear el contrari de la paraula.",
    type: "match",
    data: [],
    pairs: [
      { left: "Fer", right: "Desfer" },
      { left: "Muntar", right: "Desmuntar" },
      { left: "Creïble", right: "Increïble" },
      { left: "Capaç", right: "Incapaç" }
    ],
    explanation: "Els prefixos IN-, IM- i DES- serveixen per donar la volta al significat d'una paraula (Antònims)."
  },
  {
    id: "m13-r4",
    title: "Reto 4: Generador de Professions",
    instruction: "Quin sufix necessita aquesta paraula per convertir-se en un ofici?",
    type: "match",
    data: [],
    pairs: [
      { left: "Fusta", right: "Fuster" },
      { left: "Carn", right: "Carnisser" },
      { left: "Flor", right: "Florista" },
      { left: "Dent", right: "Dentista" }
    ],
    explanation: "Els sufixos més comuns per crear oficis en català són '-er' / '-era' i '-ista'."
  },
  {
    id: "m13-r5",
    title: "Reto 5: Creador d'Establiments",
    instruction: "On es ven el peix? Aplica el sufix correcte a 'Peix'.",
    type: "select",
    data: ["Peixeria", "Peixador", "Peixateria"],
    correctAnswer: "Peixateria",
    explanation: "El sufix '-eria' crea botigues o llocs: Sabateria, Llibreria, Fusteria, Peixateria."
  },
  {
    id: "m13-r6",
    title: "Reto 6: Desmuntant el Codi",
    instruction: "Quina és l'Arrel (el nucli o paraula base) de 'Submarí'?",
    type: "select",
    data: ["Sub", "Marí", "Mar"],
    correctAnswer: "Mar",
    explanation: "'Sub-' és el prefix (vol dir 'sota') i '-í' és el sufix. L'arrel, la paraula d'on ve tot, és MAR."
  },
  {
    id: "m13-r7",
    title: "Reto 7: Filtre d'Intrusos",
    instruction: "Totes comparteixen l'arrel i formen una Família Lèxica, excepte una. Quina NO ve de 'Terra'?",
    type: "select",
    data: ["Terrat", "Terror", "Terrestre", "Territori"],
    correctAnswer: "Terror",
    explanation: "Això és un fals amic morfològic! 'Terror' comença igual, però ve de la por, no de la terra."
  },
  {
    id: "m13-r8",
    title: "Reto 8: Fusions amb Eines",
    instruction: "Connecta el verb amb el nom per descobrir la paraula composta.",
    type: "match",
    data: [],
    pairs: [
      { left: "Obrir", right: "llaunes (Obrellaunes)" },
      { left: "Tallar", right: "gespa (Tallagespa)" },
      { left: "Llevar", right: "taps (Llevataps)" },
      { left: "Porta", right: "equipatges (Portaequipatges)" }
    ],
    explanation: "Les eines sovint s'anomenen ajuntant exactament el que fan (Verb + Nom plural)."
  },
  {
    id: "m13-r9",
    title: "Reto 9: El Bug del Castellà",
    instruction: "Com es diu el dia que fas anys en català?",
    type: "binary",
    data: ["El compleanys", "L'aniversari"],
    correctAnswer: "L'aniversari",
    explanation: "No creem la composta 'compleanys' (és una interferència del castellà). En català sempre és l'Aniversari."
  },
  {
    id: "m13-r10",
    title: "Reto 10: Indexació Final",
    instruction: "Classifica aquestes paraules segons la seva estructura.",
    type: "match",
    data: [],
    pairs: [
      { left: "Gat", right: "Primitiva (Només arrel)" },
      { left: "Submarí", right: "Derivada amb Prefix" },
      { left: "Fusteria", right: "Derivada amb Sufix" },
      { left: "Rentaplats", right: "Composta (Mot + Mot)" }
    ],
    explanation: "Primitiva (no ve de cap altra), Derivada (té prefix o sufix) i Composta (té dues paraules o més)."
  }
];
