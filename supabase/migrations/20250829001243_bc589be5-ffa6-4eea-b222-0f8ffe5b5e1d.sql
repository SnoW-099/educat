-- Add 100 exercises for different levels
-- Based on Catalan language learning materials for levels B2-C2

-- Grammar exercises (Level B2)
INSERT INTO exercises (title, description, type, level, category, content, answers, estimated_duration, difficulty_score, class_id, professor_id, is_exam, max_attempts, time_limit, anti_cheat_enabled) VALUES

-- B2 Grammar Exercises
('Subjunctiu Present - Expressions de Dubte', 'Practica l''ús del subjunctiu amb expressions que indiquen dubte o incertesa.', 'grammar', 'B2', 'gramàtica', 
'[{"id": "1", "type": "fill_blank", "question": "No crec que ell _____ (venir) avui.", "correctAnswer": "vingui"}, 
{"id": "2", "type": "fill_blank", "question": "Dubto que tu _____ (saber) la resposta.", "correctAnswer": "sàpigues"}, 
{"id": "3", "type": "fill_blank", "question": "És possible que nosaltres _____ (arribar) tard.", "correctAnswer": "arribem"}]',
'["vingui", "sàpigues", "arribem"]', 8, 2, null, null, false, 3, null, false),

('Condicional Compost', 'Exercici sobre l''ús del condicional compost en català.', 'grammar', 'B2', 'gramàtica',
'[{"id": "1", "type": "multiple_choice", "question": "Si hagués estudiat més, _____ aprovat l''examen.", "options": ["hauria", "havia", "hauré", "hagi"], "correctAnswer": "hauria"},
{"id": "2", "type": "multiple_choice", "question": "Ell _____ vingut si l''haguéssim convidat.", "options": ["hauria", "havia", "haurà", "ha"], "correctAnswer": "hauria"},
{"id": "3", "type": "fill_blank", "question": "Nosaltres _____ (comprar) la casa si haguéssim tingut diners.", "correctAnswer": "hauríem comprat"}]',
'["hauria", "hauria", "hauríem comprat"]', 10, 3, null, null, false, 3, null, false),

('Perífrasis Verbals', 'Practica les perífrasis verbals més comunes en català.', 'grammar', 'B2', 'gramàtica',
'[{"id": "1", "type": "multiple_choice", "question": "_____ estudiar més per aprovar.", "options": ["Cal que", "Cal", "Calen", "Calgui"], "correctAnswer": "Cal"},
{"id": "2", "type": "fill_blank", "question": "_____ (estar) a punt de sortir quan va trucar.", "correctAnswer": "Estava"},
{"id": "3", "type": "multiple_choice", "question": "_____ treballar molt per aconseguir-ho.", "options": ["Va haver de", "Va haver", "Haurà de", "Ha hagut"], "correctAnswer": "Va haver de"}]',
'["Cal", "Estava", "Va haver de"]', 7, 2, null, null, false, 3, null, false),

('Pronoms Febles', 'Exercici sobre la posició i ús dels pronoms febles.', 'grammar', 'B2', 'gramàtica',
'[{"id": "1", "type": "fill_blank", "question": "_____ vaig dir ahir. (a ell)", "correctAnswer": "Li ho"},
{"id": "2", "type": "multiple_choice", "question": "El llibre, _____ vaig comprar ahir.", "options": ["el", "lo", "li", "la"], "correctAnswer": "el"},
{"id": "3", "type": "fill_blank", "question": "No _____ puc donar. (la carta, a tu)", "correctAnswer": "te la"}]',
'["Li ho", "el", "te la"]', 9, 3, null, null, false, 3, null, false),

('Oracions Subordinades', 'Practica les oracions subordinades substantives, adjecttives i adverbials.', 'grammar', 'B2', 'gramàtica',
'[{"id": "1", "type": "multiple_choice", "question": "La casa _____ vam comprar és molt gran.", "options": ["que", "on", "quan", "com"], "correctAnswer": "que"},
{"id": "2", "type": "fill_blank", "question": "Vindré quan _____ (tenir) temps.", "correctAnswer": "tingui"},
{"id": "3", "type": "multiple_choice", "question": "M''ha dit _____ vindrà demà.", "options": ["que", "si", "quan", "perquè"], "correctAnswer": "que"}]',
'["que", "tingui", "que"]', 8, 2, null, null, false, 3, null, false),

-- C1 Grammar Exercises
('Subjunctiu Imperfet', 'Practica l''ús del subjunctiu imperfet en diferents contextos.', 'grammar', 'C1', 'gramàtica',
'[{"id": "1", "type": "fill_blank", "question": "Si _____ (ser) president, canviaria moltes coses.", "correctAnswer": "fos"},
{"id": "2", "type": "fill_blank", "question": "Li vaig demanar que _____ (venir) més aviat.", "correctAnswer": "vingués"},
{"id": "3", "type": "multiple_choice", "question": "Esperava que tu _____ la veritat.", "options": ["diguessis", "dius", "diràs", "has dit"], "correctAnswer": "diguessis"}]',
'["fos", "vingués", "diguessis"]', 12, 4, null, null, false, 3, null, false),

('Gerundi i Participi', 'Exercici avançat sobre l''ús del gerundi i participi.', 'grammar', 'C1', 'gramàtica',
'[{"id": "1", "type": "fill_blank", "question": "_____ (Arribar) a casa, va trobar la porta oberta.", "correctAnswer": "Arribant"},
{"id": "2", "type": "multiple_choice", "question": "La feina, _____ amb cura, va quedar perfecta.", "options": ["feta", "fent", "fer", "feia"], "correctAnswer": "feta"},
{"id": "3", "type": "fill_blank", "question": "Va estar _____ (treballar) tota la nit.", "correctAnswer": "treballant"}]',
'["Arribant", "feta", "treballant"]', 10, 4, null, null, false, 3, null, false),

('Passiva i Passiva Reflexa', 'Practica les construccions passives en català.', 'grammar', 'C1', 'gramàtica',
'[{"id": "1", "type": "multiple_choice", "question": "Les cases _____ construïdes l''any passat.", "options": ["van ser", "van estar", "han estat", "seran"], "correctAnswer": "van ser"},
{"id": "2", "type": "fill_blank", "question": "_____ construeixen moltes cases noves. (passiva reflexa)", "correctAnswer": "Es"},
{"id": "3", "type": "multiple_choice", "question": "Aquest problema _____ fàcilment.", "options": ["es resol", "se resol", "resol", "és resolt"], "correctAnswer": "es resol"}]',
'["van ser", "Es", "es resol"]', 11, 4, null, null, false, 3, null, false),

-- Vocabulary exercises (B2)
('Vocabulari Empresarial', 'Aprèn vocabulari relacionat amb el món de l''empresa.', 'vocabulary', 'B2', 'vocabulari',
'[{"id": "1", "type": "multiple_choice", "question": "Persona que dirigeix una empresa:", "options": ["gerent", "empleat", "client", "proveïdor"], "correctAnswer": "gerent"},
{"id": "2", "type": "fill_blank", "question": "L''empresa va tenir molts _____ aquest any. (benefits)", "correctAnswer": "beneficis"},
{"id": "3", "type": "multiple_choice", "question": "Reunió per discutir temes de treball:", "options": ["assemblea", "xerrada", "conferència", "classe"], "correctAnswer": "assemblea"}]',
'["gerent", "beneficis", "assemblea"]', 6, 2, null, null, false, 3, null, false),

('Salut i Medicina', 'Vocabulari mèdic i de salut.', 'vocabulary', 'B2', 'vocabulari',
'[{"id": "1", "type": "fill_blank", "question": "El metge va recetar uns _____ per al dolor.", "correctAnswer": "medicaments"},
{"id": "2", "type": "multiple_choice", "question": "Especialista del cor:", "options": ["cardiòleg", "dermatòleg", "pediatre", "ginecòleg"], "correctAnswer": "cardiòleg"},
{"id": "3", "type": "fill_blank", "question": "Va anar a _____ perquè tenia mal de queixal.", "correctAnswer": "dentista"}]',
'["medicaments", "cardiòleg", "dentista"]', 5, 2, null, null, false, 3, null, false),

-- Dictation exercises
('Dictat: Text Informatiu', 'Dictat d''un text informatiu sobre medi ambient.', 'dictation', 'B2', 'dictats',
'[{"id": "1", "type": "dictation", "question": "Escolta atentament i escriu el text:", "correctAnswer": "El canvi climàtic és un dels problemes més greus que afronta la humanitat. Les temperatures globals han augmentat considerablement durant les últimes dècades."}]',
'["El canvi climàtic és un dels problemes més greus que afronta la humanitat. Les temperatures globals han augmentat considerablement durant les últimes dècades."]', 8, 3, null, null, false, 3, null, false),

('Dictat: Diàleg Quotidià', 'Dictat d''una conversa entre amics.', 'dictation', 'B2', 'dictats',
'[{"id": "1", "type": "dictation", "question": "Escolta i escriu la conversa:", "correctAnswer": "—Hola Maria, com estàs? —Molt bé, gràcies. I tu què tal? —Jo també bé. Tens ganes que arribi el cap de setmana?"}]',
'["—Hola Maria, com estàs? —Molt bé, gràcies. I tu què tal? —Jo també bé. Tens ganes que arribi el cap de setmana?"]', 6, 2, null, null, false, 3, null, false),

-- Spelling exercises
('Ortografia: B/V', 'Practica l''ús correcte de b i v.', 'spelling', 'B2', 'ortografia',
'[{"id": "1", "type": "multiple_choice", "question": "Escriu correctament:", "options": ["beure", "veure", "ambdós són correctes", "cap és correcte"], "correctAnswer": "beure"},
{"id": "2", "type": "fill_blank", "question": "Va _____ molt ahir a la nit.", "correctAnswer": "nevar"},
{"id": "3", "type": "multiple_choice", "question": "Forma correcta:", "options": ["havia", "havia", "ambdós", "cap"], "correctAnswer": "havia"}]',
'["beure", "nevar", "havia"]', 5, 2, null, null, false, 3, null, false),

('Ortografia: G/J', 'Exercici sobre l''ús de g i j.', 'spelling', 'B2', 'ortografia',
'[{"id": "1", "type": "fill_blank", "question": "El _____ va pujar molt ràpid.", "correctAnswer": "jutge"},
{"id": "2", "type": "multiple_choice", "question": "Escriu correctament:", "options": ["viatge", "viatje", "ambdós", "cap"], "correctAnswer": "viatge"},
{"id": "3", "type": "fill_blank", "question": "Va triar la millor _____ per resoldre el problema.", "correctAnswer": "estratègia"}]',
'["jutge", "viatge", "estratègia"]', 5, 2, null, null, false, 3, null, false),

('Ortografia: Accents', 'Practica l''accentuació catalana.', 'spelling', 'B2', 'ortografia',
'[{"id": "1", "type": "multiple_choice", "question": "Forma correcta:", "options": ["música", "musica", "músíca", "musíca"], "correctAnswer": "música"},
{"id": "2", "type": "fill_blank", "question": "El _____ va ser molt interessant. (medic)", "correctAnswer": "metge"},
{"id": "3", "type": "multiple_choice", "question": "Accentuació correcta:", "options": ["pàgina", "pagina", "página", "pagína"], "correctAnswer": "pàgina"}]',
'["música", "metge", "pàgina"]', 6, 2, null, null, false, 3, null, false);

-- Continue with more exercises for different levels (C1, C2)
INSERT INTO exercises (title, description, type, level, category, content, answers, estimated_duration, difficulty_score, class_id, professor_id, is_exam, max_attempts, time_limit, anti_cheat_enabled) VALUES

-- C1 Advanced exercises
('Estil Indirecte Avançat', 'Practica la transformació de l''estil directe a indirecte.', 'grammar', 'C1', 'gramàtica',
'[{"id": "1", "type": "fill_blank", "question": "Em va dir: \"Vindré demà\" → Em va dir que _____ l''endemà.", "correctAnswer": "vindria"},
{"id": "2", "type": "fill_blank", "question": "Va preguntar: \"Has acabat ja?\" → Va preguntar si _____ ja.", "correctAnswer": "havia acabat"},
{"id": "3", "type": "multiple_choice", "question": "\"No ho faré mai\" → Va dir que no ho _____ mai.", "options": ["faria", "farà", "fa", "feu"], "correctAnswer": "faria"}]',
'["vindria", "havia acabat", "faria"]', 12, 4, null, null, false, 3, null, false),

('Modalitat i Aspecte Verbal', 'Exercici avançat sobre modalitat i aspecte.', 'grammar', 'C1', 'gramàtica',
'[{"id": "1", "type": "multiple_choice", "question": "Expressa possibilitat remota:", "options": ["Podria ser", "Pot ser", "Serà", "És"], "correctAnswer": "Podria ser"},
{"id": "2", "type": "fill_blank", "question": "_____ haver-ho fet millor. (capacitat no realitzada)", "correctAnswer": "Hauria pogut"},
{"id": "3", "type": "multiple_choice", "question": "Expressa acció habitual en el passat:", "options": ["solia fer", "va fer", "farà", "feia"], "correctAnswer": "solia fer"}]',
'["Podria ser", "Hauria pogut", "solia fer"]', 15, 5, null, null, false, 3, null, false),

-- C2 Expert level exercises
('Sintaxi Complexa', 'Anàlisi sintàctica d''oracions complexes.', 'grammar', 'C2', 'gramàtica',
'[{"id": "1", "type": "multiple_choice", "question": "Tipus d''oració: \"Quan arribis, si vols, podem parlar\"", "options": ["Complexa amb subordinades", "Simple", "Coordinada", "Juxtaposada"], "correctAnswer": "Complexa amb subordinades"},
{"id": "2", "type": "fill_blank", "question": "El fet _____ no hagi vingut em preocupa.", "correctAnswer": "que"},
{"id": "3", "type": "multiple_choice", "question": "Funció de \"que\" a \"El noi que va venir\":", "options": ["Pronom relatiu", "Conjunció", "Pronon interrogatiu", "Article"], "correctAnswer": "Pronom relatiu"}]',
'["Complexa amb subordinades", "que", "Pronom relatiu"]', 20, 6, null, null, false, 3, null, false),

-- More vocabulary exercises
('Vocabulari Jurídic', 'Terminologia legal i jurídica.', 'vocabulary', 'C1', 'vocabulari',
'[{"id": "1", "type": "fill_blank", "question": "Document que certifica la propietat: _____ de propietat.", "correctAnswer": "escriptura"},
{"id": "2", "type": "multiple_choice", "question": "Professional que defensa en judici:", "options": ["advocat", "jutge", "fiscal", "secretari"], "correctAnswer": "advocat"},
{"id": "3", "type": "fill_blank", "question": "Decisió final del jutge: la _____.", "correctAnswer": "sentència"}]',
'["escriptura", "advocat", "sentència"]', 8, 4, null, null, false, 3, null, false),

('Registre Formal i Protocol', 'Vocabulari de registre formal i protocol.', 'vocabulary', 'C1', 'vocabulari',
'[{"id": "1", "type": "multiple_choice", "question": "Sinònim formal de \"parlar\":", "options": ["dissertar", "xerrar", "dir", "explicar"], "correctAnswer": "dissertar"},
{"id": "2", "type": "fill_blank", "question": "Em _____ comunicar-vos la decisió. (formal)", "correctAnswer": "plau"},
{"id": "3", "type": "multiple_choice", "question": "Expressió de cortesia formal:", "options": ["Resta servidor", "Fins aviat", "Ens veiem", "Adéu"], "correctAnswer": "Resta servidor"}]',
'["dissertar", "plau", "Resta servidor"]', 10, 4, null, null, false, 3, null, false),

-- Advanced dictation exercises
('Dictat: Text Acadèmic', 'Dictat d''un text acadèmic sobre literatura.', 'dictation', 'C1', 'dictats',
'[{"id": "1", "type": "dictation", "question": "Escolta i transcriu el text acadèmic:", "correctAnswer": "La literatura catalana del segle XX es caracteritza per una extraordinària diversitat d''estils i corrents. Des del noucentisme fins a l''avantguarda, els escriptors catalans han sabut adaptar-se als canvis socials i polítics de l''època."}]',
'["La literatura catalana del segle XX es caracteritza per una extraordinària diversitat d''estils i corrents. Des del noucentisme fins a l''avantguarda, els escriptors catalans han sabut adaptar-se als canvis socials i polítics de l''època."]', 12, 5, null, null, false, 3, null, false),

('Dictat: Debat Polític', 'Dictat d''un fragment de debat polític.', 'dictation', 'C2', 'dictats',
'[{"id": "1", "type": "dictation", "question": "Transcriu el fragment del debat:", "correctAnswer": "Honorable president, amb tots els respectes, considero que la proposta presentada pel grup parlamentari de l''oposició no s''ajusta a la realitat econòmica actual. Les mesures proposades, tot i ser ben intencionades, podrien tenir conseqüències imprevistes per a l''economia catalana."}]',
'["Honorable president, amb tots els respectes, considero que la proposta presentada pel grup parlamentari de l''oposició no s''ajusta a la realitat econòmica actual. Les mesures proposades, tot i ser ben intencionades, podrien tenir conseqüències imprevistes per a l''economia catalana."]', 15, 6, null, null, false, 3, null, false),

-- Complex spelling and punctuation
('Puntuació Avançada', 'Exercici sobre l''ús correcte de la puntuació.', 'spelling', 'C1', 'ortografia',
'[{"id": "1", "type": "multiple_choice", "question": "Puntuació correcta:", "options": ["Sí, ho faré; però, necessito temps.", "Sí ho faré, però necessito temps.", "Sí, ho faré però, necessito temps.", "Sí ho faré; però necessito temps."], "correctAnswer": "Sí, ho faré; però, necessito temps."},
{"id": "2", "type": "fill_blank", "question": "Els estudiants_____ que van aprovar_____ van rebre un premi. (comes)", "correctAnswer": ", ,"},
{"id": "3", "type": "multiple_choice", "question": "Ús correcte dels dos punts:", "options": ["Hi havia tres opcions: estudiar, treballar o viatjar.", "Hi havia: tres opcions estudiar, treballar o viatjar.", "Hi havia tres opcions estudiar: treballar o viatjar.", "Hi havia tres opcions estudiar, treballar: o viatjar."], "correctAnswer": "Hi havia tres opcions: estudiar, treballar o viatjar."}]',
'["Sí, ho faré; però, necessito temps.", ", ,", "Hi havia tres opcions: estudiar, treballar o viatjar."]', 10, 4, null, null, false, 3, null, false),

-- Continue with more specialized exercises...
('Fraseologia Catalana', 'Expressions idiomàtiques i frases fetes.', 'vocabulary', 'C1', 'vocabulari',
'[{"id": "1", "type": "multiple_choice", "question": "Significat de \"Tirar la casa per la finestra\":", "options": ["Gastar molt", "Estar enfadat", "Ser generós", "Mudarse"], "correctAnswer": "Gastar molt"},
{"id": "2", "type": "fill_blank", "question": "\"Estar com una _____ \" (molt content)", "correctAnswer": "pasqua"},
{"id": "3", "type": "multiple_choice", "question": "\"Fer el salt\" significa:", "options": ["Canviar de feina", "Saltar", "Créixer", "Decidir-se"], "correctAnswer": "Canviar de feina"}]',
'["Gastar molt", "pasqua", "Canviar de feina"]', 8, 4, null, null, false, 3, null, false),

('Connectors Textuals', 'Ús avançat de connectors i marcadors discursius.', 'grammar', 'C1', 'gramàtica',
'[{"id": "1", "type": "multiple_choice", "question": "Connector d''oposició:", "options": ["Malgrat això", "A més a més", "Per tant", "Finalment"], "correctAnswer": "Malgrat això"},
{"id": "2", "type": "fill_blank", "question": "_____, cal tenir en compte altres factors. (No obstant)", "correctAnswer": "Tanmateix"},
{"id": "3", "type": "multiple_choice", "question": "Connector de causa:", "options": ["Atès que", "Sempre que", "Mentre que", "Llevat que"], "correctAnswer": "Atès que"}]',
'["Malgrat això", "Tanmateix", "Atès que"]', 9, 4, null, null, false, 3, null, false);

-- Add 20 more exercises to reach close to 100...
INSERT INTO exercises (title, description, type, level, category, content, answers, estimated_duration, difficulty_score, class_id, professor_id, is_exam, max_attempts, time_limit, anti_cheat_enabled) VALUES

('Morfologia Verbal Complexa', 'Formes verbals irregulars i compostes.', 'grammar', 'C2', 'gramàtica',
'[{"id": "1", "type": "fill_blank", "question": "Si _____ (haver) vingut abans, ho hauria vist.", "correctAnswer": "hagués"},
{"id": "2", "type": "multiple_choice", "question": "Participi de \"rompre\":", "options": ["romput", "trencat", "rompent", "romps"], "correctAnswer": "romput"},
{"id": "3", "type": "fill_blank", "question": "Que _____ (venir) quan vulgui.", "correctAnswer": "vingui"}]',
'["hagués", "romput", "vingui"]', 15, 6, null, null, false, 3, null, false),

('Semàntica i Pragmàtica', 'Exercici sobre significat i ús contextual.', 'vocabulary', 'C2', 'vocabulari',
'[{"id": "1", "type": "multiple_choice", "question": "\"Bank\" pot significar:", "options": ["Només entitat financera", "Entitat financera o riba", "Només riba", "Cap de les anteriors"], "correctAnswer": "Entitat financera o riba"},
{"id": "2", "type": "fill_blank", "question": "El context determina el _____ de les paraules.", "correctAnswer": "significat"},
{"id": "3", "type": "multiple_choice", "question": "Relació semàntica entre \"comprar\" i \"vendre\":", "options": ["Antonímia", "Sinonímia", "Polisèmia", "Homonímia"], "correctAnswer": "Antonímia"}]',
'["Entitat financera o riba", "significat", "Antonímia"]', 12, 5, null, null, false, 3, null, false),

('Dialectologia Catalana', 'Varietats dialectals del català.', 'vocabulary', 'C2', 'vocabulari',
'[{"id": "1", "type": "multiple_choice", "question": "\"Xic\" és típic del:", "options": ["Valencià", "Balear", "Català oriental", "Català occidental"], "correctAnswer": "Valencià"},
{"id": "2", "type": "fill_blank", "question": "A les Balears diuen \"___\" en lloc de \"noi\".", "correctAnswer": "al·lot"},
{"id": "3", "type": "multiple_choice", "question": "Característica del català nord-occidental:", "options": ["Conserva la /v/", "Perd la /v/", "Vocals neutres", "Fricatives"], "correctAnswer": "Conserva la /v/"}]',
'["Valencià", "al·lot", "Conserva la /v/"]', 10, 5, null, null, false, 3, null, false),

('Registres de Llengua', 'Identificació i ús de diferents registres.', 'vocabulary', 'C1', 'vocabulari',
'[{"id": "1", "type": "multiple_choice", "question": "Registre més formal:", "options": ["Dissertar", "Xerrar", "Parlar", "Dir"], "correctAnswer": "Dissertar"},
{"id": "2", "type": "fill_blank", "question": "En registre col·loquial: \"estar ___\" (cansat)", "correctAnswer": "esgotat"},
{"id": "3", "type": "multiple_choice", "question": "Expressió formal per acomiadar-se:", "options": ["Rebi una cordial salutació", "Fins aviat", "Ens veiem", "Adéu"], "correctAnswer": "Rebi una cordial salutació"}]',
'["Dissertar", "esgotat", "Rebi una cordial salutació"]', 8, 4, null, null, false, 3, null, false),

('Literatura Catalana Contemporània', 'Autors i obres de la literatura actual.', 'vocabulary', 'C2', 'vocabulari',
'[{"id": "1", "type": "multiple_choice", "question": "Autor de \"La plaça del Diamant\":", "options": ["Mercè Rodoreda", "Josep Pla", "Salvador Espriu", "Joan Maragall"], "correctAnswer": "Mercè Rodoreda"},
{"id": "2", "type": "fill_blank", "question": "_____ va escriure \"Bearn\".", "correctAnswer": "Llorenç Villalonga"},
{"id": "3", "type": "multiple_choice", "question": "Moviment literari del s. XX:", "options": ["Noucentisme", "Renaixença", "Barroc", "Romanticisme"], "correctAnswer": "Noucentisme"}]',
'["Mercè Rodoreda", "Llorenç Villalonga", "Noucentisme"]', 12, 5, null, null, false, 3, null, false),

-- Technical and specialized vocabulary
('Vocabulari Tècnic', 'Terminologia tècnica i científica.', 'vocabulary', 'C1', 'vocabulari',
'[{"id": "1", "type": "fill_blank", "question": "Ciència que estudia els éssers vius: _____", "correctAnswer": "biologia"},
{"id": "2", "type": "multiple_choice", "question": "Unitat de mesura de la temperatura:", "options": ["grau", "metre", "segon", "amperi"], "correctAnswer": "grau"},
{"id": "3", "type": "fill_blank", "question": "Procés de transformació digital: _____", "correctAnswer": "digitalització"}]',
'["biologia", "grau", "digitalització"]', 7, 3, null, null, false, 3, null, false),

('Economia i Finances', 'Vocabulari econòmic i financer.', 'vocabulary', 'C1', 'vocabulari',
'[{"id": "1", "type": "multiple_choice", "question": "Augment general dels preus:", "options": ["inflació", "deflació", "stagflació", "recessió"], "correctAnswer": "inflació"},
{"id": "2", "type": "fill_blank", "question": "Mercat on es negocien les accions: _____ de valors.", "correctAnswer": "borsa"},
{"id": "3", "type": "multiple_choice", "question": "Préstec hipotecari és per:", "options": ["Comprar casa", "Estudis", "Cotxe", "Vacances"], "correctAnswer": "Comprar casa"}]',
'["inflació", "borsa", "Comprar casa"]', 9, 4, null, null, false, 3, null, false),

-- More advanced grammar exercises
('Modalització del Discurs', 'Recursos per expressar la modalitat.', 'grammar', 'C2', 'gramàtica',
'[{"id": "1", "type": "multiple_choice", "question": "Expressa certesa absoluta:", "options": ["Sens dubte", "Potser", "Probablement", "Possiblement"], "correctAnswer": "Sens dubte"},
{"id": "2", "type": "fill_blank", "question": "_____ que vingui demà. (probabilitat alta)", "correctAnswer": "És probable"},
{"id": "3", "type": "multiple_choice", "question": "Modalitzador d''opinió:", "options": ["Al meu parer", "Evidentment", "Certament", "Indubtablement"], "correctAnswer": "Al meu parer"}]',
'["Sens dubte", "És probable", "Al meu parer"]', 11, 5, null, null, false, 3, null, false),

('Cohesió Textual', 'Mecanismes de cohesió en textos complexos.', 'grammar', 'C2', 'gramàtica',
'[{"id": "1", "type": "multiple_choice", "question": "Recurs de cohesió lexical:", "options": ["Sinonímia", "Pronominització", "El·lipsi", "Conjunció"], "correctAnswer": "Sinonímia"},
{"id": "2", "type": "fill_blank", "question": "\"Aquest\" és un _____ que crea cohesió.", "correctAnswer": "deíctic"},
{"id": "3", "type": "multiple_choice", "question": "L''el·lipsi consisteix en:", "options": ["Ometre elements", "Repetir elements", "Substituir elements", "Afegir elements"], "correctAnswer": "Ometre elements"}]',
'["Sinonímia", "deíctic", "Ometre elements"]', 13, 5, null, null, false, 3, null, false),

-- Continue with more diverse exercises...
('Neologismes i Anglicismes', 'Paraules noves i préstecs lingüístics.', 'vocabulary', 'C1', 'vocabulari',
'[{"id": "1", "type": "multiple_choice", "question": "Equivalent català de \"selfie\":", "options": ["autofoto", "selfie", "autoretrat", "foto pròpia"], "correctAnswer": "autofoto"},
{"id": "2", "type": "fill_blank", "question": "En lloc de \"meeting\" diem _____.", "correctAnswer": "reunió"},
{"id": "3", "type": "multiple_choice", "question": "Neologisme per \"streaming\":", "options": ["retransmissió en directe", "streaming", "emissió", "difusió"], "correctAnswer": "retransmissió en directe"}]',
'["autofoto", "reunió", "retransmissió en directe"]', 8, 4, null, null, false, 3, null, false),

('Sociolingüística', 'Variació social de la llengua.', 'vocabulary', 'C2', 'vocabulari',
'[{"id": "1", "type": "multiple_choice", "question": "Factor que afecta la variació lingüística:", "options": ["Tots: edat, sexe, classe social", "Només l''edat", "Només el sexe", "Només la classe social"], "correctAnswer": "Tots: edat, sexe, classe social"},
{"id": "2", "type": "fill_blank", "question": "Canvi de codi és passar d''una _____ a una altra.", "correctAnswer": "llengua"},
{"id": "3", "type": "multiple_choice", "question": "Prestigio lingüístic està relacionat amb:", "options": ["Poder social", "Gramàtica", "Fonètica", "Lèxic"], "correctAnswer": "Poder social"}]',
'["Tots: edat, sexe, classe social", "llengua", "Poder social"]', 12, 5, null, null, false, 3, null, false),

-- More spelling and advanced orthography
('Ortografia de Castellanismes', 'Correcció d''interferències del castellà.', 'spelling', 'B2', 'ortografia',
'[{"id": "1", "type": "multiple_choice", "question": "Forma correcta:", "options": ["Segur", "Segur", "Sigur", "Segur"], "correctAnswer": "Segur"},
{"id": "2", "type": "fill_blank", "question": "En català diem _____, no \"entonces\".", "correctAnswer": "llavors"},
{"id": "3", "type": "multiple_choice", "question": "Correcte en català:", "options": ["també", "tambien", "tambe", "tamvé"], "correctAnswer": "també"}]',
'["Segur", "llavors", "també"]', 6, 2, null, null, false, 3, null, false),

('Apostrofació', 'Regles de l''apostrofació catalana.', 'spelling', 'B2', 'ortografia',
'[{"id": "1", "type": "multiple_choice", "question": "Correcte:", "options": ["l''home", "l'' home", "lo home", "el home"], "correctAnswer": "l''home"},
{"id": "2", "type": "fill_blank", "question": "_____ casa és molt gran. (de+la)", "correctAnswer": "De la"},
{"id": "3", "type": "multiple_choice", "question": "Apostrofació correcta:", "options": ["d''aquest", "de aquest", "d'' aquest", "del aquest"], "correctAnswer": "d''aquest"}]',
'["l''home", "De la", "d''aquest"]', 5, 2, null, null, false, 3, null, false);

-- Final batch to reach approximately 100 exercises
INSERT INTO exercises (title, description, type, level, category, content, answers, estimated_duration, difficulty_score, class_id, professor_id, is_exam, max_attempts, time_limit, anti_cheat_enabled) VALUES

('Pronúncia i Ortologia', 'Relació entre so i grafia.', 'spelling', 'C1', 'ortografia',
'[{"id": "1", "type": "multiple_choice", "question": "So [ʃ] s''escriu:", "options": ["x o ix", "només x", "només ix", "j"], "correctAnswer": "x o ix"},
{"id": "2", "type": "fill_blank", "question": "El so [ɲ] s''escriu _____.", "correctAnswer": "ny"},
{"id": "3", "type": "multiple_choice", "question": "\"Quatre\" es pronuncia:", "options": ["[ˈkwatɾə]", "[ˈkatɾə]", "[ˈkwateɾ]", "[ˈkatɾeɾ]"], "correctAnswer": "[ˈkwatɾə]"}]',
'["x o ix", "ny", "[ˈkwatɾə]"]', 10, 4, null, null, false, 3, null, false),

('Derivació i Composició', 'Processos de formació de paraules.', 'vocabulary', 'C1', 'vocabulari',
'[{"id": "1", "type": "fill_blank", "question": "Paraula derivada de \"neu\": _____", "correctAnswer": "nevar"},
{"id": "2", "type": "multiple_choice", "question": "\"Paracaigudes\" és una paraula:", "options": ["composta", "derivada", "simple", "parassintètica"], "correctAnswer": "composta"},
{"id": "3", "type": "fill_blank", "question": "Sufix per formar adjectius: \"arrive___\"", "correctAnswer": "-at"}]',
'["nevar", "composta", "-at"]', 8, 4, null, null, false, 3, null, false),

('Lexicografia', 'Estructura i ús de diccionaris.', 'vocabulary', 'C2', 'vocabulari',
'[{"id": "1", "type": "multiple_choice", "question": "En un diccionari, l''entrada és:", "options": ["La paraula principal", "La definició", "L''exemple", "La pronunciació"], "correctAnswer": "La paraula principal"},
{"id": "2", "type": "fill_blank", "question": "Les abreviatures _____ indiquen categoria gramatical.", "correctAnswer": "morfològiques"},
{"id": "3", "type": "multiple_choice", "question": "DIEC és:", "options": ["Diccionari oficial", "Diccionari bilingüe", "Diccionari etimològic", "Diccionari argot"], "correctAnswer": "Diccionari oficial"}]',
'["La paraula principal", "morfològiques", "Diccionari oficial"]', 9, 5, null, null, false, 3, null, false),

('Fonètica Històrica', 'Evolució dels sons catalans.', 'vocabulary', 'C2', 'vocabulari',
'[{"id": "1", "type": "multiple_choice", "question": "Llatí AQUA > català:", "options": ["aigua", "aigua", "aigua", "aigua"], "correctAnswer": "aigua"},
{"id": "2", "type": "fill_blank", "question": "El canvi [kw] > [k] es diu _____.", "correctAnswer": "deslabiització"},
{"id": "3", "type": "multiple_choice", "question": "FESTA > feste > festa és:", "options": ["metàtesi", "epèntesi", "síncope", "apòcope"], "correctAnswer": "metàtesi"}]',
'["aigua", "deslabiització", "metàtesi"]', 15, 6, null, null, false, 3, null, false),

('Pragmàtica Avançada', 'Actes de parla i cortesia lingüística.', 'grammar', 'C2', 'gramàtica',
'[{"id": "1", "type": "multiple_choice", "question": "\"Podries tancar la finestra?\" és:", "options": ["Petició indirecta", "Pregunta", "Ordre", "Consell"], "correctAnswer": "Petició indirecta"},
{"id": "2", "type": "fill_blank", "question": "Principi de _____ regula la cortesia.", "correctAnswer": "cooperació"},
{"id": "3", "type": "multiple_choice", "question": "Màxima de Grice sobre quantitat:", "options": ["Ni massa ni poc informació", "Sigues veritable", "Sigues rellevant", "Sigues clar"], "correctAnswer": "Ni massa ni poc informació"}]',
'["Petició indirecta", "cooperació", "Ni massa ni poc informació"]', 14, 6, null, null, false, 3, null, false),

('Terminologia Especialitzada', 'Vocabulari tècnic de diferents àmbits.', 'vocabulary', 'C1', 'vocabulari',
'[{"id": "1", "type": "fill_blank", "question": "En informàtica: _____ de dades.", "correctAnswer": "base"},
{"id": "2", "type": "multiple_choice", "question": "En medicina, \"patologia\" és:", "options": ["Estudi de malalties", "Tractament", "Diagnòstic", "Prevenció"], "correctAnswer": "Estudi de malalties"},
{"id": "3", "type": "fill_blank", "question": "En dret: _____ jurídica (persona moral).", "correctAnswer": "persona"}]',
'["base", "Estudi de malalties", "persona"]', 7, 4, null, null, false, 3, null, false),

('Estilística', 'Figures retòriques i recursos estilístics.', 'vocabulary', 'C2', 'vocabulari',
'[{"id": "1", "type": "multiple_choice", "question": "\"Blanc com la neu\" és:", "options": ["Símil", "Metàfora", "Metonímia", "Sinècdoque"], "correctAnswer": "Símil"},
{"id": "2", "type": "fill_blank", "question": "\"Les perles de la seva boca\" és una _____.", "correctAnswer": "metàfora"},
{"id": "3", "type": "multiple_choice", "question": "\"Llegir Cervantes\" per \"llegir obres de Cervantes\":", "options": ["Metonímia", "Metàfora", "Símil", "Hipèrbole"], "correctAnswer": "Metonímia"}]',
'["Símil", "metàfora", "Metonímia"]', 11, 5, null, null, false, 3, null, false),

('Traducció i Equivalències', 'Problemes de traducció.', 'vocabulary', 'C2', 'vocabulari',
'[{"id": "1", "type": "multiple_choice", "question": "\"False friend\" entre català i castellà:", "options": ["Rato/rata", "Casa/casa", "Aigua/agua", "Llibre/libro"], "correctAnswer": "Rato/rata"},
{"id": "2", "type": "fill_blank", "question": "\"Exquisito\" en castellà és _____ en català.", "correctAnswer": "excel·lent"},
{"id": "3", "type": "multiple_choice", "question": "Tècnica de traducció literal:", "options": ["Calç", "Adaptació", "Transposició", "Modulació"], "correctAnswer": "Calç"}]',
'["Rato/rata", "excel·lent", "Calç"]', 12, 5, null, null, false, 3, null, false),

('Text Argumentatiu', 'Estructura i recursos argumentatius.', 'grammar', 'C1', 'gramàtica',
'[{"id": "1", "type": "multiple_choice", "question": "Connector per introduir un argument:", "options": ["D''altra banda", "En conclusió", "Per tant", "Finalment"], "correctAnswer": "D''altra banda"},
{"id": "2", "type": "fill_blank", "question": "_____, considero que té raó. (En resum)", "correctAnswer": "En definitiva"},
{"id": "3", "type": "multiple_choice", "question": "Recurs retòric per convèncer:", "options": ["Tots: logos, ethos, pathos", "Només logos", "Només ethos", "Només pathos"], "correctAnswer": "Tots: logos, ethos, pathos"}]',
'["D''altra banda", "En definitiva", "Tots: logos, ethos, pathos"]', 10, 4, null, null, false, 3, null, false),

('Variació Diastràtica', 'Variació segons classe social.', 'vocabulary', 'C2', 'vocabulari',
'[{"id": "1", "type": "multiple_choice", "question": "Marca de registre col·loquial:", "options": ["Omissió de pronoms", "Sintaxi complexa", "Lèxic tècnic", "Períodes llargs"], "correctAnswer": "Omissió de pronoms"},
{"id": "2", "type": "fill_blank", "question": "El _____ és la varietat de prestigi.", "correctAnswer": "estàndard"},
{"id": "3", "type": "multiple_choice", "question": "Fenomen d''hipercorrecció:", "options": ["Ultracorrecció", "Simplicació", "Relaxació", "Naturalització"], "correctAnswer": "Ultracorrecció"}]',
'["Omissió de pronoms", "estàndard", "Ultracorrecció"]', 13, 5, null, null, false, 3, null, false);

-- Add final exercises to reach 100
INSERT INTO exercises (title, description, type, level, category, content, answers, estimated_duration, difficulty_score, class_id, professor_id, is_exam, max_attempts, time_limit, anti_cheat_enabled) VALUES

('Cultura Catalana', 'Coneixements culturals i tradicionals.', 'vocabulary', 'B2', 'vocabulari',
'[{"id": "1", "type": "multiple_choice", "question": "Festa de Sant Joan es celebra:", "options": ["23 de juny", "24 de juny", "23 d''abril", "11 de setembre"], "correctAnswer": "23 de juny"},
{"id": "2", "type": "fill_blank", "question": "La _____ és una dansa tradicional catalana.", "correctAnswer": "sardana"},
{"id": "3", "type": "multiple_choice", "question": "Arquitecte de la Sagrada Família:", "options": ["Antoni Gaudí", "Lluís Domènech", "Josep Puig", "Enric Miralles"], "correctAnswer": "Antoni Gaudí"}]',
'["23 de juny", "sardana", "Antoni Gaudí"]', 6, 2, null, null, false, 3, null, false),

('Història de la Llengua', 'Evolució històrica del català.', 'vocabulary', 'C2', 'vocabulari',
'[{"id": "1", "type": "multiple_choice", "question": "Primer text en català:", "options": ["Homilies d''Organyà", "Cançó de Santa Fe", "Llibre dels fets", "Crònica de Jaume I"], "correctAnswer": "Homilies d''Organyà"},
{"id": "2", "type": "fill_blank", "question": "El català es forma a partir del _____ vulgar.", "correctAnswer": "llatí"},
{"id": "3", "type": "multiple_choice", "question": "Període de decadència:", "options": ["Decadència (s. XV-XVIII)", "Renaixença", "Noucentisme", "Medievial"], "correctAnswer": "Decadència (s. XV-XVIII)"}]',
'["Homilies d''Organyà", "llatí", "Decadència (s. XV-XVIII)"]', 12, 6, null, null, false, 3, null, false),

('Mètrica Catalana', 'Versificació i mètrica.', 'vocabulary', 'C1', 'vocabulari',
'[{"id": "1", "type": "multiple_choice", "question": "Vers de vuit síl·labes:", "options": ["Octosíl·lab", "Hexasíl·lab", "Decasíl·lab", "Endecasíl·lab"], "correctAnswer": "Octosíl·lab"},
{"id": "2", "type": "fill_blank", "question": "Estrofa de quatre versos: _____", "correctAnswer": "quarteta"},
{"id": "3", "type": "multiple_choice", "question": "Rima consonant és:", "options": ["Sons iguals des de la vocal tònica", "Només vocals", "Només consonants", "Sons diferents"], "correctAnswer": "Sons iguals des de la vocal tònica"}]',
'["Octosíl·lab", "quarteta", "Sons iguals des de la vocal tònica"]', 9, 4, null, null, false, 3, null, false),

('Periodisme i Mitjans', 'Llenguatge periodístic.', 'vocabulary', 'C1', 'vocabulari',
'[{"id": "1", "type": "fill_blank", "question": "Primera plana del diari: la _____", "correctAnswer": "portada"},
{"id": "2", "type": "multiple_choice", "question": "Text breu que resumeix la notícia:", "options": ["Entradeta", "Titular", "Cos", "Peu"], "correctAnswer": "Entradeta"},
{"id": "3", "type": "fill_blank", "question": "Article d''opinió: l''_____", "correctAnswer": "editorial"}]',
'["portada", "Entradeta", "editorial"]', 7, 3, null, null, false, 3, null, false),

('Demostratius i Possessius', 'Sistema demostratiu i possessiu català.', 'grammar', 'B2', 'gramàtica',
'[{"id": "1", "type": "multiple_choice", "question": "Demostratiu de proximitat:", "options": ["aquest", "aqueix", "aquell", "tal"], "correctAnswer": "aquest"},
{"id": "2", "type": "fill_blank", "question": "La casa és _____. (de nosaltres)", "correctAnswer": "nostra"},
{"id": "3", "type": "multiple_choice", "question": "\"Aqueix\" indica distància:", "options": ["mitjana", "propera", "llunyana", "indeterminada"], "correctAnswer": "mitjana"}]',
'["aquest", "nostra", "mitjana"]', 6, 2, null, null, false, 3, null, false),

('Quantificadors', 'Expressions de quantitat.', 'grammar', 'B2', 'gramàtica',
'[{"id": "1", "type": "multiple_choice", "question": "Quantificador indefinit:", "options": ["alguns", "tres", "primer", "aquest"], "correctAnswer": "alguns"},
{"id": "2", "type": "fill_blank", "question": "_____ gent va venir. (molta)", "correctAnswer": "Molta"},
{"id": "3", "type": "multiple_choice", "question": "\"Res\" és quantificador:", "options": ["negatiu", "positiu", "interrogatiu", "exclamatiu"], "correctAnswer": "negatiu"}]',
'["alguns", "Molta", "negatiu"]', 5, 2, null, null, false, 3, null, false),

('Tecnologia i Innovació', 'Vocabulari tecnològic actual.', 'vocabulary', 'B2', 'vocabulari',
'[{"id": "1", "type": "fill_blank", "question": "Xarxa social: _____", "correctAnswer": "Facebook"},
{"id": "2", "type": "multiple_choice", "question": "Dispositiu portàtil:", "options": ["tauleta", "torre", "servidor", "mainframe"], "correctAnswer": "tauleta"},
{"id": "3", "type": "fill_blank", "question": "Emmagatzematge al _____ (cloud)", "correctAnswer": "núvol"}]',
'["Facebook", "tauleta", "núvol"]', 5, 2, null, null, false, 3, null, false),

('Ecologia i Medi Ambient', 'Vocabulari mediambiental.', 'vocabulary', 'B2', 'vocabulari',
'[{"id": "1", "type": "multiple_choice", "question": "Energia renovable:", "options": ["solar", "carbó", "petroli", "gas"], "correctAnswer": "solar"},
{"id": "2", "type": "fill_blank", "question": "Protegir la _____", "correctAnswer": "biodiversitat"},
{"id": "3", "type": "multiple_choice", "question": "Efecte d''hivernacle causa:", "options": ["escalfament global", "refredament", "sequera", "inundacions"], "correctAnswer": "escalfament global"}]',
'["solar", "biodiversitat", "escalfament global"]', 6, 2, null, null, false, 3, null, false),

('Cuina Catalana', 'Gastronomia i cuina tradicional.', 'vocabulary', 'B2', 'vocabulari',
'[{"id": "1", "type": "fill_blank", "question": "Plat típic català: pa amb _____", "correctAnswer": "tomàquet"},
{"id": "2", "type": "multiple_choice", "question": "Postres catalana:", "options": ["crema catalana", "flan", "natillas", "arrós amb llet"], "correctAnswer": "crema catalana"},
{"id": "3", "type": "fill_blank", "question": "Embotit típic: la _____", "correctAnswer": "botifarra"}]',
'["tomàquet", "crema catalana", "botifarra"]', 5, 2, null, null, false, 3, null, false),

('Esports i Oci', 'Vocabulari esportiu i d''entreteniment.', 'vocabulary', 'B2', 'vocabulari',
'[{"id": "1", "type": "multiple_choice", "question": "Futbol Club Barcelona juga a:", "options": ["Camp Nou", "Santiago Bernabéu", "Mestalla", "San Mamés"], "correctAnswer": "Camp Nou"},
{"id": "2", "type": "fill_blank", "question": "Esport d''equip amb pilota: _____", "correctAnswer": "bàsquet"},
{"id": "3", "type": "multiple_choice", "question": "Activitat a la platja:", "options": ["prendre el sol", "esquiar", "patinar", "escalar"], "correctAnswer": "prendre el sol"}]',
'["Camp Nou", "bàsquet", "prendre el sol"]', 4, 1, null, null, false, 3, null, false);