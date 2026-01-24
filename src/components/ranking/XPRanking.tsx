import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Trophy, Medal, Award, Crown, Zap } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { LoadingSpinner } from "@/components/ui/loading-spinner";

interface RankingEntry {
  student_id: string;
  student_name: string;
  xp_points: number;
  ranking_position: number;
}

interface XPRankingProps {
  classId: string;
  currentUserId?: string;
  className?: string;
}

export const XPRanking = ({ classId, currentUserId, className = '' }: XPRankingProps) => {
  const [rankings, setRankings] = useState<RankingEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentMonth, setCurrentMonth] = useState('');
  const { toast } = useToast();

  // Calculate daily XP for a student from exercise attempts
  const getDailyXP = async (studentId: string) => {
    try {
      const today = new Date();
      const todayStart = new Date(today.getFullYear(), today.getMonth(), today.getDate()).toISOString();
      const todayEnd = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1).toISOString();

      const { data: todayAttempts, error } = await supabase
        .from('exercise_attempts')
        .select('score, exercises!inner(level)')
        .eq('student_id', studentId)
        .gte('completed_at', todayStart)
        .lt('completed_at', todayEnd);

      if (error) return 0;

      let dailyXPCalculated = 0;
      todayAttempts?.forEach(attempt => {
        const level = attempt.exercises?.level;
        let multiplier = 1.5; // Default for A1
        
        switch (level) {
          case 'A2': multiplier = 1.7; break;
          case 'B1': multiplier = 2.0; break;
          case 'B2': multiplier = 2.2; break;
          case 'C1': multiplier = 2.4; break;
          case 'C2': multiplier = 2.5; break;
        }
        
        dailyXPCalculated += Math.round(attempt.score * multiplier);
      });

      return dailyXPCalculated;
    } catch (error) {
      console.error('Error calculating daily XP:', error);
      return 0;
    }
  };

  useEffect(() => {
    if (classId) {
      const now = new Date();
      const monthYear = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
      setCurrentMonth(monthYear);
      fetchRankings(monthYear);

      // Set up real-time listener for XP changes
      const xpRankingsChannel = supabase
        .channel('xp-rankings-realtime')
        .on(
          'postgres_changes',
          {
            event: '*',
            schema: 'public',
            table: 'student_xp_rankings',
            filter: `class_id=eq.${classId}`
          },
          () => {
            // Refetch rankings when XP changes in this class
            fetchRankings(monthYear);
          }
        )
        .subscribe();

      return () => {
        supabase.removeChannel(xpRankingsChannel);
      };
    }
  }, [classId]);

  const fetchRankings = async (monthYear: string) => {
    try {
      setLoading(true);
      
      // Use RPC function to get rankings with names (bypasses RLS issues)
      const { data, error } = await (supabase as any).rpc('get_class_rankings', {
        p_class_id: classId,
        p_month_year: monthYear,
        p_limit: 5
      });

      console.log('[XPRanking] RPC result:', { data, error, classId, monthYear });

      if (error) {
        console.error('RPC error:', error);
        throw error;
      }

      const rows: any[] = Array.isArray(data) ? data : [];
      const rankingsData: RankingEntry[] = rows.map((entry: any) => ({
        student_id: entry.student_id,
        student_name: entry.student_name || 'Usuari desconegut',
        xp_points: entry.xp_points,
        ranking_position: entry.ranking_position
      }));

      console.log('[XPRanking] Final processed rankings:', rankingsData);
      setRankings(rankingsData);
    } catch (error) {
      console.error('Error fetching rankings:', error);
      toast({
        title: 'Error',
        description: 'No s\'han pogut carregar les classificacions',
        variant: 'destructive'
      });
      setRankings([]);
    } finally {
      setLoading(false);
    }
  };

  const getRankIcon = (position: number) => {
    switch (position) {
      case 1:
        return <Crown className="h-5 w-5 text-white" />;
      case 2:
        return <Medal className="h-5 w-5 text-white" />;
      case 3:
        return <Award className="h-5 w-5 text-white" />;
      default:
        return <Trophy className="h-4 w-4 text-white" />;
    }
  };

  const getRankColor = (position: number) => {
    switch (position) {
      case 1:
        return 'bg-gradient-to-r from-blue-800 to-blue-900 shadow-lg';
      case 2:
        return 'bg-gradient-to-r from-blue-700 to-blue-800 shadow-md';
      case 3:
        return 'bg-gradient-to-r from-blue-600 to-blue-700 shadow-md';
      default:
        return 'bg-gradient-to-r from-blue-500 to-blue-600';
    }
  };

  const getRankBadge = (position: number) => {
    switch (position) {
      case 1:
        return <Badge className="bg-blue-100 text-blue-800 text-xs ml-2">Primer</Badge>;
      case 2:
        return <Badge className="bg-blue-100 text-blue-800 text-xs ml-2">Segon</Badge>;
      case 3:
        return <Badge className="bg-blue-100 text-blue-800 text-xs ml-2">Tercer</Badge>;
      default:
        return null;
    }
  };

  const getMonthName = (monthYear: string) => {
    const [year, month] = monthYear.split('-');
    const date = new Date(parseInt(year), parseInt(month) - 1);
    return date.toLocaleDateString('ca-ES', { year: 'numeric', month: 'long' });
  };

  if (loading) {
      return (
        <Card className={`${className} glass-card`}>
          <CardContent className="flex items-center justify-center h-64">
            <div className="text-center">
            <LoadingSpinner size="lg" className="mb-4" />
            <p className="text-muted-foreground">Carregant classificació...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={`${className} glass-card`}>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Trophy className="h-5 w-5 text-accent" />
            <CardTitle className="text-lg">Classificació Experiència</CardTitle>
          </div>
          <Badge variant="outline" className="text-xs">
            {getMonthName(currentMonth)}
          </Badge>
        </div>
        <CardDescription>
          Punts d'experiència del mes
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-3">
        {rankings.length === 0 ? (
          <div className="text-center text-muted-foreground py-8">
            <Trophy className="h-12 w-12 mx-auto mb-3 opacity-50" />
            <p>Encara no hi ha classificació aquest mes.</p>
            <p className="text-sm">Completa exercicis per començar a guanyar experiència!</p>
          </div>
        ) : (
          rankings.map((entry, index) => {
            const isCurrentUser = entry.student_id === currentUserId;
            
            return (
              <div
                key={entry.student_id}
                className={`flex items-center space-x-3 p-3 rounded-lg transition-all ${
                  isCurrentUser 
                    ? 'bg-accent/20 border border-accent/30 shadow-sm' 
                    : 'bg-card hover:bg-muted/50'
                } ${entry.ranking_position <= 3 ? 'ring-1 ring-accent/20' : ''}`}
              >
                <div className={`flex items-center justify-center w-8 h-8 rounded-full ${getRankColor(entry.ranking_position)}`}>
                  {entry.ranking_position <= 3 ? (
                    getRankIcon(entry.ranking_position)
                  ) : (
                    <span className="text-sm font-bold text-white">
                      {entry.ranking_position}
                    </span>
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2">
                     <div className="flex items-center">
                       <p className={`text-sm font-medium truncate ${
                         isCurrentUser ? 'text-accent-foreground font-bold' : ''
                       }`}>
                         {entry.student_name}
                         {isCurrentUser && (
                           <span className="ml-2 text-xs text-accent font-normal">(Tu)</span>
                         )}
                       </p>
                       {getRankBadge(entry.ranking_position)}
                     </div>
                  </div>
                </div>

                 <div className="flex items-center space-x-2">
                     <div className="text-right">
                       <div className="flex items-center space-x-1">
                         <Zap className="h-3 w-3 text-accent" />
                         <span className="text-sm font-bold">
                           {entry.xp_points.toLocaleString()}
                         </span>
                       </div>
                         <div className="text-xs text-muted-foreground">
                           +exercicis
                         </div>
                     </div>
                 </div>
              </div>
            );
          })
        )}

        {rankings.length > 0 && (
          <div className="text-center text-xs text-muted-foreground pt-2 border-t">
            La classificació es reinicia cada mes
          </div>
        )}
      </CardContent>
    </Card>
  );
};