import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3, TrendingUp, Target, AlertCircle, ChevronRight, Trophy, Flame } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface StudentStatisticsProps {
  completedExercises: number;
  totalExercises: number;
  errors: number;
  orthographyCompleted: number;
  orthographyTotal: number;
  xpPoints: number;
  weeklyActivity?: number[]; // New prop for real data
}

export const StudentStatistics = ({
  completedExercises,
  totalExercises,
  errors,
  orthographyCompleted,
  orthographyTotal,
  xpPoints,
  weeklyActivity = [0, 0, 0, 0, 0, 0, 0] // Default empty
}: StudentStatisticsProps) => {
  const exerciseProgress = totalExercises > 0 ? (completedExercises / totalExercises) * 100 : 0;
  const orthographyProgress = orthographyTotal > 0 ? (orthographyCompleted / orthographyTotal) * 100 : 0;
  const accuracy = completedExercises > 0 ? Math.round(((completedExercises - errors) / completedExercises) * 100) : 0;

  // Calculate max value for chart scaling
  const maxActivity = Math.max(...weeklyActivity, 5); // Minimum scale of 5

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Card className="group relative overflow-hidden border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-sm hover:border-blue-500/30 hover:shadow-[0_8px_30px_rgba(59,130,246,0.1)] transition-all duration-300 cursor-pointer h-full flex flex-col justify-between">
          <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-blue-500/20 to-transparent group-hover:via-blue-500/50 transition-colors duration-500" />
          <CardHeader className="pb-2 relative z-10">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-blue-50/80 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 border border-blue-100/50 dark:border-blue-800/30 group-hover:scale-110 transition-transform duration-300">
                  <BarChart3 className="h-5 w-5 drop-shadow-sm" />
                </div>
                <div>
                  <CardTitle className="text-base font-bold text-slate-800 dark:text-white">El teu Progrés</CardTitle>
                  <CardDescription className="text-xs font-medium text-slate-500 dark:text-slate-400 drop-shadow-sm">Visió general</CardDescription>
                </div>
              </div>
              <ChevronRight className="h-5 w-5 text-slate-400 group-hover:text-blue-500 transition-all group-hover:translate-x-1 duration-300" />
            </div>
          </CardHeader>

          <CardContent className="space-y-6 pt-2 flex-1 flex flex-col justify-between relative z-10">
            <div className="grid grid-cols-3 gap-4 divide-x divide-slate-200 dark:divide-slate-700 border border-slate-100 dark:border-slate-700/50 bg-slate-50/50 dark:bg-slate-800/50 rounded-xl p-3">
              <div className="text-center px-1">
                <div className="text-xl font-black text-slate-800 dark:text-white">{completedExercises}</div>
                <p className="text-[10px] uppercase font-bold tracking-wider text-slate-500 mt-1">Exercicis</p>
              </div>

              <div className="text-center px-1">
                <div className="text-xl font-black text-slate-800 dark:text-white">{accuracy}%</div>
                <p className="text-[10px] uppercase font-bold tracking-wider text-slate-500 mt-1">Precisió</p>
              </div>

              <div className="text-center px-1">
                <div className="text-xl font-black text-slate-800 dark:text-white">{xpPoints}</div>
                <p className="text-[10px] uppercase font-bold tracking-wider text-slate-500 mt-1">XP</p>
              </div>
            </div>

            <div className="space-y-2.5 bg-transparent pl-1">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-slate-700 dark:text-slate-300">Progrés diari</span>
                <span className="font-bold text-blue-600 dark:text-blue-400">{Math.round(exerciseProgress)}%</span>
              </div>
              <div className="h-2 bg-slate-100 dark:bg-slate-700/50 rounded-full overflow-hidden border border-slate-200/50 dark:border-slate-800/50 shadow-inner">
                <div
                  className="h-full bg-blue-500 rounded-full transition-all duration-700 ease-out shadow-sm"
                  style={{ width: `${exerciseProgress}%` }}
                />
              </div>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-slate-100 dark:border-slate-700 pl-1 mt-auto">
              <div className="flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Actiu</span>
              </div>
              <span className="text-[11px] font-semibold text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-700/50 px-2 py-0.5 rounded-full border border-slate-200/50 dark:border-slate-600/50">
                {orthographyCompleted} ortografia
              </span>
            </div>
          </CardContent>
        </Card>
      </DialogTrigger>

      <DialogContent className="max-w-4xl max-h-[85vh] overflow-y-auto border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-xl sm:rounded-2xl"
        onInteractOutside={(e) => e.preventDefault()}
      >
        {/* ... (Header and Metrics Grid remain largely same, skipping to Performance Section for brevity in replace if possible, but replace tool needs context) */}
        {/* Actually replace tool needs continuous block. I will include full logical start to keep context valid. */}
        <DialogHeader className="pb-6 border-b border-slate-100 dark:border-slate-700">
          <DialogTitle className="flex items-center gap-3 text-xl font-semibold text-slate-900 dark:text-white">
            <BarChart3 className="h-5 w-5 text-slate-500 dark:text-slate-400" />
            Estadístiques
          </DialogTitle>
          <DialogDescription className="text-slate-500 dark:text-slate-400 text-sm">
            Detalls de la teva activitat d'aprenentatge
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-8 py-6">
          {/* Main metrics grid - Minimalist */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Exercises Minimal Card */}
            <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-700/50 hover:bg-white dark:hover:bg-slate-700 hover:border-slate-300 dark:hover:border-slate-600 transition-colors">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">Exercicis</span>
                <Target className="h-4 w-4 text-slate-400" />
              </div>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-bold text-slate-900 dark:text-white">{completedExercises}</span>
                <span className="text-xs text-slate-400">/ {totalExercises}</span>
              </div>
              <div className="mt-3">
                <div className="h-1 bg-slate-200 dark:bg-slate-600 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-500" style={{ width: `${exerciseProgress}%` }}></div>
                </div>
              </div>
            </div>

            {/* Orthography Minimal Card */}
            <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-700/50 hover:bg-white dark:hover:bg-slate-700 hover:border-slate-300 dark:hover:border-slate-600 transition-colors">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">Ortografia</span>
                <TrendingUp className="h-4 w-4 text-slate-400" />
              </div>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-bold text-slate-900 dark:text-white">{orthographyCompleted}</span>
                <span className="text-xs text-slate-400">/ {orthographyTotal}</span>
              </div>
              <div className="mt-3">
                <div className="h-1 bg-slate-200 dark:bg-slate-600 rounded-full overflow-hidden">
                  <div className="h-full bg-purple-500" style={{ width: `${orthographyProgress}%` }}></div>
                </div>
              </div>
            </div>

            {/* Accuracy Minimal Card */}
            <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-700/50 hover:bg-white dark:hover:bg-slate-700 hover:border-slate-300 dark:hover:border-slate-600 transition-colors">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">Precisió</span>
                <Trophy className="h-4 w-4 text-slate-400" />
              </div>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-bold text-slate-900 dark:text-white">{accuracy}%</span>
              </div>
              <div className="mt-3 text-xs text-slate-500 dark:text-slate-400">
                {accuracy >= 80 ? 'Excel·lent' : accuracy >= 60 ? 'Bé' : 'Millorar'}
              </div>
            </div>

            {/* Errors Minimal Card */}
            <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-700/50 hover:bg-white dark:hover:bg-slate-700 hover:border-slate-300 dark:hover:border-slate-600 transition-colors">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">Errors</span>
                <AlertCircle className="h-4 w-4 text-slate-400" />
              </div>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-bold text-slate-900 dark:text-white">{errors}</span>
              </div>
              <div className="mt-3 text-xs text-slate-500 dark:text-slate-400">
                Errors detectats
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* Minimalist XP Section */}
            <div className="p-6 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-700">
              <h3 className="text-sm font-semibold text-slate-800 dark:text-white mb-6 flex items-center gap-2">
                <Flame className="w-4 h-4 text-slate-800 dark:text-slate-300" />
                Experiència
              </h3>

              <div className="flex items-center justify-between mb-8">
                <div>
                  <div className="text-3xl font-bold text-slate-900 dark:text-white">{xpPoints}</div>
                  <div className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wide">XP Total</div>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-slate-900 dark:text-white">{Math.floor(xpPoints / 1000) + 1}</div>
                  <div className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wide">Nivell</div>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between text-sm py-2 border-b border-slate-100 dark:border-slate-600">
                  <span className="text-slate-600 dark:text-slate-300">Per Exercicis</span>
                  <span className="font-mono font-medium text-slate-900 dark:text-white">+{completedExercises * 10}</span>
                </div>
                <div className="flex justify-between text-sm py-2 border-b border-slate-100 dark:border-slate-600">
                  <span className="text-slate-600 dark:text-slate-300">Per Ortografia</span>
                  <span className="font-mono font-medium text-slate-900 dark:text-white">+{orthographyCompleted * 15}</span>
                </div>
              </div>
            </div>

            {/* Minimalist Performance Section */}
            <div className="p-6 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-700 shadow-sm hover:shadow-md transition-shadow">
              <h3 className="text-sm font-semibold text-slate-800 dark:text-white mb-6 flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-blue-500" />
                Rendiment
              </h3>

              <div className="space-y-8">
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">Nivell de Competència</span>
                    <Badge variant="secondary" className={cn(
                      "text-[10px] font-bold px-2 py-0.5 border capitalize",
                      accuracy >= 80 ? "bg-emerald-50 text-emerald-700 border-emerald-100" :
                        accuracy >= 60 ? "bg-blue-50 text-blue-700 border-blue-100" :
                          "bg-amber-50 text-amber-700 border-amber-100"
                    )}>
                      {accuracy >= 80 ? 'Avançat' : accuracy >= 60 ? 'Intermedi' : 'Principiant'}
                    </Badge>
                  </div>
                  <div className="flex gap-1.5 h-2.5">
                    <div className={cn("h-full rounded-l-full flex-1 transition-colors duration-500", accuracy >= 30 ? "bg-slate-800" : "bg-slate-100")}></div>
                    <div className={cn("h-full flex-1 transition-colors duration-500", accuracy >= 60 ? "bg-slate-800" : "bg-slate-100")}></div>
                    <div className={cn("h-full rounded-r-full flex-1 transition-colors duration-500", accuracy >= 80 ? "bg-slate-800" : "bg-slate-100")}></div>
                  </div>
                  <p className="text-[10px] text-slate-400 mt-2">Basat en la teva precisió global del {accuracy}%</p>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">Activitat (Darrers 7 dies)</span>
                  </div>
                  <div className="flex items-end justify-between gap-1.5 h-24">
                    {weeklyActivity.map((count, i) => {
                      const dayLabels = ['dg', 'dl', 'dt', 'dc', 'dj', 'dv', 'ds'];
                      const dayName = dayLabels[(new Date().getDay() - (6 - i) + 7) % 7];
                      const height = Math.max(8, (count / maxActivity) * 100);

                      return (
                        <div key={i} className="flex-1 flex flex-col items-center gap-2 h-full">
                          <div className="flex-1 w-full bg-slate-50 rounded-md relative overflow-hidden group cursor-pointer border border-transparent hover:border-blue-100">
                            <div
                              className={cn(
                                "absolute bottom-0 w-full transition-all duration-700 ease-out",
                                count > 0 ? "bg-blue-500 group-hover:bg-blue-600" : "bg-slate-200"
                              )}
                              style={{ height: `${height}%` }}
                            />
                            <div className="opacity-0 group-hover:opacity-100 absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[10px] px-2 py-1 rounded shadow-xl pointer-events-none transition-all duration-200 transform group-hover:-translate-y-1">
                              {count} ex.
                            </div>
                          </div>
                          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tight">{dayName}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
