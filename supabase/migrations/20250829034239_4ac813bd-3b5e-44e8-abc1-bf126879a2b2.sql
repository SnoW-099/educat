-- Generar múltiples ejercicios de prueba para cada nivel y categoría
DO $$
DECLARE
    class_record RECORD;
    i INTEGER;
    levels TEXT[] := ARRAY['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];
    categories TEXT[] := ARRAY['ortografia', 'gramàtica', 'dictats', 'comprensió escrita', 'redaccions', 'vocabulari'];
    level TEXT;
    category TEXT;
    exercise_data JSONB;
    answers_data JSONB;
BEGIN
    -- Obtener una clase para asignar los ejercicios
    SELECT id, professor_id INTO class_record 
    FROM classes 
    WHERE is_active = true 
    LIMIT 1;
    
    IF class_record.id IS NULL THEN
        RAISE NOTICE 'No se encontró ninguna clase activa';
        RETURN;
    END IF;

    -- Generar ejercicios para cada nivel
    FOREACH level IN ARRAY levels LOOP
        -- Generar ejercicios para cada categoría
        FOREACH category IN ARRAY categories LOOP
            -- Generar 20 ejercicios por categoría y nivel
            FOR i IN 1..20 LOOP
                -- Crear contenido según la categoría
                IF category = 'ortografia' THEN
                    exercise_data := jsonb_build_array(
                        jsonb_build_object(
                            'id', 'q1',
                            'type', 'fill_blank',
                            'question', format('Completa amb la forma correcta (exercici %s): La ___ és molt gran.', i),
                            'correctAnswer', 'casa'
                        ),
                        jsonb_build_object(
                            'id', 'q2',
                            'type', 'multiple_choice',
                            'question', format('Tria l''opció correcta (exercici %s):', i),
                            'options', jsonb_build_array('haver', 'a ver', 'haber', 'haver-hi'),
                            'correctAnswer', 'haver'
                        ),
                        jsonb_build_object(
                            'id', 'q3',
                            'type', 'fill_blank',
                            'question', format('Escriu el plural de "llapis" (exercici %s):', i),
                            'correctAnswer', 'llapis'
                        )
                    );
                    answers_data := jsonb_build_array('casa', 'haver', 'llapis');
                    
                ELSIF category = 'gramàtica' THEN
                    exercise_data := jsonb_build_array(
                        jsonb_build_object(
                            'id', 'q1',
                            'type', 'multiple_choice',
                            'question', format('Completa la frase (exercici %s): Jo ___ català.', i),
                            'options', jsonb_build_array('parlo', 'parles', 'parla', 'parlem'),
                            'correctAnswer', 'parlo'
                        ),
                        jsonb_build_object(
                            'id', 'q2',
                            'type', 'fill_blank',
                            'question', format('Completa amb el verb correcte (exercici %s): Ells ___ contents.', i),
                            'correctAnswer', 'estan'
                        ),
                        jsonb_build_object(
                            'id', 'q3',
                            'type', 'multiple_choice',
                            'question', format('Quin és el passat de "fer" (exercici %s)?', i),
                            'options', jsonb_build_array('vaig fer', 'faré', 'feia', 'fet'),
                            'correctAnswer', 'vaig fer'
                        )
                    );
                    answers_data := jsonb_build_array('parlo', 'estan', 'vaig fer');
                    
                ELSIF category = 'dictats' THEN
                    exercise_data := jsonb_build_array(
                        jsonb_build_object(
                            'id', 'q1',
                            'type', 'dictation',
                            'question', format('Escolta i escriu (exercici %s):', i),
                            'correctAnswer', 'El gat és a sota la taula'
                        ),
                        jsonb_build_object(
                            'id', 'q2',
                            'type', 'dictation',
                            'question', format('Escolta atentament (exercici %s):', i),
                            'correctAnswer', 'Avui fa bon temps'
                        )
                    );
                    answers_data := jsonb_build_array('El gat és a sota la taula', 'Avui fa bon temps');
                    
                ELSIF category = 'comprensió escrita' THEN
                    exercise_data := jsonb_build_array(
                        jsonb_build_object(
                            'id', 'q1',
                            'type', 'multiple_choice',
                            'question', format('Llegeix el text i respon (exercici %s): "La Maria viu a Barcelona." On viu la Maria?', i),
                            'options', jsonb_build_array('Madrid', 'Barcelona', 'València', 'Girona'),
                            'correctAnswer', 'Barcelona'
                        ),
                        jsonb_build_object(
                            'id', 'q2',
                            'type', 'fill_blank',
                            'question', format('Completa segons el text anterior (exercici %s): La Maria viu a ___.', i),
                            'correctAnswer', 'Barcelona'
                        )
                    );
                    answers_data := jsonb_build_array('Barcelona', 'Barcelona');
                    
                ELSIF category = 'redaccions' THEN
                    exercise_data := jsonb_build_array(
                        jsonb_build_object(
                            'id', 'q1',
                            'type', 'essay',
                            'question', format('Escriu un text breu sobre les teves vacances (exercici %s). Mínim 50 paraules.', i),
                            'correctAnswer', 'Text lliure de mínim 50 paraules'
                        )
                    );
                    answers_data := jsonb_build_array('Text lliure de mínim 50 paraules');
                    
                ELSE -- vocabulari
                    exercise_data := jsonb_build_array(
                        jsonb_build_object(
                            'id', 'q1',
                            'type', 'multiple_choice',
                            'question', format('Com es diu "perro" en català (exercici %s)?', i),
                            'options', jsonb_build_array('gat', 'gos', 'ocell', 'peix'),
                            'correctAnswer', 'gos'
                        ),
                        jsonb_build_object(
                            'id', 'q2',
                            'type', 'fill_blank',
                            'question', format('El color del cel és ___ (exercici %s).', i),
                            'correctAnswer', 'blau'
                        ),
                        jsonb_build_object(
                            'id', 'q3',
                            'type', 'multiple_choice',
                            'question', format('Quin dia ve després de dimarts (exercici %s)?', i),
                            'options', jsonb_build_array('dilluns', 'dimecres', 'dijous', 'divendres'),
                            'correctAnswer', 'dimecres'
                        )
                    );
                    answers_data := jsonb_build_array('gos', 'blau', 'dimecres');
                END IF;

                -- Insertar el ejercicio
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
                    created_at
                ) VALUES (
                    format('%s %s - Exercici %s', category, level, i),
                    format('Exercici de %s per al nivell %s', category, level),
                    CASE 
                        WHEN category = 'ortografia' THEN 'spelling'
                        WHEN category = 'gramàtica' THEN 'grammar'
                        WHEN category = 'dictats' THEN 'listening'
                        WHEN category = 'comprensió escrita' THEN 'reading'
                        WHEN category = 'redaccions' THEN 'writing'
                        ELSE 'vocabulary'
                    END,
                    level,
                    category,
                    class_record.id,
                    class_record.professor_id,
                    exercise_data,
                    answers_data,
                    CASE level
                        WHEN 'A1' THEN 1
                        WHEN 'A2' THEN 2
                        WHEN 'B1' THEN 3
                        WHEN 'B2' THEN 4
                        WHEN 'C1' THEN 5
                        WHEN 'C2' THEN 6
                    END,
                    CASE category
                        WHEN 'redaccions' THEN 30
                        WHEN 'comprensió escrita' THEN 20
                        WHEN 'dictats' THEN 15
                        ELSE 10
                    END,
                    NOW() - (i || ' days')::INTERVAL
                );
            END LOOP;
        END LOOP;
    END LOOP;
    
    RAISE NOTICE 'Ejercicios generados exitosamente';
END;
$$;