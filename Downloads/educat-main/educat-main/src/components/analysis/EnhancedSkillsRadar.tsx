import { useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { 
  ResponsiveContainer, 
  RadarChart, 
  PolarGrid, 
  PolarAngleAxis, 
  PolarRadiusAxis, 
  Radar,
  Legend,
  Tooltip
} from 'recharts';
import { TrendingUp, TrendingDown, Target, Award, AlertCircle } from 'lucide-react';

interface SkillsData {
  grammar_score: number;
  vocabulary_score: number;
  listening_score: number;
  speaking_score: number;
  reading_score: number;
  writing_score: number;
  overall_score: number;
}

interface EnhancedSkillsRadarProps {
  data: SkillsData;
  currentLevel: string;
  targetLevel: string;
  className?: string;
  loading?: boolean;
  detailed?: boolean;
}

export const EnhancedSkillsRadar = ({ 
  data, 
  currentLevel, 
  targetLevel, 
  className = '', 
  loading = false,
  detailed = false
}: EnhancedSkillsRadarProps) => {
  
  const radarData = useMemo(() => [
    { 
      skill: 'Gramàtica', 
      score: Math.round(data.grammar_score || 0), 
      target: 85,
      shortName: 'Gram.',
      description: 'Regles gramaticals, estructures sintàctiques'
    },
    { 
      skill: 'Vocabulari', 
      score: Math.round(data.vocabulary_score || 0), 
      target: 85,
      shortName: 'Vocab.',
      description: 'Riquesa lèxica, sinònims, expressions'
    },
    { 
      skill: 'Lectura', 
      score: Math.round(data.reading_score || 0), 
      target: 85,
      shortName: 'Lect.',
      description: 'Comprensió de textos, velocitat lectora'
    },
    { 
      skill: 'Escriptura', 
      score: Math.round(data.writing_score || 0), 
      target: 85,
      shortName: 'Escr.',
      description: 'Redacció, ortografia, coherència textual'
    },
    { 
      skill: 'Oral', 
      score: Math.round(((data.listening_score || 0) + (data.speaking_score || 0)) / 2), 
      target: 85,
      shortName: 'Oral',
      description: 'Comprensió auditiva i expressió oral'
    },
  ], [data]);

  const getLevelColor = (level: string) => {
    const colors = {
      'A1': 'hsl(142 76% 36%)', // Green
      'A2': 'hsl(220 60% 30%)', // Blue  
      'B1': 'hsl(38 92% 50%)', // Yellow
      'B2': 'hsl(24 95% 53%)', // Orange
      'C1': 'hsl(0 65% 51%)', // Red
      'C2': 'hsl(262 83% 58%)'  // Purple
    };
    return colors[level as keyof typeof colors] || 'hsl(220 15% 50%)';
  };

  const getSkillStatus = (score: number) => {
    if (score >= 85) return { label: 'Excel·lent', color: 'bg-green-500', icon: Award };
    if (score >= 70) return { label: 'Molt Bé', color: 'bg-blue-500', icon: TrendingUp };
    if (score >= 50) return { label: 'Acceptable', color: 'bg-orange-500', icon: Target };
    return { label: 'Necessita millora', color: 'bg-red-500', icon: AlertCircle };
  };

  const strengths = radarData.filter(skill => skill.score >= 70).map(skill => skill.skill);
  const weaknesses = radarData.filter(skill => skill.score < 50).map(skill => skill.skill);
  const averageScore = Math.round(radarData.reduce((sum, skill) => sum + skill.score, 0) / radarData.length);

  // Custom tooltip for radar chart
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-card p-3 border rounded-lg shadow-lg">
          <p className="font-semibold">{data.skill}</p>
          <p className="text-sm text-muted-foreground mb-2">{data.description}</p>
          <p className="text-primary">Puntuació: <span className="font-bold">{data.score}%</span></p>
          <p className="text-accent">Objectiu: <span className="font-bold">{data.target}%</span></p>
          <div className="mt-2">
            <Progress value={(data.score / data.target) * 100} className="h-1" />
          </div>
        </div>
      );
    }
    return null;
  };

  if (loading) {
    return (
      <Card className={`${className} shadow-card`}>
        <CardHeader>
          <CardTitle>Competències Lingüístiques</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-muted-foreground">Carregant competències...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={`${className} shadow-card`}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center space-x-2">
              <span>Anàlisi de Competències</span>
              <Badge variant="outline" style={{ color: getLevelColor(currentLevel) }}>
                {currentLevel}
              </Badge>
            </CardTitle>
            <p className="text-sm text-muted-foreground mt-1">
              Visualització del teu perfil d'aprenentatge
            </p>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold text-primary">
              {averageScore}%
            </div>
            <p className="text-xs text-muted-foreground">Puntuació mitjana</p>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Radar Chart */}
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart cx="50%" cy="50%" outerRadius="70%" data={radarData}>
              <PolarGrid />
              <PolarAngleAxis 
                dataKey="skill" 
                tick={{ fontSize: 12 }}
                className="text-xs font-medium"
              />
              <PolarRadiusAxis 
                angle={18} 
                domain={[0, 100]} 
                tick={{ fontSize: 10 }}
                tickCount={6}
              />
              
              {/* Current Performance */}
              <Radar 
                name="Rendiment Actual" 
                dataKey="score" 
                stroke="hsl(var(--primary))" 
                fill="hsl(var(--primary))" 
                fillOpacity={0.25} 
                strokeWidth={2}
                dot={{ r: 4, fill: 'hsl(var(--primary))' }}
              />
              
              {/* Target Performance */}
              <Radar 
                name="Objectiu" 
                dataKey="target" 
                stroke="hsl(var(--accent))" 
                fill="transparent" 
                strokeDasharray="5 5" 
                strokeWidth={1.5}
                dot={false}
              />
              
              <Tooltip content={<CustomTooltip />} />
              <Legend />
            </RadarChart>
          </ResponsiveContainer>
        </div>

        {/* Skill Analysis */}
        {detailed && (
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">Anàlisi Detallat</h4>
            
            <div className="grid gap-3">
              {radarData.map((skill, index) => {
                const status = getSkillStatus(skill.score);
                const StatusIcon = status.icon;
                const progressToTarget = (skill.score / skill.target) * 100;
                
                return (
                  <div key={index} className="p-3 bg-muted/30 rounded-lg space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className={`w-2 h-2 rounded-full ${status.color}`} />
                        <span className="font-medium">{skill.skill}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <StatusIcon className="h-4 w-4 text-muted-foreground" />
                        <span className="font-bold">{skill.score}%</span>
                      </div>
                    </div>
                    
                    <p className="text-xs text-muted-foreground px-5">
                      {skill.description}
                    </p>
                    
                    <div className="space-y-1 px-5">
                      <div className="flex justify-between text-xs">
                        <span>Progrés cap a l'objectiu</span>
                        <span>{Math.round(progressToTarget)}%</span>
                      </div>
                      <Progress value={progressToTarget} className="h-2" />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Quick Analysis */}
        {!detailed && (
          <div className="grid gap-4 md:grid-cols-2">
            {/* Strengths */}
            {strengths.length > 0 && (
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Award className="h-4 w-4 text-green-500" />
                  <h4 className="font-medium text-green-500">Punts Forts</h4>
                </div>
                <div className="space-y-1">
                  {strengths.map((strength, index) => (
                    <Badge key={index} variant="outline" className="mr-2 bg-green-50 border-green-200">
                      {strength}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {/* Areas for Improvement */}
            {weaknesses.length > 0 && (
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Target className="h-4 w-4 text-orange-500" />
                  <h4 className="font-medium text-orange-500">Àrees de Millora</h4>
                </div>
                <div className="space-y-1">
                  {weaknesses.map((weakness, index) => (
                    <Badge key={index} variant="outline" className="mr-2 bg-orange-50 border-orange-200">
                      {weakness}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Overall Score */}
        <div className="text-center p-4 bg-gradient-to-r from-primary/10 to-accent/10 rounded-lg">
          <div className="text-3xl font-bold text-primary mb-2">
            {Math.round(data.overall_score || 0)}%
          </div>
          <p className="text-muted-foreground font-medium">Puntuació General</p>
          <div className="mt-3 max-w-xs mx-auto">
            <Progress value={data.overall_score || 0} className="h-2" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};