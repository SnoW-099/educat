import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, BookOpen, GraduationCap, Hash, Trophy, Filter, Clock, CheckCircle, XCircle } from 'lucide-react';
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
  const { toast } = useToast();
  const { showAnswers, generateAlternativeAnswers } = useEasterEgg(userRole);

  // Use the new real stats hook
  const { recordExercise } = useRealStats(userId || 'guest');

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
            className="cursor-pointer bg-white dark:bg-slate-800 border-2 border-slate-100 dark:border-slate-700 hover:border-blue-400 dark:hover:border-blue-500 hover:shadow-xl hover:shadow-blue-100/50 dark:hover:shadow-blue-900/30 hover:-translate-y-1 transition-all duration-300 ease-out group"
            onClick={() => setCourseFilter('B2')}
          >
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-blue-50 dark:bg-blue-900/30 rounded-2xl mx-auto mb-5 flex items-center justify-center group-hover:bg-blue-100 dark:group-hover:bg-blue-800/50 group-hover:scale-110 transition-all duration-300">
                <BookOpen className="w-8 h-8 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-3xl font-bold text-slate-800 dark:text-white mb-2">B2</h3>
              <p className="text-slate-500 dark:text-slate-400 mb-6">780+ exercicis</p>
              <Button className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-all duration-200 hover:shadow-lg hover:shadow-blue-200 dark:hover:shadow-blue-900/50">
                Començar
              </Button>
            </CardContent>
          </Card>

          {/* C1 Card */}
          <Card
            className="cursor-pointer bg-white dark:bg-slate-800 border-2 border-slate-100 dark:border-slate-700 hover:border-blue-400 dark:hover:border-blue-500 hover:shadow-xl hover:shadow-blue-100/50 dark:hover:shadow-blue-900/30 hover:-translate-y-1 transition-all duration-300 ease-out group"
            onClick={() => setCourseFilter('C1')}
          >
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-blue-50 dark:bg-blue-900/30 rounded-2xl mx-auto mb-5 flex items-center justify-center group-hover:bg-blue-100 dark:group-hover:bg-blue-800/50 group-hover:scale-110 transition-all duration-300">
                <GraduationCap className="w-8 h-8 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-3xl font-bold text-slate-800 dark:text-white mb-2">C1</h3>
              <p className="text-slate-500 dark:text-slate-400 mb-6">+750 exercicis</p>
              <Button className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-all duration-200 hover:shadow-lg hover:shadow-blue-200 dark:hover:shadow-blue-900/50">
                Començar
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCourseFilter('')}
          >
            ← Canviar
          </Button>
          <span className="text-sm font-mono text-muted-foreground">
            Curs: <span className="text-foreground font-semibold">{courseFilter}</span>
          </span>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Cerca seccions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex flex-wrap items-center gap-4">
          <Tabs value={activeCategory} onValueChange={(value) => setActiveCategory(value as any)}>
            <TabsList>
              <TabsTrigger value="all">Totes</TabsTrigger>
              <TabsTrigger value="ortografia">Ortografia</TabsTrigger>
              <TabsTrigger value="gramàtica">Gramàtica</TabsTrigger>
              <TabsTrigger value="lectura">Lectura</TabsTrigger>
              <TabsTrigger value="escriptura">Escriptura</TabsTrigger>
              <TabsTrigger value="vocabulari">Vocabulari</TabsTrigger>
            </TabsList>
          </Tabs>

          <div className="flex gap-2">
            <Select value={difficultyFilter} onValueChange={(value) => setDifficultyFilter(value as any)}>
              <SelectTrigger className="w-32">
                <SelectValue placeholder="Dificultat" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Totes</SelectItem>
                <SelectItem value="1">Fàcil</SelectItem>
                <SelectItem value="2">Normal</SelectItem>
                <SelectItem value="3">Difícil</SelectItem>
                <SelectItem value="4">Master</SelectItem>
              </SelectContent>
            </Select>

            <Select value={sortBy} onValueChange={(value) => setSortBy(value as any)}>
              <SelectTrigger className="w-32">
                <SelectValue placeholder="Ordenar per" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="title">Títol</SelectItem>
                <SelectItem value="difficulty">Dificultat</SelectItem>
                <SelectItem value="progress">Progrés</SelectItem>
              </SelectContent>
            </Select>
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
                className="group card-premium cursor-pointer animate-scale-in glow-on-hover text-slate-900 dark:text-white bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700"
                onClick={() => setSelectedSection(section)}
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <CardHeader className="space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <CardTitle className="text-xl font-bold group-hover:text-primary transition-colors leading-tight">
                      {section.title}
                    </CardTitle>
                  </div>

                  <div className="flex gap-2 flex-wrap">
                    <Badge variant="outline" className={getCategoryBadgeStyle(section.category)}>
                      {getCategoryLabel(section.category)}
                    </Badge>
                  </div>

                  <CardDescription className="text-sm leading-relaxed line-clamp-2 text-slate-500 dark:text-slate-400">
                    {section.description}
                  </CardDescription>
                </CardHeader>

                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-slate-500 dark:text-slate-500 font-medium">
                        {section.exercises.length} exercicis
                      </span>
                      {completedCount > 0 && (
                        <span className="text-emerald-600 font-bold flex items-center gap-1.5">
                          <CheckCircle className="h-4 w-4" />
                          {completedCount}/{section.exercises.length}
                        </span>
                      )}
                    </div>

                    {progressPercentage > 0 && (
                      <div className="space-y-2">
                        <div className="h-2.5 bg-slate-200 dark:bg-slate-600 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-slate-900 dark:bg-blue-500 transition-all duration-500"
                            style={{ width: `${progressPercentage}%` }}
                          />
                        </div>
                        <div className="flex justify-between items-center text-xs">
                          <span className="text-slate-500 dark:text-slate-400 font-medium">Progrés</span>
                          <span className="font-bold">{progressPercentage}%</span>
                        </div>
                      </div>
                    )}

                    {progressPercentage === 100 && (
                      <div className="flex items-center justify-center gap-2 text-emerald-700 text-sm font-bold p-3 bg-emerald-50 rounded-lg border border-emerald-200">
                        <Trophy className="h-5 w-5" />
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
