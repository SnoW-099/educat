-- Primero verificar qué tipos están permitidos
SELECT conname, pg_get_constraintdef(oid) 
FROM pg_constraint 
WHERE conrelid = 'exercises'::regclass 
AND contype = 'c';