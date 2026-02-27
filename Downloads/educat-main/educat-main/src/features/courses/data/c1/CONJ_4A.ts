import type { CourseSection, CourseExercise } from '../courseExercises';

export const CONJ_4A: CourseSection[] = [{
  id: 'conj_4a',
  title: 'Conjuncions (C1) 🔗',
  description: '🔗 Connectors, conjuncions i relacions lògiques. Domina el "perquè", "doncs", "sinó" i la caiguda de preposicions.',
  category: 'gramàtica',
  course: '4A',
  exercises: [
    // --- BLOC 1: Perquè vs Doncs ---
    { id: 'c4a_b1_1', type: 'fill_blank', question: '🤔 "No he vingut ______ estava malalt." (Causa)', correctAnswer: 'perquè', explanation: 'Indica la causa (com que estava malalt). "Doncs" és consecutiu. ✅', difficulty: 1, course: '4A' },
    { id: 'c4a_b1_2', type: 'fill_blank', question: '🤔 "Estàs malalt? ______, queda\'t al llit." (Conseqüència)', correctAnswer: 'doncs', explanation: 'Indica conseqüència (aleshores). ✅', difficulty: 1, course: '4A' },
    { id: 'c4a_b1_3', type: 'fill_blank', question: '🤔 "Ho dic ______ ho sàpigues." (Finalitat)', correctAnswer: 'perquè', explanation: 'Indica finalitat (per tal que). ✅', difficulty: 2, course: '4A' },
    { id: 'c4a_b1_4', type: 'fill_blank', question: '🤔 "No plou, ______ sortirem a passejar." (Conseqüència)', correctAnswer: 'doncs', explanation: 'Conseqüència lògica. ✅', difficulty: 1, course: '4A' },
    { id: 'c4a_b1_5', type: 'fill_blank', question: '🤔 "M\'agrada ______ és divertit." (Causa)', correctAnswer: 'perquè', explanation: 'Causa. ✅', difficulty: 1, course: '4A' },
    { id: 'c4a_b1_6', type: 'fill_blank', question: '🤔 "Vols postres? ______, demana la carta." (Conseqüència)', correctAnswer: 'doncs', explanation: 'Conseqüència. ✅', difficulty: 1, course: '4A' },
    { id: 'c4a_b1_7', type: 'fill_blank', question: '🤔 "Estic cansat ______ he corregut molt." (Causa)', correctAnswer: 'perquè', explanation: 'Causa. ✅', difficulty: 1, course: '4A' },
    { id: 'c4a_b1_8', type: 'fill_blank', question: '🤔 "No hi ha pa; ______, anirem a comprar-ne." (Conseqüència)', correctAnswer: 'doncs', explanation: 'Conseqüència. ✅', difficulty: 1, course: '4A' },
    { id: 'c4a_b1_9', type: 'fill_blank', question: '🤔 "Ho fa ______ vol." (Causa)', correctAnswer: 'perquè', explanation: 'Causa. ✅', difficulty: 1, course: '4A' },
    { id: 'c4a_b1_10', type: 'fill_blank', question: '🤔 "T\'agrada? ______, queda-te\'l." (Conseqüència)', correctAnswer: 'doncs', explanation: 'Conseqüència. ✅', difficulty: 1, course: '4A' },

    // --- BLOC 2: Adversatives (Però, Sinó, Malgrat) ---
    { id: 'c4a_b2_1', type: 'multiple_choice', question: '🔄 "No és blanc, ______ negre."', options: ['sinó', 'però'], correctAnswer: 'sinó', explanation: 'Correcció/Oposició total: sinó. ✅', difficulty: 2, course: '4A' },
    { id: 'c4a_b2_2', type: 'multiple_choice', question: '🔄 "És car, ______ m\'agrada."', options: ['però', 'sinó'], correctAnswer: 'però', explanation: 'Restricció (tanmateix): però. ✅', difficulty: 1, course: '4A' },
    { id: 'c4a_b2_3', type: 'multiple_choice', question: '🔄 "No vol ballar, ______ cantar."', options: ['sinó', 'però'], correctAnswer: 'sinó', explanation: 'No A, sinó B. ✅', difficulty: 2, course: '4A' },
    { id: 'c4a_b2_4', type: 'multiple_choice', question: '🔄 "Ha vingut ______ la pluja."', options: ['malgrat', 'encara'], correctAnswer: 'malgrat', explanation: 'Concessiva preposicional: malgrat + nom. ✅', difficulty: 2, course: '4A' },
    { id: 'c4a_b2_5', type: 'multiple_choice', question: '🔄 "No és ric, ______ que té molta sort."', options: ['sinó', 'però'], correctAnswer: 'sinó', explanation: 'No és ric, sinó que... (requereix "que" davant verb conjugat). ✅', difficulty: 2, course: '4A' },
    { id: 'c4a_b2_6', type: 'multiple_choice', question: '🔄 "Fa sol, ______ fa fred."', options: ['però', 'sinó'], correctAnswer: 'però', explanation: 'Restricció. ✅', difficulty: 1, course: '4A' },
    { id: 'c4a_b2_7', type: 'multiple_choice', question: '🔄 "______ que no vulguis, ho faré."', options: ['Encara', 'Malgrat'], correctAnswer: 'Encara', explanation: '"Encara que" (concessiva). ✅', difficulty: 2, course: '4A' },
    { id: 'c4a_b2_8', type: 'multiple_choice', question: '🔄 "No ho diu ell, ______ ella."', options: ['sinó', 'però'], correctAnswer: 'sinó', explanation: 'Oposició. ✅', difficulty: 2, course: '4A' },
    { id: 'c4a_b2_9', type: 'multiple_choice', question: '🔄 "Volia anar-hi, ______ no va poder."', options: ['però', 'sinó'], correctAnswer: 'però', explanation: 'Restricció. ✅', difficulty: 1, course: '4A' },
    { id: 'c4a_b2_10', type: 'multiple_choice', question: '🔄 "No és per tu, ______ per mi."', options: ['sinó', 'però'], correctAnswer: 'sinó', explanation: 'Oposició. ✅', difficulty: 2, course: '4A' },

    // --- BLOC 3: Condicionales y Concesivas ---
    { id: 'c4a_b3_1', type: 'fill_blank', question: '🛠️ "______ vens, t\'esperaré." (Condició)', correctAnswer: 'si', explanation: 'Condicional. ✅', difficulty: 1, course: '4A' },
    { id: 'c4a_b3_2', type: 'fill_blank', question: '🛠️ "Menja, ______ tinguis gana." (Concessió)', correctAnswer: 'encara que', explanation: 'Encara que (subjuntiu per hipòtesi). ✅', difficulty: 2, course: '4A' },
    { id: 'c4a_b3_3', type: 'fill_blank', question: '🛠️ "______ no vens, m\'enfadaré." (Condició)', correctAnswer: 'si', explanation: 'Condicional. ✅', difficulty: 1, course: '4A' },
    { id: 'c4a_b3_4', type: 'fill_blank', question: '🛠️ "Ho faré ______ em costi la vida." (Concessió)', correctAnswer: 'encara que', explanation: 'Valor concessiu extrem. ✅', difficulty: 2, course: '4A' },
    { id: 'c4a_b3_5', type: 'fill_blank', question: '🛠️ "Corre, ______ perdràs el tren." (Condició negativa)', correctAnswer: 'si no', explanation: 'Si no (ho fas). ✅', difficulty: 2, course: '4A' },
    { id: 'c4a_b3_6', type: 'fill_blank', question: '🛠️ "______ plogui, anirem al camp." (Concessió)', correctAnswer: 'encara que', explanation: 'Encara que + subjuntiu. ✅', difficulty: 2, course: '4A' },
    { id: 'c4a_b3_7', type: 'fill_blank', question: '🛠️ "Digues la veritat, ______ et renyin." (Concessió)', correctAnswer: 'malgrat que', explanation: 'Malgrat que = encara que. ✅', difficulty: 3, course: '4A' },
    { id: 'c4a_b3_8', type: 'fill_blank', question: '🛠️ "Estudia, ______ no aprovaràs." (Condició negativa)', correctAnswer: 'si no', explanation: 'Si no (ho fas). ✅', difficulty: 2, course: '4A' },
    { id: 'c4a_b3_9', type: 'fill_blank', question: '🛠️ "______ m\'ho demanis, no ho faré." (Concessió)', correctAnswer: 'encara que', explanation: 'Encara que. ✅', difficulty: 2, course: '4A' },
    { id: 'c4a_b3_10', type: 'fill_blank', question: '🛠️ "______ vols, t\'ajudo." (Condició)', correctAnswer: 'si', explanation: 'Si. ✅', difficulty: 1, course: '4A' },

    // --- BLOC 4: Temporales y Causales ---
    { id: 'c4a_b4_1', type: 'multiple_choice', question: '⏳ "______ vaig arribar, ja dormien."', options: ['Quan', 'Mentre'], correctAnswer: 'Quan', explanation: 'Moment puntual. ✅', difficulty: 2, course: '4A' },
    { id: 'c4a_b4_2', type: 'multiple_choice', question: '⏳ "Escolta la ràdio ______ cuina."', options: ['mentre', 'quan'], correctAnswer: 'mentre', explanation: 'Simultaneïtat durativa. ✅', difficulty: 2, course: '4A' },
    { id: 'c4a_b4_3', type: 'multiple_choice', question: '⏳ "______ el vegis, dóna-li això."', options: ['Quan', 'Mentre'], correctAnswer: 'Quan', explanation: 'Moment futur. ✅', difficulty: 1, course: '4A' },
    { id: 'c4a_b4_4', type: 'multiple_choice', question: '⏳ "No parlis ______ menges."', options: ['mentre', 'quan'], correctAnswer: 'mentre', explanation: 'Durant el temps que. ✅', difficulty: 2, course: '4A' },
    { id: 'c4a_b4_5', type: 'multiple_choice', question: '⏳ "______ acabi, t\'avisaré."', options: ['Quan', 'Mentre'], correctAnswer: 'Quan', explanation: 'Moment futur. ✅', difficulty: 2, course: '4A' },
    { id: 'c4a_b4_6', type: 'multiple_choice', question: '💡 "______ no vens, me\'n vaig."', options: ['Com que', 'Atès que'], correctAnswer: 'Com que', explanation: 'Causa posada al davant (Com que...). ✅', difficulty: 2, course: '4A' },
    { id: 'c4a_b4_7', type: 'multiple_choice', question: '💡 "______ ho sap tot, no diu res."', options: ['Atès que', 'Si'], correctAnswer: 'Atès que', explanation: 'Causa formal (Atès que / Com que). "Si" seria condicional. ✅', difficulty: 3, course: '4A' },
    { id: 'c4a_b4_8', type: 'multiple_choice', question: '⏳ "______ feia els deures, es va adormir."', options: ['Mentre', 'Quan'], correctAnswer: 'Mentre', explanation: 'Durada. ✅', difficulty: 2, course: '4A' },
    { id: 'c4a_b4_9', type: 'multiple_choice', question: '⏳ "Avisa\'m ______ estiguis llest."', options: ['quan', 'mentre'], correctAnswer: 'quan', explanation: 'Moment. ✅', difficulty: 2, course: '4A' },
    { id: 'c4a_b4_10', type: 'multiple_choice', question: '⏳ "Llegia ______ l\'esperava."', options: ['mentre', 'quan'], correctAnswer: 'mentre', explanation: 'Durada. ✅', difficulty: 2, course: '4A' },

    // --- BLOC 5: Corregir el "Que" (Caiguda de preposicions) ---
    { id: 'c4a_b5_1', type: 'multiple_choice', question: '🏗️ "Tinc ganes de que vinguis."', options: ['Correcte', 'Sobra "de"'], correctAnswer: 'Sobra "de"', explanation: 'Caiguda de preposició davant "que": "Tinc ganes QUE vinguis". ✅', difficulty: 2, course: '4A' },
    { id: 'c4a_b5_2', type: 'multiple_choice', question: '🏗️ "Estic segur de que plourà."', options: ['Correcte', 'Sobra "de"'], correctAnswer: 'Sobra "de"', explanation: '"Estic segur QUE plourà". ✅', difficulty: 2, course: '4A' },
    { id: 'c4a_b5_3', type: 'multiple_choice', question: '🏗️ "Confio en que vindràs."', options: ['Correcte', 'Sobra "en"'], correctAnswer: 'Sobra "en"', explanation: '"Confio QUE vindràs". ✅', difficulty: 2, course: '4A' },
    { id: 'c4a_b5_4', type: 'multiple_choice', question: '🏗️ "S\'ha adonat de que l\'enganyaven."', options: ['Correcte', 'Sobra "de"'], correctAnswer: 'Sobra "de"', explanation: '"S\'ha adonat QUE...". ✅', difficulty: 2, course: '4A' },
    { id: 'c4a_b5_5', type: 'multiple_choice', question: '🏗️ "Està content de que hagis vingut."', options: ['Correcte', 'Sobra "de"'], correctAnswer: 'Sobra "de"', explanation: '"Està content QUE...". ✅', difficulty: 2, course: '4A' },
    { id: 'c4a_b5_6', type: 'multiple_choice', question: '🏗️ "Té por de que caigui."', options: ['Correcte', 'Sobra "de"'], correctAnswer: 'Sobra "de"', explanation: '"Té por QUE...". ✅', difficulty: 2, course: '4A' },
    { id: 'c4a_b5_7', type: 'multiple_choice', question: '🏗️ "Insisteix en que mengis."', options: ['Correcte', 'Sobra "en"'], correctAnswer: 'Sobra "en"', explanation: '"Insisteix QUE...". ✅', difficulty: 2, course: '4A' },
    { id: 'c4a_b5_8', type: 'multiple_choice', question: '🏗️ "M\'alegro de que siguis aquí."', options: ['Correcte', 'Sobra "de"'], correctAnswer: 'Sobra "de"', explanation: '"M\'alegro QUE...". ✅', difficulty: 2, course: '4A' },
    { id: 'c4a_b5_9', type: 'multiple_choice', question: '🏗️ "Recorda\'t de que hem de marxar."', options: ['Correcte', 'Sobra "de"'], correctAnswer: 'Sobra "de"', explanation: '"Recorda\'t QUE...". ✅', difficulty: 2, course: '4A' },
    { id: 'c4a_b5_10', type: 'multiple_choice', question: '🏗️ "Està convençut de que guanyarà."', options: ['Correcte', 'Sobra "de"'], correctAnswer: 'Sobra "de"', explanation: '"Està convençut QUE...". ✅', difficulty: 2, course: '4A' },

    // --- BLOC 6: Relaciones (Empareja la conjunción con su función) ---
    { id: 'c4a_b6_1', type: 'multiple_choice', question: '🔗 Funció de "I, Ni":', options: ['Copulativa', 'Disjuntiva'], correctAnswer: 'Copulativa', explanation: 'Sumen informació. ✅', difficulty: 1, course: '4A' },
    { id: 'c4a_b6_2', type: 'multiple_choice', question: '🔗 Funció de "O, O bé":', options: ['Disjuntiva', 'Adversativa'], correctAnswer: 'Disjuntiva', explanation: 'Tria alternativa. ✅', difficulty: 1, course: '4A' },
    { id: 'c4a_b6_3', type: 'multiple_choice', question: '🔗 Funció de "Però, Sinó":', options: ['Adversativa', 'Causal'], correctAnswer: 'Adversativa', explanation: 'Oposició parcial o total. ✅', difficulty: 1, course: '4A' },
    { id: 'c4a_b6_4', type: 'multiple_choice', question: '🔗 Funció de "Doncs, Per tant":', options: ['Consecutiva', 'Condicional'], correctAnswer: 'Consecutiva', explanation: 'Indiquen conseqüència. ✅', difficulty: 1, course: '4A' },
    { id: 'c4a_b6_5', type: 'multiple_choice', question: '🔗 Funció de "Perquè, Com que":', options: ['Causal', 'Final'], correctAnswer: 'Causal', explanation: 'Indiquen la causa. ✅', difficulty: 1, course: '4A' },
    { id: 'c4a_b6_6', type: 'multiple_choice', question: '🔗 Funció de "Si, Si no":', options: ['Condicional', 'Concessiva'], correctAnswer: 'Condicional', explanation: 'Indiquen condició. ✅', difficulty: 1, course: '4A' },
    { id: 'c4a_b6_7', type: 'multiple_choice', question: '🔗 Funció de "Encara que":', options: ['Concessiva', 'Causal'], correctAnswer: 'Concessiva', explanation: 'Objecció que no impedeix l\'acció. ✅', difficulty: 1, course: '4A' },
    { id: 'c4a_b6_8', type: 'multiple_choice', question: '🔗 Funció de "Quan, Mentre":', options: ['Temporal', 'Local'], correctAnswer: 'Temporal', explanation: 'Temps. ✅', difficulty: 1, course: '4A' },
    { id: 'c4a_b6_9', type: 'multiple_choice', question: '🔗 Funció de "Perquè (amb subjuntiu)":', options: ['Final', 'Causal'], correctAnswer: 'Final', explanation: 'Perquè + subjuntiu indica finalitat (per tal que). ✅', difficulty: 1, course: '4A' },
    { id: 'c4a_b6_10', type: 'multiple_choice', question: '🔗 Funció de "Que":', options: ['Completiva', 'Adversativa'], correctAnswer: 'Completiva', explanation: 'Introdueix oracions subordinades substantives. ✅', difficulty: 1, course: '4A' },

    // --- BLOC 7: Mix Final ---
    { id: 'c4a_b7_1', type: 'multiple_choice', question: '🏁 "No hi aniré perquè no vull."', options: ['Correcte', 'Incorrecte'], correctAnswer: 'Correcte', explanation: 'Causal correcta. ✅', difficulty: 1, course: '4A' },
    { id: 'c4a_b7_2', type: 'multiple_choice', question: '🏁 "No ho sé, doncs no m\'ho han dit."', options: ['Correcte', 'Incorrecte (cal "perquè")'], correctAnswer: 'Incorrecte (cal "perquè")', explanation: 'Error comú: utilitzar "doncs" com a causal. "Doncs" és consecutiu! ✅', difficulty: 2, course: '4A' },
    { id: 'c4a_b7_3', type: 'multiple_choice', question: '🏁 "No plou, doncs obre el paraigua."', options: ['Correcte', 'Incorrecte'], correctAnswer: 'Correcte', explanation: 'Conseqüència irònica/lògica (aleshores). ✅', difficulty: 1, course: '4A' },
    { id: 'c4a_b7_4', type: 'multiple_choice', question: '🏁 "Ho faig per que siguis feliç."', options: ['Correcte', 'Incorrecte (cal "perquè")'], correctAnswer: 'Incorrecte (cal "perquè")', explanation: '"Perquè" final s\'escriu junt. ✅', difficulty: 2, course: '4A' },
    { id: 'c4a_b7_5', type: 'multiple_choice', question: '🏁 "Vine, si no et penediràs."', options: ['Correcte', 'Incorrecte'], correctAnswer: 'Correcte', explanation: 'Condicional negatiu. ✅', difficulty: 1, course: '4A' },
    { id: 'c4a_b7_6', type: 'multiple_choice', question: '🏁 "És llest, però gandul."', options: ['Correcte', 'Incorrecte'], correctAnswer: 'Correcte', explanation: 'Adversativa correcta. ✅', difficulty: 1, course: '4A' },
    { id: 'c4a_b7_7', type: 'multiple_choice', question: '🏁 "Digues-m\'ho, encara que sigui mentida."', options: ['Correcte', 'Incorrecte'], correctAnswer: 'Correcte', explanation: 'Concessiva correcta. ✅', difficulty: 1, course: '4A' },
    { id: 'c4a_b7_8', type: 'multiple_choice', question: '🏁 "M\'agradaria de que vinguessis."', options: ['Correcte', 'Incorrecte (sobra "de")'], correctAnswer: 'Incorrecte (sobra "de")', explanation: '"M\'agradaria QUE...". Caiguda de preposició. ✅', difficulty: 2, course: '4A' },
    { id: 'c4a_b7_9', type: 'multiple_choice', question: '🏁 "No és groc, si no blau."', options: ['Correcte', 'Incorrecte (cal "sinó")'], correctAnswer: 'Incorrecte (cal "sinó")', explanation: 'Adversativa "sinó" s\'escriu junt. "Si no" és condicional. ✅', difficulty: 2, course: '4A' },
    { id: 'c4a_b7_10', type: 'multiple_choice', question: '🏁 "Com que no hi ets, t\'escric."', options: ['Correcte', 'Incorrecte'], correctAnswer: 'Correcte', explanation: 'Causal posada davant. ✅', difficulty: 1, course: '4A' }
  ]
}];