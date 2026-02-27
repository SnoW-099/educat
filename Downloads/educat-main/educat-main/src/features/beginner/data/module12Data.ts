import { BeginnerExercise } from "./module1Data";

export const MODULE_12_EXERCISES: BeginnerExercise[] = [
  {
    id: "m12-r1",
    title: "Reto 1: Connexió de Sinònims",
    instruction: "Connecta les paraules que signifiquen exactament el mateix.",
    type: "match",
    data: [],
    pairs: [
      { left: "Feliç", right: "Content" },
      { left: "Ràpid", right: "Veloç" },
      { left: "Bonic", right: "Bell" },
      { left: "Començar", right: "Iniciar" }
    ],
    explanation: "Els sinònims són paraules diferents però que tenen un significat idèntic o molt semblant."
  },
  {
    id: "m12-r2",
    title: "Reto 2: El Bug del Camp Semàntic",
    instruction: "Troba l'intrús en aquest camp semàntic d'EINES.",
    type: "select",
    data: ["Martell", "Poma", "Tornavís", "Clau anglesa"],
    correctAnswer: "Poma",
    explanation: "Un camp semàntic és un grup de paraules que comparteixen un tema. La poma és de la família de les fruites, no de les eines!"
  },
  {
    id: "m12-r3",
    title: "Reto 3: Pols Oposats",
    instruction: "Connecta cada paraula amb el seu contrari (Antònim).",
    type: "match",
    data: [],
    pairs: [
      { left: "Ple", right: "Buit" },
      { left: "Fosc", right: "Clar" },
      { left: "Pujar", right: "Baixar" },
      { left: "Llarg", right: "Curt" }
    ],
    explanation: "Els antònims expressen idees totalment contràries."
  },
  {
    id: "m12-r4",
    title: "Reto 4: Múltiples Dades (Polisèmia)",
    instruction: "La paraula 'Ratolí' (animal i ordinador) és un exemple de...",
    type: "binary",
    data: ["Polisèmia (+ d'1 significat)", "Sinonímia (Mateix significat)"],
    correctAnswer: "Polisèmia (+ d'1 significat)",
    explanation: "Poli (molts) - Sèmia (significats). Són paraules que s'escriuen igual però que serveixen per a diferents coses segons el context."
  },
  {
    id: "m12-r5",
    title: "Reto 5: Reemplaçament en Context",
    instruction: "Canvia la paraula destacada per un sinònim: 'Aquest examen és molt FÀCIL'.",
    type: "select",
    data: ["Complicat", "Senzill", "Llarg"],
    correctAnswer: "Senzill",
    explanation: "Un bon sinònim et permet intercanviar la paraula a la frase sense que canviï el missatge original."
  },
  {
    id: "m12-r6",
    title: "Reto 6: Descodificar la Polisèmia",
    instruction: "La paraula 'Banc' és polisèmica. Connecta cada significat amb el seu lloc.",
    type: "match",
    data: [],
    pairs: [
      { left: "Banc de diners", right: "Economia" },
      { left: "Banc per seure", right: "Parc" },
      { left: "Banc de peixos", right: "Mar" },
      { left: "Banc de sang", right: "Hospital" }
    ],
    explanation: "El context de la frase és l'única cosa que ens permet saber quin significat de 'Banc' estem utilitzant."
  },
  {
    id: "m12-r7",
    title: "Reto 7: Interferència (Homòfones)",
    instruction: "'Vaca' (animal) i 'Baca' (cotxe) sonen igual però s'escriuen diferent. Són...",
    type: "binary",
    data: ["Homòfones", "Antònimes"],
    correctAnswer: "Homòfones",
    explanation: "Homo (igual) - Fones (so). L'oïda no les distingeix, però l'ortografia i el diccionari sí!"
  },
  {
    id: "m12-r8",
    title: "Reto 8: Antònims amb Prefixos",
    instruction: "Quin és l'antònim correcte de 'Possible'?",
    type: "select",
    data: ["Inpossible", "Despossible", "Impossible"],
    correctAnswer: "Impossible",
    explanation: "Recordes l'ortografia? Davant de P i B sempre va M. Per això el prefix negatiu és 'Im-' i no 'In-'."
  },
  {
    id: "m12-r9",
    title: "Reto 9: Indexació de Categories",
    instruction: "Connecta la categoria general (el grup) amb el seu element específic.",
    type: "match",
    data: [],
    pairs: [
      { left: "Vehicle", right: "Cotxe" },
      { left: "Moble", right: "Armari" },
      { left: "Fruita", right: "Pera" },
      { left: "Color", right: "Verd" }
    ],
    explanation: "Això es diu Hiperònims (la categoria gran, com 'Vehicle') i Hipònims (l'element petit, com 'Cotxe')."
  },
  {
    id: "m12-r10",
    title: "Reto 10: Test del Sistema",
    instruction: "Quina d'aquestes parelles són ANTÒNIMS?",
    type: "select",
    data: ["Fred - Calent", "Llest - Intel·ligent", "Full - Fulla"],
    correctAnswer: "Fred - Calent",
    explanation: "Fred i Calent (Antònims). Llest i Intel·ligent (Sinònims). Full i Fulla (Paraules diferents, gènere i mida)."
  }
];
