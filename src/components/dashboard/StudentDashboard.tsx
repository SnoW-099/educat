import { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen, Trophy, Target, Users, Newspaper, Zap, TrendingUp, Plus, Bot } from "lucide-react";

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

  const handleTabClick = (tabValue: string) => {
    setActiveTab(tabValue);
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
        // If not in orthography, switch to it
        if (activeTab !== 'orthography') {
          setActiveTab('orthography');
        }
        
        // Dispatch event to focus the search input in EnhancedOrthographySystem
        setTimeout(() => {
          window.dispatchEvent(new CustomEvent('focus-course-search'));
        }, 100);
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
                  className="absolute top-1.5 bottom-1.5 left-1.5 rounded-full z-0 tab-indicator-smooth"
                  style={{
                    width: `calc((100% - 12px) / ${tabs.length})`,
                    transform: `translateX(${tabs.findIndex((tab) => tab.id === activeTab) * 100}%)`,
                    background: "rgba(59, 130, 246, 0.08)",
                    border: "1px solid rgba(59, 130, 246, 0.2)",
                    boxShadow: "0 2px 10px rgba(59, 130, 246, 0.1)",
                    backdropFilter: "blur(4px)",
                  }}
                >
                  <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-4 h-1 bg-blue-500 rounded-full shadow-[0_0_8px_rgba(59,130,246,0.6)]" />
                </div>

                {/* Tab Triggers */}
                {tabs.map((tab) => (
                  <TabsTrigger
                    key={tab.id}
                    value={tab.id}
                    onClick={() => handleTabClick(tab.id)}
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
                      <span className="absolute top-1.5 right-1.5 px-1.5 py-0.5 text-[9px] font-bold bg-blue-100 text-blue-600 dark:bg-blue-500/20 dark:text-blue-300 rounded-full shadow-sm">
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
              key={activeTab}
              className="w-full pt-6 animate-tab-entry"
            >
              <TabsContent
                value="orthography"
                className="space-y-4 mt-6 outline-none"
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
                className="space-y-4 mt-6 outline-none"
              >
                <CatalanTheory />
              </TabsContent>

              <TabsContent
                value="news"
                className="space-y-4 mt-6 outline-none"
              >
                <NewsList />
              </TabsContent>

              <TabsContent
                value="extra"
                className="space-y-4 mt-6 outline-none"
              >
                <div className="w-full">
                  <BeginnerDashboard />
                </div>
              </TabsContent>

              {studentClass && (
                <TabsContent
                  value="chat"
                  className="space-y-4 mt-6 outline-none"
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

      {/* Subtle AI Professor teaser */}
      <div className="flex justify-center w-full mt-12 pb-8 opacity-40 hover:opacity-100 transition-opacity duration-700">
        <div className="flex items-center gap-2.5 px-4 py-2 rounded-full bg-slate-100/50 dark:bg-slate-800/30 border border-slate-200/50 dark:border-slate-700/30 cursor-default select-none shadow-sm backdrop-blur-sm">
          <div className="relative flex items-center justify-center">
            <Bot className="w-4 h-4 text-blue-500 dark:text-blue-400" />
            <span className="absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-20 animate-ping"></span>
          </div>
          <span className="text-xs font-medium text-slate-600 dark:text-slate-400 tracking-wide">Professor Personal (IA)</span>
          <span className="text-[9px] uppercase font-bold px-2 py-0.5 rounded-full bg-gradient-to-r from-blue-500/10 to-sky-500/10 text-blue-600 dark:text-blue-400 border border-blue-200/50 dark:border-blue-700/50">Pròximament</span>
        </div>
      </div>
    </div>
  );
};
