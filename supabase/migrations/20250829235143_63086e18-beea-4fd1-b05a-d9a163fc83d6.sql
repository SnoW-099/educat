CREATE OR REPLACE FUNCTION public.generate_daily_exercises()
 RETURNS void
 LANGUAGE plpgsql
 SET search_path TO 'public', 'pg_temp'
AS $function$
DECLARE
    exercise_data JSONB;
    answers_data JSONB;
    today_date DATE := CURRENT_DATE;
    professor_id_var UUID;
    i INTEGER;
    levels TEXT[] := ARRAY['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];
    categories TEXT[] := ARRAY['ortografia', 'gramàtica', 'dictats', 'comprensió escrita', 'vocabulari', 'expressions', 'conjugació'];
    exercise_types TEXT[] := ARRAY['grammar', 'vocabulary', 'listening', 'reading', 'writing', 'practice'];
    level_var TEXT;
    category_var TEXT;
    type_var TEXT;
    
    -- Extended ortografia templates
    ortografia_questions TEXT[] := ARRAY[
        'Completa la paraula: c_s_ (habitatge)',
        'Escriu correctament: a_gua',
        'Completa: esc_la',
        'Ortografia: c_vell',
        'Escriu: _ent (persones)',
        'Completa: lli_re',
        'Ortografia: _roc (color)',
        'Escriu: pa_er',
        'Completa: ai_e (verb)',
        'Ortografia: _erra'
    ];
    
    -- Extended grammar templates  
    grammar_questions TEXT[] := ARRAY[
        'Conjuga el verb "ser": Jo ___',
        'Verb "tenir": Tu ___',
        'Present "anar": Ell ___',
        'Subjuntiu "poder": Que jo ___',
        'Condicional "venir": Jo ___',
        'Imperatiu "parlar": ___ tu!',
        'Futur "estudiar": Nosaltres ___',
        'Passat "menjar": Vosaltres ___',
        'Gerundi "córrer": Estic ___',
        'Participi "escriure": He ___'
    ];
    
    -- Extended dictation texts
    dictation_texts TEXT[] := ARRAY[
        'Els nens juguen al parc cada tarda',
        'La biblioteca està oberta fins les vuit',
        'Demà anirem a visitar el museu',
        'El professor explica la lliçó amb paciència',
        'Les flors del jardí són molt boniques',
        'Hem de comprar pa, llet i fruita',
        'L''estiu passat vam anar a la platja',
        'Els estudiants estudien per l''examen',
        'La cuina de casa meva és molt gran',
        'Aquest llibre m''agrada molt llegir'
    ];
    
    -- Vocabulary questions
    vocab_questions TEXT[] := ARRAY[
        'Tradueix "casa" a l''anglès',
        'Sinònim de "gran"',
        'Antònim de "alt"',
        'Significa "biblioteca"',
        'Plural de "cavall"',
        'Femení de "gat"',
        'Diminutiu de "petit"',
        'Augmentatiu de "casa"',
        'Gentilici de "Catalunya"',
        'Professional que ensenya'
    ];
    
BEGIN
    -- Get or create system professor
    SELECT user_id INTO professor_id_var 
    FROM profiles 
    WHERE role = 'professor' 
    LIMIT 1;
    
    IF professor_id_var IS NULL THEN
        -- Create system professor
        INSERT INTO profiles (user_id, email, name, role)
        VALUES (gen_random_uuid(), 'sistema@educat.cat', 'Sistema EduCat', 'professor')
        RETURNING user_id INTO professor_id_var;
    END IF;

    -- Delete existing daily exercises from today
    DELETE FROM exercises 
    WHERE title ILIKE '%Exercici diari%' 
    AND created_at::date = today_date;

    -- Generate 200 diverse daily exercises (much more variety)
    FOR i IN 1..200 LOOP
        -- Randomly select level, category, and type
        level_var := levels[1 + (random() * array_length(levels, 1))::int % array_length(levels, 1)];
        category_var := categories[1 + (random() * array_length(categories, 1))::int % array_length(categories, 1)];
        type_var := exercise_types[1 + (random() * array_length(exercise_types, 1))::int % array_length(exercise_types, 1)];

        -- Generate content based on category with much more variety
        IF category_var = 'ortografia' THEN
            exercise_data := jsonb_build_array(
                jsonb_build_object(
                    'id', 'q1',
                    'type', CASE WHEN i % 3 = 0 THEN 'multiple_choice' ELSE 'fill_blank' END,
                    'question', ortografia_questions[1 + (i % array_length(ortografia_questions, 1))],
                    'correctAnswer', CASE 
                        WHEN i % 10 = 0 THEN 'a'
                        WHEN i % 10 = 1 THEN 'i' 
                        WHEN i % 10 = 2 THEN 'o'
                        WHEN i % 10 = 3 THEN 'u'
                        WHEN i % 10 = 4 THEN 'g'
                        WHEN i % 10 = 5 THEN 'b'
                        WHEN i % 10 = 6 THEN 'v'
                        WHEN i % 10 = 7 THEN 's'
                        WHEN i % 10 = 8 THEN 'z'
                        ELSE 'll'
                    END,
                    'options', CASE WHEN i % 3 = 0 THEN jsonb_build_array('a', 'e', 'i', 'o') ELSE NULL END
                )
            );
            answers_data := jsonb_build_array(CASE 
                WHEN i % 10 = 0 THEN 'a'
                WHEN i % 10 = 1 THEN 'i' 
                WHEN i % 10 = 2 THEN 'o'
                WHEN i % 10 = 3 THEN 'u'
                WHEN i % 10 = 4 THEN 'g'
                WHEN i % 10 = 5 THEN 'b'
                WHEN i % 10 = 6 THEN 'v'
                WHEN i % 10 = 7 THEN 's'
                WHEN i % 10 = 8 THEN 'z'
                ELSE 'll'
            END);
            
        ELSIF category_var = 'gramàtica' OR category_var = 'conjugació' THEN
            exercise_data := jsonb_build_array(
                jsonb_build_object(
                    'id', 'q1',
                    'type', CASE WHEN i % 2 = 0 THEN 'multiple_choice' ELSE 'fill_blank' END,
                    'question', grammar_questions[1 + (i % array_length(grammar_questions, 1))],
                    'options', CASE WHEN i % 2 = 0 THEN jsonb_build_array('sóc', 'ets', 'és', 'som') ELSE NULL END,
                    'correctAnswer', CASE 
                        WHEN i % 8 = 0 THEN 'sóc'
                        WHEN i % 8 = 1 THEN 'tens'
                        WHEN i % 8 = 2 THEN 'va'
                        WHEN i % 8 = 3 THEN 'pugui'
                        WHEN i % 8 = 4 THEN 'vindria'
                        WHEN i % 8 = 5 THEN 'parla'
                        WHEN i % 8 = 6 THEN 'estudiarem'
                        ELSE 'vau menjar'
                    END
                )
            );
            answers_data := jsonb_build_array(CASE 
                WHEN i % 8 = 0 THEN 'sóc'
                WHEN i % 8 = 1 THEN 'tens'
                WHEN i % 8 = 2 THEN 'va'
                WHEN i % 8 = 3 THEN 'pugui'
                WHEN i % 8 = 4 THEN 'vindria'
                WHEN i % 8 = 5 THEN 'parla'
                WHEN i % 8 = 6 THEN 'estudiarem'
                ELSE 'vau menjar'
            END);
            
        ELSIF category_var = 'dictats' THEN
            exercise_data := jsonb_build_array(
                jsonb_build_object(
                    'id', 'q1',
                    'type', 'dictation',
                    'question', format('Escolta i escriu (%s):', i),
                    'correctAnswer', dictation_texts[1 + (i % array_length(dictation_texts, 1))]
                )
            );
            answers_data := jsonb_build_array(dictation_texts[1 + (i % array_length(dictation_texts, 1))]);
            
        ELSIF category_var = 'comprensió escrita' THEN
            exercise_data := jsonb_build_array(
                jsonb_build_object(
                    'id', 'q1',
                    'type', 'multiple_choice',
                    'question', format('Text: "La Maria estudia %s." Què estudia? (%s)', 
                        CASE i % 5
                            WHEN 0 THEN 'medicina'
                            WHEN 1 THEN 'història'
                            WHEN 2 THEN 'matemàtiques'
                            WHEN 3 THEN 'català'
                            ELSE 'biologia'
                        END, i),
                    'options', jsonb_build_array('Medicina', 'Història', 'Matemàtiques', 'Català'),
                    'correctAnswer', CASE i % 5
                        WHEN 0 THEN 'Medicina'
                        WHEN 1 THEN 'Història'
                        WHEN 2 THEN 'Matemàtiques'
                        WHEN 3 THEN 'Català'
                        ELSE 'Biologia'
                    END
                )
            );
            answers_data := jsonb_build_array(CASE i % 5
                WHEN 0 THEN 'Medicina'
                WHEN 1 THEN 'Història'
                WHEN 2 THEN 'Matemàtiques'
                WHEN 3 THEN 'Català'
                ELSE 'Biologia'
            END);
            
        ELSIF category_var = 'vocabulari' THEN
            exercise_data := jsonb_build_array(
                jsonb_build_object(
                    'id', 'q1',
                    'type', CASE WHEN i % 3 = 0 THEN 'multiple_choice' ELSE 'fill_blank' END,
                    'question', vocab_questions[1 + (i % array_length(vocab_questions, 1))],
                    'options', CASE WHEN i % 3 = 0 THEN jsonb_build_array('house', 'car', 'book', 'tree') ELSE NULL END,
                    'correctAnswer', CASE 
                        WHEN i % 6 = 0 THEN 'house'
                        WHEN i % 6 = 1 THEN 'gros'
                        WHEN i % 6 = 2 THEN 'baix'
                        WHEN i % 6 = 3 THEN 'lloc amb llibres'
                        WHEN i % 6 = 4 THEN 'cavalls'
                        ELSE 'gata'
                    END
                )
            );
            answers_data := jsonb_build_array(CASE 
                WHEN i % 6 = 0 THEN 'house'
                WHEN i % 6 = 1 THEN 'gros'
                WHEN i % 6 = 2 THEN 'baix'
                WHEN i % 6 = 3 THEN 'lloc amb llibres'
                WHEN i % 6 = 4 THEN 'cavalls'
                ELSE 'gata'
            END);
            
        ELSE -- expressions
            exercise_data := jsonb_build_array(
                jsonb_build_object(
                    'id', 'q1',
                    'type', 'multiple_choice',
                    'question', format('Expressió catalana per "bon dia" (%s):', i),
                    'options', jsonb_build_array('Bon dia', 'Bona tarda', 'Bona nit', 'Fins ara'),
                    'correctAnswer', 'Bon dia'
                )
            );
            answers_data := jsonb_build_array('Bon dia');
        END IF;

        -- Insert exercise with more variety in metadata
        INSERT INTO exercises (
            title,
            description,
            type,
            level,
            category,
            class_id,
            professor_id,
            content,
            answers,
            difficulty_score,
            estimated_duration,
            tags,
            is_exam,
            max_attempts,
            time_limit
        ) VALUES (
            format('Exercici diari %s - %s %s', i, category_var, level_var),
            format('Exercici diari de %s nivell %s - Sèrie ampliada', category_var, level_var),
            type_var,
            level_var,
            category_var,
            NULL, -- No specific class
            professor_id_var,
            exercise_data,
            answers_data,
            CASE level_var
                WHEN 'A1' THEN 1
                WHEN 'A2' THEN 2
                WHEN 'B1' THEN 3
                WHEN 'B2' THEN 4
                WHEN 'C1' THEN 5
                WHEN 'C2' THEN 6
            END,
            CASE category_var
                WHEN 'comprensió escrita' THEN 15
                WHEN 'dictats' THEN 10
                WHEN 'expressions' THEN 12
                ELSE 8
            END,
            ARRAY['diari', level_var, category_var, 'ampliada'],
            false,
            CASE category_var 
                WHEN 'dictats' THEN 3
                WHEN 'expressions' THEN 7
                ELSE 5
            END,
            NULL
        );
    END LOOP;
    
    RAISE NOTICE 'Generated 200 daily exercises successfully with expanded variety';
END;
$function$