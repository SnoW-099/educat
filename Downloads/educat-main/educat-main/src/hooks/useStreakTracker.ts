import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface StreakData {
  currentStreak: number;
  longestStreak: number;
  lastActivityDate: string | null;
  totalDaysActive: number;
}

export const useStreakTracker = (userId?: string) => {
  const [streakData, setStreakData] = useState<StreakData>({
    currentStreak: 0,
    longestStreak: 0,
    lastActivityDate: null,
    totalDaysActive: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (userId) {
      loadStreakData();
    }
  }, [userId]);

  const loadStreakData = async () => {
    if (!userId) return;

    setLoading(true);
    try {
      // Load from Supabase
      const { data, error } = await supabase
        .from('user_streaks')
        .select('*')
        .eq('user_id', userId)
        .maybeSingle();

      if (error) {
        console.error('Error loading streak data:', error);
        return;
      }

      if (data) {
        // Check if we need to update the streak
        const today = new Date().toISOString().split('T')[0];
        const lastDate = data.last_activity_date;
        
        const daysDiff = getDaysDifference(lastDate, today);
        
        if (daysDiff === 0) {
          // Same day - no changes
          setStreakData({
            currentStreak: data.current_streak,
            longestStreak: data.longest_streak,
            lastActivityDate: data.last_activity_date,
            totalDaysActive: data.current_streak // Approximate
          });
        } else if (daysDiff > 1) {
          // Streak broken - reset in state but don't update DB until next activity
          setStreakData({
            currentStreak: 0,
            longestStreak: data.longest_streak,
            lastActivityDate: data.last_activity_date,
            totalDaysActive: data.current_streak
          });
        } else {
          // Continue streak
          setStreakData({
            currentStreak: data.current_streak,
            longestStreak: data.longest_streak,
            lastActivityDate: data.last_activity_date,
            totalDaysActive: data.current_streak
          });
        }
      } else {
        // No data yet - first time
        setStreakData({
          currentStreak: 0,
          longestStreak: 0,
          lastActivityDate: null,
          totalDaysActive: 0
        });
      }
    } catch (error) {
      console.error('Error loading streak data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getDaysDifference = (date1: string, date2: string): number => {
    const d1 = new Date(date1);
    const d2 = new Date(date2);
    const diffTime = Math.abs(d2.getTime() - d1.getTime());
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const updateStreak = async () => {
    if (!userId) return;

    const today = new Date().toISOString().split('T')[0];
    const lastDate = streakData.lastActivityDate;

    // Don't update if already updated today
    if (lastDate === today) {
      return streakData;
    }

    let newCurrentStreak = streakData.currentStreak;
    
    if (!lastDate) {
      // First time
      newCurrentStreak = 1;
    } else {
      const daysDiff = getDaysDifference(lastDate, today);
      
      if (daysDiff === 1) {
        // Consecutive day
        newCurrentStreak = streakData.currentStreak + 1;
      } else if (daysDiff > 1) {
        // Streak broken, reset to 1
        newCurrentStreak = 1;
      }
    }

    const newLongestStreak = Math.max(newCurrentStreak, streakData.longestStreak);

    // Save to Supabase
    try {
      const { error } = await supabase
        .from('user_streaks')
        .upsert({
          user_id: userId,
          current_streak: newCurrentStreak,
          longest_streak: newLongestStreak,
          last_activity_date: today
        }, {
          onConflict: 'user_id'
        });

      if (error) {
        console.error('Error updating streak:', error);
        return streakData;
      }

      const newStreakData: StreakData = {
        currentStreak: newCurrentStreak,
        longestStreak: newLongestStreak,
        lastActivityDate: today,
        totalDaysActive: streakData.totalDaysActive + 1
      };
      
      setStreakData(newStreakData);
      return newStreakData;
    } catch (error) {
      console.error('Error saving streak to database:', error);
      return streakData;
    }
  };

  return {
    streakData,
    loading,
    updateStreak,
    refreshStreak: loadStreakData
  };
};
