import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { 
  Trophy,
  Target,
  Zap,
  BookOpen,
  TrendingUp,
  TrendingDown,
  Award,
  CheckCircle2,
  Clock,
  Calendar,
  Brain,
  Star
} from 'lucide-react';

interface AnalysisData {
  skillBalance: any;
  exerciseStreak: number;
  totalXpAllTime: number;
  currentMonthXp: number;
  completedExercises: number;
  totalExercises: number;
  learningPatterns: {
    preferredTime: string;
    avgSessionTime: number;
    consistency: number;
    difficulty: string;
    weeklyGoal: number;
    achievementRate: number;
  };
  predictions: {
    nextLevelProgress: number;
    estimatedTimeToLevel: string;
    recommendedFocus: string[];
  };
}

interface OrthographyProgress {
  completed: number;
  total: number;
  byDifficulty: { [key: number]: number };
  xpFromOrthography: number;
}

interface AdvancedMetricsGridProps {
  analysisData: AnalysisData;
  orthographyProgress?: OrthographyProgress;
}

export const AdvancedMetricsGrid = ({ analysisData, orthographyProgress }: AdvancedMetricsGridProps) => {
  const getStreakColor = (streak: number) => {
    if (streak >= 10) return 'text-green-500';
    if (streak >= 5) return 'text-orange-500';
    return 'text-muted-foreground';
  };

  const getStreakIcon = (streak: number) => {
    if (streak >= 10) return <Trophy className="h-4 w-4" />;
    if (streak >= 5) return <Zap className="h-4 w-4" />;
    return <Calendar className="h-4 w-4" />;
  };

  const getConsistencyColor = (consistency: number) => {
    if (consistency >= 80) return 'text-green-500';
    if (consistency >= 60) return 'text-orange-500';
    if (consistency >= 40) return 'text-yellow-500';
    return 'text-muted-foreground';
  };

  const getAchievementBadge = (rate: number) => {
    if (rate >= 90) return { label: 'Excel·lent', variant: 'default' as const, color: 'bg-green-500' };
    if (rate >= 75) return { label: 'Molt Bé', variant: 'secondary' as const, color: 'bg-blue-500' };
    if (rate >= 60) return { label: 'Bé', variant: 'outline' as const, color: 'bg-orange-500' };
    return { label: 'Millorable', variant: 'destructive' as const, color: 'bg-red-500' };
  };

  const completionPercentage = analysisData.totalExercises > 0 
    ? (analysisData.completedExercises / analysisData.totalExercises) * 100 
    : 0;

  const orthographyPercentage = orthographyProgress && orthographyProgress.total > 0
    ? (orthographyProgress.completed / orthographyProgress.total) * 100
    : 0;

  const achievementBadge = getAchievementBadge(analysisData.learningPatterns.achievementRate);

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {/* Overall Score */}
      <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Puntuació General</CardTitle>
          <Target className="h-4 w-4 text-primary" />
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold text-primary mb-2">
            {Math.round(analysisData.skillBalance.overall_score || 0)}%
          </div>
          <div className="flex items-center justify-between">
            <Progress 
              value={analysisData.skillBalance.overall_score || 0} 
              className="flex-1 mr-2 h-2" 
            />
            <Badge variant="outline" className="text-xs">
              {analysisData.predictions.nextLevelProgress}%
            </Badge>
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            Progrés cap al següent nivell
          </p>
        </CardContent>
      </Card>

      {/* Learning Streak */}
      <Card className="bg-gradient-to-br from-orange-500/5 to-orange-500/10 border-orange-500/20">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Ratxa d'Estudi</CardTitle>
          <div className={getStreakColor(analysisData.exerciseStreak)}>
            {getStreakIcon(analysisData.exerciseStreak)}
          </div>
        </CardHeader>
        <CardContent>
          <div className={`text-3xl font-bold mb-2 ${getStreakColor(analysisData.exerciseStreak)}`}>
            {analysisData.exerciseStreak}
          </div>
          <div className="space-y-1">
            <Badge 
              variant={analysisData.exerciseStreak >= 7 ? "default" : "outline"}
              className="text-xs"
            >
              {analysisData.exerciseStreak >= 7 ? 'Setmana completa!' : 'Continua així!'}
            </Badge>
            <p className="text-xs text-muted-foreground">
              {analysisData.exerciseStreak === 1 ? 'dia consecutiu' : 'dies consecutius'}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* XP Progress */}
      <Card className="bg-gradient-to-br from-accent/5 to-accent/10 border-accent/20">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Experiència</CardTitle>
          <Award className="h-4 w-4 text-accent" />
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold text-accent mb-2">
            {analysisData.totalXpAllTime.toLocaleString()}
          </div>
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>Aquest mes: {analysisData.currentMonthXp.toLocaleString()}</span>
            {analysisData.currentMonthXp > analysisData.learningPatterns.weeklyGoal * 4 ? (
              <TrendingUp className="h-3 w-3 text-green-500" />
            ) : (
              <TrendingDown className="h-3 w-3 text-orange-500" />
            )}
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            XP total acumulada
          </p>
        </CardContent>
      </Card>

      {/* Completion Rate */}
      <Card className="bg-gradient-to-br from-green-500/5 to-green-500/10 border-green-500/20">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Exercicis</CardTitle>
          <CheckCircle2 className="h-4 w-4 text-green-500" />
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold text-green-500 mb-2">
            {analysisData.completedExercises}
          </div>
          <div className="space-y-2">
            <Progress 
              value={completionPercentage} 
              className="h-2" 
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>de {analysisData.totalExercises} exercicis</span>
              <span>{Math.round(completionPercentage)}%</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Learning Consistency */}
      <Card className="bg-gradient-to-br from-blue-500/5 to-blue-500/10 border-blue-500/20">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Consistència</CardTitle>
          <Clock className="h-4 w-4 text-blue-500" />
        </CardHeader>
        <CardContent>
          <div className={`text-3xl font-bold mb-2 ${getConsistencyColor(analysisData.learningPatterns.consistency)}`}>
            {analysisData.learningPatterns.consistency}%
          </div>
          <div className="space-y-1">
            <div className="flex justify-between text-xs">
              <span className="text-muted-foreground">Hora preferida:</span>
              <span className="font-medium">{analysisData.learningPatterns.preferredTime}</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-muted-foreground">Sessió mitjana:</span>
              <span className="font-medium">{analysisData.learningPatterns.avgSessionTime}min</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Achievement Rate */}
      <Card className="bg-gradient-to-br from-purple-500/5 to-purple-500/10 border-purple-500/20">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Rendiment</CardTitle>
          <Brain className="h-4 w-4 text-purple-500" />
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold text-purple-500 mb-2">
            {analysisData.learningPatterns.achievementRate}%
          </div>
          <div className="space-y-2">
            <Badge 
              variant={achievementBadge.variant}
              className="text-xs"
            >
              {achievementBadge.label}
            </Badge>
            <p className="text-xs text-muted-foreground">
              Exercicis amb puntuació ≥70%
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Orthography Progress */}
      {orthographyProgress && (
        <Card className="bg-gradient-to-br from-indigo-500/5 to-indigo-500/10 border-indigo-500/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Ortografia</CardTitle>
            <BookOpen className="h-4 w-4 text-indigo-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-indigo-500 mb-2">
              {orthographyProgress.completed}
            </div>
            <div className="space-y-2">
              <Progress 
                value={orthographyPercentage} 
                className="h-2" 
              />
              <div className="flex justify-between text-xs">
                <span className="text-muted-foreground">
                  de {orthographyProgress.total} exercicis
                </span>
                <span className="font-medium">
                  {orthographyProgress.xpFromOrthography} XP
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Time to Level Up */}
      <Card className="bg-gradient-to-br from-yellow-500/5 to-yellow-500/10 border-yellow-500/20">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Projecció</CardTitle>
          <Star className="h-4 w-4 text-yellow-500" />
        </CardHeader>
        <CardContent>
          <div className="text-lg font-bold text-yellow-500 mb-2">
            {analysisData.predictions.estimatedTimeToLevel}
          </div>
          <div className="space-y-1">
            <p className="text-xs text-muted-foreground">
              Temps estimat per al següent nivell
            </p>
            <div className="flex flex-wrap gap-1">
              {analysisData.predictions.recommendedFocus.map((focus, index) => (
                <Badge key={index} variant="outline" className="text-xs">
                  {focus}
                </Badge>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};