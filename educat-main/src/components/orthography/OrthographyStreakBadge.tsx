import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Flame, Trophy, Zap } from 'lucide-react';
import { useStreakTracker } from '@/hooks/useStreakTracker';
import { supabase } from '@/integrations/supabase/client';

interface OrthographyStreakBadgeProps {
  userId?: string;
}

export const OrthographyStreakBadge = ({ userId }: OrthographyStreakBadgeProps) => {
  const { streakData, loading } = useStreakTracker(userId);
  const [totalXP, setTotalXP] = useState(0);
  const [loadingXP, setLoadingXP] = useState(true);

  useEffect(() => {
    const fetchTotalXP = async () => {
      if (!userId) {
        setLoadingXP(false);
        return;
      }

      try {
        const { data, error } = await supabase
          .from('student_xp_rankings')
          .select('xp_points')
          .eq('student_id', userId);

        if (error) throw error;

        const total = data?.reduce((sum, record) => sum + record.xp_points, 0) || 0;
        setTotalXP(total);
      } catch (error) {
        console.error('Error fetching XP:', error);
      } finally {
        setLoadingXP(false);
      }
    };

    fetchTotalXP();
  }, [userId]);

  if (loading || loadingXP) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-gradient-to-r from-orange-500/10 to-red-500/10 border-orange-500/20">
          <CardContent className="pt-6">
            <div className="animate-pulse">
              <div className="h-8 bg-muted rounded w-24 mb-2"></div>
              <div className="h-4 bg-muted rounded w-32"></div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border-blue-500/20">
          <CardContent className="pt-6">
            <div className="animate-pulse">
              <div className="h-8 bg-muted rounded w-24 mb-2"></div>
              <div className="h-4 bg-muted rounded w-32"></div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border-purple-500/20">
          <CardContent className="pt-6">
            <div className="animate-pulse">
              <div className="h-8 bg-muted rounded w-24 mb-2"></div>
              <div className="h-4 bg-muted rounded w-32"></div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const getStreakColor = (streak: number) => {
    if (streak >= 30) return 'from-purple-500 to-pink-500';
    if (streak >= 14) return 'from-orange-500 to-red-500';
    if (streak >= 7) return 'from-yellow-500 to-orange-500';
    return 'from-orange-400 to-yellow-400';
  };

  const getStreakLevel = (streak: number) => {
    if (streak >= 30) return 'Llegenda';
    if (streak >= 14) return 'Expert';
    if (streak >= 7) return 'Compromès';
    return 'En foc';
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {/* Current Streak */}
      <Card className={`bg-gradient-to-br ${getStreakColor(streakData.currentStreak)} text-white border-0 shadow-lg`}>
        <CardContent className="pt-6">
          <div className="flex items-center justify-between mb-2">
            <Flame className="h-8 w-8" />
            <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
              {getStreakLevel(streakData.currentStreak)}
            </Badge>
          </div>
          <div className="mt-4">
            <p className="text-5xl font-bold">{streakData.currentStreak}</p>
            <p className="text-sm opacity-90 mt-1">
              {streakData.currentStreak === 1 ? 'Dia consecutiu' : 'Dies consecutius'}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Total XP */}
      <Card className="bg-gradient-to-br from-purple-500 to-pink-500 text-white border-0 shadow-lg">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between mb-2">
            <Zap className="h-8 w-8" />
            <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
              Total
            </Badge>
          </div>
          <div className="mt-4">
            <p className="text-5xl font-bold">{totalXP.toLocaleString()}</p>
            <p className="text-sm opacity-90 mt-1">Punts d'experiència</p>
          </div>
        </CardContent>
      </Card>

      {/* Longest Streak */}
      <Card className="bg-gradient-to-br from-blue-500 to-cyan-500 text-white border-0 shadow-lg">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between mb-2">
            <Trophy className="h-8 w-8" />
            <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
              Rècord
            </Badge>
          </div>
          <div className="mt-4">
            <p className="text-5xl font-bold">{streakData.longestStreak}</p>
            <p className="text-sm opacity-90 mt-1">Ratxa més llarga</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
