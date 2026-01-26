import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { supabase } from '@/integrations/supabase/client';
import { Skeleton } from '@/components/ui/skeleton';
import { LoadingSpinner } from '@/components/ui/loading-spinner';

interface XPProgressChartProps {
  studentId: string;
  classId: string;
  className?: string;
}

export const XPProgressChart = ({ studentId, classId, className = '' }: XPProgressChartProps) => {
  const [xpData, setXpData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchXPData();
  }, [studentId, classId]);

  useEffect(() => {
    const attemptsChannel = supabase
      .channel(`xpchart-attempts-${studentId}`)
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'exercise_attempts', filter: `student_id=eq.${studentId}` },
        (payload) => {
          console.log('[XPChart] exercise_attempts change', payload);
          fetchXPData();
        }
      )
      .subscribe();

    const xpChannel = supabase
      .channel(`xpchart-rankings-${studentId}`)
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'student_xp_rankings', filter: `student_id=eq.${studentId}` },
        (payload) => {
          console.log('[XPChart] student_xp_rankings change', payload);
          fetchXPData();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(attemptsChannel);
      supabase.removeChannel(xpChannel);
    };
  }, [studentId, classId]);

  const fetchXPData = async () => {
    try {
      setLoading(true);

      // Fetch real XP data from last 30 days
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

      const { data: attempts } = await supabase
        .from('exercise_attempts')
        .select(`
          completed_at,
          score,
          exercises!inner(
            level,
            class_id
          )
        `)
        .eq('student_id', studentId)
        .or(`exercises.class_id.eq.${classId},exercises.class_id.is.null`)
        .gte('completed_at', thirtyDaysAgo.toISOString())
        .order('completed_at', { ascending: true });

      // Group attempts by day and calculate daily XP
      const dailyXP = Array.from({ length: 30 }, (_, i) => {
        const date = new Date();
        date.setDate(date.getDate() - (29 - i));
        const dateStr = date.toISOString().split('T')[0];

        const dayAttempts = attempts?.filter(attempt =>
          attempt.completed_at.startsWith(dateStr)
        ) || [];

        let dayXP = 0;
        dayAttempts.forEach(attempt => {
          const level = attempt.exercises?.level;
          const multiplier = getLevelMultiplier(level);
          dayXP += Math.round(attempt.score * multiplier);
        });

        return {
          day: i + 1,
          date: dateStr,
          xp: dayXP,
          exercises: dayAttempts.length
        };
      });

      // Calculate cumulative XP
      let cumulativeXP = 0;
      const cumulativeData = dailyXP.map(day => {
        cumulativeXP += day.xp;
        return {
          ...day,
          totalXP: cumulativeXP
        };
      });

      setXpData(cumulativeData);
    } catch (error) {
      console.error('Error fetching XP data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getLevelMultiplier = (level: string) => {
    const multipliers = {
      'A1': 1.2,
      'A2': 1.4,
      'B1': 1.8,
      'B2': 2.0,
      'C1': 2.2,
      'C2': 2.4
    };
    return multipliers[level as keyof typeof multipliers] || 1.2;
  };

  if (loading) {
    return (
      <Card className={className}>
        <CardHeader>
          <CardTitle>Guanys d'Experiència Diaris</CardTitle>
        </CardHeader>
        <CardContent className="h-80 flex items-center justify-center">
          <div className="text-center">
            <LoadingSpinner size="lg" className="mb-4" />
            <p className="text-muted-foreground">Carregant dades...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Guanys d'Experiència Diaris</CardTitle>
        <p className="text-sm text-muted-foreground">
          El teu progrés d'experiència durant els darrers 30 dies
        </p>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={xpData}>
              <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
              <XAxis
                dataKey="day"
                className="text-xs"
                label={{ value: 'Dies', position: 'insideBottom', offset: -5 }}
              />
              <YAxis
                className="text-xs"
                label={{ value: 'Experiència', angle: -90, position: 'insideLeft' }}
              />
              <Tooltip
                labelFormatter={(value) => `Dia ${value}`}
                formatter={(value: any, name: any) => [
                  value ? value.toLocaleString() : '0',
                  name === 'xp' ? 'Del dia' : 'Total'
                ]}
              />
              <Line
                type="monotone"
                dataKey="xp"
                stroke="hsl(var(--primary))"
                strokeWidth={2}
                dot={{ r: 3, fill: 'hsl(var(--primary))' }}
                name="Experiència del dia"
              />
              <Line
                type="monotone"
                dataKey="totalXP"
                stroke="hsl(var(--accent))"
                strokeWidth={2}
                dot={{ r: 3, fill: 'hsl(var(--accent))' }}
                strokeDasharray="5 5"
                name="Acumulada"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};