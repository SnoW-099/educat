import { BeginnerExercise } from "./module1Data";

export const MODULE_6_EXERCISES: BeginnerExercise[] = [
    {
        id: "m6_e1",
        type: "match",
        title: "Repte 1: El Sensor T/D",
        instruction: "Mira el femení (la derivada) per saber com acaba el masculí.",
        data: [],
        pairs: [
            { left: "Fre__a (Freda)", right: "d" },
            { left: "Al__a (Alta)", right: "t" },
            { left: "Ver__a (Verda)", right: "d" },
            { left: "Peti__a (Petita)", right: "t" }
        ],
        explanation: "La lletra final del masculí és la mateixa que la del femení (Freda -> Fred, Alta -> Alt)."
    },
    {
        id: "m6_e2",
        type: "binary",
        title: "Repte 2: Escàner de C/G",
        instruction: "Com s'escriu el líquid vermell del cos?",
        data: ["Sang", "Sanc"],
        correctAnswer: "Sang",
        explanation: "Pensa en la família: Sanguinari, Sanguina. Si la derivada té G, la final és G."
    },
    {
        id: "m6_e3",
        type: "select",
        title: "Repte 3: Alternador P/B",
        instruction: "Quin objecte serveix per beure?",
        data: ["Vas", "Cop", "Cub"],
        correctAnswer: "Cub",
        explanation: "Ve de Cúbic (B). Cop existeix, però vol dir 'colp' (de Colpejar)."
    },
    {
        id: "m6_e4",
        type: "binary",
        title: "Repte 4: Terminació -TAT vs -DAD",
        instruction: "En català, les qualitats abstractes acaben en...",
        data: ["-tat (Veritat)", "-dad (Veridad)"],
        correctAnswer: "-tat (Veritat)",
        explanation: "Sempre amb T final! Veritat, Bondat, Ciutat, Amistat. Mai amb D."
    },
    {
        id: "m6_e5",
        type: "fill_gap",
        title: "Repte 5: El Detector de Gerundis (-NT)",
        instruction: "Estic ___ una cançó.",
        data: ["Cantant", "Cantand", "Cantan"],
        correctAnswer: "Cantant",
        explanation: "Els gerundis (accions en curs) sempre acaben en -NT. Menjant, Dormint, Corrent."
    },
    {
        id: "m6_e6",
        type: "match",
        title: "Repte 6: Anàlisi de Participis (-AT/-ADA)",
        instruction: "Passa del femení al masculí.",
        data: [],
        pairs: [
            { left: "Canta__ (Cantada)", right: "t" }, // Cantat
            { left: "Bui__ (Buida)", right: "t" }, // Buit
            { left: "Perdu__ (Perduda)", right: "t" }, // Perdut
            { left: "Cru__ (Cruda)", right: "u" } // Cru (Excepció! Cruda -> Cru)
        ],
        explanation: "La majoria acaben en T (Cantada->Cantat), però ALERTA: 'Crua/Cruda' fa 'Cru' sense T final."
    },
    {
        id: "m6_e7",
        type: "select",
        title: "Repte 7: Excepcions de So (Llop/Amic)",
        instruction: "Atenció! Trampa visual. Com s'escriu l'animal que fa 'Auúú'?",
        data: ["Llop", "Llob"],
        correctAnswer: "Llop",
        explanation: "Encara que el femení és Lloba (B), el masculí s'escriu amb P. És una excepció històrica. Passa el mateix amb Amic (Amiga)."
    },
    {
        id: "m6_e8",
        type: "binary",
        title: "Repte 8: Filtre de M/N Final",
        instruction: "Com s'escriu el lloc on juguem a futbol?",
        data: ["Camp", "Canp"],
        correctAnswer: "Camp",
        explanation: "Davant de P, sempre va M. Recordes l'algoritme del Mòdul 5?"
    },
    {
        id: "m6_e9",
        type: "match",
        title: "Repte 9: La Regla del Mag",
        instruction: "Uneix la paraula amb la seva lletra final.",
        data: [],
        pairs: [
            { left: "Mà__ia (Màgia)", right: "g" },
            { left: "Mecàni__ (Mecànica)", right: "c" },
            { left: "Llar__ària (Llargària)", right: "g" },
            { left: "Fo__ (Foguera)", right: "c" }
        ],
        explanation: "Regla general: G deriva en G, C deriva en C. Foc és una excepció (Foguera -> Foc)."
    },
    {
        id: "m6_e10",
        type: "select",
        title: "Repte 10: Prova d'Estrès (Mix)",
        instruction: "Troba la paraula CORRECTA.",
        data: ["Ciudad", "Actitut", "Solitut", "Actitud"],
        correctAnswer: "Actitud",
        explanation: "Actitud és correcta (ve d'Actitudinal, amb D!). Les altres Fallen: Ciutat (T), Actitud (D), Solitud (D)."
    }
];
