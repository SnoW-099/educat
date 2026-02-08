-- Clean up and optimize the exercises database structure

-- First, create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_exercises_level_category ON exercises(level, category);
CREATE INDEX IF NOT EXISTS idx_exercises_type_level ON exercises(type, level);
CREATE INDEX IF NOT EXISTS idx_exercises_class_level ON exercises(class_id, level);
CREATE INDEX IF NOT EXISTS idx_exercises_created_at ON exercises(created_at DESC);

-- Create index for exercise attempts
CREATE INDEX IF NOT EXISTS idx_exercise_attempts_student_exercise ON exercise_attempts(student_id, exercise_id);

-- Update any exercises that might have inconsistent data
UPDATE exercises 
SET category = CASE 
  WHEN category IS NULL OR category = '' THEN type
  ELSE category
END;

-- Ensure all exercises have proper time limits
UPDATE exercises 
SET time_limit = CASE
  WHEN time_limit IS NULL AND category = 'dictats' THEN 10
  WHEN time_limit IS NULL AND category = 'comprensió escrita' THEN 15
  WHEN time_limit IS NULL AND category = 'gramàtica' THEN 8
  WHEN time_limit IS NULL AND category = 'ortografia' THEN 5
  WHEN time_limit IS NULL THEN 10
  ELSE time_limit
END;

-- Clean up duplicate exercises (keep the most recent ones)
WITH duplicate_exercises AS (
  SELECT id, 
    ROW_NUMBER() OVER (
      PARTITION BY title, level, category 
      ORDER BY created_at DESC
    ) as rn
  FROM exercises
  WHERE title LIKE '%Exercici diari%'
)
DELETE FROM exercises 
WHERE id IN (
  SELECT id FROM duplicate_exercises WHERE rn > 3
);

-- Optimize XP rankings table
CREATE INDEX IF NOT EXISTS idx_student_xp_class_month ON student_xp_rankings(class_id, month_year, xp_points DESC);
CREATE INDEX IF NOT EXISTS idx_student_xp_student_class ON student_xp_rankings(student_id, class_id);

-- Ensure student progress has proper indexes
CREATE INDEX IF NOT EXISTS idx_student_progress_student_class ON student_progress(student_id, class_id);

-- Add constraint to prevent negative scores
ALTER TABLE exercise_attempts 
DROP CONSTRAINT IF EXISTS check_positive_score;

ALTER TABLE exercise_attempts 
ADD CONSTRAINT check_positive_score 
CHECK (score >= 0 AND score <= 100);

-- Clean up any orphaned data
DELETE FROM exercise_attempts 
WHERE exercise_id NOT IN (SELECT id FROM exercises);

-- Update statistics
ANALYZE exercises;
ANALYZE exercise_attempts;
ANALYZE student_progress;
ANALYZE student_xp_rankings;