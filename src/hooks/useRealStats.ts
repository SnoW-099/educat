import { useState, useEffect, useCallback } from 'react';

interface DailyActivity {
    date: string;
    exercisesCompleted: number;
    correctAnswers: number;
    wrongAnswers: number;
    xpEarned: number;
}

interface RealStats {
    totalExercises: number;
    totalCorrect: number;
    totalErrors: number;
    accuracy: number;
    xpTotal: number;
    currentStreak: number;
    longestStreak: number;
    lastActivityDate: string | null;
    dailyActivity: DailyActivity[];
    todayExercises: number;
    todayCorrect: number;
    todayErrors: number;
    dailyGoalProgress: number; // percentage towards daily goal (e.g., 5 exercises)
}

const DAILY_GOAL = 5; // exercises per day

export const useRealStats = (userId?: string) => {
    const [stats, setStats] = useState<RealStats>({
        totalExercises: 0,
        totalCorrect: 0,
        totalErrors: 0,
        accuracy: 0,
        xpTotal: 0,
        currentStreak: 0,
        longestStreak: 0,
        lastActivityDate: null,
        dailyActivity: [],
        todayExercises: 0,
        todayCorrect: 0,
        todayErrors: 0,
        dailyGoalProgress: 0
    });

    const getStorageKey = useCallback(() => `real_stats_${userId}`, [userId]);

    const loadStats = useCallback(() => {
        if (!userId) return;
        try {
            const saved = localStorage.getItem(getStorageKey());
            if (saved) {
                const parsed = JSON.parse(saved);

                // Calculate today's stats
                const today = new Date().toISOString().split('T')[0];
                const todayActivity = parsed.dailyActivity?.find((d: DailyActivity) => d.date === today);

                // Check streak
                const lastDate = parsed.lastActivityDate;
                let currentStreak = parsed.currentStreak || 0;

                if (lastDate) {
                    const daysDiff = getDaysDifference(lastDate, today);
                    if (daysDiff > 1) {
                        currentStreak = 0; // Streak broken
                    }
                }

                setStats({
                    ...parsed,
                    currentStreak,
                    todayExercises: todayActivity?.exercisesCompleted || 0,
                    todayCorrect: todayActivity?.correctAnswers || 0,
                    todayErrors: todayActivity?.wrongAnswers || 0,
                    dailyGoalProgress: Math.min(100, ((todayActivity?.exercisesCompleted || 0) / DAILY_GOAL) * 100),
                    accuracy: parsed.totalExercises > 0
                        ? Math.round((parsed.totalCorrect / parsed.totalExercises) * 100)
                        : 0
                });
            }
        } catch (error) {
            console.error('Error loading stats:', error);
        }
    }, [userId, getStorageKey]);

    // Initial load and event listeners
    useEffect(() => {
        loadStats();

        const handleStatsUpdate = (event: Event) => {
            // Only reload if the event is relevant (optional optimization)
            loadStats();
        };

        const handleStorage = (event: StorageEvent) => {
            if (event.key === getStorageKey()) {
                loadStats();
            }
        };

        window.addEventListener('stats_updated', handleStatsUpdate);
        window.addEventListener('storage', handleStorage);

        return () => {
            window.removeEventListener('stats_updated', handleStatsUpdate);
            window.removeEventListener('storage', handleStorage);
        };
    }, [loadStats, getStorageKey]);

    const getDaysDifference = (date1: string, date2: string): number => {
        const d1 = new Date(date1);
        const d2 = new Date(date2);
        const diffTime = Math.abs(d2.getTime() - d1.getTime());
        return Math.floor(diffTime / (1000 * 60 * 60 * 24));
    };

    // Record an exercise attempt
    const recordExercise = useCallback((isCorrect: boolean, xpEarned: number = 0) => {
        if (!userId) return;

        const today = new Date().toISOString().split('T')[0];

        // Load latest stats first to ensure we don't overwrite concurrent updates (though React batching helps)
        // Actually, best to read from localStorage freshly to be safe or use functional state update which might be stale if called rapidly.
        // For simplicity and existing pattern, we read previous state but realistically we should read from storage for source of truth.
        // Let's improve robustness by reading storage inside updater or just trusting the state + event pattern.

        // We will read current storage state to base updates on "truth"
        let currentStats = stats;
        try {
            const saved = localStorage.getItem(getStorageKey());
            if (saved) currentStats = JSON.parse(saved);
        } catch (e) { }

        // Calculate new stats based on currentStats (which is latest from storage)
        const prev = currentStats;

        // Update daily activity
        let dailyActivity = [...(prev.dailyActivity || [])];
        let todayIndex = dailyActivity.findIndex(d => d.date === today);

        if (todayIndex === -1) {
            dailyActivity.push({
                date: today,
                exercisesCompleted: 0,
                correctAnswers: 0,
                wrongAnswers: 0,
                xpEarned: 0
            });
            todayIndex = dailyActivity.length - 1;
        }

        dailyActivity[todayIndex] = {
            ...dailyActivity[todayIndex],
            exercisesCompleted: dailyActivity[todayIndex].exercisesCompleted + 1,
            correctAnswers: dailyActivity[todayIndex].correctAnswers + (isCorrect ? 1 : 0),
            wrongAnswers: dailyActivity[todayIndex].wrongAnswers + (isCorrect ? 0 : 1),
            xpEarned: dailyActivity[todayIndex].xpEarned + xpEarned
        };

        // Keep only last 30 days
        if (dailyActivity.length > 30) {
            dailyActivity = dailyActivity.slice(-30);
        }

        // Update streak
        let currentStreak = prev.currentStreak || 0;
        const lastDate = prev.lastActivityDate;

        if (!lastDate || lastDate !== today) {
            if (!lastDate) {
                currentStreak = 1;
                console.log('Streak system: Initialized streak to 1');
            } else {
                const daysDiff = getDaysDifference(lastDate, today);
                if (daysDiff === 1) {
                    currentStreak = (prev.currentStreak || 0) + 1;
                    console.log(`Streak system: Incrementing streak to ${currentStreak}`);
                } else if (daysDiff > 1) {
                    currentStreak = 1;
                    console.log('Streak system: Streak was broken, resetting to 1');
                }
            }
        } else {
            console.log(`Streak system: Already active today. Current streak: ${currentStreak}`);
        }

        const longestStreak = Math.max(currentStreak, prev.longestStreak || 0);

        const newStats: RealStats = {
            totalExercises: (prev.totalExercises || 0) + 1,
            totalCorrect: (prev.totalCorrect || 0) + (isCorrect ? 1 : 0),
            totalErrors: (prev.totalErrors || 0) + (isCorrect ? 0 : 1),
            accuracy: 0, // Will be calculated below
            xpTotal: (prev.xpTotal || 0) + xpEarned,
            currentStreak,
            longestStreak,
            lastActivityDate: today,
            dailyActivity,
            todayExercises: dailyActivity[todayIndex].exercisesCompleted,
            todayCorrect: dailyActivity[todayIndex].correctAnswers,
            todayErrors: dailyActivity[todayIndex].wrongAnswers,
            dailyGoalProgress: Math.min(100, (dailyActivity[todayIndex].exercisesCompleted / DAILY_GOAL) * 100)
        };

        newStats.accuracy = newStats.totalExercises > 0
            ? Math.round((newStats.totalCorrect / newStats.totalExercises) * 100)
            : 0;

        // Save to localStorage
        localStorage.setItem(getStorageKey(), JSON.stringify(newStats));

        // Also update streak in the old format for StreakWidget compatibility
        localStorage.setItem(`streak_${userId}`, JSON.stringify({
            count: currentStreak,
            lastDate: today
        }));

        // Dispatch global event to notify all components
        window.dispatchEvent(new Event('stats_updated'));
        window.dispatchEvent(new Event('streakUpdated')); // Legacy event for StreakWidget

        // Update local state immediately
        setStats(newStats);

    }, [userId, getStorageKey, stats]); // Added stats dependency but we read from storage anyway

    // Get activity for last 7 days (for weekly chart)
    const getWeeklyActivity = useCallback((): number[] => {
        const result: number[] = [];
        const today = new Date();

        for (let i = 6; i >= 0; i--) {
            const date = new Date(today);
            date.setDate(date.getDate() - i);
            const dateStr = date.toISOString().split('T')[0];

            const activity = stats.dailyActivity.find(d => d.date === dateStr);
            result.push(activity?.exercisesCompleted || 0);
        }

        return result;
    }, [stats.dailyActivity]);

    return {
        stats,
        recordExercise,
        getWeeklyActivity,
        DAILY_GOAL
    };
};
