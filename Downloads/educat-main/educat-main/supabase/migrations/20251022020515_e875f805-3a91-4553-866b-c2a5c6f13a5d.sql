-- Create function to get class rankings with student names
CREATE OR REPLACE FUNCTION public.get_class_rankings(
  p_class_id UUID,
  p_month_year TEXT,
  p_limit INTEGER DEFAULT 5
)
RETURNS TABLE (
  student_id UUID,
  student_name TEXT,
  xp_points INTEGER,
  ranking_position INTEGER
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  RETURN QUERY
  SELECT 
    sxr.student_id,
    COALESCE(p.name, 'Usuari desconegut') as student_name,
    sxr.xp_points,
    ROW_NUMBER() OVER (ORDER BY sxr.xp_points DESC, sxr.updated_at ASC)::INTEGER as ranking_position
  FROM public.student_xp_rankings sxr
  LEFT JOIN public.profiles p ON p.user_id = sxr.student_id
  WHERE sxr.class_id = p_class_id
    AND sxr.month_year = p_month_year
    AND (p.role IS NULL OR p.role = 'student')
  ORDER BY sxr.xp_points DESC, sxr.updated_at ASC
  LIMIT p_limit;
END;
$$;