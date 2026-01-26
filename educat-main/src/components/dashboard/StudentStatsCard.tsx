import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { UserMinus, Trophy, Flame, BookOpen, Activity } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface StudentStatsCardProps {
  student: {
    id: string;
    name: string;
    email: string;
    enrolled_at: string;
  };
  classId: string;
  onRemove: (studentId: string) => void;
}

interface StudentStats {
  totalExercises: number;
  currentStreak: number;
  longestStreak: number;
  totalXP: number;
  lastExercise?: {
    title: string;
    completed_at: string;
  };
}

export const StudentStatsCard = ({ student, classId, onRemove }: StudentStatsCardProps) => {
  const [stats, setStats] = useState<StudentStats>({
    totalExercises: 0,
    currentStreak: 0,
    longestStreak: 0,
    totalXP: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStudentStats = async () => {
      try {
        // Fetch exercise attempts count
        const { count: exerciseCount } = await supabase
          .from('exercise_attempts')
          .select('*', { count: 'exact', head: true })
          .eq('student_id', student.id);

        // Fetch streak data
        const { data: streakData } = await supabase
          .from('user_streaks')
          .select('current_streak, longest_streak')
          .eq('user_id', student.id)
          .single();

        // Fetch XP for this class
        const currentMonth = new Date().toISOString().slice(0, 7); // YYYY-MM
        const { data: xpData } = await supabase
          .from('student_xp_rankings')
          .select('xp_points')
          .eq('student_id', student.id)
          .eq('class_id', classId)
          .eq('month_year', currentMonth)
          .single();

        // Fetch last exercise
        const { data: lastExerciseData } = await supabase
          .from('exercise_attempts')
          .select(`
            completed_at,
            exercises!inner(title)
          `)
          .eq('student_id', student.id)
          .order('completed_at', { ascending: false })
          .limit(1)
          .single();

        setStats({
          totalExercises: exerciseCount || 0,
          currentStreak: streakData?.current_streak || 0,
          longestStreak: streakData?.longest_streak || 0,
          totalXP: xpData?.xp_points || 0,
          lastExercise: lastExerciseData ? {
            title: lastExerciseData.exercises.title,
            completed_at: lastExerciseData.completed_at
          } : undefined
        });
      } catch (error) {
        console.error('Error fetching student stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStudentStats();
  }, [student.id, classId]);

  return (
    <Card className="glass-card">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">{student.name}</CardTitle>
        <CardDescription>{student.email}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-3">
            <div className="flex items-center gap-2 p-2 rounded-lg bg-gradient-surface">
              <BookOpen className="h-4 w-4 text-primary" />
              <div>
                <div className="text-xs text-muted-foreground">Exercicis</div>
                <div className="text-lg font-bold">{stats.totalExercises}</div>
              </div>
            </div>

            <div className="flex items-center gap-2 p-2 rounded-lg bg-gradient-surface">
              <Trophy className="h-4 w-4 text-accent" />
              <div>
                <div className="text-xs text-muted-foreground">XP Total</div>
                <div className="text-lg font-bold">{stats.totalXP}</div>
              </div>
            </div>

            <div className="flex items-center gap-2 p-2 rounded-lg bg-gradient-surface">
              <Flame className="h-4 w-4 text-destructive" />
              <div>
                <div className="text-xs text-muted-foreground">Ratxa</div>
                <div className="text-lg font-bold">{stats.currentStreak}</div>
              </div>
            </div>

            <div className="flex items-center gap-2 p-2 rounded-lg bg-gradient-surface">
              <Activity className="h-4 w-4 text-chart-2" />
              <div>
                <div className="text-xs text-muted-foreground">Rècord</div>
                <div className="text-lg font-bold">{stats.longestStreak}</div>
              </div>
            </div>
          </div>

          {/* Last Exercise */}
          {stats.lastExercise && (
            <div className="p-3 rounded-lg border bg-card">
              <div className="text-xs text-muted-foreground mb-1">Últim exercici:</div>
              <div className="text-sm font-medium truncate">{stats.lastExercise.title}</div>
              <div className="text-xs text-muted-foreground mt-1">
                {new Date(stats.lastExercise.completed_at).toLocaleString('ca-ES')}
              </div>
            </div>
          )}

          {/* Enrollment Date */}
          <div className="text-sm text-muted-foreground">
            Inscrit: {new Date(student.enrolled_at).toLocaleDateString('ca-ES')}
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end space-x-2 pt-2">
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button size="sm" variant="destructive">
                  <UserMinus className="h-4 w-4 mr-2" />
                  Eliminar
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Eliminar alumne</AlertDialogTitle>
                  <AlertDialogDescription>
                    Estàs segur que vols eliminar {student.name} de la classe permanentment?
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel·lar</AlertDialogCancel>
                  <AlertDialogAction onClick={() => onRemove(student.id)}>
                    Eliminar
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
