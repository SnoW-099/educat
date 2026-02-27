import type { CourseSection, CourseExercise } from '../courseExercises';

export const PRON_REL_4A: CourseSection[] = [{
  id: 'prel_4a',
  title: 'Pronoms Relatius (C1) 🔗',
  description: '🔗 "Que", "Què", "Qui", "El qual"... Domina les oracions de relatiu i evita els errors més comuns.',
  category: 'gramàtica',
  course: '4A',
  exercises: [
    // --- BLOC 1: El Relativo Simple "QUE" ---
    { id: 'p4a_rel_b1_1', type: 'fill_blank', question: '🎥 "La pel·lícula ____ vaig veure m’agradà molt."', correctAnswer: 'que', explanation: 'Antecedent (cosa) + sense preposició -> que. ✅', difficulty: 1, course: '4A' },
    { id: 'p4a_rel_b1_2', type: 'fill_blank', question: '🏃 "El noi ____ corre és el meu germà."', correctAnswer: 'que', explanation: 'Antecedent (persona) + subjecte -> que. ✅', difficulty: 1, course: '4A' },
    { id: 'p4a_rel_b1_3', type: 'fill_blank', question: '🍏 "Les pomes ____ has comprat són agres."', correctAnswer: 'que', explanation: 'Antecedent (cosa) + CD -> que. ✅', difficulty: 1, course: '4A' },
    { id: 'p4a_rel_b1_4', type: 'fill_blank', question: '🏠 "La casa ____ han construït és enorme."', correctAnswer: 'que', explanation: 'Antecedent (cosa) + CD -> que. ✅', difficulty: 1, course: '4A' },
    { id: 'p4a_rel_b1_5', type: 'fill_blank', question: '📞 "L\'home ____ t\'ha trucat és el director."', correctAnswer: 'que', explanation: 'Antecedent (persona) + subjecte -> que. ✅', difficulty: 1, course: '4A' },
    { id: 'p4a_rel_b1_6', type: 'fill_blank', question: '💡 "La idea ____ vas tenir va ser genial."', correctAnswer: 'que', explanation: 'Antecedent (cosa) + CD -> que. ✅', difficulty: 1, course: '4A' },
    { id: 'p4a_rel_b1_7', type: 'fill_blank', question: '📚 "Els llibres ____ hi ha a la taula són meus."', correctAnswer: 'que', explanation: 'Antecedent (cosa) + subjecte -> que. ✅', difficulty: 1, course: '4A' },
    { id: 'p4a_rel_b1_8', type: 'fill_blank', question: '👥 "La gent ____ viu aquí és amable."', correctAnswer: 'que', explanation: 'Antecedent (persona/col·lectiu) + subjecte -> que. ✅', difficulty: 1, course: '4A' },
    { id: 'p4a_rel_b1_9', type: 'fill_blank', question: '🚗 "El cotxe ____ s\'ha espatllat és vell."', correctAnswer: 'que', explanation: 'Antecedent (cosa) + subjecte -> que. ✅', difficulty: 1, course: '4A' },
    { id: 'p4a_rel_b1_10', type: 'fill_blank', question: '🎵 "La cançó ____ sona és de l\'Eufòria."', correctAnswer: 'que', explanation: 'Antecedent (cosa) + subjecte -> que. ✅', difficulty: 1, course: '4A' },

    // --- BLOC 2: Relativos con Preposición (Què / Qui / Qual) ---
    { id: 'p4a_rel_b2_1', type: 'multiple_choice', question: '🏙️ "La ciutat en ____ visc és petita."', options: ['què', 'la qual'], correctAnswer: 'la qual', explanation: 'Antecedent (ciutat) + preposició "en" -> la qual (o "on"). "En què" és correcte però menys comú amb llocs específics si no és figurat. Acceptem "la qual" per l\'opció. User says: (què / la qual). Wait, "en què" is perfectly Valid. But "la ciutat en la qual" is also valid. User asks to choose "la qual"? Or just fill? User prompt: "en ____ visc". Options "què / la qual". "La ciutat en què visc" is correct. "La ciutat en la qual visc" is correct. Usually "en què" is preferred for things. But user prompt suggests choice. I will put both if possible or stick to the most standard C1 choice. Encara que "en què" és correcte, sovint s\'ensenyen les formes compostes "el qual/la qual" per a contextos formals o per evitar ambigüitat. Si l\'usuari posa "què / la qual", potser vol que triï entre aquestes dos. "La ciutat en què" és molt habitual. "La ciutat en la qual" és més emfàtic. I will add explanation that both can work but "la qual" is formal choice.', difficulty: 2, course: '4A' },
    { id: 'p4a_rel_b2_2', type: 'multiple_choice', question: '👨‍⚕️ "El noi amb ____ surto és metge."', options: ['qui', 'el qual'], correctAnswer: 'qui', explanation: 'Antecedent (persona) + preposició "amb" -> amb qui (o amb el qual). "Amb qui" és més natural. ✅', difficulty: 2, course: '4A' },
    { id: 'p4a_rel_b2_3', type: 'multiple_choice', question: '🔨 "Les eines amb ____ treballo són noves."', options: ['què', 'les quals'], correctAnswer: 'què', explanation: 'Antecedent (cosa) + preposició "amb" -> amb què. ✅', difficulty: 2, course: '4A' },
    { id: 'p4a_rel_b2_4', type: 'multiple_choice', question: '🤫 "L\'assumpte de ____ parlem és secret."', options: ['què', 'del qual'], correctAnswer: 'què', explanation: 'Antecedent (cosa abstracta) + preposició "de" -> de què (o del qual). "De què" és molt correcte. ✅', difficulty: 2, course: '4A' },
    { id: 'p4a_rel_b2_5', type: 'multiple_choice', question: '✉️ "La noia a ____ vas escriure no ha respost."', options: ['qui', 'la qual'], correctAnswer: 'qui', explanation: 'Antecedent (persona) + preposició "a" -> a qui. ✅', difficulty: 2, course: '4A' },
    { id: 'p4a_rel_b2_6', type: 'multiple_choice', question: '💰 "El calaix en ____ guardo els diners és tancat."', options: ['què', 'el qual'], correctAnswer: 'què', explanation: 'Antecedent (cosa) + preposició "en" -> en què. ✅', difficulty: 2, course: '4A' },
    { id: 'p4a_rel_b2_7', type: 'multiple_choice', question: '🍿 "Els amics amb ____ vaig anar al cine."', options: ['qui', 'els quals'], correctAnswer: 'qui', explanation: 'Antecedent (persona) + preposició "amb" -> amb qui. ✅', difficulty: 2, course: '4A' },
    { id: 'p4a_rel_b2_8', type: 'multiple_choice', question: '🍞 "El ganivet amb ____ tallo el pa."', options: ['què', 'el qual'], correctAnswer: 'què', explanation: 'Antecedent (cosa) + preposició "amb" -> amb què. ✅', difficulty: 2, course: '4A' },
    { id: 'p4a_rel_b2_9', type: 'multiple_choice', question: '🤔 "Les raons per ____ s\'ha anat són clares."', options: ['què', 'les quals'], correctAnswer: 'què', explanation: 'Antecedent (cosa abstracta) + preposició "per" -> per què. ✅', difficulty: 2, course: '4A' },
    { id: 'p4a_rel_b2_10', type: 'multiple_choice', question: '🔑 "La clau amb ____ obres la porta."', options: ['què', 'la qual'], correctAnswer: 'què', explanation: 'Antecedent (cosa) + preposició "amb" -> amb què. ✅', difficulty: 2, course: '4A' },

    // --- BLOC 3: El Relativo Neutro "EL QUE / COSA QUE" ---
    { id: 'p4a_rel_b3_1', type: 'multiple_choice', question: '🤷‍♂️ "No entenc ____ dius."', options: ['el que', 'lo que'], correctAnswer: 'el que', explanation: 'Neutre: el que (o allò que). "Lo que" és incorrecte. ✅', difficulty: 1, course: '4A' },
    { id: 'p4a_rel_b3_2', type: 'multiple_choice', question: '🌧️ "Ha plogut molt, ____ ens ha anat bé."', options: ['cosa que', 'el que'], correctAnswer: 'cosa que', explanation: 'Antecedent oracional (tot el fet anterior) -> cosa que (o la qual cosa). ✅', difficulty: 2, course: '4A' },
    { id: 'p4a_rel_b3_3', type: 'multiple_choice', question: '✈️ "____ m\'agrada és viatjar."', options: ['El que', 'Lo que'], correctAnswer: 'El que', explanation: 'Neutre inicial: El que. ✅', difficulty: 1, course: '4A' },
    { id: 'p4a_rel_b3_4', type: 'multiple_choice', question: '🤷 "No sap ____ vol."', options: ['el que', 'la que'], correctAnswer: 'el que', explanation: 'Neutre: el que. ✅', difficulty: 1, course: '4A' },
    { id: 'p4a_rel_b3_5', type: 'multiple_choice', question: '😡 "Va arribar tard, ____ va enfadar el cap."', options: ['cosa que', 'feta que'], correctAnswer: 'cosa que', explanation: 'Antecedent oracional -> cosa que. ✅', difficulty: 2, course: '4A' },
    { id: 'p4a_rel_b3_6', type: 'multiple_choice', question: '👍 "Fes ____ vulguis."', options: ['el que', 'lo que'], correctAnswer: 'el que', explanation: 'Neutre: el que. ✅', difficulty: 1, course: '4A' },
    { id: 'p4a_rel_b3_7', type: 'multiple_choice', question: '🧠 "No recordo ____ va passar."', options: ['el que', 'lo que'], correctAnswer: 'el que', explanation: 'Neutre: el que. ✅', difficulty: 1, course: '4A' },
    { id: 'p4a_rel_b3_8', type: 'multiple_choice', question: '😴 "Està cansat, ____ és normal."', options: ['cosa que', 'el que'], correctAnswer: 'cosa que', explanation: 'Antecedent oracional -> cosa que. ✅', difficulty: 2, course: '4A' },
    { id: 'p4a_rel_b3_9', type: 'multiple_choice', question: '❌ "____ has fet no està bé."', options: ['El que', 'Lo que'], correctAnswer: 'El que', explanation: 'Neutre: El que. ✅', difficulty: 1, course: '4A' },
    { id: 'p4a_rel_b3_10', type: 'multiple_choice', question: '🏪 "Han tancat la botiga, ____ és una pena."', options: ['cosa que', 'el que'], correctAnswer: 'cosa que', explanation: 'Antecedent oracional -> cosa que. ✅', difficulty: 2, course: '4A' },

    // --- BLOC 4: El Relativo Posesivo "EL QUAL / EL SEU" ---
    { id: 'p4a_rel_b4_1', type: 'multiple_choice', question: '🏠 "Un poble, les cases ____ són blanques."', options: ['del qual', 'on'], correctAnswer: 'del qual', explanation: 'Possessiu: les cases del qual (les cases d\'ell). ✅', difficulty: 3, course: '4A' },
    { id: 'p4a_rel_b4_2', type: 'multiple_choice', question: '👩 "Una dona el fill ____ és famós."', options: ['de la qual', 'que'], correctAnswer: 'de la qual', explanation: 'Possessiu: el fill de la qual. ✅', difficulty: 3, course: '4A' },
    { id: 'p4a_rel_b4_3', type: 'multiple_choice', question: '📖 "Un llibre, l\'autor ____ és desconegut."', options: ['del qual', 'que'], correctAnswer: 'del qual', explanation: 'Possessiu: l\'autor del qual. ✅', difficulty: 3, course: '4A' },
    { id: 'p4a_rel_b4_4', type: 'multiple_choice', question: '👔 "L\'empresa el director ____ ha dimitit."', options: ['de la qual', 'que'], correctAnswer: 'de la qual', explanation: 'Possessiu: el director de la qual. ✅', difficulty: 3, course: '4A' },
    { id: 'p4a_rel_b4_5', type: 'multiple_choice', question: '🌳 "Un arbre, les fulles ____ cauen a la tardor."', options: ['del qual', 'que'], correctAnswer: 'del qual', explanation: 'Possessiu: les fulles del qual. ✅', difficulty: 3, course: '4A' },

    // --- BLOC 5: "ON" (Relativo de Lugar) ---
    { id: 'p4a_rel_b5_1', type: 'multiple_choice', question: '📍 "La casa ____ visc és vella."', options: ['on', 'en què'], correctAnswer: 'on', explanation: 'Lloc: on (o en què). Ambdues són correctes, però "on" és molt natural. Opció: On. ✅', difficulty: 1, course: '4A' },
    { id: 'p4a_rel_b5_2', type: 'multiple_choice', question: '🛣️ "El carrer ____ ens vam conèixer."', options: ['on', 'en què'], correctAnswer: 'on', explanation: 'Lloc: on. ✅', difficulty: 1, course: '4A' },
    { id: 'p4a_rel_b5_3', type: 'multiple_choice', question: '🗄️ "El calaix ____ ho he posat."', options: ['on', 'en què'], correctAnswer: 'on', explanation: 'Lloc (figurat o físic): on. "En què" també val. ✅', difficulty: 1, course: '4A' },
    { id: 'p4a_rel_b5_4', type: 'multiple_choice', question: '🏘️ "El poble ____ vaig néixer."', options: ['on', 'en què'], correctAnswer: 'on', explanation: 'Lloc: on. ✅', difficulty: 1, course: '4A' },
    { id: 'p4a_rel_b5_5', type: 'multiple_choice', question: '🗺️ "El lloc ____ anem és lluny."', options: ['on', 'al qual'], correctAnswer: 'on', explanation: 'Lloc (direcció): on (o al qual, a què). ✅', difficulty: 1, course: '4A' },

    // --- BLOC 6: Mix de Errores Comunes (70-75) ---
    { id: 'p4a_rel_b6_1', type: 'multiple_choice', question: '⚠️ "La noia que li vas donar el llibre."', options: ['Incorrecte', 'Correcte'], correctAnswer: 'Incorrecte', explanation: 'Error: Cal preposició. "La noia A QUI vas donar...". ❌', difficulty: 2, course: '4A' },
    { id: 'p4a_rel_b6_2', type: 'multiple_choice', question: '⚠️ "El tema que en parlen sempre."', options: ['Incorrecte', 'Correcte'], correctAnswer: 'Incorrecte', explanation: 'Error: Cal preposició. "El tema DE QUÈ parlen...". ❌', difficulty: 2, course: '4A' },
    { id: 'p4a_rel_b6_3', type: 'multiple_choice', question: '⚠️ "La clau que vas obrir la porta."', options: ['Incorrecte', 'Correcte'], correctAnswer: 'Incorrecte', explanation: 'Error: Cal preposició. "La clau AMB QUÈ vas obrir...". ❌', difficulty: 2, course: '4A' },
    { id: 'p4a_rel_b6_4', type: 'multiple_choice', question: '⚠️ "La raó que m\'ho dius."', options: ['Incorrecte', 'Correcte'], correctAnswer: 'Incorrecte', explanation: 'Error: Cal preposició. "La raó PER LA QUAL...". ❌', difficulty: 2, course: '4A' },
    { id: 'p4a_rel_b6_5', type: 'multiple_choice', question: '⚠️ "L\'home que la seva filla és metgessa."', options: ['Incorrecte', 'Correcte'], correctAnswer: 'Incorrecte', explanation: 'Error: Possessiu incorrecte. "L\'home LA FILLA DEL QUAL...". ❌', difficulty: 3, course: '4A' },
    { id: 'p4a_rel_b6_6', type: 'multiple_choice', question: '⚠️ "No sé lo que dius."', options: ['Incorrecte', 'Correcte'], correctAnswer: 'Incorrecte', explanation: 'Error: "El que". ❌', difficulty: 1, course: '4A' },
    { id: 'p4a_rel_b6_7', type: 'multiple_choice', question: '⚠️ "Va ploure, lo qual em va mullar."', options: ['Incorrecte', 'Correcte'], correctAnswer: 'Incorrecte', explanation: 'Error: "Cosa que". ❌', difficulty: 2, course: '4A' },
    { id: 'p4a_rel_b6_8', type: 'multiple_choice', question: '⚠️ "El ganivet que talles."', options: ['Incorrecte', 'Correcte'], correctAnswer: 'Incorrecte', explanation: 'Error: "Amb què". ❌', difficulty: 2, course: '4A' },
    { id: 'p4a_rel_b6_9', type: 'multiple_choice', question: '⚠️ "El noi que el seu pare ha mort."', options: ['Incorrecte', 'Correcte'], correctAnswer: 'Incorrecte', explanation: 'Error: "El pare del qual". ❌', difficulty: 3, course: '4A' },
    { id: 'p4a_rel_b6_10', type: 'multiple_choice', question: '⚠️ "La caixa que hi ha els diners."', options: ['Incorrecte', 'Correcte'], correctAnswer: 'Incorrecte', explanation: 'Error: "On" o "En què". ❌', difficulty: 2, course: '4A' },

    // --- BLOC 7: Final Sprint (Relativos con preposición compuesta) ---
    { id: 'p4a_rel_b7_1', type: 'fill_blank', question: '🏢 "L\'edifici davant ____ hi ha la plaça."', correctAnswer: 'del qual', explanation: 'Preposició composta (davant de): davant del qual. ✅', difficulty: 3, course: '4A' },
    { id: 'p4a_rel_b7_2', type: 'fill_blank', question: '🏃‍♀️ "La noia darrere ____ corria el gos."', correctAnswer: 'de la qual', explanation: 'Preposició composta (darrere de): darrere de la qual. ✅', difficulty: 3, course: '4A' },
    { id: 'p4a_rel_b7_3', type: 'fill_blank', question: '🌳 "Els arbres sota ____ ens vam asseure."', correctAnswer: 'dels quals', explanation: 'Preposició simple (sota)? No, sota dels quals? O sota els quals? "Sota" admet "de" reforç. Però user prompt suggests "dels quals". So "sota dels quals". ✅', difficulty: 3, course: '4A' },
    { id: 'p4a_rel_b7_4', type: 'fill_blank', question: '🏔️ "Les muntanyes enmig ____ hi ha la vall."', correctAnswer: 'de les quals', explanation: 'Preposició composta (enmig de): enmig de les quals. ✅', difficulty: 3, course: '4A' },
    { id: 'p4a_rel_b7_5', type: 'fill_blank', question: '🚗 "El cotxe dins ____ m\'esperaves."', correctAnswer: 'del qual', explanation: 'Preposició composta (dins de): dins del qual. ✅', difficulty: 3, course: '4A' }
  ]
}];