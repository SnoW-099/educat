import { useMemo, useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';

interface SkillsData {
  grammar_score: number;
  vocabulary_score: number;
  listening_score: number;
  speaking_score: number;
  reading_score: number;
  writing_score: number;
  overall_score: number;
}

interface SkillsRadarChartProps {
  data: SkillsData;
  currentLevel: string;
  targetLevel: string;
  className?: string;
  loading?: boolean;
  studentId?: string;
  classId?: string;
}

export const SkillsRadarChart = ({ data, currentLevel, targetLevel, className = '', loading = false, studentId, classId }: SkillsRadarChartProps) => {
  const [realSkillsData, setRealSkillsData] = useState(data);

  useEffect(() => {
    if (studentId && classId) {
      fetchRealSkillsData();
    }
  }, [studentId, classId]);

  const fetchRealSkillsData = async () => {
    if (!studentId) return;

    try {
      // Get exercise attempts from last 30 days for this student
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

      const { data: attempts, error } = await supabase
        .from('exercise_attempts')
        .select(`
          score,
          exercises!inner(category, type)
        `)
        .eq('student_id', studentId)
        .gte('completed_at', thirtyDaysAgo.toISOString())
        .gte('score', 50); // Only successful attempts

      if (error) {
        console.error('Error fetching skills data:', error);
        return;
      }

      // Calculate skill scores based on exercise categories
      const skillScores = {
        grammar_score: 0,
        vocabulary_score: 0,
        listening_score: 0,
        speaking_score: 0,
        reading_score: 0,
        writing_score: 0,
        overall_score: 0
      };

      if (attempts && attempts.length > 0) {
        const categoryGroups = attempts.reduce((acc: Record<string, number[]>, attempt) => {
          const category = attempt.exercises?.category || 'Altres';
          if (!acc[category]) acc[category] = [];
          acc[category].push(attempt.score);
          return acc;
        }, {} as Record<string, number[]>);

        // Map categories to skills
        Object.entries(categoryGroups).forEach(([category, scores]) => {
          const average = scores.reduce((sum, score) => sum + score, 0) / scores.length;

          switch (category) {
            case 'ortografia':
            case 'accentuació':
            case 'accent diacrític':
            case 'fonètica':
              skillScores.writing_score += average / 4; // Average writing skills
              break;
            case 'noms':
            case 'verbs':
            case 'adjectius':
            case 'articles':
            case 'pronoms':
              skillScores.grammar_score += average / 5; // Average grammar skills
              break;
            case 'preposicions':
            case 'adverbis':
            case 'derivació':
            case 'frases fetes':
              skillScores.vocabulary_score += average / 4; // Average vocabulary skills
              break;
            case 'confusions':
              skillScores.reading_score = average; // Reading comprehension
              break;
          }
        });

        // Calculate overall score
        const validScores = [
          skillScores.grammar_score,
          skillScores.vocabulary_score,
          skillScores.reading_score,
          skillScores.writing_score
        ].filter(score => score > 0);

        skillScores.overall_score = validScores.length > 0
          ? Math.round(validScores.reduce((sum, score) => sum + score, 0) / validScores.length)
          : 0;

        // Round all scores
        Object.keys(skillScores).forEach(key => {
          skillScores[key as keyof typeof skillScores] = Math.round(skillScores[key as keyof typeof skillScores]);
        });

        setRealSkillsData(skillScores);
      }
    } catch (error) {
      console.error('Error fetching real skills data:', error);
    }
  };

  const actualData = studentId ? realSkillsData : data;

  const radarData = useMemo(() => [
    { skill: 'Gramàtica', score: Math.round(actualData.grammar_score || 0), target: 85 },
    { skill: 'Vocabulari', score: Math.round(actualData.vocabulary_score || 0), target: 85 },
    { skill: 'Lectura', score: Math.round(actualData.reading_score || 0), target: 85 },
    { skill: 'Escriptura', score: Math.round(actualData.writing_score || 0), target: 85 },
    { skill: 'Oral', score: Math.round(((actualData.listening_score || 0) + (actualData.speaking_score || 0)) / 2), target: 85 },
  ], [actualData]);

  const getLevelColor = (level: string) => {
    const colors = {
      'A1': 'hsl(142 76% 36%)', // Green
      'A2': 'hsl(220 60% 30%)', // Blue  
      'B1': 'hsl(38 92% 50%)', // Yellow
      'B2': 'hsl(24 95% 53%)', // Orange
      'C1': 'hsl(0 65% 51%)', // Red
      'C2': 'hsl(262 83% 58%)'  // Purple
    };
    return colors[level as keyof typeof colors] || 'hsl(220 15% 50%)';
  };

  const strengths = radarData.filter(skill => skill.score >= 75).map(skill => skill.skill);
  const weaknesses = radarData.filter(skill => skill.score < 50).map(skill => skill.skill);

  if (loading) {
    return (
      <Card className={`${className} shadow-card`}>
        <CardHeader>
          <CardTitle>Habilitats</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-muted-foreground">Carregant habilitats...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={`${className} shadow-card`}>
      <CardHeader>
        <CardTitle>Anàlisi de Competències</CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">
        <div className="text-center">
          <p className="text-muted-foreground mb-4">Perfil d'aprenentatge basat en exercicis completats</p>
        </div>

        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
              <PolarGrid />
              <PolarAngleAxis dataKey="skill" className="text-xs" />
              <PolarRadiusAxis angle={18} domain={[0, 100]} className="text-xs" />
              <Radar
                name="Puntuació Actual"
                dataKey="score"
                stroke="hsl(var(--primary))"
                fill="hsl(var(--primary))"
                fillOpacity={0.3}
                strokeWidth={2}
              />
              <Radar
                name="Objectiu"
                dataKey="target"
                stroke="hsl(var(--accent))"
                fill="transparent"
                strokeDasharray="5 5"
                strokeWidth={1}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>

        <div className="text-center">
          <div className="text-3xl font-bold text-primary mb-2">
            {Math.round(actualData.overall_score || 0)}%
          </div>
          <p className="text-muted-foreground">Puntuació general</p>
        </div>

      </CardContent>
    </Card>
  );
};