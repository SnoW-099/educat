import { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen, Trophy, Target, MessageCircle, Users, Newspaper, Zap, TrendingUp } from "lucide-react";
import { XPRanking } from "@/components/ranking/XPRanking";
import { GlobalXPRanking } from "@/components/ranking/GlobalXPRanking";
import { EnhancedOrthographySystem } from "@/components/orthography/EnhancedOrthographySystem";
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
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { ALL_ORTHOGRAPHY_SECTIONS } from '@/utils/catalanOrthographyData';
import { cn } from "@/lib/utils";

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

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <LoadingSpinner size="lg" className="mb-4" />
          <p className="text-muted-foreground">Carregant dades de l'estudiant...</p>
        </div>
      </div>
    );
  }

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

  return (
    <div className="space-y-8 relative">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 -mt-20 -mr-20 w-96 h-96 bg-blue-100/40 rounded-full blur-3xl -z-10 animate-pulse" />
      <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-72 h-72 bg-purple-100/40 rounded-full blur-3xl -z-10 animate-pulse" style={{ animationDelay: '2s' }} />

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
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-800">
              {getGreeting()}, <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">{user.name}</span>
            </h1>
          </div>
          <div className="text-right hidden sm:block">
            <p className="text-sm font-medium text-slate-500">{new Date().toLocaleDateString('ca-ES', { weekday: 'long', day: 'numeric', month: 'long' })}</p>
          </div>
        </div>
        <p className="text-lg text-slate-500 max-w-2xl leading-relaxed">
          Prepara't per dominar el català. Avui és un gran dia per aprendre alguna cosa nova.
        </p>
      </div>

      {/* Grid: Stats, Streak, Game - SAME HEIGHT */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto relative z-10 w-full px-4 sm:px-0 auto-rows-fr">
        <div className="w-full h-full">
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

        <div className="w-full h-full">
          <StreakWidget userId={user.user_id} />
        </div>

        <div className="w-full h-full">
          <DailyWordGame />
        </div>
      </div>



      <div className="relative">
        <Tabs defaultValue="orthography" value={activeTab} className="space-y-6">
          <div className="flex justify-center w-full">
            <div className="relative w-full max-w-xl">
              <TabsList
                ref={tabsListRef}
                className="relative flex w-full h-auto p-1 bg-white rounded-full shadow-lg transition-all duration-300"
              >
                {/* Liquid Glass Sliding Pill with Blue Line */}
                <div
                  className="absolute top-1 bottom-1 left-1 w-[calc((100%-8px)/5)] rounded-full bg-blue-50/50 transition-all duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] z-0 flex flex-col justify-end"
                  style={{
                    transform: `translateX(${["orthography", "theory", "news", "ranking", "chat"].indexOf(activeTab) * 100
                      }%)`,
                  }}
                >
                  <div className="w-full h-[3px] bg-blue-600 rounded-full mb-1 mx-auto max-w-[20px]" />
                </div>

                {/* Tab Triggers */}
                {[
                  { id: 'orthography', label: 'Exercicis', icon: BookOpen },
                  { id: 'theory', label: 'Teoria', icon: Newspaper },
                  { id: 'news', label: 'Notícies', icon: Zap },
                  { id: 'ranking', label: 'Classificació', icon: Trophy },
                  { id: 'chat', label: 'Xat', icon: MessageCircle },
                ].map((tab) => (
                  <TabsTrigger
                    key={tab.id}
                    value={tab.id}
                    onClick={(e) => handleTabClick(tab.id, e)}
                    className="relative flex-1 flex items-center justify-center gap-2 py-2 text-xs sm:text-sm font-medium transition-colors duration-300 z-10 text-gray-500 data-[state=active]:text-black hover:text-black border-0 border-none shadow-none outline-none ring-0 data-[state=active]:shadow-none data-[state=active]:bg-transparent data-[state=active]:border-none"
                  >
                    <tab.icon className={cn(
                      "w-4 h-4 transition-transform duration-500",
                      activeTab === tab.id ? "scale-110 text-black" : "scale-100"
                    )} />
                    <span className={cn(
                      "hidden sm:inline transition-opacity duration-300",
                      activeTab === tab.id ? "opacity-100 font-bold" : "opacity-70"
                    )}>{tab.label}</span>
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
                value="ranking"
                className={cn(
                  "space-y-4 mt-6",
                  activeTab === "ranking" && !isPanelAnimating && "animate-in fade-in-0 slide-in-from-top-4 duration-400"
                )}
              >
                {studentClass ? (
                  <div className="grid gap-6 lg:grid-cols-2">
                    <XPRanking
                      classId={studentClass.id}
                      currentUserId={user.user_id}
                    />
                    <GlobalXPRanking
                      currentUserId={user.user_id}
                    />
                  </div>
                ) : (
                  <Card className="glass-card">
                    <CardHeader>
                      <CardTitle>Classificació XP</CardTitle>
                      <CardDescription>
                        No estàs inscrit a cap classe
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="text-center text-muted-foreground py-8">
                        <Trophy className="h-12 w-12 mx-auto mb-4 opacity-50" />
                        <p>Necessites estar inscrit a una classe per veure la classificació</p>
                        <p className="text-sm mt-2">Contacta amb el teu professor per obtenir un codi de classe</p>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </TabsContent>

              <TabsContent
                value="chat"
                className={cn(
                  "space-y-4 mt-6",
                  activeTab === "chat" && !isPanelAnimating && "animate-in fade-in-0 slide-in-from-top-4 duration-400"
                )}
              >
                <Card className="glass-card">
                  <CardHeader>
                    <CardTitle>Xat</CardTitle>
                    <CardDescription>
                      Funcionalitat temporalment deshabilitada
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center text-muted-foreground py-8">
                      <MessageCircle className="h-12 w-12 mx-auto mb-4 opacity-50" />
                      <p>El xat està temporalment inactiu</p>
                      <p className="text-sm mt-2">Estem treballant per millorar aquesta funcionalitat</p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </div>
          </div>
        </Tabs>
      </div>
    </div>
  );
};