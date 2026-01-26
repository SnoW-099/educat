-- Fix function search path mutable issue by setting search_path
ALTER FUNCTION generate_daily_exercises() SET search_path = public, pg_temp;