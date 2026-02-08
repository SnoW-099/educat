import { BeginnerExercise } from "./module1Data";

export const MODULE_7_EXERCISES: BeginnerExercise[] = [
    {
        id: "m7_e1",
        type: "match",
        title: "Repte 1: El Final de Línia (Punt vs Coma)",
        instruction: "Connecta el símbol amb la seva funció en el codi.",
        data: [],
        pairs: [
            { left: ".", right: "Tancar" },
            { left: ",", right: "Llista" },
            { left: ";", right: "Pausa mitjana" },
            { left: ":", right: "Explicar" }
        ],
        explanation: "El punt tanca una idea completa (com un punt i final en codi). La coma separa elements d'una llista (com paràmetres)."
    },
    {
        id: "m7_e2",
        type: "binary",
        title: "Repte 2: Protocol de Preguntes (?)",
        instruction: "Quina és la sintaxi correcta en català per preguntar?",
        data: ["¿Com et dius?", "Com et dius?"],
        correctAnswer: "Com et dius?",
        explanation: "En català (i en anglès) NO fem servir els signes d'obertura (¿ ¡). Només al final!"
    },
    {
        id: "m7_e3",
        type: "select",
        title: "Repte 3: El Vocatiu (La Coma Fantasma)",
        instruction: "Quan crides algú, has de posar una coma. Quina és correcta?",
        data: ["Hola Joan.", "Hola, Joan."],
        correctAnswer: "Hola, Joan.",
        explanation: "És la coma del 'vocatiu'. Sempre que saludes o crides algú pel nom, va entre comes."
    },
    {
        id: "m7_e4",
        type: "match",
        title: "Repte 4: L'Algoritme de l'Apòstrof (L')",
        instruction: "S'apòstrofa o no?",
        data: [],
        pairs: [
            { left: "El + Home", right: "L'home" },
            { left: "La + Aigua", right: "L'aigua" },
            { left: "El + Iogurt", right: "El iogurt" }, // i consonàntica
            { left: "La + Universitat", right: "La universitat" } // u consonàntica
        ],
        explanation: "La regla general és apostrofar davant vocal o H, però hi ha excepcions com la i/u consonàntica (iogurt, iode, universitat)."
    },
    {
        id: "m7_e5",
        type: "select",
        title: "Repte 5: Excepcions de Càrrega (La + I/U)",
        instruction: "Alerta! Excepció del sistema. Com s'escriu?",
        data: ["L'ira", "La ira"],
        correctAnswer: "La ira",
        explanation: "Paraules femenines com 'ira', 'una' o noms de lletres ('la ela') no s'apòstrofen per evitar confusions."
    },
    {
        id: "m7_e6",
        type: "binary",
        title: "Repte 6: Connector Numèric (Guionet)",
        instruction: "Regla D-U-C. Com s'escriu 22?",
        data: ["Vint-i-dos", "Vintidos"],
        correctAnswer: "Vint-i-dos",
        explanation: "Els números es connecten amb guionet entre Desenes i Unitats (vint-i-dos) i Centenes (dos-cents)."
    },
    {
        id: "m7_e7",
        type: "match",
        title: "Repte 7: Fusió de Preposicions (Del/Pel/Al)",
        instruction: "Com es contrauen aquestes partícules?",
        data: [],
        pairs: [
            { left: "De + el", right: "Del" },
            { left: "Per + el", right: "Pel" },
            { left: "A + el", right: "Al" },
            { left: "De + la", right: "De la" } // No es contrau
        ],
        explanation: "Les contraccions només es fan amb l'article masculí (el). Amb el femení (la) es mantenen separades."
    },
    {
        id: "m7_e8",
        type: "select",
        title: "Repte 8: Error de Compilació (La Història)",
        instruction: "Quina d'aquestes formes és correcta davant de H?",
        data: ["L'història", "La història"],
        correctAnswer: "La història",
        explanation: "Història comença per H muda i és femení... PERÒ la norma diu que si l'accent no recau a la primera síl·laba, no s'apòstrofa."
    },
    {
        id: "m7_e9",
        type: "fill_gap",
        title: "Repte 9: Separador de Llistes",
        instruction: "Hem comprat: pomes ___ peres i raïm.",
        data: [",", "."],
        correctAnswer: ",",
        explanation: "Per enumerar elements d'una llista, fem servir la coma."
    },
    {
        id: "m7_e10",
        type: "select",
        title: "Repte 10: Depuració Final (Sintaxi)",
        instruction: "Troba la frase sense 'bugs' (errors).",
        data: ["Quant val aixó?", "Quant val això?", "¿Quant val això?"],
        correctAnswer: "Quant val això?",
        explanation: "Sense signe d'obertura (¿) i amb l'accent correcte (obert ò)."
    }
];
