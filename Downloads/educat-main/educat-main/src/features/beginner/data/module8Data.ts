import { BeginnerExercise } from "./module1Data";

export const MODULE_8_EXERCISES: BeginnerExercise[] = [
    {
        id: "m8_e1",
        type: "binary",
        title: "Repte 1: Identificador d'Objectes (Nom vs Verb)",
        instruction: "Analitza la paraula. És una cosa (Nom) o una acció (Verb)?",
        data: ["Taula (Nom)", "Córrer (Verb)"],
        correctAnswer: "Taula (Nom)",
        explanation: "Els noms designen coses, persones o idees. Els verbs indiquen moviment o acció."
    },
    {
        id: "m8_e2",
        type: "select",
        title: "Repte 2: El Modificador (L'Adjectiu)",
        instruction: "Quin d'aquests elements descriu una qualitat (com és alguna cosa)?",
        data: ["Cotxe", "Ràpid", "Semàfor"],
        correctAnswer: "Ràpid",
        explanation: "'Ràpid' és un adjectiu perquè ens diu com és el cotxe."
    },
    {
        id: "m8_e3",
        type: "match",
        title: "Repte 3: Punter de Referència (El Determinant)",
        instruction: "Connecta el determinant (l'article) amb el seu nom corresponent.",
        data: [],
        pairs: [
            { left: "Llibre", right: "El" }, // Masc Sing
            { left: "Casa", right: "La" }, // Fem Sing
            { left: "Arbres", right: "Els" }, // Masc Pl
            { left: "Muntanyes", right: "Les" } // Fem Pl
        ],
        explanation: "Els determinants concorden en gènere i nombre amb el nom que acompanyen."
    },
    {
        id: "m8_e4",
        type: "classify",
        title: "Repte 4: Classificació de Variables (Mix)",
        instruction: "Classifica cada paraula segons el seu tipus.",
        data: ["Ordinador", "Navegar", "Modern", "Un"],
        categories: ["Nom", "Verb", "Adjectiu", "Determinant"],
        classification: {
            "Nom": ["Ordinador"],
            "Verb": ["Navegar"],
            "Adjectiu": ["Modern"],
            "Determinant": ["Un"]
        },
        explanation: "Cada paraula té una funció: Nom (cosa), Verb (acció), Adjectiu (qualitat), Determinant (presentació)."
    },
    {
        id: "m8_e5",
        type: "select",
        title: "Repte 5: Noms Propis (ID Únic)",
        instruction: "Selecciona la paraula que ha d'anar en majúscula (Nom Propi).",
        data: ["ciutat", "barcelona", "carrer"],
        correctAnswer: "barcelona",
        explanation: "Els noms propis identifiquen un lloc o persona específica i sempre comencen amb majúscula (Barcelona)."
    },
    {
        id: "m8_e6",
        type: "match",
        title: "Repte 6: Concordança de Dades (Gènere/Nombre)",
        instruction: "L'adjectiu ha de coincidir amb el nom. Connecta'ls!",
        data: [],
        pairs: [
            { left: "Noi", right: "Simpàtic" },
            { left: "Noia", right: "Simpàtica" },
            { left: "Nois", right: "Simpàtics" },
            { left: "Noies", right: "Simpàtiques" }
        ],
        explanation: "En català, els adjectius canvien de forma segons el nom (masculí/femení, singular/plural)."
    },
    {
        id: "m8_e7",
        type: "select",
        title: "Repte 7: El Motor d'Acció (El Verb)",
        instruction: "Troba la paraula que indica l'acció a la frase: 'El gat dorm al sofà'.",
        data: ["El", "Gat", "Dorm", "Sofà"],
        correctAnswer: "Dorm",
        explanation: "És l'única paraula que indica què està passant (verb dormir)."
    },
    {
        id: "m8_e8",
        type: "binary",
        title: "Repte 8: Abstracte vs Concret",
        instruction: "La paraula 'Llibertat' és un nom...",
        data: ["Abstracte (Idea)", "Concret (Objecte)"],
        correctAnswer: "Abstracte (Idea)",
        explanation: "No pots tocar la llibertat amb les mans. És un concepte."
    },
    {
        id: "m8_e9",
        type: "match",
        title: "Repte 9: Definit vs Indefinit (Articles)",
        instruction: "Connecta segons si coneixem l'objecte o és nou.",
        data: [],
        pairs: [
            { left: "El gos (conegut)", right: "Definit" },
            { left: "Un gos (qualsevol)", right: "Indefinit" },
            { left: "Les claus (meves)", right: "Definit" },
            { left: "Unes claus (unes)", right: "Indefinit" }
        ],
        explanation: "Els articles definits (el, la) assenyalen coses concretes. Els indefinits (un, una) coses generals."
    },
    {
        id: "m8_e10",
        type: "select",
        title: "Repte 10: Anàlisi de Codi (Context)",
        instruction: "Què és la paraula 'Fort' a: 'Un vent fort'?",
        data: ["Nom", "Verb", "Adjectiu"],
        correctAnswer: "Adjectiu",
        explanation: "Ens està dient una qualitat del vent, per tant és un adjectiu."
    }
];
