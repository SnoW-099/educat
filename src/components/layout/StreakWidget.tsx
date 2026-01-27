import { Flame, TrendingUp, Target, Zap } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';

interface StreakWidgetProps {
    userId: string;
}

export const StreakWidget = ({ userId }: StreakWidgetProps) => {
    const [streak, setStreak] = useState(0);
    const [longestStreak, setLongestStreak] = useState(0);
    const [todayCompleted, setTodayCompleted] = useState(false);
    const [isFlaming, setIsFlaming] = useState(false);

    useEffect(() => {
        loadStreak();
        // Listen for streak updates
        const handleUpdate = () => loadStreak();
        window.addEventListener('streakUpdated', handleUpdate);
        return () => window.removeEventListener('streakUpdated', handleUpdate);
    }, [userId]);

    const loadStreak = () => {
        try {
            // Load from real stats
            const realStats = localStorage.getItem(`real_stats_${userId}`);
            if (realStats) {
                const data = JSON.parse(realStats);
                const today = new Date().toISOString().split('T')[0];

                setStreak(data.currentStreak || 0);
                setLongestStreak(data.longestStreak || 0);
                setTodayCompleted(data.lastActivityDate === today);
                return;
            }

            // Fallback to old streak format
            const streakData = localStorage.getItem(`streak_${userId}`);
            if (streakData) {
                const data = JSON.parse(streakData);
                const today = new Date().toDateString();
                const lastDate = new Date(data.lastDate).toDateString();

                if (lastDate === today) {
                    setStreak(data.count);
                    setTodayCompleted(true);
                } else {
                    const yesterday = new Date();
                    yesterday.setDate(yesterday.getDate() - 1);
                    const yesterdayStr = yesterday.toDateString();

                    if (lastDate === yesterdayStr) {
                        setStreak(data.count);
                        setTodayCompleted(false);
                    } else {
                        setStreak(0);
                        setTodayCompleted(false);
                    }
                }
            }
        } catch (error) {
            console.error('Error loading streak:', error);
        }
    };

    const getFlameColor = () => {
        if (streak === 0) return 'text-slate-300';
        if (streak < 3) return 'text-orange-400';
        if (streak < 7) return 'text-orange-500';
        if (streak < 14) return 'text-red-500';
        if (streak < 30) return 'text-red-600';
        return 'text-purple-500';
    };

    const getStreakMessage = () => {
        if (!todayCompleted && streak > 0) return 'Fes un exercici! 🎯';
        if (streak === 0) return 'Comença ara!';
        if (streak === 1) return 'Primera racha!';
        if (streak < 3) return 'Segueix així!';
        if (streak < 7) return 'Imparable! 🔥';
        if (streak < 14) return 'Llegenda! ⚡';
        if (streak < 30) return 'Mestre! 👑';
        return 'DÉU DEL CATALÀ! 🌟';
    };

    const getBackgroundGradient = () => {
        if (streak === 0) return 'from-slate-50 to-slate-100';
        if (streak < 3) return 'from-orange-50 to-amber-50';
        if (streak < 7) return 'from-orange-100 to-amber-100';
        if (streak < 14) return 'from-red-50 to-orange-50';
        if (streak < 30) return 'from-red-100 to-orange-100';
        return 'from-purple-100 to-pink-100';
    };

    return (
        <Card
            className={`relative overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 h-full flex flex-col`}
            onMouseEnter={() => setIsFlaming(true)}
            onMouseLeave={() => setIsFlaming(false)}
        >
            {/* Glow effect for high streaks */}
            {streak >= 7 && (
                <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-red-500/10 animate-pulse" />
            )}

            <div className="p-6 relative z-10 flex flex-col h-full justify-between">
                <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                        {/* Flame icon with animation */}
                        <div className="relative">
                            <Flame
                                className={`h-10 w-10 transition-all duration-300 ${getFlameColor()} ${isFlaming && streak > 0 ? 'animate-bounce' : ''}`}
                                style={{
                                    filter: streak > 0 ? 'drop-shadow(0 0 12px currentColor)' : 'none'
                                }}
                            />
                            {streak > 0 && (
                                <div className="absolute -top-1 -right-1 bg-slate-900 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center shadow-lg">
                                    {streak}
                                </div>
                            )}
                        </div>

                        <div>
                            <p className="text-lg font-bold text-slate-900 dark:text-white">
                                {streak > 0 ? `${streak} ${streak === 1 ? 'dia' : 'dies'}` : 'Sense racha'}
                            </p>
                            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                                {getStreakMessage()}
                            </p>
                        </div>
                    </div>

                    {/* Status indicator */}
                    <div className={`px-2 py-1 rounded-full text-xs font-semibold ${todayCompleted
                        ? 'bg-emerald-100 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-400'
                        : 'bg-amber-100 dark:bg-amber-900/50 text-amber-700 dark:text-amber-400'
                        }`}>
                        {todayCompleted ? '✓ Avui' : 'Pendent'}
                    </div>
                </div>


                {/* Stats row */}
                {longestStreak > 0 && (
                    <div className="flex items-center justify-between mt-4 pt-3 border-t border-slate-200/50 dark:border-slate-600">
                        <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
                            <TrendingUp className="w-3 h-3" />
                            <span>Millor: <strong className="text-slate-700 dark:text-slate-200">{longestStreak} dies</strong></span>
                        </div>
                        {streak >= longestStreak && streak > 1 && (
                            <span className="text-xs bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full font-semibold">
                                🏆 Rècord!
                            </span>
                        )}
                    </div>
                )}
            </div>
        </Card>
    );
};

