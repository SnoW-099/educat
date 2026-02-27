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
        if (streak === 1) return 'Primera ratxa!';
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
            className={`group relative overflow-hidden cursor-pointer flex flex-col transition-all duration-500 hover:shadow-lg dark:hover:shadow-[0_8px_30px_rgba(249,115,22,0.1)] bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-orange-400 dark:hover:border-orange-500/50 h-full`}
            onMouseEnter={() => setIsFlaming(true)}
            onMouseLeave={() => setIsFlaming(false)}
        >
            <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-orange-500/20 to-transparent group-hover:via-orange-500/50 transition-colors duration-500" />
            
            {/* Glow effect for high streaks */}
            {streak >= 7 && (
                <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 via-transparent to-red-500/5 animate-pulse" />
            )}

            <div className="p-6 relative z-10 flex flex-col h-full justify-between">
                <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                        {/* Flame icon with animation */}
                        <div className="relative p-2.5 rounded-xl bg-orange-50/80 dark:bg-orange-900/20 border border-orange-100/50 dark:border-orange-800/30 group-hover:scale-110 transition-transform duration-300">
                            <Flame
                                className={`h-6 w-6 transition-all duration-300 ${getFlameColor()} ${isFlaming && streak > 0 ? 'animate-bounce' : ''}`}
                                style={{
                                    filter: streak > 0 ? 'drop-shadow(0 0 8px currentColor)' : 'none'
                                }}
                            />
                            {streak > 0 && (
                                <div className="absolute -top-2 -right-2 bg-foreground text-background text-[10px] font-black rounded-full h-5 w-5 flex items-center justify-center shadow-lg border-2 border-background">
                                    {streak}
                                </div>
                            )}
                        </div>

                        <div>
                            <p className="text-base font-bold text-foreground drop-shadow-sm">
                                {streak > 0 ? `${streak} ${streak === 1 ? 'dia' : 'dies'}` : 'Sense ratxa'}
                            </p>
                            <p className="text-xs text-muted-foreground font-medium drop-shadow-sm">
                                {getStreakMessage()}
                            </p>
                        </div>
                    </div>

                    {/* Status indicator */}
                    <div className={`px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider ${todayCompleted
                        ? 'bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400'
                        : 'bg-amber-500/10 border border-amber-500/20 text-amber-600 dark:text-amber-400'
                        }`}>
                        {todayCompleted ? '✓ Avui' : 'Pendent'}
                    </div>
                </div>

                {/* Stats row */}
                {longestStreak > 0 && (
                    <div className="flex items-center justify-between mt-auto pt-4 border-t border-border/40 pl-1">
                        <div className="flex items-center gap-1.5 text-xs text-muted-foreground font-medium">
                            <TrendingUp className="w-4 h-4 text-orange-400" />
                            <span>Millor: <strong className="text-foreground">{longestStreak} dies</strong></span>
                        </div>
                        {streak >= longestStreak && streak > 1 && (
                            <span className="text-[10px] bg-amber-500/10 border border-amber-500/20 text-amber-600 px-2 py-0.5 rounded-md font-bold uppercase tracking-wider">
                                🏆 Rècord
                            </span>
                        )}
                    </div>
                )}
            </div>
        </Card>
    );
};
