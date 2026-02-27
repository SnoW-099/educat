import { BeginnerExercise } from "./module1Data";

export const MODULE_11_EXERCISES: BeginnerExercise[] = [
  {
    id: "m11-r1",
    title: "Reto 1: La Clau de Cerca (Noms)",
    instruction: "Quina paraula has d'escriure al cercador per saber què vol dir 'GOSSOS'?",
    type: "binary",
    data: ["Gossos", "Gos"],
    correctAnswer: "Gos",
    explanation: "Els noms sempre s'han de buscar en SINGULAR. Mai trobaràs un plural com a entrada principal."
  },
  {
    id: "m11-r2",
    title: "Reto 2: Punter de Gènere (Adjectius)",
    instruction: "Com busques l'adjectiu 'ALTÍSSIMES' al diccionari?",
    type: "select",
    data: ["Alta", "Altíssima", "Alt"],
    correctAnswer: "Alt",
    explanation: "Els adjectius es busquen sempre en la seva forma MASCULINA i SINGULAR (Alt, Feliç, Ràpid)."
  },
  {
    id: "m11-r3",
    title: "Reto 3: L'Arrel de l'Acció (Verbs)",
    instruction: "Quina és la 'Query' (cerca) correcta pel verb de la frase: 'Ahir cantàvem molt'?",
    type: "select",
    data: ["Cantàvem", "Cantar", "Cantant"],
    correctAnswer: "Cantar",
    explanation: "Els verbs només apareixen en INFINITIU (-ar, -er, -re, -ir). No busquis mai verbs conjugats!"
  },
  {
    id: "m11-r4",
    title: "Reto 4: Etiquetes de Sistema 1",
    instruction: "El diccionari fa servir etiquetes curtes. Descodifica-les!",
    type: "match",
    data: [],
    pairs: [
      { left: "m.", right: "Masculí" },
      { left: "f.", right: "Femení" },
      { left: "pl.", right: "Plural" },
      { left: "sing.", right: "Singular" }
    ],
    explanation: "Aquestes abreviatures et diuen el gènere i el nombre de la paraula que estàs consultant."
  },
  {
    id: "m11-r5",
    title: "Reto 5: Etiquetes de Codi 2",
    instruction: "Connecta l'abreviatura amb la seva categoria gramatical.",
    type: "match",
    data: [],
    pairs: [
      { left: "adj.", right: "Adjectiu" },
      { left: "v.", right: "Verb" },
      { left: "n.", right: "Nom / Substantiu" },
      { left: "adv.", right: "Adverbi" }
    ],
    explanation: "Aquesta etiqueta, just al costat de la paraula, et diu 'què és' (la seva funció a la frase)."
  },
  {
    id: "m11-r6",
    title: "Reto 6: L'Entrada o Lema",
    instruction: "Com es diu la paraula que surt en negreta i encapçala la definició al diccionari?",
    type: "binary",
    data: ["Entrada (o Lema)", "Accepció"],
    correctAnswer: "Entrada (o Lema)",
    explanation: "L'Entrada (o Lema) és la paraula base. Tot el que ve després és la informació associada."
  },
  {
    id: "m11-r7",
    title: "Reto 7: Múltiples Resultats",
    instruction: "Busques 'Banc' i veus números (1, 2, 3...). Què signifiquen?",
    type: "binary",
    data: ["Són les diferents Accepcions", "És la quantitat de lletres"],
    correctAnswer: "Són les diferents Accepcions",
    explanation: "Una mateixa paraula pot tenir diversos significats. Cadascun d'ells és una 'accepció' i va numerada."
  },
  {
    id: "m11-r8",
    title: "Reto 8: Navegació per Paraules Guia",
    instruction: "Per a què serveixen les dues paraules al capdamunt d'una pàgina de diccionari físic?",
    type: "select",
    data: ["Són les paraules més importants", "Indiquen la primera i l'última paraula de la pàgina"],
    correctAnswer: "Indiquen la primera i l'última paraula de la pàgina",
    explanation: "Les Paraules Guia t'ajuden a saber ràpidament si la paraula que busques estarà en aquella pàgina segons l'ordre alfabètic."
  },
  {
    id: "m11-r9",
    title: "Reto 9: Cerca d'Expressions",
    instruction: "Vols buscar la frase feta 'Prendre el pèl'. On la busques?",
    type: "binary",
    data: ["A l'entrada 'Pèl' (el substantiu)", "A l'entrada 'Prendre' (el verb)"],
    correctAnswer: "A l'entrada 'Pèl' (el substantiu)",
    explanation: "Normalment, les expressions i frases fetes s'agrupen dins de l'entrada del nom principal que les forma."
  },
  {
    id: "m11-r10",
    title: "Reto 10: Debugging de Cerca",
    instruction: "Quina d'aquestes paraules trobaries EXACTAMENT així com a entrada al diccionari?",
    type: "select",
    data: ["Intel·ligents", "Dormien", "Taules", "Gat"],
    correctAnswer: "Gat",
    explanation: "Gat està en masculí singular. La resta s'haurien de buscar com: Intel·ligent, Dormir, i Taula."
  }
];
