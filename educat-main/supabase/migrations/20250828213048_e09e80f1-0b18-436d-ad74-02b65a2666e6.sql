-- Fix RLS policies for student_progress to allow INSERTs via triggers
ALTER TABLE public.student_progress DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.student_progress ENABLE ROW LEVEL SECURITY;

-- Allow INSERTs for authenticated users (will be controlled by triggers)
CREATE POLICY "Allow inserts for authenticated users" ON public.student_progress
FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);

-- Allow updates for authenticated users (will be controlled by triggers) 
CREATE POLICY "Allow updates for authenticated users" ON public.student_progress
FOR UPDATE USING (auth.uid() IS NOT NULL);

-- Create some sample exercises for testing since DB is empty
INSERT INTO public.exercises (
  title, description, type, level, category, class_id, professor_id,
  content, answers, difficulty_score, estimated_duration
) VALUES 
(
  'Accents i Dièresis', 
  'Exercici sobre l''ús correcte dels accents en català', 
  'grammar', 
  'A2', 
  'ortografia',
  NULL,  -- Global exercise (no specific class)
  '02961040-b871-4673-b382-584f176df1e6', -- Use current user as professor for now
  '[
    {
      "id": "q1",
      "type": "multiple_choice",
      "question": "Quina és la forma correcta?",
      "options": ["música", "musica", "músíca", "múscía"],
      "correctAnswer": "música"
    },
    {
      "id": "q2", 
      "type": "fill_blank",
      "question": "Completa la frase: M''agrada molt la _____ clàssica.",
      "correctAnswer": "música"
    }
  ]',
  '["música", "música"]',
  2,
  5
),
(
  'Verbs Irregulars',
  'Conjugació de verbs irregulars en català',
  'grammar',
  'B1',
  'gramàtica', 
  NULL,
  '02961040-b871-4673-b382-584f176df1e6',
  '[
    {
      "id": "q3",
      "type": "multiple_choice", 
      "question": "Conjugació correcta de \"ser\" en primera persona singular del present:",
      "options": ["sóc", "són", "ets", "és"],
      "correctAnswer": "sóc"
    }
  ]',
  '["sóc"]',
  3,
  8
),
(
  'Dictat de Comprensió',
  'Exercici de dictats per millorar la comprensió auditiva',
  'listening',
  'A1', 
  'dictats',
  NULL,
  '02961040-b871-4673-b382-584f176df1e6',
  '[
    {
      "id": "q4",
      "type": "dictation",
      "question": "Escolta i escriu el que sents:",
      "correctAnswer": "El gat dorm al sofà."
    }
  ]',
  '["El gat dorm al sofà."]',
  1,
  10
),
(
  'Cultura Catalana',
  'Coneixements sobre la cultura i geografia catalana',
  'reading',
  'C1',
  'altres',
  'dfe4cdae-691e-49d1-9850-a9c70b3167df', -- Specific to user's class
  '02961040-b871-4673-b382-584f176df1e6',
  '[
    {
      "id": "q5",
      "type": "multiple_choice",
      "question": "Quina és la capital de Catalunya?", 
      "options": ["Girona", "Barcelona", "Tarragona", "Lleida"],
      "correctAnswer": "Barcelona"
    }
  ]',
  '["Barcelona"]',
  2,
  3
);