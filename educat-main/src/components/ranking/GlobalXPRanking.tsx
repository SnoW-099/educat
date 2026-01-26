import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Trophy, Medal, Award, Crown, Zap, Globe } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { LoadingSpinner } from "@/components/ui/loading-spinner";

interface GlobalRankingEntry {
  student_id: string;
  student_name: string;
  xp_points: number;
  ranking_position: number;
  class_name?: string;
}

interface GlobalXPRankingProps {
  currentUserId?: string;
  className?: string;
}

export const GlobalXPRanking = ({ currentUserId, className = '' }: GlobalXPRankingProps) => {
  const [rankings, setRankings] = useState<GlobalRankingEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentMonth, setCurrentMonth] = useState('');
  const { toast } = useToast();

  useEffect(() => {
    const now = new Date();
    const monthYear = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
    setCurrentMonth(monthYear);
    fetchGlobalRankings(monthYear);

    // Set up real-time listener for XP changes
    const xpRankingsChannel = supabase
      .channel('global-xp-rankings-realtime')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'student_xp_rankings'
        },
        () => {
          // Refetch rankings when any XP changes
          fetchGlobalRankings(monthYear);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(xpRankingsChannel);
    };
  }, []);

  const fetchGlobalRankings = async (monthYear: string) => {
    try {
      setLoading(true);
      
      // Get current user's professor
      const { data: currentUserEnrollment } = await supabase
        .from('enrollments')
        .select('class_id')
        .eq('student_id', currentUserId)
        .eq('is_active', true)
        .single();

      if (!currentUserEnrollment?.class_id) {
        setRankings([]);
        return;
      }

      // Get the professor of the current user's class
      const { data: currentClass } = await supabase
        .from('classes')
        .select('professor_id')
        .eq('id', currentUserEnrollment.class_id)
        .single();

      if (!currentClass?.professor_id) {
        setRankings([]);
        return;
      }

      // Get all classes from the same professor
      const { data: professorClasses } = await supabase
        .from('classes')
        .select('id')
        .eq('professor_id', currentClass.professor_id)
        .eq('is_active', true);

      if (!professorClasses || professorClasses.length === 0) {
        setRankings([]);
        return;
      }

      const classIds = professorClasses.map(c => c.id);

      // Get top 5 students across all professor's classes for current month
      const { data: xpData, error: xpError } = await supabase
        .from('student_xp_rankings')
        .select('student_id, xp_points, class_id')
        .eq('month_year', monthYear)
        .in('class_id', classIds)
        .order('xp_points', { ascending: false })
        .limit(5);

      if (xpError) throw xpError;

      if (!xpData || xpData.length === 0) {
        setRankings([]);
        return;
      }

      // Get student names - ensure we get the name field
      const studentIds = xpData.map(entry => entry.student_id);
      const { data: profiles, error: profilesError } = await supabase
        .from('profiles')
        .select('user_id, name, email')
        .in('user_id', studentIds);

      if (profilesError) throw profilesError;

      // Get class names
      const xpClassIds = xpData.map(entry => entry.class_id).filter(Boolean);
      const { data: classes, error: classesError } = await supabase
        .from('classes')
        .select('id, name')
        .in('id', xpClassIds);

      if (classesError) throw classesError;

      // Combine data
      const rankingsData: GlobalRankingEntry[] = xpData.map((entry, index) => {
        const profile = profiles?.find(p => p.user_id === entry.student_id);
        const classInfo = classes?.find(c => c.id === entry.class_id);
        // Use name if available, otherwise use email, otherwise show unknown
        const displayName = profile?.name || profile?.email || 'Usuari desconegut';
        return {
          student_id: entry.student_id,
          student_name: displayName,
          xp_points: entry.xp_points,
          ranking_position: index + 1,
          class_name: classInfo?.name
        };
      });

      setRankings(rankingsData);
    } catch (error) {
      console.error('Error fetching global rankings:', error);
      toast({
        title: 'Error',
        description: 'No s\'han pogut carregar les classificacions globals',
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
        return 'bg-gradient-to-r from-purple-800 to-purple-900 shadow-lg';
      case 2:
        return 'bg-gradient-to-r from-purple-700 to-purple-800 shadow-md';
      case 3:
        return 'bg-gradient-to-r from-purple-600 to-purple-700 shadow-md';
      default:
        return 'bg-gradient-to-r from-purple-500 to-purple-600';
    }
  };

  const getRankBadge = (position: number) => {
    switch (position) {
      case 1:
        return <Badge className="bg-purple-100 text-purple-800 text-xs ml-2">Primer</Badge>;
      case 2:
        return <Badge className="bg-purple-100 text-purple-800 text-xs ml-2">Segon</Badge>;
      case 3:
        return <Badge className="bg-purple-100 text-purple-800 text-xs ml-2">Tercer</Badge>;
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
            <p className="text-muted-foreground">Carregant classificació global...</p>
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
            <Globe className="h-5 w-5 text-purple-500" />
            <CardTitle className="text-lg">Classificació Global</CardTitle>
          </div>
          <Badge variant="outline" className="text-xs">
            {getMonthName(currentMonth)}
          </Badge>
        </div>
        <CardDescription>
          Top 5 entre totes les classes del teu professor
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-3">
        {rankings.length === 0 ? (
          <div className="text-center text-muted-foreground py-8">
            <Globe className="h-12 w-12 mx-auto mb-3 opacity-50" />
            <p>Encara no hi ha classificació global aquest mes.</p>
            <p className="text-sm">Completa exercicis per aparèixer a la classificació!</p>
          </div>
        ) : (
          rankings.map((entry) => {
            const isCurrentUser = entry.student_id === currentUserId;
            
            return (
              <div
                key={entry.student_id}
                className={`flex items-center space-x-3 p-3 rounded-lg transition-all ${
                  isCurrentUser 
                    ? 'bg-purple-500/20 border border-purple-500/30 shadow-sm' 
                    : 'bg-card hover:bg-muted/50'
                } ${entry.ranking_position <= 3 ? 'ring-1 ring-purple-500/20' : ''}`}
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
                     <div className="flex flex-col">
                       <div className="flex items-center">
                         <p className={`text-sm font-medium truncate ${
                           isCurrentUser ? 'text-purple-700 dark:text-purple-400 font-bold' : ''
                         }`}>
                           {entry.student_name}
                           {isCurrentUser && (
                             <span className="ml-2 text-xs text-purple-600 dark:text-purple-400 font-normal">(Tu)</span>
                           )}
                         </p>
                         {getRankBadge(entry.ranking_position)}
                       </div>
                       {entry.class_name && (
                         <p className="text-xs text-muted-foreground truncate">
                           {entry.class_name}
                         </p>
                       )}
                     </div>
                  </div>
                </div>

                 <div className="flex items-center space-x-2">
                     <div className="text-right">
                       <div className="flex items-center space-x-1">
                         <Zap className="h-3 w-3 text-purple-500" />
                         <span className="text-sm font-bold">
                           {entry.xp_points.toLocaleString()}
                         </span>
                       </div>
                         <div className="text-xs text-muted-foreground">
                           XP
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
