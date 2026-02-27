import { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen, Trophy, Target, Users, Newspaper, Zap, TrendingUp, Plus } from "lucide-react";

import { EnhancedOrthographySystem } from "@/features/courses/components/orthography/EnhancedOrthographySystem";
import { EnhancedChatInterface } from "@/components/chat/EnhancedChatInterface";
import { StudentStatistics } from "@/components/dashboard/StudentStatistics";
import { CatalanTheory } from "@/components/theory/CatalanTheory";
import { NewsList } from "@/components/news/NewsList";
import { EssayReviewManager } from "@/components/dashboard/EssayReviewManager";
import { StreakWidget } from "@/components/layout/StreakWidget";
import { DailyWordGame } from "@/components/dashboard/DailyWordGame";
import { useEasterEgg } from "@/hooks/useEasterEgg";
import { useToast } from "@/hooks/use-toast";
import { useStudentData } from "@/hooks/useStudentData";
import { useRealStats } from "@/hooks/useRealStats";
import { BookLoader } from "@/components/ui/book-loader";
import { ALL_ORTHOGRAPHY_SECTIONS } from '@/features/courses/data/catalanOrthographyData';
import { cn } from "@/lib/utils";
import { BeginnerDashboard } from "@/features/beginner/components/BeginnerDashboard";

interface StudentDashboardProps {
  user: any;
}

export const StudentDashboard = ({ user }: StudentDashboardProps) => {
  const { toast } = useToast();
  const { showAnswers: easterEggActive } = useEasterEgg(user?.role || 'student');
  const [activeTab, setActiveTab] = useState("orthography");
  const [panelPosition, setPanelPosition] = useState({ x: 0, y: 0 });
  const [isPanelAnimating, setIsPanelAnimating] = useState(false);
  const tabsListRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Use the new real stats hook
  const { stats, getWeeklyActivity } = useRealStats(user?.user_id || 'guest');

  const {
    studentClass,
    progress,
    exercises,
    xpPoints: dbXpPoints,
    loading,
    error,
    refetch: fetchStudentData
  } = useStudentData(user?.user_id);

  // Calculate orthography progress (Total available exercises)
  const getOrthographyTotals = () => {
    return {
      total: ALL_ORTHOGRAPHY_SECTIONS.reduce((acc, section) => acc + section.exercises.length, 0),
    };
  };

  const orthographyTotals = getOrthographyTotals();
  const tabs = [
    { id: 'orthography', label: 'Exercicis', icon: BookOpen },
    { id: 'theory', label: 'Teoria', icon: Newspaper },
    { id: 'news', label: 'Notícies', icon: Zap },
    { id: 'extra', label: 'Extra', icon: Plus, badge: 'Nou!' },
  ];

  // Loading is handled at page level, no need to show loader here

  if (error) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <p className="text-destructive mb-4">{error}</p>
          <button
            onClick={fetchStudentData}
            className="text-primary hover:underline"
          >
            Tornar a intentar
          </button>
        </div>
      </div>
    );
  }

  const handleTabClick = (tabValue: string, event: React.MouseEvent<HTMLButtonElement>) => {
    const button = event.currentTarget;
    const container = containerRef.current;

    if (container) {
      const buttonRect = button.getBoundingClientRect();
      const containerRect = container.getBoundingClientRect();

      // Calculate relative position inside the container
      const x = buttonRect.left - containerRect.left + buttonRect.width / 2;
      const y = buttonRect.top - containerRect.top; // Start from top of button row approx

      setPanelPosition({ x, y });

      // Trigger restart of animation
      setIsPanelAnimating(true);
      setActiveTab(tabValue);

      // Detailed scheduling for snappy feel
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setIsPanelAnimating(false);
        });
      });
    } else {
      setActiveTab(tabValue);
    }
  };

  // Determine greeting based on time of day
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 13) return "Bon dia";
    if (hour < 20) return "Bona tarda";
    return "Bona nit";
  };

  // Ctrl+K Shortcut for Quick Action (e.g., Reload or Specific focus)
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key === 'k') {
        event.preventDefault();
        // Implement desired action: Reset active tab? Reload data?
        // User asked for "y el ctl+k" typically meaning 'Command Palette' or search, 
        // OR in this context maybe a shortcut to restart the exercise/module?
        // Since this is Dashboard, maybe they mean general command palette (not implemented yet)
        // OR they mean inside the exercise runner.
        // If inside runner, it should be in BeginnerExerciseRunner.
        // But user mentioned "y el ctl+k" in same request as "volver a intentarlo se reinicie".
        // Let's assume they want a shortcut to restart/reset.

        // However, I am editing StudentDashboard here.
        // It's likely they meant "I want the Ctrl+K feature" (which is usually a command palette)
        // OR "Make Ctrl+K restart the exercise".
        // Given the "buga" context, likely "Ctrl+K to reset/restart".
        // I will implement it in BeginnerExerciseRunner first as that seems more relevant to the bug fix.
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="space-y-8 relative">

      {/* Header section with enhanced styling */}
      {/* Header section with enhanced styling - ALIGNED LEFT */}
      <div className="space-y-4 py-6 max-w-5xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-end gap-3 justify-between">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-medium mb-2 border border-blue-100/50">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
              </span>
              Aprenentatge actiu
            </div>
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-foreground">
              {getGreeting()}, <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">{user.name}</span>
            </h1>
          </div>
          <div className="text-right hidden sm:block">
            <p className="text-sm font-medium text-muted-foreground">{new Date().toLocaleDateString('ca-ES', { weekday: 'long', day: 'numeric', month: 'long' })}</p>
          </div>
        </div>
        <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed">
          Prepara't per dominar el català. Avui és un gran dia per aprendre alguna cosa nova.
        </p>
      </div>

      {/* Grid: Stats, Streak, Game - SAME HEIGHT */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto relative z-10 w-full px-4 sm:px-0 auto-rows-fr">
        <div className="w-full h-full animate-card-entrance">
          <StudentStatistics
            completedExercises={stats.totalExercises}
            totalExercises={orthographyTotals.total}
            errors={stats.totalErrors}
            orthographyCompleted={stats.totalCorrect}
            orthographyTotal={orthographyTotals.total}
            xpPoints={stats.xpTotal}
            weeklyActivity={getWeeklyActivity()}
          />
        </div>

        <div className="w-full h-full animate-card-entrance-delay-1">
          <StreakWidget userId={user.user_id} />
        </div>

        <div className="w-full h-full animate-card-entrance-delay-2">
          <DailyWordGame />
        </div>
      </div>



      <div className="relative">
        <Tabs defaultValue="orthography" value={activeTab} className="space-y-6">
          <div className="flex justify-center w-full">
            <div className="relative w-full max-w-xl">
              <TabsList
                ref={tabsListRef}
                className="relative flex w-full h-auto p-1.5 bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-full shadow-lg border border-white/20 dark:border-slate-700/50 transition-all duration-300"
              >
                {/* Liquid Glass Sliding Pill */}
                <div
                  className="absolute top-1.5 bottom-1.5 left-1.5 rounded-full z-0"
                  style={{
                    width: `calc((100% - 12px) / ${tabs.length})`,
                    transform: `translateX(${tabs.findIndex((tab) => tab.id === activeTab) * 100}%)`,
                    background: "linear-gradient(135deg, rgba(59, 130, 246, 0.15) 0%, rgba(99, 102, 241, 0.1) 100%)",
                    boxShadow: "0 2px 8px rgba(59, 130, 246, 0.15), inset 0 1px 1px rgba(255,255,255,0.5)",
                    backdropFilter: "blur(8px)",
                    transition: "transform 700ms cubic-bezier(0.25, 1, 0.5, 1)"
                  }}
                >
                  <div className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-5 h-[3px] bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full shadow-sm shadow-blue-500/50" />
                </div>

                {/* Tab Triggers */}
                {tabs.map((tab) => (
                  <TabsTrigger
                    key={tab.id}
                    value={tab.id}
                    onClick={(e) => handleTabClick(tab.id, e)}
                    className="relative flex-1 flex items-center justify-center gap-2 py-2 text-xs sm:text-sm font-medium transition-all duration-300 z-10 text-slate-600 data-[state=active]:text-slate-900 hover:text-slate-900 hover:-translate-y-0.5 hover:shadow-md hover:bg-transparent dark:hover:bg-transparent dark:text-white/60 dark:data-[state=active]:text-white dark:hover:text-white border-0 border-none shadow-none outline-none ring-0 data-[state=active]:shadow-none data-[state=active]:bg-transparent data-[state=active]:border-none"
                  >
                    <tab.icon className={cn(
                      "w-4 h-4 transition-transform duration-500",
                      activeTab === tab.id ? "scale-110 text-slate-900 dark:text-white" : "scale-100 text-slate-500 dark:text-white/60"
                    )} />
                    <span className={cn(
                      "hidden sm:inline transition-opacity duration-300",
                      activeTab === tab.id ? "opacity-100 font-bold" : "opacity-70"
                    )}>{tab.label}</span>
                    {/* Badge "Nou!" */}
                    {(tab as any).badge && (
                      <span className="absolute top-1.5 right-1.5 px-1.5 py-0.5 text-[9px] font-bold bg-indigo-100 text-indigo-600 dark:bg-indigo-500/20 dark:text-indigo-300 rounded-full shadow-sm">
                        {(tab as any).badge}
                      </span>
                    )}
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>
          </div>

          <div className="relative" ref={containerRef}>
            <div
              className={cn(
                "w-full transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)]",
                isPanelAnimating ? "opacity-0 scale-90 translate-y-4 blur-sm" : "opacity-100 scale-100 translate-y-0 blur-0"
              )}
              style={{
                transformOrigin: `${panelPosition.x}px -20px`, // Anchor to the button position above
              }}
            >
              <TabsContent
                value="orthography"
                className={cn(
                  "space-y-4 mt-6",
                  activeTab === "orthography" && !isPanelAnimating && "animate-in fade-in-0 slide-in-from-top-4 duration-400"
                )}
              >
                <EnhancedOrthographySystem
                  userId={user.user_id}
                  userRole={user?.role || 'student'}
                  onProgressUpdate={(sectionId, exerciseId, isCorrect) => {
                    console.log('Orthography progress:', { sectionId, exerciseId, isCorrect });
                  }}
                />
              </TabsContent>

              <TabsContent
                value="theory"
                className={cn(
                  "space-y-4 mt-6",
                  activeTab === "theory" && !isPanelAnimating && "animate-in fade-in-0 slide-in-from-top-4 duration-400"
                )}
              >
                <CatalanTheory />
              </TabsContent>

              <TabsContent
                value="news"
                className={cn(
                  "space-y-4 mt-6",
                  activeTab === "news" && !isPanelAnimating && "animate-in fade-in-0 slide-in-from-top-4 duration-400"
                )}
              >
                <NewsList />
              </TabsContent>

              <TabsContent
                value="extra"
                className={cn(
                  "space-y-4 mt-6",
                  activeTab === "extra" && !isPanelAnimating && "animate-in fade-in-0 slide-in-from-top-4 duration-400"
                )}
              >
                <Card className="border-0 shadow-lg bg-white/50 dark:bg-slate-900/50 backdrop-blur-xl">
                  <CardHeader>
                    <CardTitle>Secció de Principiant</CardTitle>
                    <CardDescription>Exercicis per a principiants, ideals per a gent de 1r d'ESO.</CardDescription>
                  </CardHeader>
                  <CardContent className="p-6">
                    <BeginnerDashboard />
                  </CardContent>
                </Card>
              </TabsContent>

              {studentClass && (
                <TabsContent
                  value="chat"
                  className={cn(
                    "space-y-4 mt-6",
                    activeTab === "chat" && !isPanelAnimating && "animate-in fade-in-0 slide-in-from-top-4 duration-400"
                  )}
                >
                  <EnhancedChatInterface
                    classId={studentClass.id}
                    chatPermissions={studentClass.chat_permissions}
                  />
                </TabsContent>
              )}
            </div>
          </div>
        </Tabs>
      </div>
    </div>
  );
};
