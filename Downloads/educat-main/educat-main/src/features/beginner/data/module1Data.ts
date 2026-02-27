export type ExerciseType = 'order' | 'select' | 'binary' | 'multiple_choice' | 'match' | 'fill_gap' | 'classify';

export interface BeginnerExercise {
    id: string;
    type: ExerciseType;
    title: string;
    instruction: string;
    data: string[]; // Options or items to order
    correctOrder?: string[]; // For ordering exercises
    correctAnswer?: string; // For selection/choice exercises
    pairs?: { left: string, right: string }[]; // For matching exercises
    categories?: string[]; // For classification exercises
    classification?: { [key: string]: string[] }; // For classification exercises (category -> item ids)
    explanation: string;
}

export const MODULE_1_EXERCISES: BeginnerExercise[] = [
    {
        id: "m1_e1",
        type: "order",
        title: "Repte 1: L'Ordre dels Pobles",
        instruction: "Ordena aquests pobles alfabèticament per la primera lletra.",
        data: ["Darnius", "Arcavell", "Espot", "Ballestar", "Cabanelles"],
        correctOrder: ["Arcavell", "Ballestar", "Cabanelles", "Darnius", "Espot"],
        explanation: "Ordre alfabètic: A, B, C, D, E."
    },
    {
        id: "m1_e2",
        type: "match",
        title: "Repte 2: Majúscules i Minúscules",
        instruction: "Connecta cada lletra majúscula amb la seva minúscula.",
        data: [],
        pairs: [
            { left: "A", right: "a" },
            { left: "Q", right: "q" },
            { left: "R", right: "r" },
            { left: "G", right: "g" }
        ],
        explanation: "Les lletres tenen dues formes: majúscula (gran) i minúscula (petita)."
    },
    {
        id: "m1_e3",
        type: "order",
        title: "Repte 3: El Desafiament de la \"B\"",
        instruction: "Ordena aquestes paraules (mira la 2a i la 3a lletra).",
        data: ["Blanes", "Besalú", "Bàscara", "Begur"],
        correctOrder: ["Bàscara", "Begur", "Besalú", "Blanes"],
        explanation: "Ordre: Ba, Be (g < s), Bl."
    },
    {
        id: "m1_e4",
        type: "match",
        title: "Repte 4: Inicials de Ciutats",
        instruction: "Connecta cada ciutat amb la lletra per la que comença.",
        data: [],
        pairs: [
            { left: "Girona", right: "G" },
            { left: "Barcelona", right: "B" },
            { left: "Tarragona", right: "T" },
            { left: "Lleida", right: "L" }
        ],
        explanation: "G (Girona), B (Barcelona), T (Tarragona), L (Lleida)."
    },
    {
        id: "m1_e5",
        type: "order",
        title: "Repte 5: La Sèrie de la \"G\"",
        instruction: "Ordena per la 3a lletra.",
        data: ["Gimenells", "Gandesa", "Gurb", "Girona"],
        correctOrder: ["Gandesa", "Gimenells", "Girona", "Gurb"],
        explanation: "Ordre: Ga, Gi (m < r), Gu."
    },
    {
        id: "m1_e6",
        type: "match",
        title: "Repte 6: Veïns de l'Alfabet",
        instruction: "Connecta cada lletra amb la que ve just després.",
        data: [],
        pairs: [
            { left: "A", right: "B" },
            { left: "M", right: "N" },
            { left: "S", right: "T" },
            { left: "X", right: "Y" }
        ],
        explanation: "L'ordre és ... A, B ... M, N ... S, T ... X, Y."
    },
    {
        id: "m1_e7",
        type: "order",
        title: "Repte 7: Ordenació de Comarques",
        instruction: "Ordena aquestes paraules.",
        data: ["Mataró", "Maó", "Martorell", "Manresa"],
        correctOrder: ["Manresa", "Maó", "Martorell", "Mataró"],
        explanation: "Ordre: Man, Maó, Mar, Mat."
    },
    {
        id: "m1_e8",
        type: "match",
        title: "Repte 8: Paraules i Categories",
        instruction: "Connecta cada paraula amb el que és.",
        data: [],
        pairs: [
            { left: "Avió", right: "Transport" },
            { left: "Vermell", right: "Color" },
            { left: "Gat", right: "Animal" },
            { left: "Dilluns", right: "Dia" }
        ],
        explanation: "Classificar paraules també ajuda a ordenar el vocabulari mentalment."
    },
    {
        id: "m1_e9",
        type: "order",
        title: "Repte 9: El Salt de l'Abecedari",
        instruction: "Ordena aquestes tres paraules que comencen per 'S'.",
        data: ["Súria", "Salàs", "Setcases"],
        correctOrder: ["Salàs", "Setcases", "Súria"],
        explanation: "Sa, Se, Su."
    },
    {
        id: "m1_e10",
        type: "order",
        title: "Repte 10: Prova Final de Precisió",
        instruction: "Ordena aquestes 5 paraules.",
        data: ["Valls", "Vielha", "Vic", "Vidreres", "Viladrau"],
        correctOrder: ["Vic", "Vidreres", "Vielha", "Viladrau", "Valls"],
        explanation: "Vi (c < d < e < l), Va."
    }
];
