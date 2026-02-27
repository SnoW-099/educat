import { BeginnerExercise } from "./module1Data";

export const MODULE_4_EXERCISES: BeginnerExercise[] = [
    {
        id: "m4_e1",
        type: "binary",
        title: "Repte 1: La Fórmula de la Neutra (A o E?)",
        instruction: "Si el plural és Cases, el singular és...",
        data: ["Casa", "Case"],
        correctAnswer: "Casa",
        explanation: "Regla bàsica: Plural en -es -> Singular en -a (Casa/Cases)."
    },
    {
        id: "m4_e2",
        type: "match",
        title: "Repte 2: Derivados Químicos (A/E)",
        instruction: "Troba la paraula primitiva (la mare) per saber quina vocal toca.",
        data: [],
        pairs: [
            { left: "Dents", right: "Dentista" },
            { left: "Mà", right: "Maneta" },
            { left: "Verd", right: "Verdura" },
            { left: "Pa", right: "Panarra" }
        ],
        explanation: "Busca la vocal tònica en la paraula primitiva per saber si escriure A o E en la derivada."
    },
    {
        id: "m4_e3",
        type: "match",
        title: "Repte 3: Isòtops de O/U (La regla del Verb)",
        instruction: "Relaciona el verb amb la seva vocal tònica.",
        data: [],
        pairs: [
            { left: "Jo cullo", right: "Collir" },
            { left: "Jo surto", right: "Sortir" },
            { left: "Jo cusso", right: "Cosir" },
            { left: "Jo tusso", right: "Tossir" }
        ],
        explanation: "En molts verbs, la O àtona esdevé U tònica (jo cullo -> collir)."
    },
    {
        id: "m4_e4",
        type: "select",
        title: "Repte 4: El microscopio (¿O o U?)",
        instruction: "Quina és la lletra correcta per a aquest objecte?",
        data: ["Botifarra", "Butifarra", "Botiffara"],
        correctAnswer: "Botifarra",
        explanation: "Tot i que soni 'u', s'escriu amb 'o': Botifarra."
    },
    {
        id: "m4_e5",
        type: "match",
        title: "Repte 5: Familias de Elementos",
        instruction: "Uneix cada paraula amb la seva família per descobrir la vocal oculta.",
        data: [],
        pairs: [
            { left: "Pes", right: "Peseta" },
            { left: "Glaç", right: "Glacera" },
            { left: "Foc", right: "Foguera" },
            { left: "Llum", right: "Lluernari" }
        ],
        explanation: "Peseta (ve de Pes -> E), Glacera (ve de Glaç -> A), Foguera (ve de Foc -> O)."
    },
    {
        id: "m4_e6",
        type: "select",
        title: "Repte 6: Filtrado de Impurezas (Intruso)",
        instruction: "Totes s'escriuen amb A menys una. Quina s'escriu amb E?",
        data: ["Taverna", "Meravella", "Assassí", "Avantatge"],
        correctAnswer: "Meravella",
        explanation: "Meravella s'escriu amb E (ve de meravellós). Taverna, Assassí i Avantatge van amb A."
    },
    {
        id: "m4_e7",
        type: "match",
        title: "Repte 7: La Reacción en Cadena (Plurales)",
        instruction: "Com fa el plural aquesta paraula acabada en vocal neutra?",
        data: [],
        pairs: [
            { left: "Aigua", right: "Aigües" },
            { left: "Platja", right: "Platges" },
            { left: "Vaca", right: "Vaques" },
            { left: "Plaça", right: "Places" }
        ],
        explanation: "Canvis ortogràfics al plural: -gua/-gües, -ja/-ges, -ca/-ques, -ça/-ces."
    },
    {
        id: "m4_e8",
        type: "fill_gap",
        title: "Repte 8: Compuesto Inestable (Verbos Jeure/Treure/Néixer)",
        instruction: "La nena ___ al sofà.",
        data: ["Jau", "Jeu"],
        correctAnswer: "Jau",
        explanation: "Jeure, Treure i Néixer canvien l'arrel: en posició tònica és A (jo jau), en àtona és E (nosaltres jeiem)."
    },
    {
        id: "m4_e9",
        type: "select",
        title: "Repte 9: Análisis de Muestra (Sufijos)",
        instruction: "Els oficis solen acabar en -ER. Com s'escriu?",
        data: ["Fuster", "Fustar"],
        correctAnswer: "Fuster",
        explanation: "Els oficis i professions solen acabar en -er (Fuster, Cuiner, Porter)."
    },
    {
        id: "m4_e10",
        type: "match",
        title: "Repte 10: La Gran Explosión (Mezcla Final)",
        instruction: "Repàs final. Relaciona paraula dubtosa amb solució.",
        data: [],
        pairs: [
            { left: "Avorrit", right: "Amb O" },
            { left: "Reneix", right: "Amb E" },
            { left: "Mussol", right: "Amb U" },
            { left: "Títol", right: "Amb O" }
        ],
        explanation: "Avorrit (aborrir), Reneix (néixer), Mussol (excepció amb U), Títol (no títul)."
    }
];
