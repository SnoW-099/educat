import { useState, useEffect, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ChevronRight, BookOpen, CheckCircle, Award, ChevronLeft, ArrowRight, GraduationCap, Hash } from 'lucide-react';
import { OrthographySection as SectionType } from '@/features/courses/data/catalanOrthographyData';
import { XPOrthographyExercise } from './XPOrthographyExercise';

interface OrthographySectionProps {
  section: SectionType;
  onExerciseComplete?: (sectionId: string, exerciseId: string, isCorrect: boolean, xpEarned?: number) => void;
  completedExercises?: Set<string>;
}

export const OrthographySection = ({
  section,
  onExerciseComplete,
  completedExercises = new Set()
}: OrthographySectionProps) => {
  // Load saved exercise index for this section
  const getSavedIndex = () => {
    const saved = localStorage.getItem(`exercise_index_${section.id}`);
    return saved ? parseInt(saved, 10) : 0;
  };

  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(getSavedIndex());
  const [showExercises, setShowExercises] = useState(true);
  const [sectionProgress, setSectionProgress] = useState<Map<string, boolean>>(new Map());

  // Save current exercise index to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem(`exercise_index_${section.id}`, currentExerciseIndex.toString());
  }, [currentExerciseIndex, section.id]);

  const handleExerciseComplete = (exerciseId: string, isCorrect: boolean, baseXP: number = 0) => {
    setSectionProgress(prev => {
      const next = new Map(prev);
      next.set(exerciseId, isCorrect);
      return next;
    });
    
    const earnedXP = isCorrect ? 10 : 5;
    onExerciseComplete?.(section.id, exerciseId, isCorrect, earnedXP);
    
    // Auto-advance removed to allow users to see feedback and confetti
  };

  const completedCount = section.exercises.filter(ex =>
    sectionProgress.get(ex.id) === true || completedExercises.has(ex.id)
  ).length;

  const progressPercentage = section.exercises.length > 0 ?
    Math.round((completedCount / section.exercises.length) * 100) : 0;

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'ortografia': return 'bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900/30 dark:text-blue-300';
      case 'morfosintaxi': return 'bg-green-100 text-green-800 border-green-200 dark:bg-green-900/30 dark:text-green-300';
      case 'lexic': return 'bg-purple-100 text-purple-800 border-purple-200 dark:bg-purple-900/30 dark:text-purple-300';
      default: return 'bg-gray-100 text-gray-800 border-gray-200 dark:bg-slate-800 dark:text-slate-300';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'ortografia': return BookOpen;
      case 'morfosintaxi': return GraduationCap;
      case 'lexic': return Hash;
      default: return BookOpen;
    }
  };

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case 'ortografia': return 'Ortografia';
      case 'morfosintaxi': return 'Morfosintaxi';
      case 'lexic': return 'Lèxic';
      default: return 'General';
    }
  };

  if (!showExercises) {
    return (
      <Card className="group hover:shadow-lg dark:hover:shadow-[0_8px_30px_rgba(59,130,246,0.1)] transition-all duration-300 cursor-pointer overflow-hidden relative border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:border-blue-400 dark:hover:border-blue-500/50"
        onClick={() => setShowExercises(true)}>
        <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-blue-500/20 to-transparent group-hover:via-blue-500/50 transition-colors duration-500" />
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between relative z-10">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <CardTitle className="text-xl font-bold group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors text-slate-800 dark:text-white leading-tight">
                  {section.title}
                </CardTitle>
                <Badge className={`${getCategoryColor(section.category)} border-none shadow-sm px-2.5 py-0.5 text-xs font-semibold tracking-wide flex items-center gap-1`}>
                  {(() => {
                    const Icon = getCategoryIcon(section.category);
                    return <Icon className="w-3 h-3 opacity-80" />;
                  })()}
                  {getCategoryLabel(section.category)}
                </Badge>
              </div>
              <CardDescription className="text-sm leading-relaxed text-slate-500 dark:text-slate-400 line-clamp-2">
                {section.description}
              </CardDescription>
            </div>
            <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-700/50 text-slate-400 group-hover:bg-blue-50 dark:group-hover:bg-blue-900/30 group-hover:text-blue-500 transition-all duration-300 ml-4 flex-shrink-0">
              <ChevronRight className="h-5 w-5" />
            </div>
          </div>
        </CardHeader>

        <CardContent className="relative z-10 pt-0">
          <div className="pt-4 border-t border-slate-100 dark:border-slate-700/50 space-y-4">
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-1.5 text-slate-500 font-medium">
                <BookOpen className="h-4 w-4 text-slate-400" />
                <span>{section.exercises.length} exercicis</span>
              </div>
              {completedCount > 0 && (
                <div className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-bold bg-emerald-50 dark:bg-emerald-500/10 px-2 py-0.5 rounded-md border border-emerald-100 dark:border-emerald-500/20 text-xs tracking-wider uppercase">
                  <CheckCircle className="h-3.5 w-3.5" />
                  <span>{completedCount}/{section.exercises.length}</span>
                </div>
              )}
            </div>

            {progressPercentage > 0 && (
              <div className="space-y-2">
                <div className="h-2 w-full bg-slate-100 dark:bg-slate-700/50 rounded-full overflow-hidden border border-slate-200/50 dark:border-slate-800/50 shadow-inner">
                  <div className={`h-full rounded-full transition-all duration-1000 ease-out shadow-sm ${progressPercentage === 100 ? 'bg-emerald-500' : 'bg-blue-500'}`} style={{ width: `${progressPercentage}%` }} />
                </div>
                <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-wider">
                  <span className="text-slate-400">Progrés</span>
                  <span className={`${progressPercentage === 100 ? 'text-emerald-600 dark:text-emerald-400' : 'text-blue-600 dark:text-blue-400'}`}>{progressPercentage}%</span>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    );
  }

  const currentExercise = section.exercises[currentExerciseIndex];

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-12 animate-in fade-in duration-700">
      {/* Section Header - Modern Title & Progress */}
      <Card className="border-none shadow-2xl bg-slate-900/40 backdrop-blur-xl border border-white/10 overflow-hidden relative group">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-transparent to-purple-500/10 opacity-30 pointer-events-none" />
        
        <CardHeader className="relative z-10 pb-4">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <div className="flex items-center gap-3">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => setShowExercises(false)} 
                  className="p-0 h-auto hover:bg-transparent -ml-1 text-slate-400 hover:text-white transition-colors"
                >
                  <ChevronLeft className="h-4 w-4 mr-1" />
                  Tornar
                </Button>
                <Badge className={`${getCategoryColor(section.category)} border-none shadow-sm px-2.5 py-0.5 text-[10px] uppercase tracking-wider font-bold`}>
                  {getCategoryLabel(section.category)}
                </Badge>
              </div>
              <CardTitle className="text-4xl font-black text-white">
                {section.title}
              </CardTitle>
            </div>
            
            <div className="text-right hidden sm:block">
              <div className="text-3xl font-black text-primary italic leading-none">{progressPercentage}%</div>
              <div className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">Progressió</div>
            </div>
          </div>
        </CardHeader>

        <CardContent className="relative z-10 pt-0">
          <div className="space-y-6">
            <p className="text-sm text-slate-400 max-w-2xl font-medium leading-relaxed">
              {section.description}
            </p>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between text-[11px] font-bold uppercase tracking-widest text-slate-500">
                <span className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                  Exercici {currentExerciseIndex + 1} de {section.exercises.length}
                </span>
                <span>{completedCount} de {section.exercises.length} completats</span>
              </div>
              <div className="relative h-2.5 w-full bg-black/20 rounded-full overflow-hidden border border-white/5">
                <div 
                  className="absolute top-0 left-0 h-full bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 transition-all duration-1000 ease-out"
                  style={{ width: `${progressPercentage}%` }}
                />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-shimmer" style={{ backgroundSize: '200% 100%' }} />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Current Exercise Container with subtle entrance */}
      <div className="relative">
        {currentExercise && (
          <XPOrthographyExercise
            key={currentExercise.id}
            exercise={currentExercise}
            onComplete={handleExerciseComplete}
            showFeedback={true}
            userRole="student"
            category={section.category}
          />
        )}
      </div>

      {/* Premium Floating Navigation Dock */}
      <div className="sticky bottom-8 z-40 px-4 flex justify-center">
        <Card className="border-none shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)] bg-slate-900/90 backdrop-blur-3xl border border-white/10 overflow-hidden rounded-[2.5rem] w-full max-w-2xl ring-1 ring-white/10">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
          <CardContent className="p-2 md:p-3">
            <div className="flex items-center justify-between gap-3">
              {/* Previous Button */}
              <Button
                variant="ghost"
                size="lg"
                onClick={() => setCurrentExerciseIndex(prev => Math.max(0, prev - 1))}
                disabled={currentExerciseIndex === 0}
                className="bg-white/5 hover:bg-white/10 text-white border border-white/5 rounded-[1.5rem] h-14 px-4 md:px-5 disabled:opacity-20 transition-all hover:scale-105 active:scale-95"
              >
                <ChevronLeft className="h-6 w-6 md:mr-1" />
                <span className="hidden sm:inline font-bold text-sm tracking-tight text-slate-300">Enrere</span>
              </Button>

              {/* Pagination Center Piece */}
              <div className="flex gap-1.5 p-1 bg-black/40 rounded-3xl border border-white/5 shadow-inner">
                {(() => {
                  const total = section.exercises.length;
                  const current = currentExerciseIndex;
                  const maxVisible = 5;

                  const createBtn = (index: number) => (
                    <button
                      key={`nav-dock-${index}`}
                      onClick={() => setCurrentExerciseIndex(index)}
                      className={`min-w-[42px] h-11 rounded-2xl text-[11px] font-black transition-all duration-500 relative group ${
                        index === current
                          ? 'bg-primary text-primary-foreground shadow-[0_0_20px_rgba(var(--primary),0.5)] scale-110 z-10'
                          : sectionProgress.get(section.exercises[index].id) === true
                          ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                          : 'bg-white/5 text-slate-500 hover:text-white hover:bg-white/10'
                      }`}
                    >
                      <span className="relative z-10">{index + 1}</span>
                      {index === current && (
                        <div className="absolute inset-0 bg-white/20 animate-pulse rounded-2xl" />
                      )}
                      {sectionProgress.get(section.exercises[index].id) === true && (
                        <div className="absolute -top-1 -right-1 bg-black rounded-full p-0.5 border border-emerald-500/50">
                          <CheckCircle className="h-2 w-2 text-emerald-500 fill-current" />
                        </div>
                      )}
                    </button>
                  );

                  if (total <= maxVisible) return section.exercises.map((_, i) => createBtn(i));
                  
                  const btns: JSX.Element[] = [];
                  btns.push(createBtn(0));
                  let start = Math.max(1, current - 1);
                  let end = Math.min(total - 2, current + 1);
                  if (current < 2) end = Math.min(total - 2, 3);
                  if (current > total - 3) start = Math.max(1, total - 4);

                  if (start > 1) btns.push(<span key="d1" className="text-slate-700 self-center px-1 font-black">·</span>);
                  for (let i = start; i <= end; i++) btns.push(createBtn(i));
                  if (end < total - 2) btns.push(<span key="d2" className="text-slate-700 self-center px-1 font-black">·</span>);
                  btns.push(createBtn(total - 1));
                  return btns;
                })()}
              </div>

              {/* Next Button with Glow */}
              <Button
                variant="default"
                size="lg"
                onClick={() => setCurrentExerciseIndex(prev => Math.min(section.exercises.length - 1, prev + 1))}
                disabled={currentExerciseIndex === section.exercises.length - 1}
                className="group relative bg-primary hover:bg-primary/90 text-primary-foreground font-black h-14 rounded-[1.5rem] px-5 md:px-8 shadow-xl overflow-hidden transition-all hover:scale-105 active:scale-95 disabled:opacity-20 disabled:scale-100"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                <span className="relative z-10 hidden sm:inline mr-2 text-sm tracking-tight">Següent</span>
                <ArrowRight className="h-6 w-6 relative z-10 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};