import type { CourseSection, CourseExercise } from '../courseExercises';

export const PRON_REL_4C: CourseSection[] = [{
  id: 'prel_4c',
  title: 'Pronoms Relatius (B2)',
  description: 'Domina els pronoms relatius: que, què, qui, on i les seves variants. 🔄',
  category: 'gramàtica',
  course: '4C',
  exercises: [
    // --- BLOC 1: QUE vs QUÈ vs QUI (Sense preposició) ---
    { id: 'rel4c_b1_1', type: 'multiple_choice', question: 'L\'advocada ___ ha vingut aquest matí es diu Carina. 👩‍⚖️', options: ['que', 'què', 'qui'], correctAnswer: 'que', explanation: 'Subjecte -> que. ✅', difficulty: 1, course: '4C' },
    { id: 'rel4c_b1_2', type: 'multiple_choice', question: 'El llibre ___ he de llegir és avorrit. 📖', options: ['que', 'què', 'qui'], correctAnswer: 'que', explanation: 'CD -> que. ✅', difficulty: 1, course: '4C' },
    { id: 'rel4c_b1_3', type: 'multiple_choice', question: 'Els tòners ___ vaig demanar arribaran avui. 🖨️', options: ['que', 'què', 'qui'], correctAnswer: 'que', explanation: 'CD -> que. ✅', difficulty: 1, course: '4C' },
    { id: 'rel4c_b1_4', type: 'multiple_choice', question: 'La magistrada ___ vam trobar ahir és de Granada. 👩‍⚖️', options: ['que', 'què', 'qui'], correctAnswer: 'que', explanation: 'CD (persona) -> que. ✅', difficulty: 1, course: '4C' },
    { id: 'rel4c_b1_5', type: 'multiple_choice', question: 'Les eines ___ faig servir són noves. 🛠️', options: ['que', 'què', 'qui'], correctAnswer: 'que', explanation: 'CD -> que. ✅', difficulty: 1, course: '4C' },
    { id: 'rel4c_b1_6', type: 'multiple_choice', question: 'El noi ___ comparteix pis amb mi. 👨', options: ['que', 'què', 'qui'], correctAnswer: 'que', explanation: 'Subjecte -> que. ✅', difficulty: 1, course: '4C' },
    { id: 'rel4c_b1_7', type: 'multiple_choice', question: 'La sèrie ___ vam veure ahir. 📺', options: ['que', 'què', 'qui'], correctAnswer: 'que', explanation: 'CD -> que. ✅', difficulty: 1, course: '4C' },
    { id: 'rel4c_b1_8', type: 'multiple_choice', question: 'El correu ___ ens vau enviar. 📧', options: ['que', 'què', 'qui'], correctAnswer: 'que', explanation: 'CD -> que. ✅', difficulty: 1, course: '4C' },
    { id: 'rel4c_b1_9', type: 'multiple_choice', question: 'Els testimonis ___ van citar han de comparèixer. 🗣️', options: ['que', 'què', 'qui'], correctAnswer: 'que', explanation: 'CD -> que. ✅', difficulty: 2, course: '4C' },
    { id: 'rel4c_b1_10', type: 'multiple_choice', question: 'L\'armari ___ és de fusta de roure. 🚪', options: ['que', 'què', 'qui'], correctAnswer: 'que', explanation: 'Subjecte -> que. ✅', difficulty: 1, course: '4C' },

    // --- BLOC 2: PREPOSICIÓ + RELATIU ---
    { id: 'rel4c_b2_1', type: 'multiple_choice', question: 'La noia amb ___ surts. 💑', options: ['qui', 'què'], correctAnswer: 'qui', explanation: 'Preposició + Persona -> Qui. ✅', difficulty: 2, course: '4C' },
    { id: 'rel4c_b2_2', type: 'multiple_choice', question: 'El llibre de ___ parlo. 📚', options: ['qui', 'què'], correctAnswer: 'què', explanation: 'Preposició + Cosa -> Què. ✅', difficulty: 2, course: '4C' },
    { id: 'rel4c_b2_3', type: 'multiple_choice', question: 'La persona a ___ has de telefonar. 📞', options: ['qui', 'què'], correctAnswer: 'qui', explanation: 'A + Persona -> Qui. ✅', difficulty: 2, course: '4C' },
    { id: 'rel4c_b2_4', type: 'multiple_choice', question: 'L\'edifici en ___ treballo. 🏢', options: ['qui', 'què'], correctAnswer: 'què', explanation: 'Preposició + Lloc/Cosa -> Què. ✅', difficulty: 2, course: '4C' },
    { id: 'rel4c_b2_5', type: 'multiple_choice', question: 'El motiu per ___ ho va fer. ❓', options: ['qui', 'què'], correctAnswer: 'què', explanation: 'Per + Causa -> Què. ✅', difficulty: 2, course: '4C' },
    { id: 'rel4c_b2_6', type: 'multiple_choice', question: 'L\'home contra ___ va declarar. 👨', options: ['qui', 'què'], correctAnswer: 'qui', explanation: 'Contra + Persona -> Qui. ✅', difficulty: 2, course: '4C' },
    { id: 'rel4c_b2_7', type: 'multiple_choice', question: 'L\'eina amb ___ ho va arreglar. 🔧', options: ['qui', 'què'], correctAnswer: 'què', explanation: 'Amb + Instrument -> Què. ✅', difficulty: 2, course: '4C' },
    { id: 'rel4c_b2_8', type: 'multiple_choice', question: 'La dona de ___ et vaig parlar. 👩', options: ['qui', 'què'], correctAnswer: 'qui', explanation: 'De + Persona -> Qui. ✅', difficulty: 2, course: '4C' },
    { id: 'rel4c_b2_9', type: 'multiple_choice', question: 'El permís sense ___ no pots entrar. 🎫', options: ['qui', 'què'], correctAnswer: 'què', explanation: 'Sense + Cosa -> Què. ✅', difficulty: 2, course: '4C' },
    { id: 'rel4c_b2_10', type: 'multiple_choice', question: 'Els amics per ___ faria qualsevol cosa. 🤝', options: ['qui', 'què'], correctAnswer: 'qui', explanation: 'Per + Persona -> Qui. ✅', difficulty: 2, course: '4C' },
    { id: 'rel4c_b2_11', type: 'multiple_choice', question: 'El bolígraf amb ___ escrius. 🖊️', options: ['què', 'qui'], correctAnswer: 'què', explanation: 'Amb + Instrument -> Què. ✅', difficulty: 1, course: '4C' },
    { id: 'rel4c_b2_12', type: 'multiple_choice', question: 'El client a ___ vas enviar el pressupost. 💼', options: ['qui', 'què'], correctAnswer: 'qui', explanation: 'A + Destinatari -> Qui. ✅', difficulty: 2, course: '4C' },
    { id: 'rel4c_b2_13', type: 'multiple_choice', question: 'La situació en ___ ens trobem. 🌐', options: ['què', 'qui'], correctAnswer: 'què', explanation: 'En + Situació -> Què. ✅', difficulty: 2, course: '4C' },
    { id: 'rel4c_b2_14', type: 'multiple_choice', question: 'La sentència contra ___ hem presentat recurs. ⚖️', options: ['què', 'qui'], correctAnswer: 'què', explanation: 'Contra + Cosa -> Què. ✅', difficulty: 3, course: '4C' },
    { id: 'rel4c_b2_15', type: 'multiple_choice', question: 'El tema de ___ tracta la pel·lícula. 🎬', options: ['què', 'qui'], correctAnswer: 'què', explanation: 'De + Tema -> Què. ✅', difficulty: 2, course: '4C' },

    // --- BLOC 3: ON vs EN QUÈ ---
    { id: 'rel4c_b3_1', type: 'multiple_choice', question: 'No trobo el calaix ___ vaig desar les eines. 🗄️', options: ['on', 'que'], correctAnswer: 'on', explanation: 'Lloc físic -> On (o en què). ✅', difficulty: 2, course: '4C' },
    { id: 'rel4c_b3_2', type: 'multiple_choice', question: 'El poble ___ visc. 🏘️', options: ['on', 'que'], correctAnswer: 'on', explanation: 'Lloc -> On. ✅', difficulty: 1, course: '4C' },
    { id: 'rel4c_b3_3', type: 'multiple_choice', question: 'Al carrer ___ visc sempre fan obres. 🚧', options: ['on', 'que'], correctAnswer: 'on', explanation: 'Lloc -> On. ✅', difficulty: 1, course: '4C' },
    { id: 'rel4c_b3_4', type: 'multiple_choice', question: 'El xalet ___ viu l\'Agnès. 🏡', options: ['on', 'que'], correctAnswer: 'on', explanation: 'Lloc -> On. ✅', difficulty: 1, course: '4C' },
    { id: 'rel4c_b3_5', type: 'multiple_choice', question: 'La ciutat ___ vaig néixer. 🏙️', options: ['on', 'que'], correctAnswer: 'on', explanation: 'Lloc -> On. ✅', difficulty: 1, course: '4C' },
    { id: 'rel4c_b3_6', type: 'multiple_choice', question: 'La casa ___ estiuegem. 🏖️', options: ['on', 'que'], correctAnswer: 'on', explanation: 'Lloc -> On. ✅', difficulty: 1, course: '4C' },
    { id: 'rel4c_b3_7', type: 'multiple_choice', question: 'El restaurant ___ vam sopar. 🍽️', options: ['on', 'que'], correctAnswer: 'on', explanation: 'Lloc -> On. ✅', difficulty: 1, course: '4C' },
    { id: 'rel4c_b3_8', type: 'multiple_choice', question: 'L\'armari ___ guardo la roba. 👗', options: ['on', 'que'], correctAnswer: 'on', explanation: 'Lloc -> On/En què. ✅', difficulty: 2, course: '4C' },
    { id: 'rel4c_b3_9', type: 'multiple_choice', question: 'Aquest és el lloc ___ ens vam conèixer. 💑', options: ['on', 'que'], correctAnswer: 'on', explanation: 'Lloc -> On. ✅', difficulty: 1, course: '4C' },
    { id: 'rel4c_b3_10', type: 'multiple_choice', question: 'Treballo a l\'edifici ___ hi ha els jutjats. ⚖️', options: ['on', 'que'], correctAnswer: 'on', explanation: 'Lloc -> On. ✅', difficulty: 2, course: '4C' },

    // --- BLOC 4: EL QUAL / LA QUAL ---
    { id: 'rel4c_b4_1', type: 'multiple_choice', question: 'El poblet en ___ estiuegeu té pocs habitants. 🏘️', options: ['el qual', 'la qual'], correctAnswer: 'el qual', explanation: 'Poblet (masculí) -> el qual. ✅', difficulty: 3, course: '4C' },
    { id: 'rel4c_b4_2', type: 'multiple_choice', question: 'La llei segons ___ s\'ha dictat sentència. 📜', options: ['la qual', 'el qual'], correctAnswer: 'la qual', explanation: 'Llei (femení) -> la qual. ✅', difficulty: 3, course: '4C' },
    { id: 'rel4c_b4_3', type: 'multiple_choice', question: 'Els documents mitjançant ___ es prova el delicte. 📄', options: ['els quals', 'les quals'], correctAnswer: 'els quals', explanation: 'Documents (masculí plural) -> els quals. ✅', difficulty: 3, course: '4C' },
    { id: 'rel4c_b4_4', type: 'multiple_choice', question: 'Les normes contra ___ protesten. 📢', options: ['les quals', 'els quals'], correctAnswer: 'les quals', explanation: 'Normes (femení plural) -> les quals. ✅', difficulty: 3, course: '4C' },
    { id: 'rel4c_b4_5', type: 'multiple_choice', question: 'La sentència, contra ___ no es pot recórrer. 🔨', options: ['la qual', 'el qual'], correctAnswer: 'la qual', explanation: 'Sentència (femení) -> la qual. ✅', difficulty: 3, course: '4C' },
    { id: 'rel4c_b4_6', type: 'multiple_choice', question: 'El motiu pel ___ ho va fer. ❓', options: ['qual', 'què'], correctAnswer: 'qual', explanation: 'Per + el -> Pel qual. ✅', difficulty: 3, course: '4C' },
    { id: 'rel4c_b4_7', type: 'multiple_choice', question: 'La causa per ___ lluitem. ✊', options: ['la qual', 'el qual'], correctAnswer: 'la qual', explanation: 'Causa (femení) -> per la qual. ✅', difficulty: 3, course: '4C' },
    { id: 'rel4c_b4_8', type: 'multiple_choice', question: 'Els amics amb ___ viatjo. 🚌', options: ['els quals', 'les quals'], correctAnswer: 'els quals', explanation: 'Amics (masculí plural) -> amb els quals. ✅', difficulty: 3, course: '4C' },
    { id: 'rel4c_b4_9', type: 'multiple_choice', question: 'La taula damunt ___ hi ha els papers. 🗄️', options: ['la qual', 'el qual'], correctAnswer: 'la qual', explanation: 'Taula (femení) -> damunt la qual. ✅', difficulty: 3, course: '4C' },
    { id: 'rel4c_b4_10', type: 'multiple_choice', question: 'El jutge davant ___ va comparèixer. 👨‍⚖️', options: ['el qual', 'la qual'], correctAnswer: 'el qual', explanation: 'Jutge (masculí) -> davant el qual. ✅', difficulty: 3, course: '4C' },

    // --- BLOC 5: LA QUAL COSA (NEUTRE) ---
    { id: 'rel4c_b5_1', type: 'multiple_choice', question: 'Van tancar la botiga, ___ ens va empipar. 😡', options: ['la qual cosa', 'el qual'], correctAnswer: 'la qual cosa', explanation: 'Antecedent = tota la frase -> la qual cosa. ✅', difficulty: 3, course: '4C' },
    { id: 'rel4c_b5_2', type: 'multiple_choice', question: 'Ens volem comprar un pis, ___ vol dir moltes despeses. 💸', options: ['la qual cosa', 'que'], correctAnswer: 'la qual cosa', explanation: 'Antecedent = frase sencera -> la qual cosa (o cosa que). ✅', difficulty: 3, course: '4C' },
    { id: 'rel4c_b5_3', type: 'multiple_choice', question: 'Ha plogut tot el dia, ___ ha anat bé per al camp. 🌧️', options: ['la qual cosa', 'el qual'], correctAnswer: 'la qual cosa', explanation: 'Antecedent frase -> la qual cosa. ✅', difficulty: 3, course: '4C' },
    { id: 'rel4c_b5_4', type: 'multiple_choice', question: 'No ha vingut ningú, ___ és estrany. 👻', options: ['cosa que', 'el que'], correctAnswer: 'cosa que', explanation: 'Neutre relatiu -> cosa que / la qual cosa. ✅', difficulty: 3, course: '4C' },
    { id: 'rel4c_b5_5', type: 'multiple_choice', question: 'Ha aprovat l\'examen, ___ ens alegra molt. 🎉', options: ['la qual cosa', 'que'], correctAnswer: 'la qual cosa', explanation: 'Neutre -> la qual cosa. ✅', difficulty: 3, course: '4C' },

    // --- BLOC 6: RELATIU vs CONJUNCIÓ ---
    { id: 'rel4c_b6_1', type: 'multiple_choice', question: 'No vull ___ em truquis més. 📵', options: ['que (conjunció)', 'que (relatiu)'], correctAnswer: 'que (conjunció)', explanation: 'No substitueix res, introdueix subordinada substantiva. ✅', difficulty: 2, course: '4C' },
    { id: 'rel4c_b6_2', type: 'multiple_choice', question: 'Els amics, ___ són de Perpinyà, viuen a Agramunt. 🏘️', options: ['que (relatiu)', 'que (conjunció)'], correctAnswer: 'que (relatiu)', explanation: 'Substitueix "els amics". ✅', difficulty: 2, course: '4C' },
    { id: 'rel4c_b6_3', type: 'multiple_choice', question: 'Espero ___ vingueu aviat. ⏳', options: ['que (conjunció)', 'que (relatiu)'], correctAnswer: 'que (conjunció)', explanation: 'Introdueix CD (subordinada). ✅', difficulty: 2, course: '4C' },
    { id: 'rel4c_b6_4', type: 'multiple_choice', question: 'La noia ___ va venir. 👩', options: ['que (relatiu)', 'que (conjunció)'], correctAnswer: 'que (relatiu)', explanation: 'Substitueix "la noia". ✅', difficulty: 1, course: '4C' },
    { id: 'rel4c_b6_5', type: 'multiple_choice', question: 'Sembla ___ plourà. 🌧️', options: ['que (conjunció)', 'que (relatiu)'], correctAnswer: 'que (conjunció)', explanation: 'Introdueix subordinada. ✅', difficulty: 2, course: '4C' },
    { id: 'rel4c_b6_6', type: 'multiple_choice', question: 'El llibre ___ llegeixes. 📖', options: ['que (relatiu)', 'que (conjunció)'], correctAnswer: 'que (relatiu)', explanation: 'Substitueix "el llibre". ✅', difficulty: 1, course: '4C' },
    { id: 'rel4c_b6_7', type: 'multiple_choice', question: 'Desitjo ___ tinguis sort. 🍀', options: ['que (conjunció)', 'que (relatiu)'], correctAnswer: 'que (conjunció)', explanation: 'Introdueix desig. ✅', difficulty: 2, course: '4C' },
    { id: 'rel4c_b6_8', type: 'multiple_choice', question: 'La casa ___ hem comprat. 🏠', options: ['que (relatiu)', 'que (conjunció)'], correctAnswer: 'que (relatiu)', explanation: 'Substitueix "la casa". ✅', difficulty: 1, course: '4C' },
    { id: 'rel4c_b6_9', type: 'multiple_choice', question: 'Diu ___ no vindrà. 🗣️', options: ['que (conjunció)', 'que (relatiu)'], correctAnswer: 'que (conjunció)', explanation: 'Introdueix CD. ✅', difficulty: 2, course: '4C' },
    { id: 'rel4c_b6_10', type: 'multiple_choice', question: 'El cotxe ___ corre molt. 🏎️', options: ['que (relatiu)', 'que (conjunció)'], correctAnswer: 'que (relatiu)', explanation: 'Substitueix "el cotxe". ✅', difficulty: 1, course: '4C' },

    // --- BLOC 7: INTERROGATIU vs RELATIV (ACCENT) ---
    { id: 'rel4c_b7_1', type: 'multiple_choice', question: 'No sé exactament ___ voleu dir. 🤔', options: ['què', 'que'], correctAnswer: 'què', explanation: 'Tònic (Interrogativa indirecta) -> Què. ✅', difficulty: 2, course: '4C' },
    { id: 'rel4c_b7_2', type: 'multiple_choice', question: 'Recordes la conversa ___ vam tenir? 🗣️', options: ['que', 'què'], correctAnswer: 'que', explanation: 'Relatiu àton (antecedent conversa) -> que. ✅', difficulty: 2, course: '4C' },
    { id: 'rel4c_b7_3', type: 'multiple_choice', question: 'No entenc per ___ has vingut. ❓', options: ['què', 'que'], correctAnswer: 'què', explanation: 'Interrogatiu causal -> Per què. ✅', difficulty: 2, course: '4C' },
    { id: 'rel4c_b7_4', type: 'multiple_choice', question: 'Us vull explicar ___ en penso. 💭', options: ['què', 'que'], correctAnswer: 'què', explanation: 'El que (tònic) -> Què. ✅', difficulty: 2, course: '4C' },
    { id: 'rel4c_b7_5', type: 'multiple_choice', question: 'Vaig preguntar per ___ ho havien fet. 🕵️‍♂️', options: ['què', 'que'], correctAnswer: 'què', explanation: 'Interrogativa indirecta -> Per què. ✅', difficulty: 2, course: '4C' },
    { id: 'rel4c_b7_6', type: 'multiple_choice', question: 'El dia ___ teníem l\'examen. 📅', options: ['que', 'què'], correctAnswer: 'que', explanation: 'Relatiu àton (antecedent dia) -> que. ✅', difficulty: 2, course: '4C' },
    { id: 'rel4c_b7_7', type: 'multiple_choice', question: 'Les galetes ___ vam comprar. 🍪', options: ['que', 'què'], correctAnswer: 'que', explanation: 'Relatiu àton -> que. ✅', difficulty: 2, course: '4C' },
    { id: 'rel4c_b7_8', type: 'multiple_choice', question: 'El pis en ___ visc. 🏢', options: ['què', 'que'], correctAnswer: 'què', explanation: 'Relatiu tònic amb preposició -> Què. ✅', difficulty: 2, course: '4C' },
    { id: 'rel4c_b7_9', type: 'multiple_choice', question: 'No sé ___ fer. 🤷', options: ['què', 'que'], correctAnswer: 'què', explanation: 'Interrogativa indirecta -> Què fer. ✅', difficulty: 2, course: '4C' },
    { id: 'rel4c_b7_10', type: 'multiple_choice', question: 'Fes el ___ vulguis. ✨', options: ['que', 'què'], correctAnswer: 'que', explanation: 'El que (relatiu semànticament neutre però gramaticalment "el" + "que"). ✅', difficulty: 2, course: '4C' },
    { id: 'rel4c_b7_11', type: 'multiple_choice', question: 'Amb ___ vas anar? 🤝', options: ['qui', 'que'], correctAnswer: 'qui', explanation: 'Interrogatiu persona -> Qui. ✅', difficulty: 1, course: '4C' },
    { id: 'rel4c_b7_12', type: 'multiple_choice', question: 'De ___ parles? (Cosa) 📦', options: ['què', 'qui'], correctAnswer: 'què', explanation: 'Interrogatiu cosa -> Què. ✅', difficulty: 1, course: '4C' },
    { id: 'rel4c_b7_13', type: 'multiple_choice', question: 'A ___ esperes? (Persona) ⏳', options: ['qui', 'què'], correctAnswer: 'qui', explanation: 'Interrogatiu persona -> Qui. ✅', difficulty: 1, course: '4C' }
  ]
}];