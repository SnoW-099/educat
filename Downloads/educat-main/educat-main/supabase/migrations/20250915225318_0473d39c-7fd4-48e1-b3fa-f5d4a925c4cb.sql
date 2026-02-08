-- Reset database safely without foreign key violations
-- Clean up all existing data except auth.users table

-- Delete in proper order to avoid foreign key violations
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
-- Don't delete profiles as they reference auth.users

-- Clean up old daily exercises if any exist
DELETE FROM exercises WHERE title ILIKE '%Exercici diari%';