import { useState, useEffect, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogTrigger, DialogTitle, DialogHeader, DialogDescription } from '@/components/ui/dialog';
import { RefreshCw, Delete, Sparkles, Trophy, Play, Check, X } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { BAD_WORDS } from '@/utils/profanityList';
import { PARAULOGIC_GAMES } from '@/utils/paraulogicGames';

export const DailyWordGame = () => {
    const [gameData, setGameData] = useState(PARAULOGIC_GAMES[0]);
    const [currentGuess, setCurrentGuess] = useState('');
    const [foundWords, setFoundWords] = useState<string[]>([]);
    const [isCompleted, setIsCompleted] = useState(false);
    const [isVerifying, setIsVerifying] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [paraulogicStreak, setParaulogicStreak] = useState(0);

    useEffect(() => {
        const today = new Date();
        const dateKey = today.toISOString().split('T')[0];
        const dayIndex = today.getDay();

        // Set game data based on day
        const todaysGame = PARAULOGIC_GAMES[dayIndex % PARAULOGIC_GAMES.length];
        setGameData(todaysGame);

        // Load progress
        const saved = localStorage.getItem(`paraulogic_daily_${dateKey}`);
        if (saved) {
            const parsed = JSON.parse(saved);
            setFoundWords(parsed);
            if (parsed.length >= todaysGame.validWords.length) {
                setIsCompleted(true);
            }
        }

        // Load Paraulogic Streak
        try {
            const streakData = localStorage.getItem('paraulogic_streak');
            if (streakData) {
                const { count, lastDate } = JSON.parse(streakData);
                // Verify if streak is valid (today or yesterday)
                const last = new Date(lastDate);
                // Reset hours to compare dates only
                const todayMidnight = new Date(today);
                todayMidnight.setHours(0, 0, 0, 0);
                const lastMidnight = new Date(last);
                lastMidnight.setHours(0, 0, 0, 0);

                const diffTime = Math.abs(todayMidnight.getTime() - lastMidnight.getTime());
                const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

                if (dateKey === lastDate || diffDays <= 1) {
                    setParaulogicStreak(count);
                } else {
                    setParaulogicStreak(0);
                }
            }
        } catch (e) { console.error(e); }
    }, []);

    const updateStreak = () => {
        const today = new Date().toISOString().split('T')[0];
        const streakData = localStorage.getItem('paraulogic_streak');
        let newCount = 1;

        if (streakData) {
            try {
                const { count, lastDate } = JSON.parse(streakData);
                const last = new Date(lastDate);
                const now = new Date();
                const diffTime = Math.abs(now.getTime() - last.getTime());
                const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

                if (lastDate !== today) {
                    if (diffDays <= 1) { // Consecutive day
                        newCount = count + 1;
                    }
                } else {
                    newCount = count; // Already updated today
                }
            } catch (e) { }
        }

        localStorage.setItem('paraulogic_streak', JSON.stringify({
            count: newCount,
            lastDate: today
        }));
        setParaulogicStreak(newCount);
    };

    const handleLetterClick = (letter: string) => {
        if (isCompleted || isVerifying) return;
        setCurrentGuess(prev => prev + letter);
    };

    const handleShuffle = () => {
        if (isCompleted) return;
        const others = gameData.letters.filter(l => l !== gameData.center);
        for (let i = others.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [others[i], others[j]] = [others[j], others[i]];
        }
        setGameData(prev => ({ ...prev, letters: [prev.center, ...others] }));
    };

    const handleDelete = () => setCurrentGuess(prev => prev.slice(0, -1));

    const normalizeGuess = (value: string) =>
        value
            .trim()
            .toUpperCase()
            .replace(/[’']/g, '')
            .replace(/·/g, '')
            .replace(/-/g, '');

    const validWordsSet = useMemo(() => new Set(gameData.validWords), [gameData]);

    const handleSubmit = async () => {
        if (isCompleted || isVerifying) return;
        const guess = normalizeGuess(currentGuess);

        if (guess.length < 3) return toast({ description: "Massa curta" });
        if (!guess.includes(gameData.center)) return toast({ description: `Has d'utilitzar la lletra ${gameData.center}` });
        if (foundWords.includes(guess)) return toast({ description: "Ja la tens!" });
        if (!/^[A-ZÀ-ÝÇ]+$/.test(guess)) return toast({ description: "Només lletres." });
        if ([...guess].some((letter) => !gameData.letters.includes(letter))) {
            return toast({ description: "Només pots usar les lletres disponibles." });
        }

        if (BAD_WORDS.includes(guess)) {
            setCurrentGuess('');
            return toast({ title: "Paraula bloquejada", variant: "destructive" });
        }

        if (!validWordsSet.has(guess)) {
            setCurrentGuess('');
            return toast({ description: "Només acceptem paraules en català." });
        }

        setIsVerifying(true);
        await new Promise(resolve => setTimeout(resolve, 200));

        const newFound = [...foundWords, guess];
        setFoundWords(newFound);
        setCurrentGuess('');

        const today = new Date().toISOString().split('T')[0];
        localStorage.setItem(`paraulogic_daily_${today}`, JSON.stringify(newFound));

        if (newFound.length >= gameData.validWords.length) {
            setIsCompleted(true);
            updateStreak();
            toast({ title: "🏆 Enhorabona!", description: "Has completat el joc d'avui!", className: "bg-yellow-50 border-yellow-200" });
        }
        setIsVerifying(false);
    };

    const totalPoints = foundWords.reduce((acc, w) => acc + w.length, 0);
    const targetWords = gameData.validWords.length;
    const progressPerc = Math.min(100, Math.round((foundWords.length / targetWords) * 100));

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Card className="group relative overflow-hidden border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-sm hover:border-blue-500/30 hover:shadow-lg dark:hover:shadow-[0_8px_30px_rgba(59,130,246,0.1)] transition-all duration-500 cursor-pointer h-full flex flex-col justify-between">
                    {/* Background Glow */}
                    <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-blue-500/20 to-transparent group-hover:via-blue-500/50 transition-colors duration-500" />
                    
                    <div className={`absolute inset-0 transition-opacity duration-500 opacity-0 group-hover:opacity-100 ${isCompleted ? 'bg-gradient-to-br from-amber-500/5 to-orange-500/5' : 'bg-gradient-to-br from-blue-500/5 to-indigo-500/5'}`} />

                    <CardContent className="p-6 relative z-10 flex flex-col items-center justify-center h-full text-center space-y-4">
                        <div className={`relative p-3 rounded-2xl flex items-center justify-center transition-all duration-500 ease-out border ${isCompleted ? 'bg-amber-50/80 dark:bg-amber-900/20 border-amber-200/50 dark:border-amber-800/30 scale-110' : 'bg-blue-50/80 dark:bg-blue-900/20 border-blue-100/50 dark:border-blue-800/30 group-hover:scale-110 group-hover:-translate-y-1'}`}>
                            {isCompleted ? (
                                <Trophy className="w-8 h-8 text-amber-500 animate-pulse drop-shadow-sm" />
                            ) : (
                                <div className="grid grid-cols-2 gap-1 rotate-45 scale-75">
                                    <div className="w-6 h-6 bg-blue-500 rounded-md shadow-sm"></div>
                                    <div className="w-6 h-6 bg-blue-400/80 rounded-md shadow-sm"></div>
                                    <div className="w-6 h-6 bg-blue-400/80 rounded-md shadow-sm"></div>
                                    <div className="w-6 h-6 bg-blue-200 dark:bg-blue-800/50 rounded-md shadow-sm"></div>
                                </div>
                            )}
                        </div>

                        <div>
                            <h3 className={`text-xl font-extrabold tracking-tight mb-1 drop-shadow-sm ${isCompleted ? 'text-amber-600 dark:text-amber-400' : 'text-foreground'}`}>
                                {isCompleted ? 'Completat!' : 'Paraulògic'}
                            </h3>
                            <p className="text-sm font-medium text-muted-foreground drop-shadow-sm">
                                {isCompleted ? (
                                    <span>Torna demà per més reptes</span>
                                ) : (
                                    <span>{foundWords.length} de {targetWords} paraules</span>
                                )}
                            </p>
                        </div>

                        {/* Mini progress bar or Streak Badge */}
                        {isCompleted ? (
                            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-500/10 border border-amber-500/20 rounded-md shadow-sm mt-2">
                                <Sparkles className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                                <span className="text-[11px] font-bold text-amber-700 dark:text-amber-400 uppercase tracking-wider">Ratxa: {paraulogicStreak} dies</span>
                            </div>
                        ) : (
                            <div className="w-full h-2 bg-secondary/50 rounded-full overflow-hidden border border-border/20 shadow-inner mt-2">
                                <div className="h-full bg-blue-500 transition-all duration-700 ease-out shadow-sm" style={{ width: `${progressPerc}%` }} />
                            </div>
                        )}

                        <Button variant="ghost" className={`mt-2 font-bold transition-all duration-300 ${isCompleted ? 'text-amber-600 hover:bg-amber-500/10 hover:text-amber-700 dark:text-amber-400 dark:hover:text-amber-300' : 'text-primary hover:bg-primary/10 hover:text-primary dark:hover:text-primary/80 group-hover:bg-primary/5'}`}>
                            {isCompleted ? 'Veure resum' : 'Jugar ara'} <Play className="w-4 h-4 ml-2 fill-current" />
                        </Button>
                    </CardContent>
                </Card>
            </DialogTrigger>

            <DialogContent className="max-w-2xl bg-white dark:bg-slate-800 backdrop-blur-xl border-slate-100 dark:border-slate-700 shadow-2xl p-0 gap-0 overflow-hidden sm:rounded-3xl">
                <div className="grid md:grid-cols-2 h-[600px] md:h-[500px]">

                    {/* Game Area (Left/Top) */}
                    <div className="p-8 flex flex-col items-center justify-center relative bg-slate-50/50 dark:bg-slate-900/50">
                        {/* Current Guess Display */}
                        <div className="h-16 flex items-center justify-center mb-6 w-full relative">
                            <span className={`text-3xl font-black tracking-[0.2em] text-slate-800 dark:text-white transition-all ${isVerifying ? 'opacity-50 blur-sm' : ''}`}>
                                {currentGuess || <span className="text-slate-200 animate-pulse">...</span>}
                            </span>
                            {currentGuess && (
                                <button
                                    onClick={handleDelete}
                                    className="absolute right-0 p-2 text-red-600 hover:text-red-700 transition-colors bg-white rounded-md shadow-md border border-red-300"
                                >
                                    <Delete className="w-6 h-6" />
                                </button>
                            )}
                        </div>

                        {/* Honeycomb Grid */}
                        <div className="relative w-64 h-64 select-none">
                            {/* Center */}
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
                                <HexagonButton
                                    letter={gameData.center}
                                    onClick={() => handleLetterClick(gameData.center)}
                                    type="center"
                                />
                            </div>

                            {/* Satellites */}
                            {gameData.letters.filter(l => l !== gameData.center).map((letter, i) => {
                                const angle = (i * 60 - 30) * (Math.PI / 180);
                                const radius = 85;
                                const x = Math.cos(angle) * radius;
                                const y = Math.sin(angle) * radius;
                                return (
                                    <div
                                        key={i}
                                        className="absolute top-1/2 left-1/2 transition-all duration-500 ease-out"
                                        style={{ transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))` }}
                                    >
                                        <HexagonButton
                                            letter={letter}
                                            onClick={() => handleLetterClick(letter)}
                                        />
                                    </div>
                                );
                            })}
                        </div>

                        {/* Controls */}
                        <div className="flex gap-4 mt-8">
                            <Button size="icon" variant="outline" className="rounded-full border-slate-200 dark:border-slate-600 hover:bg-white dark:hover:bg-slate-700 hover:border-blue-300" onClick={handleShuffle}>
                                <RefreshCw className="w-5 h-5 text-slate-600 dark:text-slate-300" />
                            </Button>
                            <Button
                                className="px-8 rounded-full bg-slate-900 hover:bg-blue-600 text-white font-bold tracking-widest transition-all shadow-lg hover:shadow-blue-200"
                                onClick={handleSubmit}
                                disabled={!currentGuess}
                            >
                                INTRO
                            </Button>
                        </div>
                    </div>

                    {/* Scoreboard (Right/Bottom) */}
                    <div className="bg-white dark:bg-slate-800 border-l border-slate-100 dark:border-slate-700 flex flex-col h-full">
                        <DialogHeader className="p-6 border-b border-slate-50 dark:border-slate-700 bg-slate-50/30 dark:bg-slate-800/50">
                            <div className="flex items-center justify-between">
                                <div className="space-y-1">
                                    <DialogTitle className="text-xl font-bold flex items-center gap-2 dark:text-white">
                                        Paraulògic <span className="px-2 py-0.5 rounded-full bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 text-[10px] uppercase font-bold tracking-wide">AVUI</span>
                                    </DialogTitle>
                                    <DialogDescription className="flex items-center gap-3 text-sm">
                                        <span className="flex items-center gap-1 text-slate-600 dark:text-slate-300">
                                            <Trophy className="w-3 h-3 text-amber-500" /> {totalPoints} punts
                                        </span>
                                        <span className="w-1 h-1 rounded-full bg-slate-300 dark:bg-slate-600" />
                                        <span className="text-slate-400">{foundWords.length}/{targetWords} trobades</span>
                                    </DialogDescription>
                                </div>
                                <div className="radial-progress text-blue-500 text-xs font-bold" style={{ "--value": progressPerc, "--size": "2.5rem" } as any}>
                                    {progressPerc}%
                                </div>
                            </div>
                        </DialogHeader>

                        <div className="flex-1 overflow-y-auto p-6 scrollbar-thin scrollbar-thumb-slate-200">
                            <div className="flex flex-wrap gap-2 content-start">
                                {foundWords.length > 0 ? (
                                    foundWords.map(word => (
                                        <span key={word} className="px-3 py-1 bg-white dark:bg-slate-700 border border-slate-100 dark:border-slate-600 shadow-sm rounded-lg text-sm font-semibold text-slate-700 dark:text-white animate-in zoom-in-50 duration-300">
                                            {word}
                                        </span>
                                    ))
                                ) : (
                                    <div className="flex flex-col items-center justify-center w-full h-full text-center space-y-3 opacity-40 mt-10">
                                        <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center">
                                            <Sparkles className="w-6 h-6 text-slate-400" />
                                        </div>
                                        <p className="text-sm font-medium">Troba paraules de 3+ lletres.<br />La lletra central és obligatòria.</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};

// Stylish Hexagon Button Component
const HexagonButton = ({ letter, onClick, type = 'normal' }: { letter: string, onClick: () => void, type?: 'normal' | 'center' }) => {
    const isCenter = type === 'center';

    return (
        <button
            onClick={onClick}
            className="group relative w-20 h-20 focus:outline-none transition-transform active:scale-95"
        >
            {/* Hexagon Shape CSS */}
            <div
                className={`absolute inset-0 transition-all duration-300 shadow-sm rounded-2xl rotate-45 group-hover:rotate-[55deg]
                    ${isCenter
                        ? 'bg-blue-600 shadow-blue-200 shadow-lg scale-110 z-10'
                        : 'bg-white border-2 border-slate-100 group-hover:border-blue-200 group-hover:bg-slate-50'
                    }`}
            />

            {/* Letter Content */}
            <span className={`absolute inset-0 flex items-center justify-center z-20 text-2xl font-black select-none
                ${isCenter ? 'text-white' : 'text-slate-700 group-hover:text-blue-600'}
            `}>
                {letter}
            </span>
        </button>
    );
};
