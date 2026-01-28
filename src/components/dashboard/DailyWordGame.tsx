import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogTrigger, DialogTitle, DialogHeader, DialogDescription } from '@/components/ui/dialog';
import { RefreshCw, Delete, Sparkles, Trophy, Play, Check, X } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { BAD_WORDS } from '@/utils/profanityList';

const WORD_LIST = [
    {
        letters: ['A', 'E', 'I', 'L', 'N', 'R', 'S'],
        center: 'A',
    }
];

const TARGET_WORDS = 30;

export const DailyWordGame = () => {
    const [gameData, setGameData] = useState(WORD_LIST[0]);
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
        const todaysGame = WORD_LIST[dayIndex % WORD_LIST.length];
        setGameData(todaysGame);

        // Load progress
        const saved = localStorage.getItem(`paraulogic_daily_${dateKey}`);
        if (saved) {
            const parsed = JSON.parse(saved);
            setFoundWords(parsed);
            if (parsed.length >= TARGET_WORDS) {
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

    const verifyWordWithApi = async (word: string) => {
        const cacheKey = `paraulogic_valid_${word}`;
        const cached = localStorage.getItem(cacheKey);
        if (cached) return cached === '1';

        try {
            const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/ca/${word.toLowerCase()}`);
            if (response.ok) {
                localStorage.setItem(cacheKey, '1');
                return true;
            }
            if (response.status === 404) {
                localStorage.setItem(cacheKey, '0');
                return false;
            }
        } catch (error) {
            console.warn('No es pot verificar la paraula amb l\'API:', error);
        }

        return null;
    };

    const handleSubmit = async () => {
        if (isCompleted || isVerifying) return;
        const guess = normalizeGuess(currentGuess);
        const originalGuess = currentGuess.trim().toUpperCase();

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

        setIsVerifying(true);
        await new Promise(resolve => setTimeout(resolve, 300)); // Faster feel
        const apiResult = await verifyWordWithApi(guess);

        const newFound = [...foundWords, guess];
        setFoundWords(newFound);
        setCurrentGuess('');

        const today = new Date().toISOString().split('T')[0];
        localStorage.setItem(`paraulogic_daily_${today}`, JSON.stringify(newFound));

        if (newFound.length >= TARGET_WORDS) {
            setIsCompleted(true);
            updateStreak();
            toast({ title: "🏆 Enhorabona!", description: "Has completat el joc d'avui!", className: "bg-yellow-50 border-yellow-200" });
        } else if (apiResult === false) {
            toast({
                description: `Acceptem "${originalGuess}" tot i que no l'hem pogut verificar.`,
            });
        }
        setIsVerifying(false);
    };

    const totalPoints = foundWords.reduce((acc, w) => acc + w.length, 0);
    const progressPerc = Math.min(100, Math.round((foundWords.length / TARGET_WORDS) * 100));

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Card className="group relative overflow-hidden border border-white/10 bg-white/5 shadow-lg shadow-black/40 hover:shadow-xl hover:shadow-primary/20 transition-all duration-300 cursor-pointer h-full flex flex-col justify-between">
                    {/* Background Gradient */}
                    <div className={`absolute inset-0 transition-colors ${isCompleted ? 'bg-gradient-to-br from-emerald-500/10 to-amber-500/10' : 'bg-gradient-to-br from-white/5 to-transparent group-hover:from-primary/10 group-hover:to-transparent'}`} />

                    <CardContent className="p-6 relative flex flex-col items-center justify-center h-full text-center space-y-4">
                        <div className={`w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-300 ${isCompleted ? 'bg-amber-500/20 scale-110' : 'bg-primary/20 group-hover:scale-110 group-hover:bg-primary/30'}`}>
                            {isCompleted ? (
                                <Trophy className="w-8 h-8 text-amber-300 animate-pulse" />
                            ) : (
                                <div className="grid grid-cols-2 gap-1 rotate-45 scale-75">
                                    <div className="w-6 h-6 bg-primary rounded-md"></div>
                                    <div className="w-6 h-6 bg-indigo-300 rounded-md"></div>
                                    <div className="w-6 h-6 bg-indigo-300 rounded-md"></div>
                                    <div className="w-6 h-6 bg-white/20 rounded-md"></div>
                                </div>
                            )}
                        </div>

                        <div>
                            <h3 className={`text-xl font-bold mb-1 ${isCompleted ? 'text-amber-300' : 'text-foreground'}`}>
                                {isCompleted ? 'Completat!' : 'Paraulògic'}
                            </h3>
                            <p className={`text-sm font-medium ${isCompleted ? 'text-amber-300/80' : 'text-muted-foreground'}`}>
                                {isCompleted ? (
                                    <span>Torna demà per més reptes</span>
                                ) : (
                                    <span>{foundWords.length} de {TARGET_WORDS} paraules</span>
                                )}
                            </p>
                        </div>

                        {/* Mini progress bar or Streak Badge */}
                        {isCompleted ? (
                            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/10 border border-amber-500/30 rounded-full shadow-sm">
                                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                                <span className="text-xs font-bold text-amber-300">Ratxa: {paraulogicStreak} dies</span>
                            </div>
                        ) : (
                            <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                                <div className="h-full bg-primary transition-all duration-500" style={{ width: `${progressPerc}%` }} />
                            </div>
                        )}

                        <Button variant="ghost" className={`${isCompleted ? 'text-amber-300 hover:bg-amber-500/10' : 'text-primary group-hover:bg-primary/10'} font-semibold`}>
                            {isCompleted ? 'Veure resum' : 'Jugar ara'} <Play className="w-4 h-4 ml-2 fill-current" />
                        </Button>
                    </CardContent>
                </Card>
            </DialogTrigger>

            <DialogContent className="max-w-2xl bg-black/80 backdrop-blur-xl border-white/10 shadow-2xl p-0 gap-0 overflow-hidden sm:rounded-3xl">
                <div className="grid md:grid-cols-2 h-[600px] md:h-[500px]">

                    {/* Game Area (Left/Top) */}
                    <div className="p-8 flex flex-col items-center justify-center relative bg-white/5">
                        {/* Current Guess Display */}
                        <div className="h-16 flex items-center justify-center mb-6 w-full relative">
                            <span className={`text-3xl font-black tracking-[0.2em] text-foreground transition-all ${isVerifying ? 'opacity-50 blur-sm' : ''}`}>
                                {currentGuess || <span className="text-muted-foreground animate-pulse">...</span>}
                            </span>
                            {currentGuess && (
                                <button
                                    onClick={handleDelete}
                                    className="absolute right-0 p-2 text-red-300 hover:text-red-200 transition-colors bg-white/10 rounded-md shadow-md border border-red-500/30"
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
                            <Button size="icon" variant="outline" className="rounded-full border-white/10 hover:bg-white/10 hover:border-primary/40" onClick={handleShuffle}>
                                <RefreshCw className="w-5 h-5 text-muted-foreground" />
                            </Button>
                            <Button
                                className="px-8 rounded-full bg-primary hover:bg-primary/90 text-white font-bold tracking-widest transition-all shadow-lg hover:shadow-primary/40"
                                onClick={handleSubmit}
                                disabled={!currentGuess}
                            >
                                INTRO
                            </Button>
                        </div>
                    </div>

                    {/* Scoreboard (Right/Bottom) */}
                    <div className="bg-black/60 border-l border-white/10 flex flex-col h-full">
                        <DialogHeader className="p-6 border-b border-white/10 bg-white/5">
                            <div className="flex items-center justify-between">
                                <div className="space-y-1">
                                    <DialogTitle className="text-xl font-bold flex items-center gap-2 text-foreground">
                                        Paraulògic <span className="px-2 py-0.5 rounded-full bg-primary/20 text-primary text-[10px] uppercase font-bold tracking-wide border border-primary/30">AVUI</span>
                                    </DialogTitle>
                                    <DialogDescription className="flex items-center gap-3 text-sm">
                                        <span className="flex items-center gap-1 text-muted-foreground">
                                            <Trophy className="w-3 h-3 text-amber-300" /> {totalPoints} punts
                                        </span>
                                        <span className="w-1 h-1 rounded-full bg-white/20" />
                                        <span className="text-muted-foreground">{foundWords.length}/{TARGET_WORDS} trobades</span>
                                    </DialogDescription>
                                </div>
                                <div className="radial-progress text-primary text-xs font-bold" style={{ "--value": progressPerc, "--size": "2.5rem" } as any}>
                                    {progressPerc}%
                                </div>
                            </div>
                        </DialogHeader>

                        <div className="flex-1 overflow-y-auto p-6 scrollbar-thin scrollbar-thumb-white/10">
                            <div className="flex flex-wrap gap-2 content-start">
                                {foundWords.length > 0 ? (
                                    foundWords.map(word => (
                                        <span key={word} className="px-3 py-1 bg-white/10 border border-white/10 shadow-sm rounded-lg text-sm font-semibold text-foreground animate-in zoom-in-50 duration-300">
                                            {word}
                                        </span>
                                    ))
                                ) : (
                                    <div className="flex flex-col items-center justify-center w-full h-full text-center space-y-3 opacity-40 mt-10">
                                        <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center">
                                            <Sparkles className="w-6 h-6 text-muted-foreground" />
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
                        ? 'bg-primary shadow-primary/40 shadow-lg scale-110 z-10'
                        : 'bg-white/10 border-2 border-white/10 group-hover:border-primary/40 group-hover:bg-white/20'
                    }`}
            />

            {/* Letter Content */}
            <span className={`absolute inset-0 flex items-center justify-center z-20 text-2xl font-black select-none
                ${isCenter ? 'text-white' : 'text-foreground group-hover:text-primary'}
            `}>
                {letter}
            </span>
        </button>
    );
};
