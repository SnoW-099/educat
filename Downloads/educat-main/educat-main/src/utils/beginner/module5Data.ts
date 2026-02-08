import { BeginnerExercise } from "./module1Data";

export const MODULE_5_EXERCISES: BeginnerExercise[] = [
    {
        id: "m5_e1",
        type: "match",
        title: "Repte 1: L'Algoritme NV/MB",
        instruction: "Omple els buits arrossegant M o N.",
        data: [],
        pairs: [
            { left: "To__ba", right: "m" },
            { left: "Ca__vi", right: "n" },
            { left: "E__bolic", right: "m" },
            { left: "Co__vit", right: "n" }
        ],
        explanation: "Recorda: Davant de B i P, sempre M. Davant de V i F, sempre N."
    },
    {
        id: "m5_e2",
        type: "binary",
        title: "Repte 2: Freqüència Sorda vs Sonora (S/Z)",
        instruction: "Com sona la S a la paraula 'CASA'?",
        data: ["Sorda (Sss...)", "Sonora (Zzz...)"],
        correctAnswer: "Sonora (Zzz...)",
        explanation: "Entre vocals, la S senzilla sempre vibra (z). Si volguéssim que sonés sorda, escriuríem 'Cassa'."
    },
    {
        id: "m5_e3",
        type: "select",
        title: "Repte 3: Engranatges G/J",
        instruction: "Selecciona la lletra correcta per a '__irafa'.",
        data: ["Girafa", "Jirafa"],
        correctAnswer: "Girafa",
        explanation: "Davant de E/I, solem fer servir G (Girona, Gelat, Girafa). La J s'utilitza més davant A/O/U (Jardí, Joc)."
    },
    {
        id: "m5_e4",
        type: "fill_gap",
        title: "Repte 4: El Silenciador (H)",
        instruction: "Aquesta tarda ___ anat al parc.",
        data: ["Hem", "Ma"],
        correctAnswer: "Hem",
        explanation: "Ve del verb Haver (H). 'Em' és un pronom (Em dic Joan)."
    },
    {
        id: "m5_e5",
        type: "match",
        title: "Repte 5: Enginyeria Inversa (Finals P/B, T/D)",
        instruction: "Descobreix la lletra final mirant el plural.",
        data: [],
        pairs: [
            { left: "Llo__ (Llobes)", right: "p" },
            { left: "Ver__ (Verdes)", right: "d" },
            { left: "Ce__ (Cegues)", right: "c" },
            { left: "Llar__ (Llargues)", right: "g" }
        ],
        explanation: "Si el plural té B, el singular acaba en P (Llobes -> Llop). Si té D -> D (Verdes->Verd)."
    },
    {
        id: "m5_e6",
        type: "select",
        title: "Repte 6: Doble Nucli (L·L)",
        instruction: "Quina d'aquestes paraules porta ela geminada?",
        data: ["Pel·lícula", "Bel·lesa", "Celebrar", "Elefant"],
        correctAnswer: "Pel·lícula",
        explanation: "Altres paraules comunes són: Col·legi, Goril·la, Il·lusió, Tranquil·la."
    },
    {
        id: "m5_e7",
        type: "match",
        title: "Repte 7: Selector de Sibilants (Ç/C)",
        instruction: "Completa les paraules amb Ç o C.",
        data: [],
        pairs: [
            { left: "Pla__a", right: "ç" },
            { left: "Lli__ó", right: "ç" },
            { left: "For__ut", right: "ç" },
            { left: "__el", right: "c" }
        ],
        explanation: "La Ç només va davant A, O, U (Plaça, Forçut). Davant E/I, la C ja sona igual (Cel)."
    },
    {
        id: "m5_e8",
        type: "select",
        title: "Repte 8: El Codi TX / IG / X",
        instruction: "Com s'escriu 'Coche' en català?",
        data: ["Cotxe", "Coig", "Cotge"],
        correctAnswer: "Cotxe",
        explanation: "A final de paraula, usem IG (Raig, Maig) o TX (Despatx). Al mig, sol ser TX (Cotxe, fletxa)."
    },
    {
        id: "m5_e9",
        type: "fill_gap",
        title: "Repte 9: Resistència R/RR",
        instruction: "El ca___o corre molt.",
        data: ["rr", "r"],
        correctAnswer: "rr",
        explanation: "Entre vocals, perquè soni forta (RRum-RRum), necessitem doblar la R. 'Caro' existeix, però significa 'costós'."
    },
    {
        id: "m5_e10",
        type: "select",
        title: "Repte 10: Depuració Final (L'Intrús)",
        instruction: "Troba la paraula MAL escrita (Bug).",
        data: ["Cambiar", "Embolicar", "Hivern", "Avió"],
        correctAnswer: "Cambiar",
        explanation: "Error fatal! 'Cambiar' és incorrecte aquí. S'escriu 'Canviar' (ve de Canvi). És l'excepció que confirma la regla NV."
    }
];
