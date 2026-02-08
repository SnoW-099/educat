import { BeginnerExercise } from "./module1Data";

export const MODULE_3_EXERCISES: BeginnerExercise[] = [
    {
        id: "m3_e1",
        type: "match",
        title: "Repte 1: Classificació d'Accentuació",
        instruction: "Connecta cada paraula amb el seu tipus d'accentuació (Aguda, Plana, Esdrúixola).",
        data: [],
        pairs: [
            { left: "Català", right: "Aguda" },
            { left: "Examen", right: "Plana" },
            { left: "Música", right: "Esdrúixola" },
            { left: "Telèfon", right: "Esdrúixola" }
        ],
        explanation: "Les paraules es classifiquen segons la posició de la síl·laba tònica: Aguda (última), Plana (penúltima), Esdrúixola (antepenúltima)."
    },
    {
        id: "m3_e2",
        type: "fill_gap",
        title: "Repte 2: Accentuació d'Agudes",
        instruction: "Posa l'accent correcte: Arr___s.",
        data: ["ò", "ó"],
        correctAnswer: "ò",
        explanation: "Arròs porta accent obert (ò) i és aguda acabada en 's'."
    },
    {
        id: "m3_e3",
        type: "select",
        title: "Repte 3: Accentuació de Planes",
        instruction: "Quina paraula plana està correctament accentuada?",
        data: ["Exàmens", "Exámens", "Examens"],
        correctAnswer: "Exàmens",
        explanation: "Exàmens porta accent perquè no acaba en les terminacions típiques de les planes àtones (singular examen no en porta, plural sí)."
    },
    {
        id: "m3_e4",
        type: "select",
        title: "Repte 4: Accentuació d'Esdrúixoles",
        instruction: "Totes les esdrúixoles s'accentuen. Tria l'opció correcta.",
        data: ["Màquina", "Maquina", "Maquína"],
        correctAnswer: "Màquina",
        explanation: "Mà-qui-na és esdrúixola i sempre porta accent."
    },
    {
        id: "m3_e5",
        type: "match",
        title: "Repte 5: Tipus d'Accent (Obert/Tancat)",
        instruction: "Connecta la paraula amb l'accent correcte.",
        data: [],
        pairs: [
            { left: "Francès", right: "E oberta (è)" },
            { left: "També", right: "E tancada (é)" },
            { left: "Però", right: "O oberta (ò)" },
            { left: "Cançó", right: "O tancada (ó)" }
        ],
        explanation: "E i O poden ser obertes (`) o tancades (´). Diferenciar-les és clau per la pronúncia."
    },
    {
        id: "m3_e6",
        type: "match",
        title: "Repte 6: L'Accent Diacrític",
        instruction: "Connecta la paraula amb el seu significat.",
        data: [],
        pairs: [
            { left: "DÉU", right: "Divinitat" },
            { left: "DEU", right: "El número 10" },
            { left: "MÀ", right: "Part del cos" },
            { left: "MA", right: "Possessiu (ma casa)" }
        ],
        explanation: "L'accent diacrític serveix per diferenciar paraules que s'escriuen igual però tenen significats diferents."
    },
    {
        id: "m3_e7",
        type: "fill_gap",
        title: "Repte 7: Ús de la Dièresi",
        instruction: "Completa la paraula: Aig___es.",
        data: ["u", "ü"],
        correctAnswer: "ü",
        explanation: "La dièresi (¨) fa que soni la 'u' davant de E o I."
    },
    {
        id: "m3_e8",
        type: "binary",
        title: "Repte 8: Identificació de Sons",
        instruction: "A la paraula 'Llengüeta', sona la U?",
        data: ["Sí", "No"],
        correctAnswer: "Sí",
        explanation: "Sí, porta dièresi, per tant la 'u' es pronuncia."
    },
    {
        id: "m3_e9",
        type: "binary",
        title: "Repte 9: Excepcions de la Dièresi",
        instruction: "La paraula 'Egoisme' porta dièresi?",
        data: ["Sí", "No"],
        correctAnswer: "No",
        explanation: "Les terminacions cultes com -isme no porten dièresi, encara que hi hagi un hiat."
    },
    {
        id: "m3_e10",
        type: "match",
        title: "Repte 10: Repàs General",
        instruction: "Connecta cada paraula amb el fenomen ortogràfic que conté.",
        data: [],
        pairs: [
            { left: "Raïm", right: "Hiat amb dièresi" },
            { left: "Peu", right: "Monosíl·lab sense accent" },
            { left: "Camió", right: "Aguda accentuada" },
            { left: "Plàtan", right: "Plana accentuada" }
        ],
        explanation: "Aquest exercici repassa els conceptes d'accentuació, dièresi i fenòmens vocàlics."
    }
];
