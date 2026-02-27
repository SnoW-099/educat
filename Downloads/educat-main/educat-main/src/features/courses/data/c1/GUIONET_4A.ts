import type { CourseSection, CourseExercise } from '../courseExercises';

export const GUIONET_4A: CourseSection[] = [{
  id: 'guionet_4a',
  title: 'El Guionet (C1) 🎯',
  description: '✍️ Domina les regles del guionet: Numerals (D-U-C), pronoms i compostos segons la normativa actual.',
  category: 'ortografia',
  course: '4A',
  exercises: [
    // --- BLOC 1: Numerales (Regla D-U / C-U) ---
    { id: 'g4a_b1_1', type: 'multiple_choice', question: '🔢 Porta guionet? "22"', options: ['vint-i-dos', 'vintidos'], correctAnswer: 'vint-i-dos', explanation: 'Regla D-U: Desenes i Unitats se separen amb guionet. ✅', difficulty: 1, course: '4A' },
    { id: 'g4a_b1_2', type: 'multiple_choice', question: '🔢 Porta guionet? "37"', options: ['trenta-set', 'trentaset'], correctAnswer: 'trenta-set', explanation: 'Regla D-U: trenta-set. ✅', difficulty: 1, course: '4A' },
    { id: 'g4a_b1_3', type: 'multiple_choice', question: '🔢 Porta guionet? "64"', options: ['seixanta-quatre', 'seixantaquatre'], correctAnswer: 'seixanta-quatre', explanation: 'Regla D-U: seixanta-quatre. ✅', difficulty: 1, course: '4A' },
    { id: 'g4a_b1_4', type: 'multiple_choice', question: '🔢 Porta guionet? "500"', options: ['cinc-cents', 'cinccents'], correctAnswer: 'cinc-cents', explanation: 'Regla U-C: Unitats i Centenes se separen amb guionet. ✅', difficulty: 1, course: '4A' },
    { id: 'g4a_b1_5', type: 'multiple_choice', question: '🔢 Porta guionet? "2000"', options: ['dos mil', 'dos-mil'], correctAnswer: 'dos mil', explanation: '"Mil" mai porta guionet amb el número anterior. ❌', difficulty: 1, course: '4A' },
    { id: 'g4a_b1_6', type: 'multiple_choice', question: '🔢 Porta guionet? "421"', options: ['quatre-cents vint-i-un', 'quatrecents vintiun'], correctAnswer: 'quatre-cents vint-i-un', explanation: 'Sí, a U-C (quatre-cents) i a D-U (vint-i-un). ✅', difficulty: 2, course: '4A' },
    { id: 'g4a_b1_7', type: 'multiple_choice', question: '🔢 Porta guionet? "99"', options: ['noranta-nou', 'norantanou'], correctAnswer: 'noranta-nou', explanation: 'Regla D-U: noranta-nou. ✅', difficulty: 1, course: '4A' },
    { id: 'g4a_b1_8', type: 'multiple_choice', question: '🔢 Porta guionet? "300"', options: ['tres-cents', 'trescents'], correctAnswer: 'tres-cents', explanation: 'Regla U-C: tres-cents. ✅', difficulty: 1, course: '4A' },
    { id: 'g4a_b1_9', type: 'multiple_choice', question: '🔢 Porta guionet? "2500"', options: ['dues mil cinc-centes', 'dues-mil cinc-centes'], correctAnswer: 'dues mil cinc-centes', explanation: '"Dues mil" no porta guionet. "Cinc-centes" sí (U-C). ✅', difficulty: 2, course: '4A' },
    { id: 'g4a_b1_10', type: 'multiple_choice', question: '🔢 Porta guionet? "88"', options: ['vuitanta-vuit', 'vuitantavuit'], correctAnswer: 'vuitanta-vuit', explanation: 'Regla D-U: vuitanta-vuit. ✅', difficulty: 1, course: '4A' },
    { id: 'g4a_b1_11', type: 'multiple_choice', question: '🔢 Porta guionet? "19"', options: ['dinou', 'di-nou'], correctAnswer: 'dinou', explanation: 'Del 11 al 19 s\'escriuen junts (excepte "disset", "divuit", "dinou"). ❌', difficulty: 1, course: '4A' },
    { id: 'g4a_b1_12', type: 'multiple_choice', question: '🔢 Porta guionet? "73"', options: ['setanta-tres', 'setantatres'], correctAnswer: 'setanta-tres', explanation: 'Regla D-U: setanta-tres. ✅', difficulty: 1, course: '4A' },
    { id: 'g4a_b1_13', type: 'multiple_choice', question: '🔢 Porta guionet? "1100"', options: ['mil cent', 'mil-cent'], correctAnswer: 'mil cent', explanation: 'Sense guionet entre mil i centenars. ❌', difficulty: 1, course: '4A' },
    { id: 'g4a_b1_14', type: 'multiple_choice', question: '🔢 Porta guionet? "42"', options: ['quaranta-dos', 'quarantados'], correctAnswer: 'quaranta-dos', explanation: 'Regla D-U: quaranta-dos. ✅', difficulty: 1, course: '4A' },
    { id: 'g4a_b1_15', type: 'multiple_choice', question: '💰 Porta guionet? "5.000.000"', options: ['cinc milions', 'cinc-milions'], correctAnswer: 'cinc milions', explanation: '"Milions" funciona com un substantiu, sense guionet. ❌', difficulty: 2, course: '4A' },

    // --- BLOC 2: Palabras Compuestas (Repeticiones y Onomatopeyas) ---
    { id: 'g4a_b2_1', type: 'multiple_choice', question: '🚶 Escull la forma correcta:', options: ['xino-xano', 'xinoxano'], correctAnswer: 'xino-xano', explanation: 'Repetició de mots: porta guionet. ✅', difficulty: 2, course: '4A' },
    { id: 'g4a_b2_2', type: 'multiple_choice', question: '〰️ Escull la forma correcta:', options: ['ziga-zaga', 'zigazaga'], correctAnswer: 'ziga-zaga', explanation: 'Expressió repetitiva: porta guionet. ✅', difficulty: 2, course: '4A' },
    { id: 'g4a_b2_3', type: 'multiple_choice', question: '⏰ Escull la forma correcta:', options: ['tic-tac', 'tictac'], correctAnswer: 'tic-tac', explanation: 'Onomatopeia repetitiva: porta guionet. ✅', difficulty: 1, course: '4A' },
    { id: 'g4a_b2_4', type: 'multiple_choice', question: '💘 Escull la forma correcta:', options: ['cor-près', 'corprès'], correctAnswer: 'corprès', explanation: 'Compost antic soldat (escrit junt). ⚠️', difficulty: 3, course: '4A' },
    { id: 'g4a_b2_5', type: 'multiple_choice', question: '🤝 Escull la forma correcta:', options: ['mano-mano', 'manomano'], correctAnswer: 'mano-mano', explanation: 'Repetició: porta guionet. ✅', difficulty: 2, course: '4A' },
    { id: 'g4a_b2_6', type: 'multiple_choice', question: '🐶 Escull la forma correcta:', options: ['bup-bup', 'bupbup'], correctAnswer: 'bup-bup', explanation: 'Onomatopeia: porta guionet. ✅', difficulty: 1, course: '4A' },
    { id: 'g4a_b2_7', type: 'multiple_choice', question: '🥬 Escull la forma correcta:', options: ['nap-i-col', 'napicol'], correctAnswer: 'napicol', explanation: 'Compost lexicalitzat (tot junt). ⚠️', difficulty: 3, course: '4A' },
    { id: 'g4a_b2_8', type: 'multiple_choice', question: '🌊 Escull la forma correcta:', options: ['rierol-rierol', 'rierolrierol'], correctAnswer: 'rierol-rierol', explanation: 'Repetició expressiva: porta guionet. ✅', difficulty: 2, course: '4A' },
    { id: 'g4a_b2_9', type: 'multiple_choice', question: '👕 Escull la forma correcta:', options: ['pengim-penjam', 'pengimpenjam'], correctAnswer: 'pengim-penjam', explanation: 'Joc de paraules/repetició: porta guionet. ✅', difficulty: 2, course: '4A' },
    { id: 'g4a_b2_10', type: 'multiple_choice', question: '🏃 Escull la forma correcta:', options: ['corre-cuita', 'correcuita'], explanation: '(Nota: Corre-cuita sovint s\'accepta amb guionet, però "cuitacorrents" és comú. Aquí acceptem corre-cuita si és l\'opció). Correcció: "corre-cuita". ✅', correctAnswer: 'corre-cuita', difficulty: 2, course: '4A' }, // Ajustat a la petició de l'usuari
    { id: 'g4a_b2_11', type: 'multiple_choice', question: '🤫 Escull la forma correcta:', options: ['xiu-xiu', 'xiuxiu'], correctAnswer: 'xiu-xiu', explanation: 'Onomatopeia: porta guionet. ✅', difficulty: 1, course: '4A' },

    { id: 'g4a_b2_12_fix', type: 'multiple_choice', question: '⚡ Escull la forma correcta:', options: ['garrat-i-viu', 'garrativiu'], correctAnswer: 'garrativiu', explanation: 'Compost soldat. ✅', difficulty: 3, course: '4A' },
    { id: 'g4a_b2_13', type: 'multiple_choice', question: '🍽️ Escull la forma correcta:', options: ['renta-plats', 'rentaplats'], correctAnswer: 'rentaplats', explanation: 'Nova normativa: s\'escriu tot junt. ⚠️', difficulty: 2, course: '4A' },
    { id: 'g4a_b2_14', type: 'multiple_choice', question: '🚗 Escull la forma correcta:', options: ['para-xocs', 'paraxocs'], correctAnswer: 'paraxocs', explanation: 'Nova normativa: s\'escriu tot junt. ⚠️', difficulty: 2, course: '4A' },
    { id: 'g4a_b2_15', type: 'multiple_choice', question: '💨 Escull la forma correcta:', options: ['eura-est', 'euraest'], correctAnswer: 'eura-est', explanation: 'Porta guionet per contacte de vocals (a-e) que dificulta la lectura. ✅', difficulty: 3, course: '4A' },

    // --- BLOC 3: Pronoms Febles ---
    { id: 'g4a_b3_1', type: 'fill_blank', question: '✉️ Uneix: Dona + me + la', correctAnswer: 'dona-me-la', explanation: 'Verb acabat en vocal + me + la -> Guionets. ✅', difficulty: 2, course: '4A' },
    { id: 'g4a_b3_2', type: 'fill_blank', question: '🗣️ Uneix: Digues + li', correctAnswer: 'digues-li', explanation: 'Imperatiu + li -> Guionet. ✅', difficulty: 2, course: '4A' },
    { id: 'g4a_b3_3', type: 'fill_blank', question: '🏃 Uneix: Anem + nos + en', correctAnswer: 'anem-nos-en', explanation: 'Imperatiu + nos + en. ✅', difficulty: 3, course: '4A' },
    { id: 'g4a_b3_4', type: 'fill_blank', question: '🍽️ Uneix: Menja + et + ho', correctAnswer: "menja-t'ho", explanation: 'Menja + et (es converteix en t\') + ho. ✅', difficulty: 3, course: '4A' },
    { id: 'g4a_b3_5', type: 'fill_blank', question: '📦 Uneix: Porta + ho', correctAnswer: 'porta-ho', explanation: 'Porta + ho (la H impedeix l\'apòstrof). ✅', difficulty: 2, course: '4A' },
    { id: 'g4a_b3_6', type: 'fill_blank', question: '🛒 Uneix: Compri + els', correctAnswer: "compri'ls", explanation: 'Compri (vocal) + els -> s\'apostrofa. ✅', difficulty: 2, course: '4A' },
    { id: 'g4a_b3_7', type: 'fill_blank', question: '🎁 Uneix: Dona + em + ho', correctAnswer: "dona'm-ho", explanation: 'Dona\'m (apòstrof) + ho (guionet). ✅', difficulty: 3, course: '4A' },
    { id: 'g4a_b3_8', type: 'fill_blank', question: '👂 Uneix: Escolta + ens', correctAnswer: "escolta'ns", explanation: 'Escolta + ens -> s\'apostrofa. ✅', difficulty: 2, course: '4A' },
    { id: 'g4a_b3_9', type: 'fill_blank', question: '📦 Uneix: Porteu + los + el', correctAnswer: 'porteu-los-el', explanation: 'Porteu + los + el (tots amb guionet). ✅', difficulty: 3, course: '4A' },
    { id: 'g4a_b3_10', type: 'fill_blank', question: '👀 Uneix: Mira + et', correctAnswer: "mira't", explanation: 'Mira + et -> s\'apostrofa. ✅', difficulty: 2, course: '4A' },
    { id: 'g4a_b3_11', type: 'fill_blank', question: '✅ Uneix: Fes + ho', correctAnswer: 'fes-ho', explanation: 'Fes + ho (consonant + H -> guionet). ✅', difficulty: 2, course: '4A' },
    { id: 'g4a_b3_12', type: 'fill_blank', question: '🛒 Uneix: Compra + els + en', correctAnswer: "compra'ls-en", explanation: 'Compra\'ls + en. ✅', difficulty: 3, course: '4A' },
    { id: 'g4a_b3_13', type: 'fill_blank', question: '💰 Uneix: Vendre + els', correctAnswer: "vendre'ls", explanation: 'Vendre + els -> s\'apostrofa. ✅', difficulty: 2, course: '4A' },
    { id: 'g4a_b3_14', type: 'fill_blank', question: '📍 Uneix: Anar + hi', correctAnswer: 'anar-hi', explanation: 'Infinitiu + hi -> guionet. ✅', difficulty: 2, course: '4A' },
    { id: 'g4a_b3_15', type: 'fill_blank', question: '📦 Uneix: Portar + les', correctAnswer: 'portar-les', explanation: 'Infinitiu + les -> guionet. ✅', difficulty: 2, course: '4A' },

    // --- BLOC 4: Puntos Cardinales y Relativos ---
    { id: 'g4a_b4_1', type: 'multiple_choice', question: '🌎 Toca l\'opció correcta:', options: ['sud-americà', 'sudamericà'], correctAnswer: 'sud-americà', explanation: 'Punts cardinals compostos: porta guionet. ✅', difficulty: 2, course: '4A' },
    { id: 'g4a_b4_2', type: 'multiple_choice', question: '🧭 Toca l\'opció correcta:', options: ['nord-oest', 'nordoest'], correctAnswer: 'nord-oest', explanation: 'Punts cardinals: guionet. ✅', difficulty: 2, course: '4A' },
    { id: 'g4a_b4_3', type: 'multiple_choice', question: '🧭 Toca l\'opció correcta:', options: ['sud-est', 'sudest'], correctAnswer: 'sud-est', explanation: 'Punts cardinals: guionet. ✅', difficulty: 2, course: '4A' },
    { id: 'g4a_b4_4', type: 'multiple_choice', question: '📅 Toca l\'opció correcta:', options: ['despús-ahir', 'despusahir'], correctAnswer: 'despús-ahir', explanation: 'Expressió temporal: guionet. ✅', difficulty: 2, course: '4A' },
    { id: 'g4a_b4_5', type: 'multiple_choice', question: '📅 Toca l\'opció correcta:', options: ['despús-demà', 'despusdemà'], correctAnswer: 'despús-demà', explanation: 'Expressió temporal: guionet. ✅', difficulty: 2, course: '4A' },
    { id: 'g4a_b4_6', type: 'multiple_choice', question: '👴 Toca l\'opció correcta:', options: ['besavi', 'bes-avi'], correctAnswer: 'besavi', explanation: 'Besavi va tot junt. ❌', difficulty: 2, course: '4A' },
    { id: 'g4a_b4_7', type: 'multiple_choice', question: '👴 Toca l\'opció correcta:', options: ['besoncle', 'bes-oncle'], correctAnswer: 'bes-oncle', explanation: 'Bes-oncle porta guionet per evitar llegir "beson-". ✅', difficulty: 3, course: '4A' },
    { id: 'g4a_b4_8', type: 'multiple_choice', question: '👔 Toca l\'opció correcta:', options: ['ex-president', 'expresident'], correctAnswer: 'expresident', explanation: 'Prefix "ex-" ara s\'escriu junt. ⚠️', difficulty: 2, course: '4A' },
    { id: 'g4a_b4_9', type: 'multiple_choice', question: '👩‍💼 Toca l\'opció correcta:', options: ['ex-directora', 'exdirectora'], correctAnswer: 'exdirectora', explanation: 'Prefix "ex-" ara s\'escriu junt. ⚠️', difficulty: 2, course: '4A' },
    { id: 'g4a_b4_10', type: 'multiple_choice', question: '⚔️ Toca l\'opció correcta:', options: ['contra-atacar', 'contraatacar'], correctAnswer: 'contraatacar', explanation: 'Prefix "contra-" s\'escriu junt, encara que hi hagi doble a. ✅', difficulty: 3, course: '4A' },

    // --- BLOC 5: Mix de Errores ---
    { id: 'g4a_b5_1', type: 'multiple_choice', question: '❓ Està ben escrit? "Vint i tres"', options: ['Correcte', 'Incorrecte'], correctAnswer: 'Incorrecte', explanation: 'Hauria de ser "Vint-i-tres". ❌', difficulty: 1, course: '4A' },
    { id: 'g4a_b5_2', type: 'multiple_choice', question: '❓ Està ben escrit? "Arròs-amb-llet"', options: ['Correcte', 'Incorrecte'], correctAnswer: 'Incorrecte', explanation: 'Hauria de ser "Arròs amb llet" (sense guions). ❌', difficulty: 2, course: '4A' },
    { id: 'g4a_b5_3', type: 'multiple_choice', question: '❓ Està ben escrit? "Poc-a-poc"', options: ['Correcte', 'Incorrecte'], correctAnswer: 'Incorrecte', explanation: 'Hauria de ser "Poc a poc" (locució adverbial). ❌', difficulty: 2, course: '4A' },
    { id: 'g4a_b5_4', type: 'multiple_choice', question: '❓ Està ben escrit? "D\'aquí-allà"', options: ['Correcte', 'Incorrecte'], correctAnswer: 'Incorrecte', explanation: 'Hauria de ser "D\'aquí allà". ❌', difficulty: 2, course: '4A' },
    { id: 'g4a_b5_5', type: 'multiple_choice', question: '❓ Està ben escrit? "Penja-robes"', options: ['Correcte', 'Incorrecte'], correctAnswer: 'Incorrecte', explanation: 'Hauria de ser "Penjarobes" (tot junt). ❌', difficulty: 2, course: '4A' },
    { id: 'g4a_b5_6', type: 'multiple_choice', question: '❓ Està ben escrit? "Vuit-cents"', options: ['Correcte', 'Incorrecte'], correctAnswer: 'Correcte', explanation: 'Unitats i Centenes amb guionet. ✅', difficulty: 1, course: '4A' },
    { id: 'g4a_b5_7', type: 'multiple_choice', question: '❓ Està ben escrit? "Vora-mar"', options: ['Correcte', 'Incorrecte'], correctAnswer: 'Incorrecte', explanation: 'Hauria de ser "Voramar" (tot junt). ❌', difficulty: 2, course: '4A' },
    { id: 'g4a_b5_8', type: 'multiple_choice', question: '❓ Està ben escrit? "Para-sol"', options: ['Correcte', 'Incorrecte'], correctAnswer: 'Incorrecte', explanation: 'Hauria de ser "Parasol" (tot junt). ❌', difficulty: 2, course: '4A' },
    { id: 'g4a_b5_9', type: 'multiple_choice', question: '❓ Està ben escrit? "Mata-segells"', options: ['Correcte', 'Incorrecte'], correctAnswer: 'Incorrecte', explanation: 'Hauria de ser "Matasegells" (tot junt). ❌', difficulty: 3, course: '4A' },
    { id: 'g4a_b5_10', type: 'multiple_choice', question: '❓ Està ben escrit? "Bell-lloc"', options: ['Correcte', 'Incorrecte'], correctAnswer: 'Correcte', explanation: 'Es manté separat per la L·L / L-L xocant. ✅', difficulty: 3, course: '4A' },
    { id: 'g4a_b5_11', type: 'multiple_choice', question: '❓ Està ben escrit? "Pit-roig"', options: ['Correcte', 'Incorrecte'], correctAnswer: 'Correcte', explanation: 'Nom d\'animal + adjectiu: guionet. ✅', difficulty: 2, course: '4A' },
    { id: 'g4a_b5_12', type: 'multiple_choice', question: '❓ Està ben escrit? "Cama-llarg"', options: ['Correcte', 'Incorrecte'], correctAnswer: 'Correcte', explanation: 'Adjectiu compost: guionet. ✅', difficulty: 2, course: '4A' },
    { id: 'g4a_b5_13', type: 'multiple_choice', question: '❓ Està ben escrit? "Déu-n\'hi-do"', options: ['Correcte', 'Incorrecte'], correctAnswer: 'Correcte', explanation: 'Expressió lexicalitzada amb guionets. ✅', difficulty: 2, course: '4A' },
    { id: 'g4a_b5_14', type: 'multiple_choice', question: '❓ Està ben escrit? "Fil-a-l\'agulla"', options: ['Correcte', 'Incorrecte'], correctAnswer: 'Incorrecte', explanation: 'Hauria de ser "Fil a l\'agulla" (locució). ❌', difficulty: 3, course: '4A' },
    { id: 'g4a_b5_15', type: 'multiple_choice', question: '❓ Està ben escrit? "Cinc-cents setanta-nou"', options: ['Correcte', 'Incorrecte'], correctAnswer: 'Correcte', explanation: 'Tocs mestres! D-U i U-C amb guionets. ✅', difficulty: 2, course: '4A' }
  ]
}];