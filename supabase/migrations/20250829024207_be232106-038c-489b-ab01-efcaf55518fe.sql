-- Fix professor_id requirement and add basic exercises for testing

-- First, let's ensure we have a system professor
DO $$
DECLARE
    prof_id uuid;
BEGIN
    -- Get the first professor ID, or create a default one if none exists
    SELECT user_id INTO prof_id FROM profiles WHERE role = 'professor' LIMIT 1;
    
    IF prof_id IS NULL THEN
        -- Create a default system professor if none exists  
        prof_id := gen_random_uuid();
        INSERT INTO profiles (user_id, email, name, role) 
        VALUES (prof_id, 'sistema@educat.cat', 'Sistema EduCat', 'professor');
    END IF;

    -- Delete existing exercises to avoid duplicates
    DELETE FROM exercises WHERE title LIKE '%A1%' OR title LIKE '%A2%' OR title LIKE '%B1%' OR title LIKE '%B2%' OR title LIKE '%C1%' OR title LIKE '%C2%';

    -- Insert A1 exercises with proper JSON
    INSERT INTO exercises (title, description, type, level, category, content, answers, professor_id, time_limit, difficulty_score, estimated_duration) VALUES
    ('A1 Ortografia 1: Vocals', 'Practica les vocals bàsiques', 'practice', 'A1', 'ortografia', 
    '[{"id":"q1","type":"fill_blank","question":"Completa: El g_t dorm","correctAnswer":"a","explanation":"Gat s'\''escriu amb a"}]',
    '["a"]', prof_id, NULL, 1, 5),
    
    ('A1 Gramàtica 1: Articles', 'Practica els articles', 'practice', 'A1', 'gramàtica',
    '[{"id":"q1","type":"multiple_choice","question":"Escull l'\''article: ___ casa","options":["la","el","els"],"correctAnswer":"la","explanation":"Casa és femení"}]',
    '["la"]', prof_id, NULL, 1, 5),
    
    ('A1 Dictat 1: Frases curtes', 'Dictat de frases simples', 'practice', 'A1', 'dictats',
    '[{"id":"q1","type":"dictation","question":"Escolta i escriu:","correctAnswer":"El gat dorm","explanation":"Frase simple"}]',
    '["El gat dorm"]', prof_id, NULL, 1, 8);

END $$;