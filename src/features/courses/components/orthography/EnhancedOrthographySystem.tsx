import { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, BookOpen, GraduationCap, Hash, Trophy, Filter, Clock, CheckCircle, XCircle, ChevronRight, TrendingUp } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { getExercisesByCourse, CourseSection } from '@/features/courses/data/courseExercises';
import { OrthographySection } from './OrthographySection';
import { ExamModels } from './ExamModels';
import { OrthographyExercise } from './OrthographyExercise';
import { OrthographyStreakBadge } from './OrthographyStreakBadge';
import { useToast } from '@/hooks/use-toast';
import { useEasterEgg } from '@/hooks/useEasterEgg';
import { useRealStats } from '@/hooks/useRealStats';

interface EnhancedOrthographySystemProps {
  userId?: string;
  userRole?: 'student' | 'professor';
  onProgressUpdate?: (sectionId: string, exerciseId: string, isCorrect: boolean) => void;
}

export const EnhancedOrthographySystem = ({
  userId,
  userRole = 'student',
  onProgressUpdate
}: EnhancedOrthographySystemProps) => {
  const [selectedSection, setSelectedSection] = useState<CourseSection | null>(null);
  const [showExamModels, setShowExamModels] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState<'ortografia' | 'gramàtica' | 'lectura' | 'escriptura' | 'vocabulari' | 'all'>('all');
  const [difficultyFilter, setDifficultyFilter] = useState<'all' | '1' | '2' | '3' | '4' | '5'>('all');
  const [sortBy, setSortBy] = useState<'title' | 'progress' | 'difficulty'>('title');
  const [courseFilter, setCourseFilter] = useState<'B2' | 'C1' | ''>('');
  const [userProgress, setUserProgress] = useState<Map<string, Set<string>>>(new Map());
  const searchInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();
  const { showAnswers, generateAlternativeAnswers } = useEasterEgg(userRole);

  // Use the new real stats hook
  const { recordExercise } = useRealStats(userId || 'guest');

  // Ctrl+K to search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && (e.key === 'k' || e.code === 'KeyK') && courseFilter) {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [courseFilter]);

  // Load user progress from localStorage
  useEffect(() => {
    if (userId) {
      const saved = localStorage.getItem(`orthography_progress_${userId}`);
      if (saved) {
        const parsed = JSON.parse(saved);
        const progressMap = new Map();
        Object.entries(parsed).forEach(([sectionId, exerciseIds]) => {
          progressMap.set(sectionId, new Set(exerciseIds as string[]));
        });
        setUserProgress(progressMap);
      }
    }
  }, [userId]);

  // Save progress to localStorage
  const saveProgress = (newProgress: Map<string, Set<string>>) => {
    if (userId) {
      const toSave: Record<string, string[]> = {};
      newProgress.forEach((exerciseIds, sectionId) => {
        toSave[sectionId] = Array.from(exerciseIds);
      });
      localStorage.setItem(`orthography_progress_${userId}`, JSON.stringify(toSave));
    }
  };

  const handleExerciseComplete = async (sectionId: string, exerciseId: string, isCorrect: boolean, xpEarned: number = 0) => {
    // Record stats instantly using our new hook
    recordExercise(isCorrect, xpEarned);

    if (isCorrect) {
      setUserProgress(prev => {
        const newProgress = new Map(prev);
        const sectionProgress = newProgress.get(sectionId) || new Set();
        sectionProgress.add(exerciseId);
        newProgress.set(sectionId, sectionProgress);
        saveProgress(newProgress);
        return newProgress;
      });

      // Show celebration for section completion
      if (selectedSection) {
        const sectionProgress = userProgress.get(sectionId) || new Set();
        if (sectionProgress.size + 1 === selectedSection.exercises.length) {
          toast({
            title: "Secció completada!",
            description: `Has completat "${selectedSection.title}"`,
            duration: 5000,
          });
        }
      }
    }

    onProgressUpdate?.(sectionId, exerciseId, isCorrect);
  };

  // Get course exercises
  const courseExercises = courseFilter ? getExercisesByCourse(courseFilter) : [];

  const filteredSections = courseExercises
    .filter(section => {
      const matchesCategory = activeCategory === 'all' || section.category === activeCategory;
      const matchesSearch = searchTerm === '' ||
        section.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        section.description.toLowerCase().includes(searchTerm.toLowerCase());

      let matchesDifficulty = true;
      if (difficultyFilter !== 'all') {
        const targetDifficulty = parseInt(difficultyFilter);
        matchesDifficulty = section.exercises.some(ex => ex.difficulty === targetDifficulty);
      }

      return matchesCategory && matchesSearch && matchesDifficulty;
    })
    .sort((a, b) => {
      if (sortBy === 'title') return a.title.localeCompare(b.title);
      if (sortBy === 'difficulty') {
        if (a.exercises.length === 0 || b.exercises.length === 0) return 0;
        const avgDiffA = a.exercises.reduce((sum, ex) => sum + ex.difficulty, 0) / a.exercises.length;
        const avgDiffB = b.exercises.reduce((sum, ex) => sum + ex.difficulty, 0) / b.exercises.length;
        return avgDiffA - avgDiffB;
      }
      if (sortBy === 'progress') {
        const progressA = userProgress.get(a.id)?.size || 0;
        const progressB = userProgress.get(b.id)?.size || 0;
        return progressB - progressA;
      }
      return 0;
    });

  const getOverallProgress = () => {
    const totalExercises = courseExercises.reduce((sum, section) => sum + section.exercises.length, 0);
    let completedExercises = 0;

    userProgress.forEach(sectionExercises => {
      completedExercises += sectionExercises.size;
    });

    return { completed: completedExercises, total: totalExercises };
  };

  const getCategoryStats = () => {
    const stats: Record<string, { completed: number; total: number }> = {
      ortografia: { completed: 0, total: 0 },
      gramàtica: { completed: 0, total: 0 },
      lectura: { completed: 0, total: 0 },
      escriptura: { completed: 0, total: 0 },
      vocabulari: { completed: 0, total: 0 }
    };

    courseExercises.forEach(section => {
      const category = section.category;
      if (!stats[category]) {
        stats[category] = { completed: 0, total: 0 };
      }
      stats[category].total += section.exercises.length;

      const sectionProgress = userProgress.get(section.id) || new Set();
      stats[category].completed += sectionProgress.size;
    });

    return stats;
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'ortografia': return BookOpen;
      case 'gramàtica': return GraduationCap;
      case 'vocabulari': return Hash;
      default: return BookOpen;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'ortografia': return 'text-foreground bg-secondary border-border';
      case 'gramàtica': return 'text-foreground bg-secondary border-border';
      case 'lectura': return 'text-foreground bg-secondary border-border';
      case 'escriptura': return 'text-foreground bg-secondary border-border';
      case 'vocabulari': return 'text-foreground bg-secondary border-border';
      default: return 'text-foreground bg-secondary border-border';
    }
  };

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case 'ortografia': return 'Ortografia';
      case 'gramàtica': return 'Gramàtica';
      case 'lectura': return 'Lectura';
      case 'escriptura': return 'Escriptura';
      case 'vocabulari': return 'Vocabulari';
      default: return 'General';
    }
  };

  const getCategoryBadgeStyle = (category: string) => {
    return 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-slate-600';
  };

  if (showExamModels) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Models d'Examen</h2>
          <Button variant="outline" size="sm" onClick={() => setShowExamModels(false)}>
            Tornar
          </Button>
        </div>
        <ExamModels
          onExamComplete={(examId, score, totalPoints) => {
            toast({
              title: "Examen completat!",
              description: `Has obtingut un ${score}% (${score * totalPoints / 100}/${totalPoints} punts)`,
              duration: 5000,
            });
          }}
        />
      </div>
    );
  }

  if (selectedSection) {
    return (
      <div className="space-y-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setSelectedSection(null)}
        >
          ← Tornar
        </Button>
        <OrthographySection
          section={selectedSection as any}
          onExerciseComplete={handleExerciseComplete}
          completedExercises={userProgress.get(selectedSection.id) || new Set()}
        />
      </div>
    );
  }

  const overallProgress = getOverallProgress();
  const categoryStats = getCategoryStats();
  const overallPercentage = overallProgress.total > 0 ?
    Math.round((overallProgress.completed / overallProgress.total) * 100) : 0;

  // Course selection screen - Minimalist with smooth animations
  if (!courseFilter) {
    return (
      <div className="flex flex-col items-center justify-center py-16 animate-in fade-in duration-500">
        {/* Header with subtle animation */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-3">Quin nivell vols practicar?</h2>
          <p className="text-muted-foreground text-lg">Tria el teu nivell per començar</p>
        </div>

        {/* Cards with animations */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-2xl w-full px-4">

          {/* B2 Card */}
          <Card
            className="group relative overflow-hidden cursor-pointer flex flex-col hover:border-blue-400 dark:hover:border-blue-500 transition-all duration-500 hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] dark:hover:shadow-[0_20px_40px_rgba(59,130,246,0.15)] bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700"
            onClick={() => setCourseFilter('B2')}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-blue-500/40 to-transparent group-hover:via-blue-500 transition-colors duration-500" />
            
            <CardContent className="p-10 text-center relative z-10 flex flex-col items-center">
              <div className="w-20 h-20 bg-blue-50/80 dark:bg-blue-900/30 backdrop-blur-md rounded-2xl shadow-sm border border-blue-100/50 dark:border-blue-800/30 mb-6 flex items-center justify-center group-hover:scale-110 group-hover:-translate-y-2 transition-all duration-500 ease-out">
                <BookOpen className="w-10 h-10 text-blue-600 dark:text-blue-400 drop-shadow-sm" />
              </div>
              <h3 className="text-4xl font-extrabold tracking-tight text-slate-800 dark:text-white mb-3">B2</h3>
              <p className="text-slate-500 dark:text-slate-400 font-medium mb-8 bg-blue-50/50 dark:bg-slate-700/50 px-4 py-1.5 rounded-full text-sm drop-shadow-sm">780+ exercicis</p>
              <Button className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-lg shadow-blue-500/20 transition-all duration-300 group-hover:shadow-blue-500/40 text-base">
                Començar B2
              </Button>
            </CardContent>
          </Card>

          {/* C1 Card */}
          <Card
            className="group relative overflow-hidden cursor-pointer flex flex-col hover:border-indigo-400 dark:hover:border-indigo-500 transition-all duration-500 hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] dark:hover:shadow-[0_20px_40px_rgba(79,70,229,0.15)] bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700"
            onClick={() => setCourseFilter('C1')}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-indigo-500/40 to-transparent group-hover:via-indigo-500 transition-colors duration-500" />
            
            <CardContent className="p-10 text-center relative z-10 flex flex-col items-center">
              <div className="w-20 h-20 bg-indigo-50/80 dark:bg-indigo-900/30 backdrop-blur-md rounded-2xl shadow-sm border border-indigo-100/50 dark:border-indigo-800/30 mb-6 flex items-center justify-center group-hover:scale-110 group-hover:-translate-y-2 transition-all duration-500 ease-out">
                <GraduationCap className="w-10 h-10 text-indigo-600 dark:text-indigo-400 drop-shadow-sm" />
              </div>
              <h3 className="text-4xl font-extrabold tracking-tight text-slate-800 dark:text-white mb-3">C1</h3>
              <p className="text-slate-500 dark:text-slate-400 font-medium mb-8 bg-indigo-50/50 dark:bg-slate-700/50 px-4 py-1.5 rounded-full text-sm drop-shadow-sm">+750 exercicis</p>
              <Button className="w-full h-12 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-lg shadow-indigo-500/20 transition-all duration-300 group-hover:shadow-indigo-500/40 text-base">
                Començar C1
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Premium Course Explorer Header */}
      <div className="relative space-y-8 animate-in fade-in slide-in-from-top-4 duration-700">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-2">
          <div className="flex items-center gap-4 group">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setCourseFilter('')}
              className="px-3 h-10 rounded-xl bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 text-slate-600 dark:text-slate-400 font-black tracking-tight transition-all active:scale-95 group/back"
            >
              <ChevronRight className="w-4 h-4 mr-1 rotate-180 group-hover/back:-translate-x-1 transition-transform" />
              <span>Canviar</span>
            </Button>
            
            <div className="h-10 px-4 flex items-center gap-3 bg-primary/10 dark:bg-primary/20 border border-primary/20 rounded-xl backdrop-blur-sm">
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
              <span className="text-xs font-black uppercase tracking-widest text-primary">
                Curs: <span className="text-sm font-black text-slate-900 dark:text-white mr-1">{courseFilter}</span>
              </span>
            </div>
          </div>
        </div>

        {/* Global Control Bar */}
        <div className="p-2 sm:p-3 bg-white/50 dark:bg-slate-900/40 backdrop-blur-2xl border border-slate-200 dark:border-white/5 rounded-[2rem] shadow-2xl space-y-3 sm:space-y-4">
          {/* Search Row */}
          <div className="relative group">
            <div className="absolute inset-0 bg-primary/5 rounded-2xl opacity-0 group-focus-within:opacity-100 transition-opacity" />
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 group-focus-within:text-primary transition-colors duration-300" />
            <Input
              ref={searchInputRef}
              placeholder="Cerca un tema o secció..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="h-14 sm:h-16 pl-12 pr-6 bg-slate-50 dark:bg-black/20 border-slate-100 dark:border-white/5 rounded-2xl font-bold dark:text-white dark:placeholder:text-slate-600 focus:ring-2 focus:ring-primary/20 transition-all text-base"
            />
          </div>

          {/* Filters Row */}
          <div className="flex flex-col lg:flex-row items-stretch lg:items-center gap-3">
            <Tabs 
              value={activeCategory} 
              onValueChange={(value) => setActiveCategory(value as any)}
              className="flex-1"
            >
              <TabsList className="w-full flex h-auto p-1 bg-slate-100/80 dark:bg-white/5 rounded-xl border border-transparent dark:border-white/10 overflow-x-auto no-scrollbar justify-start sm:justify-center">
                {[
                  { id: 'all', label: 'Totes' },
                  { id: 'ortografia', label: 'Ortografia' },
                  { id: 'gramàtica', label: 'Gramàtica' },
                  { id: 'lectura', label: 'Lectura' },
                  { id: 'escriptura', label: 'Escriptura' },
                  { id: 'vocabulari', label: 'Vocabulari' }
                ].map(cat => (
                  <TabsTrigger 
                    key={cat.id} 
                    value={cat.id}
                    className="flex-1 min-w-fit px-4 py-2 text-[10px] sm:text-xs font-black uppercase tracking-tighter rounded-lg data-[state=active]:bg-white dark:data-[state=active]:bg-primary dark:data-[state=active]:text-primary-foreground data-[state=active]:shadow-sm transition-all"
                  >
                    {cat.label}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>

            <div className="flex gap-2">
              <Select value={difficultyFilter} onValueChange={(value) => setDifficultyFilter(value as any)}>
                <SelectTrigger className="h-11 sm:h-12 w-full lg:w-36 bg-slate-100 dark:bg-white/5 border-transparent dark:border-white/5 rounded-xl font-black text-[10px] uppercase tracking-tighter">
                  <div className="flex items-center gap-2">
                    <Filter className="w-3 h-3 text-primary" />
                    <SelectValue placeholder="Dificultat" />
                  </div>
                </SelectTrigger>
                <SelectContent className="rounded-xl border-white/5 bg-slate-900/95 backdrop-blur-xl">
                  <SelectItem value="all">Totes</SelectItem>
                  <SelectItem value="1">Fàcil</SelectItem>
                  <SelectItem value="2">Normal</SelectItem>
                  <SelectItem value="3">Difícil</SelectItem>
                  <SelectItem value="4">Master</SelectItem>
                </SelectContent>
              </Select>

              <Select value={sortBy} onValueChange={(value) => setSortBy(value as any)}>
                <SelectTrigger className="h-11 sm:h-12 w-full lg:w-36 bg-slate-100 dark:bg-white/5 border-transparent dark:border-white/5 rounded-xl font-black text-[10px] uppercase tracking-tighter">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-3 h-3 text-indigo-500" />
                    <SelectValue placeholder="Ordenar" />
                  </div>
                </SelectTrigger>
                <SelectContent className="rounded-xl border-white/5 bg-slate-900/95 backdrop-blur-xl">
                  <SelectItem value="title">Títol</SelectItem>
                  <SelectItem value="difficulty">Dificultat</SelectItem>
                  <SelectItem value="progress">Progrés</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </div>

      {/* Sections Grid - Premium Bento Style */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredSections.length === 0 ? (
          <Card className="col-span-full p-8 text-center bg-transparent border border-slate-200/60 dark:border-slate-700/60 shadow-none">
            <p className="text-slate-500 dark:text-slate-400">
              Encara no hi ha exercicis disponibles per aquest curs. Aviat s'afegiran nous exercicis!
            </p>
          </Card>
        ) : (
          filteredSections.map((section, index) => {
            const sectionProgress = userProgress.get(section.id) || new Set();
            const completedCount = sectionProgress.size;
            const progressPercentage = section.exercises.length > 0 ?
              Math.round((completedCount / section.exercises.length) * 100) : 0;

            return (
              <Card
                key={section.id}
                className="group relative overflow-hidden cursor-pointer flex flex-col transition-all duration-500 hover:shadow-lg dark:hover:shadow-[0_8px_30px_rgba(59,130,246,0.1)] bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-blue-400 dark:hover:border-blue-500/50"
                onClick={() => setSelectedSection(section)}
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-blue-500/20 to-transparent group-hover:via-blue-500/50 transition-colors duration-500" />
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <CardHeader className="space-y-4 relative z-10 pb-4">
                  <div className="flex items-start justify-between gap-4">
                    <CardTitle className="text-xl font-bold text-slate-800 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors leading-tight">
                      {section.title}
                    </CardTitle>
                    <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-700/50 text-slate-400 group-hover:bg-blue-50 dark:group-hover:bg-blue-900/30 group-hover:text-blue-500 transition-all duration-300">
                      <ChevronRight className="w-4 h-4" />
                    </div>
                  </div>

                  <div className="flex gap-2 flex-wrap">
                    <Badge variant="outline" className="bg-slate-100/50 dark:bg-slate-700/30 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-600/50 font-semibold tracking-wide flex items-center gap-1.5 px-2.5 py-0.5 shadow-sm">
                      {(() => {
                        const Icon = getCategoryIcon(section.category);
                        return <Icon className="w-3 h-3 text-blue-500 opacity-80" />;
                      })()}
                      {getCategoryLabel(section.category)}
                    </Badge>
                  </div>

                  <CardDescription className="text-sm leading-relaxed line-clamp-2 text-slate-500 dark:text-slate-400">
                    {section.description}
                  </CardDescription>
                </CardHeader>

                <CardContent className="mt-auto relative z-10 pt-0">
                  <div className="pt-4 border-t border-slate-100 dark:border-slate-700/50 space-y-4">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-slate-500 font-medium flex items-center gap-1.5">
                        <BookOpen className="w-3.5 h-3.5 text-slate-400" />
                        {section.exercises.length} exercicis
                      </span>
                      {completedCount > 0 && (
                        <span className="text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1.5 bg-emerald-50 dark:bg-emerald-500/10 px-2 py-0.5 rounded-md border border-emerald-100 dark:border-emerald-500/20 text-xs tracking-wider uppercase">
                          <CheckCircle className="h-3 w-3" />
                          {completedCount}/{section.exercises.length}
                        </span>
                      )}
                    </div>

                    {progressPercentage > 0 && (
                      <div className="space-y-2">
                        <div className="h-2 bg-slate-100 dark:bg-slate-700/50 rounded-full overflow-hidden border border-slate-200/50 dark:border-slate-800/50 shadow-inner">
                          <div
                            className={`h-full rounded-full transition-all duration-1000 ease-out shadow-sm ${progressPercentage === 100 ? 'bg-emerald-500' : 'bg-blue-500'}`}
                            style={{ width: `${progressPercentage}%` }}
                          />
                        </div>
                        <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-wider">
                          <span className="text-slate-400">Progrés</span>
                          <span className={`${progressPercentage === 100 ? 'text-emerald-600 dark:text-emerald-400' : 'text-blue-600 dark:text-blue-400'}`}>{progressPercentage}%</span>
                        </div>
                      </div>
                    )}

                    {progressPercentage === 100 && (
                      <div className="flex items-center justify-center gap-2 text-emerald-700 dark:text-emerald-400 text-sm font-bold p-2.5 bg-emerald-50 dark:bg-emerald-500/10 rounded-xl border border-emerald-200 dark:border-emerald-500/20 shadow-sm">
                        <Trophy className="h-4 w-4" />
                        <span>Completat!</span>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            );
          })
        )}
      </div>

      {filteredSections.length === 0 && (
        <Card className="glass-card">
          <CardContent className="py-12">
            <div className="text-center space-y-4">
              <Filter className="h-12 w-12 mx-auto text-muted-foreground" />
              <div>
                <h3 className="text-lg font-medium">No s'han trobat seccions</h3>
                <p className="text-muted-foreground">
                  Prova a canviar els filtres o el terme de cerca
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
