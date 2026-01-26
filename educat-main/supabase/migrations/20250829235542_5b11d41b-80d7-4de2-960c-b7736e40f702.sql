-- Primero eliminar los ejercicios diarios existentes de hoy
DELETE FROM exercises 
WHERE title ILIKE '%Exercici diari%' 
AND created_at::date = CURRENT_DATE;

-- Llamar la función para generar 200 ejercicios nuevos
SELECT generate_daily_exercises();