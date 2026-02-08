-- Drop existing function and create new one for 30 daily exercises of any level/type
DROP FUNCTION IF EXISTS public.generate_daily_exercises();

-- Create new function to generate 30 diverse daily exercises
CREATE OR REPLACE FUNCTION public.generate_daily_exercises()
RETURNS void
LANGUAGE plpgsql
SET search_path TO 'public', 'pg_temp'
AS $$
DECLARE
    exercise_data JSONB;
    answers_data JSONB;
    today_date DATE := CURRENT_DATE;
    professor_id_var UUID;
    i INTEGER;
    levels TEXT[] := ARRAY['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];
    categories TEXT[] := ARRAY['ortografia', 'gramàtica', 'dictats', 'comprensió escrita', 'vocabulari'];
    exercise_types TEXT[] := ARRAY['grammar', 'vocabulary', 'listening', 'reading', 'writing'];
    level_var TEXT;
    category_var TEXT;
    type_var TEXT;
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

    -- Generate 30 diverse daily exercises
    FOR i IN 1..30 LOOP
        -- Randomly select level, category, and type
        level_var := levels[1 + (random() * array_length(levels, 1))::int % array_length(levels, 1)];
        category_var := categories[1 + (random() * array_length(categories, 1))::int % array_length(categories, 1)];
        type_var := exercise_types[1 + (random() * array_length(exercise_types, 1))::int % array_length(exercise_types, 1)];

        -- Generate content based on category
        IF category_var = 'ortografia' THEN
            exercise_data := jsonb_build_array(
                jsonb_build_object(
                    'id', 'q1',
                    'type', 'fill_blank',
                    'question', format('Completa la paraula: c_s_ (habitatge)', i),
                    'correctAnswer', 'a'
                ),
                jsonb_build_object(
                    'id', 'q2',
                    'type', 'multiple_choice',
                    'question', format('Tria l''opció correcta (%s):', i),
                    'options', jsonb_build_array('b/v', 'g/j', 's/z', 'ny/ñ'),
                    'correctAnswer', 'b/v'
                )
            );
            answers_data := jsonb_build_array('a', 'b/v');
            
        ELSIF category_var = 'gramàtica' THEN
            exercise_data := jsonb_build_array(
                jsonb_build_object(
                    'id', 'q1',
                    'type', 'multiple_choice',
                    'question', format('Conjuga el verb "ser": Jo ___', i),
                    'options', jsonb_build_array('sóc', 'ets', 'és', 'som'),
                    'correctAnswer', 'sóc'
                ),
                jsonb_build_object(
                    'id', 'q2',
                    'type', 'fill_blank',
                    'question', format('Completa: Ells ___ estudiants', i),
                    'correctAnswer', 'són'
                )
            );
            answers_data := jsonb_build_array('sóc', 'són');
            
        ELSIF category_var = 'dictats' THEN
            exercise_data := jsonb_build_array(
                jsonb_build_object(
                    'id', 'q1',
                    'type', 'dictation',
                    'question', format('Escolta i escriu (%s):', i),
                    'correctAnswer', 'Els nens juguen al parc'
                )
            );
            answers_data := jsonb_build_array('Els nens juguen al parc');
            
        ELSIF category_var = 'comprensió escrita' THEN
            exercise_data := jsonb_build_array(
                jsonb_build_object(
                    'id', 'q1',
                    'type', 'multiple_choice',
                    'question', format('Text: "La Maria estudia medicina." Què estudia? (%s)', i),
                    'options', jsonb_build_array('Dret', 'Medicina', 'Història', 'Matemàtiques'),
                    'correctAnswer', 'Medicina'
                )
            );
            answers_data := jsonb_build_array('Medicina');
            
        ELSE -- vocabulari
            exercise_data := jsonb_build_array(
                jsonb_build_object(
                    'id', 'q1',
                    'type', 'multiple_choice',
                    'question', format('Tradueix "casa" (%s):', i),
                    'options', jsonb_build_array('house', 'car', 'book', 'tree'),
                    'correctAnswer', 'house'
                ),
                jsonb_build_object(
                    'id', 'q2',
                    'type', 'fill_blank',
                    'question', format('Sinònim de "gran": ___', i),
                    'correctAnswer', 'gros'
                )
            );
            answers_data := jsonb_build_array('house', 'gros');
        END IF;

        -- Insert exercise
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
            format('Exercici diari de %s nivell %s', category_var, level_var),
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
                ELSE 8
            END,
            ARRAY['diari', level_var, category_var],
            false,
            5,
            NULL
        );
    END LOOP;
    
    RAISE NOTICE 'Generated 30 daily exercises successfully';
END;
$$;

-- Enable pg_cron extension for scheduling
CREATE EXTENSION IF NOT EXISTS pg_cron;
CREATE EXTENSION IF NOT EXISTS pg_net;

-- Schedule daily exercise generation at 2 AM UTC
SELECT cron.schedule(
    'daily-exercise-reset',
    '0 2 * * *', -- Every day at 2 AM UTC
    $$
    SELECT net.http_post(
        url := 'https://ospvelfzpuunfjdlicfl.supabase.co/functions/v1/daily-exercise-update',
        headers := '{"Content-Type": "application/json", "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9zcHZlbGZ6cHV1bmZqZGxpY2ZsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU4OTEwOTcsImV4cCI6MjA3MTQ2NzA5N30.BgjvTKtzyz3CUzAESSTIgHbfXPu62iVcTCTDq-NVv1w"}'::jsonb,
        body := '{"scheduled": true}'::jsonb
    ) as request_id;
    $$
);