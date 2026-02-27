import { BeginnerExercise } from "./module1Data";

export const MODULE_9_EXERCISES: BeginnerExercise[] = [
  {
    id: "m9-r1",
    title: "Reto 1: Mutació Bàsica",
    instruction: "Quina és la regla principal per crear la versió femenina d'un nom masculí?",
    type: "binary",
    data: ["Afegir una -A final", "Afegir una -E final"],
    correctAnswer: "Afegir una -A final",
    explanation: "La regla més bàsica del català: Nen -> Nena, Llop -> Lloba, Fill -> Filla."
  },
  {
    id: "m9-r2",
    title: "Reto 2: El Reemplaçament",
    instruction: "Si la paraula ja acaba en vocal, substitueix-la per fer el femení.",
    type: "match",
    data: [], // Add empty data array specific to BeginnerExercise format
    pairs: [
      { left: "Mestre", right: "Mestra" },
      { left: "Alumne", right: "Alumna" },
      { left: "Gat", right: "Gata" },
      { left: "Sogre", right: "Sogra" }
    ],
    explanation: "Normalment, canviem la 'E' o la 'O' final per una 'A' per fer el femení."
  },
  {
    id: "m9-r3",
    title: "Reto 3: Dades Invariables",
    instruction: "Quina d'aquestes paraules serveix tant per masculí com per femení (és invariable)?",
    type: "select",
    data: ["Guapo", "Alt", "Feliç", "Llest"],
    correctAnswer: "Feliç",
    explanation: "Adjectius com Feliç, Jove, Gran, Intel·ligent o Valenta... ai no, Valent/Valenta sí que canvia! Feliç s'usa igual per noi que per noia."
  },
  {
    id: "m9-r4",
    title: "Reto 4: Mutacions Especials",
    instruction: "Connecta el masculí amb la seva mutació femenina especial.",
    type: "match",
    data: [], // Add empty data array specific to BeginnerExercise format
    pairs: [
      { left: "Actor", right: "Actriu" },
      { left: "Alcalde", right: "Alcaldessa" },
      { left: "Heroi", right: "Heroïna" },
      { left: "Príncep", right: "Princesa" }
    ],
    explanation: "Les terminacions -tor, -òleg, -essa són mutacions especials que s'han d'aprendre de memòria (Psicòleg/Psicòloga)."
  },
  {
    id: "m9-r5",
    title: "Reto 5: Clonació Bàsica (-S / -ES)",
    instruction: "Si la paraula acaba en -A (Ex: Taula), com creem el seu plural?",
    type: "binary",
    data: ["Afegint una -S (Taulas)", "Canviant a -ES (Taules)"],
    correctAnswer: "Canviant a -ES (Taules)",
    explanation: "Aquesta és una regla d'or: la 'A' final singular sempre es transforma en 'ES' al plural (Casa -> Cases)."
  },
  {
    id: "m9-r6",
    title: "Reto 6: Clonació de Sibilants",
    instruction: "Com es fa el plural de la paraula 'GOS'?",
    type: "select",
    data: ["Gosos", "Gosss", "Gossos"],
    correctAnswer: "Gossos",
    explanation: "Les paraules que acaben en S, Ç o X fan el plural en -OS. Aquí doblem la S perquè segueixi sonant forta."
  },
  {
    id: "m9-r7",
    title: "Reto 7: L'Algoritme -OS",
    instruction: "Connecta el singular amb el seu plural correcte.",
    type: "match",
    data: [], // Add empty data array specific to BeginnerExercise format
    pairs: [
      { left: "Peix", right: "Peixos" },
      { left: "Braç", right: "Braços" },
      { left: "Reflex", right: "Reflexos" },
      { left: "Calaix", right: "Calaixos" }
    ],
    explanation: "Tots aquests sons (ix, ç, x) necessiten la terminació -OS per poder pronunciar bé el plural."
  },
  {
    id: "m9-r8",
    title: "Reto 8: Doble Fitxer",
    instruction: "Hi ha paraules que no canvien en plural. Quina és?",
    type: "select",
    data: ["El gos / Els gossos", "El pastís / Els pastissos", "El fons / Els fons"],
    correctAnswer: "El fons / Els fons",
    explanation: "Paraules com 'Fons', 'Temps' o 'Dilluns' s'escriuen exactament igual en singular i en plural."
  },
  {
    id: "m9-r9",
    title: "Reto 9: Clonació de Duresa",
    instruction: "Quina és la forma més recomanada i habitual de fer el plural de 'Bosc' i 'Text'?",
    type: "binary",
    data: ["Boscs / Texts", "Boscos / Textos"],
    correctAnswer: "Boscos / Textos",
    explanation: "Tot i que 'Boscs' existeix, afegir -OS facilita molt la pronunciació, per això 'Boscos', 'Textos' i 'Gustos' són les preferides."
  },
  {
    id: "m9-r10",
    title: "Reto 10: Bug de Clonació",
    instruction: "Alerta! Troba el plural que està MAL escrit.",
    type: "select",
    data: ["Llibres", "Sofàs", "Problemes", "Programas"],
    correctAnswer: "Programas",
    explanation: "Error! 'Programa', 'Problema' i 'Sistema' són masculins que acaben en A. El seu plural canvia a ES: Programes."
  }
];
