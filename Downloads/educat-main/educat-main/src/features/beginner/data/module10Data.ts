import { BeginnerExercise } from "./module1Data";

export const MODULE_10_EXERCISES: BeginnerExercise[] = [
  {
    id: "m10-r1",
    title: "Reto 1: Les Tres Conjugacions",
    instruction: "En català hi ha 3 models de verbs. Connecta cada verb amb el seu grup.",
    type: "match",
    data: [],
    pairs: [
      { left: "Cantar (-ar)", right: "1a Conjugació" },
      { left: "Perdre (-re)", right: "2a Conjugació" },
      { left: "Dormir (-ir)", right: "3a Conjugació" },
      { left: "Beure (-re)", right: "2a Conjugació" }
    ],
    explanation: "Tots els verbs pertanyen a un d'aquests 3 grups segons com acaben en infinitiu."
  },
  {
    id: "m10-r2",
    title: "Reto 2: Arrel i Desinència",
    instruction: "A la paraula 'CANT-ÀVEM', quina part ens dona el significat real de l'acció?",
    type: "binary",
    data: ["L'arrel (CANT-)", "La desinència (-ÀVEM)"],
    correctAnswer: "L'arrel (CANT-)",
    explanation: "L'arrel sempre ens diu DE QUÈ parlem (cantar). La desinència ens diu QUI i QUAN (nosaltres, en el passat)."
  },
  {
    id: "m10-r3",
    title: "Reto 3: Identificador de Persona",
    instruction: "Qui fa l'acció? Emparella el pronom amb la seva posició.",
    type: "match",
    data: [],
    pairs: [
      { left: "Jo", right: "1a Pers. Singular" },
      { left: "Tu", right: "2a Pers. Singular" },
      { left: "Nosaltres", right: "1a Pers. Plural" },
      { left: "Ells / Elles", right: "3a Pers. Plural" }
    ],
    explanation: "Això és el que anomenem les 'persones' del verb. Ens ajuden a saber qui executa l'acció."
  },
  {
    id: "m10-r4",
    title: "Reto 4: El Passat Perifràstic",
    instruction: "Com es diu 'Ayer comí' en català correcte?",
    type: "select",
    data: ["Ahir menjí", "Ahir vaig menjar", "Ahir menjava"],
    correctAnswer: "Ahir vaig menjar",
    explanation: "Aquest temps es diu Passat Perifràstic (Verb ANAR + Infinitiu) i és el més utilitzat en català per parlar del passat."
  },
  {
    id: "m10-r5",
    title: "Reto 5: Formes No Personals",
    instruction: "Aquestes formes no tenen persona. Connecta-les amb el seu nom.",
    type: "match",
    data: [],
    pairs: [
      { left: "Cantar", right: "Infinitiu" },
      { left: "Cantant", right: "Gerundi" },
      { left: "Cantat", right: "Participi" },
      { left: "Sentit", right: "Participi" }
    ],
    explanation: "L'infinitiu és el nom del verb. El gerundi (-nt) indica una acció en curs. El participi (-t) una acció acabada."
  },
  {
    id: "m10-r6",
    title: "Reto 6: Mode Imperatiu",
    instruction: "Quin mode fem servir per donar ordres o instruccions directes?",
    type: "select",
    data: ["Indicatiu", "Subjuntiu", "Imperatiu"],
    correctAnswer: "Imperatiu",
    explanation: "L'Imperatiu serveix per manar: 'Calla!', 'Vine!', 'Estudia!'. Només existeix en present."
  },
  {
    id: "m10-r7",
    title: "Reto 7: Timestamps (Temps Verbals)",
    instruction: "Quan passa l'acció? Connecta el verb amb el seu temps.",
    type: "match",
    data: [],
    pairs: [
      { left: "Jo canto", right: "Present" },
      { left: "Jo cantava", right: "Passat Imperfet" },
      { left: "Jo cantaré", right: "Futur" },
      { left: "Jo cantaria", right: "Condicional" }
    ],
    explanation: "El verb canvia la seva desinència per situar-nos en el temps com si fos un rellotge."
  },
  {
    id: "m10-r8",
    title: "Reto 8: Verbs Irregulars",
    instruction: "El verb 'ANAR', quan el conjugues (Jo vaig, tu vas...), és regular o irregular?",
    type: "binary",
    data: ["És Regular", "És Irregular"],
    correctAnswer: "És Irregular",
    explanation: "És molt irregular perquè la seva arrel 'AN-' es transforma completament en 'VA-' en algunes persones."
  },
  {
    id: "m10-r9",
    title: "Reto 9: El Bug de 'Haver-hi'",
    instruction: "Alerta! Error freqüent. Com s'escriu correctament?",
    type: "select",
    data: ["Havien molts nens", "Hi havia molts nens", "Hi havien molts nens"],
    correctAnswer: "Hi havia molts nens",
    explanation: "El verb 'Haver-hi' per indicar existència és impersonal: sempre va en singular (Hi havia / Hi haurà), encara que parlem de moltes coses."
  },
  {
    id: "m10-r10",
    title: "Reto 10: Estat del Sistema",
    instruction: "Per indicar la teva professió, què fas servir?",
    type: "binary",
    data: ["Soc informàtic (Ser)", "Estic informàtic (Estar)"],
    correctAnswer: "Soc informàtic (Ser)",
    explanation: "En català, fem servir 'SER' per essències, característiques fixes o professions. 'ESTAR' és per ubicacions o estats temporals."
  }
];
