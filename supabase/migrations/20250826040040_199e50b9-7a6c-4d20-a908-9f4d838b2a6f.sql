-- Remove the auto-delete trigger for chat messages to make them persistent
DROP TRIGGER IF EXISTS auto_delete_old_messages_trigger ON public.chat_messages;

-- Update the exercises query to properly handle level filtering
-- First, let's add some sample exercises if they don't exist
INSERT INTO public.exercises (
  title,
  description,
  type,
  level,
  content,
  answers,
  professor_id,
  class_id
) 
SELECT 
  'Exercici de Gramàtica Bàsica',
  'Practicar els articles definits en català',
  'grammar',
  'A1',
  '[{"question": "Quin és l''article definitiu per ''casa''?", "options": ["la", "el", "els", "les"], "type": "multiple_choice"}]',
  '[{"correct": 0, "explanation": "''Casa'' és femení singular, per tant s''usa ''la''"}]',
  (SELECT user_id FROM profiles WHERE role = 'professor' LIMIT 1),
  NULL
WHERE NOT EXISTS (
  SELECT 1 FROM public.exercises WHERE title = 'Exercici de Gramàtica Bàsica'
);

INSERT INTO public.exercises (
  title,
  description,
  type,
  level,
  content,
  answers,
  professor_id,
  class_id
) 
SELECT 
  'Vocabulari B1',
  'Paraules avançades de vocabulari català',
  'vocabulary',
  'B1',
  '[{"question": "Què significa ''enyorar''?", "options": ["oblidar", "recordar amb nostalgia", "odiar", "ignorar"], "type": "multiple_choice"}]',
  '[{"correct": 1, "explanation": "Enyorar significa recordar algú o alguna cosa amb sentiment de nostàlgia"}]',
  (SELECT user_id FROM profiles WHERE role = 'professor' LIMIT 1),
  NULL
WHERE NOT EXISTS (
  SELECT 1 FROM public.exercises WHERE title = 'Vocabulari B1'
);