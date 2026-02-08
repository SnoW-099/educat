import { BeginnerExercise } from "./module1Data";

export const MODULE_2_EXERCISES: BeginnerExercise[] = [
    {
        id: "m2_e1",
        type: "match",
        title: "Repte 1: El Comptador de Polsos (Nivell Bronze)",
        instruction: "Connecta cada paraula amb el seu nombre de síl·labes.",
        data: [],
        pairs: [
            { left: "Blau", right: "1 síl·laba" },
            { left: "Casa", right: "2 síl·labes" },
            { left: "Fi-nes-tra", right: "3 síl·labes" },
            { left: "Cal-cu-la-do-ra", right: "5 síl·labes" }
        ],
        explanation: "Picar de mans ajuda a separar les síl·labes: Blau (1), Ca-sa (2), Fi-nes-tra (3), Cal-cu-la-do-ra (5)."
    },
    {
        id: "m2_e2",
        type: "binary",
        title: "Repte 2: Monosíl·labs vs Bisíl·labs",
        instruction: "Quina paraula és un monosíl·lab (un sol cop de veu)?",
        data: ["Pa", "Taula"],
        correctAnswer: "Pa",
        explanation: "Pa és monosíl·lab. Tau-la és bisíl·lab."
    },
    {
        id: "m2_e3",
        type: "select",
        title: "Repte 3: El Radar de la Tònica (Nivell Plata)",
        instruction: "On està la síl·laba tònica (la forta) de 'Pà-gi-na'?",
        data: ["Pà", "gi", "na"],
        correctAnswer: "Pà",
        explanation: "La síl·laba tònica és la primera: Pà-gi-na (esdrúixola)."
    },
    {
        id: "m2_e4",
        type: "match",
        title: "Repte 4: Classificació per Accent",
        instruction: "Connecta cada paraula amb el seu tipus segons la síl·laba tònica.",
        data: [],
        pairs: [
            { left: "Uni-ver-si-tat", right: "Aguda" },
            { left: "Mú-si-ca", right: "Esdrúixola" },
            { left: "À-ngel", right: "Plana" },
            { left: "Ca-mi-ó", right: "Aguda" }
        ],
        explanation: "Aguda (última), Plana (penúltima), Esdrúixola (antepenúltima)."
    },
    {
        id: "m2_e5",
        type: "multiple_choice",
        title: "Repte 5: On és el cop?",
        instruction: "A 'Ex-cur-si-ó', quina és la síl·laba tònica?",
        data: ["Última", "Penúltima", "Antepenúltima"],
        correctAnswer: "Última",
        explanation: "Ex-cur-si-ó és aguda, la tònica és l'última."
    },
    {
        id: "m2_e6",
        type: "fill_gap",
        title: "Repte 6: Tall de Dígrafs (RR / SS)",
        instruction: "Els dígrafs repetits (Passar) es separen: Pas-___ar.",
        data: ["s", "ss"],
        correctAnswer: "s",
        explanation: "Els dígrafs repetits com S-S o R-R se separen sempre: Pas-sar, Cor-re."
    },
    {
        id: "m2_e7",
        type: "fill_gap",
        title: "Repte 7: Dígrafs Inseparables (NY / LL)",
        instruction: "El dígraf NY no es pot separar: Mun-ta-___a.",
        data: ["ny", "n-y"],
        correctAnswer: "ny",
        explanation: "NY, LL, GU, QU, IG... no se separen mai a final de síl·laba."
    },
    {
        id: "m2_e8",
        type: "select",
        title: "Repte 8: El desafiament de la L·L (Nivell Or)",
        instruction: "Com se separa 'Col·legi'?",
        data: ["Co-l·le-gi", "Col-le-gi", "Coll-e-gi"],
        correctAnswer: "Col-le-gi",
        explanation: "La ela geminada (l·l) se separa sempre: Col-le-gi."
    },
    {
        id: "m2_e9",
        type: "select",
        title: "Repte 9: Combinacions Complexes (TZ / TX)",
        instruction: "Com se separa 'Dotze'?",
        data: ["Do-tze", "Dot-ze", "Dotz-e"],
        correctAnswer: "Dot-ze",
        explanation: "TZ se separa (t-z). Correcte: Dot-ze."
    },
    {
        id: "m2_e10",
        type: "match",
        title: "Repte 10: Separació de Síl·labes",
        instruction: "Connecta la paraula amb la seva separació correcta.",
        data: [],
        pairs: [
            { left: "Màquina", right: "Mà-qui-na" },
            { left: "Quadern", right: "Qua-dern" },
            { left: "Excursió", right: "Ex-cur-si-ó" },
            { left: "Guerra", right: "Guer-ra" }
        ],
        explanation: "Repàs de dígrafs i diftongs."
    }
];
