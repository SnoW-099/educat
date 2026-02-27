-- Reset database for deployment readiness
-- Clean up all existing data to prepare for production

-- Delete all existing data from all tables to start fresh
DELETE FROM message_reactions;
DELETE FROM chat_messages;
DELETE FROM essay_reviews;
DELETE FROM exercise_attempts;
DELETE FROM student_xp_rankings;
DELETE FROM student_progress;
DELETE FROM enrollments;
DELETE FROM exercises;
DELETE FROM classes;
DELETE FROM user_roles;
DELETE FROM profiles;

-- Reset any sequences if needed
-- This ensures clean state for deployment

-- Regenerate daily exercises with the function
SELECT generate_daily_exercises();