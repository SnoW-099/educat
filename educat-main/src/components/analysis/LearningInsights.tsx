import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { 
  Brain,
  Target,
  TrendingUp,
  Lightbulb,
  Award,
  AlertCircle,
  Clock,
  BookOpen,
  Users,
  Calendar,
  Star,
  Trophy,
  Zap,
  CheckCircle
} from 'lucide-react';

interface AnalysisData {
  skillBalance: any;
  exerciseStreak: number;
  totalXpAllTime: number;
  currentMonthXp: number;
  completedExercises: number;
  totalExercises: number;
  attempts: any[];
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

interface LearningInsightsProps {
  analysisData: AnalysisData;
  classLevel?: string;
}

export const LearningInsights = ({ analysisData, classLevel }: LearningInsightsProps) => {
  

  const generateRecommendations = () => {
    const { skillBalance, learningPatterns, predictions } = analysisData;
    
    const recommendations = [];

    // Based on time preference
    if (learningPatterns.preferredTime === 'Matí') {
      recommendations.push({
        category: 'Horari',
        title: 'Aprofita les Matinades',
        description: 'Estudies millor al matí. Reserva aquest temps per als exercicis més difícils.',
        priority: 'high'
      });
    }

    // Based on weak skills
    predictions.recommendedFocus.forEach(skill => {
      recommendations.push({
        category: 'Competència',
        title: `Enfoca't en ${skill}`,
        description: `Dedica temps extra a millorar ${skill} per equilibrar el teu perfil.`,
        priority: 'medium'
      });
    });

    // Based on consistency
    if (learningPatterns.consistency < 60) {
      recommendations.push({
        category: 'Rutina',
        title: 'Estableix una Rutina',
        description: 'Crea un horari fix d\'estudi per millorar la consistència.',
        priority: 'high'
      });
    }

    // Based on level
    const currentScore = skillBalance.overall_score || 0;
    if (currentScore < 60) {
      recommendations.push({
        category: 'Fonaments',
        title: 'Reforça els Fonaments',
        description: 'Concentra\'t en exercicis bàsics abans de passar a continguts avançats.',
        priority: 'high'
      });
    }

    return recommendations;
  };

  const recommendations = generateRecommendations();

  const getInsightColor = (type: string) => {
    switch (type) {
      case 'success': return 'border-green-200 bg-green-50';
      case 'good': return 'border-blue-200 bg-blue-50';
      case 'warning': return 'border-orange-200 bg-orange-50';
      case 'improvement': return 'border-yellow-200 bg-yellow-50';
      case 'suggestion': return 'border-purple-200 bg-purple-50';
      default: return 'border-gray-200 bg-gray-50';
    }
  };

  const getInsightIconColor = (type: string) => {
    switch (type) {
      case 'success': return 'text-green-500';
      case 'good': return 'text-blue-500';
      case 'warning': return 'text-orange-500';
      case 'improvement': return 'text-yellow-500';
      case 'suggestion': return 'text-purple-500';
      default: return 'text-gray-500';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-500';
      case 'medium': return 'bg-orange-500';
      case 'low': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="space-y-6">
      {/* Learning Analytics Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Brain className="h-5 w-5 text-primary" />
            <span>Anàlisi Intel·ligent del Teu Aprenentatge</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Progrés Global</span>
                <span className="text-sm text-muted-foreground">
                  {Math.round(analysisData.skillBalance.overall_score || 0)}%
                </span>
              </div>
              <Progress value={analysisData.skillBalance.overall_score || 0} className="h-2" />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Consistència</span>
                <span className="text-sm text-muted-foreground">
                  {analysisData.learningPatterns.consistency}%
                </span>
              </div>
              <Progress value={analysisData.learningPatterns.consistency} className="h-2" />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Taxa d'Èxit</span>
                <span className="text-sm text-muted-foreground">
                  {analysisData.learningPatterns.achievementRate}%
                </span>
              </div>
              <Progress value={analysisData.learningPatterns.achievementRate} className="h-2" />
            </div>
          </div>

          <Separator className="my-4" />

          <div className="grid gap-4 md:grid-cols-3 text-center">
            <div>
              <div className="text-2xl font-bold text-primary mb-1">
                {analysisData.predictions.estimatedTimeToLevel}
              </div>
              <p className="text-xs text-muted-foreground">Per al següent nivell</p>
            </div>
            <div>
              <div className="text-2xl font-bold text-accent mb-1">
                {analysisData.learningPatterns.preferredTime}
              </div>
              <p className="text-xs text-muted-foreground">Hora preferida d'estudi</p>
            </div>
            <div>
              <div className="text-2xl font-bold text-orange-500 mb-1">
                {analysisData.learningPatterns.avgSessionTime}min
              </div>
              <p className="text-xs text-muted-foreground">Durada mitjana de sessió</p>
            </div>
          </div>
        </CardContent>
      </Card>


      {/* Recommendations */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Target className="h-5 w-5 text-green-500" />
            <span>Recomanacions d'Estudi</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recommendations.map((rec, index) => (
              <div key={index} className="flex items-start space-x-3 p-3 bg-muted/30 rounded-lg">
                <div className={`w-2 h-2 rounded-full mt-2 ${getPriorityColor(rec.priority)}`} />
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="font-semibold text-sm">{rec.title}</h4>
                    <Badge variant="outline" className="text-xs">
                      {rec.category}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{rec.description}</p>
                </div>
              </div>
            ))}

            {recommendations.length === 0 && (
              <div className="text-center py-8">
                <CheckCircle className="h-12 w-12 mx-auto mb-4 text-green-500 opacity-50" />
                <p className="text-muted-foreground">
                  Excel·lent! El teu rendiment actual no requereix recomanacions específiques.
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Action Items */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <TrendingUp className="h-5 w-5 text-blue-500" />
            <span>Pròxims Passos</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {analysisData.predictions.recommendedFocus.length > 0 ? (
              <>
                <div className="p-3 bg-primary/5 rounded-lg">
                  <h4 className="font-semibold text-sm mb-2">Prioritat Immediata</h4>
                  <p className="text-sm text-muted-foreground mb-2">
                    Centra't en millorar aquestes competències aquesta setmana:
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {analysisData.predictions.recommendedFocus.map((skill, index) => (
                      <Badge key={index} variant="default">{skill}</Badge>
                    ))}
                  </div>
                </div>

                <div className="p-3 bg-accent/5 rounded-lg">
                  <h4 className="font-semibold text-sm mb-2">Objectius Setmanals</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>Mantenir ratxa de {analysisData.exerciseStreak} dies</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Target className="h-4 w-4 text-blue-500" />
                      <span>Completar {analysisData.learningPatterns.weeklyGoal} XP aquesta setmana</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <TrendingUp className="h-4 w-4 text-purple-500" />
                      <span>Millorar puntuació mitjana a 75%+</span>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <div className="text-center py-8">
                <Users className="h-12 w-12 mx-auto mb-4 text-muted-foreground opacity-50" />
                <p className="text-muted-foreground">
                  Continua fent exercicis per rebre recomanacions personalitzades.
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};