-- Create a function to automatically generate daily exercises for all classes
CREATE OR REPLACE FUNCTION generate_daily_exercises()
RETURNS void AS $$
DECLARE
    class_record RECORD;
    exercise_data JSONB;
    answers_data JSONB;
    today_date DATE := CURRENT_DATE;
BEGIN
    -- Loop through all active classes
    FOR class_record IN 
        SELECT id, level, allow_all_levels 
        FROM classes 
        WHERE is_active = true
    LOOP
        -- Delete old exercises (older than 7 days) to keep fresh content
        DELETE FROM exercises 
        WHERE class_id = class_record.id 
        AND created_at::date < today_date - INTERVAL '7 days'
        AND title LIKE 'Exercici diari%';
        
        -- Generate A1 level exercises (basic)
        IF class_record.level = 'A1' OR class_record.allow_all_levels THEN
            -- Grammar exercise A1
            exercise_data := '[
                {
                    "id": "q1",
                    "type": "multiple_choice",
                    "question": "Completa: Jo ___ català.",
                    "options": ["parlo", "parles", "parla", "parlem"],
                    "correctAnswer": "parlo"
                },
                {
                    "id": "q2",
                    "type": "fill_blank",
                    "question": "Completa amb l''article correcte: ___ casa és gran.",
                    "correctAnswer": "La"
                },
                {
                    "id": "q3",
                    "type": "multiple_choice",
                    "question": "Quin és el plural de ''gat''?",
                    "options": ["gats", "gates", "gatsos", "gatoes"],
                    "correctAnswer": "gats"
                }
            ]'::jsonb;
            
            answers_data := '["parlo", "La", "gats"]'::jsonb;
            
            INSERT INTO exercises (title, description, type, level, category, class_id, professor_id, content, answers, difficulty_score, estimated_duration)
            SELECT 
                'Exercici diari A1 - Gramàtica ' || TO_CHAR(today_date, 'DD/MM/YYYY'),
                'Exercici diari de gramàtica bàsica',
                'grammar',
                'A1',
                'gramàtica',
                class_record.id,
                c.professor_id,
                exercise_data,
                answers_data,
                1,
                10
            FROM classes c WHERE c.id = class_record.id;
            
            -- Vocabulary exercise A1
            exercise_data := '[
                {
                    "id": "q1",
                    "type": "multiple_choice",
                    "question": "Com es diu ''hello'' en català?",
                    "options": ["adéu", "hola", "bon dia", "bona nit"],
                    "correctAnswer": "hola"
                },
                {
                    "id": "q2",
                    "type": "fill_blank",
                    "question": "El color del cel és ___.",
                    "correctAnswer": "blau"
                },
                {
                    "id": "q3",
                    "type": "multiple_choice",
                    "question": "Quant costa això? - ___ tres euros.",
                    "options": ["Costa", "Costen", "Costar", "Costam"],
                    "correctAnswer": "Costa"
                }
            ]'::jsonb;
            
            answers_data := '["hola", "blau", "Costa"]'::jsonb;
            
            INSERT INTO exercises (title, description, type, level, category, class_id, professor_id, content, answers, difficulty_score, estimated_duration)
            SELECT 
                'Exercici diari A1 - Vocabulari ' || TO_CHAR(today_date, 'DD/MM/YYYY'),
                'Exercici diari de vocabulari bàsic',
                'vocabulary',
                'A1',
                'vocabulari',
                class_record.id,
                c.professor_id,
                exercise_data,
                answers_data,
                1,
                8
            FROM classes c WHERE c.id = class_record.id;
        END IF;
        
        -- Generate A2 level exercises (elementary)
        IF class_record.level = 'A2' OR class_record.allow_all_levels THEN
            exercise_data := '[
                {
                    "id": "q1",
                    "type": "multiple_choice",
                    "question": "Quin és el passat de ''anar''?",
                    "options": ["vaig anar", "aniré", "anava", "anant"],
                    "correctAnswer": "vaig anar"
                },
                {
                    "id": "q2",
                    "type": "fill_blank",
                    "question": "Ahir ___ a la platja amb els meus amics.",
                    "correctAnswer": "vaig anar"
                },
                {
                    "id": "q3",
                    "type": "multiple_choice",
                    "question": "Com es forma el futur de ''menjar''?",
                    "options": ["menjaré", "menjava", "vaig menjar", "menjant"],
                    "correctAnswer": "menjaré"
                },
                {
                    "id": "q4",
                    "type": "fill_blank",
                    "question": "Demà ___ amb la meva família.",
                    "correctAnswer": "menjaré"
                }
            ]'::jsonb;
            
            answers_data := '["vaig anar", "vaig anar", "menjaré", "menjaré"]'::jsonb;
            
            INSERT INTO exercises (title, description, type, level, category, class_id, professor_id, content, answers, difficulty_score, estimated_duration)
            SELECT 
                'Exercici diari A2 - Gramàtica ' || TO_CHAR(today_date, 'DD/MM/YYYY'),
                'Exercici diari de temps verbals',
                'grammar',
                'A2',
                'gramàtica',
                class_record.id,
                c.professor_id,
                exercise_data,
                answers_data,
                2,
                15
            FROM classes c WHERE c.id = class_record.id;
        END IF;
        
        -- Generate B1 level exercises (intermediate)
        IF class_record.level = 'B1' OR class_record.allow_all_levels THEN
            exercise_data := '[
                {
                    "id": "q1",
                    "type": "multiple_choice",
                    "question": "Completa amb el subjuntiu: Espero que ___ bé.",
                    "options": ["estàs", "estàs", "estiguis", "estaràs"],
                    "correctAnswer": "estiguis"
                },
                {
                    "id": "q2",
                    "type": "fill_blank",
                    "question": "Si ___ temps, aniria al cinema.",
                    "correctAnswer": "tingués"
                },
                {
                    "id": "q3",
                    "type": "multiple_choice",
                    "question": "Quin connector s''usa per expressar conseqüència?",
                    "options": ["però", "perquè", "per tant", "encara que"],
                    "correctAnswer": "per tant"
                },
                {
                    "id": "q4",
                    "type": "fill_blank",
                    "question": "No he vingut ___ estava malalt.",
                    "correctAnswer": "perquè"
                },
                {
                    "id": "q5",
                    "type": "multiple_choice",
                    "question": "El participi de ''escriure'' és:",
                    "options": ["escrit", "escribint", "escrigut", "escrivent"],
                    "correctAnswer": "escrit"
                }
            ]'::jsonb;
            
            answers_data := '["estiguis", "tingués", "per tant", "perquè", "escrit"]'::jsonb;
            
            INSERT INTO exercises (title, description, type, level, category, class_id, professor_id, content, answers, difficulty_score, estimated_duration)
            SELECT 
                'Exercici diari B1 - Gramàtica avançada ' || TO_CHAR(today_date, 'DD/MM/YYYY'),
                'Exercici diari de subjuntiu i connectors',
                'grammar',
                'B1',
                'gramàtica',
                class_record.id,
                c.professor_id,
                exercise_data,
                answers_data,
                3,
                20
            FROM classes c WHERE c.id = class_record.id;
        END IF;
        
        -- Generate B2 level exercises (upper intermediate)
        IF class_record.level = 'B2' OR class_record.allow_all_levels THEN
            exercise_data := '[
                {
                    "id": "q1",
                    "type": "multiple_choice",
                    "question": "Tria l''opció correcta: ''M''agradaria que ___ més sovint.''",
                    "options": ["vinguis", "vinguessis", "vindràs", "venir"],
                    "correctAnswer": "vinguessis"
                },
                {
                    "id": "q2",
                    "type": "fill_blank",
                    "question": "Tot i que ___ molt, no va aprovar l''examen.",
                    "correctAnswer": "estudiés"
                },
                {
                    "id": "q3",
                    "type": "multiple_choice",
                    "question": "Quin temps verbal expressa una acció habitual en el passat?",
                    "options": ["perfecte", "indefinit", "imperfet", "plusquamperfet"],
                    "correctAnswer": "imperfet"
                },
                {
                    "id": "q4",
                    "type": "fill_blank",
                    "question": "Quan era petit, sempre ___ al parc els diumenges.",
                    "correctAnswer": "anava"
                },
                {
                    "id": "q5",
                    "type": "multiple_choice",
                    "question": "El mode condicional s''usa per expressar:",
                    "options": ["fets reals", "hipòtesis", "ordres", "preguntes"],
                    "correctAnswer": "hipòtesis"
                },
                {
                    "id": "q6",
                    "type": "fill_blank",
                    "question": "Si ho ___ sabut, no hauria vingut.",
                    "correctAnswer": "hagués"
                }
            ]'::jsonb;
            
            answers_data := '["vinguessis", "estudiés", "imperfet", "anava", "hipòtesis", "hagués"]'::jsonb;
            
            INSERT INTO exercises (title, description, type, level, category, class_id, professor_id, content, answers, difficulty_score, estimated_duration)
            SELECT 
                'Exercici diari B2 - Sintaxi complexa ' || TO_CHAR(today_date, 'DD/MM/YYYY'),
                'Exercici diari de modes i temps verbals complexos',
                'grammar',
                'B2',
                'gramàtica',
                class_record.id,
                c.professor_id,
                exercise_data,
                answers_data,
                4,
                25
            FROM classes c WHERE c.id = class_record.id;
        END IF;
        
        -- Generate C1 level exercises (advanced)
        IF class_record.level = 'C1' OR class_record.allow_all_levels THEN
            exercise_data := '[
                {
                    "id": "q1",
                    "type": "fill_blank",
                    "question": "Redacta una frase utilitzant la perífrasi ''estar + gerundi'' per expressar una acció en desenvolupament:",
                    "correctAnswer": "Estic llegint un llibre molt interessant"
                },
                {
                    "id": "q2",
                    "type": "multiple_choice",
                    "question": "Quina forma és correcta per expressar una acció acabada de succeir?",
                    "options": ["acabo de menjar", "he menjat just", "vaig menjar ara", "menjava ara"],
                    "correctAnswer": "acabo de menjar"
                },
                {
                    "id": "q3",
                    "type": "fill_blank",
                    "question": "Completa amb una locució preposicional: Va arribar tard ___ del mal temps.",
                    "correctAnswer": "a causa"
                },
                {
                    "id": "q4",
                    "type": "multiple_choice",
                    "question": "El registre lingüístic més adequat per a un text acadèmic és:",
                    "options": ["col·loquial", "estàndard", "formal", "literari"],
                    "correctAnswer": "formal"
                },
                {
                    "id": "q5",
                    "type": "fill_blank",
                    "question": "Transforma a estil indirecte: ''Joan va dir: Vindré demà.'' → Joan va dir que ___.",
                    "correctAnswer": "vindria l''endemà"
                },
                {
                    "id": "q6",
                    "type": "multiple_choice",
                    "question": "Identifica la figura retòrica: ''Plou a bots i barrals''",
                    "options": ["metàfora", "hipèrbole", "metonímia", "sinestèsia"],
                    "correctAnswer": "hipèrbole"
                },
                {
                    "id": "q7",
                    "type": "fill_blank",
                    "question": "Completa amb el connector adequat: ___ va estudiar molt, no va aprovar.",
                    "correctAnswer": "Malgrat que"
                }
            ]'::jsonb;
            
            answers_data := '["Estic llegint un llibre molt interessant", "acabo de menjar", "a causa", "formal", "vindria l''endemà", "hipèrbole", "Malgrat que"]'::jsonb;
            
            INSERT INTO exercises (title, description, type, level, category, class_id, professor_id, content, answers, difficulty_score, estimated_duration)
            SELECT 
                'Exercici diari C1 - Català avançat ' || TO_CHAR(today_date, 'DD/MM/YYYY'),
                'Exercici diari de català avançat amb figures retòriques',
                'grammar',
                'C1',
                'gramàtica',
                class_record.id,
                c.professor_id,
                exercise_data,
                answers_data,
                5,
                30
            FROM classes c WHERE c.id = class_record.id;
        END IF;
        
        -- Generate C2 level exercises (proficiency)
        IF class_record.level = 'C2' OR class_record.allow_all_levels THEN
            exercise_data := '[
                {
                    "id": "q1",
                    "type": "essay",
                    "question": "Redacta un text argumentatiu de 200 paraules sobre l''impacte de la tecnologia en l''educació, utilitzant com a mínim tres connectors diferents i dues figures retòriques.",
                    "correctAnswer": "Text argumentatiu coherent amb connectors i figures retòriques"
                },
                {
                    "id": "q2",
                    "type": "fill_blank",
                    "question": "Analitza sintàcticament: ''Malgrat que havia estudiat molt, l''examen li va resultar difícil.'' Identifica la subordinada: ___",
                    "correctAnswer": "subordinada adverbial concessiva"
                },
                {
                    "id": "q3",
                    "type": "multiple_choice",
                    "question": "En l''oració ''Li van regalar un llibre que no havia llegit mai'', ''que'' és:",
                    "options": ["pronoun relatiu subjecte", "pronoun relatiu CD", "conjunció", "adverbi relatiu"],
                    "correctAnswer": "pronoun relatiu CD"
                },
                {
                    "id": "q4",
                    "type": "fill_blank",
                    "question": "Completa amb la forma verbal correcta del verb ''proveir'': Ahir es ___ de menjar per al viatge.",
                    "correctAnswer": "va proveir"
                },
                {
                    "id": "q5",
                    "type": "multiple_choice",
                    "question": "Identifica el tipus de modalitat oracional: ''Que tinguis un bon dia!''",
                    "options": ["enunciativa", "interrogativa", "exclamativa", "desiderativa"],
                    "correctAnswer": "desiderativa"
                },
                {
                    "id": "q6",
                    "type": "fill_blank",
                    "question": "Corregeix l''error: ''Vam comprar-nos una casa nova.'' → ___",
                    "correctAnswer": "Ens vam comprar una casa nova"
                },
                {
                    "id": "q7",
                    "type": "multiple_choice",
                    "question": "El terme ''barrila'' en valencià correspon a ___ en català estàndard:",
                    "options": ["barreja", "discussió", "pallasso", "ràbia"],
                    "correctAnswer": "discussió"
                },
                {
                    "id": "q8",
                    "type": "fill_blank",
                    "question": "Completa amb la preposició adequada: Es va especialitzar ___ medicina.",
                    "correctAnswer": "en"
                }
            ]'::jsonb;
            
            answers_data := '["Text argumentatiu coherent amb connectors i figures retòriques", "subordinada adverbial concessiva", "pronoun relatiu CD", "va proveir", "desiderativa", "Ens vam comprar una casa nova", "discussió", "en"]'::jsonb;
            
            INSERT INTO exercises (title, description, type, level, category, class_id, professor_id, content, answers, difficulty_score, estimated_duration)
            SELECT 
                'Exercici diari C2 - Màster català ' || TO_CHAR(today_date, 'DD/MM/YYYY'),
                'Exercici diari de domini del català amb anàlisi sintàctica',
                'grammar',
                'C2',
                'gramàtica',
                class_record.id,
                c.professor_id,
                exercise_data,
                answers_data,
                6,
                40
            FROM classes c WHERE c.id = class_record.id;
        END IF;
        
    END LOOP;
END;
$$ LANGUAGE plpgsql;

-- Create a scheduled job to run daily exercise generation (this would need to be set up with pg_cron or similar)
-- For now, we'll just create the function and manual execution

-- Generate exercises for today
SELECT generate_daily_exercises();