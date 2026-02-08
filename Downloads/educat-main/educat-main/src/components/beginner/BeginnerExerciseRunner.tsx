"use client"

import { useState, useRef, useEffect } from "react";
import { ArrowLeft, Check, X, Trophy, GripVertical, ChevronUp, ChevronDown, Eye } from "lucide-react";
import { BeginnerExercise } from "@/utils/beginner/module1Data";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useAuth } from "@/hooks/useAuth";
import { useEasterEgg } from "@/hooks/useEasterEgg";
import { useRealStats } from "@/hooks/useRealStats";
// import confetti from "canvas-confetti"; // Temporarily disabled due to build issues

import { ModuleStatus } from "@/hooks/useModuleProgress";
import { Progress } from "@/components/ui/progress";

interface BeginnerExerciseRunnerProps {
    exercises: BeginnerExercise[];
    onExit: () => void;
    currentModuleId: string;
    onUpdateProgress?: (moduleId: string, progress: number, status: ModuleStatus, lastIndex: number) => void;
    initialIndex?: number;
}

export const BeginnerExerciseRunner = ({ exercises, onExit, currentModuleId, onUpdateProgress, initialIndex }: BeginnerExerciseRunnerProps) => {
    // Auth & Cheat Mode
    const { profile } = useAuth();
    const { showAnswers } = useEasterEgg(profile?.role || 'student');
    const { recordExercise } = useRealStats(profile?.id);

    const [currentIndex, setCurrentIndex] = useState(initialIndex || 0);
    const [userOrder, setUserOrder] = useState<string[]>([]);
    const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
    const [feedback, setFeedback] = useState<'idle' | 'correct' | 'incorrect'>('idle');
    const [showExplanation, setShowExplanation] = useState(false);
    const [isCompleted, setIsCompleted] = useState(false);

    // MATCHING LOGIC STATE
    const [matches, setMatches] = useState<{ [key: string]: any }>({}); // flexible matching storage

    const currentExercise = exercises[currentIndex];

    // Reset state when exercise changes
    useEffect(() => {
        if (currentExercise.type === 'order') {
            const shuffled = [...currentExercise.data].sort(() => Math.random() - 0.5);
            setUserOrder(shuffled);
        } else if (currentExercise.type === 'match' && currentExercise.pairs) {
            const rights = currentExercise.pairs.map(p => p.right);
            // Shuffle rights
            const shuffledRights = [...rights].sort(() => Math.random() - 0.5);
            setUserOrder(shuffledRights);
            setMatches({});
        } else if (currentExercise.type === 'fill_gap') {
            // Options are data, one is correct answer. Shuffle them.
            const options = [...currentExercise.data].sort(() => Math.random() - 0.5);
            setUserOrder(options);
            setMatches({});
        } else if (currentExercise.type === 'classify') {
            const items = [...currentExercise.data].sort(() => Math.random() - 0.5);
            setUserOrder(items);
            setMatches({});
        } else {
            setUserOrder([]);
        }
        setSelectedAnswer(null);
        setFeedback('idle');
        setShowExplanation(false);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentIndex]);

    const handleCheck = () => {
        let isCorrect = false;

        if (currentExercise.type === 'order') {
            isCorrect = JSON.stringify(userOrder) === JSON.stringify(currentExercise.correctOrder);
        } else if (currentExercise.type === 'match') {
            if (!currentExercise.pairs) return;
            let allCorrect = true;
            currentExercise.pairs.forEach(p => {
                const rightIndex = matches[p.left];
                // Check if the selected item index corresponds to the value p.right
                if (rightIndex === undefined) allCorrect = false;
                else if (userOrder[rightIndex] !== p.right) allCorrect = false;
            });
            isCorrect = allCorrect;
        } else if (currentExercise.type === 'fill_gap') {
            const placedIndex = matches['gap'];
            if (placedIndex === undefined) {
                isCorrect = false;
            } else {
                const placedValue = userOrder[placedIndex];
                isCorrect = placedValue === currentExercise.correctAnswer;
            }
        } else if (currentExercise.type === 'classify' && currentExercise.classification) {
            let allCorrect = true;
            let itemsClassified = 0;

            // matches maps itemIndex -> categoryName
            Object.entries(matches).forEach(([itemIdx, category]) => {
                const itemValue = userOrder[parseInt(itemIdx)];
                const correctItems = currentExercise.classification?.[category] || [];
                if (!correctItems.includes(itemValue)) {
                    allCorrect = false;
                }
                itemsClassified++;
            });

            // All items must be classified
            if (itemsClassified < userOrder.length) allCorrect = false;

            isCorrect = allCorrect;
        } else {
            isCorrect = selectedAnswer === currentExercise.correctAnswer;
        }

        // Record stats
        if (isCorrect) {
            recordExercise(true, 15); // 15 XP for correct
            setFeedback('correct');
            setTimeout(() => {
                setShowExplanation(true);
            }, 500);
        } else {
            recordExercise(false, 0); // 0 XP for error
            setFeedback('incorrect');
        }
    };

    const handleNext = () => {
        if (currentIndex < exercises.length - 1) {
            const nextIndex = currentIndex + 1;
            setCurrentIndex(nextIndex);
            // Update progress intermediate
            const progress = ((nextIndex) / exercises.length) * 100;
            onUpdateProgress?.(currentModuleId, progress, 'in_progress', nextIndex);
        } else {
            setIsCompleted(true);
            onUpdateProgress?.(currentModuleId, 100, 'completed', currentIndex);
            //confetti && confetti();
        }
    };

    const handleMoveItem = (index: number, direction: 'up' | 'down') => {
        const newOrder = [...userOrder];
        if (direction === 'up' && index > 0) {
            [newOrder[index], newOrder[index - 1]] = [newOrder[index - 1], newOrder[index]];
        } else if (direction === 'down' && index < newOrder.length - 1) {
            [newOrder[index], newOrder[index + 1]] = [newOrder[index + 1], newOrder[index]];
        }
        setUserOrder(newOrder);
    };

    // Enhanced Drag and Drop Logic
    const dragItem = useRef<number | null>(null);
    const dragOverItem = useRef<number | null>(null);
    const [activeDragIndex, setActiveDragIndex] = useState<number | null>(null);

    const handleDragStart = (e: React.DragEvent<HTMLDivElement>, position: number) => {
        dragItem.current = position;
        setTimeout(() => {
            setActiveDragIndex(position);
        }, 0);
    };

    const handleDragEnter = (e: React.DragEvent<HTMLDivElement>, position: number) => {
        e.preventDefault();
        dragOverItem.current = position;

        if (dragItem.current !== null && dragItem.current !== position) {
            const copyListItems = [...userOrder];
            const dragItemContent = copyListItems[dragItem.current];
            copyListItems.splice(dragItem.current, 1);
            copyListItems.splice(position, 0, dragItemContent);
            dragItem.current = position;
            setUserOrder(copyListItems);
            setActiveDragIndex(position);
        }
    };

    const handleDragEnd = () => {
        dragItem.current = null;
        dragOverItem.current = null;
        setActiveDragIndex(null);
    };

    // Ctrl+K to Solve (Cheat/Auto-fill)
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if ((e.ctrlKey || e.metaKey) && (e.key === 'k' || e.code === 'KeyK')) {
                e.preventDefault();
                console.log("Auto-solve triggered");

                // Action: Solve current exercise
                setFeedback('idle');

                if (currentExercise.type === 'match' && currentExercise.pairs) {
                    const solution: { [key: string]: number } = {};
                    const usedIndices = new Set<number>();
                    currentExercise.pairs.forEach(p => {
                        const idx = userOrder.findIndex((val, i) => val === p.right && !usedIndices.has(i));
                        if (idx !== -1) {
                            solution[p.left] = idx;
                            usedIndices.add(idx);
                        }
                    });
                    setMatches(solution);
                } else if (currentExercise.type === 'classify' && currentExercise.classification) {
                    const solution: { [key: number]: string } = {};
                    userOrder.forEach((item, idx) => {
                        Object.entries(currentExercise.classification!).forEach(([category, items]) => {
                            if (items.includes(item)) {
                                solution[idx] = category;
                            }
                        });
                    });
                    setMatches(solution);
                } else if (currentExercise.type === 'fill_gap' && currentExercise.correctAnswer) {
                    const idx = userOrder.indexOf(currentExercise.correctAnswer);
                    if (idx !== -1) {
                        setMatches({ 'gap': idx });
                    }
                } else if (currentExercise.type === 'order' && currentExercise.correctOrder) {
                    setUserOrder([...currentExercise.correctOrder]);
                } else if (currentExercise.correctAnswer) {
                    setSelectedAnswer(currentExercise.correctAnswer);
                }
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [currentExercise, userOrder, setMatches, setSelectedAnswer, setFeedback, setUserOrder]);




    if (isCompleted) {
        return (
            <div className="flex flex-col items-center justify-center h-full p-8 text-center animate-in zoom-in duration-500">
                <Trophy className="w-24 h-24 text-yellow-500 mb-6 drop-shadow-lg" />
                <h2 className="text-3xl font-bold mb-4 text-foreground">Felicitats! 🎉</h2>
                <p className="text-muted-foreground mb-8 text-lg">Has completat tots els reptes del Mòdul 1!</p>
                <Button onClick={onExit} size="lg" className="w-48 font-bold text-lg">
                    Tornar al Menú
                </Button>
            </div>
        );
    }

    return (
        <div className="max-w-2xl mx-auto p-4 space-y-6">
            <div className="flex items-center justify-between mb-2">
                <Button variant="ghost" size="sm" onClick={onExit} className="text-muted-foreground hover:text-foreground">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Sortir
                </Button>
                <div className="flex items-center gap-2">
                    {showAnswers && <Eye className="w-4 h-4 text-amber-500 animate-pulse" />}
                    <div className="flex flex-col items-end">
                        <span className="text-sm font-medium text-muted-foreground">
                            Repte {currentIndex + 1} de {exercises.length}
                        </span>
                        <Progress value={(currentIndex / exercises.length) * 100} className="w-32 h-2" />
                    </div>
                </div>
            </div>

            <Card className="border-2 border-indigo-100 dark:border-indigo-900/50 shadow-xl bg-white dark:bg-slate-900 overflow-hidden">
                <div className="bg-indigo-50/50 dark:bg-indigo-950/30 p-6 border-b border-indigo-100 dark:border-indigo-900/50">
                    <h2 className="text-2xl font-bold text-indigo-900 dark:text-indigo-100 mb-2">{currentExercise.title}</h2>
                    <p className="text-indigo-700 dark:text-indigo-300 text-lg leading-relaxed">{currentExercise.instruction}</p>
                </div>

                <div className="p-6 space-y-6">
                    {/* ORDERING EXERCISE UI */}
                    {currentExercise.type === 'order' && (
                        <div className="space-y-3 relative">
                            <p className="text-sm text-center text-muted-foreground mb-4 italic">Arrossega per ordenar o fes servir les fletxes</p>
                            {userOrder.map((item, index) => {
                                const isDragging = index === activeDragIndex;
                                const correctIndex = currentExercise.correctOrder?.indexOf(item);

                                return (
                                    <div
                                        key={item}
                                        draggable
                                        onDragStart={(e) => handleDragStart(e, index)}
                                        onDragEnter={(e) => handleDragEnter(e, index)}
                                        onDragEnd={handleDragEnd}
                                        onDragOver={(e) => e.preventDefault()}
                                        className={cn(
                                            "flex items-center justify-between p-4 border-2 rounded-xl transition-all duration-200 ease-in-out select-none cursor-grab active:cursor-grabbing shadow-sm bg-white dark:bg-slate-800",
                                            !isDragging && "hover:border-indigo-300 dark:hover:border-indigo-700 hover:-translate-y-0.5 hover:shadow-md",
                                            isDragging && "opacity-0 scale-95 border-dashed border-indigo-300",
                                            feedback === 'correct' && "border-green-500 bg-green-50 dark:bg-green-900/20",
                                            showAnswers && correctIndex === index && "border-amber-400 dark:border-amber-600 bg-amber-50 dark:bg-amber-900/10",
                                            showAnswers && correctIndex !== index && "border-red-200 dark:border-red-900/30"
                                        )}
                                    >
                                        <div className="flex items-center gap-4">
                                            <div className="p-2 bg-slate-100 dark:bg-slate-700 rounded-lg text-slate-400 relative">
                                                <GripVertical className="w-5 h-5" />
                                                {showAnswers && correctIndex !== undefined && (
                                                    <div className="absolute -top-2 -left-2 bg-amber-500 text-white w-5 h-5 rounded-full text-xs flex items-center justify-center font-bold z-10 shadow-sm border border-white dark:border-slate-800">
                                                        {correctIndex + 1}
                                                    </div>
                                                )}
                                            </div>
                                            <span className="text-lg font-bold">{item}</span>
                                        </div>
                                        <div className="flex flex-col gap-1 md:hidden">
                                            <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => handleMoveItem(index, 'up')} disabled={index === 0}>
                                                <ChevronUp className="w-4 h-4" />
                                            </Button>
                                            <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => handleMoveItem(index, 'down')} disabled={index === userOrder.length - 1}>
                                                <ChevronDown className="w-4 h-4" />
                                            </Button>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}

                    {/* SELECTION EXERCISE UI */}
                    {(currentExercise.type === 'select' || currentExercise.type === 'binary' || currentExercise.type === 'multiple_choice') && (
                        <div className="grid grid-cols-1 gap-3">
                            {(currentExercise.type === 'select' || currentExercise.type === 'multiple_choice' ? currentExercise.data : currentExercise.data).map((option) => {
                                const isCorrect = option === currentExercise.correctAnswer;
                                return (
                                    <button
                                        key={option}
                                        onClick={() => setSelectedAnswer(option)}
                                        className={cn(
                                            "w-full p-4 text-left rounded-xl border-2 transition-all text-lg font-medium outline-none focus:ring-2 focus:ring-indigo-500/50",
                                            selectedAnswer === option
                                                ? "border-indigo-500 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-200"
                                                : "border-slate-200 dark:border-slate-700 hover:border-indigo-300 dark:hover:border-indigo-700 bg-white dark:bg-slate-800",
                                            feedback === 'correct' && isCorrect && "border-green-500 bg-green-50 dark:bg-green-900/20 text-green-700",
                                            feedback === 'incorrect' && selectedAnswer === option && "border-red-500 bg-red-50 dark:bg-red-900/20 text-red-700",
                                            // Cheat Mode
                                            showAnswers && isCorrect && "ring-2 ring-amber-400 ring-offset-2 dark:ring-offset-slate-900 border-amber-400/50 bg-amber-50/50 dark:bg-amber-900/10"
                                        )}
                                        disabled={feedback !== 'idle'}
                                    >
                                        <div className="flex items-center justify-between">
                                            <span>{option}</span>
                                            {showAnswers && isCorrect && <Eye className="w-5 h-5 text-amber-500" />}
                                        </div>
                                    </button>
                                );
                            })}
                        </div>
                    )}

                    {currentExercise.type === 'match' && currentExercise.pairs && (
                        <div className="flex flex-col gap-8 min-h-[300px]">
                            <p className="text-center text-sm text-muted-foreground bg-slate-100 dark:bg-slate-800 py-2 rounded-full w-fit mx-auto px-4 mb-4">
                                Connecta els punters amb els seus valors corresponents.
                            </p>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 relative items-start">
                                {/* Left Side (Drop Zones) */}
                                <div className="space-y-4">
                                    {currentExercise.pairs.map((pair, idx) => {
                                        const matchedIndex = matches[pair.left];
                                        const isMatched = matchedIndex !== undefined;
                                        const matchedContent = isMatched ? userOrder[matchedIndex] : null;

                                        return (
                                            <div
                                                key={`drop-zone-${idx}`}
                                                className="flex flex-col gap-2"
                                            >
                                                <span className="font-bold text-lg text-indigo-900 dark:text-indigo-200 ml-1">{pair.left}</span>
                                                <div
                                                    onDragOver={(e) => e.preventDefault()}
                                                    onDrop={(e) => {
                                                        e.preventDefault();
                                                        if (dragItem.current !== null) {
                                                            const draggedIdx = dragItem.current;
                                                            setMatches(prev => {
                                                                // Check if this item is already used elsewhere and remove it from there
                                                                const newMatches = { ...prev };
                                                                const existingKey = Object.keys(newMatches).find(k => newMatches[k] === draggedIdx);
                                                                if (existingKey) delete newMatches[existingKey];

                                                                newMatches[pair.left] = draggedIdx;
                                                                return newMatches;
                                                            });
                                                            dragItem.current = null;
                                                            setActiveDragIndex(null);
                                                        }
                                                    }}
                                                    onClick={() => {
                                                        if (isMatched && feedback === 'idle') {
                                                            setMatches(prev => {
                                                                const next = { ...prev };
                                                                delete next[pair.left];
                                                                return next;
                                                            });
                                                        }
                                                    }}
                                                    className={cn(
                                                        "h-16 rounded-xl border-2 border-dashed transition-all flex items-center justify-center relative cursor-pointer",
                                                        isMatched
                                                            ? "border-indigo-500 bg-indigo-50 dark:bg-indigo-900/30 border-solid"
                                                            : "border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-800",
                                                        feedback === 'correct' && isMatched && "border-green-500 bg-green-50 text-green-700",
                                                        feedback === 'incorrect' && isMatched && "border-red-500 bg-red-50 text-red-700"
                                                    )}
                                                >
                                                    {isMatched ? (
                                                        <span className="font-bold text-lg animate-in zoom-in">{matchedContent}</span>
                                                    ) : (
                                                        <span className="text-sm text-slate-400 font-medium">Zona de càrrega</span>
                                                    )}

                                                    {isMatched && feedback === 'idle' && (
                                                        <div className="absolute right-2 top-1/2 -translate-y-1/2 opacity-50 hover:opacity-100">
                                                            <X className="w-4 h-4 text-slate-500" />
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>

                                {/* Right Side (Draggable Pool) - Matches Match type */}
                                <div className="bg-slate-50 dark:bg-slate-900/50 p-6 rounded-2xl border-2 border-slate-100 dark:border-slate-800">
                                    <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4 text-center">Valors Disponibles</h3>
                                    <div className="flex flex-col gap-3">
                                        {userOrder.map((rightItem, idx) => {
                                            // Check if this item is already placed somewhere
                                            const isPlaced = Object.values(matches).includes(idx);

                                            if (isPlaced) return null; // Hide if placed

                                            return (
                                                <div
                                                    key={`drag-source-${idx}`}
                                                    draggable
                                                    onDragStart={(e) => handleDragStart(e, idx)}
                                                    onDragEnd={handleDragEnd}
                                                    className={cn(
                                                        "p-4 bg-white dark:bg-slate-800 border-2 border-indigo-200 dark:border-indigo-900 shadow-sm rounded-xl font-bold text-center cursor-grab active:cursor-grabbing hover:scale-105 hover:bg-indigo-50 dark:hover:bg-indigo-950/50 transition-all",
                                                        "animate-in fade-in"
                                                    )}
                                                >
                                                    {rightItem}
                                                </div>
                                            );
                                        })}
                                        {Object.keys(matches).length === currentExercise.pairs.length && (
                                            <div className="text-center text-green-500 font-bold py-8 animate-pulse">
                                                Totes les dades assignades! 🎉
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {currentExercise.type === 'fill_gap' && (
                        <div className="flex flex-col gap-8 min-h-[300px] items-center justify-center">
                            <p className="text-center text-sm text-muted-foreground bg-slate-100 dark:bg-slate-800 py-2 rounded-full w-fit mx-auto px-4 mb-4">
                                Arrossega l'opció correcta al buit de la frase.
                            </p>

                            <div className="text-2xl md:text-3xl font-bold leading-relaxed text-center max-w-2xl px-4">
                                {currentExercise.instruction.split('___').map((part, index, array) => (
                                    <span key={index}>
                                        {part}
                                        {index < array.length - 1 && (
                                            <span
                                                onDragOver={(e) => e.preventDefault()}
                                                onDrop={(e) => {
                                                    e.preventDefault();
                                                    if (dragItem.current !== null) {
                                                        const draggedIdx = dragItem.current;
                                                        setMatches({ 'gap': draggedIdx });
                                                        dragItem.current = null;
                                                        setActiveDragIndex(null);
                                                    }
                                                }}
                                                className={cn(
                                                    "inline-flex min-w-[60px] h-10 rounded-lg border-b-4 transition-all items-center justify-center relative cursor-pointer px-2 mx-2 align-middle transform -translate-y-1",
                                                    matches['gap'] !== undefined
                                                        ? "border-indigo-500 bg-indigo-50 dark:bg-indigo-900/30"
                                                        : "border-slate-300 dark:border-slate-600 bg-slate-100 dark:bg-slate-800",
                                                    feedback === 'correct' && matches['gap'] !== undefined && "border-green-500 bg-green-50 text-green-700",
                                                    feedback === 'incorrect' && matches['gap'] !== undefined && "border-red-500 bg-red-50 text-red-700"
                                                )}
                                                onClick={() => {
                                                    if (matches['gap'] !== undefined && feedback === 'idle') {
                                                        setMatches({});
                                                    }
                                                }}
                                            >
                                                {matches['gap'] !== undefined ? (
                                                    <span className="font-bold text-xl animate-in zoom-in text-indigo-700 dark:text-indigo-300">
                                                        {userOrder[matches['gap']]}
                                                    </span>
                                                ) : (
                                                    <span className="text-slate-400 font-bold opacity-50 select-none">___</span>
                                                )}
                                            </span>
                                        )}
                                    </span>
                                ))}
                            </div>

                            <div className="flex flex-wrap gap-4 justify-center mt-8">
                                {userOrder.map((option, idx) => {
                                    const isPlaced = matches['gap'] === idx;
                                    if (isPlaced) return null;

                                    return (
                                        <div
                                            key={`gap-option-${idx}`}
                                            draggable
                                            onDragStart={(e) => handleDragStart(e, idx)}
                                            onDragEnd={handleDragEnd}
                                            className={cn(
                                                "px-6 py-3 bg-white dark:bg-slate-800 border-2 border-indigo-200 dark:border-indigo-900 shadow-sm rounded-xl font-bold text-lg cursor-grab active:cursor-grabbing hover:scale-105 hover:bg-indigo-50 dark:hover:bg-indigo-950/50 transition-all",
                                                "animate-in fade-in"
                                            )}
                                        >
                                            {option}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    )}

                    {currentExercise.type === 'classify' && currentExercise.categories && (
                        <div className="flex flex-col gap-8 min-h-[400px]">
                            {/* Pool of items */}
                            <div className="bg-slate-50 dark:bg-slate-900/50 p-6 rounded-2xl border-2 border-slate-100 dark:border-slate-800">
                                <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4 text-center">Dades per classificar</h3>
                                <div className="flex flex-wrap gap-3 justify-center">
                                    {userOrder.map((item, idx) => {
                                        const isPlaced = matches[idx] !== undefined;
                                        if (isPlaced) return null;
                                        return (
                                            <div
                                                key={`classify-pool-${idx}`}
                                                draggable
                                                onDragStart={(e) => handleDragStart(e, idx)}
                                                onDragEnd={handleDragEnd}
                                                className={cn(
                                                    "px-6 py-3 bg-white dark:bg-slate-800 border-2 border-indigo-200 dark:border-indigo-900 shadow-sm rounded-xl font-bold text-lg cursor-grab active:cursor-grabbing hover:scale-105 hover:bg-indigo-50 dark:hover:bg-indigo-950/50 transition-all",
                                                    "animate-in fade-in"
                                                )}
                                            >
                                                {item}
                                            </div>
                                        );
                                    })}
                                    {Object.keys(matches).length === userOrder.length && (
                                        <div className="text-center text-green-500 font-bold py-4 animate-pulse">
                                            Totes les dades classificades! 🎉
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Categories grid */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4">
                                {currentExercise.categories.map((category) => {
                                    // Find item indexes in this category
                                    const itemIdxsInCategory = Object.entries(matches)
                                        .filter(([_, cat]) => cat === category)
                                        .map(([idx, _]) => parseInt(idx));

                                    return (
                                        <div
                                            key={category}
                                            onDragOver={(e) => e.preventDefault()}
                                            onDrop={(e) => {
                                                e.preventDefault();
                                                if (dragItem.current !== null) {
                                                    const draggedIdx = dragItem.current;
                                                    setMatches(prev => ({ ...prev, [draggedIdx]: category }));
                                                    dragItem.current = null;
                                                    setActiveDragIndex(null);
                                                }
                                            }}
                                            className={cn(
                                                "min-h-[140px] p-4 rounded-2xl border-2 border-dashed flex flex-col gap-2 items-center text-center transition-all",
                                                "border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800",
                                                itemIdxsInCategory.length > 0 && "border-indigo-400 bg-indigo-50/20 dark:bg-indigo-900/10 border-solid"
                                            )}
                                        >
                                            <span className="font-bold text-indigo-900 dark:text-indigo-200 uppercase tracking-wider text-xs bg-indigo-50 dark:bg-indigo-900/50 px-3 py-1 rounded-full mb-2">{category}</span>
                                            <div className="flex flex-col gap-2 w-full">
                                                {itemIdxsInCategory.map((idx) => (
                                                    <div
                                                        key={idx}
                                                        className="py-2.5 px-3 bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg text-sm font-bold animate-in zoom-in shadow-sm relative group cursor-pointer"
                                                        onClick={() => {
                                                            if (feedback === 'idle') {
                                                                setMatches(prev => {
                                                                    const next = { ...prev };
                                                                    delete next[idx];
                                                                    return next;
                                                                });
                                                            }
                                                        }}
                                                    >
                                                        {userOrder[idx]}
                                                        {feedback === 'idle' && <X className="w-3 h-3 absolute right-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-50 text-slate-400" />}
                                                    </div>
                                                ))}
                                                {itemIdxsInCategory.length === 0 && (
                                                    <span className="text-slate-300 dark:text-slate-600 text-xs mt-8 font-medium">Zona de càrrega</span>
                                                )}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    )}

                    <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
                        {feedback === 'idle' ? (
                            <Button
                                onClick={handleCheck}
                                className="w-full h-12 text-lg font-bold shadow-lg shadow-indigo-500/20"
                                size="lg"
                                disabled={
                                    (currentExercise.type === 'match' && Object.keys(matches).length < (currentExercise.pairs?.length || 0)) ||
                                    (currentExercise.type === 'fill_gap' && matches['gap'] === undefined) ||
                                    (currentExercise.type === 'classify' && Object.keys(matches).length < userOrder.length) ||
                                    (currentExercise.type !== 'order' && currentExercise.type !== 'match' && currentExercise.type !== 'fill_gap' && currentExercise.type !== 'classify' && !selectedAnswer)
                                }
                            >
                                Comprovar
                            </Button>
                        ) : (
                            <div className={cn(
                                "p-4 rounded-xl mb-4 animate-in slide-in-from-bottom-2",
                                feedback === 'correct' ? "bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200" : "bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-200"
                            )}>
                                <div className="flex items-center gap-3 mb-2">
                                    {feedback === 'correct' ? <Check className="w-6 h-6" /> : <X className="w-6 h-6" />}
                                    <span className="font-bold text-lg">{feedback === 'correct' ? "Correcte!" : "Incorrecte"}</span>
                                </div>

                                {feedback === 'incorrect' && (
                                    <p className="mb-4">Torna a intentar-ho!</p>
                                )}

                                {(feedback === 'correct' || showExplanation) && (
                                    <div className="mt-2 text-sm bg-white/50 dark:bg-black/20 p-3 rounded-lg">
                                        <strong>Explicació:</strong> {currentExercise.explanation}
                                    </div>
                                )}

                                {feedback === 'correct' ? (
                                    <Button onClick={handleNext} className="w-full mt-4 bg-green-600 hover:bg-green-700 text-white shadow-lg shadow-green-500/20 h-12 text-lg font-bold">
                                        Continuar
                                    </Button>
                                ) : (
                                    <Button onClick={() => {
                                        setFeedback('idle');
                                        if (currentExercise.type === 'match' || currentExercise.type === 'fill_gap') {
                                            setMatches({});
                                        }
                                    }} variant="outline" className="w-full mt-4 border-red-200 text-red-700 hover:bg-red-50 dark:border-red-800 dark:text-red-300 dark:hover:bg-red-900/20 h-12">
                                        Ho tornaré a provar
                                    </Button>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </Card>
        </div>
    );
};
